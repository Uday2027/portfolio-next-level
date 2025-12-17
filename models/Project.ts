
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  order: number;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], default: [] },
  liveLink: { type: String },
  githubLink: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
