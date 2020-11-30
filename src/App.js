import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Header from "./Header/Header";
import LoginPage from "./pages/LoginPage";
import NewBucketPage from "./pages/NewBucketPage";
import AllBucketPage from "./pages/AllBucketPage";
import BucketPage from "./pages/BucketPage";
import EditBucketPage from "./pages/EditBucketPage";
import PipePage from "./pages/PipePage";
import Register from "./pages/RegisterPage";
import ErrorNotFound from "./components/ErrorNotFound/ErrorNotFound";
import EditUserPage from "./pages/EditUserPage";
import ProfilePage from "./pages/ProfilePage";
import PipeHistory from "./pages/PipeHistory";


function App() {
  const convertDateTime = (isoDate) => {
    const date = new Date(isoDate)
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    if (day < 10) {
      day = "0" + day
    }
    if (month < 10) {
      month = "0" + month
    }
    const formattedDate = day + "-" + month + "-" + year
    return formattedDate
  }
  return (
  <Router>
      <Route path="/">
        <Header />
      </Route>
    <div>
    <Nav />
      <Switch>
        <Route path="/about">
          <About />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/new-pipe/:id">
          <PipePage />
        </Route>

        <Route path="/pipe-history">
          <PipeHistory />
        </Route>

        <Route path="/delete-bucket/:id">
          <EditBucketPage />
        </Route>

        <Route path="/edit-bucket/:id" >
          <EditBucketPage convertDateTime={convertDateTime}/>
        </Route>

        <Route path="/buckets/:id" >
          <BucketPage convertDateTime={convertDateTime}/>
        </Route>

        <Route path="/all-buckets" >
          <AllBucketPage convertDateTime={convertDateTime}/>
        </Route>

        <Route path="/register">
          <Register />
        </Route>  

        <Route path="/edit-user/:id">
          <EditUserPage />
        </Route>

        <Route path= "/Profile">
          <ProfilePage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>  

        <Route path="/new-bucket" >
          <NewBucketPage/>
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="" component={ErrorNotFound} />
        
      </Switch>
    </div>
  </Router>
  );
}
export default App;
