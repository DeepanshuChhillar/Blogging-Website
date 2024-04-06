import express from "express";
import {dirname} from  "path";
import {fileURLToPath} from "url";
import bodyParser from "body-parser";

const app=express();
const port=3000;
const dir_name=dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

var arr=[];

app.get("/", (req,res) => 
{
    res.locals={myarr: arr};
    res.render(dir_name+"/public/form.ejs");
});

app.get("/edit", (req,res) =>
{
    const index = req.query.index;
    console.log("Index:", index);
    res.render(dir_name+"/public/edit.ejs", {
        id: index,
    });
});

app.get("/delete", (req,res) =>
{
    var ind=req.query.index;
    arr.splice(ind,1);
    res.locals={myarr: arr};
    res.render(dir_name+"/public/form.ejs");
});

app.post("/submit", (req,res) => 
{
    console.log(req.body);
    var mess={ ids: req.body["id"] , content: req.body["Mtext"], authors: req.body["author"]};
    arr.push(mess);
    res.locals={myarr: arr};
    res.render(dir_name+"/public/form.ejs");
});


app.post("/commit", (req,res) => 
{
    console.log("Heyh! POST CALLED!")
    const ind=req.query.index;
    arr[ind].content=req.body["Name_change"];
    arr[ind].authors=req.body["author"];
    res.locals={myarr: arr};
    res.render(dir_name+"/public/form.ejs");
});

app.listen(port, ()=> 
{
    console.log("Server is Running: ",port);
});





