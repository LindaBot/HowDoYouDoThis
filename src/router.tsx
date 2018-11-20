import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App'
import FirstComponent from './components/FirstComponent';
import Header from './components/Header';
import SecondComponent from './components/SecondComponent';
import './css/styles.css';
import ProblemDetail from './ProblemDetail'

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Route path="/problem/:id" component={ProblemDetail} />
                    <Route path="/FirstComponent" component={FirstComponent} />
                    <Route path="/SecondComponent" component={SecondComponent} />
                </main>
            </div>
        </BrowserRouter>

    );
}
