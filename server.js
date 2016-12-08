var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = 3333;

// import mock database (array)
var postsDB = require('./db/mockDB');

// feedback in the terminal to see that our express server is running
app.listen(port, function () {
  console.log('server is running on localhost:' + port);
});

// This enables us to send data with a request e.g. POST request
app.use(bodyParser.json());

// include files we need for the site to run
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

/*
NODE APP (routing)
Enables us to load different html files dependening on a route e.g.

  "/"       - loads the index.html file
  "/about"  - loads the about.html file


Instead of pointing to the file itself e.g.

  "/index.html"          - loads the index.html file
  "/public/about.html"   - loads the about.html file

Why should we do this?
Because this will give the user a nicer looking url. The user doesn't
need to know what files we are loading.

localhost:3333/about vs. localhost:3333/public/about.html
*/

// serves the index.html when "localhost:3333" is visited
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// serves the about.html when "localhost:3333/about" is visited
app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/about.html'));
});



/*
REST API (endpoints)

This is where we serve our data from different paths in our API.

*/

// API overview of the endpoints that are available
app.get('/api/v1/', function (request, response) {
  response.json([
    {
      endpoint: 'posts',
      href: 'http://localhost:3333/api/v1/posts'
    }
  ]);
});

app.get('/api/v1/posts', function (request, response) {
  response.send(postsDB);
});

app.get('/api/v1/posts/:postID', function (request, response) {

  var id = parseInt(request.params.postID);

  var post = postsDB.find(function(post) {
    return id === post.id;
  });

  console.log(post);

  if (typeof post === 'undefined') post = 'Sorry, cant find post with id: ' + id;

  response.json(post);
});

app.post('/api/v1/posts', function (request, response) {
  var newPost = request.body;
  postsDB.push(newPost);
  response.send('ok');
});
