# IE3 Web Dev. Project
## Team Members
- TAVASYA AGARWAL
- CHRIS CHEN
- ZEV STRAVITZ
- RACHAEL TANG

### How I got to this point
- First, run `npm init` and hit ENTER all the way through EXCEPT on the entry point argument (type `app.js` and press ENTER for that one).
- Next, install Express, Nodemon, and the Mongoose Object Data Model library. Nodemon allows us to automatically reboot the server after we make changes. Mongoose allows us work with normal JavaScript objects rather than straight MongoDB logic.
	npm install express --save
	npm install nodemon --save-dev
	npm install mongooose --save
- Change all HTML files to have extension ".ejs" and move them into a new folder called "views." These files will be rendered by our template engine, [EJS](http://ejs.co/) and served to the client when requested. With the template engine, we will be able to dynamically render the HTML on our page using data obtained from MongoDB. Notice that, for now, the EJS files look exactly the same as HTML files.
- Edit the package.json file to include a new script, right above "test", called "start", that runs `nodemon app.js`.
- Create the app.js file and do Express setup in there. Create a db.js file under the models folder and do Mongo setup in there.
- Go to mLab and create a new MongoDB deployment that we'll all be able to use for local development.
- Insert the mLab database credentials into your environment under the label `MY_NU_HOME_DB`.
- Create a basic schema for apartment listings and save to models/listing.js.
- Create a basic route for a single apartment listing and save to routes/listing.js.
- Edit the listing.ejs file in the views folder to dynamically generate the price and address.
- Run the server with `npm start`.

### TODO
- [] Individual user accounts
- [] Update and delete listings
- [] Pins on Google Maps
- [] Image upload and storage
- [] Deploy to Heroku
- [] IF WE HAVE TIME: Filter/Search Functions