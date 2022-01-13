const Order = require("../models/orderSchema");
const OrderItem = require("../models/orderItemsSchema");

exports.getOrders = async (req, res) => {
  const getOrders = await Order.find();

  if (!getOrders)
    return res.status(500).json({
      isSuccess: false,
    });
  res.send(getOrders);
};

exports.createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
      totalPrice,
    } = req.body;
    console.log(req.body);
    console.log(req.body.orderItems);

    // const orderItemsIds = req.body.orderItems.map(async (orderItem) => {
    //   const newOrderItem = new OrderItem({
    //     quantity: orderItem.quantity,
    //     product: orderItem.product,
    //   });
    //   newOrderItem = await newOrderItem.save();
    //   return newOrderItem._id;
    // });
    const orderItemsId = Promise.all(
      orderItems.map(async (ord) => {
        console.log(ord);
        const newOrderItem = await OrderItem.create({
          quantity: ord.quantity,
          product: ord.product,
        });
        return newOrderItem._id;
      })
    );

    const orderItemsSolved = await orderItemsId;

    console.log(orderItemsId);
    console.log(orderItemsSolved);

    const newOrder = await Order.create({
      orderItems: orderItemsSolved,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
      totalPrice,
      user: req.user,
    });

    console.log(req.user);
    console.log(newOrder);

    res.status(200).json({
      isSuccess: true,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      isSuccess: false,
      error: error,
    });
  }
};
