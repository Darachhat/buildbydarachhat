# BuiltByDarachhat គឺជាវេបសាយអ៊ីសម្រាប់ទិញលក់ផលិតផលថ្មីឬមួយទឹកលើអ៊ីនធឺណិត (C2C E-commerce Web Application)  
![image](https://github.com/user-attachments/assets/e2e852e8-114a-4358-9f01-68d93e0a768b)

🌐 **Live Demo:** [https://www.buildbydarachhat.social/](https://www.buildbydarachhat.social/)

អំពីបច្ចេកវិទ្យាដែលខ្ងុំប្រើប្រាស់និង មុខងារដែលមានគឺបានបង្ហាញនៅក្រោមអាចជួយដល់អ្នកអភិវឌ្ឍន៍ អ្នករួមចំណែក និងអ្នកប្រើប្រាស់យល់បានយ៉ាងរហ័សនូវបច្ចេកវិទ្យាអ្វីដែលបានប្រើ មុខងារអ្វីដែលមាននៅក្នុងគម្រោងនេះ ដែលនិងធ្វើឱ្យការថែទាំ ឬកិច្ចសហការនាពេលអនាគតដើម្បីអភិវឌ្ឍន៍កាន់តែងាយស្រួល

## Tech Stack

**Frontend:**
- React (TypeScript, Inertia.js)
- Tailwind CSS (with daisyUI for UI components)
- DaisyUI
- [Vite](https://vitejs.dev/) (for rapid development & HMR)

**Backend:**
- Laravel (PHP)
- MySQL (or other DB as configured)
- Filament Admin Panel
- Spatie Laravel Permission (RBAC)
- Laravel Stripe Connect (payment integration)

**Other:**
- Blade (for some server-rendered views)
- Inertia.js (bridges Laravel & React)
- Redis, Memcached, SQS (Queue & Cache drivers)

---

## Features
> ⚡️ **Notice:** Features កំពុងត្រូវបានអភិវឌ្ឍ និងកែលម្អជាបន្តបន្ទាប់ដូចជា Payment method និងសមត្ថភាពរបស់ អ្នកប្រើប្រាស់ អ្នកលក់ និងអ្នកគ្រប់គ្រង នឹងត្រូវបន្ថែមនាពេលអនាគត

**User:**
- Register and Login (Authentication)
  ![image](https://github.com/user-attachments/assets/5ded979b-6dcb-43ad-b835-72ce792816e9)
  ![image](https://github.com/user-attachments/assets/8e1cda32-4759-48d4-9a65-692c468bedce)

- Search, and filter products by department/category
  ![image](https://github.com/user-attachments/assets/27abca6d-3fdc-4292-8f07-b7fa25a6237e)

- View and add products to cart
  ![image](https://github.com/user-attachments/assets/2962728d-54d7-4e7b-8761-64d82fbb64b6)

- Update/remove cart items
  ![image](https://github.com/user-attachments/assets/f3a053a4-abff-4e24-9eb9-3f5e3c3ff965)
  
- Responsive UI
  ![image](https://github.com/user-attachments/assets/8207d8d3-dedd-4ba3-80d6-d1fc57793461)
  ![image](https://github.com/user-attachments/assets/13d4d21d-5441-4da7-94db-46638c63e2cc)


**Vendor:**
- Product management (CRUD, variation options)
- View sales analytics and manage inventory
- Manage product status and approvals

**Admin:**
- Manage users (vendors, customers)
- Manage products, departments, categories
- Approve or reject vendor products
- Analytics dashboard (orders, users, sales)

**General:**
- Modern, mobile-first design
- Role-Based Access Control (RBAC)
- Fast and secure (CSRF protection, modern Laravel security practices)
- RESTful API architecture
- Server-side and client-side validation


## Getting Started

### Prerequisites
- PHP 8.2+
- Node.js 18+
- Composer
- MySQL (or compatible DB)
- Redis/Memcached (optional for cache/queue)

### Installation

1. Clone the repo:
    ```bash
    git clone https://github.com/Darachhat/buildbydarachhat.git
    cd buildbydarachhat
    ```

2. Install PHP dependencies:
    ```bash
    composer install
    ```

3. Install JS dependencies:
    ```bash
    npm install
    ```

4. Copy `.env.example` to `.env` and configure your environment variables.

5. Generate application key:
    ```bash
    php artisan key:generate
    ```

6. Run migrations and seeders:
    ```bash
    php artisan migrate --seed
    ```

7. Start development servers:
    ```bash
    php artisan serve
    npm run dev
    ```

---

## License

Licensed under the MIT License.

---

> Inspired by [RuppCare](https://github.com/Darachhat/RuppCare)
