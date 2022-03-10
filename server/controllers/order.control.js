import Order from "../models/orderModel.js";
import Supply from "../models/supplyModel.js";
import ErrorHandler from "../utils/errorhandler.js";
import asyncCatch from "../middleware/catchAsync.js";


//Create new Order
const newOrder = asyncCatch( async(req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        taxPrice,
        shippingPrice,
        // supplyPrice,
        // totalPrice,
    } = req.body;


    //supply price calculate
    let supplyPrice = 0;
    orderItems.forEach(order => {
        supplyPrice += order.price;
    });
    //total price calculate
    const totalPrice = supplyPrice + taxPrice + shippingPrice;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        supplyPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order
    });
});

//Get order details
const getOrderDetails = asyncCatch( async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler("Order not found for this id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    })
});

//Get all orders details
const myOrders = asyncCatch( async(req, res, next) => {
    const order = await Order.find({ user : req.user.id});

    if(!order){
        return next(new ErrorHandler("No orders yet", 401));
    }

    res.status(200).json({
        success: true,
        order,
    })
});

//Get all orders (admin)
const allOrders = asyncCatch( async(req, res, next) => {
    const order = await Order.find();

    if(!order){
        return next(new ErrorHandler("No orders yet", 401));
    }

    let totalAmount = 0;

    order.forEach(supply => {
        totalAmount += supply.totalPrice;
    });

    res.status(200).json({
        success: true,
        order,
        totalAmount
    });
});


//Update Order status (admin)
const updateOrderStatus = asyncCatch( async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("No such order found", 401));
    }
    
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("Order has already been shipped", 401));
    }

    order.orderItems.forEach(async (item) => {
        await updateStock(item.supply, item.quantity);
    });


    order.orderStatus = req.body.status;
    
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save( {validateBeforeSave: false} );

    res.status(200).json({
        success: true,
    });
});
async function updateStock (id, quantity){
    const supply = await Supply.findById(id);
    supply.stock -= quantity; 
    await supply.save( {validateBeforeSave: false} );
    console.log(supply);
}


//Delete order (admin)
const deleteOrder = asyncCatch( async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("No such order found", 401));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});


export {newOrder, getOrderDetails, myOrders, allOrders, updateOrderStatus, deleteOrder};