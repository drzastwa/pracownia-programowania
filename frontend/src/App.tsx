import React from 'react';
import './styles/index.css';
import UsersList from "./components/UsersList";
import {addUser} from "./backendQueries/queries";
import {generateRandomUser} from "./utils/utils";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
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


                    <UsersList />
                </div>
            </div>
        );
    }

}

export default App;
