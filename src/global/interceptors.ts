import axios from 'axios';
// import {
//   decrementLoaderQueue,
//   incrementLoaderQueue,
//   updateLoggedInStatus,
//   updateUserRole
// } from '../actions/global';
import { AppProperties } from '../constants/application.properties';
import ERRORS from '../constants/errorConstants';
import ApiError from '../errors/ApiError';
import storage from '../utils/storage';

/**
 * Saves user session in storage and sets as default
 * @param valid: boolean : userSession
 */
export const updateUserSession = (valid: boolean) => {
  storage.setItem(AppProperties.USER_SESSION, valid);
};

/**
 * Setup defaults and request response interceptors for axios on load
 * @param store : Redux App Store
 */
export const setupInterceptors = (store: any) => {
  axios.defaults.baseURL = AppProperties.BASE_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.validateStatus = () => true;
  axios.interceptors.request.use(config => {
    config.withCredentials = true;
    /**
     * We receive removeFromQueue from service - Role Permission.
     * It comes with default value true.
     */
    if (config.data && config.data.removeFromQueue) {
      /**
       * If removeFromQueue is true, this dispatch method decrease the value.
       */
      // store.dispatch(decrementLoaderQueue());
    }
    /**
     * If removeFromQueue is false, this dispatch method increase the value.
     */
    // store.dispatch(incrementLoaderQueue());
    return config;
  }, error => Promise.reject(error));
  const userSession = storage.getItem(AppProperties.USER_SESSION);
  const userRole = storage.getItem(AppProperties.ROLES);
  updateUserSession(userSession);
  // store.dispatch(updateLoggedInStatus(userSession !== 'true' ? { loggedIn: false } : { loggedIn: true }));
  if (userRole) {
    // store.dispatch(updateUserRole(userRole));
  }
  axios.interceptors.response.use((response: any) => {
    const { status } = response;
    /** Processes response body
     *  use store.dispatch() to dispatch any redux actions
     *  considered for logout status to be 201
     */
    const header = response.config.data;
    if (header && JSON.parse(header).removeFromQueue) {
      /**
       * Increase the value deponds on how many request receives.
       */
      // store.dispatch(incrementLoaderQueue());
    }
    /**
     * Decrease the value deponds on how many request done.
     */
    // store.dispatch(decrementLoaderQueue());
    if (status > 205 && status !== 201) {
      switch (status) {
        case 500:
          throw new ApiError(ERRORS.SERVER_ERROR);
        case 403:
          updateUserSession(false);
          storage.deleteItem(AppProperties.ROLES);
          storage.deleteItem(AppProperties.USER_ID);
          storage.deleteItem(AppProperties.USER_SESSION);
          // store.dispatch(updateLoggedInStatus({ loggedIn: false }));
          throw new ApiError(ERRORS.SERVER_ERROR);
        case 409:
          throw new ApiError(ERRORS.SERVER_CONFLICT);
        case 401:
          throw response.data.code;
      }
    } else {
      return response;
    }
  }, error => {
    Promise.reject(error);
    throw new ApiError(ERRORS.NETWORK_ERROR);
  });
};
