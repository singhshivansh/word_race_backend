const express = require('express');
const mongoose = require('mongoose');

const DB = 'mongodb+srv://shivansh:wordrace@wordrace.mcvid.mongodb.net/WordRace?retryWrites=true&w=majority'

mongoose.connect(DB)
.then(res=>{
    console.log("Connected");
})
.catch(err=>console.log(err));

const app = express();
app.use(express.json());

const port = 8000;

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
    newPlayer.save().then(res=>{
        res.status(201).json({'status' : 'player created successfully'})
    }).catch(err=>{
        res.status(500).json({'status' : err});
    })
    res.send({'status' : 'success'});
})


app.listen(port, ()=>{
    console.log(`App listening to ${port}`);
})