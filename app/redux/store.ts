import { createStore, applyMiddleware, AnyAction, Store } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { Persistor, persistStore } from 'redux-persist';

export let store: Store<any, AnyAction>;
export let persistor: Persistor;

export default () => {
  store = createStore(reducers, applyMiddleware(thunk));
  persistor = persistStore(store);
  return { store, persistor };
};
