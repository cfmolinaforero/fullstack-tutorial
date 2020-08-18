/**
 * Resolver Signature
 * fieldName: (parent, args, context, info) => data;
 *
 * parent - return value of resolver for field's parent
 * args - object contains all graphQL arguments provided for field
 * context - shared across all resolvers for particular operation (used for per-operation state sharing)
 * info - info about execution state
 */

module.exports = {
   Query: {
      launches: (_, __, { dataSources }) =>
         dataSources.launchAPI.getAllLaunches(),
      launch: (_, { id }, { dataSources }) =>
         dataSources.launchAPI.getLaunchById({ launchId: id }),
      me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
   },
   Mission: {
      // Default is LARGE if not provided
      missionPatch: (mission, { size } = { size: 'LARGE' }) => {
         return size === 'SMALL'
            ? mission.missionPatchSmall
            : mission.missionPatchLarge;
      },
   },
   Launch: {
      isBooked: async (launch, _, { dataSources }) =>
         dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
   },
   User: {
      trips: async (_, __, { dataSources }) => {
         // get ids of launch by user
         const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
         if (!launchIds.length) return [];
         // look up those launches by their ids
         return (
            dataSources.launchAPI.getLaunchesByIds({
               launchIds,
            }) || []
         );
      },
   },
};
