//Start the dashboard with all visuals defaulting to the first test subject

function DashBoardInit() {

    // Get Data
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(url).then(function (data) {

        // JSON has three arrays - names, metadata[.id, .ethnicity, .gender, .age, .location, .bbtype, .wfreq], 
        // and samples [.id, .otu_ids, .sample_values, .otu_labels]

        // Get names, metadata, samples & log to console to check for accuracy

        let names = Object.values(data.names);

        // List subject IDs in dropdown menu
        let drop_menu = d3.select("#selDataset");
        names.forEach(function (names) {
            drop_menu.append("option").text(names);
        });

        var first_subj_ID = names[0];
        optionChanged(first_subj_ID);

    });

}

//Function that updates all graphics when a new subject ID is selected.

function optionChanged(subject_ID) {

    // Get Data Set

    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(url).then(function (url) {
        data = url;

        var subject_metadata = data.metadata.filter((x) => x.id == subject_ID)[0];
        CreateDemographics(subject_metadata);

        // Call all graphing/display related functions
        // get data values only for the selected subject_ID

        var sample_data = data.samples.filter((x) => x.id == subject_ID)[0];
        CreateBarGraph(sample_data.sample_values, sample_data.otu_ids);
        CreateBubbleChart(sample_data.otu_ids, sample_data.sample_values, sample_data.otu_labels);
        WashGauge(subject_metadata)
        // CreateDemographics(metadata_subset[0])

    });

}

//Create a horizontal bar chart with a dropdown menu to displaythe top 10 OTUs found in that individual.

function CreateBarGraph(sample_values, otu_ids) {

    let bar_graph_data = [{
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        type: "bar",
        orientation: "h",
        marker: {
            color: 'rgb(158,202,225)'
        }
    }];

    let bar_layout = [{
        title: "Top 10 OTUs",
    }];

    Plotly.newPlot("bar", bar_graph_data, bar_layout);

}

// Create a bubble chart that displays each sample.

function CreateBubbleChart(otu_ids, sample_values, otu_labels) {

    let BubbleData = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: 'RdBu',
        }
    }];

    let BubbleLayout = [{
        title: "Belly Button Samples",
        xaxis: { title: "OTU ID" },
        showlegend: true,
        height: 1000,
        width: 5000,
    }];

    Plotly.newPlot("bubble", BubbleData, BubbleLayout);
}

// Display Demographic Information

function CreateDemographics(metadata_subset) {

    // For each key value pair in the metadata and build the html encoded string (including the breaks) which will be read and populate the
    // the selected patient's information  

    var demo_html = "";
    console.log(metadata_subset);


    Object.entries(metadata_subset).forEach(([key, value]) =>
        demo_html += `${key.toLocaleUpperCase()}: ${value}<br>`)
    console.log(demo_html);
    var demo_div =  d3.select("#sample-metadata");
    demo_div.html(demo_html);

}

// Display Gauge Chart showing washing frequency

function WashGauge(metadata_subset) {

    let wash_value = metadata_subset.wfreq;

    let gauge_data = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: wash_value,
        type: "indicator",
        axis: { range: [null, 9] },
        title: { text: "Washing Frequency" },
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9], tickwidth: 3 },
            bar: { color: "red", thickness: 0.4 },
            steps: [
                { range: [0, 2], color: "c9f3ce" },
                { range: [2, 4], color: "f3cec9" },
                { range: [4, 6], color: "cd7eaf" },
                { range: [6, 9], color: "3f277d" },
            ],
            threshold: {
                line: { color: "red", width: 6 },
                thickness: 1.75,
                value: wash_value
            }
        }
    }];

    let gauge_layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

    Plotly.newPlot("gauge", gauge_data, gauge_layout);

}

DashBoardInit();