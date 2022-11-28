const { Schema, model } = require("mongoose");

const validateEmail = (email) => {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
};

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
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
    thoughts: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "thought",
        },
      ],
    },
    friends: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      ],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("friendCount").get(() => {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
