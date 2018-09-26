import axios from 'axios'

axios.defaults.baseURL = `http://localhost:3000`

//banner信息
export const getBanner = () => axios.get('banner') 