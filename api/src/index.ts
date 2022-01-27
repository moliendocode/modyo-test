import "dotenv/config";
import express, { Request, Response } from "express";
import pokeRoutes from "./routes/pokemon";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_: Request, res: Response) => {
    res.send({ message: `Welcome to Modyo's Pokemon API!` });
});
app.use("/", pokeRoutes);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at ${process.env.LOCAL_URL}:${port}/`);
});
server.on("error", console.error);
