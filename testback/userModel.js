const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
    name: { type: String, required: true, max: 250},
    email: { type: String, required: true, max: 250},
    password: { type: String, required: true, min: 4, max: 250}
    }
) 

module.exports = userSchema