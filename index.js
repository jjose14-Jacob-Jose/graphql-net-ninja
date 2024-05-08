import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import db from "./db.js";

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  },
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
    }
    
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }
    # Step 1: We specify entry points in 'Query'.
    type Query {
        books: [Book]
        games: [Game]
        game(id: ID!): Game
        review(id: ID!): Review
        reviews: [Review]
        authors: [Author]
        author(id: ID!): Author
    }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,


        games() {
            return db.games
        },
        game(parent, args) {
            return db.games.find((game) => game.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        },
        author(parent, args) {
            return db.authors.find((author) => author.id === args.id)
        },
        review(parent, args) {
            return db.reviews.find((review) => review.id === args.id)
        }
    },

};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);