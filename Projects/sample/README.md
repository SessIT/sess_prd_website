# Sri Easwari Scientific Solutions — Design Token Usage Guide

## Project Setup

### 1. File placement
```
src/
├── styles/
│   └── globals.css       ← paste the globals.css file here
├── main.jsx              ← import globals.css here (once, globally)
└── ...
```

### 2. Import in main.jsx
```jsx
// src/main.jsx
import './styles/globals.css'
import App from './App'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

### 3. Tailwind v4 (vite) — tailwind.config.js
Place `tailwind.config.js` at project root. Tailwind reads
the CSS variables you defined in globals.css through the config.

---

## Dark Mode Toggle

Add / remove the `dark` class on `<html>`:

```jsx
// useDarkMode.js
import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(
    () => localStorage.getItem('theme') === 'dark'
  )

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return [dark, setDark]
}

// In any component:
const [dark, setDark] = useDarkMode()
<button onClick={() => setDark(d => !d)}>Toggle Theme</button>
```

---

## Using Tokens — 3 Ways

### Way 1 — Tailwind Utility Classes (recommended)
The tailwind.config.js maps every variable to a Tailwind class.

```jsx
// Colors
<div className="bg-bg-base text-text-body">          // surface + text
<h1  className="font-display text-text-heading">     // display font
<p   className="text-text-muted text-sm">            // muted small text

// Backgrounds
<section className="bg-gradient-hero">
<div     className="bg-surface-raised">

// Borders
<div className="border border-border-default rounded-xl">
<div className="border-2 border-border-brand rounded-lg">

// Shadows
<div className="shadow-brand-sm hover:shadow-brand-md transition-all">
<div className="shadow-lg">

// Buttons (Tailwind classes)
<button className="
  h-btn-md px-6
  bg-primary text-white
  rounded-md font-semibold
  shadow-brand-sm hover:shadow-brand-md
  hover:-translate-y-px
  transition-all duration-200
">
  Get Started
</button>

// Dark mode — prefix with dark:
<div className="bg-bg-base dark:bg-bg-base text-text-body dark:text-text-body">
```

### Way 2 — Plain CSS classes (from globals.css utilities)
```jsx
// Pre-built classes from globals.css
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary btn-lg">Secondary Large</button>
<button className="btn btn-outline btn-sm">Outline Small</button>
<button className="btn btn-ghost">Ghost</button>
<button className="btn btn-accent">Accent</button>
<button className="btn btn-danger">Delete</button>

<div className="card">Card content</div>

<input className="input" placeholder="Enter value" />
<input className="input error" />    // error state
<input className="input success" />  // success state

<span className="badge badge-brand">Scientific</span>
<span className="badge badge-success">Active</span>
<span className="badge badge-error">Error</span>
```

### Way 3 — Inline CSS variables (for custom components)
```jsx
// When you need fine-grained control
<div style={{
  background: 'var(--bg-subtle)',
  border: 'var(--border-width-thick) solid var(--border-brand)',
  borderRadius: 'var(--border-radius-xl)',
  padding: 'var(--space-6)',
  boxShadow: 'var(--shadow-brand-md)',
}}>
  Custom card
</div>

// Button with brand gradient
<button style={{
  background: 'var(--gradient-brand)',
  color: 'var(--color-neutral-0)',
  borderRadius: 'var(--btn-radius)',
  height: 'var(--btn-height-lg)',
  padding: '0 var(--btn-px-lg)',
  fontWeight: 'var(--font-weight-semibold)',
  boxShadow: 'var(--shadow-brand-md)',
}}>
  Contact Us
</button>
```

---

## Real Component Examples

### Navbar
```jsx
<nav className="
  sticky top-0 h-nav z-sticky
  bg-[var(--nav-bg)] backdrop-blur-sm
  border-b border-border-muted
  transition-all duration-slow
">
  <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
    <span className="font-display font-bold text-xl text-text-brand tracking-tight">
      Sri Easwari
    </span>
    <div className="flex gap-6">
      <a href="#" className="text-[var(--nav-text)] hover:text-[var(--nav-text-hover)] text-sm font-medium transition-colors">
        Products
      </a>
    </div>
    <button className="btn btn-primary btn-sm">Contact</button>
  </div>
</nav>
```

### Hero Section
```jsx
<section className="bg-gradient-hero min-h-screen flex items-center">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <span className="badge badge-brand mb-4">Scientific Excellence</span>
    <h1 className="font-display text-5xl font-extrabold text-text-heading tracking-tight mb-6">
      Precision Tools for<br/>Modern Science
    </h1>
    <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
      Delivering world-class laboratory solutions across India.
    </p>
    <div className="flex gap-4 justify-center">
      <button className="btn btn-primary btn-lg">Explore Products</button>
      <button className="btn btn-outline btn-lg">Learn More</button>
    </div>
  </div>
</section>
```

### Product Card
```jsx
<div className="card hover:border-border-brand cursor-pointer">
  <span className="badge badge-brand mb-3">Lab Equipment</span>
  <h3 className="font-display text-xl font-semibold text-text-heading mb-2">
    Digital Microscope Pro
  </h3>
  <p className="text-text-muted text-sm leading-relaxed mb-4">
    High-resolution imaging for research-grade analysis.
  </p>
  <div className="flex items-center justify-between">
    <span className="text-text-brand font-bold text-lg">₹24,999</span>
    <button className="btn btn-primary btn-sm">Add to Cart</button>
  </div>
</div>
```

### Form Input with Label
```jsx
<div className="flex flex-col gap-1.5">
  <label className="text-sm font-medium text-text-body">
    Company Name
  </label>
  <input
    className="input"
    placeholder="Sri Easwari Scientific..."
  />
  <p className="text-xs text-text-muted">
    Your registered company name.
  </p>
</div>
```

---

## Changing a Token — One Place, Whole Site Updates

```css
/* globals.css — just edit one line */

/* Before */
--color-primary-500: #00b3b3;

/* After — brand refresh to a different teal */
--color-primary-500: #0891b2;
```

Every button, badge, border, shadow, gradient that uses
`--color-primary-500` (or any derived token) auto-updates. ✅

---

## Quick Reference Cheat Sheet

| Token Group      | CSS Variable Prefix        | Tailwind Class Prefix      |
|-----------------|----------------------------|----------------------------|
| Brand Primary   | `--color-primary-*`        | `primary-*`                |
| Brand Secondary | `--color-secondary-*`      | `secondary-*`              |
| Accent          | `--color-accent-*`         | `accent-*`                 |
| Background      | `--bg-*`                   | `bg-bg-*`                  |
| Surface         | `--surface-*`              | `bg-surface-*`             |
| Text            | `--text-*`                 | `text-text-*`              |
| Border          | `--border-*`               | `border-border-*`          |
| Shadow          | `--shadow-*`               | `shadow-*`                 |
| Font Family     | `--font-display/body/mono` | `font-display/body/mono`   |
| Font Size       | `--text-*`                 | `text-*`                   |
| Border Radius   | `--border-radius-*`        | `rounded-*`                |
| Spacing         | `--space-*`                | standard Tailwind spacing  |
| Z-Index         | `--z-*`                    | `z-*`                      |
| Transition      | `--transition-*`           | `duration-fast/base/slow`  |
| Button Prebuilt | `.btn .btn-primary` etc.   | (CSS utility classes)      |