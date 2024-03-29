const express = require('express');
const app = express();
const db = require('./connection');
const bodyParser = require('body-parser');
const path = require('path');
const { upload, uploadSaveChanges }= require('./uploads.js');
const spawn = require('child_process').spawn;
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
            fs.rename(`public/uploads/temp/${req.params.id}`, `public/${location}`, function (err) {
                if (err) throw err   
            }); //flyttar filen till user
        }
    });
    
});                                                 //1         2           3
app.post("/edit/py/:id", (req, res) => { // /edit/py?videoname&functionname&speed[OPTIONAL]
    const idParams = req.params.id.split('&');
    var dataToSend;
    // spawn new child process to call the python script

    //console.log(idParams)
    const python = spawn('python', ['./public/scripts/python/main.py', idParams[0], idParams[1], idParams[2]]);
    /*
    python.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    */
    python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    python.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        fs.rename(`public/uploads/temp/edited_${idParams[0]}`,
         `public/uploads/temp/${idParams[0]}`,
        (err) => {
            if (err) throw err; 
        });
        res.sendStatus(200);
    });
});
app.post('/savevideo', async (req, res, next) => {
    console.log("Received file:", req.file);
      // Path to the existing file
    const filePath = path.join(__dirname, './public/uploads/temp', req.query.filename);

    // Check if file exists
    if (fs.existsSync(filePath)) {
        // If file exists, delete it
        fs.unlinkSync(filePath);
    }
    next();
},  uploadSaveChanges.single('file'), (req, res) => {
    console.log(req.file)
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
