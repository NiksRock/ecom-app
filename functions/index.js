const functions = require("firebase-functions");
import algoliasearch from "algoliasearch";
const env = functions.config();
const client = algoliasearch(env.algolia.app_id, env.algolia.admin_api_key);
const index = client.initIndex("products");
export const onProductCreated = functions.firestore
  .document("products" / { productID })
  .onCreate((snap, ctx) => {
    return index.saveObject({
      objectID: snap.id,
      ...snap.data(),
    });
  });
export const onProductDeleted = functions.firestore
  .document("products" / { productID })
  .onDelete((snap, ctx) => {
    return index.deleteObject(snap.id);
  });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
