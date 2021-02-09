import React from "react";
import UsersListItem from "./UserListItem";
import AddUserRow from "./AddUserRow";
import UserListHeader from "./UserListHeader";
import {User} from "../types/user";
import {addUser, getAllUsers} from "../backendQueries/queries";
import {generateRandomUser} from "../utils/utils";

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

    componentDidMount() {
        getAllUsers()
            .then((response) => {
                this.setState({
                    users: response.data
                })
            })
    }

    render() {
        const {users} = this.state;

        return <div>
            <button onClick={async () => {
                const user = generateRandomUser();
                const response = await addUser(user);
                console.log('response ', response);
                this.setState({
                    users: [...this.state.users, response.data]
                });
            }}>
                Add Random user to DB
            </button>

            <table className={"users-list"}>
                <tbody>
                <UserListHeader/>
                <AddUserRow updateUsersList={(user: User) => {
                    this.state.users.push(user);
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
        </div>
    }
}