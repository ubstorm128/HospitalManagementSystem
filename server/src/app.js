const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/requestLogger');
const testRoutes = require('./routes/testRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api', testRoutes);
app.use('/api/patients', patientRoutes);

module.exports = app;