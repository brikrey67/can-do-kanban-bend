const express = require("express");
var passport = require("passport");

const { Bucket, Task } = require("../models/schema");
//assign schema (defined in schema.js) to variabl

function taskGetOne(request, response) {
  // console.log("PARAMS ID: " + request.params._id);
  let tId = request.params._id;
  let bTitle = request.params.bTitle;
  // console.log("TASK ID: " + tId, "BUCKET TITLE: " + bTitle);

  Bucket.find({ bTitle: { $ne: bTitle } })
    .sort("bOrder")
    .then(bucketList => {
      Bucket.findOne({ bTitle: bTitle })
        .then(bucketData => {
          taskData = bucketData.addedTask.find(
            task => task._id.toString() == tId
          );
          response.status(200).json({ taskData, bucketData, bucketList });
        })
        .catch(err => {
          console.log("BUCKETDATAERR: " + err);
        });
    })
    .catch(err => {
      console.log("BUCKETLISTERR: " + err);
    });
}

function taskOnePut(request, response) {
  bucketTitle = request.params.bTitle;
  // console.log("BTITLE: " + bucketTitle);
  tId = request.params._id;
  // console.log("TID: " + tId);
  Bucket.findOne(
    {
      bTitle: bucketTitle
    },
    function(err, doc) {
      var subDoc = doc.addedTask.id(request.params._id);
      subDoc.set(request.body);
      // console.log("DOC: " + doc);
      // console.log("SUBDOC: " + subDoc);
      doc
        .save()
        .then(doc => {
          response.status(200).json(Bucket);
          return;
        })
        .catch(function(err) {
          response.status(500).send(err);
        });
    }
  );
}

function taskDelete(request, response) {
  Bucket.findOneAndUpdate(
    { bTitle: request.params.bTitle },
    { $pull: { addedTask: { _id: request.params._id } } },
    { new: true }
  )
    .then(bucket => {
      response.status(200).json(Bucket);
    })
    .catch(err => {
      console.log(err);
    });
}

function taskMove(request, response) {
  let bId = request.body.moveToBucketId;
  let tId = request.params._id;
  let oBTitle = request.params.bTitle;
  console.log("REQ_BODY: " + request.body);
  console.log("TID: " + tId);
  console.log("MOVETO: " + bId);
  console.log("OBTITLE" + oBTitle);
  console.log("TASKDATA: " + request.body.taskData);

  Bucket.findOneAndUpdate(
    { _id: bId },
    { $push: { addedTask: request.body.taskData } },
    { new: true }
  ).then(removeTask => {
    Bucket.findOneAndUpdate(
      { bTitle: oBTitle },
      { $pull: { addedTask: { _id: tId } } },
      { new: true }
    )
      .then(bucket => {
        response.status(200).json(Bucket);
      })
      .catch(err => {
        console.log(err);
      });
  });
}

module.exports = {
  taskGetOne: taskGetOne,
  taskDelete: taskDelete,
  taskOnePut: taskOnePut,
  taskMove: taskMove
};
