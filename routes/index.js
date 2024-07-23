const express = require("express");
const User = require("../models/User");
const AWS = require("aws-sdk");
const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

router.post("/", async (req, res) => {
  const { email } = req.body;
  const newUser = new User({ email });

  try {
    await newUser.save();

    const params = {
      Destination: {
        toAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Data: "Thank you for signing up!",
          },
        },
        Subject: {
          Data: "Welcome!",
        },
        Source: process.env.EMAIL_FROM,
      },
    };

    await ses.sendEmail(params).promise();
    res.status(201).send(newUser);
  } catch (err) {
    console.log("Error when creating user or sending email", err);
    res
      .status(500)
      .json({ error: "Error when creating user or sending email" });
  }
});

module.exports = router;
