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
	res.json([
		{
			id: 1,
			consultantType: ["gp"],
			appointmentType: ["audio", "video"],
			time: "2019-11-27T10:11:00.000Z",
		},
		{
			id: 2,
			consultantType: ["specialist", "gp"],
			appointmentType: ["audio", "video"],
			time: "2019-11-27T14:16:30.000Z",
		},
	]);
});

app.get("/api/v1/users/:id", (req, res) => {
	const sqlInsert = `SELECT * FROM users WHERE id=?`;
	db.query(sqlInsert, [req.params.id], (err, result) => {
		if (err) return res.status(404).json(err);
		
		res.status(200).json(result[0]);
	});
});

app.post("/api/v1/appointments", (req, res) => {
	console.log(`post hit`);
	console.log(req.body);

	const sqlInsert = `INSERT INTO appointments (notes,userId,consultantType,appointmentType,dateTime) VALUES (?,?,?,?,STR_TO_DATE(?,'%Y-%m-%dT%T.%fZ'))`;
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
