fetch("http://localhost:8000/weather/all")
	.then((res) => {
		return res.json();
	})
	.then((res) => {
		let dayE = "";

		let dayT = JSON.parse(res);

		dayT.forEach((element) => {
			dayE = `<div class="card m-1 p-2 bg-light flex-fill">
                        <div class="card-body">
                            <h3 class="card-title">Dia ${element.dia}</h3>
                            <h3 class="card-text">${element.clima}</h3>
                         </div>
                    </div>`;
			document.getElementById("geral").innerHTML += dayE;
		});
	});
