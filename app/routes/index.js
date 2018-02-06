import React, { PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import App from './app.container';
import Home from './home';
import Post from './post';
import { Header } from '../components/header/header.component';
import { Footer } from '../components/footer/footer.component';

const PrimaryLayout = () => (
  <div className="primary-layout">
    <Header />
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/post/:id" exact component={Post} />
        <Redirect to="/" />
      </Switch>
    </main>
    <Footer />
  </div>
);

export class RootContainer extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="">
          <App>
            <PrimaryLayout />
          </App>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(RootContainer);
