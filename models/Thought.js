const { Schema, model } = require("mongoose");

//reaction schema that models the reactions that is embedded in thoughts
const reactionSchema = new Schema(
  {
    //generates a reaction ID for each new reaction
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

//thought schema that models the required fields in the thought
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
    //embedded reactions
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual information for the thought returning the number of reactions a thought has 
thoughtSchema.virtual("reactionCount").get(() => {
  if (!this.reactions) {
    return `no reactions currently`;
  }
  return this.reactions.length();
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
