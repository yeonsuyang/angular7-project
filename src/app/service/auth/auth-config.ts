import { AuthConfig } from 'angular-oauth2-oidc';
import { AppConfig } from '../../app.config';

export const authConfig: AuthConfig = {
  loginUrl : '',
  clientId: 'skylife-cems-ui',
  redirectUri: window.location.origin + '/deviceManagement',
  scope: 'openid',
  requireHttps: false,
  oidc: false,
};
