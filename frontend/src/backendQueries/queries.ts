import axios from "axios";
import {SERVER_ADDRESS} from "../consts/consts";
import {User} from "../types/user";


export const getAllUsers = () => axios.get(SERVER_ADDRESS + '/users')

export const addUser = (user: User) => axios.post(SERVER_ADDRESS + '/user', {user});

export const deleteUser = (id: string) => axios.delete(SERVER_ADDRESS + '/user/' + id);

export const updateUser = (id: string, updates: User) => axios.put(SERVER_ADDRESS + '/user/' + id, {updates});

updateUser("3c529bf3-b4e5-41b1-8c5a-9af703d012b4", {
    name: "Elon Musk",
    surname: "musk",
    login: "login",
    isDeleted: false,
    passwordMd5: "lalllala"
});