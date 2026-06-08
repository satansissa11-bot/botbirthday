const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name: 'BirthdayAutomation',
  script: require('path').join(__dirname, 'service.js')
});

// Listen for the 'uninstall' event
svc.on('uninstall', function() {
  console.log('Service uninstalled successfully!');
});

// Uninstall the service
svc.uninstall();
