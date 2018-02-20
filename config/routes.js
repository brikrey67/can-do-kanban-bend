var express = require("express");
var router = express.Router();
// Parses information from POST
var bodyParser = require("body-parser");
// Used to manipulate POST methods
var methodOverride = require("method-override");

var bucketController = require("../controllers/buckets");
var taskController = require("../controllers/tasks");

// BUCKET ROUTES ******************************
router.route("/bucket").get(bucketController.bucketGetAll);
// list all bucket

router.route("/bucket").post(bucketController.bucketPost);
// add new bucket

router.route("/bucket/:bTitle").get(bucketController.bucketGetOne);
// show selected bucket detail

router.route("/bucket/:bTitle").delete(bucketController.bucketDelete);
// delete selected bucket

router.route("/bucket/:bTitle").put(bucketController.bucketPut);

router.route("/bucket/:bTitle").patch(bucketController.taskPatch);

// TASK ROUTES  *******************************

router.route("/bucket/:bTitle/:_id").get(taskController.taskGetOne);
// show selected task detailrouter

router.route("/bucket/:bTitle/:_id").delete(taskController.taskDelete);
// delete selected bucket

router.route("/bucket/:bTitle/:_id").put(taskController.taskOnePut);
// delete selected bucket

router.route("/bucket/:bTitle/:_id").patch(taskController.taskMove);
// delete selected bucket

module.exports = router;
