import {resend} from "@/lib/resend";



import VerificationEmail from "..//../emails/Verification_Email";



import {ApiResponse} from "@/types/ApiResponse"

export async function sendVerificationEmail(email:string,
    username: string,
    otp: string
): Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from:'<onboarding@resend.dev>',
            to: email,
            subject: 'Verification code for your Message',
            react: VerificationEmail({username, otp}),
        });
        return {success:true, message:'Verification email sent'}
    }catch(emailError){
        console.error("Error sending verification email", emailError)
        return {success:false, message:'Failed to send verification email'}
    }
}
