import React from "react";
import {User} from "../types/user";

type UsersListItemProps = {
    user: User
}

export default class UsersListItem extends React.Component<UsersListItemProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const {user} = this.props;

        return <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.login}</td>
            <td>{user.dateOfBirth}</td>
            <td>{user.passwordMd5}</td>
        </tr>
    }
}