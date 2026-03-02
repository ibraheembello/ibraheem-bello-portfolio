module.exports = {
  apps: [
    {
      name: 'portfolio-api',
      script: './server/dist/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
      error_file: './logs/error.log',
      out_file: './logs/output.log',
      time: true,
    },
  ],
};
