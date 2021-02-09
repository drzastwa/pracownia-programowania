import axios from "axios";
import {SERVER_ADDRESS} from "../consts/consts";
import {User} from "../types/user";


export const getAllUsers = () => axios.get(SERVER_ADDRESS + '/users')

export const addUser = (user: User) => axios.post(SERVER_ADDRESS + '/user', {user});

export const deleteUser = (id: string) => axios.delete(SERVER_ADDRESS + '/user/' + id);