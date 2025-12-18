
import mongoose from 'mongoose';
const { connect, connection, disconnect } = mongoose;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

async function test() {
  try {
    console.log("Connecting to:", MONGODB_URI);
    await connect(MONGODB_URI);
    console.log("Connected!");
    
    // access collection directly
    const profile = await connection.db.collection('profiles').findOne({});
    console.log("Profile found:", profile ? "Yes" : "No");
    if(profile) console.log(JSON.stringify(profile, null, 2));

  } catch (e) {
    console.error("Error:", e);
  } finally {
    await disconnect();
  }
}

test();
