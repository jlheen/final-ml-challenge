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

function runPrediction() {
    d3.event.preventDefault();
    var stock = d3.select("#locality-dropdown").node().value;
    var predictUrl = `https://cors-anywhere.herokuapp.com/http://magic-stocks.herokuapp.com/api/v1/predict/${stock}`;
    // var predictUrl = `http://magic-stocks.herokuapp.com/api/v1/predict/${stock}`;
    d3.json(predictUrl).then(function(prediction) {
        console.log(prediction);
    });
}

// On ticker dropdown selection
d3.selectAll("#locality-dropdown").on("change", updatePlotly);

// Call updatePlotly() when a change takes place to the DOM
d3.select("#updatePlot").on("click", updatePlotly);

// Call updatePlotly() when a change takes place to the DOM
d3.select("#predictPlot").on("click", runPrediction);

function buildPlot(stock) {
    var url = `https://cors-anywhere.herokuapp.com/http://magic-stocks.herokuapp.com/api/v1/metrics/${stock}`;
    // var url = `http://magic-stocks.herokuapp.com/api/v1/metrics/${stock}`;

    d3.json(url).then(function(metric) {

        // Checkbox (CB) values
        var smaCB = d3.select("#sma");
        var rsiCB = d3.select("#rsi");
        var dvCB = d3.select("#dv");
        var highCB = d3.select("#high");


        var dates = metric.map(record => record['date']);
        var closingPrices = metric.map(record => record['close']);

        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: "Closing Price",
            x: dates,
            y: closingPrices,
            line: {
                color: "#17BECF"
            }
        };

        var data = [trace1];

        // trace options for check boxes

        // simple moving average
        if (smaCB.property("checked")) {
            var sma = metric.map(record => record['sma']);

            var trace2 = {
                type: "scatter",
                mode: "lines",
                name: "Moving Average",
                x: dates,
                y: sma,
                line: {
                    color: "#32a852"
                }
            };

            data.push(trace2)

        };

        // relative strength index
        if (rsiCB.property("checked")) {
            var rsi = metric.map(record => record['rsi']);

            var trace3 = {
                type: "scatter",
                mode: "lines",
                name: "Relative Strength Index",
                x: dates,
                y: rsi,
                line: {
                    color: "#9342f5"
                }
            };

            data.push(trace3)
        };

        // dividends
        if (dvCB.property("checked")) {
            var dv = metric.map(record => record['dividend']);

            var trace4 = {
                type: "scatter",
                mode: "lines",
                name: "Dividends",
                x: dates,
                y: dv,
                line: {
                    color: "#429ef5"
                }
            };

            data.push(trace4)
        };

        // highs
        if (highCB.property("checked")) {
            var high = metric.map(record => record['high']);

            var trace5 = {
                type: "scatter",
                mode: "lines",
                name: "Highs",
                x: dates,
                y: high,
                line: {
                    color: "#f58442"
                }
            };

            data.push(trace5)
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

        Plotly.newPlot("plot", data, layout);

    });
}