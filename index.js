import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './DB/connection.js';
import userRouter from './src/modules/user/userRouter.js';
const app = express()
dotenv.config(); 

const port = process.env.PORT

await connectDB();

app.use(express.json())
app.use('/user',userRouter);


app.all('/*', (req, res,next) =>{
    return next(new Error("Page not found",{cause:404}));
})

app.use((error,req, res,next) => {
    const statusCode=error.cause||500;
    res.status(statusCode).json({
        success:false,
        message:error.message,
        stack:error.stack
    });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))