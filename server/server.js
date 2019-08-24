const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const app = express();
const port = process.env.PORT || 8080;

app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true
}));

app.listen(port, ()=> {
   console.log(`server is running on port ${port}`);
});