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
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
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

    type Mutation {
        deleteGame(id: ID!): [Game]
        addGame(game: AddGameInput!): Game
        addAuthor(author: AddInputAuthor!): Author
        updateGame(id: ID!, editInputGame: EditInputGame): Game
    }
    
    input AddGameInput {
        title: String!
        platform: [String!]!
    }
    
    input AddInputAuthor{
        name: String!
        verified: Boolean!
    }

    input EditInputGame{
        title: String
        platform: [String]
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
    // 'Query' is a resolver for the entry point.
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

    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },

    Mutation: {
        deleteGame(parent, args) {
            db.games = db.games.filter((game) => game.id !== args.id)
            return db.games
        },

        addGame(parent, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()

            }
            db.games.push(game)
            return game
        },

        addAuthor(parent, args) {
            let author = {
                ...args.author,
                id: Math.floor(Math.random()*100).toString()
            }
            db.authors.push(author)
            return author
        },

        updateGame(parent, args) {
            db.games = db.games.map((g) => {
                if(g.id === args.id) {
                    return { ...g, ...args.editInputGame}
                }

                return g
            })

            return db.games.find((g) => g.id === args.id)
        }

    }

};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);