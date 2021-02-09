import React from "react";
import {User} from "../types/user";
import {deleteUser} from "../backendQueries/queries";

type UsersListItemProps = {
    user: User,
    removeUserFromList: (id: string) => void
}

export default class UsersListItem extends React.Component<UsersListItemProps> {
    render() {
        const {user} = this.props;
        const {id, name, surname, login, dateOfBirth, passwordMd5} = user;

        return <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{login}</td>
            <td>{dateOfBirth}</td>
            <td>{passwordMd5}</td>
            <td>
                <button onClick={async () => {
                    const response = await deleteUser(user.id!);
                    if (response.status === 200) {
                        this.props.removeUserFromList(user.id!);
                    }
                }}>
                    remove
                </button>
            </td>
        </tr>
    }
}