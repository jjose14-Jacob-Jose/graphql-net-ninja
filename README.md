# graphql-crash-course
### All credits to [Net Ninja](https://www.youtube.com/watch?v=xMCnDesBggM&list=PL4cUxeGkcC9gUxtblNUahcsg0WLxmrK_y&index=1) 
All the course files for the GraphQL Crash Course on the Net Ninja YouTube channel &amp; on Net Ninja Pro.

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

### Miscellaneous
