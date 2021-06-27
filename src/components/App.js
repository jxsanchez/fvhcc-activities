import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Index from './Index';
import MysteryWord from './MysteryWord';
import '../css/style.css';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={Index} />
                    <Route path='/mysteryword' component={MysteryWord} />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;