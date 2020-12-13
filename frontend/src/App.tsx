import React from 'react';
import './styles/index.css';
import axios from 'axios';
import UsersList from "./components/UsersList";
import {User} from "./types/user";

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
        axios.get('http://localhost:8000/users')
            .then((response) => {
                console.log('response', response.data);
                this.setState({
                    users: response.data
                })
            })
    }


    render() {
        return (
            <div className="app-container">
                <div className="app-content">
                    <UsersList users={this.state.users}/>
                </div>
            </div>
        );
    }

}

export default App;
