const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

let todos=[];



 function readData(){
     let data = fs.readFileSync("data_base.js","utf-8");
     todos = JSON.parse(data);
}
function WriteData(DataInString){
    fs.writeFileSync("data_base.js",DataInString,"utf-8"); 
}


app.get("/",function(req , res){

    readData();
    res.json(todos);

})

app.post("/", function(req,res){

    const newTask = req.body;

    readData();

    todos.push(newTask.work);
    const DataInString = JSON.stringify(todos);

    WriteData(DataInString);
    res.send("ok");                                     // you have to send a response when you you axios in asyn function as it will keep waitiong for the response 
                                                        // and the request sent will be in pending 
})

app.put("/",function(req,res){
    let index = req.body.index;
    

    readData();

    todos.splice(index,1);
    let DataInStrings = JSON.stringify(todos);

    WriteData(DataInStrings);
    res.send("ok");                    
    
})

app.listen(3000);
