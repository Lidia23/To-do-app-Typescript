import axios, { AxiosInstance, AxiosResponse } from "axios";
import {Todo} from "../models/todo";

const api: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}tasks/`
});

export class TaskService {
    async getTasks(): Promise<Todo[]> {
        const response: AxiosResponse<Todo[]> = await api.get<Todo[]>('');
        return response.data;
    }

    async getTask(id: number): Promise<Todo> {
        const response: AxiosResponse<Todo> = await api.get(`${id}`)
        return response.data
    }

    async createTask(request: Todo): Promise<Todo> {
        const response: AxiosResponse<Todo> = await api.post('create/', request);
        return response.data;
    }

    async updateTask(id: number, request: Todo): Promise<Todo> {
        const response: AxiosResponse<Todo> = await api.put(`${id}`, request);
        return response.data;
    }

    async deleteTask(id: number) {
        const response = await api.delete(`${id}`);
        return response.data;
    }
}
