const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

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

app.get("/api/v1/users/1", (req, res) => {
	
})

app.listen("3400", () => console.log(`Listening to 3400`));
