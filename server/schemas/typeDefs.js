// 
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]!
    }

    type Book {
        _id: ID
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(authors: String!, description: String!, bookId: String!, image: String!, title: String!, link: String!): User
        removeBook(bookId: ID!): User
    }

`

// type query
// users: [User]
// user(username: String!): User
// books(username: String): [Book]
// book(bookId: ID!): Book