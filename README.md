# IE3 Web Dev. Project
## Team Members
- TAVASYA AGARWAL
- CHRIS CHEN
- ZEV STRAVITZ
- RACHAEL TANG

### How I got to this point
- First, run `npm init` and hit ENTER all the way through.
- Next, install Express, Nodemon, and the MongoDB driver. Nodemon allows us to automatically reboot the server after we make changes.
	npm install express --save
	npm install nodemon --save-dev
	npm install mongodb --save
- Change all HTML files to have extension ".ejs" and move them into a new folder called "views." These files will be rendered by our template engine, [EJS](http://ejs.co/) and served to the client when requested. With the template engine, we will be able to dynamically render the HTML on our page using data obtained from MongoDB. Notice that, for now, the EJS files look exactly the same as HTML files.
- Edit the package.json file to include a new script, right above "test", called "start", that runs `nodemon index.js`.
- Create the index.js file and do Express/Mongo setup in there.
- Go to mLab and create a new MongoDB deployment that we'll all be able to use for local development.
- Insert the mLab database credentials into your environment under the label `MY_NU_HOME_DB`.
- Run the server with `npm start`.