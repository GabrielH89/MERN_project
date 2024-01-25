import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
const app = express();
import router from './routes/notes';

app.use(express.json());

app.use("/api/notes", router);

app.use((req, res, next) => {
    next(Error("Endpoint not found"));
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "An error ocurred";
    if(error instanceof Error) errorMessage = error.message;
    res.status(500).json({error: errorMessage});
})

export default app;
