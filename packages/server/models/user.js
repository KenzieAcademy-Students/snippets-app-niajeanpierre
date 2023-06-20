import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match:  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  profile_image: { type: String, default: '/fox.svg' },
  posts: [
    {
      type: ObjectId,
      ref: 'Post',
    },
  ],
  postLikes: [
    {
      type: ObjectId,
      ref: 'Post',
    },
  ],
})

const User = mongoose.model('User', userSchema)

export default User
