const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {BigQuery} = require("@google-cloud/bigquery");
const bigquery = new BigQuery();

admin.initializeApp();

exports.exportUsersFirestoreToBigQuery = functions.firestore
    .document("interactions/{userId}")
    .onWrite((change, context) => {
      const snapshot = change.after;
      const interactionsData = snapshot.data();

      const usersRef = admin
          .firestore()
          .doc(`users/${context.params.userId}`);

      return usersRef
          .get()
          .then((userDoc) => {
            const userData = userDoc.data();
            const rows = [{
              name: userData.name,
              email: userData.email,
              tel: userData.tel,
              interactions_cant: interactionsData.interactions
                  .reduce((accum, currentValue) =>
                    accum + currentValue.cant,
                  0,
                  ),
              interactions_type: interactionsData.interactions
                  .reduce((accum, currentValue) =>
                    accum + `, ${currentValue.interaction_type}`,
                  "",
                  ),
              interactions_component: interactionsData.interactions
                  .reduce((accum, currentValue) =>
                    accum + `, ${currentValue.component}`,
                  "",
                  ),
              interactions_section: interactionsData.interactions
                  .reduce((accum, currentValue) =>
                    accum + `, ${currentValue.section}`,
                  "",
                  ),
            }];

            return bigquery
                .dataset("mindco_data")
                .table("mindco_data")
                .insert(rows)
                .then(() => console.log("Datos agregados a BigQuery"))
                .catch((error) => console.error(error));
          });
    });
