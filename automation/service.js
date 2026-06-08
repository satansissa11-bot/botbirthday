const chokidar = require('chokidar');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

// Configuration
const CUSTOMERS_FOLDER = path.join(__dirname, '..', 'customers');
const ARCHIVE_FOLDER = path.join(__dirname, '..', 'archive');
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Ensure directories exist
if (!fs.existsSync(CUSTOMERS_FOLDER)) {
  fs.mkdirSync(CUSTOMERS_FOLDER, { recursive: true });
  console.log(`Created customers folder: ${CUSTOMERS_FOLDER}`);
}

if (!fs.existsSync(ARCHIVE_FOLDER)) {
  fs.mkdirSync(ARCHIVE_FOLDER, { recursive: true });
  console.log(`Created archive folder: ${ARCHIVE_FOLDER}`);
}

// Logging function
function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  console.log(logMessage);
  
  // Write to log file
  const logFile = path.join(__dirname, 'automation.log');
  fs.appendFileSync(logFile, logMessage + '\n');
}

// Generate slug from recipient name
function generateSlug(name) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const randomString = nanoid(6);
  return `${base}-${randomString}`;
}

// Read config.json from a folder
function readConfig(folderPath) {
  const configPath = path.join(folderPath, 'config.json');
  
  if (!fs.existsSync(configPath)) {
    log(`No config.json found in ${folderPath}`, 'error');
    return null;
  }
  
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    log(`Successfully read config from ${folderPath}`);
    return config;
  } catch (error) {
    log(`Error reading config.json in ${folderPath}: ${error.message}`, 'error');
    return null;
  }
}

// Get all image files from a folder
function getImageFiles(folderPath) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
  const files = fs.readdirSync(folderPath);
  
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext) && file !== 'config.json';
  });
}

// Upload a single photo to Supabase Storage
async function uploadPhoto(filePath, fileName) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const fileExt = path.extname(fileName);
    const newFileName = `${nanoid()}${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('birthday-photos')
      .upload(newFileName, fileBuffer, {
        contentType: 'image/jpeg'
      });
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('birthday-photos')
      .getPublicUrl(newFileName);
    
    log(`Uploaded photo: ${fileName} -> ${newFileName}`);
    return publicUrl;
  } catch (error) {
    log(`Error uploading photo ${fileName}: ${error.message}`, 'error');
    return null;
  }
}

// Process a customer folder
async function processCustomerFolder(folderName) {
  const folderPath = path.join(CUSTOMERS_FOLDER, folderName);
  log(`Processing folder: ${folderName}`);
  
  try {
    // Read config
    const config = readConfig(folderPath);
    if (!config) {
      log(`Skipping ${folderName}: No valid config.json`, 'error');
      return false;
    }
    
    // Validate config
    if (!config.recipient_name || !config.message) {
      log(`Skipping ${folderName}: Missing required fields in config`, 'error');
      return false;
    }
    
    // Get image files
    const imageFiles = getImageFiles(folderPath);
    log(`Found ${imageFiles.length} images in ${folderName}`);
    
    // Upload all photos
    const photoUrls = [];
    for (const imageFile of imageFiles) {
      const imagePath = path.join(folderPath, imageFile);
      const publicUrl = await uploadPhoto(imagePath, imageFile);
      if (publicUrl) {
        photoUrls.push(publicUrl);
      }
    }
    
    // Generate slug
    const slug = generateSlug(config.recipient_name);
    
    // Create database record
    const { data, error } = await supabase.from('birthday_cards').insert({
      slug,
      recipient_name: config.recipient_name,
      message: config.message,
      template: config.template || 'romantic',
      photos: photoUrls,
      music_url: config.music_url || null,
    }).select().single();
    
    if (error) {
      log(`Error creating database record: ${error.message}`, 'error');
      return false;
    }
    
    log(`Successfully created birthday card for ${config.recipient_name}`);
    log(`Card URL: /card/${slug}`);
    
    // Move folder to archive
    const archivePath = path.join(ARCHIVE_FOLDER, `${folderName}-${Date.now()}`);
    fs.renameSync(folderPath, archivePath);
    log(`Moved ${folderName} to archive`);
    
    return true;
  } catch (error) {
    log(`Error processing ${folderName}: ${error.message}`, 'error');
    return false;
  }
}

// Process all existing folders on startup
async function processExistingFolders() {
  log('Checking for existing folders to process...');
  
  try {
    const folders = fs.readdirSync(CUSTOMERS_FOLDER);
    log(`Found ${folders.length} existing folders`);
    
    for (const folder of folders) {
      const folderPath = path.join(CUSTOMERS_FOLDER, folder);
      const stats = fs.statSync(folderPath);
      
      if (stats.isDirectory()) {
        await processCustomerFolder(folder);
      }
    }
  } catch (error) {
    log(`Error checking existing folders: ${error.message}`, 'error');
  }
}

// Watch for new folders
function startWatcher() {
  log('Starting folder watcher...');
  
  const watcher = chokidar.watch(CUSTOMERS_FOLDER, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    }
  });
  
  // Debounce folder processing
  let processingTimeouts = {};
  
  watcher.on('addDir', (folderPath) => {
    const folderName = path.basename(folderPath);
    log(`New folder detected: ${folderName}`);
    
    // Clear existing timeout for this folder
    if (processingTimeouts[folderName]) {
      clearTimeout(processingTimeouts[folderName]);
    }
    
    // Set new timeout to process folder (debounce)
    processingTimeouts[folderName] = setTimeout(async () => {
      await processCustomerFolder(folderName);
      delete processingTimeouts[folderName];
    }, 3000); // Wait 3 seconds after folder creation
  });
  
  watcher.on('error', (error) => {
    log(`Watcher error: ${error.message}`, 'error');
  });
  
  log('Folder watcher started successfully');
}

// Main function
async function main() {
  log('========================================');
  log('Birthday Card Automation Service Started');
  log('========================================');
  log(`Monitoring folder: ${CUSTOMERS_FOLDER}`);
  log(`Archive folder: ${ARCHIVE_FOLDER}`);
  
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    log('ERROR: Supabase credentials not found in environment variables', 'error');
    log('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY', 'error');
    process.exit(1);
  }
  
  // Process existing folders
  await processExistingFolders();
  
  // Start watching for new folders
  startWatcher();
  
  // Keep process running
  log('Service is running. Press Ctrl+C to stop.');
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start the service
main().catch(error => {
  log(`Fatal error: ${error.message}`, 'error');
  process.exit(1);
});
