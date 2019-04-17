// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
module.exports = {
  apps : [
    {
      name: 'dev_Gizumo_wiki',
      script: 'server/www',
      args: '--demon',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
    },
  ],

  deploy : {
    production : {
      user : '',
      host : '',
      ref  : '',
      repo : '',
      path : '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
