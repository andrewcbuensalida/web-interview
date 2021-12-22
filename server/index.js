const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
app.use(cors());
// need this so req.body isn't undefined. or can use dependency called body-parser
app.use(express.json());

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: process.env.DB_PW,
	database: "babylon",
});

app.get("/api/v1/availableSlots", (req, res) => {
	
	
	const sqlInsert = `SELECT * FROM availableslots`;
	db.query(sqlInsert, (err, result) => {
		if (err) return res.status(404).json(err);
		result.forEach(slot => {
			slot.appointmentType = JSON.parse(slot.appointmentType)
			slot.consultantType = JSON.parse(slot.consultantType)
			
		});
		res.status(200).json(result);
	});

});

app.get("/api/v1/users/:id", (req, res) => {
	const sqlInsert = `SELECT * FROM users WHERE id=?`;
	db.query(sqlInsert, [req.params.id], (err, result) => {
		if (err) return res.status(404).json(err);

		res.status(200).json(result[0]);
	});
});

app.post("/api/v1/appointments", (req, res) => {
	// if i want the iso 8601 date from front end to be converted to mysql datetime, use this
	// const sqlInsert = `INSERT INTO appointments (notes,userId,consultantType,appointmentType,dateTime) VALUES (?,?,?,?,STR_TO_DATE(?,'%Y-%m-%dT%T.%fZ'))`;
	const sqlInsert = `INSERT INTO appointments (notes,userId,consultantType,appointmentType,dateTime) VALUES (?,?,?,?,?)`;
	db.query(
		sqlInsert,
		[
			req.body.notes,
			req.body.userId,
			req.body.consultantType,
			req.body.appointmentType,
			req.body.dateTime,
		],
		(err, result) => {
			if (err) throw err;
			res.status(201).json(result);
		}
	);
});

app.listen("3400", () => console.log(`Listening to 3400`));
