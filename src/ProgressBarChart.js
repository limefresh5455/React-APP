import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const ProgressBarChart = () => {
    const [data, setData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/testdata2')
            .then(response => {
                const transformedData = Object.keys(response.data).map((project, index) => {
                    const projectData = response.data[project];
                    return {
                        value: projectData['Used Budget'],
                        project: project,
                        color: '#f28e2b',
                        projectColor: d3.schemeCategory10[index % 10],
                        markerPosition: projectData['Days Difference'] / 365 // Assuming marker position is relative to a year
                    };
                });
                setData(transformedData);
            })
            .catch(error => {
                console.error('Error fetching the data', error);
            });
    }, []);

    useEffect(() => {
        const container = d3.select(chartRef.current);
        container.selectAll("*").remove(); // Clear existing content

        data.forEach(d => {
            const barContainer = container.append("div").attr("class", "bar-container");
            barContainer.append("div").attr("class", "label").text(d.value);

            const bar = barContainer.append("div").attr("class", "bar");
            bar.append("div")
                .attr("class", "progress")
                .style("width", `${d.value / 1000}px`) // Adjusting width scale
                .style("background", d.color);

            bar.append("div")
                .attr("class", "project-label")
                .style("width", `${d.value / 1000}px`) // Adjusting width scale
                .style("background", d.projectColor)
                .text(d.project);

            bar.append("div")
                .attr("class", "marker")
                .style("left", `${d.markerPosition * 100}%`);
        });
    }, [data]);

    return <div id="chart" ref={chartRef}></div>;
};

export default ProgressBarChart;
