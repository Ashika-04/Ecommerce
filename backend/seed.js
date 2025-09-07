import mongoose from 'mongoose';
import data from './data.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Product.insertMany(data.products);
    await User.insertMany(data.users);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();
