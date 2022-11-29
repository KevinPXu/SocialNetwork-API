const { Schema, model } = require("mongoose");
//const { reactionSchema } = require("./Reaction");
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
      default: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: { type: Date, default: Date.now },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(() => {
  if (!this.reactions) {
    return `no reactions currently`;
  }
  return this.reactions.length();
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;