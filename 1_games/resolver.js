import db from "../db.js"

export const resolvers_1 = {
    Query: {

        games() {
            return db.games
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        }

    }
}