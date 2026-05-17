# SEMIIH — Fashion Store

A lightweight, modern fashion storefront built with vanilla front-end technologies and a minimal Express backend. Browse curated clothing categories, search products in real time, and click any item for an enlarged detail view.

![Stack](https://img.shields.io/badge/stack-Express%20%2B%20Vanilla%20JS%20%2B%20CSS3-1a1a1a?style=flat-square)  

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js |
| **Server** | Express 4 |
| **Frontend** | Vanilla JavaScript (no framework) |
| **Styling** | Plain CSS3 with custom properties |
| **Fonts** | Inter & Playfair Display (Google Fonts) |
| **Data** | JSON file (`data.json`) |

---

## Project Structure

```
fashion-store/
├── data.json              # Product catalog (12 curated items)
├── package.json
├── server.js              # Express server + API routes
├── public/
│   ├── index.html         # Main page & modal markup
│   ├── styles.css         # All styling (grid, card, modal, responsive)
│   └── app.js             # Fetch, render, filter, search, modal logic
└── README.md
```

---

## Features

- **Responsive product grid** — adapts from desktop 4-column to mobile 2-column
- **Category filtering** — 7 categories: Tops, Bottoms, Outerwear, Knitwear, Dresses, Footwear, Accessories
- **Real-time search** — filters products by name or category as you type
- **Product detail modal** — click any card for an enlarged image, price, and stock badge
- **Stock badges** — colour-coded indicators: in-stock (green), low-stock (orange), sold-out (red)
- **Sticky header** — navigation stays visible while scrolling
- **Keyboard-friendly** — press `Escape` to close the modal

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Install & Run

```bash
# Clone or navigate into the project
cd fashion-store

# Install dependencies
npm install

# Start the server
npm start
```

Open **http://localhost:3000** in your browser.

### Development mode

```bash
npm run dev
```

Uses `node --watch` to restart the server automatically when files change.

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/items` | Returns all products as JSON |
| `GET` | `/api/items/:id` | Returns a single product by ID |

### Product Schema

```json
{
  "id": 1,
  "name": "Linen Overshirt",
  "category": "Tops",
  "price": 89000,
  "quantity": 12,
  "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop"
}
```

---

## Customisation

### Adding Products

Edit `data.json` and add a new object following the schema above. The app will pick it up on the next request — no rebuild needed.

### Adding Categories

1. Add a new `<button>` inside `<nav class="nav">` in `index.html` with a `data-category` attribute matching the category name.
2. Make sure your product data in `data.json` uses the same category value.

### Changing the Port

```bash
PORT=8080 npm start
```

---

## Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge). CSS Grid and custom properties are used throughout — IE11 is not supported.

---

## License

MIT — use it, remix it, ship it.
