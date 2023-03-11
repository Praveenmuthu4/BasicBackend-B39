import express from "express";
import { MongoClient } from "mongodb";
const app = express();

const PORT = 4000;

// const MONGO_URL = "mongodb://127.0.0.1";

const MONGO_URL =
  "mongodb+srv://Praveen:LsD4HY5lGba39qWi@cluster0.3tfvbzi.mongodb.net";

const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is connected !!!  ");

app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.get("/movies", async function (request, response) {
  const movies = await client
    .db("b39we")
    .collection("movies")
    .find({})
    .toArray();

  console.log(movies);
  response.send(movies);
});

app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  // const movie = movies.filter((mv)=>mv.id === id);
  const movie = await client
    .db("b39we")
    .collection("movies")
    .findOne({ id: id });

  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "Movie not found" });
});

app.post("/movies", async function (request, response) {
  const data = request.body;

  console.log("Done", data);

  const result = await client.db("b39we").collection("movies").insertMany(data);

  response.send(result);
});

app.delete("/movies/:id", async function (request, response) {
  const { id } = request.params;

  console.log(id);

  const result = await client
    .db("b39we")
    .collection("movies")
    .deleteOne({ id: id });

  console.log(result);
  result.deletedCount > 0
    ? response.send({ message: "Movie Deleted" })
    : response.status(404).send({ message: "Movie Not found" });
});

app.put("/movies/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;

  const result = await client
    .db("b39we")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });

  response.send(result);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
