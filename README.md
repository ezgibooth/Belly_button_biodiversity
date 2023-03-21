
In this Challenge, we are tasked with building an interactive dashboard to explore the Belly Button Biodiversity found at: 
http://robdunnlab.com/projects/belly-button-biodiversity/

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

The created dashboard allows the re-creation of all the plots when a new sample is selected.

# D3 library read
    Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

# Horizontal bar chart

    Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

        Use sample_values as the values for the bar chart.

        Use otu_ids as the labels for the bar chart.

        Use otu_labels as the hovertext for the chart.

# Bubble Chart

    Create a bubble chart that displays each sample.

        Use otu_ids for the x values.

        Use sample_values for the y values.

        Use sample_values for the marker size.

        Use otu_ids for the marker colors.

        Use otu_labels for the text values.

# Demographic Info update

    Display the sample metadata, i.e., an individual's demographic information.

    Display each key-value pair from the metadata JSON object somewhere on the page.

# Gauge Chart

    The gauge code accounts for values ranging from 0 through 9.

    It is updated whenever a new sample is selected.


![Screenshot Subject940 Dashboard](https://user-images.githubusercontent.com/118090932/226495700-bbe01c85-6e2d-44ee-b0f6-dc2cd873a71c.png)
