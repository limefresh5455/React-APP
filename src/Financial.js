
// src/News.js

import   './ProgressBarChart.css';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';


// const data = {
//     'Project 01': { 'totalbudget': 100000, 'Accrual Amount': 124911, 'Used Budget': 97618.0, 'Days Difference': 164 },
//     'Project 02': { 'totalbudget': 150000, 'Accrual Amount': 198804, 'Used Budget': 110557.03, 'Days Difference': 202 },
//     'Project 03': { 'totalbudget': 130000, 'Accrual Amount': 145690, 'Used Budget': 87532.85, 'Days Difference': 340 },
//     'Project 04': { 'totalbudget': 100000, 'Accrual Amount': 186736, 'Used Budget': 122653.31, 'Days Difference': 162 }
// };

const Financial = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/testdata2')
            .then(response => {
                const transformedData = Object.keys(response.data).map((project, index) => {
                    const projectData = response.data[project];
                    console.log(response.data)
                    return {
                        value: projectData['Used Budget'],
                        project: project,
                        color: '#f28e2b',
                        projectColor: d3.schemeCategory10[index % 10],
                        markerPosition: projectData['Days Difference'] / 365 // Assuming marker position is relative to a year
                    };
                });
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching the data', error);
            });
    }, []);





    const chartRef = useRef();
    const [filterType, setFilterType] = useState('none');
    const [filteredData, setFilteredData] = useState(Object.entries(data));

    useEffect(() => {
        filterData(filterType);
    }, [filterType]);

    useEffect(() => {
        renderChart();
    }, [filteredData]);

    const filterData = (filterType) => {
        let filteredData = Object.entries(data);
        if (filterType === 'top') {
            filteredData = filteredData.sort((a, b) => b[1]['totalbudget'] - a[1]['totalbudget']).slice(0, 5);
        } else if (filterType === 'lowest') {
            filteredData = filteredData.sort((a, b) => a[1]['totalbudget'] - b[1]['totalbudget']).slice(0, 5);
        }
        setFilteredData(filteredData);
    };

    const renderChart = () => {
        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove(); // Clear previous contents

        const margin = { top: 20, right: 30, bottom: 40, left: 150 };
        const width = 900 - margin.left - margin.right;
        const height = filteredData.length * 40;

        const x = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d[1]['totalbudget'])])
            .range([0, width]);

        const y = d3.scaleBand()
            .domain(filteredData.map(d => d[0]))
            .range([0, height])
            .padding(0.1);

        const xAxis = d3.axisBottom(x).ticks(5);
        const yAxis = d3.axisLeft(y);

        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        chart.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        chart.selectAll('.bar')
            .data(filteredData)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('y', d => y(d[0]))
            .attr('width', d => x(d[1]['totalbudget']))
            .attr('height', y.bandwidth())
            .attr('fill', '#f28e2b');

        chart.selectAll('.label')
            .data(filteredData)
            .enter().append('text')
            .attr('class', 'label')
            .attr('x', d => x(d[1]['totalbudget']) - 3)
            .attr('y', d => y(d[0]) + y.bandwidth() / 2 + 5)
            .attr('text-anchor', 'end')
            .attr('fill', 'white')
            .text(d => d[1]['totalbudget']);
    };

    return (
        <div>
            <div className="filters">
                <label htmlFor="filter">Filter by: </label>
                <select id="filter" onChange={(e) => setFilterType(e.target.value)} value={filterType}>
                    <option value="none">None</option>
                    <option value="top">Top 5 Budget</option>
                    <option value="lowest">Lowest 5 Budget</option>
                </select>
            </div>
            <svg ref={chartRef} width="800" height="400"></svg>
        </div>
    );

};

export default Financial;