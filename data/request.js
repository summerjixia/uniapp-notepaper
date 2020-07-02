let baseURL = "http://114.67.125.226:8081";

export const get = (url, param) => {
	return uni.request({
		url: baseURL + '' + url ,
		data: param
	})

}

export const post = (url, param) => {
	return uni.request({
		url: baseURL + '' + url,
		method: "POST",
		data: param
	})
}
