# Birthday Gift Generator

A complete SaaS-style Birthday Gift Website Generator built with Next.js 15, TypeScript, Tailwind CSS, Supabase, and ready for Vercel deployment.

## Features

### Admin Dashboard
- **Create birthday cards** with recipient name, message, and template selection
- **Edit and delete** existing birthday cards
- **Upload multiple photos** to Supabase Storage
- **Select from 5 beautiful templates**: Anime, Gaming, Luxury, Romantic, and Dark themes
- **Add background music** via URL

### Public Card Pages
- **Dynamic routes**: `/card/[slug]` for sharing birthday cards
- **Full-screen slideshow** with auto-play and manual navigation
- **Background music player** with play/pause and mute controls
- **Animated confetti** celebration effect
- **Mobile-first responsive design**
- **Smooth transitions and animations**

### Database & Storage
- **Supabase Database** for storing card data
- **Supabase Storage** for photo uploads
- **Unique slug generation** for shareable URLs
- **Automatic timestamp tracking**

### Automation Service
- **Folder monitoring** for automatic card creation
- **Config-based setup** with JSON configuration files
- **Automatic photo upload** to Supabase Storage
- **Database record creation** without manual intervention
- **Folder archiving** after processing
- **Windows service support** for continuous operation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Deployment**: Vercel
- **Icons**: Lucide React
- **Animations**: Canvas Confetti

## Project Structure

```
botbirthday/
├── app/
│   ├── admin/
│   │   ├── cards/          # List all cards
│   │   ├── edit/[id]/     # Edit card page
│   │   ├── layout.tsx     # Admin layout
│   │   └── page.tsx       # Create card page
│   ├── card/[slug]/       # Public card view
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── Confetti.tsx       # Confetti animation
│   ├── MusicPlayer.tsx    # Background music player
│   ├── PhotoUpload.tsx    # Photo upload component
│   └── Slideshow.tsx      # Image slideshow
├── lib/
│   ├── supabase.ts        # Supabase client
│   ├── templates.ts       # Theme configurations
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
├── automation/
│   ├── service.js         # Automation service script
│   ├── start.bat          # Start service manually
│   ├── install-service.bat # Install as Windows service
│   ├── install-service.js  # Windows service installer
│   ├── uninstall-service.bat # Uninstall Windows service
│   └── uninstall-service.js # Windows service uninstaller
├── supabase/
│   └── schema.sql         # Database schema
└── package.json
```

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

### 2. Clone and Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (2-3 minutes)

#### Run the Database Schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" to execute the schema

This will create:
- `birthday_cards` table with all necessary fields
- Indexes for performance
- Row Level Security (RLS) policies
- Automatic timestamp triggers

#### Create Storage Bucket

1. Go to the Storage section in Supabase
2. Create a new bucket named `birthday-photos`
3. Make the bucket **public** (or configure appropriate policies)
4. Set up the following bucket policy (in SQL Editor):

```sql
-- Create storage bucket policy
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'birthday-photos');

CREATE POLICY "Allow public downloads"
ON storage.objects FOR SELECT
USING (bucket_id = 'birthday-photos');
```

### 4. Configure Environment Variables

1. In your Supabase project dashboard, go to Settings > API
2. Copy your project URL and anon key
3. Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Automation Service

The automation service monitors a local `customers` folder and automatically creates birthday cards without manual intervention.

### How It Works

1. **Monitor Folder**: Watches the `customers/` directory for new folders
2. **Read Config**: Each folder must contain a `config.json` file with card details
3. **Upload Photos**: Automatically uploads all images to Supabase Storage
4. **Create Card**: Generates a birthday card record in the database
5. **Generate Slug**: Creates a unique slug for the public URL
6. **Archive Folder**: Moves processed folders to `archive/` directory
7. **Continuous Operation**: Runs continuously on Windows as a service

### Folder Structure

Create folders in the `customers/` directory:

```
customers/
├── sarah/
│   ├── config.json
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
├── john/
│   ├── config.json
│   ├── photo1.png
│   └── photo2.jpg
└── archive/
    ├── sarah-1715123456789/
    └── john-1715123456790/
```

### Config File Format

Each customer folder must contain a `config.json` file:

```json
{
  "recipient_name": "Sarah",
  "message": "Happy Birthday Sarah! Wishing you a wonderful day filled with joy and laughter.",
  "template": "anime",
  "music_url": "https://example.com/birthday-music.mp3"
}
```

**Required Fields:**
- `recipient_name`: Name of the birthday person
- `message`: Birthday message

**Optional Fields:**
- `template`: Theme template (anime, gaming, luxury, romantic, dark) - defaults to 'romantic'
- `music_url`: URL to background music file

### Supported Image Formats

- `.jpg`, `.jpeg`
- `.png`
- `.gif`
- `.webp`
- `.bmp`

### Running the Automation Service

#### Option 1: Run Manually (Development)

```bash
npm run automation
```

The service will:
- Create `customers/` and `archive/` folders if they don't exist
- Process any existing folders in `customers/`
- Monitor for new folders and process them automatically
- Log all activities to `automation/automation.log`

#### Option 2: Install as Windows Service (Production)

1. **Install the service:**

```bash
cd automation
install-service.bat
```

This will:
- Install `node-windows` if not already installed
- Create a Windows service named "BirthdayAutomation"
- Start the service automatically

2. **Manage the service:**

```bash
# Start the service
net start BirthdayAutomation

# Stop the service
net stop BirthdayAutomation

# Check service status
sc query BirthdayAutomation
```

3. **Uninstall the service:**

```bash
cd automation
uninstall-service.bat
```

### Service Logs

The automation service logs all activities to `automation/automation.log`:

```
[2024-06-08T10:30:00.000Z] [INFO] ========================================
[2024-06-08T10:30:00.000Z] [INFO] Birthday Card Automation Service Started
[2024-06-08T10:30:00.000Z] [INFO] ========================================
[2024-06-08T10:30:00.000Z] [INFO] Monitoring folder: J:\botbirthday\customers
[2024-06-08T10:30:00.000Z] [INFO] Archive folder: J:\botbirthday\archive
[2024-06-08T10:30:00.000Z] [INFO] Checking for existing folders to process...
[2024-06-08T10:30:00.000Z] [INFO] Found 1 existing folders
[2024-06-08T10:30:00.000Z] [INFO] Processing folder: sarah
[2024-06-08T10:30:00.000Z] [INFO] Successfully read config from J:\botbirthday\customers\sarah
[2024-06-08T10:30:00.000Z] [INFO] Found 3 images in sarah
[2024-06-08T10:30:01.000Z] [INFO] Uploaded photo: photo1.jpg -> abc123def456.jpg
[2024-06-08T10:30:02.000Z] [INFO] Uploaded photo: photo2.jpg -> ghi789jkl012.jpg
[2024-06-08T10:30:03.000Z] [INFO] Uploaded photo: photo3.jpg -> mno345pqr678.jpg
[2024-06-08T10:30:04.000Z] [INFO] Successfully created birthday card for Sarah
[2024-06-08T10:30:04.000Z] [INFO] Card URL: /card/sarah-abc123
[2024-06-08T10:30:04.000Z] [INFO] Moved sarah to archive
```

### Automation Workflow

1. **Folder Detection**: When a new folder is added to `customers/`, the service detects it within 3 seconds
2. **Config Validation**: Reads and validates `config.json`
3. **Photo Upload**: Uploads all images to Supabase Storage with unique filenames
4. **Card Creation**: Creates a database record with:
   - Auto-generated slug (e.g., `sarah-abc123`)
   - Recipient name and message
   - Selected template
   - Array of photo URLs
   - Music URL (if provided)
5. **Archiving**: Moves the entire folder to `archive/` with timestamp
6. **Logging**: Records all actions with timestamps

### Troubleshooting Automation

#### Service Not Starting

- Ensure Node.js 18+ is installed
- Check that environment variables are set in `.env.local`
- Verify Supabase credentials are correct
- Check `automation/automation.log` for error details

#### Folders Not Processing

- Verify `config.json` exists and is valid JSON
- Check that required fields (`recipient_name`, `message`) are present
- Ensure images are in supported formats
- Check Supabase Storage bucket exists and is accessible

#### Photos Not Uploading

- Verify Supabase Storage bucket `birthday-photos` exists
- Check bucket policies allow uploads
- Ensure sufficient storage space in Supabase
- Check network connectivity

#### Windows Service Issues

- Run Command Prompt as Administrator for service operations
- Check Windows Event Viewer for service errors
- Verify node-windows is installed: `npm list node-windows`
- Reinstall service if needed using uninstall/install sequence

### Production Considerations

For production use:

1. **Security**: Consider implementing authentication for the automation service
2. **Rate Limiting**: Add rate limiting to prevent abuse
3. **Error Notifications**: Set up email or webhook notifications for failures
4. **Backup**: Regularly backup the `archive/` folder
5. **Monitoring**: Use monitoring tools to track service health
6. **Scaling**: Consider running multiple instances for high volume

## Usage

### Creating a Birthday Card

1. Navigate to `/admin`
2. Fill in the recipient's name
3. Write a birthday message
4. Select a template (Anime, Gaming, Luxury, Romantic, or Dark)
5. Upload photos (optional)
6. Add a background music URL (optional)
7. Click "Create Card"

### Viewing a Birthday Card

1. After creating a card, you'll get a unique URL like `/card/john-doe-abc123`
2. Share this URL with the birthday recipient
3. The card will display with:
   - Full-screen photo slideshow
   - Animated confetti
   - Background music (if added)
   - Beautiful themed design

### Managing Cards

1. Go to `/admin/cards` to see all created cards
2. Click "View" to see the public card
3. Click "Edit" to modify the card
4. Click the trash icon to delete a card

## Templates

The application includes 5 professionally designed templates:

1. **Anime Theme**: Colorful and playful with pink/purple gradients
2. **Gaming Theme**: Dark and sleek with neon green accents
3. **Luxury Theme**: Elegant gold and black premium design
4. **Romantic Theme**: Soft pink and red romantic design
5. **Dark Theme**: Modern dark mode with purple accents

Each template includes:
- Custom color schemes
- Unique gradients
- Appropriate typography
- Responsive design

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository
4. Add environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

Vercel will automatically:
- Detect Next.js
- Install dependencies
- Build the application
- Deploy to a global CDN

### 3. Custom Domain (Optional)

1. In Vercel project settings, go to Domains
2. Add your custom domain
3. Update DNS records as instructed

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (for admin operations) | No |

## Database Schema

```sql
CREATE TABLE birthday_cards (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  recipient_name TEXT NOT NULL,
  message TEXT NOT NULL,
  template TEXT NOT NULL DEFAULT 'romantic',
  photos TEXT[] NOT NULL DEFAULT '{}',
  music_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Routes

The application uses Supabase client-side for simplicity. For production, consider:

1. Moving sensitive operations to API routes
2. Implementing authentication
3. Adding rate limiting
4. Using service role key for admin operations

## Customization

### Adding New Templates

Edit `lib/templates.ts` to add new templates:

```typescript
export const templates: Record<string, TemplateConfig> = {
  // Add your new template here
  custom: {
    name: 'Custom Theme',
    description: 'Your description',
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
      accent: '#your-color',
      background: 'your-gradient',
      text: '#your-color',
    },
    font: 'Your font family',
  },
};
```

### Modifying Animations

Edit `tailwind.config.ts` to add custom animations:

```typescript
animation: {
  'your-animation': 'yourAnimation 1s ease-in-out',
},
keyframes: {
  yourAnimation: {
    '0%': { /* start state */ },
    '100%': { /* end state */ },
  },
},
```

## Troubleshooting

### Photos Not Uploading

- Ensure Supabase Storage bucket `birthday-photos` exists
- Check bucket policies allow uploads
- Verify environment variables are correct

### Database Errors

- Run the schema.sql in Supabase SQL Editor
- Check RLS policies in Supabase Dashboard
- Verify table exists and has correct structure

### Build Errors

- Run `npm install` to ensure all dependencies are installed
- Clear Next.js cache: `rm -rf .next`
- Check Node.js version (18+ required)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
- Check the Supabase documentation
- Review Next.js documentation
- Open an issue in the repository

## Future Enhancements

Potential features to add:
- User authentication
- Card scheduling (send on specific date)
- More templates
- Video support
- Social sharing integration
- Analytics dashboard
- Email notifications
