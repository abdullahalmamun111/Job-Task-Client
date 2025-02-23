import axios from "axios";

const axiosPublic = axios.create({
	baseURL:'https://backend-sandy-two-30.vercel.app/'
})

const useAxiosPublic = () => {
	return axiosPublic ;
}

export default useAxiosPublic ;