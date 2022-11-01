const SEND_DATA_URL = 'https://27.javascript.pages.academy/kekstagram-simple';
const GET_DATA_URL = 'https://27.javascript.pages.academy/kekstagram-simple/data';

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(onFail);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(onFail);
};

export {getData, sendData};
