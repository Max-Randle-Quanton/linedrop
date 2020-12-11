const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        username: String!
        password: String
        createdEvents: [Event!]
        Groups: [Group!]
    }

    type Group {
        _id: ID!
        members: [User!]!
        messages: [Message]!
    }

    type Message {
        _id: ID!
        author: User!
        text: String!
        createdAt: String!
        updatedAt: String!
    }

    type Booking {
        _id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
        username: String!
        password: String!
    }

    type RootQuery {
        users: [User!]!
        groups: [Group]!
        login(username: String!, password: String!): AuthData!

        events: [Event!]!
        bookings: [Booking!]!
    }   

    type RootMutation {
        createUser(userInput: UserInput): User!
        createGroup(members: [ID!]!): Group!
        createMessage(group: ID!, text: String!): Message!

        createEvent(eventInput: EventInput): Event
        bookEvent(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
        
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
