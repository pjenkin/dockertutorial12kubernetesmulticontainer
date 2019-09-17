import React from 'react';
import { Link } from 'react-router-dom';

export default ()=> {       // export this so's e can be used in the React app's App.js
    return (
        <div>
            This is some other page from some other age!
            <Link to="/">Go back to home page</Link>
        </div>
        // all of the above is JSX
    );
};