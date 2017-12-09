
function updateState(state, action) {
    if(action.type === 'INCREMENT'){
        return { count: state.count + action.amount };
    } else if (action.type === 'DECREMENT') {
        return {count: state.count - action.amount};
    } else {
        return state;
    }
}

class Store {
    constructor(updateState, state) {
        this._updateState = updateState;
        this._state = state;
        this._callbacks = [];
    }
    
    get state() {
        return this._state;
    }

    update(action){
        this._state = this._updateState(this.state, action);
        this._callbacks.forEach(callback => callback());
    }
    subscribe(callback) {
        this._callbacks.push(callback); 
        return () => this._callbacks = this._callbacks.filter(cb => cb !== callback);
    }
}

const initialState = { count: 0 };
const store = new Store(updateState, initialState);


const incrementAction = {type: 'INCREMENT', amount: 3};
const decrementAction = {type: 'DECREMENT', amount: 5};

store.update(incrementAction);


const unsubscribe = store.subscribe(() => console.log('state changed1', store.state));
store.subscribe(() => console.log('state changed2', store.state));



store.update(incrementAction);
store.update(incrementAction);
store.update(incrementAction);
unsubscribe();

store.update(incrementAction);