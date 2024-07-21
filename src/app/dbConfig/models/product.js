
const mongo =require("mongoose");

const Schema =mongo.Schema;

const models =mongo.models;

const productSchema =new Schema({
title:String,
price:Number,
description:String,
productImg:String,
imgPuplicId:String,
})

const productModal =models.Product || mongo.model("Product",productSchema);

module.exports =productModal;
















