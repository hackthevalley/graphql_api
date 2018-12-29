module.exports =
`
directive @deprecated(
  reason: String = "No longer supported"
) on FIELD_DEFINITION | ENUM_VALUE

type Query {
    base: Boolean
}

type Mutation {
    base: Boolean
}
` +
    require('./applications') +
    require('./events') +
    require('./hackers') +
    require('./users')
;
