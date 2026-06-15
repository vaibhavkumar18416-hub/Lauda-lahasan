const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const inboxes = {};

// Generate email
app.get("/generate", (req, res) => {
    const username = Math.random().toString(36).substring(2, 10);
    const email = `${username}@tempdemo.com`;

    inboxes[email] = [];

    res.json({ email });
});

// Receive email (simulation)
app.post("/receive", (req, res) => {
    const { to, subject, message } = req.body;

    if (!inboxes[to]) {
        return res.status(404).json({
            error: "Inbox not found"
        });
    }

    inboxes[to].push({
        subject,
        message,
        time: new Date()
    });

    res.json({
        success: true
    });
});

// View inbox
app.get("/inbox/:email", (req, res) => {
    const email = req.params.email;

    if (!inboxes[email]) {
        return res.status(404).json({
            error: "Inbox not found"
        });
    }

    res.json(inboxes[email]);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
