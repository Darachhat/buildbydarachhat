# 📚 LEARN.md — buildbydarachhat

Welcome to **buildbydarachhat**! This guide is designed to help you understand the project, its tech stack, and how to get started contributing or learning from it.

---

## 🧰 Tech Stack

This project is built with:

| Technology | Role |
|---|---|
| **Laravel (PHP)** | Backend framework — API, authentication, business logic |
| **React (TypeScript)** | Frontend framework — UI components, state management |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **MySQL / PostgreSQL** | Database |
| **Vite** | Frontend build tool |

---

## 📖 Learning Resources

### Laravel (PHP)
- [Laravel Official Documentation](https://laravel.com/docs)
- [Laracasts — Free & Premium Laravel Tutorials](https://laracasts.com)
- [Laravel From Scratch (YouTube)](https://www.youtube.com/watch?v=MFh0Fd7BsjE)

### React & TypeScript
- [React Official Documentation](https://react.dev)
- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [React + TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind CSS
- [Tailwind CSS Official Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Crash Course (YouTube)](https://www.youtube.com/watch?v=UBOj6rqRUME)

### General Full-Stack
- [MDN Web Docs](https://developer.mozilla.org/)
- [The Odin Project](https://www.theodinproject.com/)

---

## 🗂️ Project Structure

```
buildbydarachhat/
├── app/                  # Laravel application logic
│   ├── Http/             # Controllers, Middleware, Requests
│   ├── Models/           # Eloquent models
│   └── Services/         # Business logic services
├── resources/
│   ├── js/               # React (TypeScript) frontend
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-level components
│   │   └── hooks/        # Custom React hooks
│   └── css/              # Tailwind CSS styles
├── routes/               # Laravel route definitions
│   ├── web.php           # Web routes
│   └── api.php           # API routes
├── database/
│   ├── migrations/       # Database migrations
│   └── seeders/          # Database seeders
├── public/               # Publicly accessible files
├── tests/                # Automated tests
├── .env.example          # Environment variable template
└── README.md             # Project overview
```

---

## 🚀 Getting Started

### Prerequisites
- PHP >= 8.1
- Composer
- Node.js >= 18.x & npm
- MySQL or PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Darachhat/buildbydarachhat.git
   cd buildbydarachhat
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure your database** in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=buildbydarachhat
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

6. **Run database migrations and seeders**
   ```bash
   php artisan migrate --seed
   ```

7. **Start the development servers**
   ```bash
   # Terminal 1 - Laravel backend
   php artisan serve

   # Terminal 2 - React frontend (Vite)
   npm run dev
   ```

8. **Visit the app** at [http://localhost:8000](http://localhost:8000)

---

## 💡 Key Concepts

### C2C E-Commerce
This is a **Consumer-to-Consumer (C2C)** platform where users can buy and sell products directly with each other — similar to platforms like eBay or Carousell.

### Roles & Permissions
The application has three main roles:
- **User** — Can browse, buy, and list products
- **Vendor** — Can manage their own store and products
- **Admin** — Full access to manage users, vendors, and platform settings

### Authentication
- Laravel Sanctum / Passport for API authentication
- Role-based access control (RBAC)

### Payment Integration
- Payment gateway integration for secure transactions between buyers and sellers

### API Architecture
- RESTful API built with Laravel
- React frontend consumes the API via Axios or Fetch

---

## 🧪 Running Tests

```bash
# Run all PHP tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

> Built with ❤️ by [Darachhat](https://github.com/Darachhat) — [buildbydarachhat.social](https://www.buildbydarachhat.social/)