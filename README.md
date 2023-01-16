## Habit Tracker

Whatch the full video series here: https://www.youtube.com/watch?v=fWFtNPiApw4&list=PLgsruFcRiyk0WJ9ylm-paRTW-k6cNDkLE

# Requirements
- Docker installed and running
- PHP ^8.0

# Installation
Install composer dev dependencies
```
composer install --dev
```

Create a new .env file
```
cp .env.example .env
```

Generate application key
```
php artisan key:generate
```

Start Laravel Sail
```
sail up -d
```
Run migrations
```
sail artisan migrate
```

Install and compile local resources
```
sail npm install && sail npm run dev
```

**NOTE:** Uncomment the server section inside vite.config.js if you are using WSL2

````Javascript
server: {
    hmr: {
        host: 'localhost'
    }
},
````

Visit http://localhost/habits 