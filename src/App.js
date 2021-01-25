import './App.css'
import {Switch, Route, Redirect } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import {HomePage} from './pages/HomePage'
import {ProfilePage} from './pages/ProfilePage'
import {LoginPage} from './pages/LoginPage'
import {SignupPage} from './pages/SignupPage'
import {EditProfile} from './pages/EditProfile'
import { AddPost } from "./pages/AddPost";
import { PostPage } from "./pages/PostPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NotificationPage } from "./pages/NotificationPage";
import {FilterPage} from "./pages/FilterPage";
const ls=require("local-storage")

function App() {
  return (
    <div className="app-div m-auto">
    <CacheSwitch>
      <CacheRoute exact path={["/","/home"]}  >
        {ls('accessToken')?<HomePage></HomePage>:<Redirect to={'/signup'} ></Redirect>}
      </CacheRoute>
      <CacheRoute path="/profile/:id" component={ProfilePage} multiple></CacheRoute>
      <CacheRoute path="/post/:id" component={PostPage} multiple></CacheRoute>
    <CacheRoute path="/editprofile" component={EditProfile}  ></CacheRoute>
    <Route exact path="/login" component={LoginPage}></Route>
    <Route exact path="/signup" component={SignupPage}></Route>
    <Route exact path="/addpost" component={AddPost}></Route>
    <Route exact path="/settings" component={SettingsPage}></Route>
    <Route exact path="/notification" component={NotificationPage}></Route>
    <Route exact path="/filter" component={FilterPage}></Route>
    </CacheSwitch>
    </div>
  );
}

export default App;
