const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter dish name"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone"],
      min: [10, "Invalid phone number"],
      max: [11, "Invalid phone number"],
    },
    amount: {
      type: Number,
    },
    dateOrder: {
      type: Date,
      required: [true, "Please enter booking date"],
    },
    timeOrder: {
      type: String,
      required: [true, "Please enter time order"],
    },
    timeCome: {
      type: String,
      required: [true, "Please enter time come"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    show: {
      type: mongoose.Schema.ObjectId,
      ref: "Show",
      required: [true, "Order must belong to a show"],
    },
    seat: {
      type: mongoose.Schema.ObjectId,
      ref: "Seat",
      required: [true, "Order must belong to a seat"],
    },
    status: {
      type: String,
      enum: ["Chờ xác nhận", "Đã xác nhận", "Đã hủy"],
      default: "Chờ xác nhận",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.index({ user: 1, show: 1 }, { unique: true });

orderSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name email" })
    .populate({ path: "show", select: "content time date" })
    .populate({ path: "seat", select: "name status description" });
  next();
});

const Order = mongoose.model("Order", orderSchema); // //tự động tạo User collection nếu chưa có, 'User' tên không được có chữ s sau cùng
module.exports = Order;
