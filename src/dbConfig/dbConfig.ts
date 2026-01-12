import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongoDB connected successfully");
    }); //When MongoDB connects properly, log a success message so you know the database is ready

    connection.on("error", (err) => {
      console.log(
        "mongoDB connection error. please make sure mongoDB is running " + err
      );
      process.exit();
    }); //This code listens for MongoDB connection errors, logs them, and then stops the app so you notice the problem immediately.
  } catch (error) {
    console.log("Somrthing goes wrong");
    console.log(error);
  }
}
/* IMPORTANT

This 'connect' function created here needs to come in every single place in the api
because without connect we cannot talk to database and every single time an api call is there we have to connect with the database
*/
