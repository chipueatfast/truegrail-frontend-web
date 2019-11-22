#!/bin/bash

cd /usr/src/truegrail-frontend-web
echo '------------------------' $(date) '-----------------------' >> ./deployment_log
eval "$(ssh-agent -s)" >> ./deployment_log 2>&1 # start ssh-agent cache
ssh-add ~/.ssh/truegrail_frontend_deploy_key >> ./deployment_log 2>&1
git pull --ff >> ./deployment_log 2>&1
sudo kill $(lsof -t -i:3000) >> ./deployment_log 2>&1
exit