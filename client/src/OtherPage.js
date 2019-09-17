import React from 'react';
import { Link } from 'react-router-dom';

export default ()=> {
    return (
        <div>
            This is some other page from some other age!
            <Link to="/">Go back to home page</Link>
        </div>
    );
};