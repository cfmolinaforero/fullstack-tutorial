const { gql } = require('apollo-server');

const typeDefs = gql`
   # Objects in data graph
   type Launch {
      id: ID!
      site: String
      mission: Mission
      rocket: Rocket
      isBooked: Boolean!
   }

   type Rocket {
      id: ID!
      name: String
      type: String
   }

   type User {
      id: ID!
      email: String!
      trips: [Launch]! # Array here cannot be null but it can be empty
   }

   type Mission {
      name: String
      missionPatch(size: PatchSize): String
   }

   enum PatchSize {
      SMALL
      LARGE
   }

   # Queries
   type Query {
      launches: [Launch]!
      launch(id: ID!): Launch
      me: User
   }

   type Mutation {
      bookTrips(launchIds: [ID]!): TripUpdateResponse!
      cancelTrip(launchId: ID!): TripUpdateResponse!
      login(email: String): String #login token
   }

   # It's good practice to return objects modified so requesting client can update its cache without needing to make a followup query
   type TripUpdateResponse {
      success: Boolean!
      message: String
      launches: [Launch] 
   }
`;

module.exports = typeDefs;
