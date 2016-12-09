import '../sass/main.scss';
import { get } from 'axios';

$(document).ready(function () {
  getPosts();
  getPostById(1);
});

/*
 *  GET request using jQuery
 */
const getPosts = () => (
  $.ajax({
    url: 'http://localhost:3333/api/v1/posts',
    type: 'GET',
    success: function (data) {
      console.log(data);
      renderJson(data, '#posts');
    },
    error: function (err) {
      console.log(err);
    }
  })
);

/*
 *  GET request using the axios library which uses promises.
 */
const getPostById = (id) => (
  /*
   URL is expressed with template string to concat the URL with the provided id.
   equivalent to:
   'http://localhost:3333/api/v1/posts/' + id
   */
  get(`http://localhost:3333/api/v1/posts/${id}`)
  /*
   Arrow function.
   equivalent to:
   .then( function() { renderJson(res.data, '#post') } )
   */
    .then(res => {
      renderPost(res.data);
      renderJson(res.data, '#post')
    })
    .catch(err => console.log(err.status, err.message))
);

function renderJson(data, elementSelector) {
  const jsonElement = $('<pre>').text(JSON.stringify(data, null, 2));
  $(`${elementSelector}`).append(jsonElement);
}

function renderPost(post) {
  const postElement = $('<div class="post">');
  const titleElement = $('<h1>').text(post.title);
  const dateElement = $('<h4>').text(post.date);
  const contentElement = $('<p>').text(post.content);

  postElement.append(
    titleElement,
    dateElement,
    contentElement
  );

  $('#example').append(postElement);
}
