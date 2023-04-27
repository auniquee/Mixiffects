const express = require('express');
const app = express();
const db = require('./connection');
const bodyParser = require('body-parser');
const path = require('path');
const { upload, uploadSaveChanges }= require('./uploads.js');
const fs = require('fs');

app.use(express.static(path.resolve('./public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


var obj = {};

app.get('/', function(req,res){
    let sql = 'SELECT * FROM sounds ORDER BY date DESC LIMIT 10';
    db.query(sql, function(err, results){
        if(err) {
            throw err;
        } else {
            obj = {data: results};
            res.render('index', obj)
        }
    });
});
app.get('/upload', (req, res) => {
    res.render('upload');
})
app.get('/edit', (req, res) => {
    res.render('edit');
} )
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register', (req, res) => {

})
app.get('/uploadvideotodb/:id', (req, res) => {
    res.render('uploadtodb');
})
app.post('/uploadvideotodb/:id', (req, res) => {

    const title = req.body.soundname;
    const description = req.body.description;
    const location = `/uploads/user/${req.params.id}.wav`;
    const tags = req.body.tags;
    const sqlInstert = "INSERT INTO sounds (name, description, user, location, tags) VALUES (?, ?, ?, ?, ?);"
    db.query(sqlInstert, [title, description, "guest", location, tags], (err, result)=> {
        if(err) {
            throw err;
        } else {
            res.redirect("/");
            fs.rename(`public/uploads/temp/${req.params.id}.wav`, `public/${location}`, function (err) {
                if (err) throw err   
            }); //flyttar filen till user
        }
    });
    
})
app.post('/savevideo', uploadSaveChanges.single('file'), (req, res) => {
    console.log("Received file:", req.file);
}); // sparar videon

app.post('/upload', upload.single('file'), (req,res) => {
    res.redirect(`/edit#${ req.file.filename }`);
});

// app.get('/post', (req, res) => {
//     res.render('post');
// })
// app.post('/post', upload.single('img'), function(req,res){
//     const title = req.body.title;
//     const text = req.body.text;
//     const img = "/uploads/" + req.file.filename;
//     const sqlInstert = "INSERT INTO post (title, text, img) VALUES (?, ?, ?);"
//     db.query(sqlInstert, [title, text, img], (err, result)=> {
//         if(err) {
//             throw err;
//         } else {
//             res.send('post added!');
//         }
//     });
//  });

app.listen(process.env.PORT || 3000, () => { 
   console.log('server, port 3000');
});
