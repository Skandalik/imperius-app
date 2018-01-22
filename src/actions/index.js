import axios from 'axios';
import {getToken} from "../utils/auth/AuthService";

export function getClient() {
    return axios.create({
        baseURL: 'http://imperius.home:8090/api',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    });
}