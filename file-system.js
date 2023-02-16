// // 'node filename' to run code in terminal
// // os = operating system, you can also require this
// // fs = file system

// console.log(global)
// console.log(__dirname) //folder we're in
// console.log(__filename) //folder we're in + file

// module.exports = names //exports var names, for multiple use object (you can change key)
// require("./script") //requires exported var names from script.js, put .names behind to specifically get var names
// const {names, ages} = require("./script") //destructuring of multiple vars, you can now use names and ages in your new file





// //reading files
// const fs = require("fs")
// fs.readFile("./docs/test.txt", (err, data)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log(data.toString()) //gets data from docs/test.txt 
// })


// //writing files
// const fs = require("fs")
// fs.writeFile("./docs/test.txt", "I wrote this in JS", ()=>{
//     console.log("File was written")

//     fs.readFile("./docs/test.txt", (err, data) => console.log(data.toString())) //reading what you just wrote
// })
// //also possible to make new file using this method so for example ./docs/test2.txt will make a second test in "docs"


// //deleting files
// const fs = require("fs")
// if(fs.existsSync("./docs/test.txt")){
//     fs.unlink("./docs/test.txt", (err)=>{
//         if(err){
//             console.log(err)
//         } else{
//             console.log("File deleted")
//         }
//     })
// } else{
//     console.log("File doesn't exist")
// }


// //directories (folder), make, check if exists, delete
// const fs = require("fs")
// if(! fs.existsSync("./docs1")){
//     fs.mkdir("./docs1", (err)=>{
//         if(err){
//             console.log(err)
//         } else{
//             console.log("Folder created")
//         }
//     })
// } else{
//     console.log("Folder already existed, will now be deleted and new one will be created")
//     fs.rmdir("./docs1", (err)=>{
//         if(err){
//             console.log(err)
//         } else{
//             console.log("Folder deleted")
//             fs.mkdir("./docs1", (err)=>{
//                 if(err){
//                     console.log(err)
//                 } else{
//                     console.log("Folder created")
//                 }
//             })
//         }
//     })
// }


// const fs = require("fs")
// const newfile = "./docs/newfile"
// const content = "I just made a new file containing this text"
// if(fs.existsSync(newfile)){
//     console.log("File already exists")
// } else{
//     fs.writeFile(newfile, content, (err)=>{
//         console.log("File has been created, content of file: ")
//         fs.readFile(newfile, (err, data) => console.log(data.toString())) //or use var content
//     })
// }



// require("fs").writeFile("./scriptNew.js", "", err=>console.log("New script is made"))



// //stream, do something with data bit by bit immediately instead of all at once with a delay
// const fs = require("fs") 
// //function "on" executes every time new buffer of "data" is recieved
// //encoding converts to string, or use chunk.toString()
// fs.createReadStream("./docs/big-text-file.txt", {encoding: "utf8"}).on("data", (chunk)=>{
//     //reads chunks of file
//     console.log("---------------- CHUNK ----------------" + chunk + "---------------- END OF CHUNK ----------------")
    
//     // writes same chunks in new file
//     fs.createWriteStream("./docs/big-text-file-2.txt").write("---------------- NEW CHUNK ----------------" + chunk + "---------------- END OF NEW CHUNK ----------------")
// })


// // piping, copies chunks from one file to another, more efficient way of doing the above
// const fs = require("fs")
// fs.createReadStream("./docs/big-text-file.txt", { encoding: "utf8"}).pipe(fs.createWriteStream("./docs/big-text-file-2.txt"))