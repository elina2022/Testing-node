const mongoose = require("mongoose")
const schema = mongoose.Schema 

const blogSchema = new schema({
    title: {
        type: String, 
        required: true
    },
    snippet: {
        type: String, 
        required: true
    }, 
    body: {
        type: String, 
        required: true
    }
}, { timestamps: true })


//a model allows us to interact with mongoDB, like updating and deleting data 
//create the Blog model
const Blog = mongoose.model("Blog", blogSchema)
//exporting the Blog model (is being required in app.js)
module.exports = Blog  