import React from 'react';
import SmoothScroll from 'smooth-scroll';
import { BrowserRouter, Route } from 'react-router-dom';

import Index from './routes/Index';
import MysteryWord from './routes/MysteryWord';
import HigherOrLower from './routes/HigherOrLower';
import '../css/style.css';


const scroll = new SmoothScroll('a[href*="#"]');

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={Index} />
                    <Route path='/mysteryword' component={MysteryWord} />
                    <Route path='/higherorlower' component={HigherOrLower} />
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;