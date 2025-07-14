import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

const uploadedOnCloudinary =async (localFilePath) =>{
    try{
        if(!localFilePath) return null;

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type : "auto"
        })

        // uploaded the file is successfully
        console.log*("File is Uploded on cloudinary : " ,response.url )
        return response;
    }
    catch(err)
    {
        fs.unlinkSync(localFilePath) //remove the locally save temporary file as the upload operation got failed
        return null;
    }
}

export { uploadedOnCloudinary} 

// this is the cloudinary take the documention but we are using the function calling 
// cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
//     });