import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SUBREDDIT } from '../../constants';
import { SubReddit } from '../types';

const SubRedditSelection: React.FC<{ options: string[] }> = ({ options }): JSX.Element => {
   const dispatch = useDispatch();
   const selectedSubReddit = useSelector(({ selectedSubReddit }: { selectedSubReddit: SubReddit }) => selectedSubReddit);
   return (
      <Container>
         <h1>
            <RedditPrefix>/r/</RedditPrefix>
            {selectedSubReddit}
         </h1>
         <Select onChange={(e: ChangeEvent<HTMLSelectElement>) => dispatch({ type: SET_SUBREDDIT, payload: e.target.value })} value={selectedSubReddit}>
            {options.map(option => (
               <option value={option} key={option}>
                  {option}
               </option>
            ))}
         </Select>
      </Container>
   );
};

export default SubRedditSelection;

const Container = styled.div`margin: 1em auto;`;

const RedditPrefix = styled.span`
   color: #ff4300;
   font-size: 1.3em;
   font-weight: 900;
   padding-right: 3px;
`;

const Select = styled.select`
   background-color: white;
   border-radius: 4px;
   display: inline-block;
   font: inherit;
   line-height: 1.5em;
   padding: 0.5em 3.5em 0.5em 1em;

   /* reset */

   margin: 0;
   /* -webkit-box-sizing: border-box;
   -moz-box-sizing: border-box;
   box-sizing: border-box;
   -webkit-appearance: none;
   -moz-appearance: none;
   background-image: linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%),
      radial-gradient(#ddd 70%, transparent 72%);
   background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), calc(100% - .5em) .5em;
   background-size: 5px 5px, 5px 5px, 1.5em 1.5em;
   background-repeat: no-repeat; */
   /* background-color: white;
   border-radius: 4px;
   display: inline-block;
   font: inherit;
   line-height: 1.5em;
   padding: 0.5em 3.5em 0.5em 1em;
   margin: 0;
   -webkit-box-sizing: border-box;
   -moz-box-sizing: border-box;
   box-sizing: border-box;
   -webkit-appearance: none;
   -moz-appearance: none;
   background-image: linear-gradient(45deg, transparent 50%, #ff4300 50%), linear-gradient(135deg, #ff4300 50%, transparent 50%),
      radial-gradient(#ddd 70%, transparent 72%);
   background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), calc(100% - .5em) .5em;
   background-size: 5px 5px, 5px 5px, 1.5em 1.5em;
   background-repeat: no-repeat;
   &:focus {
      background-image: linear-gradient(45deg, white 50%, transparent 50%), linear-gradient(135deg, transparent 50%, white 50%),
         radial-gradient(#ff4300 70%, transparent 72%);
      background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em, calc(100% - .5em) .5em;
      background-size: 5px 5px, 5px 5px, 1.5em 1.5em;
      background-repeat: no-repeat;
      border-color: green;
      outline: 0;
   } */
`;
