module.exports = {
  heroku: {
    pg_db: process.env.DATABASE_URL_DEV,
  },
  sendgrid: {
    host: 'smtp.sendgrid.net',
    port: process.env.SENDGRID_PORT,
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD,
    },
  },
  google_service_account: {
    type: 'service_account',
    project_id: 'waver-279201',
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    client_id: '107991680415816711275',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.Client_x509_Cert_Url,
  },
};
