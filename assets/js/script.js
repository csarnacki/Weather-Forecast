let key = '64f2ee2a8261daa4d9f780f5b365f275';
let city = ""

//Grabs the current time and date
let date = dayjs();
console.log(date.format());
let time = dayjs();
console.log(time.format('YYYY-MM-DD HH:MM:SS'));

let cityHistory = [];
//Saves value of search to local storage
$('.search').on("click", function (event) {
	event.preventDefault();
	city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
	if (city === "") {
		return;
	};
	cityHistory.push(city);

	localStorage.setItem('city', JSON.stringify(cityHistory));
	weatherForecast.empty();
	weatherToday();
});

let cardTodayBody = $('.cardBodyToday')
//Applies weather info to current day card and calls forecast function
function weatherToday() {
	let getURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

	$(cardTodayBody).empty();

	$.ajax({
		url: getURL,
		method: 'GET',
	}).then(function (response) {
		$('.cardTodayCityName').text(response.name);
		$('.cardTodayDate').text(date);
		//Icons
		$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
		// Temperature
		let temp = $('<p>').text(`Temperature: ${response.main.temp} °F`);
		cardTodayBody.append(temp);
		//Humidity
		let humid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
		cardTodayBody.append(humid);
		//Wind Speed
		let wind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
		cardTodayBody.append(wind);
	});
	fiveDayForecast();
};

let weatherForecast = $('.fiveForecast');

function fiveDayForecast() {
	let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;

	$.ajax({
		url: forecastURL,
		method: 'GET',
	}).then(function (response) {
		let fiveDayArray = response.list;
		let myWeather = [];
		
		$.each(fiveDayArray, function (index, value) {
			testObj = {
				date: value.dt_txt.split(' ')[0],
				time: value.dt_txt.split(' ')[1],
				temp: value.main.temp,
				icon: value.weather[0].icon,
				humidity: value.main.humidity
			}

			if (value.dt_txt.split(' ')[1] === "12:00:00") {
				myWeather.push(testObj);
			}
		})
		//Adding the cards to the screen 
		for (let i = 0; i < myWeather.length; i++) {

			let divCard = $('<div>');
			divCard.attr('class', 'card text-white bg-primary mb-3 cardOne');
			divCard.attr('style', 'max-width: 200px;');
			weatherForecast.append(divCard);

			let divHeader = $('<div>');
			divHeader.attr('class', 'card-header')
			let moment = dayjs(`${myWeather[i].date}`).format('MM-DD-YYYY');
			divHeader.text(moment);
			divCard.append(divHeader)

			let divBody = $('<div>');
			divBody.attr('class', 'card-body');
			divCard.append(divBody);

			let divIcon = $('<img>');
			divIcon.attr('class', 'icons');
			divIcon.attr('src', `https://openweathermap.org/img/wn/${myWeather[i].icon}@2x.png`);
			divBody.append(divIcon);

			//Temp
			let temp = $('<p>').text(`Temperature: ${myWeather[i].temp} °F`);
			divBody.append(temp);
		
			//Humidity
			let humid = $('<p>').text(`Humidity: ${myWeather[i].humidity} %`);
			divBody.append(humid);
		}
	});
};
