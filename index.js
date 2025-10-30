const express = require('express');
const {v4: uuidv4} = require('uuid');
uuidv4();
const methodOverride = require('method-override');
const app = express();
const port = 3000;
const path = require('path');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    { id:2, username: 'Alice', comment: 'This is great!' },
    { id:uuidv4(), username: 'Bob', comment: 'I love tacos!' },  
    { id:uuidv4(), username: 'Charlie', comment: 'Express is awesome!' },
    { id:uuidv4(), username: 'Diana', comment: 'EJS makes templating easy!' }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.get('/comments/:id',(req, res) =>{
    const { id } = req.params;
    console.log("Req params : ",req.params);
    const comment = comments.find(c => c.id === id);
    console.log("commentId : ",comment);
    res.render('comments/show', {comment});
})

app.patch('/comments/:id', (req, res) =>{
    // console.log(req.body.comment);
    // res.send("Something updated...");
    const { id } = req.params;
    const newComment = req.body.comment;
    const foundComment = comments.find(c =>c.id === id);
    foundComment.comment = newComment;
    res.redirect('/comments');
})

app.delete('/comments/:id',(req, res) =>{
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/comments/:id/edit',(req, res) =>{
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit',{comment});
})

app.post('/comments', (req, res) =>{
    // console.log("New Comment--->", req.body);
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuidv4() });
    //res.send("Comment Received!");
    res.redirect('/comments');

})

app.get('/tacos', (req, res) => {
  res.send('GET /tacos response');
});

app.post('/tacos', (req,res) =>{
    // console.log("Hellloo request--->",req.body);
    const { username, qty } = req.body;
    res.send('Here is your order for ' + qty + ' ' + username + ' tacos!');
})