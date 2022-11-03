//dependencies-----------------
require('dotenv').config();
require('express-async-errors');

let express = require('express');
let socket = require('socket.io');

let app = express();

let pageNotFound = require('./middlewares/page_not_found');
let errorHandler = require('./middlewares/error_handler');
let socketMain = require('./socket');

let cors = require('cors');
let helmet = require('helmet');
let xssClean = require('xss-clean');
let mongoSanitize = require('express-mongo-sanitize');
let morgan = require('morgan');
let rateLimiter = require('express-rate-limit');

//middlewares-----------------
app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60
}));

app.use(cors({
    origin : "*",
}));
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());

app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json(`Welcome to cali server`)
})

app.use(pageNotFound);
app.use(errorHandler);

//port---------------------------
let port = process.env.PORT || 5005

//start the app------------------
let server = app.listen(port, () => console.log(`server is listening on ${port}...`))

//start the socket---------------
let io = socket(server, {
    cors : { origin : "http://localhost:3000" }
})

io.on('connection', socket => {
    socketMain(io, socket);
})