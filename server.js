require("dotenv").config();
const secret = process.env.APP_SECRET;
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const subscriptions = require("./subscriptions");
const express = require("express");
const path = require("path");
const http = require("http");
const app = express();

const context = function ({ req, connection }) {
  if (connection) {
    return connection.context;
  } else {
    const token = req.headers.token;
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      return { id: null };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions,
  context,
});

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 8000;

// Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(`🚀 Server listening to port ${PORT}${server.graphqlPath}`);
  console.log(
    `🚀 Subscriptions listening to port ${PORT}${server.subscriptionsPath}`
  );
});
