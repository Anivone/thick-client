import mongoose, { Document, Model, Schema } from "mongoose";
import { Password } from "../utils/Password";

export enum Roles {
  USER = "user",
  ADMIN = "admin",
}

export interface UserProps {
  login: string;
  password: string;
  role: Roles;
}

export interface UserDocument extends UserProps, Document {}

interface UserModel extends UserProps, Model<UserDocument> {
  build(props: UserProps): UserDocument;
}

const UserSchema = new Schema<UserDocument>(
  {
    login: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      required: true,
      type: String,
      enum: Roles,
      default: Roles.USER,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

UserSchema.statics.build = (props: UserProps) => {
  return new User(props);
};

const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);

export default User;
