const { admin } = require("./firebaseconfig");

const sendNotification = async function (payload) {
  admin
    .messaging()
    .send(payload)
    .then((response) => {
      console.log(" messages  sent successfully");
    });
};

module.exports = {
  sendNotification,
};
