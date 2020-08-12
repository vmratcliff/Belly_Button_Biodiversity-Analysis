async function init() {
    // Select the dropdown menu
    var dropdown = await d3.select("#selDataset");
    d3.json("data/samples.json").then(data => {
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        console.log(data)
        console.log(data.names)

        // Default to 940 as first record
        buildPlots(940);
        buildMetaTable(940);
    });
}

// Create a function to display the Demographic Info

async function buildMetaTable(id) {
    await d3.json("data/samples.json").then(data => {
        var meta_data = data.metadata.filter(data => data.id === id)[0];
        console.log(meta_data)
            // Select the sample-metadata
        var meta_data_filtered = d3.select("#sample-metadata");
        meta_data_filtered.html("");

        Object.entries(meta_data).forEach(([key, value]) => {
            meta_data_filtered.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Create a function to plot the charts

async function buildPlots(id) {
    await d3.json("data/samples.json").then(data => {

        // Variables

        var samples_data = data.samples.filter(data => (+data.id) === id)[0];
        console.log(samples_data)

        // For bar chart

        var top_sample_value = samples_data.sample_values.slice(0, 10).reverse();
        console.log(top_sample_value)
        var top_otu_id = samples_data.otu_ids.slice(0, 10).reverse().map(otu => "OTU " + otu);
        console.log(top_otu_id)
        var top_otu_label = samples_data.otu_labels.slice(0, 10).reverse();
        console.log(top_otu_label)

        // For bubble chart

        var sample_value = samples_data.sample_values;
        console.log(sample_value)
        var otu_id = samples_data.otu_ids;
        console.log(otu_id)
        var otu_label = samples_data.otu_labels;
        console.log(otu_label)

        // For gauge chart

        var meta_data = data.metadata.filter(data => (data.id) === id)[0];

        // Plot bar chart

        var trace_bar = {
            x: top_sample_value,
            y: top_otu_id,
            text: top_otu_label,
            name: "bellybutton",
            type: "bar",
            orientation: "h",
            marker: {
                color: ["#FFF1E5", "#FFE3CC", "#FFD5B2", "#FFC799", "#FFB97F",
                    "#FFAB66", "#FF9D4C", "#FF8F33", "#FF8119", "#FF7300"
                ]
            }
        };

        var bar_layout = {
            title: "<b>Top 10 OTUs per Subject </b>",
            width: 500,
            height: 400,
            margin: { t: 100, b: 0 },
        }

        var barData = [trace_bar];

        Plotly.newPlot("bar", barData, bar_layout);

        // Plot bubble chart

        var trace_bubble = {
            x: otu_id,
            y: sample_value,
            mode: 'markers',
            text: otu_label,
            marker: {
                size: sample_value,
                color: otu_id
            }
        };

        var bubble_layout = {
            showlegend: false,
            xaxis: { title: `OTU ID` },
            title: '<b>OTU - Bubble Chart</b>'
        };

        var bubbleData = [trace_bubble];

        Plotly.newPlot('bubble', bubbleData, bubble_layout);


        //BONUS

        // Plot gauge chart

        var gaugeData = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: meta_data.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b> <br> (Scrubs per week)" },
            type: "indicator",
            mode: "gauge+number",

            gauge: {
                axis: { range: [null, 10] },
                bar: { color: "#662D00" },
                steps: [
                    { range: [0, 1], color: "#FFF1E5" },
                    { range: [1, 2], color: "#FFE3CC" },
                    { range: [2, 3], color: "#FFD5B2" },
                    { range: [3, 4], color: "#FFC799" },
                    { range: [4, 5], color: "#FFB97F" },
                    { range: [5, 6], color: "#FFAB66" },
                    { range: [6, 7], color: "#FF9D4C" },
                    { range: [7, 8], color: "#FF8F33" },
                    { range: [8, 9], color: "#FF8119" },
                    { range: [9, 10], color: "#FF7300" },
                ],
            }
        }];

        var gauge_layout = { width: 500, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', gaugeData, gauge_layout);
    })
}

// Create a function for optionChanged element

function optionChanged(id) {
    buildPlots(+id);
    buildMetaTable(+id);
}

// Load the data and display default record

init();