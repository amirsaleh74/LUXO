const mongoose = require('mongoose');

// MongoDB Atlas Connection
const mongoURI = 'mongodb+srv://amirsaleh74:123@cluster0.jgzvq.mongodb.net/vehicleReports?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the report schema
const reportSchema = new mongoose.Schema({
    driverName: { type: String, required: true },
    vehiclePlate: { type: String, required: true },
    startMiles: { type: Number, required: true },
    finishMiles: { type: Number, required: true },
    oilPercentage: { type: Number, required: true },
    gasPayment: { type: Number, required: true },
    description: { type: String, required: false },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create the report model
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
