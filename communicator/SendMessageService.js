'use strict';
const
    express = require('express'),
    request = require('request'),
    bodyParser = require("body-parser"),
    app = express();

app.use(bodyParser.urlencoded({ extended: false })); //x-www-form-urlencoded
app.use(bodyParser.json());

app.post('/api/sendMessage', getResults);

function getResults(req, res) {
    request.post(
        {
            url: 'https://api.telegram.org/bot506659281:AAE5MpQuExPSVWylnzo6hWPMbWy6CpY39bQ/sendmessage',
            form: {
                chat_id: req.body.id, //'-282500604',
                text: req.body.message //'hi group....'
            }
        }, function (error, response) {
            res.json(response.body);
        }
    );
}

app.listen(3000, function () {
    console.log("running!");
});




