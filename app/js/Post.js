import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { getPostById } from './ajax';


const Post = ({ post }) => (
  <div>
    <div className="tag">Rendered with REACT</div>
    <h1>Welcome to the <span>about.html</span></h1>
    <nav>
      <a href="/">go back</a>
    </nav>

    <h3>Response data from <a href="/api/v1/posts/1">/api/v1/posts/1</a></h3>
    <pre>{ JSON.stringify(post, null, 2) }</pre>

    <h3>Example rendering a post with the response data</h3>
    <div className="posts">
      <div className="post">
        <h1>{ post.title }</h1>
        <h3>{ post.date }</h3>
        <p>{ post.content }</p>
      </div>
    </div>
  </div>
);

(() => {
  getPostById(1)
    .then(res => {
      ReactDOM.render(<Post post={ res.data }/>, document.getElementById('about'));
    })
    .catch(err => console.log(err.status, err.message));
})();