// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// const { MongoClient } = require("mongodb");

// export default async function handler(req, res) {
//   const uri = process.env.MONGODB_URI;
//   console.log(uri);
//   const client = new MongoClient(uri);
//   try {
//     await client.connect();
//     const database = client.db("sample_mflix");
//     const movies = database.collection("movies");
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: "Back to the Future" };
//     const movie = await movies.findOne(query);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
//   res.status(200).json({ name: "John Doe" });
// }

import mongoose from "mongoose";

export async function dbConnect() {
  const uri = process.env.MONGODB_URI;
  console.log(uri);

  try {
    await mongoose.connect(uri);

    console.log("connected");
  } catch (e) {
    console.log(e);
  }
}

export async function dbDisconnect() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected");
  } catch (e) {
    console.log(e);
  }
}

export function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}
