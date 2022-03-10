import mongoose from "mongoose";

const supplySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Product Name"],
  },
  desc: {
    type: String,
    required: [true, "Enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Enter Rental value per day charge"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: [
    {
      type: String,
      required: [true, "Enter Product Category"],
    },
  ],
  owner: {
    owner_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    owner_rating: {
      type: Number,
      default: 0,
    },
  },
  stock: {
    type: Number,
    required: [true, "Enter Stock available"],
    default: 1,
  },
  avalability_time: {
    from:{
        type: Date,
        default: Date.now
    },
    to:{
        type: Date,
        default: Date.now,
    }
  },
  numOfReviews : {
    type: Number,
    default: 0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default  mongoose.model('supplyItem', supplySchema);

