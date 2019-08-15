import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Link } from '@reach/router';
import marked from 'marked';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_SINGLE_POST } from '../../constants';
import { ViewContainer } from './SharedStyledComponents';
import { formatTimeStamp } from '../utils';
import Loading from './Loading';
import { PostAuthor, SubContentContainer, Popularity } from './Posts';
import { SubReddit } from '../types';

interface Props extends RouteComponentProps {
   id?: string;
   title?: string;
}
const Post: React.FC<Props> = ({ id }): JSX.Element => {
   const dispatch = useDispatch();
   const { post, comments } = useSelector(({ selectedPost }: any) => selectedPost);
   const selectedSubReddit = useSelector(({ selectedSubReddit }: { selectedSubReddit: SubReddit }) => selectedSubReddit)
   const [loading, setLoading] = useState<boolean>(false);
   useEffect(
      () => {
         fetchSinglePost(id as string);
      },
      [id]
   );

   useEffect(
      () => {
         console.log('selectedSubReddit', selectedSubReddit);
      },
      [selectedSubReddit]
   );
   const fetchSinglePost = async (id: string): Promise<void> => {
      try {
         setLoading(true);
         const res = await fetch(`https://www.reddit.com/comments/${id}/.json`);
         let [{ data: { children: post } }, { data: { children: comments } }] = await res.json();
         post = post[0].data;
         // console.log('post', post);
         // console.log('comments', comments);
         comments = comments.map(({ data }: any) => data);
         dispatch({ type: FETCH_SINGLE_POST, payload: { post, comments } });
         setLoading(false);
      } catch (e) {
         console.error(e);
      }
   };

   return loading ? (
      <Loading />
   ) : (
      <ViewContainer>
         <BackToPosts to="/">Back to {selectedSubReddit}</BackToPosts>
         <PostTitle>{post.title}</PostTitle>
         <TimeStamp>{formatTimeStamp(post.created)}</TimeStamp>
         {post.selftext && (
            <PostSection>
               <article dangerouslySetInnerHTML={{ __html: marked(post.selftext) }} />
            </PostSection>
         )}
         <hr />
         <CommentSection>
            <CommentList>
               {comments.map((comment: any, i: number): JSX.Element => (
                  <li key={i}>
                     <SubContentContainer>
                        <PostAuthor>{comment.author}</PostAuthor>
                        <Popularity>
                           <img src='https://icon.now.sh/arrow_upward/18/FF5700' alt='upvote icon' /> {comment.ups}
                        </Popularity>
                     </SubContentContainer>
                     <article dangerouslySetInnerHTML={{ __html: marked(comment.body) }} />
                  </li>
               ))}
            </CommentList>
         </CommentSection>
      </ViewContainer>
   );
};

export default Post;

const PostTitle = styled.h1`
   font-weight: bolder;
   margin: 15px 0;
`;

const TimeStamp = styled.span`
   font-size: 0.8em;
   color: darkgray;
   display: block;
`;

const PostSection = styled.section`
   margin-bottom: 2em;
   font-weight: bold;
   padding: 10px;
`;

const CommentSection = styled.div`
   margin: 2em auto 0 auto;
   padding: 20px;
`;

const CommentList = styled.ul`
   list-style: none;

   > * {
      margin: 1em 0;
   }
`;

const BackToPosts = styled(Link)`
   text-decoration: none;
   color: #eee;
   padding: 5px 7px;
   background-color: #FF4300;
   border-radius: 4px;
`