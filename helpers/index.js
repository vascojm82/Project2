// const firebase = require('../db/firebase.js');
// let ref = firebase.db.database.ref('movieApp');
const db = require("../models");

//Find a single user based on profileID(May not be unique)
let findOne = (profileID) => {
  console.log(`findOne -- profileId: ${profileID}`);
  return new Promise((resolve, reject) => {
    let user = findById(profileID);

    if (user == null || user === 'undefined') {
      reject()
    } else {
      resolve(user);
    }

  }).catch((error) => {
    console.log(error);
    console.log("NO MATCH");
  });
}

//Create New User
let createNewUser = (profile) => {
  console.log("Creating New User");
  return new Promise((resolve, reject) => {

    let newProfile = {
      profileId: profile.id,
      profilePic: profile.photos[0].value || '',
      favorites: ''
    }

    db.Profile.create(newProfile)
      .then(function (dbResult) {

        resolve({
          uniqueId: dbResult.id,
          profileID: profile.id,
          //fullName: profile.displayName,
          profilePic: profile.photos[0].value || '',
          favorites: ''
        });

      }).catch((err) => {
        console.log(err);
        reject();
      });
  }).catch((error) => {
    console.log(error);
    console.log("Could Not Create New User");
  });
}

//Find User by Firebase Unique ID
let findById = (id) => {

  console.log(`findById - UniqueId: ${id}`);
  return new Promise((resolve, reject) => {

    // find user in database
    db.Profile.findOne({
      where: {
        id: id
      },
      include: [db.Favorites]
    }).then(function (profile) {
      console.log("IN");
      if (profile != null) {
        resolve(profile);
      } else {
        reject();
      }

      //res.json(profile);
    }).catch((err) => {
      console.log(err);
      reject();
    });
  }).catch((error) => {
    console.log(error);
    console.log("NO MATCH");
  });
}

let addFavorites = (uniqueId, movieId, sessionId) => {
  console.log("ADD FAVORITES");
  console.log(uniqueId);
  console.log(movieId);
  
  return new Promise((resolve, reject) => {
    let newFav = {
      movieId: movieId,
      ProfileId: uniqueId
    }
    db.Favorites.create(newFav).then(function(dbPost) {
      console.log(dbPost);
      resolve(dbPost);
    }).catch((error)=>{
      console.log(error);
      reject();
    });
  }).catch((error) => {
    console.log(error);
    console.log("NO MATCH");
  });
}

let getFavorites = (uniqueId) => {
  return new Promise((resolve, reject) => {
    console.log(`getFavorites - uniqueId: ${uniqueId}`);
    processFavoriteMovies(uniqueId)
      .then((data) => {
        console.log("Data: " + data);
        resolve(data);
      }).catch((error) => {
        console.log("ERROR: Could Not Get Favorite Movies Data");
        reject();
      });
  });
}

let processFavoriteMovies = (uniqueId) => {
  console.log(`processFavoriteMovies - uniqueId: ${uniqueId}`);

  return new Promise((resolve, reject) => {

    var query = {
      ProfileId: uniqueId
    };

    db.Favorites.findAll({
      where: query
    }).then(function (dbPost) {

      console.log("processFavoriteMovies");
      console.log(dbPost);
      let newMovieArray = new Array();

      if (dbPost != null) {
        resolve(newMovieArray);
      } else {
        reject();
  }).catch((error) => {
    console.log(error);
    console.log("NO MATCH");
  });

}

//middleware to check if the user is authenticated & logged in
let isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { //This method is provided to us by passport, returns true || false
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = {
  findOne,
  findById,
  createNewUser,
  addFavorites,
  getFavorites,
  isAuthenticated
}
