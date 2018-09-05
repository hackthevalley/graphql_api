const dotenv = require('dotenv');
dotenv.load();

const PORT_NUMBER = process.env.PORT ? process.env.PORT : 3000;

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const bodyParser = require('body-parser');
const app = express();

// Register middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Initialize GraphQL
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const authenticationMiddleware = require('./middlewares/authenticationMiddleware');
const userAuthenticationMiddleware = require('./middlewares/userAuthenticationMiddleware');

app.use(authenticationMiddleware);
app.use(userAuthenticationMiddleware);


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