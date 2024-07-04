// src/Projects.js
import React from 'react';
import ProjectChart from './ProjectChart';
import axios from 'axios';

const Projects = () => {
  return (
    <div>
      <h1>Project Progress Chart</h1>
      <ProjectChart />
    </div>
  );
};

export default Projects;