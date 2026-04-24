# 🍽️ Meal Finder

Meal Finder is a modern web application built with **Nuxt 3** that helps users discover recipes based on available ingredients or categories.
This project focuses on clean UI, responsive design, and efficient data fetching from a public API.

---

## Features

* Search recipes by ingredient
* Browse recipes by category
* View detailed recipe instructions
* Ingredient-based filtering
* Responsive and clean UI

---

## Tech Stack

* **Framework**: Nuxt 3 (Vue 3)
* **Styling**: Tailwind CSS
* **Language**: TypeScript
* **API**: TheMealDB (public API)

---

## Setup

Make sure to install dependencies:

```bash
npm install
```

---

## Development Server

Start the development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## Run on Mobile (Optional)

Run with host enabled:

```bash
npm run dev -- --host
```

Then open:

```
http://YOUR_LOCAL_IP:3000
```

---

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 📁 Project Structure

```
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css        # Global styles (Tailwind)
│   ├── components/
│   │   ├── common/             # Shared components (Header, etc.)
│   │   ├── ingredients/        # Ingredient-related components
│   │   └── recipe/             # Recipe-related components
│   ├── composables/            # API & reusable logic (useMeal)
│   ├── pages/
│   │   ├── detail/             # Detail pages (dynamic routes)
│   │   ├── ingredients/        # Ingredient pages
│   │   ├── index.vue           # Homepage
│   │   └── recipes.vue         # Recipes page
│   └── app.vue                # Root app component
│
├── public/                    # Static files
├── node_modules/              # Dependencies
├── nuxt.config.ts             # Nuxt configuration
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript config
└── README.md                  # Project documentation
```

---

## Key Concepts

* Composable-based API handling (`useMeal`)
* Dynamic routing with Nuxt pages
* Client-side search filtering
* Reusable UI components
* Clean and scalable structure

---

## License

This project is for learning and portfolio purposes.

---