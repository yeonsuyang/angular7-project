import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  loginUrl : '',
  clientId: '',
  redirectUri: window.location.origin,
  scope: '',
  requireHttps: false,
  oidc: false,
};
