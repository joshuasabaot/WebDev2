import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true },
        email: {type: String, required: true, unique: true },
        password: {type: String, required: true },
        first_name: {type: String },
        last_name: { type: String },
        date_of_birth: { type: Date },
        address: { type: String},
        contact: { type: String, required: true },
        is_active: { type: Boolean, default: true },
        role: { type: String, enum: ["admin", "user", "moderator"], default: "user"}

    }, 
    {
        timestamps: true    
    }
);

// Middleware
UserSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
    } else {
        return next();
    }
})

export default mongoose.model("User", UserSchema)