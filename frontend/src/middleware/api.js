import Cookies from "js-cookie";
const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:4000/api';

const config = async () => {
	const header = {
		headers: {
			"Authorization": 'bearer ' + Cookies.get("auth"),
		}
	}
	console.log(header)
	return header;
}

const fetchApi = async (endpoint) => {
	const result = await axios.get(BASE_URL + endpoint, await config())
		.catch(err => {
			console.log(err);
		});
	console.log(result);
	return result;
};

const postApi = async (endpoint, values) => {
	const result = await axios.post(BASE_URL + endpoint, values, await config())
		.catch(err => {
			return { status: err.response.status };
		});
	console.log(result);
	return result;
};

const deleteApi = async (endpoint) => {
	const result = await axios.delete(BASE_URL + endpoint, await config())
		.catch(err => {
			return { status: err.response.status };
		});
	console.log(result);
	return result;
};

const updateApi = async (endpoint, values) => {
	const result = await axios.patch(BASE_URL + endpoint, values, await config())
		.catch(err => {
			return { status: err.response.status };
		});
	console.log(result);
	return result;
};

export { fetchApi, postApi, deleteApi, updateApi };