import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import JsonView from './dev/JsonView';

import { getPosts } from './ajax';

import '../sass/main.scss';

class App extends Component {

  render() {

    const { posts } = this.props;

    console.log(this.props.posts);

    return (
      <div className="container">
        <div className="tag">Rendered with REACT</div>
        <h1>Welcome to the <span>index.html</span></h1>
        <nav>
          <a href="/dist/post.html">go to the post.html</a>
          <a href="/post">go to the Post route</a>
          <a href="/some-route">go to 404 not found</a>
          <a href="/api/v1">go to the REST API route</a>
        </nav>

        <h3>Response data from <a href="/api/v1/posts">/api/v1/posts/</a></h3>
        <JsonView data={ posts } label="Posts" isCollapsed={ true }/>

        <h3>Example rendering a post with the response data</h3>
        <div className="posts">
          {
            posts.map((post, i) =>
              <div className="post" key={i}>
                <h1>{ post.title }</h1>
                <h3>{ post.date }</h3>
                <p>{ post.content }</p>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

(() => {
  getPosts
    .then(res => {
      ReactDOM.render(<App posts={ res.data }/>, document.getElementById('app'));
    })
    .catch(err => console.log(err.status, err.message));
})();
