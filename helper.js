import { client } from "./index.js";
import bcrypt from "bcrypt";

export function findMovies() {
  return async function (request, response) {
    const movies = await client
      .db("b39we")
      .collection("movies")
      .find({})
      .toArray();

    console.log(movies);
    response.send(movies);
  };
}
export function findMoviebyID() {
  return async function (request, response) {
    const { id } = request.params;
    console.log(id);
    const movie = await client
      .db("b39we")
      .collection("movies")
      .findOne({ id: id });

    console.log(movie);
    movie
      ? response.send(movie)
      : response.status(404).send({ message: "Movie not found" });
  };
}
export function createMovie() {
  return async function (request, response) {
    const data = request.body;

    console.log("Done", data);

    const result = await client.db("b39we").collection("movies").insertMany(data);

    response.send(result);
  };
}
export function deleteMovie() {
  return async function (request, response) {
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
  };
}
export function updateMovie() {
  return async function (request, response) {
    const { id } = request.params;
    const data = request.body;

    const result = await client
      .db("b39we")
      .collection("movies")
      .updateOne({ id: id }, { $set: data });

    response.send(result);
  };
}

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}


export async function createUser(username, hashedPassword){
  return await client
  .db("b39we")
  .collection("users")
  .insertOne({ username: username , password: hashedPassword });
}
