import React, {Component} from 'react';
import './App.css';
import Header from './routes/Header';
import Main from './routes/Main';
import {MuiThemeProvider} from 'material-ui';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Header/>
                <Main/>
            </MuiThemeProvider>
        );
    }
}

export default App;
