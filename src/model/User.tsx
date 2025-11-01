// // 🧠 Summary of the Code

// Imports Mongoose, its Schema, and Document to define data models for MongoDB.

// Creates a Message interface and its corresponding MessageSchema with:

// content: string, required

// createdAt: date, required, defaults to current time.

// Defines a User interface that includes user details (name, email, password, etc.) and a list of messages.

// Builds a UserSchema enforcing:

// Field validation (required, unique, default values).

// Email pattern matching via regex.

// Boolean flags (isVerified, isAcceptingMessage).

// Embedded message array using MessageSchema.

// Creates or reuses a UserModel from the schema to interact with the MongoDB collection.

// Finally, exports the UserModel for use in other parts of the app.

import mongoose, {Schema, Document} from 'mongoose'


// Message is the name of the interface here which is being exported as to MongoDB
export interface Message extends Document{
    content: string;
    createdAt: Date;
}


// <Message> is the schema where MessageSchema is the object 
const MessageSchema: Schema<Message> = new Schema({
    //THe line below does the type safety
    content: {
        type: String,
        required: true
    },
    
    createdAt:{
        type: Date,
        required:true,
        default: Date.now
    }
})



//User is the thing with the following types of datawhich is Interface
export interface User extends Document{
    name: string,
    email: string,
    password: string,
    verifyCode: string,
    isVerified: boolean,
    verifyCodeExpiry: Date,
    isAcceptingMessage: boolean;
    message: Message[]
}


// Scchema
const UserSchema:Schema<User>=new Schema({
    name: {
        type:String,
        required: [true, 'Username is required'],
        unique: true
    },

    email: {
        type:String,
        required:[true,'Email Address is  required'],
        unique:true,
        match:  [/^[^@\s]+@[^@\s]+\.[^@\s]+$/,'please  use  a valid email address']
    },

    password:{
        type: String,
        required:[true, 'Password is required'],
    },

    verifyCode:{
        type:String,
        required:[true,'You will need Verify Code'],


    },
    verifyCodeExpiry:{
        type:Date,
        required: [true, 'Verify code is required']

    },

    isVerified:{
        type:Boolean,
        default: false
    },

    isAcceptingMessage:{
        type:Boolean,
        default:true
    },

    message: [MessageSchema]
})


// User Model is already in the mongoose model
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model("User", UserSchema)




export default UserModel;