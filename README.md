# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a Bangla market price tracker. It shows today's prices for rice, lentils, oil, vegetables, fish, meat, eggs/milk and spices, which items went up or down since yesterday, and a market-by-market price table from bazars across six divisions of Bangladesh.

🔗 **Live site:** https://bazar-dor-talha.vercel.app
📦 **Repository:** https://github.com/talhabinsaleh/bazar-dor

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| **Next.js 16 (App Router)** | Pages, routing, server components and route handlers |
| **TypeScript** | Type-safe components and API data |
| **Tailwind CSS v4 + DaisyUI 5** | Styling, custom `bazardor` theme and responsive layout |
| **BetterAuth** | Email/password, Google and GitHub authentication |
| **MongoDB Atlas** | Stores users, sessions and accounts (BetterAuth MongoDB adapter) |
| **react-hot-toast** | Toast notifications |
| **lucide-react** | Icons |
| **Vercel** | Deployment |

Data comes from the Programming Hero Bazardor API (`/products`, `/products?category=`, `/categories`), with two mirror URLs used automatically if the main one fails.

---

## ✨ Key Features

1. **Live price ticker:** an endless scrolling strip under the navbar shows every product's price per unit and its ▲/▼ change.
2. **Top risers and fallers:** the home page picks the 6 products whose prices rose most and the 6 that fell most today, plus a grid of all products.
3. **Category pages with numeric sorting:** filter by category and sort by price (low → high / high → low). Prices are compared as numbers, so Bengali numerals like `১,৮৫০` sort correctly.
4. **Protected product details:** after login you see the min, max and average price, comparisons with yesterday, last week and last month, and a market-by-market price table.
5. **Full authentication with BetterAuth:** sign up, sign in, Google and GitHub login, sign out, and a profile page with an *Update Information* route to change your name. Every action shows a toast.
6. **Loading and error states:** skeleton loaders on the home and category pages, plus a friendly 404 page with a “হোম পেজে ফিরে যান” button for unknown routes, categories and products.
7. **Fully responsive:** mobile, tablet and desktop, with Bengali digits and a Bangla date everywhere.

---

## 📁 Project Structure

```
app/
  page.tsx                 Home (hero, risers, fallers, all products)
  category/[slug]/         Category page + sort + skeleton
  product/[slug]/          Protected product details
  signin/ signup/          Auth pages
  profile/ profile/update  Profile + update information
  api/auth/[...all]/       BetterAuth route handler
components/                Navbar, PriceTicker, ProductCard, Footer, ...
lib/                       API fetcher, BetterAuth server/client, formatters
proxy.ts                   Redirects guests away from protected routes
```

---

## 🚀 Run Locally

```bash
git clone https://github.com/talhabinsaleh/bazar-dor.git
cd bazar-dor
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Environment variables:

```
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

---

Made by **Talha Bin Saleh** for Programming Hero, Batch 14, Assignment 7.
