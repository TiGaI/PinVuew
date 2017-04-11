import Main from './container/indexios';
import React from 'React';
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

function index() {
  class Root extends React.Component {
    render() {
      return (
        <Provider store={store}>
           <Main />
        </Provider>
      );
    }
  }
  return Root;
}

module.exports = index;
