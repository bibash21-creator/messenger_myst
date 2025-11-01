// 🧠 Summary of dbconnect() Code

// Imports Mongoose to manage MongoDB connections.

// Defines a TypeScript type ConnectionObject with an optional isConnected property.

// Creates a connection object to track connection status.

// Defines an async function dbconnect() that:

// Checks if already connected → logs and returns.

// Otherwise, tries to connect to MongoDB using mongoose.connect() with the URI from environment variables.

// Updates connection.isConnected with Mongoose’s readyState.

// Logs success or failure and exits the process if connection fails.

// Exports the result of calling dbconnect() (runs connection immediately when imported).// 

// import → define type → create state → async connect → try/catch → export


import mongoose from 'mongoose'


// Connection object in Typescript
type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject= {}

// Data base connection function where i dont care whatever the data will come in promise
async function dbconnect(): Promise<void>{
    if (connection.isConnected){
        console.log("Already connected to database");
        return
    }

    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected succesfully");
        }catch(error){
            process.exit()
            console.log("DB Connection Failed", error);

    }
}


export default dbconnect();