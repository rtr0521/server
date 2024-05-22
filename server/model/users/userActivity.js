// models/Description.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: 
    { 
      type: String, 
      required: true 
    },
  description: 
    { 
      type: String, 
      required: true 
    },
  dateStart: 
    { 
      type: Date, 
      required: true 
    },
  dateEnd: 
    { 
      type: Date, 
      required: true 
    },
  status: 
    { type: String, 
      enum: ['Todo', 'Ongoing', 'Done'], 
      required: true 
    }
});

module.exports = mongoose.model('Activity', activitySchema);
