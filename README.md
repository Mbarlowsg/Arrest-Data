# Arrest Data
This is a data visualization project for LCOD 2123: Internet Geographies.

## Rationale:
My goal for this project was to do something with data analysis. I thought comparing arrest data throughout the different boroughs in New York City would be an interesting project to work on.

## Method:
Initially, I had just plotted out the different arrests throughout the city with the boroughs borders as a visual guide to aid the user in knowling which borough the arrest had happened. However, the idea of seperating the statistics by the boroughs became a more interesting idea to me. This led me to create a jupiter notebook (data_analysis.ipynb) to break up the data using pandas. Once I had done this I could import it into the leaflet.js map and these statistics are shown to the user as they hover over the borough. 

## What could be better / done in the future:
- I would like to find where the jurisdiction for each precinct ends to be able to analyze the levels of policing around different precincts.
    - This would be able to tell us if specific precincts are over policing their areas and what crimes people get arrested for the most.
- Data used for this visualization is only the first 1000 rows of the data. A more comprehensive visualization could be more effective for analysis.
- Change the markers to reflect what crime was committed.
- Different colours per borough (I tried this but it just looked ugly and too colourful)
- More CSS styling on the borough info (I suck at CSS but should be able to manage some basic styling)

## Data Sources:
- [Arrest Data](https://data.cityofnewyork.us/Public-Safety/NYPD-Arrest-Data-Year-to-Date-/uip8-fykc/about_data)
- [Borough Geometry Data](https://github.com/codeforgermany/click_that_hood/blob/main/public/data/new-york-city-boroughs.geojson)
