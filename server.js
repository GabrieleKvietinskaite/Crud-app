// Create express app
const express = require("express");
const path = require("path");
const app = express();
var db = require("./database.js")
var bodyParser = require("body-parser");
const { consoleTestResultsHandler } = require("tslint/lib/test");

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'dist/crud-app')));

// Server port
const HTTP_PORT = process.env.HTTP_PORT || 8000;
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/plates", (req, res) => {
    var sql = "SELECT * FROM plates ORDER BY FirstName ASC"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json(err.message);
          return;
        }
        res.json(rows);
        return;
      });
});

app.post("/plate", (req, res) => {
    db.all("SELECT COUNT(*) as platesCount FROM plates WHERE NumberPlate = ?", req.body.NumberPlate.toUpperCase(), (err, result) => {
        if (err){
            res.status(400).json(err.message);
            return;
        }
        if(result[0].platesCount > 0){
            res.status(400).json("Car with that number already exists");
            return;
        }
        else{
            var plate = [req.body.NumberPlate.toUpperCase(), req.body.FirstName.toUpperCase(), req.body.LastName.toUpperCase()];
            var sql = "INSERT INTO plates (NumberPlate, FirstName, LastName) VALUES (?, ?, ?)"
            db.run(sql, plate, err => {
                if (err){
                    res.status(400).json(err.message);
                    return;
                }
            });
        }
        res.status(200).json("OK");
        return;
    })
});

app.patch("/plate/:Id", (req, res) => {
    db.all("SELECT COUNT(*) as platesCount FROM plates WHERE NumberPlate = ? AND Id != ?", req.body.NumberPlate.toUpperCase(), req.params.Id, (err, result) => {
        if (err){
            res.status(400).json(err.message);
            return;
        }
        if(result[0].platesCount > 0){
            res.status(400).json("Car with that number already exists");
            return;
        }
        else{
            var plate = [req.body.NumberPlate.toUpperCase(), req.body.FirstName.toUpperCase(), req.body.LastName.toUpperCase(), req.params.Id];
            var sql = "UPDATE plates SET NumberPlate = ?, FirstName = ?, LastName = ? WHERE Id = ?"
            db.run(sql, plate, err => {
                if (err){
                    res.status(400).json(err.message);
                    return;
                }
            });
        }
        res.status(200).json("OK");
        return;
    })
});

app.delete("/plate/:Id", (req, res) => {
    var plateId = req.params.Id;
    var sql = "DELETE FROM plates WHERE Id = ?"
    db.run(sql, plateId, err => {
        if (err){
            res.status(400).json(err.message);
            return;
        }
        res.status(200).json("OK");
        return;
    });
});

app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist/crud-app/index.html'))
});