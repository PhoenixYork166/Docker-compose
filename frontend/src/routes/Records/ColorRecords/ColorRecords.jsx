// Parent component
// src/App.js
import React from 'react';

// import Slideshow to display ColorRecords
import SlideshowColorRecords from './Slideshow-ColorRecords/Slideshow-ColorRecords';
import "../records.scss";

// Parent component
// src/App.js
// Child component
// src/components/Records/ColorRecords/Slideshow-ColorRecords/Slideshow-ColorRecords.jsx
const ColorRecords = ( {
    user,
    isSignedIn,
    dimensions,
    userColorRecords
} ) => {
    
    return (
        <React.Fragment>
            {/* <CheckRecordsPanel /> */}
            <div className="container frosted">
            <h1 className="recordsHeading frosted__children">Color Records</h1>
            <SlideshowColorRecords 
                user={user} 
                isSignedIn={isSignedIn} 
                dimensions={dimensions}
                // User's Color Records
                userColorRecords={userColorRecords}
            />
            </div>
        </React.Fragment>
    )
};

export default ColorRecords;