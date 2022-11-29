const { Schema, model } = require("mongoose");
const { Thought } = require("./Thought");

const validateEmail = (email) => {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
};

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

const User = model("user", userSchema);

module.exports = User;
