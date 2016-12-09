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

// This enables us to send data with a req e.g. POST req
app.use(bodyParser.json());

// include files we need for the site to run
app.use('/dist', express.static(path.join(__dirname, 'dist')));

/*
NODE APP (routing)
Enables us to load different html files dependening on a route e.g.

  "/"       - loads the index.html file
  "/about"  - loads the post.html file


Instead of pointing to the file itself e.g.

  "/index.html"          - loads the index.html file
  "/public/post.html"   - loads the post.html file

Why should we do this?
Because this will give the user a nicer looking url. The user doesn't
need to know what files we are loading.

localhost:3333/about vs. localhost:3333/public/post.html
*/

// serves the index.html when "localhost:3333" is visited
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// serves the post.html when "localhost:3333/about" is visited
app.get('/post', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/post.html'));
});



/*
REST API (endpoints)

This is where we serve our data from different paths in our API.

*/

// API overview of the endpoints that are available
app.get('/api/v1/', function (req, res) {
  res.json([
    {
      endpoint: 'posts',
      href: 'http://localhost:3333/api/v1/posts'
    }
  ]);
});

app.get('/api/v1/posts', function (req, res) {
  res.send(postsDB);
});

app.get('/api/v1/posts/:postID', function (req, res) {

  var id = parseInt(req.params.postID);

  var post = postsDB.find(function(post) {
    return id === post.id;
  });

  console.log(post);

  if (typeof post === 'undefined') post = 'Sorry, cant find post with id: ' + id;

  res.json(post);
});

app.post('/api/v1/posts', function (req, res) {
  var newPost = req.body;
  postsDB.push(newPost);
  res.send('ok');
});
