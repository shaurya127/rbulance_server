const { admin } = require('./firebaseconfig');


const sendNotification = async function (payload) {
  console.log({payload})
  admin.messaging().send(payload)
    .then((response) => {
      console.log(response.successCount + ' messages were sent successfully');
    });
};


module.exports =
{
  sendNotification,
}
