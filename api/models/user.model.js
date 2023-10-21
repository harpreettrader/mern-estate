import mongoose from "mongoose";
const usershema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passward: {
      type: String,
      required: true,
    },
    avatar:{
      type:String,
      default:"https://th.bing.com/th?id=OIP.0siT9Vkwx8tb_kFTi-KV1wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2"
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", usershema);

export default User;
