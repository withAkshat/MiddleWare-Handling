const express = require ('express');
const app = express();

const ExpressError = require("./ExpressError")

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
       throw new ExpressError(401,"ACCESS DENIED")
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


// Error handling middleware

app.get("/err",(req,res)=>{
    abcd=abcd;
})

app.get("/admin",(req,res)=>{
    throw new ExpressError(403,"Access to admin is forbidden")
})

app.use((err,req,res,next)=>{       //error Handling Middleware
    console.log("Error Found");
    let { status=500 , message="some error found" } = err; 
    // next(err);
    res.status(status).send(message);
})

// app.use((err,req,res,next)=>{
//     console.log("Error for midddleware 2");
//     next(err)
// })



app.get( "/random",(req,res)=>{
    res.send("Hey I am random request!")
} )

