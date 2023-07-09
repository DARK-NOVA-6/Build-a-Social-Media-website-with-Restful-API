require('dotenv').config();
const PORT = process.env.PORT || 8080;
const IP_ADDRESS = process.env.IP_ADDRESS || 'http://127.0.0.1';
const corsOptions = {
  origin: IP_ADDRESS + ':' + PORT,
};

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {verifyToken} = require('./application/middleware/verifyToken');

const app = express();

app.use(cookieParser()).
    use(express.json()).
    use(express.static(__dirname)).
    use(bodyParser.urlencoded({extended: false})).
    use(cors(corsOptions)).
    set('view engine', 'ejs');

app.use('/', require('./application/routes/user').router).
    use(verifyToken).
    use('/', require('./application/routes/post').router).
    use('/', require('./application/routes/event').router).
    use('/', require('./application/routes/friendship').router).
    use('/', require('./application/routes/messenger').router);

app.listen(PORT, () => console.log('server is running on ' + PORT));
