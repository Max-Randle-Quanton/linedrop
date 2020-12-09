const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
        bookings: [Booking!]!
        users: [User!]!
        groups: [Group]!
        login(username: String!, password: String!): AuthData
    }   
    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        bookEvent(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
        
        createGroup(groupInput: GroupInput): Group
        createMessage(messageInput: MessageInput): Message
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
