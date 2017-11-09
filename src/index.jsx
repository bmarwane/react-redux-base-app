import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';

import MainRouter from './routes'

render(<Provider store={store}>
            <MainRouter />
        </Provider>, document.getElementById('react-app'))
