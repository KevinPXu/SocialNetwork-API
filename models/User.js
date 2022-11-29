const { Schema, model } = require("mongoose");
const { Thought } = require("./Thought");
//email validation method using a REGEX
const validateEmail = (email) => {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
};

//user model
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
      //validates the email address using the above function
      validate: [validateEmail, "Please use a valid email address"],
    },
    //includes the thoughts associated with the user
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    //includes the friends associated with the user
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

//user virtual counting the number of friends a user has
userSchema.virtual("friendCount").get(() => {
  if (!this.friends) {
    return `No Friends Yet!`;
  }
  return this.friends.length();
});

const User = model("user", userSchema);

module.exports = User;
