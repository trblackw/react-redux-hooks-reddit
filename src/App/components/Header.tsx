import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TOGGLE_THEME, SET_SUBREDDIT } from '../../constants';
import ThemeToggler from './ThemeToggler';
import styled from 'styled-components';
import { SubReddit } from '../types';
import useViewport from '../hooks/useViewport';

const Header = () => {
   const dispatch = useDispatch();
   const selectedSubReddit = useSelector(({ selectedSubReddit }: { selectedSubReddit: SubReddit }) => selectedSubReddit);
   const [{ width: windowWidth }] = useViewport();
   return (
      <Fragment>
         <Nav>
            <ButtonWrapper>
               <NavButton onClick={() => dispatch({ type: SET_SUBREDDIT, payload: 'all' })}>All</NavButton>
               <NavButton onClick={() => dispatch({ type: SET_SUBREDDIT, payload: 'popular' })}>Popular</NavButton>
               <NavButton onClick={() => dispatch({ type: SET_SUBREDDIT, payload: 'original' })}>Original</NavButton>
               <NavButton onClick={() => dispatch({ type: SET_SUBREDDIT, payload: 'original' })}>Favorites</NavButton>
               {windowWidth >= 948 && (
                  <FlexWrapper>
                     <SearchLabel>{`${selectedSubReddit} / `}</SearchLabel>
                     <SearchInput />
                  </FlexWrapper>
               )}
            </ButtonWrapper>
            <ThemeToggler onClick={() => dispatch({ type: TOGGLE_THEME })} />
         </Nav>
         {windowWidth < 947 && (
            <FlexWrapper>
               <SearchLabel>{`${selectedSubReddit}/ `}</SearchLabel>
               <SearchInput />
            </FlexWrapper>
         )}
      </Fragment>
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
   width: 100%;
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
   align-self: center;

   &:hover {
      transform: scale(1.1);
      transition-duration: 250ms;
      cursor: pointer;
      color: #fff;
   }
`;

const FlexWrapper = styled.div`
   display: flex;
   justify-content: flex-start;
   width: 60%;
   flex-direction: row;

   @media screen and (max-width: 947px) {
      margin-left: 15px;
      width: 90%;
   }
`;

const SearchLabel = styled.label`
   display: inline-block;
   margin-right: 4px;
`;

const SearchInput = styled.input.attrs({ type: 'text' })`
   padding: 4px;
   border-radius: 20px;
   text-indent: 12px;
   width: 100%;
   max-width: 400px;

   font-size: 0.8em;
   border: 1px thin gray;
`;
