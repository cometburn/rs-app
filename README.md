php artisan passport:install

Would you like to run all pending database migrations? (yes/no) [yes]

Would you like to create the "personal access" and "password grant" clients? (yes/no) [yes]:

php artisan cache:clear && php artisan view:clear && php artisan route:clear && composer dump-autoload && php artisan optimize && php artisan serve --port=8001



cd frontend

npm i

quasar dev
