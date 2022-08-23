require("dotenv").config();
const axios = require('axios');
const path = require('path');
const express = require('express');
const app = express();
const reviews =require('./reviews.js')
const port = process.env.PORT || 3000;
const { getRelated } = require('./related');
const { Outfit } = require('../db/index.js');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

//https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp

app.get('/related/:id', (req, res) => {
  getRelated(req.params.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("some err happened");
    });
});

app.get('/outfit', (req, res) => {
  Outfit.find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("some err happened");
    });
});

app.post('/outfit', (req, res) => {
  const { id, category, name, original_price, sale_price, img_url, overallRating } = req.body;
  const obj = { id, category, name, original_price, sale_price, img_url, overallRating };
  Outfit.updateOne({id: id}, obj, {upsert: true}, function(err) {
    if (err) {
      console.log(err)
      res.status(400);
    } else {
      res.status(201);
    }
  });
});

app.delete('/outfit', (req, res) => {
  const { id } = req.body;
  Outfit.deleteOne({id: id}, function(err) {
    if (err) {
      console.log(err)
      res.status(406);
    } else {
      res.status(204);
    }
  })
});

//===========================================
// reviews api
app.post('/reviews', (req,res)=>{
  reviews.getProductcount(req.body.sort, req.body.productId)
    .then((response)=>{
      res.status(200).send(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
})

app.put('/reviews/:id', (req, res)=>{
  // console.log(req.params.id)
  reviews.addHelpful(req.params.id)
  .then((resonose)=>{
    res.status(200).send('Helpful')
  })
  .catch((err)=>{
    console.log(err)
  })
})

//=================================================
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})