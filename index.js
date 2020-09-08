const express = require('express');
const exphbs = require('express-handlebars');
const  mongoose  = require('mongoose');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/upload',
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    },
    (err)=>{
        if (!err){
                console.log('DB connected')
            }
    }
);

// if (!err){
//     console.log('DB connected')
// }

const UserModel = mongoose.model('User', {
    username: {
       type : [String],
       index: true },
    firstName: String,
    surname: String,
    profilePicture: String
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', (req, res)=>{
    console.log('GET /')
    // res.send('welcome to express simple upload')
    res.render('home');
    
});

app.post('/upload', upload.single('avatar'),  (req, res) => {
    console.log('POST /upload',req.file);
    console.log('POST/upload',req.body)
    res.send('file uploaded. <a href="/">Go Back</a>')
  });


app.listen(port, ()=>{
    console.log('server has started on :' + ' '+ port)
});