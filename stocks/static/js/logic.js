// Call updatePlotly() when a change takes place to the dropdown menu
d3.selectAll("#tickerSelect").on("change", updatePlotly);
d3.selectAll("#tickerUpdate").on("click", updatePlotly);

function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#tickerSelect");
    var openCheckBox = d3.select("#openCheck");
    var highCheckBox = d3.select("#highCheck");
    var lowCheckBox = d3.select("#lowCheck");
    var smaCheckBox = d3.select("#smaCheck");
    var rsiCheckBox = d3.select("#rsiCheck");
    // Assign the value of the dropdown menu option to a variable
    ticker = dropdownMenu.property("value");

    /* API call for ticker specific data */
    var url = `https://cors-anywhere.herokuapp.com/http://magic-stocks.herokuapp.com/api/v1/metrics/${ticker}`

    /**
    * index 0 - adj_close
    * index 1 - close
    * index 2 - date
    * index 3 - direction
    * index 4 - dividend
    * index 5 - high
    * index 6 - id
    * index 7 - low
    * index 8 - next_close
    * index 9 - open_amt
    * index 10 - roc
    * index 11 - rsi
    * index 12 - slowd
    * index 13 - slowk
    * index 14 - sma
    * index 15 - split
    * index 16 - std
    * index 17 - ticker
    * index 18 - volume
    * index 19 - willr
    */

    d3.json(url).then(function(metrics) {
        
        // Grab values from the data json object to build the plots
        var dates = metrics.map(record => record['date']);
        var closingPrices = metrics.map(record => record['close']);

        var trace = {
            type: "scatter",
            mode: "lines",
            name: "Closing Price",
            x: dates,
            y: closingPrices
        };

        var data = [trace]

        // Check if additional trace values are needed, map, and add them
        if (openCheckBox.property("checked")) {
            var open_amt = metrics.map(record => record['open_amt']);
            var traceOpen = {
                type: "scatter",
                mode: "lines",
                name: "Open Price",
                x: dates,
                y: open_amt
            }
            data.push(traceOpen)
        }

        if (highCheckBox.property("checked")) {
            var high = metrics.map(record => record['high']);
            var traceHigh = {
                type: "scatter",
                mode: "lines",
                name: "Daily High Price",
                x: dates,
                y: high
            }
            data.push(traceHigh)
        }

        if (lowCheckBox.property("checked")) {
            var low = metrics.map(record => record['low']);
            var traceLow = {
                type: "scatter",
                mode: "lines",
                name: "Daily Low Price",
                x: dates,
                y: low
            }
            data.push(traceLow)
        }
        
        if (smaCheckBox.property("checked")) {
            var sma = metrics.map(record => record['sma']);
            var traceSMA = {
                type: "scatter",
                mode: "lines",
                name: "SMA",
                x: dates,
                y: sma
            }
            data.push(traceSMA)
        }

        if (rsiCheckBox.property("checked")) {
            var rsi = metrics.map(record => record['rsi']);
            var traceRSI = {
                type: "scatter",
                mode: "lines",
                name: "RSI",
                x: dates,
                y: rsi
            }
            data.push(traceRSI)
        }
    
        var layout = {
            title: `${ticker.toUpperCase()} Closing Prices`,
            xaxis: {
                type: "date"
            },
            yaxis: {
                autorange: true,
                type: "linear"
            }
        };
      
        var plot = d3.select("#stock");
        plot.html("");
        Plotly.newPlot("stock", data, layout);
    });
};