const express = require('express');
const mongoose = require('mongoose');

const DB = 'mongodb+srv://shivansh:wordrace@wordrace.mcvid.mongodb.net/WordRace?retryWrites=true&w=majority'

mongoose.connect(DB, {
    useNewUrlParser: true
})
.then(res=>{
    console.log("Connected");
})
.catch(err=>console.log(err));

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

const Player = require('./model/playerSchema');

app.get('/', (req, res) => {
    Player.find({}, (err, players)=>{
        if(err)
            res.send(err);
        res.send(players);
    })
    // res.send('Hello World!')
})

app.post('/insert_player', (req, res)=>{
    // console.log(req.body);
    const data = req.body;
    const newPlayer = new Player({name : data.name, score : data.score});
    newPlayer.save().then(response=>{
        res.status(201).send({'status' : response})
    }).catch(err=>{
        res.status(500).send({'status' : err});
    })
    // res.send({'status' : 'success'});
})

app.get('/delete', (req, res) => {
    Player.remove({}, ()=>{
        res.send({'status' : 'Deleted Successfully'});
    })
})

app.listen(port, ()=>{
    console.log(`App listening to ${port}`);
})