cd ./deployment && npm i && cd ..
eval $(node ./deployment/should-deploy.js)
echo should deploy: volunteer: $DEPLOY_VOLUNTEER, dashboard: $DEPLOY_DASHBOARD, server: $DEPLOY_SERVER
if [ $DEPLOY_VOLUNTEER = true ]
then
echo "building volunteer app"
cd ./volunteer && npm i && npm run build
cd ..
fi
if [ $DEPLOY_DASHBOARD = true ]
then
echo "building dashboard app"
cd ./specialist-dashboard && npm i && npm run build
cd ..
fi