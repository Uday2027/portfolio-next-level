
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  description?: string;
  date?: string;
  organization?: string;
  link?: string;
}

const AchievementSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String },
  organization: { type: String },
  link: { type: String },
}, { timestamps: true });

const Achievement: Model<IAchievement> =
  mongoose.models.Achievement || mongoose.model<IAchievement>('Achievement', AchievementSchema);

export default Achievement;
