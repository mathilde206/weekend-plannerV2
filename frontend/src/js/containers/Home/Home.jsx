import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h2>Welcome to React</h2>
                <p>{this.props.message}</p>
            </div>
        );
    }
}

export default Home;