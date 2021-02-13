const { request } = require('express');
const express = require('express');
const cartitems = express.Router();

module.exports = cartitems;

const cartItems = [
  {
    id: 0,
    product: "avocado",
    price: 1.25,
    quantity: 5,
  },
  {
    id: 1,
    product: "cilantro",
    price: 1.99,
    quantity: 1,
  },
  {
    id: 2,
    product: "lime",
    price: 0.5,
    quantity: 10,
  },
  {
    id: 3,
    product: "jalapeno",
    price: 0.25,
    quantity: 7,
  },
  {
    id: 4,
    product: "red onion",
    price: 1.09,
    quantity: 3,
  },
];

cartitems.get("/", (req, res) => {
  const maxPrice = parseFloat(req.query.maxPrice);
  const prefix = req.query.prefix;
  const pageSize = parseFloat(req.query.pageSize);
  let item = cartItems;

  if (maxPrice) {
    item = cartItems.filter((items) => {
      return items.price <= maxPrice;
    });
  }

  if (prefix) {
    item = cartItems.filter((items) => {
      return items.product.startsWith(prefix);
    });
  }
  
  if (pageSize) {
    item = cartItems.slice(0, pageSize);
  }
  
  res.status(200);
  res.json(item);
});

cartitems.get("/:id", (req, res) => {
    const id = parseFloat(req.params.id);

    if (id) {
        item = cartItems.find((i) => i.id === id);
    } else {
        res.status(404);
        res.json("ID Not Found")
    }

    res.status(200);
    res.json(item);
  });

cartitems.post("/", (req, res) => {

    id = cartitems.length + 2;

    let newItem = {
        id : id,
        price : req.body.price,
        quantity : req.body.quantity,
        product : req.body.product,
    }

    cartItems.push(newItem);
    
    res.status(201);
    res.json(newItem);
});

cartitems.put("/:id", (req, res) => {
    const id = parseFloat(req.params.id);

    const index = cartItems.findIndex((i) => i.id === id);
    // const item = cartItems[index];

    // item.price = req.body.price;
    // item.quantity = req.body.quantity;
    // item.product = req.body.product;

    cartItems.splice(index, 1, req.body);

    res.status(200);
    res.json(cartItems);
});

cartitems.delete("/:id", (req, res) => {
    const id = parseFloat(req.params.id);

    cartItems.splice(id, 1);
    
    
    res.status(204);
    res.json("");
});
