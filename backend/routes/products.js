import express from 'express';
import { productData } from '../data/products.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const { category, minPrice, maxPrice, search } = req.query;
    let filteredProducts = [...productData];
    
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= parseFloat(minPrice)
      );
    }
    
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= parseFloat(maxPrice)
      );
    }
    
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product => 
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json({
      success: true,
      count: filteredProducts.length,
      products: filteredProducts
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const product = productData.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
});

export { router as productsRouter };
