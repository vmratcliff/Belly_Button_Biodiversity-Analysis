// Use D3 fetch to read the JSON file
function init() {
    var sampleId = d3.select("#selDataset");
    d3.json("./data/samples.json").then((x) => {
        var nameId = x.names;
        nameId.forEach((id) => {
            sampleId.append("option").text(id).property("value", id)
        })
    var firstId = nameId[0]    
    buildMetadata(firstId)
    buildBarChart(firstId)
    })
}

init()

function optionChanged(newsample) {
    buildMetadata(newsample)
    buildBarChart(newsample)
}


function buildMetadata(sample) {
    d3.json("./data/samples.json").then((x) => {
        var metadata = x.metadata;
        var filterdata = metadata.filter(x => x.id == sample)
        console.log(filterdata)
        var filterdata1 = filterdata[0]
        console.log(filterdata1)

// Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");

// Use `.html("")` to clear any existing metadata
    sample_metadata.html("");

// Use Object entries to add each key and value pair to the panel
    Object.entries(filterdata1).forEach(([key, value]) => {
        var row = sample_metadata.append("p");
        row.text(`${key}: ${value}`);
        })
    });
};

function buildBarChart(sample) {
    d3.json("./data/samples.json").then((x) => {
        var newsamples = x.samples;
        console.log(newsamples)
        var results = newsamples.filter(y => y.id == sample)
        console.log(results)
        var results1 = results[0];
        console.log(results1)

    var ybar = results1.otu_ids; 
    var xbar = results1.sample_values;
    var barHover = results1.otu_labels; 

//  Build horizontal bar chart using the sample data
    var trace1 = {
        y: ybar.slice(0, 10).map(object => `OTU ${object}`).reverse(),
        x: xbar.slice(0, 10).reverse(),
        hovertext: barHover.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
    }
    var data = [trace1];

    var layout = {
        title: "Top 10 OTUs",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };

    Plotly.newPlot("bar", data, layout);

//  Build bubble chart using the sample data
    var trace2 = {
        y: xbar,
        x: ybar,
        hovertext: barHover,
        mode: "markers",
        marker: {size:xbar, color:ybar}
    }
    var data1 = [trace2];

    var layout1 = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
        };

    Plotly.newPlot("bubble", data1, layout1);
});
}
