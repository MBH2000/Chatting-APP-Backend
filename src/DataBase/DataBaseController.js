import mongoose from "mongoose";
import dotenv from 'dotenv' 
dotenv.config()
try {
    mongoose.connect(process.env.DB_URL) .then(() => console.log('Connected To Database!'));

} catch (error) {
    console.log('Error Connecting To Database ',error);
}
