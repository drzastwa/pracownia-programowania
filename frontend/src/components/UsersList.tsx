import React from "react";
import UsersListItem from "./UserListItem";
import AddUserRow from "./AddUserRow";
import UserListHeader from "./UserListHeader";
import {User} from "../types/user";

type UsersListProps = {
    users: User[]
}

export default class UsersList extends React.Component<UsersListProps> {
    render() {
        const {users} = this.props;

        return <table className={"users-list"}>
            <tbody>
            <UserListHeader/>
            <AddUserRow />
            {
                users ?
                    <>
                        {
                            users.map((user, key) => {
                                return <UsersListItem key={key} user={user}/>
                            })
                        }
                    </>
                    :
                    <p> There aren't any users at the database! </p>
            }
            </tbody>
        </table>
    }
}