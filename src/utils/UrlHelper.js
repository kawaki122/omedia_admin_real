class UrlHelper {
  _baseUrl;
  constructor(url) {
    this._baseUrl = url;
  }

  get uploadUrl() {
    return this._baseUrl + "upload";
  }

  fileUrl(param) {
    return this._baseUrl + "upload/" + param;
  }

  get brandUrl() {
    return this._baseUrl + "brand";
  }

  get cityUrl() {
    return this._baseUrl + "city";
  }

  get clientUrl() {
    return this._baseUrl + "client";
  }

  get campaignUrl() {
    return this._baseUrl + "campaign";
  }

  get locationUrl() {
    return this._baseUrl + "location";
  }

  get locationSaveUrl() {
    return this._baseUrl + "location/save";
  }

  get reviewUrl() {
    return this._baseUrl + "review";
  }

  get commonUrl() {
    return this._baseUrl + "common";
  }

  authUrl(param) {
    return `${this._baseUrl}auth/${param}`;
  }
}

export const urlHelper = new UrlHelper("http://localhost:4000/");
