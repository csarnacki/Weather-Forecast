let date = dayjs();
console.log(date.format());
let time = dayjs();
console.log(time.format('YYYY-MM-DD HH:MM:SS'));

let city = '';
let cityHistory = [];

$('.search').on('click', function (event) {
    event.preventDefault();
    city = $(this).parent('.btnPar').siblings('.textVal').val().trim();

    if (city === '') {
        return;
    };

    cityHistory.push(city);

    localStorage.setItem('city', JSON.stringify(cityHistory));
    fiveForecastEl.empty();
    weatherHistory();
    weatherToday();
});

let citySearched = $('.cityHistory');
function weatherHistory() {
    citySearched.empty();

    for(let i = 0; i < cityHistory.length; i++) {
        let rowEl = $('<row>');
        let btnEl = $('<button>').text(`$(cityHistory[i])`);

        rowEl.addClass('row historyBtnRow');
        btnEl.addClass('btn btn-outline-secondary historyBtn');
        btnEl.attr('type', 'button');

        citySearched.prepend(rowEl);
        rowEl.append(btnEl);

    } if (!city) {
        return;
    }

    $('.historyBtn').on('click', function (event) {
        event.preventDefault();
        city = $(this).text();
        fiveForecastEl.empty();
        weatherToday();
    });
};
