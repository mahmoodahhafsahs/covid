const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "belenetot6f6gly4rr5p-mysql.services.clever-cloud.com",
    user: "uve1x823cb1et59f",
    password: "q9FBCxXAuf2PJYGxiZaR",
    database: "belenetot6f6gly4rr5p"
});

// WebSocket setup
wss.on('connection', (ws) => {
    console.log('WebSocket connected');

    // Handle messages from clients (e.g., admin)
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        // Broadcast the event and data to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });
});

// MySQL connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.message);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO signup (name, email, password) VALUES ?";
    const values = [
        [req.body.name, req.body.email, req.body.password]
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM signup WHERE email=? AND password=?";
    
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    });
});

app.get('/getVaccinationCenters', (req, res) => {
    const sql = "SELECT id, name, location, dosageDetails, timings, availableSlots FROM vaccination_centers";

    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post('/addVaccinationCenter', (req, res) => {
    const sql = "INSERT INTO vaccination_centers (name, location, dosageDetails, timings, availableSlots) VALUES ?";
    const values = [
        [req.body.name, req.body.location, req.body.dosageDetails, req.body.timings, 10] // 10 is the initial count
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }

        // Notify clients that a new center has been added
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: 'centerAdded' }));
            }
        });

        return res.json("Success");
    });
});

app.post('/removeVaccinationCenter', (req, res) => {
    const { id } = req.body;
    const sql = 'DELETE FROM vaccination_centers WHERE id = ?';

    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ error: 'Error removing vaccination center' });
        }

        // Notify clients that a center has been removed
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: 'centerRemoved', centerId: id }));
            }
        });

        return res.json({ success: true, message: 'Vaccination center removed successfully' });
    });
});

app.post('/bookVaccinationCenter', (req, res) => {
    const { id } = req.body;
    const sqlSelect = 'SELECT availableSlots FROM vaccination_centers WHERE id = ?';
    const sqlUpdate = 'UPDATE vaccination_centers SET availableSlots = ? WHERE id = ?';

    db.query(sqlSelect, [id], (err, result) => {
        if (err) {
            return res.json({ error: 'Error fetching available slots' });
        }

        const availableSlots = result[0].availableSlots;

        if (availableSlots > 0) {
            db.query(sqlUpdate, [availableSlots - 1, id], (updateErr, updateResult) => {
                if (updateErr) {
                    return res.json({ error: 'Error updating available slots' });
                }

                return res.json({ success: true, message: 'Booking successful' });
            });
        } else {
            return res.json({ error: 'No available slots for booking' });
        }
    });
});

server.listen(8081, () => {
    console.log("Server listening on port 8081");
});
