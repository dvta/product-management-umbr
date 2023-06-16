## Product management system

### Description
This is a simple task management system. It allows you to create, edit, delete and view tasks. The system ha

### Installation
Back-end:
1. Clone the repository
2. Install the dependencies via command `composer install`
3. Copy the file `.env.example` to `.env` via command `cp .env.example .env`
4. Configure the database connection in the `.env` file
5. run the command `php artisan key:generate`
6. run the command `php artisan migrate`
7. run the command `php artisan db:seed` (100000 products will be created in few minutes)
8. run the command `php artisan storage:link`
9. run the command `php artisan serve`

Front-end:
(use nvm version v18.0.0)
1. run the command `npm install`
2. run the command `npm run dev` (if you have any problems with this command, try to run `nvm use v18.0.0`)

### Usage

- Admin url: `http://localhost:8000/admin/products`
- Application url: `http://localhost:8000/products`


