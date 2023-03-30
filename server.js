const express = require('express');
const app = express();
const db = require('./connection');
const bodyParser = require('body-parser');
const path = require('path');
const upload = require('./uploads');

app.use(express.static(path.resolve('./public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


var obj = {};

app.get('/', function(req,res){
    // KOD SOM FUNGERAR, ANVÄND SEN
//    let sql = 'SELECT * FROM post ORDER BY id ASC';
//    db.query(sql, function(err, results){
//        if(err) {
//            throw err;
//        } else {
//            obj = {data: results};
//            res.render('index', obj)
//        }
//    });
    res.render('index')
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
    const title = req.body.name;
    const description = req.body.description;
    const location = "/uploads/user/" + req.params.id;
    const tags = req.body.tags;
    const sqlInstert = "INSERT INTO sounds (name, description, user, location, tags) VALUES (?, ?, ?, ?, ?);"
    db.query(sqlInstert, [title, description, "guest", location, tags], (err, result)=> {
        if(err) {
            throw err;
        } else {
            res.send('post added!');
        }
    });
})

app.post('/upload', upload.single('file'), (req,res) => {
    res.redirect(`/edit#${ req.file.filename.split('.')[0] }`);
})


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
