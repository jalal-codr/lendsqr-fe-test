# Lendsqr Frontend Engineering Test

A production-ready admin dashboard for managing users, built with React, TypeScript, and SCSS. Features advanced filtering, pagination, offline data persistence, and comprehensive testing.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://jalal-lendsqr-fe-test.vercel.app)
[![Tests](https://img.shields.io/badge/tests-32%20passing-success)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)]()

## 🔗 Links

- **Live Demo:** https://jalal-lendsqr-fe-test.vercel.app
- **Repository:** https://github.com/[your-username]/lendsqr-fe-test
- **Loom Video:** [Your video URL]

## ✨ Features

- 🔐 **Authentication** - Protected routes with session management
- 📊 **Dashboard** - Analytics and key metrics overview
- 👥 **User Management** - List, filter, and view 500+ user records
- 💾 **Offline Support** - IndexedDB for persistent data storage
- 📱 **Responsive Design** - Mobile-first, pixel-perfect implementation
- ⚡ **Performance** - Client-side caching and optimized queries
- ✅ **Testing** - 32 passing tests with 85%+ coverage

## 🛠 Tech Stack

**Core:** React 18 • TypeScript 5 • SCSS Modules • Vite

**Data:** Dexie.js (IndexedDB) • React Router v7

**Testing:** Vitest • React Testing Library • fake-indexeddb

**Code Quality:** ESLint • TypeScript Strict Mode

## 🚀 Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📁 Project Structure
```
src/
├── app/              # Application core & routing
├── components/       # Reusable UI components
├── features/         # Feature modules (auth, users, dashboard)
├── hooks/            # Custom React hooks
├── styles/           # SCSS modules & global styles
├── utils/            # Utility functions & db config
└── assets/           # Images, icons, fonts
```

## 🎨 Key Design Decisions

### 1. IndexedDB over LocalStorage
**Why:** Better performance and capacity for 500+ records
- Stores complex objects natively
- Supports efficient querying and indexing
- Non-blocking async operations
- Unlimited storage vs 5-10MB limit

### 2. Local Mock Data
**Why:** Reliability and offline-first approach
- No external API dependencies
- Instant data loading
- Full offline functionality
- Consistent data for testing

### 3. SCSS Modules
**Why:** Scoped styles with preprocessing power
- Automatic class name scoping
- Variables, mixins, and nesting
- Zero runtime overhead
- TypeScript integration

### 4. Feature-Based Architecture
**Why:** Scalability and maintainability
```
features/users/
├── Users.tsx          # UI component
├── users.service.ts   # Business logic
├── users.types.ts     # TypeScript types
├── users.mock.ts      # Mock data
└── users.test.tsx     # Tests
```

### 5. Client-Side Filtering & Pagination
**Why:** Instant UX without network latency
- Real-time search and filtering
- Works completely offline
- Efficient Dexie.js compound queries
- Configurable page sizes (10, 20, 50, 100)

## ⚡ Performance Optimizations

- **Data Caching:** In-memory flag prevents redundant loads
- **Indexed Queries:** Fast filtering on multiple fields
- **Code Splitting:** Route-based lazy loading
- **Pagination:** Only render visible data
- **Sorted Retrieval:** Database-level sorting

## 🧪 Testing
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

**Coverage:**
- 7 test suites with 32 passing tests
- Authentication flows
- User listing and filtering
- Pagination logic
- Protected routes
- Error handling



## 🔧 Challenges & Solutions

### Challenge: 500 Records Performance
**Solution:** Implemented pagination + IndexedDB indexing + date-based sorting

### Challenge: Complex Multi-Field Filtering
**Solution:** Dexie.js compound filters with efficient query logic
```typescript
collection.filter((user) => {
  return matchOrg && matchUsername && matchEmail && 
         matchPhone && matchStatus && matchDate;
});
```

### Challenge: Mobile Table Layout
**Solution:** Responsive strategy
- Mobile: Card-based layout
- Tablet: Horizontal scroll
- Desktop: Full table

### Challenge: Date Sort Consistency
**Solution:** Switched from ID to dateJoined sorting (newest first)

## 🔒 Security & Best Practices

- Protected routes with authentication checks
- XSS prevention via React's auto-escaping
- Input validation and sanitization
- Error boundaries for graceful failures
- TypeScript strict mode for type safety

## 🌐 Browser Support

Chrome • Firefox • Safari • Edge (latest 2 versions)

## 📝 Code Standards

**Naming Conventions:**
- Components: `PascalCase` (UserTable.tsx)
- Functions: `camelCase` (getUserById)
- CSS Classes: `kebab-case` (.user-table)
- Types: `PascalCase` (UserDetails)

**Git Commits:** Conventional commits format
```
feat: add user filtering functionality
fix: resolve pagination bug on mobile
test: add user details page tests
chore: finalize mobile responsive sidebar and topbar
```

## 📦 Deployment

### Vercel (Current)
```bash
vercel --prod
```

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Node Version: 18.x

### Alternative Platforms
```bash
# Netlify
netlify deploy --prod --dir=dist

# GitHub Pages
npm run build && gh-pages -d dist
```


## 🔄 Future Enhancements

- **Backend Integration:** Real API with server-side pagination
- **Advanced Features:** CSV export, bulk actions, real-time updates
- **Performance:** Virtual scrolling, service workers
- **Testing:** E2E tests with Playwright

## 👨‍💻 Developer

**[Your Name]**
- GitHub: [@jalal-codr](https://github.com/your-username)
- Email: abduljalal849@gmail.com

## 📄 License

Created for Lendsqr Frontend Engineering Assessment

---

**Assessment Completed:** January 2026 | **Tests:** 32 passing | **Coverage:** 85%+