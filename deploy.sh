#!/usr/bin/env bash
set -e

rm -rf /usr/local/nginx/html/*

cd /root/lxrwxp/app/fe/graduation_project/dist

cp -ri * /usr/local/nginx/html

nginx -s reload
