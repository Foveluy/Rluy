import React from 'react';

import app from './Rluy';

import Todolist from './views/todolist';




app.init();
app.model(require('./model/todolist'));
app.router(require('./views/todolist'));
app.run(document.getElementById('root'));
