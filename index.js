const path = require("path");
const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const publicVapidKey =
  "BONQDVSif7uK5J_Mqea65mp5fbk1v9aBWrI6G-R6WgW0B8-xO79_0E3tYDdtai0HqpDb3a8_CbZ7ZNUCvAZjHZ0";
const privateVapidKey = "z_FS-6Ywn2v92QrKBzQM3hss_AHwebCJlEi1NdCyIEQ";
webpush.setVapidDetails(
  "mailto: aiglinski@icloud.com",
  publicVapidKey,
  privateVapidKey
);

// Subscription to notification route
app.post("/subscribe", (req, res) => {
  console.log("post method reached with ...", req);
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({
    title: "push test",
  });
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
