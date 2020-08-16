exports.dbConfig = {
  url: process.env.MONGODB_URI || "mongodb://localhost:27017/boss-hiring",
}

exports.clientConfig = {
  url: 'http://localhost:3000',
}