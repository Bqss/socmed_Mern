import {Schema, model} from "mongoose";

export const userSchema = new Schema({
  userName : {
    type : String,
    required: true,
    unique : true
  },
  password : {
    type : String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  profilePicture: String,
  coverPicture: String,
  about: String,
  livesIn: String,
  website: String,
  workAt: String,
  relationship: String,
  followers: [],
  following: []
},{
  timestamps: true
})


export default model("user",userSchema);

