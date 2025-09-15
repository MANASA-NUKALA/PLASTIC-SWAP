// backend/controllers/itemController.js
const Item = require('../models/Item');

/**
 * Create a new item (authenticated)
 */
exports.createItem = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      owner: req.user._id,
      image: req.body.image, // accept URL or uploaded image URL
      category: req.body.category,
      condition: req.body.condition,
      location: req.body.location
    };
    const item = await Item.create(data);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * List items with optional query params: ?q=search&category=&status=
 */
exports.listItems = async (req, res) => {
  try {
    const { q, category, status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (q) filter.title = new RegExp(q, 'i');
    if (category) filter.category = category;
    if (status) filter.status = status;

    const items = await Item.find(filter)
      .populate('owner', 'name email avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get item by id
 */
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('owner', 'name email avatar');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update item fields (only owner allowed)
 */
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (!item.owner.equals(req.user._id)) return res.status(403).json({ message: 'Not allowed' });

    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update status (e.g., request -> swapped)
 */
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Only owner can change status here. If you want other flows (request by other user) implement separately.
    if (!item.owner.equals(req.user._id)) return res.status(403).json({ message: 'Not allowed' });

    if (['available', 'requested', 'swapped'].includes(status)) {
      item.status = status;
      await item.save();
      return res.json(item);
    }
    res.status(400).json({ message: 'Invalid status' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete item (owner only)
 */
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (!item.owner.equals(req.user._id)) return res.status(403).json({ message: 'Not allowed' });
    await item.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
