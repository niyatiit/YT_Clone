const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req ,res , next)).catch((err) => next(err))
    }
}
 


export {asyncHandler}

// this is the basic and simple approch to use this method usiing the try and catch


// const asyncHadler = (fn) => {}
// const asyncHadler = (fn) => {() => {}} only remove the bracket 


// const asyncHandler = (fn) => async () =>{
//     try
//     {
//         await fn(req ,res , next)
//     }
//     catch(err)
//     {
//         res.status(err.code || 500).json({
//             success : false,
//             message : err.message
//         })
//     }
// }