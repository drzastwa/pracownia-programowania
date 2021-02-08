import React from "react";
import {User} from "../types/user";

const usersListHeader: User = {
    id: "Id",
    name: 'Name',
    surname: 'Surname',
    login: 'Login',
    dateOfBirth: 'Date of birth',
    passwordMd5: 'Password (MD5)',
    isDeleted: false
}

export default class UserListHeader extends React.Component<any, any> {
    render() {
        const attributesCells = [];

        let attributeKey: keyof typeof usersListHeader;  // Type is "one" | "two" | "three"
        for (attributeKey in usersListHeader) {
            const attribute = usersListHeader[attributeKey]
            attributesCells.push(<td> {attribute}</td>)
        }


        return <tr className={"header"}>
            {
                attributesCells
            }
        </tr>


    }
}