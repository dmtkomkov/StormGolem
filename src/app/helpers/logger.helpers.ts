export const ngrxLogger = (reducer) => {
  return function newReducer( currentState, action ) {
    console.groupCollapsed(action.type);
    const nextState = reducer(currentState, action);
    console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, currentState);
    console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
    console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);
    console.groupEnd();
    return nextState;
  }
};