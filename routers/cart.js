const express = require('express');
const cartRouter = express.Router();
const CartModel = require('../models/cartModel')

cartRouter.post('/addToCart', async (req, res,) => {
  try {
    const product = req.body.products;
    console.log("products", product);
    let total;

    if (product.name == "Book") {
      console.log("inside boook session");
      let error = 0;
      let discount;
      if (product.quantity < product.minQuantity) {
        error = error + 1;
        res.status(404).json({ message: 'min quantity should be 3', })
      }
      total = (product.quantity * product.price);
      console.log("total", total);
      if (total >= 500) {
        discount = (total * (10 / 100));
        console.log("discount", discount)
        discount > 60 ? total = total - 60 : total = total - discount
      }
      console.log("total out", total)

      if (error == 0) {
        const cartData = CartModel({
          product: product.name,
          price: product.price,
          quantity: product.quantity,
          totalAmount: total,
        })
        const ld = await cartData.save();
        res.json({ message: "Item Added to Cart SuccessFully", data: ld })
      }
    }

    else if (product.name == "Sanitizer") {
      console.log("inside sanitizer session");
      let error = 0;
      if (product.quantity < product.minQuantity) {
        error = error + 1;
        res.status(404).json({ message: 'min quantity should be 10', })
      }
      total = (product.quantity * product.price);
      console.log("total", total);
      if (total >= 3000) {
        total = total - 100
      }
      if (error == 0) {
        const cartData = CartModel({
          product: product.name,
          price: product.price,
          quantity: product.quantity,
          totalAmount: total,
        })
        const ld = await cartData.save();
        res.json({ message: "Item Added to Cart SuccessFully", data: ld })
      }
    }

    else if (product.name == "Bag") {
      console.log("inside Bag session");
      let error = 0;
      if (product.quantity > product.maxNoInSinglePurchace) {
        error = error + 1;
        res.status(404).json({ message: 'maximum number in single purchase is limited to 2', })
      }
      total = (product.quantity * product.price);
      if (error == 0) {
        const cartData = CartModel({
          product: product.name,
          price: product.price,
          quantity: product.quantity,
          totalAmount: total,
        })
        const ld = await cartData.save();
        res.json({ message: "Item Added to Cart SuccessFully", data: ld })
      }
    }
  }
  catch (e) {
    res.send(e)
  }
})

cartRouter.post('/addCoupon', async (req, res) => {

  let allCartProducts = await CartModel.find();
  // console.log("products", allCartProducts);
  let totalCartAmount = 0;

  allCartProducts.forEach(e => {
    totalCartAmount = totalCartAmount + e.totalAmount;
  })
  console.log("totalCartAmount", totalCartAmount);
  if (totalCartAmount < 10000) {
    res.status(404).json({
      message: 'Sorry Your Total Cart Amount Is Not Sufficent For Using This Promo Code',
      CartAmount: totalCartAmount,
      DiscountAmount: 0,
      Total: totalCartAmount
    })
  }
  else {
    let reducedAmount = totalCartAmount - 123;
    res.json({
      message: 'Congrates Coupon Is Valid and Used',
      CartAmount: totalCartAmount,
      DiscountAmount: 123,
      Total: reducedAmount
    })
  }
})
module.exports = cartRouter
