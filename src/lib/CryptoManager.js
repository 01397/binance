export default class CryptoManager {
	constructor({title, endpoint}) {
		this.endpoint = endpoint;
	}

	request({path, params}) {
		const paramString = Object.keys(params)
			.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
			.join('&');
		return fetch(this.endpoint + path + '?' + paramString)
			.then(response => {
				return response.text();
			});
	}

}