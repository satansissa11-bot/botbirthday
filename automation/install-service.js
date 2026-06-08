const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
const svc = new Service({
  name: 'BirthdayAutomation',
  description: 'Birthday Card Automation Service - Monitors folders and creates birthday cards automatically',
  script: path.join(__dirname, 'service.js'),
  nodeOptions: [
    '--max-old-space-size=4096'
  ],
  env: {
    name: 'NODE_ENV',
    value: 'production'
  }
});

// Listen for the 'install' event
svc.on('install', function() {
  console.log('Service installed successfully!');
  console.log('Starting service...');
  svc.start();
});

// Listen for the 'start' event
svc.on('start', function() {
  console.log('Service started successfully!');
  console.log('Service name: BirthdayAutomation');
});

// Listen for the 'alreadyinstalled' event
svc.on('alreadyinstalled', function() {
  console.log('Service is already installed.');
  console.log('To reinstall, first uninstall using: node uninstall-service.js');
});

// Install the service
svc.install();
