import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App'
import Header from './components/Header';
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
                </main>
            </div>
        </BrowserRouter>

    );
}
