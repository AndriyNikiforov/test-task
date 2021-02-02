module.exports = {
  apps: [
    {
      name: 'API',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      ignore_watch: [
        'node_modules',
        'persist',
        'source',
        'source/**/*',
        'public',
        'tmp',
        'storage',
        '.git',
        '.idea',
        '.history',
        'public/js',
        'public/qr',
        'public/uploads',
        'docker',
      ],
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
