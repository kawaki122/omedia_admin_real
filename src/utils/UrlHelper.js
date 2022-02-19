
class UrlHelper {
    BASE_URL;
    constructor(url) {
        this.BASE_URL = url
    }

    get uploadUrl(){
        return this.BASE_URL+'upload'
    }

    fileUrl(param){
        return this.BASE_URL+'upload/'+param
    }

    get brandUrl(){
        return this.BASE_URL+'brand'
    }
}

export const urlHelper = new UrlHelper('http://localhost:4000/');