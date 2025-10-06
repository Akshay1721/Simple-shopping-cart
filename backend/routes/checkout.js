import express from 'express';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { items, customerInfo } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required and cannot be empty'
      });
    }

    for (const item of items) {
      if (!item.id || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have a valid id and quantity greater than 0'
        });
      }
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;


console.log('\n=== NEW ORDER RECEIVED ===');
console.log(`Order ID: ${orderId}`);
console.log(`Date: ${new Date().toISOString()}`);
console.log(`Total Amount: ₹${total.toFixed(2)}`); 
console.log('Items:');
items.forEach(item => {
  console.log(`  - ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`); 
});

if (customerInfo) {
  console.log('Customer Info:');
  console.log(`  Name: ${customerInfo.name || 'N/A'}`);
  console.log(`  Email: ${customerInfo.email || 'N/A'}`);
  console.log(`  Phone: ${customerInfo.phone || 'N/A'}`);
}
console.log('========================\n');

    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(201).json({
      success: true,
      message: 'Order processed successfully',
      orderId,
      total: parseFloat(total.toFixed(2)),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    });
  } catch (error) {
    next(error);
  }
});

export { router as checkoutRouter };
