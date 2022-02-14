const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { query } = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

//Define paths for Express configuration
const app = express();
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Jonathan B.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jonathan B.",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This page is being developed using Node.js and Express",
    name: "Jonathan B.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "No location provided. Please add a location." });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 Help",
    errorMessage: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Page Not Found",
    name: "Jonathan Blair",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
