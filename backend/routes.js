const express = require('express');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const Report = require('./database'); // Import the database model

const router = express.Router();

// Route: Test server
router.get('/', (req, res) => {
    res.send('Welcome to the Vehicle Weekly Report API!');
});

// Route: Add a new weekly report
router.post('/weekly-reports', async (req, res) => {
    try {
        const newReport = new Report(req.body); // Create a new document
        const savedReport = await newReport.save(); // Save to MongoDB
        res.status(201).json({ message: 'Report submitted successfully!', savedReport });
    } catch (error) {
        console.error('Error saving report:', error);
        res.status(500).json({ error: 'Failed to save report.' });
    }
});

// Route: Export all reports to a CSV file
router.get('/export-reports', async (req, res) => {
    try {
        const reports = await Report.find(); // Fetch all reports

        // Define CSV fields
        const fields = [
            { label: 'Driver Name', value: 'driverName' },
            { label: 'Vehicle Plate', value: 'vehiclePlate' },
            { label: 'Start Miles', value: 'startMiles' },
            { label: 'Finish Miles', value: 'finishMiles' },
            { label: 'Oil Percentage', value: 'oilPercentage' },
            { label: 'Gas Payment ($)', value: 'gasPayment' },
            { label: 'Other Expenses', value: 'description' },
            { label: 'Date Created', value: 'createdAt' },
        ];

        // Convert to CSV
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(reports);

        // Save CSV file temporarily
        const filePath = path.join(__dirname, 'VehicleReports.csv');
        fs.writeFileSync(filePath, csv);

        // Send the file for download
        res.download(filePath, 'VehicleReports.csv', (err) => {
            if (err) {
                console.error('File download error:', err);
                res.status(500).send('Failed to export file.');
            }
            fs.unlinkSync(filePath); // Remove temporary file
        });
    } catch (error) {
        console.error('Error exporting data:', error);
        res.status(500).json({ error: 'Failed to export data.' });
    }
});

module.exports = router;
