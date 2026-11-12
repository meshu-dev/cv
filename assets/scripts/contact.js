const showContactPopup = () => {
  const formHtml = document.querySelector('.contactform-content').innerHTML;
  const themeColour = getComputedStyle(document.documentElement).getPropertyValue('--theme-colour');

  const params = {
    title: 'Send me a message',
    html: formHtml,
    showCancelButton: true,
    confirmButtonText: 'Send',
    confirmButtonColor: themeColour,
    showLoaderOnConfirm: true,
    preConfirm: sendMsgRequest,
    backdrop: true,
    allowOutsideClick: () => Swal.isLoading() == true ? false : true
  };

  Swal.fire(params);
};

const getFormParams = () => {
  const getVal = (name) => document.querySelector(`#swal2-html-container [name="${name}"]`).value;

  return {
    name: getVal('name'),
    email: getVal('email'),
    message: getVal('message'),
    token: reCaptcha.token
  };
};

const sendMsgRequest = (result) => {
  const url = 'https://lc8divnhwl.execute-api.eu-west-2.amazonaws.com/dev/';

  let params = getFormParams();
  params = {
    method: 'POST',
    body: JSON.stringify(params)
  };

  return fetch(url, params)
    .then(async (response) => {
      if (response.ok === true) {
        let json = await response.json();

        if (json.isSent === true) {
          sentMsg();
        } else {
          notSentMsg();
        }
      } else {
        errorMsg(response.statusText);
      }
      return;
    });
};

const errorMsg = (msg) => {
  Swal.showValidationMessage(
    `Request failed: ${msg}`
  );
};

const sentMsg = () => {
  Swal.fire(
    'Message sent!',
    'I will respond back to you soon',
    'success'
  );
};

const notSentMsg = () => {
  Swal.fire(
    'Error occurred',
    'Please try sending the message again later',
    'error'
  );
};