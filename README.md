Weekend Movie Sagas

# Description
    Duration: 
    2 Week Sprint
    
    To do: 
    Create a movie management application that shows a detailed view for each individual movie, including all genres associated with that movie.

    How I accomplished this:
        - Sagas and Redux store
            I created 3 variables in index.js to store data being returned from the database. There needed to be 3 variables, one to store all of the movies, one to store the user-selected movie, and one to store the genres of the selected movie. There is also a saga created for each of these events that is waiting for the appropriate command in order to fire off the get requests. Upon return from a successful get request is when that data is stored in the react-redux store variables. 
        
        - Router Paths:
            In app.js I created two router paths. The first is going to a MovieList component whenever the "home page" is visited. The second is going to a Details component, utilizing the id of the user-selected movie. This route happens when a user clicks on a movie to view more information.

        - MovieList component:
            On page load of MovieList "FETCH_MOVIES" is being dispatched to the store in order to get all movies from the db. This is what triggers the saga to fire off the get request. It returns the data to the variable movies which is made available in MovieList via useSelector. I started with simply displaying all movies in this component, but ended up building out a Carousel to display the movies instead. Carousel is now being consumed in MovieList with the movies array as props.

        - Carousel component:
            I created Carousel to display three images. The left-most image is the cover from the previous movie in the array, the middle image is the currently selected movie in the array, and the right is the next movie to display. The images act as buttons. The left button cycles the array display back one movie, showing the previous movie now in the center slot. The right button does the opposite, bringing the next movie into the center slot. The center button brings you to the Details component which shows specific details about the selected movie.

        - Details component:
            This is where the user can view more information about their selected movie. It displays the movie cover, the name of the movie, a description of the movie, and the genres that this movie falls into. On load of this page, FETCH MOVIE DATA is being fired off to grab the data about this specific movie from the db. FETCH GENRES is also being fired off as a seperate get request because the genres are in a seperate db table that needs to be joined. The get returns are being stored in the variables created in index.js and are made available in the Details componen via useSelector.
            I then am using the .map() function to display this movies data.
            At the bottom of the page is a button that returns the used to the Carousel page so they can view other movies. 

    ## STRETCH GOALS
        - Add Movie Form
            On the movie carousel I added a button, when clicked, drops down an option for a user to add a movie to the db. By clicking the button,
            it changes the visibility of the form to whatever the current state isn't. Essentially, it is a toggle switch. The form takes in 4 pieces of information: Movie Title, a link to an image of the movie poster, a description of the movie, and a dropdown option for movie genre. Once the user has entered this information, they can click "Save Movie" which sends a POST request to the db with the entered data. After the post request has been made successfully, a GET request is fired off so that the carousel is now updated with the newly added movie.
            If a user leaves one of the inputs empty, they will get an error that inputs cannot be blank, so that a post request can't be made with missing data.
            Clicking the "cancel" button on the movie form also toggles the form so that it is no longer visible, just showing the carousel again.

        - Refresh on Details Page
            When a user refreshes the browser on the details page of a specific movie, they are brought back to the same details page instead of showing a blank page. To accomplish this, I included the movie id in history.push to the details page from the movie carousel. Using .useParams, I was able to grab that id from the url and dispatch it on pageload as a payload to both 'FETCH_MOVIE_DATA' which runs a GET request to db for details on that specified movie, as well as to 'FETCH_GENRES' which grabs the genres associated with that movie on the db. Because the id is included in the url, whenever the page is refreshed it grabs that id and runs the dispatches each time.

        - Edit Page
            To edit page, I created an additional component called EditMovie. When the edit button is clicked from the details page, I used history.push with the movie id to the edit page. Again on page load, I 'FETCH_MOVIE_DATA' with the id as a payload in order to get details on the specified movie. useSelector is used to grab that data from the store, which is then displayed on the dom via .map function. Two inputs are provided, one allowing the user to edit the movie title, and the second allowing the user to edit the movie description. DefaultValues are applied to both fields, containing the current values in the db. This is so that a user can truly edit the content instead of having to rewrite it all from scratch. It also prevents no data from being entered and sent to the db as empty data. When the Update Movie button is clicked, a PUT request is made to the db with the edited movie data and the user is brought back to the movie details page.    

# Duration
    Base Mode:
    - Approx 25 hrs - a lot of which was styling

    Streth:
    - Approx 20 hrs

# Prerequisites
    - axios
    - express
    - pg
    - react
    - react-redux
    - react-redux-saga
    - react-router-dom

# Installation
    - npm install
    - npm install react-redux
    - npm start server
   
   in new terminal tab:
    - npm run client

# Database
Please see database.sql for information regarding creation of database

# Built With
React, React-Redux, React-Redux-Saga, React-Router-Dom, SQL, axios, javaScript, html, css, nodejs, express