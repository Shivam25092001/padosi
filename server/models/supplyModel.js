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
    owner_ID: {
      type: String,
      required: true,
    },
    owner_rating: {
      type: Number,
      default: 0,
    },
  },
  Stock: {
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
  reviews: [
    {
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

const supplyItem =  mongoose.model('supplyItem', supplySchema);
export default supplyItem;
