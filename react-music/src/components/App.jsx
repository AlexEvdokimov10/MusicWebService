import './App.css';
import NavBar from "./navbar/NavBar";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Authorization from "./authorization/Authorization";
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";
import {useEffect} from "react";
import Disk from "./disk/Disk";
import Edit from "./edit/Edit";
import AdminPanel from "./admin-panel/AdminPanel";
import {isAdmin} from "../reduces/userReducer";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(auth())
    },[])
  return (
      <BrowserRouter>
        <div className="app">
            <NavBar/>
            <div className="wrap">
                {!isAuth ?
                        <Switch>
                            <Route path="/registration" component={Authorization}/>
                            <Route path="/login" component={Login}/>
                            <Redirect to="/login"/>
                        </Switch>
                    :
                    (<Switch>
                            <Route exact path="/">
                                <Disk/>
                            </Route>
                            <Route exact path="/adminPanel">
                                <AdminPanel/>
                            </Route>
                            <Route exact path="/edit-user">
                                <Edit/>
                            </Route>
                            <Redirect to="/"/>
                    </Switch>
                    )
                }


            </div>
        </div>
      </BrowserRouter>
  );
}

export default App;

