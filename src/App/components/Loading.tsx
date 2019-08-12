import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

interface Props {
   type?: 'blank' | 'balls' | 'bars' | 'bubbles' | 'cubes' | 'cylon' | 'spin' | 'spinningBubbles' | 'spokes' | undefined;
   height?: string;
   width?: string;
   color?: string;
}

const Loading: React.FC<Props> = ({ type = 'bars', color = '#ED001C' }): JSX.Element => (
   <Container>
      <ReactLoading type={type} color={color} height={'15%'} width={'15%'} />
   </Container>
);

export default Loading;

const Container = styled.div`
   margin: 0 auto;
   width: 100%;
   text-align: center;
   background-color: transparent;
   height: 100vh;
   display: flex;
   justify-content: center;
   padding-top: 4em;
   align-items: flex-start;
`;
