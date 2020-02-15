const express = require('express');
const cors = require('cors')
const app = express();
const bodyparser = require('body-parser');
const knex = require('knex');
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
var db = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'face_detection'
    }
});

// console.log(db.select('*').from("Users"));

app.use(cors())
app.use(bodyparser.json());



app.get('/', (req, res) => {
    res.send(database.user)
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('Users').where({ id })
        .then(user => {
            if (user.length != 0)
                res.status(200).json(user[0]);
            else
                res.status(400).json("Not found")
        })
        .catch(err => res.status(400).json('error loading user'));

    // if (!found) {
    //     res.status(404).json("User doesn't exist")
    // }

})

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('Users')
        .where('ID', '=', id)
        .increment('ENTRIES', 1)
        .then(db.select('last_inserted_id()').from('Users'))

        .then(id => {

            db.select('ENTRIES').from('Users').where({ id: req.body.id }).then(entries => {
                res.json(entries[0]);

            })
        }).catch(err => res.json('Error getting user'))

})

app.post('/signin', (req, res) => {
    db.select('*').from('login').where('EMAIL', '=', req.body.email)
        .then(user => {
            const isValid = bcrypt.compareSync(req.body.password, user[0].HASH);
            if (isValid) {
                return db.select('*').from('Users').where({ EMAIL: req.body.email })
                    // .then(user => res.json(user[0]))
                    .then(user => res.json(user[0]))
            }
            else {
                res.json('error logging in: WRONG CREDENTIALS')
            }
        })
        .catch(err => res.json('error logging in'))
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    var hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx
            .insert({
                HASH: hash,
                EMAIL: email
            })
            .into('login')
            // .returning('*')
            .then(trx.select('last_inserted_id()').from('login'))

            .then(id => trx.select('EMAIL').from('login').where({ id: id }))

            .then(user => user[0].EMAIL)
            .then(LoginMail => {
                trx('Users')
                    // .returning('*')
                    .insert({
                        EMAIL: email,
                        NAME: name,
                        JOINED: new Date()
                    })
                    // .returning('*')
                    .then(trx.select('last_inserted_id()').from('login'))
                    .then(id => {
                        db.select('*').from('Users').where({ id: id }).then(user => res.json(user[0]));
                        // else res.status(400).json("error user already exists")
                    })
                    // .catch(err => { res.status(400).json("User already exists with email!") })
                    .then(trx.commit)
                    .catch(err => {
                        trx.rollback;
                        res.status(400).json("error user already exists")
                    })


            })
    })



})
app.listen(3000, () => {
    console.log('App is running successfully on port 3000!')
})

/*
/ --? working fine
/signIn --> POST = success/fail
/register --> POST = nw user
/profile/:user --> GET = user
/image --> PUT = score
*/