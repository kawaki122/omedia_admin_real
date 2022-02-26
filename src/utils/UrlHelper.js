
class UrlHelper {
    _baseUrl;
    constructor(url) {
        this._baseUrl = url
    }

    get uploadUrl(){
        return this._baseUrl+'upload'
    }

    fileUrl(param){
        return this._baseUrl+'upload/'+param
    }

    get brandUrl(){
        return this._baseUrl+'brand'
    }

    get cityUrl(){
        return this._baseUrl+'city'
    }

    get clientUrl(){
        return this._baseUrl+'client'
    }
    get campaignUrl(){
        return this._baseUrl+'campaign'
    }
}

export const urlHelper = new UrlHelper('http://localhost:4000/');