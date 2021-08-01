import React from "react";
import Login from "./features/auth/Login";
// import { Counter } from "./features/counter/Counter";
// import Sidebar from "./app/Sidebar";
import Post from "./features/Post/list/Post";
import Users from "./features/Users/Users";
import Postdetails from "./features/Post/detail/Postdetail";
import Album from "./features/albums/list/Albums";
import Photo from "./features/albums/detail/Photos";

import PrivateRouter from "./app/utils/PrivateRouter";
import { Route, Switch, withRouter } from "react-router-dom";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Notfround from './app/components/layouts/Notfound'
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Nunito",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        "Montserrat",
      ].join(","),
    },
  });
  return (
    <div className="App">
      {/* <Counter/> */}
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRouter exact path="/post" component={Post} />
          <PrivateRouter exact path="/users" component={Users} />
          <PrivateRouter
            exact
            path="/postdetails/:id"
            component={Postdetails}
          />
          <PrivateRouter exact path="/album" component={Album} />
          <PrivateRouter exact path="/photodetails/:id" component={Photo} />
          <Route path="*" component={() => <Notfround subject="Page not found..." />} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default withRouter(App);
