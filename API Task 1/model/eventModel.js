const mongoose=require("mongoose");
const eventSchema=new mongoose.Schema({
    type: {
        type: String,
        enum: ["event"],
      },
      uid: {
        type: Number,
      },
      name: {
        type: String,
      },
      tagline: {
        type: String,
      },
      schedule: {
        type: Date,
      },
      description: {
        type: String,
      },
      files: {
        type: [mongoose.Schema.Types.Mixed],
      },
      moderator: {
        type: String,
      },
      category: {
        type: String,
      },
      sub_category: {
        type: String,
      },
      rigor_rank: {
        type: Number,
      },
      attendees: {
        type: [String],
      },
})

module.exports=mongoose.model("Event",eventSchema);

// const { Model, DataTypes, Sequelize } = require("sequelize");
// const createDB = new Sequelize("test-DB", "event", {
//   dialect: "sqlite",
//   host: "./config/db.sqlite",
// });

// class Event extends Model {}
// Event.init({
//   name: {
//     type: DataTypes.STRING,
//   },
//   tagline: {
//     type: DataTypes.STRING,
//   },

//   description: {
//     type: DataTypes.STRING,
//   },
// },
// {
//     createDB,modelName:"event"
// }
// );
// module.exports={Event,createDB};