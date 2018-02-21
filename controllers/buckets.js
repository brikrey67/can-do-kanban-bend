const express = require("express");

const { Bucket } = require("../models/schema");
// assign schema (defined in schema.js) to variable

function bucketGetAll(request, response) {
  Bucket.find({})
    .sort("bOrder")
    .then(buckets => {
      response.status(200).json(buckets);
    })
    .catch(err => {
      response.status(500).send({ error: "Nope!" });
    });
}

function bucketGetOne(request, response) {
  let bTitle = request.params.bTitle;
  Bucket.findOne({ bTitle: bTitle })
    .then(bucket => {
      response.status(200).json(bucket);
    })
    .catch(err => {
      response.status(500).send({ error: "Nope!" });
    });
}

function bucketPost(request, response) {
  // let bTitle = request.params.bTitle;
  Bucket.create(request.body)
    .then(bucket => {
      console.log(bucket, request.body);
      response.status(200).json(bucket);
    })
    .catch(err => {
      console.log(err);
    });
}

function bucketDelete(request, response) {
  Bucket.findOneAndRemove({ bTitle: request.params.bTitle })
    .then(bucket => {
      response.status(200).json(bucket);
    })
    .catch(err => {
      response.status(500).send({ error: "Nope!" });
    });
}

function bucketPut(request, response) {
  Bucket.findOneAndUpdate({ bTitle: request.params.bTitle }, request.body, {
    new: true
  })
    .then(bucket => {
      response.status(200).json(bucket);
    })
    .catch(err => {
      response.status(500).send({ error: "Nope!" });
    });
}

function taskPatch(request, response) {
  // console.log(request.body);
  // console.log(request.params.bTitle);
  Bucket.findOneAndUpdate(
    { bTitle: request.params.bTitle },
    { $push: { addedTask: request.body } },
    { new: true }
  )
    .then(task => response.status(200).json(task))
    .catch(err => {
      response.status(500).send({ error: "Nope!" });
    });
}

module.exports = {
  bucketGetAll: bucketGetAll,
  bucketGetOne: bucketGetOne,
  bucketPost: bucketPost,
  bucketDelete: bucketDelete,
  bucketPut: bucketPut,
  taskPatch: taskPatch
};
