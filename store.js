import { createStore, applyMiddleware } from 'redux';
// import { sagaMiddleware, rootSaga } from "./rootsaga";
import logger from 'redux-logger';

import reducers from './rootreducer'; //Import the reducer

// Connect our store to the reducers
export default createStore(reducers, applyMiddleware(logger));

// sagaMiddleware.run(rootSaga); 

// export default function configureStore(initialState) {
//     return createStore(
//         rootReducer,
//         initialState,
//         applyMiddleware(thunk)
//     );
// }