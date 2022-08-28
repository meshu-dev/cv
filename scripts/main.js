let reCaptcha;

window.addEventListener('DOMContentLoaded', (event) => {
  const googleSiteKey = '6LfRZrUhAAAAAJ5O2p0hgsE0uFStSIeOz1aemopm';
  reCaptcha = new ReCaptcha(grecaptcha, googleSiteKey);
});
