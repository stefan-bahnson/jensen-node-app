import '../css/style.scss';

$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:3333/api/v1/posts',
    type: 'GET',
    success: function (data) {
      console.log(data);
      renderResponse(data, '#posts');
    },
    error: function (err) {
      console.log(err);
    }
  });

  $.ajax({
    url: 'http://localhost:3333/api/v1/posts/1',
    type: 'GET',
    success: function (data) {
      console.log(data);
      renderResponse(data, '#post');
    },
    error: function (err) {
      console.log(err);
    }
  });

});

function renderResponse(data, elementId) {
  var jsonElement = $('<pre>').text(JSON.stringify(data, null, 2));
  $(elementId).append(jsonElement);
}