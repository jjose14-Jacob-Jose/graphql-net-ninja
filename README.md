# graphql-crash-course
### All credits to [Net Ninja](https://www.youtube.com/watch?v=xMCnDesBggM&list=PL4cUxeGkcC9gUxtblNUahcsg0WLxmrK_y&index=1) 
All the course files for the GraphQL Crash Course on the Net Ninja YouTube channel &amp; on Net Ninja Pro.
I have prepare this documentation by learning from Net Ninja's YouTube video. 

## Installation 
1. Run ```docker-compose up``` in directory root. 
2. Access Apollo Local Server at [http://localhost:4000/](http://localhost:4000/)
3. Running the query ```query GetBooks {
   books {
   title
   author
   }
   }```.
4. Your installation is correct, if your output is ```{
   "data": {
   "books": [
   {
   "title": "The Awakening",
   "author": "Kate Chopin"
   },
   {
   "title": "City of Glass",
   "author": "Paul Auster"
   }
   ]
   }
   }```

[Click here](https://www.apollographql.com/docs/apollo-server/getting-started/) to access official installation guide.  

## GraphQL To Do
1. Specify your data type in 'typeDefs'.
   ```
      const typeDefs = 'graphql
      
         type <data_type_name> {
            <member_name>: Data_Type
            <member_name>: Data_Type(!)
         }
      `;
   ```
   Use exclamation (!) if you want to cannot-be-null condition.

2. Specify your entry points in 'Query'
      ```
         type Query {
            <query_name>: [<data_type_name]
            <query_name> (parameter_name: parameter_data_type): <data_type_name>
            <query_name> (parameter_name: parameter_data_type!): <data_type_name>
         } 
   
      ```
   
3. Specify functions in Resolver
   ```
      const resolvers = {
         Query { 
            <resolver_function_name> () {
               return <data_type_name_in_db>
            }
   
            <resolver_function_name> (parent, args) {
               return <data_type_name_in_db>.find((data_type_name) => boolean_condition)
            }
      }
   ```

#### Querying in Apollo Explorer

1. Writing Query in Apollo Explorer
   ```
      query <query_name> {
         resolver_function_name {
            member_name
         }
      }
      
      query <query_name>($<parameter_name_1> : <data_type_of_parameter>) {
         resolver_function_name(<function_argument_name>: $<parameter_name_1>) {
            member_names
         }
      }
   
   ```

2. Specify the parameters in 'Variables' section below in JSON format. 
```
   {
      "<parameter_name_1>" : "<value>",
   }

```

##### Example
```
   const typeDefs = `#graphql
      type Game {
         id: ID!
         title: String!
         platform: [String!]!
      }
      
      type Query {
           games: [Game]
           game(id: ID!): Game
       }
   `;
   const resolvers = {
   
      Query: {
           games() {
               return db.games
           },
           game(parent, args) {
               return db.games.find((game) => game.id === args.id)
           },
       },
   };
   
```
Operation
```
   query QueryName($gameId: ID!) {
     game(id: $gameId) {
       title
     }
   }
```
Variables
```
   {
     "gameId": "2",
   }
```

# Queries
## Mutation
### 1. Deletion
Operation:
```
   mutation m1($id: ID!) {
     deleteGame(id: $id) {
       id
       title
   
     }
   }
```
Variables:
```
   {
     "id": "3",
   }

```

### 2. Addition
Operation:
```
   mutation add($game: AddGameInput!) {
     addGame(game: $game) {
       id,
       title,
       platform
     }
   }

```
Variables:
```
   {
     "game": {
       "title" : "new game",
       "platform" : ["PS5"]
     }
   }
```

### 3. Update
Operation: 
```
   mutation updateGame ($id: ID!, $editInputGame: EditInputGame, $deleteGameId: ID!) {
     updateGame(editInputGame : $editInputGame, id: $id) {
       title, 
       platform
     }
   }
```
Variables:
```
{
  "editInputGame" : {
    "title" : "Edited Game",
    "platform" : ["PC"]
  },
  "id" : "1"
}
```
