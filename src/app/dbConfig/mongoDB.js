const mongo =require("mongoose");


    export const connectMongoDB = async () => {
      try {
        await mongo.connect(process.env.DB_URL);
        console.log("connected to MongoDB");
      } catch (error) {
        console.log("ERROR WITH CONNECTING  MongoDB", error);
      }
    };






