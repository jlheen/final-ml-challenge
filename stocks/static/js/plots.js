let dropdown = document.getElementById('locality-dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose Stock Ticker';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

var stocks_url = 'https://cors-anywhere.herokuapp.com/http://magic-stocks.herokuapp.com/api/v1/stocks'
// var stocks_url ='http://magic-stocks.herokuapp.com/api/v1/stocks'

fetch(stocks_url)
    .then(
        function(stockInput) {
            if (stockInput.status !== 200) {
                console.warn('Looks like there was a problem. Status Code: ' +
                    stockInput.status);
                return;
            }

            // Examine the text in the stockInput  
            stockInput.json().then(function(data) {
                let option;

                // var distinct = []
                const unique = [...new Set(data.map(item => item.ticker))];
                const company = [...new Set(data.map(item => item.name))];

                for (let i = 0; i < unique.length; i++) {
                    // if (data[i].ticker not in distinct) continue;
                    // distinct.push(data[i].ticker)
                    option = document.createElement('option');
                    option.text = company[i];
                    option.value = unique[i];
                    // could add in the name here if incorporated into json 
                    // or another way to do it?
                    // option.value = data[i].abbreviation;
                    dropdown.add(option);
                }
            });
        }
    )
    .catch(function(err) {
        console.error('Fetch Error -', err);
    });


function updatePlotly() {
    d3.event.preventDefault();
    var stock = d3.select("#locality-dropdown").node().value;
    buildPlot(stock);
}

// function runPrediction() {
//     d3.event.preventDefault();
//     var stock = d3.select("#locality-dropdown").node().value;
//     var predictUrl = `https://cors-anywhere.herokuapp.com/http://magic-stocks.herokuapp.com/api/v1/predict/${stock}`;
//     // var predictUrl = `http://magic-stocks.herokuapp.com/api/v1/predict/${stock}`;
//     d3.json(predictUrl).then(function(prediction) {
//         console.log(prediction);
//     });
// }

// On ticker dropdown selection
d3.selectAll("#locality-dropdown").on("change", updatePlotly);

// Call updatePlotly() when a change takes place to the DOM
d3.select("#updatePlot").on("click", updatePlotly);

// Call updatePlotly() when a change takes place to the DOM
// d3.select("#predictPlot").on("click", runPrediction);

function buildPlot(stock) {
    var url = `https://cors-anywhere.herokuapp.com/http://magic-stocks.herokuapp.com/api/v1/metrics/${stock}`;
    // var url = `http://magic-stocks.herokuapp.com/api/v1/metrics/${stock}`;

    var imgurl = `https://cors-anywhere.herokuapp.com/http://magic-stocks.herokuapp.com/api/v1/stocks/${stock}`;
    // var imgurl = `http://magic-stocks.herokuapp.com/api/v1/stocks/${stock}`;

    d3.json(url).then(function(metric) {

        // Checkbox (CB) values
        var adjCloseCB = d3.select("#adj_close");
        var highCB = d3.select("#high");
        var lowCB = d3.select("#low");
        var nextCloseCB = d3.select("#next_close");
        var openCB = d3.select("#open_amt");
        var rocCB = d3.select("#roc");
        var rsiCB = d3.select("#rsi");
        var slowdCB = d3.select("#slowd");
        var slowkCB = d3.select("#slowk");
        var smaCB = d3.select("#sma");
        var volumeCB = d3.select("#volume");
        var willrCB = d3.select("#willr");


        var dates = metric.map(record => record['date']);
        var closingPrices = metric.map(record => record['close']);

        var closeTrace = {
            type: "scatter",
            mode: "lines",
            name: "Closing Price",
            x: dates,
            y: closingPrices
        };
        var data = [closeTrace];

        // trace options for check boxes

        // adjusted close
        if (adjCloseCB.property("checked")) {
            var adjClose = metric.map(record => record['adj_close']);

            var adjCloseTrace = {
                type: "scatter",
                mode: "lines",
                name: "Adjusted Close",
                x: dates,
                y: adjClose
            };
            data.push(adjCloseTrace)
        };

        // high
        if (highCB.property("checked")) {
            var high = metric.map(record => record['high']);

            var highTrace = {
                type: "scatter",
                mode: "lines",
                name: "Daily High",
                x: dates,
                y: high
            };
            data.push(highTrace)
        };

        // low
        if (lowCB.property("checked")) {
            var low = metric.map(record => record['low']);

            var lowTrace = {
                type: "scatter",
                mode: "lines",
                name: "Daily Low",
                x: dates,
                y: low
            };
            data.push(lowTrace)
        };

        // next close
        if (nextCloseCB.property("checked")) {
            var nextClose = metric.map(record => record['next_close']);

            var nextCloseTrace = {
                type: "scatter",
                mode: "lines",
                name: "Next Day Close",
                x: dates,
                y: nextClose
            };
            data.push(nextCloseTrace)
        };

        // open
        if (openCB.property("checked")) {
            var openAmt = metric.map(record => record['open_amt']);

            var openTrace = {
                type: "scatter",
                mode: "lines",
                name: "Daily Open",
                x: dates,
                y: openAmt
            };
            data.push(openTrace)
        };

        // roc - rate of change
        if (rocCB.property("checked")) {
            var roc = metric.map(record => record['roc']);

            var rocTrace = {
                type: "scatter",
                mode: "lines",
                name: "Rate of Change (ROC)",
                x: dates,
                y: roc
            };
            data.push(rocTrace)
        };

        // rsi - relative strength index
        if (rsiCB.property("checked")) {
            var rsi = metric.map(record => record['rsi']);

            var rsiTrace = {
                type: "scatter",
                mode: "lines",
                name: "Relative Strength Index (RSI)",
                x: dates,
                y: rsi
            };
            data.push(rsiTrace)
        };

        // slowd - stochastic oscillator
        if (slowdCB.property("checked")) {
            var slowd = metric.map(record => record['slowd']);

            var slowdTrace = {
                type: "scatter",
                mode: "lines",
                name: "Stochastic Oscillator (slowd)",
                x: dates,
                y: slowd
            };
            data.push(slowdTrace)
        };

        // slowk - stochastic oscillator
        if (slowkCB.property("checked")) {
            var slowk = metric.map(record => record['slowk']);

            var slowkTrace = {
                type: "scatter",
                mode: "lines",
                name: "Stochastic Oscillator (slowk)",
                x: dates,
                y: slowk
            };
            data.push(slowkTrace)
        };

        // simple moving average
        if (smaCB.property("checked")) {
            var sma = metric.map(record => record['sma']);

            var smaTrace = {
                type: "scatter",
                mode: "lines",
                name: "Simple Moving Average",
                x: dates,
                y: sma
            };
            data.push(smaTrace)
        };

        // volume
        if (volumeCB.property("checked")) {
            var volume = metric.map(record => record['volume']);

            var volumeTrace = {
                type: "scatter",
                mode: "lines",
                name: "Daily Volume",
                x: dates,
                y: volume
            };

            data.push(volumeTrace)
        };

        // willr - Williams %R
        if (willrCB.property("checked")) {
            var willr = metric.map(record => record['willr']);

            var willrTrace = {
                type: "scatter",
                mode: "lines",
                name: "Williams %R (WILLR)",
                x: dates,
                y: willr
            };

            data.push(willrTrace)
        };

        var layout = {
            title: `${stock.toUpperCase()} Closing Prices`,
            xaxis: {
                type: "date"
            },
            yaxis: {
                autorange: true,
                type: "linear"
            }
        };

        var chart = d3.select("#plot")
        chart.html("")

        d3.json(imgurl).then(function(data) {
            var stockName = d3.select("#stock")
            stockName.html(`<h5 class="text-center"><img src='/static/img/${data[0]['logo']}' height='75px' /> ${data[0]['name']}</h5>`)
        });

        Plotly.newPlot("plot", data, layout);
    });
}