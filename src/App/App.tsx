import React from 'react';
import { Router } from '@reach/router';
import Post from './components/Post';
import Posts from './components/Posts';

const App = () => (
   <Router>
      <Posts path='/' />
      <Post path='/:id' />
   </Router>
);

export default App;
