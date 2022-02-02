import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

//
// const store = createStore(rootReducer);
// export default store


const store = createStore(rootReducer,
  compose(
    applyMiddleware(reduxThunk),
     window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
  )
);
export default store;
