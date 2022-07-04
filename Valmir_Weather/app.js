PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const allDay = require("./assets/posts").allDay;
const getAll = require("./assets/posts").getAll;

const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
	res.send("Welcome to valmir's weather api");
});

app.get("/weather", async (req, res) => {
	await axios
		.get(
			"https://weather.com/pt-BR/weather/tenday/l/02e0521505fcc9fdcf923955568ba750335769dfb9b9a68ea0613e9098b7d42e"
		)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			const dia = new Date();

			const nowT = dia.getDate();

			let i = 0;

			$("[class='DetailsSummary--extendedData--365A_']").each(function () {
				allDay.push({ clima: $(this).text(), dia: nowT + i });
				i++;
			});
		});
	res.send(allDay);
});

app.get("/weather/all", (req, res) => {
	res.json(JSON.stringify(getAll()));
});

app.listen(PORT, () => {
	console.log(`Server running in PORT ${PORT}`);
});
