export type User = {
    id: string,
    name: string,
    surname: string,
    login: string,
    dateOfBirth?: string,
    passwordMd5: string,
    isDeleted: boolean
}