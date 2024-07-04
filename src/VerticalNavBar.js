// src/VerticalNavBar.js
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavContainer = styled.div`
  height: 100vh;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #111;
  padding-top: 20px;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
  }
`;

const StyledNavLink = styled(NavLink)`
  padding: 10px 15px;
  text-decoration: none;
  font-size: 18px;
  color: white;
  display: block;
  &:hover {
    background-color: #575757;
  }
  &.active {
    background-color: #4CAF50;
    color: white;
  }
`;

const VerticalNavBar = () => {
  return (
    <NavContainer>
      <StyledNavLink to="/" end>CC Home</StyledNavLink>
      <StyledNavLink to="/projects">Project Activity</StyledNavLink>
      <StyledNavLink to="/Financial">Financial Forecast</StyledNavLink>
      <StyledNavLink to="/contacts">Portfolio overview</StyledNavLink>
    </NavContainer>
  );
};

export default VerticalNavBar;
