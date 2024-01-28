import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
config();
const app = express();
// middlewares
app.use(express.json()); // to read & use the json data; 
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev")); // remove at the time of production
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map