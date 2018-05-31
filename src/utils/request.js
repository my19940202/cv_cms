import fetch from 'dva/fetch';
import qs from 'qs';
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export function requestGet(url, payload, options) {
  const Url = `${url}?${payload ? qs.stringify(payload) : ""}`;
  return fetch(Url, {
    ...options,
    // cookie可以重写
    credentials: 'include',
    method: 'GET',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => ({ err }));
}

export function asyncRequestGet(url, callback, payload, options) {
  const Url = `${url}?${payload ? qs.stringify(payload) : ""}`;
  const data = fetch(Url, {
    ...options,
    // cookie可以重写
    credentials: 'include',
    method: 'GET',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => ({ err }));
  data.then((o) => {callback(o.data)});
}

export default function request(url, payload, options) {
  return fetch(url, {
    ...options,
    // cookie可以重写
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => ({ err }));
}
