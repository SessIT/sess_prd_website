# Quick Start Guide - Product Detail Page

## 🚀 Get Started in 2 Minutes

### 1. Import & Use Component

```jsx
// In your App.jsx or routing file
import ProductDetail from './pages/ProductDetail';

// Option A: Direct render
<ProductDetail />

// Option B: With React Router
<Route path="/products/:id" element={<ProductDetail />} />
```

### 2. View the Page

Visit: `http://localhost:5173/products`

The page will display with:
- ✅ Hero section with animations
- ✅ Product carousel with 5 images
- ✅ 6 benefits cards
- ✅ Technical specifications accordion
- ✅ Controller features
- ✅ 4 related products
- ✅ Final CTA section

---

## 📝 Update Product Information

All product data is in: **`src/data/productData.js`**

### Change Product Title
```javascript
// Find this line:
title: 'Climatic Test Chamber',

// Change to:
title: 'Your New Title',
```

### Update Product Images
```javascript
// In productDetails.images array:
{
  id: 1,
  src: 'https://your-image-url.jpg', // Change this
  alt: 'Description',
  title: 'Label',
}
```

### Modify Benefits
```javascript
// In benefits.benefitsList:
{
  id: 1,
  icon: '⚡',  // Change emoji
  title: 'Energy Efficiency', // Change title
  description: 'Your description', // Change description
}
```

### Update Specifications
```javascript
// In specifications.specs:
{
  category: 'Temperature Control',
  items: [
    { label: 'Range', value: '-70°C to +180°C' }, // Edit values
  ]
}
```

---

## 🎨 Customize Appearance

### Change Color Theme
Replace `red-600` with any Tailwind color throughout components:

```jsx
// Before:
className="bg-red-600 text-white"

// After:
className="bg-blue-600 text-white"
className="bg-green-600 text-white"
className="bg-purple-600 text-white"
```

**Files to update:**
- `src/framework/ProductHero.jsx`
- `src/framework/ProductDetailsCarousel.jsx`
- `src/framework/BenefitsSection.jsx`
- All framework components

### Adjust Spacing

Use Tailwind spacing classes (py-16, px-4, gap-8, etc):
```jsx
// Increase section padding:
py-16 → py-20 → py-24

// Adjust gaps:
gap-4 → gap-6 → gap-8
```

---

## 🔗 Connect to Your Routes

### React Router Setup

```javascript
// App.jsx or routes file
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products/climatic-test-chamber" element={<ProductDetail />} />
        {/* Add more product routes here */}
      </Routes>
    </BrowserRouter>
  );
}
```

### Navigation Link

```jsx
// From any component:
import { Link } from 'react-router-dom';

<Link to="/products/climatic-test-chamber">
  View Product Details
</Link>
```

---

## 📊 View Component Structure

```
ProductDetail.jsx (Main Page)
├── ProductHero
├── ProductDetailsCarousel
├── BenefitsSection
├── TechnicalSpecifications
├── ControllerFeatures
├── RelatedProducts
└── Final CTA Section
```

Each component receives the product data prop and renders independently.

---

## 🔄 Adding a New Product

### Step 1: Create Product Data
Edit `src/data/productData.js`:

```javascript
// Add new product object
export const newProductData = {
  id: 'new-product-id',
  title: 'New Product Title',
  hero: { /* config */ },
  productDetails: { /* images, features */ },
  // ... all other sections
};
```

### Step 2: Export Product
```javascript
// Add to exports:
export const getProductData = (productId) => {
  if (productId === 'new-product-id') {
    return newProductData;
  }
  return climaticTestChamberProduct;
};
```

### Step 3: Update ProductDetail Component
```javascript
// In ProductDetail.jsx:
const { productId } = useParams(); // Get from URL
const product = productId === 'new-product-id' 
  ? newProductData 
  : climaticTestChamberProduct;
```

### Step 4: Add Route
```javascript
<Route path="/products/new-product" element={<ProductDetail />} />
```

---

## 🎯 Common Customizations

### Hide a Section
Remove the component from ProductDetail.jsx:
```jsx
// Comment out to hide:
{/* <BenefitsSection product={product} /> */}
```

### Change Section Order
Rearrange components in ProductDetail.jsx:
```jsx
{/* Reorder like this: */}
<ProductHero product={product} />
<BenefitsSection product={product} /> {/* Moved up */}
<ProductDetailsCarousel product={product} />
{/* etc */}
```

### Modify Hero Background Color
Edit ProductHero.jsx:
```javascript
// Find backgroundGradient in hero object:
background: product.hero.backgroundGradient,

// Or hardcode:
background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(29, 78, 216) 100%)',
```

### Change Button Text & Links
Edit productData.js:
```javascript
hero: {
  ctaText: 'Request Quote', // Change this
}
```

---

## ✅ Testing Checklist

- [ ] All sections display correctly
- [ ] Images load properly
- [ ] Animations are smooth
- [ ] Responsive on mobile/tablet/desktop
- [ ] Hover effects work
- [ ] Buttons are clickable
- [ ] No console errors
- [ ] Page loads quickly

Run in browser console:
```javascript
// Check if all components loaded
console.log('ProductDetail loaded successfully');

// Check data
import { climaticTestChamberProduct } from './data/productData.js';
console.log(climaticTestChamberProduct);
```

---

## 🐛 Troubleshooting

### Components not rendering?
- Verify imports are correct in ProductDetail.jsx
- Check component file paths exist
- Ensure Framer Motion is installed: `npm install framer-motion`

### Images not showing?
- Check image URLs in productData.js
- Verify URLs are accessible
- Use valid image formats (jpg, png, webp)

### Styling broken?
- Verify Tailwind CSS is configured
- Clear cache: `npm run build`
- Restart dev server

### Animations not working?
- Verify Framer Motion is installed
- Check browser console for errors
- Disable animations in browser DevTools

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **IMPLEMENTATION_SUMMARY.md** | Complete overview |
| **PRODUCT_DETAIL_GUIDE.md** | Detailed architecture guide |
| **QUICK_START.md** | This file - quick reference |

---

## 🚀 Next Steps

1. **View the page** - Import and render ProductDetail component
2. **Update data** - Edit productData.js with your content
3. **Customize colors** - Change red-600 to your brand color
4. **Add to routes** - Connect via React Router
5. **Test responsiveness** - Check on mobile/tablet/desktop
6. **Deploy** - Push to production

---

## 💡 Pro Tips

- Use browser DevTools to inspect animations
- Test on real mobile devices, not just DevTools
- Keep productData.js structure for consistency
- Use the same prop pattern in custom components
- Components are fully reusable - use in other pages too

---

## ❓ Questions?

Refer to:
- **PRODUCT_DETAIL_GUIDE.md** for detailed explanation
- Component files for inline comments
- Framer Motion docs: https://www.framer.com/motion/
- Tailwind docs: https://tailwindcss.com/

---

**Status:** Ready to use immediately ✅  
**Last Updated:** May 2026  
**Version:** 1.0
