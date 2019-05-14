if (process.env.NODE_ENV === 'production') {
  module.exports = {
    secretKey: process.env.SECRETKEY
  };
} else {
  module.exports = {
    secretKey: 'ironhack2019'
  }
}
