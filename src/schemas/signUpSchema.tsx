import {z} from "zod"


//Username is single so we dont use object
export const usernameValidation = z
    .string()
    .min(2, "Username must be atleast 2 characters")
    .max(20, "Username must be least than 20 characters")
    .regex(/&[a-zA-Z0-9]+$/,"Username must not contain regex character")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:'Invalid Email Address'}),
    password: z.string().min(6, {message: 'Password must be atleast 6 characters'})

})

