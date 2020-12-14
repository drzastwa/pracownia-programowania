import React from "react";
import {User} from "../types/user";
import UsersListItem from "./UserListItem";

const usersListHeader: User = {
    id: "id",
    name: 'name',
    surname: 'surname',
    login: 'login',
    dateOfBirth: 'dateOfBirth',
    passwordMd5: 'passwordMd5',
    isDeleted: false,
}

type UsersListProps = {
    users: User[]
}

export default class UsersList extends React.Component<UsersListProps> {
    render() {
        const {users} = this.props;

        return <table className={"users-list"}>
            <tbody>


            {
                users ?
                    <>
                        <tr>
                            <td> id</td>
                            <td> name</td>
                            <td> surname</td>
                            <td> login</td>
                            <td>dateOfBirth</td>
                            <td>passwordMd5</td>
                            <td></td>
                        </tr>

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