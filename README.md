# Lauda-lahasan
Dalali
Const express = require("express");
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
<!DOCTYPE html>
<html>
<head>
    <title>Temp Mail</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">

<h1>Disposable Email Generator</h1>

<button onclick="generateEmail()">
Generate Email
</button>

<div class="email-box">
    <h3 id="email">No Email Generated</h3>
</div>

<button onclick="loadInbox()">
Refresh Inbox
</button>

<div id="messages"></div>

</div>

<script src="script.js"></script>

</body>
</html>
body{
    background:#0f172a;
    color:white;
    font-family:Arial;
    display:flex;
    justify-content:center;
}

.container{
    width:700px;
    margin-top:50px;
    text-align:center;
}

button{
    background:#3b82f6;
    color:white;
    border:none;
    padding:12px 25px;
    margin:10px;
    border-radius:8px;
    cursor:pointer;
}

.email-box{
    background:white;
    color:black;
    padding:20px;
    border-radius:10px;
}

.message{
    background:#1e293b;
    padding:15px;
    margin-top:10px;
    border-radius:10px;
}
let currentEmail = "";

async function generateEmail() {

    const response = await fetch("/generate");

    const data = await response.json();

    currentEmail = data.email;

    document.getElementById("email").innerHTML = currentEmail;
}

async function loadInbox() {

    if (!currentEmail) {
        alert("Generate an email first.");
        return;
    }

    const response = await fetch(`/inbox/${currentEmail}`);

    const messages = await response.json();

    let html = "";

    messages.forEach(msg => {
        html += `
        <div class="message">
            <h3>${msg.subject}</h3>
            <p>${msg.message}</p>
            <small>${msg.time}</small>
        </div>
        `;
    });

    document.getElementById("messages").innerHTML = html;
}
{
  "name": "temp-mail",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.1.0"
  }
}
npm install
node server.js
http://localhost:3000
Create a website with this provided content
