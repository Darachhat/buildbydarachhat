# BuiltByDarachhat គឺជាវេបសាយអ៊ីសម្រាប់ទិញលក់ផលិតផលថ្មីឬមួយទឹកលើអ៊ីនធឺណិត 
![image](https://github.com/user-attachments/assets/e2e852e8-114a-4358-9f01-68d93e0a768b)

🌐 **Live Demo:** [https://www.buildbydarachhat.social/](https://www.buildbydarachhat.social/)

> **Short Description**  
> Modern C2C e-commerce web application built with Laravel (PHP), React (TypeScript), and Tailwind CSS. Developed extensive user, vendor, and admin features, including role-based access control, real-time product management, secure authentication, and payment integration. Demonstrates strong skills in full-stack development, modern web architecture, and scalable system design.

អំពីបច្ចេកវិទ្យាដែលខ្ងុំប្រើប្រាស់និង មុខងារដែលមានគឺបានបង្ហាញនៅក្រោមអាចជួយដល់អ្នកអភិវឌ្ឍន៍ អ្នករួមចំណែក និងអ្នកប្រើប្រាស់យល់បានយ៉ាងរហ័សនូវបច្ចេកវិទ្យាអ្វីដែលបានប្រើ មុខងារអ្វីដែលមាននៅក្នុងគម្រោងនេះ ដែលនិងធ្វើឱ្យការថែទាំ ឬកិច្ចសហការនាពេលអនាគតដើម្បីអភិវឌ្ឍន៍កាន់តែងាយស្រួល

## Tech Stack

**Frontend:**
- React (TypeScript, Inertia.js)
- Tailwind CSS (with daisyUI for UI components)
- DaisyUI
- [Vite](https://vitejs.dev/) (for rapid development & HMR)

**Backend:**
- Laravel (PHP)
- MySQL 

**Other:**
- Blade (for some server-rendered views)
- Inertia.js (bridges Laravel & React)

---

## Features
> ⚡️ **Notice:** Features កំពុងត្រូវបានអភិវឌ្ឍ និងកែលម្អជាបន្តបន្ទាប់ដូចជា Payment method និងសមត្ថភាពវិភាគទនិ្នន័យសម្រាប់ អ្នកប្រើប្រាស់ អ្នកលក់ និងអ្នកគ្រប់គ្រង នឹងត្រូវបន្ថែមនាពេលអនាគត

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
  
  ![image](https://github.com/user-attachments/assets/13d4d21d-5441-4da7-94db-46638c63e2cc)
  ![image](https://github.com/user-attachments/assets/8207d8d3-dedd-4ba3-80d6-d1fc57793461)


**Vendor:**
- Product Management
  ![image](https://github.com/user-attachments/assets/030c2269-cf7b-40cb-b8fc-28a06c7a9d48)

- Create Product
  ![image](https://github.com/user-attachments/assets/6a7106fd-45ec-4d27-9f23-0bbbf616679e)

- Update Product
  ![image](https://github.com/user-attachments/assets/d13597e0-d403-494a-94b5-f6a054dd4b07)
  ![image](https://github.com/user-attachments/assets/bcb479a4-d488-4e88-8d31-4ec74a172a3e)
  ![image](https://github.com/user-attachments/assets/de0cb7af-876c-4c18-add7-3995c4da1724)
  ![image](https://github.com/user-attachments/assets/f2c026ec-983d-4ae1-be55-b50ae5869230)

**Admin:**
- Department Management
  ![image](https://github.com/user-attachments/assets/1edd9a22-4ec8-4c47-aa39-24c83da5c381)

- Create Department
  ![image](https://github.com/user-attachments/assets/c9192230-4cd2-4e3d-bd19-b44fb25c1c7f)

- Update Department
  ![image](https://github.com/user-attachments/assets/d19c8529-bc57-4670-829e-80b5cdcdab9e)

- Category Management
  ![image](https://github.com/user-attachments/assets/cf0b2941-2f8e-4167-9cf5-44079315d9f6)

- Create Category
  ![image](https://github.com/user-attachments/assets/3b82ee47-7719-481a-850b-82fd931a2a57)

- Update Category
  ![image](https://github.com/user-attachments/assets/77336d24-63fb-49dc-a53e-d31699e0cf38)


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


> Inspired by [TOS](https://github.com/Darachhat/online-clothing-store)
