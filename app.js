const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.get('/items', (req, res, next) => {

})

app.post('/items', (req, res, next) =>{
    
})

app.get('/items/:name', (req, res, next) => {
    
})

app.patch('/items/:name', (req, res, next) => {
    
})

app.delete('/items/:name', (req, res, next) => {
    
})

app.use(function (req, res, next) {
  const error = new ExpressError("Not Found", 404);

  return next(error);
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500);

  return res.json({
    error: error,
    message: error.message,
  });
});

app.listen(3000, () => {
  console.log("App on port 3000");
});