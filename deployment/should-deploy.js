const git = require('simple-git/promise')();
const diffSummary = require('simple-git/');
const commitId = process.env.TRAVIS_COMMIT;
async function deploy() {
    const DEPLOY_ENV = 'PROD';
    const commit = await git.show([commitId, '-s', '--format=%B']);
    const diff = await git.diffSummary([commitId + '^', commitId]);
    const shouldDeployServer = commitContains(commit, '[deploy-server]') || containsFileFrom(diff.files, 'server/');
    const shouldDeployDashboard = commitContains(commit, '[deploy-dashboard]') || containsFileFrom(diff.files, 'specialist-dashboard/');
    const shouldDeployVolunteerApp = commitContains(commit, '[deploy-volunteer]') || containsFileFrom(diff.files, 'volunteer/');
    console.log(`export DEPLOY_SERVER=${shouldDeployServer} && export DEPLOY_VOLUNTEER=${shouldDeployVolunteerApp} && export DEPLOY_DASHBOARD=${shouldDeployDashboard} && export DEPLOY_TO=${DEPLOY_ENV}`);
}

function containsFileFrom(files, from) {
    return files.filter(f => f.file.startsWith(from)).length > 0;
}

function commitContains(commit, text) {
    return commit.indexOf(text) > -1;
}

deploy();