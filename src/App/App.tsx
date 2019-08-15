import React from 'react';
import { Router } from '@reach/router';
import Post from './components/Post';
import Posts from './components/Posts';
import { Themes } from './state';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from './components/Header';

const App = () => {
   //@ts-ignore
   const theme = useSelector(({ theme }: Themes) => theme);
   return (
      <AppContainer theme={theme}>
         <Header />
         <Router>
            <Posts path='/' />
            <Post path='/:id' />
         </Router>
      </AppContainer>
   );
};

const AppContainer = styled.div`
   margin: 0 auto;
   background-color: ${({ theme }) => theme === Themes.light ? '#fff' : '#222'};
   transition: background-color 0.7s ease;
   color: ${({ theme }) => theme === Themes.light ? '#222' : '#eee'};
   transition: color 0.7s ease;

   @media screen and (max-width: 375px) {
      margin: unset;
      width: 100%;
   }
`;
export default App;
