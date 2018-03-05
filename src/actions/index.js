import axios from 'axios';
import {getToken} from "../utils/auth/AuthService";

export function getClient() {
    return axios.create({
        baseURL: 'http://77.55.235.53:8080/api',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    });
}