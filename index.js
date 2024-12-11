const express = require ('express');
const app = express();

app.listen("8080",(req,res)=>{
console.log("working fine");

})

// user authentication example

const checkToken = (req,res,next)=>{
    let { token } = req.query;

    if(token ==="access"){
        next();
    }
    else{
       throw new Error("ACCESS DENIED")
    }
};

app.get("/api", checkToken ,(req,res)=>{
    res.send("data");
})


// -------------------------------------------------------------------


app.use("/random", (req,res,next)=>{
    console.log("I am middleware for random page...");
    return next()  ;
})


// logger - morgan
app.use("/" ,(req,res,next)=>{
    
    req.time = new Date(Date.now()).toString().slice(0,15);
    console.log(req.method, req.url , req.hostname , req.path, req.time)
    return next();
} )


// app.use( (req,res,next)=>{
    
//     console.log("I am middleware 2")
//     return next();
// } )

app.get( "/",(req,res)=>{
    res.send("Hey I am root!")
} )

app.get( "/random",(req,res)=>{
    res.send("Hey I am random request!")
} )

