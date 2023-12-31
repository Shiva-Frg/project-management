const { Schema, default: mongoose } = require('mongoose')

const userSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, unique: true, required: true },
    mobile: { type: String, unique: true, required: true },
    roles: { type: [String], default: ['USER'] },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profile_image: { type: String, default: '' },
    skills: { type: [String], default: [] },
    teams: { type: [String], default: [] },
    token: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
)

const userModel = mongoose.model('user', userSchema)

module.exports = {
  userModel,
}
