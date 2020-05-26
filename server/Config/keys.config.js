const CLOUDINARY_KEYS = {
  CLOUD_NAME: 'drsdmoshr',
  CLOUD_API_KEY: '351291777656992',
  CLOUD_API_SECRET: 'z1yJdAofx30je800TO5mkcMQ_f8'
}

const GOOGLE_KEYS = {
  GOOGLE_CLIENT_ID: '991036421705-iinru7k1hrejigodf5oqpvqg42lgcipg.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'dLaZgnK8zADCNl4ACEMC305Y',
  GOOGLE_CALLBACK_URL: '/auth/google/redirect'
}

const SESSION = {
  COOKIE_KEY: 'thisisjustarandomkeyforstoringthecookie'
}

module.exports = {
  ...CLOUDINARY_KEYS,
  ...GOOGLE_KEYS,
  ...SESSION
}