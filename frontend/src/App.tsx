import React from 'react';
import './styles/index.css';
import UsersList from "./components/UsersList";
import {User} from "./types/user";
import {addUser, getAllUsers} from "./backendQueries/queries";
import {generateRandomUser} from "./utils/utils";

type AppState = {
    users: User[]
}

class App extends React.Component<any, AppState> {
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
        return (
            <div className="app-container">
                <div className="app-content">
                    <button onClick={() => {
                        const user = generateRandomUser();
                        addUser(user)
                    }
                    }> Add Random user to DB
                    </button>


                    <UsersList users={this.state.users}/>
                </div>
            </div>
        );
    }

}

export default App;
