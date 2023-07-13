import axios, { AxiosError } from 'axios';
import { Diary, NewDiary } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
	return axios.get<Diary[]>(baseUrl).then(response => response.data);
};

export const createDiary = async (object: NewDiary) => {
	try {
		const response = await axios.post<Diary>(baseUrl, object);
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.log(error.status, error.response);
		} else {
			console.log(error);
		}
	}
};
