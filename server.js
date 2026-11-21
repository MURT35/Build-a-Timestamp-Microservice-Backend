import express from "express";
import cors from "cors";
import e from "express";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

app.get('/api{/:date}',(req,res)=>{
  const dateParms=req.params.date
  let date
  if(!dateParms){
    date= new Date()
  }
  else if(/^\d+$/.test(dateParms)){
date= new Date(Number(dateParms))
  }
  else{
    date = new Date(dateParms)
  }
 if(Number.isNaN(date.getTime())){
  return res.json({
    error: "Invalid Date"
  })
 }
  res.json({
  unix:date.getTime(),
  utc:date.toUTCString()
  }
  )
})

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
