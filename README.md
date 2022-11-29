# SocialNetwork-API

## Technologies Used

- JavaScript
- Node.js
- express.js
- nodemon.js
- mongoDB
- mongoose npm package
- VS Code
- Git
- GitHub

## Summary

This project was used to obtain a better understanding of using an ODM and querying for data within mongoDB using a backend server through express. We were able to create a database and query it using express routes that called certain URL endpoints. Through these endpoints, we used CRUD operations to get, update, create and delete entries from the databases and their collections and documents.

## Demonstration

View demo: https://drive.google.com/file/d/1pz9aaqu7oEEfxK4f42cMuy1FboDRyeuH/view

## Description

A SocialNetwork backend with numerous API endpoints to Get, Create, Update, and Delete Data. When using the Get routes, you can retrieve all the data from a given collection as well as getting individual documents in a collection by specifying the specific ID you want to grab. If you update, it will update depending on the ID you gave it. If you delete, it will delete the entry id you gave it in the endpoint. If you create, it will create a new entry in the collection you specify. We were also able to add virtuals to the models which returned important information about the specified document without creating an actual key value pair.

## Code Snippet

### User model demonstrating the user validations and virtuals

```JavaScript
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [validateEmail, "Please use a valid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("friendCount").get(() => {
  if (!this.friends) {
    return `No Friends Yet!`;
  }
  return this.friends.length();
});
```

### example of a get request and single get requests

```JavaScript
getUsers(req, res) {
    User.find()
      .then((users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("__v")
      .populate("thoughts")
      .populate("friends")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
            })
      );
  },
```

### example of a delete request (Note\* put and delete are very similar operations, though in the delete route we made sure to delete all thoughts associated with a user )

```JavaScript
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID!" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "user and their thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

```

### example of a create request

```JavaScript
createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

```

## Author Links

[LinkedIn](https://www.linkedin.com/in/kevin-xu-4672a7215/)
[GitHub](https://github.com/KevinPXu)
1
