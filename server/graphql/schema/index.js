const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }
    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type User {
        _id: ID!
        username: String!
        password: String
        createdEvents: [Event!]
        Groups: [Group!]
    }
    input UserInput {
        email: String!
        username: String!
        password: String!
    }

    type Group {
        _id: ID!
        members: [User!]!
        messages: [Message!]
    }
    input GroupInput {
        members: [ID!]!
    }

    type Message {
        _id: ID!
        author: User!
        text: String!
        date: String!
    }
    input MessageInput {
        group: ID!
        text: String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type RootQuery {
        events: [Event!]!
        users: [User!]!
        groups: [Group]!
        login(username: String!, password: String!): AuthData
    }   
    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        createGroup(groupInput: GroupInput): Group
        createMessage(messageInput: MessageInput): Message
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
