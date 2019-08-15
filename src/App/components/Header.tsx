import React from 'react';
import { useDispatch } from 'react-redux';
import { TOGGLE_THEME, SET_SUBREDDIT } from '../../constants';
import ThemeToggler from './ThemeToggler';
import styled from 'styled-components';

const Header = () => {
   const dispatch = useDispatch();
   return (
      <Nav>
         <ButtonWrapper>
            <NavButton onClick={() => dispatch({ type: SET_SUBREDDIT, payload: 'all' })}>All</NavButton>
            <NavButton onClick={() => dispatch({ type: SET_SUBREDDIT, payload: 'popular' })}>Popular</NavButton>
            <NavButton onClick={() => dispatch({ type: SET_SUBREDDIT, payload: 'original' })}>Original Content</NavButton>
            <NavButton onClick={() => dispatch({ type: SET_SUBREDDIT, payload: 'original' })}>Favorites</NavButton>
         </ButtonWrapper>
            <SearchInput />
         <ThemeToggler onClick={() => dispatch({ type: TOGGLE_THEME })} />
      </Nav>
   );
};

export default Header;

const Nav = styled.nav`
   display: flex;
   flex-direction: row;
   align-items: center;
   padding: 15px;
   margin-bottom: 1em;
`;

const ButtonWrapper = styled.div`
   display: flex;
   flex-direction: row;
   align-self: flex-start;
   justify-content: flex-start;
   margin-right: auto;
   > * {
      margin: 0 10px;
   }
`;

const NavButton = styled.button.attrs({ type: 'button' })`
   border: none;
   background-color: #FFB100;
   padding: 5px 10px;
   border-radius: 4px;
   font-size: 1em;
   color: #eee;

   &:hover {
      transform: scale(1.1);
      transition-duration: 250ms;
      cursor: pointer;
      color: #fff;
   }
`;

const SearchInput = styled.input.attrs({type: 'text', placeholder: 'search' })`
   padding: 7px;
   border-radius: 20px;
   text-indent: 12px;
   width: 40%;
   font-size: 0.8em;
   margin: 0 auto;
   border: 1px thin gray;
`