import React, { useEffect, useState } from 'react';
import { SubReddit } from '../types';
import styled from 'styled-components';
import SubRedditSelection from './SubRedditSelection';
import PostTitle from './PostTitle';
import Loading from './Loading';
import { ViewContainer } from './SharedStyledComponents';
import { RouteComponentProps } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_POSTS } from '../../constants';
import { Images } from '../types';
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

const Posts: React.FC<RouteComponentProps> = (): JSX.Element => {
   const posts = useSelector(({ posts }: any) => posts);
   const dispatch = useDispatch();
   const [loading, setLoading] = useState<boolean>(false);
   const selectedSubReddit = useSelector(({ selectedSubReddit }: { selectedSubReddit: SubReddit }) => selectedSubReddit);

   const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`https://www.reddit.com/r/${selectedSubReddit}/top.json?limit=50`);
      const { data: { children: posts } } = await res.json();
      dispatch({ type: FETCH_POSTS, payload: posts.map(({ data }: any) => data) });
      setLoading(false);
   };

   useEffect(() => {
      fetchPosts();
   }, [selectedSubReddit]);

   return (
      <ViewContainer>
         <SubRedditSelection options={options} />
         {loading ? (
            <Loading />
         ) : (
            <PostList>
               {posts.map((post: any, i: number) => (
                  <li key={i}>
                     <PostTitle title={post.title} id={post.id} />
                     <SubContentContainer>
                        <PostAuthor>{post.author}</PostAuthor>
                        <Popularity>
                           <img src='https://icon.now.sh/mode_comment/18/149EF0' alt='comment icon' /> {post.num_comments}
                        </Popularity>
                        <Popularity>
                           <img src='https://icon.now.sh/arrow_upward/18/FF5700' alt='upvote icon' /> {post.ups}
                        </Popularity>
                        <BookmarkButton>Bookmark</BookmarkButton>
                     </SubContentContainer>
                  </li>
               ))}
            </PostList>
         )}
      </ViewContainer>
   );
};

const PostList = styled.ul`
   list-style: none;
   text-align: left;
   padding: 5px;
   margin: 0 auto;
   width: 100%;

   li {
      margin: 1em 0;
      padding-bottom: 5px;
   }
`;

export const SubContentContainer = styled.div`
   display: flex;
   justify-content: flex-start;
   flex-direction: row;
`;

export const PostAuthor = styled.span`
   color: darkgray;
   margin-left: 5px;
`;

export const Popularity = styled.div`
   margin-left: 10px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   flex-direction: row;

   > * {
      margin: 0 5px;
   }
`;

const BookmarkButton = styled.button.attrs({ type: 'button'})`
   background-color: #00D4BB;
   border-radius: 4px;
   padding: 4px 6px;
   border: none;
   margin-left: auto;
   font-size: 0.9em;
   font-weight: bold;
   color: #eee;
   &:hover {
      transform: scale(1.1);
      transition-duration: 250ms;
      cursor: pointer;
   }
`
export default Posts;
