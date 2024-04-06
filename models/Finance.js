import mongoose from "mongoose";
import { Schema } from "mongoose";

const financeSchema = new Schema(
  {
    name: { type: String },
    total: { type: Number },
    contributions: { type: Array },
    expenses: { type: Array },
    activities: { type: Array },
    notices: { type: Array },
    events: { type: Array },
  },
  { timeStamps: true }
);

const Finance =
  mongoose.models.Finance || mongoose.model("Finance", financeSchema);

export default Finance;
