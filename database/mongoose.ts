import mongoose from 'mongoose';


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

declare global{
    var conn: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.conn;

if(!cached){
    cached = global.conn = {conn : null, promise: null};
}

export const connectToDatabase = async() => {
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false})
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error
    }
}



console.log("MONGODB CONNECTED")