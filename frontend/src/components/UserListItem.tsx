import React from "react";
import {User} from "../types/user";
import {deleteUser} from "../backendQueries/queries";

type UsersListItemProps = {
    user: User
}

export default class UsersListItem extends React.Component<UsersListItemProps> {
    render() {
        const {user} = this.props;

        return <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.login}</td>
            <td>{user.dateOfBirth}</td>
            <td>{user.passwordMd5}</td>
            <td>
                <button onClick={() => deleteUser(user.id)}> remove</button>
            </td>
        </tr>
    }
}