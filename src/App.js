import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home'
import Checkout from './Checkout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { auth } from './firebase'
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"
import GameDetails from './GameDetails';

const promise = loadStripe('pk_test_51HPvTPEGLvU9DjuLqKxm75YzSUV2MzPvC6PxkxVaPbUZeDhPTuNm7uWSLyX8EgbIUaG6EyZXixurmEMgWuRFptJa00lz7kgUnp');



function App() {

  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    //only run once when app loads
    auth.onAuthStateChanged(authUser => {
      console.log('user is ', authUser);

      if (authUser) {
        //the user just logger is 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else {
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Header />
            <Checkout />
          </Route>
          {/* <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route> */}
          <Route path="/game" exact>
            <Header />
            <GameDetails />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
