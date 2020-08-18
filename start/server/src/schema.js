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
      # launches: [Launch]!
      launches(
         """
         The number of results to show. Must be >= 1. Default = 20
         """
         pageSize: Int
         """
         If you add a cursor here, it will only return results _after_ this cursor
         """
         after: String
      ): LaunchConnection!
      launch(id: ID!): Launch
      me: User
   }

   """
   Simple wrapper around our list of launches that contains a cursor to the last item in the list. Pass this cursor to the launches query to fetch results after these.
   """
   type LaunchConnection {
      cursor: String!
      hasMore: Boolean!
      launches: [Launch]!
   }

   # Mutations
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
