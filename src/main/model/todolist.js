export default {
    namespace: 'todolist',
    state: {
        todoItem: []
    },
    effects: {
        *addHandler({ select, call, put }) {
            yield put({ type: "addTodo" })
        }
    },
    reducer: {
        addTodo: (state = {}, action) => {
            console.log('things addHandler')
            return { ...state, todoItem: [...state.todoItem, 1] };
        },
        delHandler: (state = {}, action) => {
            console.log('things delHandler')
            return state
        }
    }
}