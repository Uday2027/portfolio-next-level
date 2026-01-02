
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEducation {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface IExperience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface ISkill {
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "Databases" | "DevOps" | "Tools" | "Other";
}

export interface IProfile extends Document {
  name: string;
  title: string;
  university: string;
  bio: string;
  themeColor?: string;
  photoUrl?: string;
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
  resumeUrl?: string;
  education: IEducation[];
  experience: IExperience[];
  skills: ISkill[];
}

const EducationSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});

const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String },
});

const SkillSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, default: "Other" },
});

const ProfileSchema: Schema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  university: { type: String, required: true },
  bio: { type: String },
  themeColor: { type: String, default: "#2563eb" },
  photoUrl: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  github: { type: String },
  linkedin: { type: String },
  resumeUrl: { type: String },
  education: [EducationSchema],
  experience: [ExperienceSchema],
  skills: [SkillSchema],
}, { timestamps: true });

// Prevent model overwrite on hot reload
// In development, delete the model so it re-compiles with new Schema changes
if (process.env.NODE_ENV !== 'production' && mongoose.models.Profile) {
  delete mongoose.models.Profile;
}

const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
