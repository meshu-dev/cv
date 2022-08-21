document.addEventListener("DOMContentLoaded", function(event) {
   console.log('Butta Bing!');
});

const showContactPopup = () => {
   const formHtml = document.querySelector('#contactform-content').innerHTML;

   Swal.fire({
      title: 'Send me a message',
      html: formHtml,
      showCancelButton: false,
      showCloseButton: true
   });
};
