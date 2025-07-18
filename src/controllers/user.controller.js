import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadedOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  // this step is only checking that run success or not so i can comment this 2 line
  // res.status(200).json({
  //     message : "Done"
  // })

  // /**************Follow the step for the registration *************** */
  // 1. get user detials from frontend means using the postman
  // 2. validation  - i) not empty
  // 3. check if user already exits : username , email
  // 4. check for images , check for avatar
  // 5. upload them to cloudinary , avatar
  // 6. create user object - create entry in gb
  // 7. remove the password and refresh token field from response
  // 8. check for the user creation
  // 9. retrun response

  // 1. get the user details
  const { username, email, fullName, password } = req.body;
  console.log("username : ", username, "email : ", email , "fullName : " , fullName , "Password : " , password);

  // 2. validation  - i) not empty
  //   this is using begginers and check all the field
  //   if(fullName === "")
  //   {
  //     throw new apiError(400 , "Fullname is required")
  //   }
  //   if(username === "")
  // {
  //     throw new apiError(400 , "Username is required")
  // }

  // this is using in the indurstry level
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "All fields are required");
  }

  // 3. check if user already exits : username , email
  const existedUser =await User.findOne({
    // this method is checking the mutliple fields using the $or
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new apiError(409, "User with email or username already exits");
  }

  // 4. check for images , check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    console.log("Avatar Local Path : " , avatarLocalPath)
    throw new apiError(400, "Avatar file is require");
  }
  // 5. upload them to cloudinary , avatar

  const avatar = await uploadedOnCloudinary(avatarLocalPath);
  const coverImage = await uploadedOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    console.log("Uploaded avatar: ", avatar);
    throw new apiError(400, " Avatar is required");
  }

  // 6. create user object - create entry in gb
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // 7.remove the password and refresh token field from response we are not getting this 2.
  const createdUser = await User.findById(user._id).select(
    "-pssword -refreshToken" //this is the syntac this 2 filed not show
  );

  if (!createdUser) {
    throw new apiError(500, "Something Went Wrong  While Registring User");
  }

    // 8. check for the user creation
  return res.status(201).json(
    new apiResponse(200 , createdUser , "User Successfully Register")
  )

});

export { registerUser };
