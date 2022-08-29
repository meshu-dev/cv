const showContactPopup = () => {
  const formHtml = document.querySelector('.contactform-content').innerHTML;

  const params = {
    title: 'Send me a message',
    html: formHtml,
    showCancelButton: true,
    confirmButtonText: 'Send',
    showLoaderOnConfirm: true,
    preConfirm: sendMsgRequest,
    backdrop: true,
    allowOutsideClick: () => Swal.isLoading() == true ? false : true
  };

  Swal.fire(params).then(popUpResponse);
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

  console.log('params', params);

  return fetch(url, params)
    .then(response => {
      console.log('response', response, response.json());

      /*
      if (response.ok == false) {
        throw new Error(response.statusText);
      }
      return response.json(); */
    })
    .catch(error => {
      Swal.showValidationMessage(
        `Request failed: ${error}`
      )
    });
};

const popUpResponse = (result) => {
  console.log('popUpResponse', result);

  /*
  if (result.isConfirmed) {
    Swal.fire({
      title: `${result.value.login}'s avatar`,
      imageUrl: result.value.avatar_url
    });
  } */
};
