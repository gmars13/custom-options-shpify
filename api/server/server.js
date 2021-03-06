import cors from 'cors'
import dotenv from "dotenv";
import express from 'express';
import router from './router/shop.routes'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});