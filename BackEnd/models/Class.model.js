var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ClassSchema = new mongoose.Schema({
    
    name: String,
    subject: String,
    description: String,
    duration: String,
    frequency: String,
    cost: Number,
    currency: String,
    type:String,
    rating: Number,
    idProfessor:String,
    createdDate: Date

});



ClassSchema.plugin(mongoosePaginate)
const Class = mongoose.model('Class', ClassSchema)


module.exports = Class;