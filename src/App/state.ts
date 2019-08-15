import { FETCH_POSTS, FETCH_SINGLE_POST, TOGGLE_THEME, SET_SUBREDDIT } from './../constants';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { SubReddit } from './types';
const middleware = [logger, thunk];
export enum Themes {
   light = 'light',
   dark = 'dark'
}
interface State {
   isFetching: boolean;
   selectedSubReddit: SubReddit;
   posts: any[];
   selectedPost: { post: any, comments: any[] | any };
   lastUpdated: Date;
   theme: Themes;
}

const initialState: State = {
   isFetching: false,
   selectedSubReddit: SubReddit.ReactJS,
   posts: [],
   selectedPost: { post: {}, comments: []},
   lastUpdated: new Date(),
   theme: Themes.light
};

const reducer = (state = initialState, { type, payload }: { type: string; payload: any }): State => {
   switch (type) {
      case SET_SUBREDDIT:
         return {
            ...state,
            selectedSubReddit: payload
         };
      case FETCH_POSTS:
         return {
            ...state,
            posts: payload
         };
      case FETCH_SINGLE_POST:
         return {
            ...state,
            selectedPost: { post: payload.post, comments: payload.comments }
         };
      case TOGGLE_THEME:
         return {
            ...state,
            theme: state.theme === Themes.light ? Themes.dark : Themes.light
         };
      default:
         return state;
   }
};

export default createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
