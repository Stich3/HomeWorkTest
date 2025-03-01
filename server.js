const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const FILE_PATH = 'Rosk.json';

app.use(cors());
app.use(express.json());

// Читання JSON-файлу
app.get('/data', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Помилка читання файлу' });
        }
        res.json(JSON.parse(data));
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html"); // Відправляє головну сторінку
});
app.use(express.static(__dirname));

// Оновлення JSON-файлу
app.post('/update', (req, res) => {
    const newData = req.body;
    fs.writeFile(FILE_PATH, JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Помилка запису у файл' });
        }
        res.json({ message: 'Файл оновлено успішно' });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});
