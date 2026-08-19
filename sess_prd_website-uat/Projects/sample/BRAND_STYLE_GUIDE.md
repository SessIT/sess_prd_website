# Product Detail Page - Brand Style Guide

## 🎨 Standard Color Palette

Your official brand colors that must be used across all product detail pages:

### Primary Colors

```
┌─────────────────────────────────────────────┐
│ CYAN (Accent Color - Primary)               │
│ Light: #22e5f5                              │
│ Dark:  #5ef0ff                              │
│ Tailwind: cyan-500, cyan-400, cyan-600      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ BLUE (Primary Color)                        │
│ Light: #3b5bff                              │
│ Dark:  #6b8aff                              │
│ Tailwind: blue-500, blue-400, blue-600      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ PINK (Accent Highlights)                    │
│ Light: #e8006a                              │
│ Dark:  #ff4d8f                              │
│ Tailwind: pink-500, pink-400, pink-600      │
└─────────────────────────────────────────────┘
```

### Neutral Colors

```
┌─────────────────────────────────────────────┐
│ BACKGROUND (Dark Mode - Default)            │
│ Color: #0a0f1e                              │
│ Tailwind: gray-900, slate-900               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ TEXT - Primary (Dark Mode)                  │
│ Color: #ffffff (White)                      │
│ For Dark background: text-white             │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ TEXT - Secondary (Dimmed)                   │
│ Color: #94a3b8                              │
│ Tailwind: gray-400, text-gray-400           │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ TEXT - Light Mode                           │
│ Color: #0a0f1e (Dark text on light bg)      │
│ Tailwind: text-gray-900                     │
└─────────────────────────────────────────────┘
```

---

## 📝 Typography Standards

### Font Family (Global)
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
             Oxygen, Ubuntu, Cantarell, sans-serif;
```

### Text Sizes

#### Headings
```
Page Title (H1):     text-5xl md:text-6xl lg:text-7xl   (48px-84px)
Section Title (H2):  text-4xl md:text-5xl               (36px-48px)
Subsection (H3):     text-2xl md:text-3xl               (24px-30px)
Card Title (H4):     text-lg md:text-xl                 (18px-20px)
Label:               text-base                          (16px)

Body Text:           text-base                          (16px)
Small Text:          text-sm                            (14px)
Tiny Text:           text-xs                            (12px)
```

#### Font Weights
```
Body:       font-normal   (400)
Emphasis:   font-semibold (600)
Headings:   font-bold     (700)
Strong:     font-bold     (700)
```

---

## 🎯 Component Styling Guidelines

### Hero Section
```jsx
Background:    Linear gradient cyan → blue
Text Color:    White (#ffffff)
Heading Size:  text-4xl sm:text-5xl md:text-6xl
CTA Button:    bg-white/20 backdrop-blur-md border-white/30
               hover:bg-white/30
Accent Color:  Cyan (#22e5f5)
```

### Section Titles
```jsx
Text Color:    gray-900 (on light bg) or text-white (on dark bg)
Size:          text-4xl md:text-5xl
Bottom Line:   from-cyan-500 to-blue-500 (gradient)
               width: 80px (w-20)
               height: 4px (h-1)
```

### Cards/Containers
```jsx
Background:    white (light mode) or gray-50
Border:        border-gray-200
Hover Border:  border-cyan-300 (not red!)
Hover Shadow:  shadow-lg from cyan gradient
Accent:        Cyan on top/corners
```

### Buttons

#### Primary Button
```jsx
Background:    bg-cyan-500
Hover:         hover:bg-cyan-600
Text Color:    text-white
Padding:       px-8 py-3
Border Radius: rounded-full
```

#### Secondary Button (Outlined)
```jsx
Border:        border-2 border-cyan-600
Text Color:    text-cyan-600
Background:    transparent
Hover:         hover:bg-cyan-600 hover:text-white
```

#### Ghost Button (On Gradient)
```jsx
Background:    bg-white/20 backdrop-blur-md
Border:        border border-white/30
Text Color:    text-white
Hover:         hover:bg-white/30
```

---

## 🎨 Gradient Usage

### Primary Gradient
```css
from-cyan-500 to-blue-500
/* RGB: #22e5f5 → #3b5bff */
```

### Hero Gradient
```css
linear-gradient(135deg, 
  rgb(34, 229, 245, 0.95) 0%, 
  rgb(59, 91, 255, 0.95) 100%)
```

### Accent Gradient
```css
from-cyan-600 to-blue-600
/* For darker sections */
```

---

## ❌ Colors to AVOID

| Color | Don't Use | Reason |
|-------|-----------|--------|
| Red | bg-red-600, text-red-500 | ❌ Old design - use cyan instead |
| Orange | bg-orange-500 | ❌ Not in brand palette |
| Purple | bg-purple-600 | ❌ Not in brand palette |
| Green | bg-green-500 | ❌ Inconsistent with brand |
| Yellow | bg-yellow-400 | ❌ Not approved color |

---

## ✅ Component Color Examples

### Product Details Carousel
```jsx
Image Label:       bg-cyan-500/90 backdrop-blur-sm
Image Border:      ring-cyan-500 (active state)
Title Underline:   from-cyan-500 to-blue-500
```

### Benefits Cards
```jsx
Hover Background:  from-cyan-50 to-transparent
Icon Circle:       bg-cyan-500 to-blue-500 (gradient)
Bottom Accent:     from-cyan-500 to-blue-500
```

### Technical Specs
```jsx
Active Category:   from-cyan-50 to-cyan-100 (hover)
Chevron Icon:      text-cyan-500
Value Text:        text-cyan-500 (highlight)
```

### Controller Features
```jsx
Feature Icon Box:  from-cyan-500 to-blue-500
Hover Text:        group-hover:text-cyan-600
Main CTA:          from-cyan-600 to-blue-600
```

### Related Products
```jsx
Overlay on Hover:  bg-cyan-600/80
Badge:             bg-cyan-50 text-cyan-600
CTA Button:        from-cyan-600 to-blue-600
Border Button:     border-cyan-600 text-cyan-600
```

---

## 📏 Spacing Standards

### Vertical Spacing (Sections)
```
Small:    py-8   (32px)
Medium:   py-16  (64px)
Large:    py-20  (80px)
XLarge:   py-24  (96px)
```

### Horizontal Spacing (Content)
```
Padding:  px-4 sm:px-6 lg:px-8
Max Width: max-w-7xl (80rem / 1280px)
```

### Component Spacing
```
Gap:      gap-4 (cards row)
          gap-6 (section items)
          gap-8 (major elements)
```

---

## 🔄 Dark Mode Considerations

The site defaults to **Dark Mode**. When using dark backgrounds:

```jsx
Text Color:        text-white
Dimmed Text:       text-gray-400
Subtle Borders:    border-white/20
Subtle Background: bg-white/5
```

---

## 📋 Checklist for New Components

When creating new product detail components, ensure:

- [ ] Hero uses cyan→blue gradient (not red)
- [ ] Section titles have cyan-blue underline
- [ ] All buttons use cyan-500/600 (not red)
- [ ] Cards have proper cyan hover states
- [ ] Text sizes match guidelines (no arbitrary sizes)
- [ ] Font weights are: body(400), emphasis(600), heading(700)
- [ ] Spacing uses standard values (py-16, gap-8, etc)
- [ ] No red color (#c7372a, #dc2626, etc) in any element
- [ ] All gradients follow cyan→blue pattern
- [ ] Accessibility: sufficient contrast ratios

---

## 🎬 Animation Colors

Keep animations consistent:

```jsx
Particles:         cyan (#22e5f5), blue (#3b5bff)
Glows:             cyan-500/80 (not red!)
Transitions:       Use standard Tailwind transitions
Hover Effects:     Scale + shadow (with cyan glow)
```

---

## 💾 Implementation Reference

### What to Change from Old Code

```jsx
// ❌ OLD (WRONG)
bg-red-600, bg-red-700, text-red-600

// ✅ NEW (CORRECT)
bg-cyan-500, bg-cyan-600, text-cyan-500

// ❌ OLD
from-red-600 to-red-400

// ✅ NEW
from-cyan-500 to-blue-500
```

---

## 📞 Questions?

- **Color not in palette?** Use cyan-500 (primary accent)
- **Unsure about text size?** Default to text-base or text-lg
- **What about hover states?** Increase opacity or shift to cyan-600
- **Brand emergency?** Use cyan → blue gradient

---

**Version:** 1.0  
**Last Updated:** May 2026  
**Status:** ✅ Standard Applied to All Components  
**Approved By:** Design System
