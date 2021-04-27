export function logger(reducer: Function) {
    return function (state: any, action: any) {
        const nextState = reducer(state, action);
        if (!action.type.match(/error/) || !action.error) {
            console.group(action.type);
            console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state);
            console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
            console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);
            console.groupEnd();
        }
        return nextState;
    }
}

export function errLogger(reducer: Function) {
    return function (state: any, action: any) {
        if (action.type.match(/error/) || !!action.error) {
            console.group(action.type);
            console.log(`%c Error: `, `color: #ff000c; font-weight: bold`, state);
            console.groupEnd();
        }

        return reducer(state, action);
    }
}