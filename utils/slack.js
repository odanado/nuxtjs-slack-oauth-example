import uuid from 'uuid';
import Slack from 'slack';
import queryString from 'query-string';

const config = require('~/config.json');

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`;

const getOptions = () => {
  const state = uuid.v4();
  return {
    client_id: config.SLACK_CLIENT_ID,
    state,
    redirect_uri: `${getBaseUrl()}/signed-in`,
    scope: 'identify',
  };
};

export const getOAuthSlackUrl = () => {
  const options = getOptions();
  const SLACK_AUTHORIZE_URL = 'https://slack.com/oauth/authorize';
  const url = `${SLACK_AUTHORIZE_URL}?${queryString.stringify(options)}`;
  return url;
};

export const fetchToken = code =>
  Slack.oauth.access({
    client_id: config.SLACK_CLIENT_ID,
    client_secret: config.SLACK_CLIENT_SECRET,
    code,
    redirect_uri: `${getBaseUrl()}/signed-in`,
  });
