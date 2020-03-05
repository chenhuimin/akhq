import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { baseUrl, uriClusters } from './utils/endpoints';
import Routes from './utils/Routes';
import history from './utils/history';
import api from './utils/api';
import ErrorBoundary from './containers/ErrorBoundary';
import Loading from '../src/containers/Loading';
class App extends React.Component {
  state = {
    clusterId: ''
  };
  componentDidMount() {
    api
      .get(uriClusters())
      .then(res => {
        this.setState({ clusterId: res.data ? res.data[0].id : '' });
      })
      .catch(err => {
        history.replace('/error', { errorData: err });
        this.setState({ clusterId: '' });
      });
  }
  render() {
    const { clusterId } = this.state;
    return (
      <Router history={history}>
        <ErrorBoundary>
          <Routes clusterId={clusterId} location={baseUrl} />
        </ErrorBoundary>
      </Router>
    );
  }
}

export default App;
