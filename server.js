const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());
const mysql = require('mysql');


var con = mysql.createConnection({
  host: '192.168.2.8',
  user: 'trainee',
  password: 'trainee@123',
  database: 'trainee'
});

con.connect(function (err) {
  if (err) console.log(err)
  else
    console.log("Database Connected")
});

app.get("/addcategory",(req,res)=>{
    const sql="select * from ishacategory"
    con.query(sql,(error,result)=>{
        if(error) throw error;
        console.log(result)
        res.json(result)
    })
})

app.post("/clickonadd",(req,res)=>{
    const inputcategoryname=req.body.inputcategoryname;
    const parent_id = req.body.id;
    const sql = `insert into ishacategory(category,parent_id) values("${inputcategoryname}","${parent_id}") `

    con.query(sql,(error,result) => {
        if(error) throw error;
        console.log(result)
        res.send("inserted")
        console.log("new category is successfully added in category data ")
    })
    
})

app.get("/getchilddata", (req,res)=>{
    const recid=req.body.id;
    sql=`select * from ishacategory where parent_id="${recid}"`
    con.query(sql,(error,result)=>{
        if (error) throw error;
        console.log(result)
        res.send(result)
    })
})



app.get("/showcategorydata",(req,res)=>{
    const sql = `select * from ishacategory`
    con.query(sql,(error,result)=>{
        if(error) throw error;
        console.log(result)
        res.json(result)
    })
})

app.listen(8010,()=>{console.log("your server is running on the port number 8010")})
