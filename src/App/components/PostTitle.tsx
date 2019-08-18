import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

const PostTitle: React.FC<{ title: string; id: string }> = ({ title, id }): JSX.Element => <Title to={`/${id}`}>{title}</Title>;

export default PostTitle;

const Title = styled(Link)`
   font-weight: 700;
   padding: 1em 0;
   margin: 20px 0;
   margin: 5px auto;
   text-decoration: none;
   cursor: pointer;
   color: inherit;

   &:hover {
      color: #FF4300
   }
`;
