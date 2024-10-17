// Parent component
// src/App.js

// Parent component
// src/App.js
import React from 'react';

// import Slideshow to display ColorRecords
import SlideshowCelebrityRecords from './Slideshow-CelebrityRecords/Slideshow-CelebrityRecords';
import "../records.scss";

// Parent component
// src/App.js
// Child component
// src/components/Records/CelebrityRecords/Slideshow-CelebrityRecords/Slideshow-CelebrityRecords.jsx
const CelebrityRecords = ( {
    user,
    isSignedIn,
    dimensions,
    userCelebrityRecords
} ) => {
    

    return (
        <React.Fragment>
            {/* <CheckRecordsPanel /> */}
            <div className="container frosted">
            <h1 className="recordsHeading frosted__children">Color Records</h1>
            <SlideshowCelebrityRecords 
                user={user} 
                isSignedIn={isSignedIn} 
                dimensions={dimensions}
                // User's Celebrity Records
                userColorRecords={userCelebrityRecords}
            />
            </div>
        </React.Fragment>
    )
};

export default CelebrityRecords;