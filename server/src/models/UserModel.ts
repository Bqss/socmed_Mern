import {Schema, model} from "mongoose";

const userSchema = new Schema({
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
  profilePicture: Boolean,
  coverPicture: Boolean,
  about: String,
  livesIn: String,
  workAt: String,
  relationShip: String,
  followers: [],
  following: []
},{
  timestamps: true
})


export default model("user",userSchema);

