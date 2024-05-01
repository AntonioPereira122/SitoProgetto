const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');

const cors = require('cors');
const bodyParser = require('body-parser');

const axios = require('axios');

app.set('appName', 'Ricettario');
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'pug');
app.set('views', './views');

const RottaPublic = path.join(__dirname, "public");
app.use(express.static(RottaPublic));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('short', { stream: accessLogStream }));

//app.use(helmet());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.redirect("/ricette")
});

app.get('/ricette', (req, res) => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/ricette',
        headers: {}
    };
    console.log("entra");
    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.render('index', {"ricette":response.data});
        })
        .catch((error) => {
            console.log(error);
        });

});

app.get('/ricette/:id', (req, res) => {
    let id= req.params.id //qua ci va l'id della ricetta
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://hofman.alwaysdata.net/ricette/${id}`,
        headers: {}
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.render('ricette', {"ricetta":response.data[0]});
        })
        .catch((error) => {
            console.log(error);
        });

});

app.get('/ricette/recent/{limit}', (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/ricette/recent/{limit}',
        headers: {}
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.render('ricette', response.data);
        })
        .catch((error) => {
            console.log(error);
        });

});

app.get('/categorie/{id}', (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/categorie/{id}',
        headers: {}
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.render('categorie', response.data);
        })
        .catch((error) => {
            console.log(error);
        });

});

app.get('/cotture/{id}', (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/cotture/{id}',
        headers: {}
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.render('cotture', response.data);
        })
        .catch((error) => {
            console.log(error);
        });

});

app.get('/paesi/{id}', (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/paesi/{id}',
        headers: {}
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.render('paesi', response.data);
        })
        .catch((error) => {
            console.log(error);
        });

});

app.get('/portate/{id}', (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://hofman.alwaysdata.net/portate/{id}',
        headers: {}
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.render('portate', response.data);
        })
        .catch((error) => {
            console.log(error);
        });

});

app.use("*", function (req, res, next) {
    res.status(404);
    res.send('Url non presente');
});

const server = app.listen(app.get('port'), function () {
    console.log('Server in ascolto');
});