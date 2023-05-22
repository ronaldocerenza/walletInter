// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

// por padrão usamos o rootReducer e o combine reducer para usar multiplos reducers, neste caso temos 2
const rootReducer = combineReducers({ user, wallet });

export default rootReducer;
