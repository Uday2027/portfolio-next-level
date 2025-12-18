
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://localhost:27017/portfolio";

const profileData = {
  name: "Zubayer Hossain Uday",
  title: "Full Stack Developer",
  university: "Shahjalal University of Science and Technology (SUST)",
  bio: "Efficient and detail-oriented Full Stack Developer with a passion for building scalable applications and DevSecOps practices.",
  email: "zubayerhossain1009@gmail.com",
  phone: "01957852417",
  location: "Sylhet, Bangladesh",
  github: "https://www.github.com/Uday2027",
  linkedin: "https://www.linkedin.com/in/zubayer-hossain-uday-3481841bb/",
  themeColor: "#fa0025",
  education: [
    {
      institution: "Shahjalal University of Science and Technology",
      degree: "Bsc (Eng) in Computer Science and Engineering",
      startDate: "2022",
      endDate: "2027"
    }
  ],
  experience: [
    {
      company: "codencyBD",
      role: "Full Stack Developer",
      duration: "6 months",
      description: "Building Complete Industry standard site and deploy them."
    }
  ],
  skills: [
    { name: "Node.js", category: "Backend" },
    { name: "NEXT.js", category: "Frontend" },
    { name: "GitHub", category: "Tools" }
  ]
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");
    
    // Clear existing
    await mongoose.connection.db.collection('profiles').deleteMany({});
    
    // Insert
    await mongoose.connection.db.collection('profiles').insertOne(profileData);
    console.log("Profile restored successfully!");
    
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
