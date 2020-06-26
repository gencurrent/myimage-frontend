#!/bin/sh

cp -r /app/build/static/* /shared/nginx/static

# cp /app/build/index.html /shared/nginx/html/index.html
cp /app/build/* /shared/nginx/html/