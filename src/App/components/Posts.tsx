import React from 'react';
import { SubReddit } from '../types';
import { useSharedState } from '../Api';
import { BehaviorSubject } from 'rxjs';
import styled from 'styled-components';
import SubRedditSelection from './SubRedditSelection';
import PostTitle from './PostTitle';
import Loading from './Loading';
import { RouteComponentProps } from '@reach/router';

export const RedditStateSubject = new BehaviorSubject({
   isFetching: false,
   posts: [],
   selectedPost: {},
   lastUpdated: new Date()
});

const Posts: React.FC<RouteComponentProps> = (): JSX.Element => {
   const options = [
      SubReddit.ReactJS,
      SubReddit.Angular,
      SubReddit.WebDev,
      SubReddit.LearnJS,
      SubReddit.Node,
      SubReddit.ProgrammerHumor,
      SubReddit.SoftwareGore,
      SubReddit.TypeScript,
      SubReddit.WebDesign
   ];
   const [{ isFetching, posts }] = useSharedState(RedditStateSubject);
   const isLoading = isFetching && posts.length === 0;
   const isEmpty = !isFetching && posts.length === 0;
   return (
      <Container>
         <SubRedditSelection options={options} />
         {isLoading && <Loading />}
         {isEmpty && <h2>No posts to show!</h2>}
         <PostList>
            {posts.map((post: any, i: number) => (
               <li key={i}>
                  <PostTitle title={post.title} id={post.id} />
               </li>
            ))}
         </PostList>
      </Container>
   );
};

const Container = styled.div`
   min-height: 100vh;
   height: 100%;
   box-sizing: border-box;
   padding: 0 20px;
`;
const PostList = styled.ul`
   list-style: none;
   text-align: left;
   padding: 5px;
   margin: 0 auto;
   width: 100%;
`;

export default Posts;
