// Parent component
// src/App.js
import React from 'react';
import Slideshow from './Slideshow/Slideshow';

// Parent component
// src/App.js
const ColorRecords = ( {
    user,
    isSignedIn,
    dimensions
} ) => {

    return (
        <React.Fragment>
            <h1>Showing Color Records</h1>
            <Slideshow 
                user={user} 
                isSignedIn={isSignedIn} 
                dimensions={dimensions}
            />
        </React.Fragment>
    )
};

export default ColorRecords;