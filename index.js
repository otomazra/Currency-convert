import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import request from "request";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
// console.log(dirname);
console.log(__filename);
// console.log(fileURLToPath);


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

let amount;
let date;
let conRate;
let conversion;
let firstFiat;
let secondFiat;

app.get("/", (req, res) => {
  res.render("index", {
    date: null,
    amount: null,
    first: null,
    rate: null,
    second: null,
    conversion: null,
  });
});

app.post("/", (req, res) => {
  console.log(req.body.fiat);
  console.log(req.body.fiat2);

  firstFiat = req.body.firstFiat;
  secondFiat = req.body.secondFiat;
  amount = req.body.amount;
  let baseURL =
    "https://v6.exchangerate-api.com/v6/5bf0fae9428142a831641fb6/pair";

  let completeURL = baseURL + "/" + firstFiat + "/" + secondFiat + "/" + amount;

  console.log(completeURL);

  request(completeURL, (error, response, body) => {
    console.log("The error is: " + error);
    // console.log(response);
    // console.log(body);
    // console.log(response);

    let data = JSON.parse(body);
    console.log(body);
    date = data.time_last_update_utc;
    conRate = data.conversion_rate;
    conversion = data.conversion_result;
    console.log(
      amount + " " + firstFiat + " is " + conversion + " " + secondFiat
    );

    // res.write(`<p style="font-weight:bold"> Date: ${date}</p>`);
    // res.write(`<p style="font-weight:bold"> Conversion rate: ${conRate}</p>`);
    // res.write(
    //   "<h1>" +amount+ " "+ firstFiat + " is " + conversion + " " + secondFiat + "</h1>"
    // );
    // res.write(
    //   "<p>Go back to the main page to search for another pair of currencies.</p>"
    // );
    // res.send();
    res.render("index", {
      date: new Date(),
      amount: amount,
      first: firstFiat,
      rate: conRate,
      second: secondFiat,
      conversion: conversion,
    });
  });
});

app.listen(3000, () => {
  console.log("listening to port: 3000");
});
