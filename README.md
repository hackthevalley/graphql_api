# Hack the Valley API

[![Build Status](https://travis-ci.org/hackthevalley/hack_the_valley_api.svg?branch=master)](https://travis-ci.org/hackthevalley/hack_the_valley_api)

Hack the Valley Primary API, Shared Across All Events

Visit [https://api.hackthevalley.io/graphql](https://api.hackthevalley.io/graphql)  to explore our GraphQL API!

## Authorization

Our API is open to the public, however, some queries and mutations might require authentication.

First you will need to obtain an API key, this can be achieved by calling `createHackerToken()` with your login credentials.

```graphql
mutation { createHackerToken("hello@hackthevalley.io", "htv123") { token_body } }
```

After obtaining `token_body`, pass it as bearer token header to authenticate:

```
Authorization: Bearer <token_body>
```
