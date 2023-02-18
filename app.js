//middleware = the time between when the server gets the request and sends the response

const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")

//importing the blog model
const Blog = require("./models/blog")
//require render function
const { render } = require("ejs")
//express app
const app = express()

//connecting to mongoDB
const db = "mongodb+srv://elinakniazian:test@cluster0.byelbcq.mongodb.net/node"
//second argument will stop DeprecationWarnings
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("Connected to database")
        //listens for requests
        app.listen(4000)
    }).catch(err => console.log(err)) 


// //sandbox route for adding a new blog
// app.get("/adding-blogs", (req, res)=>{
//     //create new blog
//     const blog = new Blog({
//         title: "My blog2", 
//         snippet: "This is my blog", 
//         body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quis deleniti reiciendis, magni obcaecati iure voluptates fugit sint excepturi porro quo hic vero perspiciatis quibusdam at. Placeat, omnis error accusantium accusamus deserunt nostrum libero temporibus assumenda, consequuntur alias rem"
//     })
//     //save new blog
//     blog.save().then((result)=>{
//         res.send(result)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// //interacting with database
// app.get("/all-blogs", (req, res) => {
//     //finds all blogs from the database
//     Blog.find()
//     //send found blogs to the client
//     .then((result)=>{
//         res.send(result)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// //does the same thing but with a specific id (gets just 1 blog)
// app.get("/single-blog", (req, res) =>{
//     Blog.findById("63ed405da820d076c58e1579").then((result)=>{
//         res.send(result)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })




//register view engine
app.set("view engine", "ejs")
// //file is named something other than "views"
// app.set("views", "myviews")

// app.use((req, res, next)=>{
//     console.log(req.hostname, req.path, req.method)
//     console.log("Request made")
//     //allows next code to continue
//     next()
// })
app.use(morgan("Request made")) 
app.use(morgan("dev"))
//takes form data that someone puts in website form, parses into object to request
app.use(express.urlencoded({ extended:true }))

//declares that all static files(css, assets) are in "public"
app.use(express.static('public'));

// gets right html page based on url

// app.get("/", (req, res)=>{
//     // res.send('<h1>hello bye</h1>')
//     // //when using .html files
//     // res.sendFile("./views/index.html", {root: __dirname})
    
//     //using data declared in js
//     const blogs = [
//         {titles: "First", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni!"},
//         {titles: "Second", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni!"},
//         {titles: "Third", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, magni!"}
//     ]
//     //below saying "blogs: blogs" is the same thing as just "blogs"
//     res.render("index", {title: "MyTitle", blogs})
// }) 

app.get("/", (req, res)=>{
    //finds all blogs from the database and sorts it with timestamps (-1 = newest first)
    //then sends the found blogs to the browser along with the title and index.ejs file
    Blog.find().sort({ createdAt: -1}).then((result)=>{
        res.render("index", { title: "All blogs", blogs: result })
    }).catch(err => console.log(err))
})

app.post("/", (req, res)=>{
    //makes a new blog using the Blog model
    const blog = new Blog(req.body)
    //saves new data
    blog.save().then(result =>{
        //redirects back to homepage after data is submitted
        res.redirect("/")
    }).catch(err =>{
        console.log(err)
    })
})

app.get("/add-blog", (req, res)=>{
    res.render("add-blog", { title: "Add blog"})
}) 

//redirect
app.get("/add-blog2", (req, res)=>{
    res.redirect("/add-blog")
}) 

//details page, always under the other pages or  else the browser will think "add-blog" is --
//-- an id and it will match before the actual add blog page matches
app.get("/:id", (req, res)=>{
    //id of blog
    const id = req.params.id
    Blog.findById(id).then(result => {
        res.render("details", { blog: result, title: "Blog details" })
    }).catch(err=>{
        console.log(err)
        res.status(404).render("404", { title: "404" })
    })
})

//delete blog
app.delete("/:id", (req, res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id).then(result=>{
        res.json({ redirect: "/" })
    }).catch( err=> console.log(err))
})

// //default when url does not exist, always last in code
// app.use((req, res)=>{
//     // res.status(404).sendFile("./views/404.html", {root: __dirname})
//     res.status(404).render("404", { title: "404" })
// })