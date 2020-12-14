import {User} from "../types/user";
import faker from 'faker';
import {v4 as uuid} from 'uuid';

export const generateRandomUser = (): User => {
    return {
        id: uuid(),
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        login: faker.internet.userName(),
        passwordMd5: faker.lorem.word(),
        isDeleted: false,
    };
}