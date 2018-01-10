import React from 'react';
import { connect } from 'react-redux';
import { Item } from './listItem';

class Todolist extends React.Component {

    addHandler = () => {
        this.props.dispatch({ type: "addHandler" })
    }

    render() {

        return (
            <div>
                <h1>Luy Todolist</h1>
                <button onClick={this.addHandler} >+</button>
                <Item />
            </div>
        )
    }
}

export default connect()(Todolist);