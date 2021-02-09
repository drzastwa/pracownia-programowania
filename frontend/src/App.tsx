import React from 'react';
import './styles/index.css';
import UsersList from "./components/UsersList";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="app-container">
                <div className="app-content">
                    <UsersList/>
                </div>
            </div>
        );
    }

}

export default App;
