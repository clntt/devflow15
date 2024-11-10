import { model, models, Schema } from "mongoose";

export interface ITag {
  name: string;
  questions: number;
}

export const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    questions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Tag = models?.tag || model<ITag>("Tag", TagSchema);

export default Tag;