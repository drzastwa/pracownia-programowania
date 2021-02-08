import React from "react";
import UsersListItem from "./UserListItem";
import AddUserRow from "./AddUserRow";
import UserListHeader from "./UserListHeader";
import {User} from "../types/user";
import {getAllUsers} from "../backendQueries/queries";


type UsersListState = {
    users: User[]
}


export default class UsersList extends React.Component<any, UsersListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        }
    }

    updateUsersList = (users: User[]) => {
        this.setState({
            users
        })
    }

    componentDidMount() {
        getAllUsers()
            .then((response) => {
                this.updateUsersList(response.data);
            })
    }


    render() {
        const {users} = this.state;

        return <table className={"users-list"}>
            <tbody>
            <UserListHeader/>
            <AddUserRow addUserToList={(user: User) => {
                this.state.users.push(user)
            }}/>

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