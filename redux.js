

export function createStore(reducer, intialState) {
    let state = initialState;
    let callback = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        callback.forEach(callback => callback());
    };
    const subscribe = callback =< {
        callback.push(callback);
        return () => callback.filter(cb => cb !== callback);
    };

    return { getState, dispatch, subscribe };
}