// this is also correct but we are not using this because in this file all the file are import
//  and this is one only file that connected the require so that is the bas consistancy create
//  in the code so we are using the second approch 
// require {'dotenv'}.config({path : './env'})


// this is the best approch to use the dotenv file using the import
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path : './env'
})

connectDB()

// this is the first aproch 
/*
;(async () => {
    try{
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       app.on("error" , (error) =>{
        console.log("Error : " , error)
        throw error
       })
       app.listen(process.env.PORT, () =>{
        console.log(`App is listening on port ${process.env.PORT}`)
       })
    }
    catch(err){
        console.log(err)
        throw err
    }
})()
    */