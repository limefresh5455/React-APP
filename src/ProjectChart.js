import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { axisLeft } from 'd3';

// Styled Components
const ChartContainer = styled.div`
  margin: 20px;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.div`
  width: 50px;
`;

const BarWrapper = styled.div`
  width: 300px;
  height: 20px;
  background: #eee;
  margin-left: 10px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: ${({ color }) => color || '#000'};
  width: ${({ width }) => width || '0%'};
  position: absolute;
`;

const Marker = styled.div`
  height: 100%;
  width: 2px;
  background: black;
  position: absolute;
  left: ${({ position }) => position || '0%'};
`;

const colors = {
  'Project 01': '#3498db',
  'Project 02': '#1abc9c',
  'Project 03': '#e74c3c',
  'Project 04': '#2ecc71',
};

const ProjectChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/testdata2')
      .then(response => {
        console.log(response.data)
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const maxDays = Math.max(...Object.values(data).map(project => project['Days Difference']));

  return (
    <ChartContainer>
      {Object.entries(data).map(([project, values]) => {
        const { 'Days Difference': days, 'Used Budget': usedBudget, 'totalbudget':totalbudget ,'Accrual Amount':AccrualAmount} = values;
        // const width = (days / maxDays) * 100;
        const width = totalbudget;
        const budgetMarker = (AccrualAmount / totalbudget) * 100;
        const usedbd = (usedBudget/totalbudget)*100;
        console.log(budgetMarker)
        return (
          <Bar key={project}>
            <Label>{days}</Label>
            <BarWrapper>
              <Progress width={`${width}%`} color="gray" />
              <Progress width={`${usedbd}%`} color="red" />
              <Marker position={`${budgetMarker}%` } />
            </BarWrapper>
            <Label>{project}</Label>
          </Bar>
        );
      })}
    </ChartContainer>
  );
};

export default ProjectChart;
