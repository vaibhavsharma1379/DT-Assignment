const express = require("express");
const eventModel = require("../model/eventModel");
const routes = express.Router();

routes.post("/events", (req, res) => {
  console.log(req.body);

  const event = new eventModel({
    type: req.body.type,
    uid: req.body.uid,
    name: req.body.name,
    tagline: req.body.tagline,
    schedule: req.body.schedule,
    description: req.body.description,
    files: req.body.files,
    moderator: req.body.moderator,
    category: req.body.category,
    sub_category: req.body.sub_category,
    rigor_rank: req.body.rigor_rank,
    attendees: req.body.attendees,
  });
  event.save();
  return res.json({
    message: "event is created succesfully",
    uid: event.uid,
  });
});

routes.get("/events/:event_id", async (req, res) => {
  try {
    const eventId = parseInt(req.params.event_id);
    console.log(eventId);
    const event = await eventModel.findOne({ uid: eventId });
    if (!event) {
      return res.status(404).json({ message: "event not found" });
    }
    console.log(event);
    const eventObject = {
      type: event.type,
      uid: event.uid,
      name: event.name,
      tagline: event.tagline,
      schedule: event.schedule,
      description: event.description,
      files: event.files,
      moderator: event.moderator,
      category: event.category,
      sub_category: event.sub_category,
      rigor_rank: event.rigor_rank,
      attendees: event.attendees,
    };
    return res.json(eventObject);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }
});

routes.put("/events/:event_id", async (req, res) => {
  try {
    const eventId = parseInt(req.params.event_id);
    const update = {
      type: req.body.type,
      uid: req.body.uid,
      name: req.body.name,
      tagline: req.body.tagline,
      schedule: req.body.schedule,
      description: req.body.description,
      files: req.body.files,
      moderator: req.body.moderator,
      category: req.body.category,
      sub_category: req.body.sub_category,
      rigor_rank: req.body.rigor_rank,
      attendees: req.body.attendees,
    };
    const options = { new: true };
    const event = await eventModel.findOneAndUpdate(
      { uid: eventId },
      update,
      options
    );
    console.log(event);
    if (!event) {
      return res.status(404).json({ message: "event not found" });
    }
    return res.json(event);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "n error occured" });
  }
});
routes.get("/events", async (req, res) => {
  try {
    const type = req.query.type;
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    if (type === "latest") {
      const events = await eventModel
        .find()
        .sort({ schedule: -1 })
        .skip(skip)
        .limit(limit);
      console.log(events);
      return res.json(events);
    }else{
      return res.status(400).json({message:"invalid type parameter"});
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }
});

routes.delete("/events/:event_id",async (req,res)=>{
  try{
    const eventId=parseInt(req.params.event_id);
    const event=await eventModel.findOneAndDelete({uid:eventId});
    if(!event){
      return res.status(404).json({ message: "event not found" });
    }
    else{
      console.log(event);
      return res.json({ message: "event deleted successfully" });
    }
  }
  catch(err){
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }
});
module.exports = routes;
