require('dotenv').config();

const config = {
  aws: {
    rds: {
      user: process.env.RDS_USERNAME,
      host: process.env.RDS_HOSTNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      uri: process.env.RDS_URI,
    },
    rds_test: {
      user: process.env.TEST_RDS_USERNAME,
      host: process.env.TEST_RDS_HOSTNAME,
      port: process.env.TEST_RDS_PORT,
      password: process.env.TEST_RDS_PASSWORD,
      uri: process.env.TEST_RDS_URI,
    },
  },
  sendgrid: {
    host: 'smtp.sendgrid.net',
    port: 587,
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

module.exports = config;
