const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.MONGO_URI, connectionParams);
    console.log('Bağlandık veritabanına bi sorun yok');
  } catch (error) {
    console.log('Bişeyler oldu çalışmıyo:', error);
  }
};
