# Hack the Valley API

[![Build Status](https://travis-ci.org/hackthevalley/hack_the_valley_api.svg?branch=master)](https://travis-ci.org/hackthevalley/hack_the_valley_api)

Hack the Valley Primary API, Shared Across All Events

Visit [https://api.hackthevalley.io/graphql](https://api.hackthevalley.io/graphql)  to explore our GraphQL API!

## Authorization

Our API is open to the public, however, some queries and mutations might require authentication.

First you will need to obtain an API key, this can be achieved by calling `createHackerToken()` with your login credentials.

```graphql
mutation {
    createHackerToken(email_address: "hello@hackthevalley.io", password: "htv123") {
        token_body
    }
}
```

> By default, API key expire after 24 hours, you can pass an optional argument called `expire_after` in seconds.

After obtaining `token_body`, pass it as bearer token header to authenticate:

```
Authorization: Bearer <token_body>
```
