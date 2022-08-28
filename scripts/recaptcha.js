class ReCaptcha {
  constructor(googleReCaptcha, siteKey) {
    this._googleReCaptcha = googleReCaptcha;
    this._siteKey = siteKey;
    this.generateToken();
  }

  generateToken() {
    this._googleReCaptcha.ready(() => {
      this._googleReCaptcha.execute(
        this._siteKey,
        { action: 'homepage' }
      ).then((token) => {
        this._reCaptchaToken = token;
      });
    });
  }

  get token() {
    return this._reCaptchaToken;
  }
};
