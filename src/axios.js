import axios from "axios";
//  
const  instance = axios.create({
	baseURL: 'http://localhost:444'
});

//on each request checking token and adding the token
instance.interceptors.request.use((config) =>{
	config.headers.Authorization = window.localStorage.getItem('token');
	return config;
});

export default instance;