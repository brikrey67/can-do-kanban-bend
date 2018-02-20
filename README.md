To start:
(1) npm install
(2) mongod
(3) nodemon

**Project: Can-Do-Kanban BACKEND RESTful API**

**Developer:** Brian Reynolds

Two models:

const TaskSchema = new mongoose.Schema({
tTitle: String,
tDesc: String,
importance: String,
points: Number,
dueDate: String,
status: Number
});

const BucketSchema = new mongoose.Schema({
bOrder: Number,
bTitle: String,
bDesc: String,
intCrit: String,
exCrit: String,
addedTask: [TaskSchema]
});

**List of Technologies Used**

Node, Express, Mongo, Mongoose

** Integration **
This API fronted by React

**Installation Instructions / Getting Started**

No setup required. To use, navigate to application [here](https://can-do-kanban.herokuapp.com/)

**Contribution Guidelines**

Contributions welcome. Project can be found in the this [repo](https://github.com/brikrey67/can-do-kanban)
