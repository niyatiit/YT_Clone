import express from "express"

// cookieParser is one type of the middleware using for the CRUD opertor in the authentication.
import cookieParser from "cookie-parser"

// cors are genrally using for the connection of the frontend and the backend
import cors from "cors"

const app = express()

//----------------- this is the configration of the production code ------------------


// this is the middleware that runs the every request and check the port number are run the 
// success or not so we are using the check are true  
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true,
}))


//Adds built‑in body‑parser middleware for JSON payloads. limit: "16kb" caps the request body 
//size at 16 kilobytes to protect against very large JSON payloads.
app.use(express.json({limit : "16kb"}))

// this is the using the string of the url like in the google 
app.use(express.urlencoded({extended :true , limit : "16kb"}))

// using the store of the images and css file 
app.use(express.static("public"))

// Activates cookie-parser so every request 
app.use(cookieParser())


app.get('/' , (req , res) => {
    res.send("Hello this is my backend File")
})
export  { app }


