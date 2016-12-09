# Blog node app

### Description
- Runs on an express server.
- Uses webpack to bundle your javascript and css
- Includes Babel transpiler for ES2015 javascript syntax.
- Includes SASS preprocessing to handle your CSS
- Includes React

### Getting started
1. Install node.js
2. Run `npm i` from the project root in a terminal
3. Run `npm run build` to build the app
4. Run `npm start` to start the express server
5. visit <http://localhost:3333> in your browser to use the app

### Developing
Running `npm run watch` will build your project while 
you make changes to your files, just keep it running.
Then start the app as you normally would with `npm start`.  

Develop your app in the `/app` folder and webpack will build 
to the `/dist` folder which is ready for deployment.
Do not alter the files in the `/dist` folder.