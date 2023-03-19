import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { findMovies, findMoviebyID, createMovie, deleteMovie, updateMovie } from "./helper.js";

const app = express();
app.use(cors());

dotenv.config();
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

export const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is connected !!!  ");

app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.get("/movies", findMovies());

app.get("/movies/:id", findMoviebyID());

app.post("/movies", createMovie());

app.delete("/movies/:id", deleteMovie());

app.put("/movies/:id", updateMovie());


app.use("/users", userRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


