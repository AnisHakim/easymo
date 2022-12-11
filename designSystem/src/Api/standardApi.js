import { AuthStore } from "@easymo/auth"
import { apiURL } from '../config/index'
import axios from 'axios'

const lang = 'fr'
const publish = (event, data) => PubSub.publish(event, data)
async function apiRefreshToken(refreshToken) {
  const response = await fetch(`${apiURL}/api/${lang}/Auth/user/refresh`, {
    method: 'Get',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: 'Bearer ' + refreshToken
    }
  });
  return response.json();
}
export const getAuthUser = () => {
  return AuthStore.getState().auth.user
}


const createHeader = (token, contentType = 'application/json') => {
  if (token) {
    if (contentType === 'form-data') {
      return {
        Authorization: 'Bearer ' + token
      };
    } else {
      return {
        'Content-Type': contentType,
        accept: 'application/json',
        Authorization: 'Bearer ' + token
      };
    }
  } else {
    return {
      'Content-Type': contentType,
      accept: 'application/json',
    }
  }
}
const createHeaderFile = (token, contentType) => {
  return {
    'Content-Type': '*/*',
    Authorization: 'Bearer ' + token
  };
}


async function processResponse(response, callback) {
  let responseJson;
  try {
    responseJson = await response.json();
  } catch (e) {
    return { statusCode: 500 };
  }
  if (responseJson.statusCode === 401) {
    const refreshToken = AuthStore.getState().auth.refreshToken;
    const res = await apiRefreshToken(refreshToken);
    if (res.statusCode === 200) {
      publish("SET_TOKEN", res.data)
      return callback();
    } else {
      publish("RESET_TOKEN")
      return null;
    }
  } else if (responseJson.statusCode === 200) {
    return responseJson;
  } else {
    return responseJson;
  }
}

export async function apiGet(api) {
  const token = AuthStore.getState().auth.accessToken
  const response = await fetch(apiURL + api, {
    method: 'Get',
    headers: createHeader(token)
  });
  const resp = await processResponse(response, () => apiGet(api));
  return resp;
}

export async function apiPost(api, body, contentType = 'application/json') {
  const token = AuthStore.getState().auth.accessToken;
  const response = await fetch(apiURL + api, {
    method: 'POST',
    headers: createHeader(token, contentType),
    body: body
  });
  return processResponse(response, () => apiPost(api, body, contentType));
}

export async function apiDelete(api, body) {
  const token = AuthStore.getState().auth.accessToken;
  const response = await fetch(apiURL + api, {
    method: 'Delete',
    headers: createHeader(token, 'application/json'),
    body: body
  });
  return processResponse(response, () => apiDelete(api, body));
}

export async function apiPut(api, body, contentType = 'application/json') {
  const token = AuthStore.getState().auth.accessToken;
  const response = await fetch(apiURL + api, {
    method: 'Put',
    headers: createHeader(token, contentType),
    body: body
  });
  return processResponse(response, () => apiPut(api, body, contentType));
}

export async function apiPostUpload(api, body, contentType = 'form-data') {
  const token = AuthStore.getState().auth.accessToken;
  const response = await fetch(apiURL + api, {
    method: 'POST',
    headers: createHeader(token, contentType),
    body: body
  });
  return processResponse(response, () => apiPost(api, body, contentType));
}
export async function apiGetFile(api) {
  const token = AuthStore.getState().auth.accessToken
  const response = await fetch(apiURL + api, {
    method: 'Get',
    headers: createHeaderFile(token)
  });
  return processResponseFile(response, () => apiGet(api));
}
export async function apiDownloadFile(api) {
  const token = AuthStore.getState().auth.accessToken
  const response = await fetch(apiURL + api, {
    method: 'Get',
    headers: createHeaderFile(token)
  });
  return processResponseFile(response, () => apiGet(api), false);
}
async function processResponseFile(response, callback, withObjectUrl = true) {
  if (response.status !== 401 && response.status !== 400 && response.status !== 500) {
    const blob = await response.blob()
    if (withObjectUrl) {
      return URL.createObjectURL(blob)
    } else {
      return blob
    }
  } else {
    if (response.status === 401) {
      const refreshToken = AuthStore.getState().auth.refreshToken;
      const res = await apiRefreshToken(refreshToken);
      if (res.statusCode === 200) {
        publish("SET_TOKEN", res.data)
        return callback();
      } else {
        publish("RESET_TOKEN")
        return null;
      }
    } else {
      return response
    }
  }
}

export async function apiGetPostFile(api, body, contentType = 'application/json') {
  const token = AuthStore.getState().auth.accessToken
  const response = await fetch(apiURL + api, {
    method: 'POST',
    headers: createHeader(token, contentType),
    body: body
  });
  const process = await processResponseFile(response, () => apiGetPostFile(api, body));
  return process
}

export const apiUploadFile = async (url, data, options) => {
  const token = AuthStore.getState().auth.accessToken;
  const header = {
    Authorization: 'Bearer ' + token
  }
  try {
    const response = await axios.post(apiURL + url, data, { headers: header, ...options })
    return response;
  } catch (error) {
    if (401 === error.response.status) {
      return processUploadFile(() => apiUploadFile(url, data, options))
    }
  }
}
async function processUploadFile(callback) {
  const refreshToken = AuthStore.getState().auth.refreshToken;
  const res = await apiRefreshToken(refreshToken);
  if (res.statusCode === 200) {
    publish("SET_TOKEN", res.data)
    return callback();
  } else {
    publish("RESET_TOKEN")
    return null;
  }
}
export const setLocalStorage = (accessToken, refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken)
  localStorage.setItem("accessToken", accessToken)
}