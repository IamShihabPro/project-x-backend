import { Query, Schema, Types, model } from "mongoose";
import { TSignUp } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcryptjs';

const userSchema = new Schema<TSignUp>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true },
    
    followers: [{ type: Types.ObjectId, ref: 'User' }],
    following: [{ type: Types.ObjectId, ref: 'User' }], 
    
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    postsCount: { type: Number, default: 0 }, 
    
    isVerified: { type: Boolean, default: false },
    subscriptionStatus: {
      type: String,
      enum: ['subscribed', 'not-subscribed'],
      default: 'not-subscribed',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', async function (next) {
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    next();
});




userSchema.post('save', function(doc, next) {
    doc.password = '';
    next();
});


userSchema.pre<Query<TSignUp, TSignUp>>('find', function(next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

userSchema.pre<Query<TSignUp, TSignUp>>('findOne', function(next) {
    this.where({ isDeleted: { $ne: true } });
    next();
})

userSchema.index({ email: 1 }, { unique: true });

export const User = model<TSignUp>('User', userSchema)