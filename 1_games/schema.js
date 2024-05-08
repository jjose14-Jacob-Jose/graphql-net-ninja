export const typeDefs_1 = `#graphql
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

    type Query_1 {
        games: [Game]
        reviews: [Review]
        authors: [Author]
        
    }

`