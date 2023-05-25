# Social Network API

## Description
Welcome to the social network API! Here, you will be able to connect to a MongoDB database and perform basic CRUD functions. This API was created using Mongoose, an Object Data Modeling library for MongoDB. There is CRUD functionality for 'users', 'thoughts', and 'reactions'. Each user can have many thoughts and many friends. Each thought can have many reactions. One challenge of creating this API was after deleting a user, cascading that to its subdocument, thoughts. The documentation was not that clear, when trying to figure it out, but after testing several cast arguments, I was able to cascade on delete using '$pull'. Another challenge was understanding trying to only use a schema for the reactions. Since it was only a schema and not a model, I needed to create its own insance of the ObjectId to have a set 'reactionId' for reference when deleting a reaction.

## Installation
You do not need to install this application

## Usage
To start the application, you will need to start the server via 'node server.js' or 'nodemon'.

You can then open any application used for API manipulation such as Insomnia or Postman and work with the routes.

## Screenrecording

Demo of Users

![Demo of Users](./demo-gifs/user-demo-gif.gif)

Demo of Friends

![Demo of Friends](./demo-gifs/user-friends-demo-gif.gif)

Demo of Thoughts

![Demo of Thoughts](./demo-gifs/thought-demo-gif.gif)

Demo of Reactions

![Demo of Reactions](./demo-gifs/reactions-demo-gif.gif)


## Links
Github Repository: https://github.com/bear-muna/social-network-api