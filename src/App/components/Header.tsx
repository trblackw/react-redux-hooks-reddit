import React from 'react';
import { useDispatch } from 'react-redux';
import { TOGGLE_THEME } from '../../constants';
import ThemeToggler from './ThemeToggler';
import styled from 'styled-components';

const Header = () => {
   const dispatch = useDispatch();
   return (
      <Nav>
         <ThemeToggler onClick={() => dispatch({ type: TOGGLE_THEME })} />
      </Nav>
   );
};

export default Header;

const Nav = styled.nav`
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
   padding: 15px;
`