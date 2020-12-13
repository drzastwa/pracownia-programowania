import React from "react";
import {User} from "../types/user";
import UsersListItem from "./UserListItem";

type UsersListProps = {
    users: User[]
}

export default class UsersList extends React.Component<UsersListProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const {users} = this.props;

        return <table
            className={"users-list"}
        >
            {
                users && users.map(user => {
                    return <UsersListItem user={user}/>
                })
            }
        </table>
    }
}