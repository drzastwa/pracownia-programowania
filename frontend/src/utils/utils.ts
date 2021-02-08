import {User} from "../types/user";
import faker from 'faker';

export const generateRandomUser = (): User => {
    return {
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        login: faker.internet.userName(),
        passwordMd5: faker.lorem.word(),
        isDeleted: false,
    };
}

export const getTodayDateInString = (): string => {
    const curr = new Date();
    curr.setDate(curr.getDate());
    return curr.toISOString().substr(0, 10);
}