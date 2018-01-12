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
                {React.Children.map(this.props.todoItem, (item) => {
                    return <Item />
                })}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        todoItem: state.todolist.todoItem
    }
}

export default connect(mapState)(Todolist);