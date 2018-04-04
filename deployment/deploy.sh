cd ./deployment && npm i && cd ..
eval $(node ./deployment/should-deploy.js)
echo should deploy: volunteer: $DEPLOY_VOLUNTEER, dashboard: $DEPLOY_DASHBOARD, server: $DEPLOY_SERVER to $DEPLOY_TO
if [ $DEPLOY_TO = "STAGE" ]
then
export SERVER_BASE_URL="http://server.dev.dorldor.org.il"
export APP_URL="http://app.dev.dorldor.org.il"
fi
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