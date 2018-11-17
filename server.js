const dotenv = require('dotenv');
dotenv.load();

const PORT_NUMBER = process.env.PORT ? process.env.PORT : 3000;

const mongoose = require('mongoose');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const app = express();

// Register middlewares
require('./middlewares')(app);

// Initialize GraphQL
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Initialize GraphQL endpoints
const server = new ApolloServer({
    typeDefs, resolvers,
    context: ({ req }) => ({
        hacker: req.hacker,
        user: req.user
    })
});

server.applyMiddleware({app});

// Connect to database
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
    .then(() => console.log("Mongoose connected..."));

// Start the server
app.listen(PORT_NUMBER, () => console.log('Go to http://localhost:' + PORT_NUMBER + '/graphql to run queries!'));