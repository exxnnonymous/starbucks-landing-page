import mongoose from "mongoose";
let Schema = mongoose.Schema;

let totalSchema = new Schema({
  itemsCount: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
});

let CartSchema = new Schema({
  total: {
    type: totalSchema,
  },
  items: [],
});

let ProductsSchema = new Schema({
  total: {
    type: totalSchema,
  },
  items: [],
});

let UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  cart: { type: CartSchema },
  products:{type:ProductsSchema}
});

mongoose.models = {};

let User = mongoose.model("User", UserSchema);

export default User;
