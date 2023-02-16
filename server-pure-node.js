const http = require("http")
const fs = require("fs")
const _ = require("lodash")
const server = http.createServer((req, res)=>{
    console.log(`Request made. Request-url: ${req.url}, Request-method: ${req.method}`)
    
    //letting browser know that the content it's getting is html
    res.setHeader("content-Type", "text/html")

    //figure out wich page someone is requesting
    let path = "./views/"
    switch(req.url){
        case "/":
            path += "index.html"
            //inspect > network
            res.statusCode = 200
            break
        case "/about":
            path += "about.html"
            res.statusCode = 200
            break
        //when people go to "about2" they will be redirected to "about"
        //2 ways to do this shown below
        case "/about2":
            // path += "about.html"
            // res.statusCode = 301
            // break

            //301=permanentely moved to other url
            res.statusCode = 301
            res.setHeader("Location", "/about")
            res.end()
        //if page does not exist they will be sent to 404 page (default)
        default:
            path += "404.html"
            res.statusCode = 404
            break
    }

    //this will send the requested file to the browser
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err)
            //response should always end even if there is an error
            res.end()
        } else{
            //this will end the response after sending "data"
            //if writing multiple use res.write and res.end() after
            res.end(data)
        }
    })


    //allows us to host our own website on localhost, using port 3000
    //listens for requests from server
    server.listen(3000, "localhost", ()=>{
        console.log("Listening for requests on port 3000")  
    })

    

    //Lodash examples

    //Random number between 0 and 1000
    const num = _.random(0, 1000)
    console.log(num)

    //Allow function to only run once
    const greet = _.once(()=>{
        console.log("hello")
    })
    greet() //will run
    greet() //will not run
    greet() //will not run
})

