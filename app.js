"use strict";
const express=require("express");
const app=express();
app.use(express.static(__dirname))
const port=process.env.PORT || 8080;
app.get((req,res)=>{
	res.sendfile("index.html");
})
app.listen(port,()=>console.log(`Server listening on ${port}`));