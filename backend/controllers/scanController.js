

const Scan = require('../models/Scan');

const getScans = async (req, res) => {
  try {
    const { userId } = req.params;

    const sortOrder = req.query.sort === 'oldest' ? 1 : -1;

    console.log(`📋 Fetching scans for user: ${userId}`);

    const scans = await Scan.find({ userId: userId })
      .sort({ createdAt: sortOrder })  
      .lean();                          

    console.log(`✅ Found ${scans.length} scans for user: ${userId}`);

    return res.status(200).json({
      success: true,
      count:   scans.length,
      scans:   scans,
    });

  } catch (error) {
    console.error('❌ getScans error:', error.message);
    return res.status(500).json({
      success: false,
      message: '❌ Server error while fetching scan history.',
      error:   error.message,
    });
  }
};

const filterScans = async (req, res) => {
  try {
    const { userId, crop, disease, sort } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: '❌ userId is required as a query parameter.',
      });
    }

    const filter = { userId };

    if (crop && crop !== 'all') {
      
      filter.cropName = { $regex: crop, $options: 'i' };
    }

    if (disease && disease !== 'all') {
      
      filter.diseaseName = { $regex: disease, $options: 'i' };
    }

    const sortOrder = sort === 'oldest' ? 1 : -1;

    console.log(`🔍 Filtering scans:`, filter);

    const scans = await Scan.find(filter)
      .sort({ createdAt: sortOrder })
      .lean();

    console.log(`✅ Filter returned ${scans.length} scans`);

    return res.status(200).json({
      success: true,
      count:   scans.length,
      scans:   scans,
    });

  } catch (error) {
    console.error('❌ filterScans error:', error.message);
    return res.status(500).json({
      success: false,
      message: '❌ Server error while filtering scans.',
      error:   error.message,
    });
  }
};

const deleteScan = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`🗑️ Deleting scan: ${id}`);

    const deleted = await Scan.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: '❌ Scan not found. It may have already been deleted.',
      });
    }

    console.log(`✅ Scan deleted: ${id}`);

    return res.status(200).json({
      success: true,
      message: '✅ Scan deleted successfully.',
    });

  } catch (error) {
    console.error('❌ deleteScan error:', error.message);
    return res.status(500).json({
      success: false,
      message: '❌ Server error while deleting scan.',
      error:   error.message,
    });
  }
};

module.exports = { getScans, filterScans, deleteScan };
