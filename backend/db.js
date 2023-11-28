const mongoose =  require('mongoose')

const mongoURI = "mongodb://127.0.0.1:27017/CampusGala"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to Mongo Succesfully")
    } catch (error) {
        console.log("Error Connected to Mongo",error)
    }
}

module.exports = connectToMongo