const { Schema, default: mongoose } = require('mongoose')

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    image: { type: String, default: '/defaults/default.jpg' },
    owner: { type: [mongoose.Types.ObjectId], required: true },
    team: { type: [mongoose.Types.ObjectId] },
    private: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
)

const projectModel = mongoose.model('project', projectSchema)

module.exports = {
  projectModel,
}
