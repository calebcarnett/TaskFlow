const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Board = require("./Board");

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  boards: [{ type: Schema.Types.ObjectId, ref: "Board" }],
});

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `boardCount` with the number of saved books we have
userSchema.virtual("boardCount").get(function () {
  return this.savedBoards.length;
});

const User = model("User", userSchema);

module.exports = User;