import React, { useState, useEffect } from 'react';
import './AgeRecognition.css';
import axios from 'axios';
// Utility functions
import blobToBase64 from '../../../util/blobToBase64';

// 'Save to Device' button
import saveToDevice from '../../../util/saveToDevice';

// Parent component
// src/components/Home/Home.jsx
const AgeRecognition = ( { 
    user,
    input, 
    imageUrl, 
    age, 
    age_hidden, 
    onRouteChange 
} ) => {
    const [imageBlob, setImageBlob] = useState(''); // Blob { size: Number, type: String, userId: undefined }
    const [resData, setResData] = useState('');

    // Keep tracking response.status.code as a number
    // Allow to be passed to other/child components
    // Allow other components to reset latest response.status.code
    const [responseStatusCode, setResponseStatusCode] = useState();

    // Looking up for Users' inputs images
    useEffect(() => {
        if (input !== '') {
          const fetchImage = async() => {
            const fetchUrl = input;
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      
            try {
              // const response = await axios.get(fetchUrl, { responseType: 'blob' });
              const response = await axios.get(`${proxyUrl}${fetchUrl}`, { responseType: 'blob' });
              console.log(`\nAgeRecognition received metadata blob response:`, response, `\n`);
      
              const reader = new FileReader();
              reader.onloadend = () => {
                // useState() to store this.state.imageBlob: response.data
                setImageBlob(reader.result);
              };
              reader.readAsDataURL(response.data);
              setResData(response.data);
              console.log(`\nresponse.data:\n$`, response.data, `\n`);
            } catch (err) {
              console.error(`\nAgeRecognition failed to get 'blob' via axios.get(${fetchUrl}\nError: ${err}\n`);
            }
          };
          fetchImage();
        }
    }, [input]); // State management array[] to listen on imageUrl

    /* For saving Celebrity record to User's local machine using Puppeteer */
    const htmlToSave =  document.querySelector('.age-scraper') ? document.querySelector('.age-scraper').outerHTML : null;

    // Save to Account button to save Color details into PostgreSQL as blob metadata
    const saveAge = async () => {
        // Reset latest response.status.code before next action
        // setResponseStatusCode(undefined);

        const callbackName = `src/components/AIRecognition/AgeRecognition/AgeRecognition\nsaveAge = async () => {...}`;
        
        const devSaveAgeUrl = 'http://localhost:3001/save-user-age';
        const prodSaveAgeUrl = 'https://ai-recognition-backend.onrender.com/save-user-age';
        const fetchUrl = process.env.NODE_ENV === 'production' ? prodSaveAgeUrl : devSaveAgeUrl;

        // Assuming resData is the Blob
        const base64Metadata = await blobToBase64(resData);

        if (!base64Metadata) {
          // If Blob cannot be transformed in base64Metadata => route to 'home' page
          onRouteChange('home');
        }
    
        const imageRecord = {
        imageUrl: input,
        metadata: base64Metadata,
        dateTime: new Date().toISOString()
        };
        
        const bodyData = JSON.stringify({ 
            userId: user.id, 
            imageRecord: imageRecord, 
            age: age
        });

        console.log(`\nAgeRecognition resData:\n`, resData, `\n`);
        console.log(`\nAgeRecognition saveAge() user.id: `, user.id, `\n`);
        console.log(`\nAgeRecognition saveAge(): `, age, `\n`);
        console.log(`\nAgeRecognition input: `, input, `\n`);
        console.log(`\nFetching ${fetchUrl} with bodyData`, bodyData, `\n`);

        await fetch(fetchUrl, {
        method: 'post', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ // sending stringified this.state variables as JSON objects
            userId: user.id,
            imageRecord: imageRecord,
            age: age
        })
        })
        .then((response) => response.json())
        .then((response) => {
        console.log(`\nAgeRecognition saveAge() response: `, response, `\n`);

        // Keep tracking response.status.code
        setResponseStatusCode(response.status.code);
        console.log(`\n\nsrc/components/AgeRecognition/AgeRecognition.jsx\nLatest action\nresponse.status.code:\n${responseStatusCode}\n`);

        })
        .catch((err) => {
        console.error(`\nError in callbackName:\n`, callbackName, `\n\nError: `, err, `\n`);
        })
        ;
    }


    const showModal = () => {
        // Retrieve DOM element of modal-window pop-up upon users' copy events
        const modal = document.querySelector('.modal-window');
            
        modal.style.opacity = 1;
       
        setTimeout(() => modal.style.opacity=0, 2000)
    }

    if (age_hidden) return;

    return ( 
        <React.Fragment>
        <div className="age-container">
            <div className='age-subcontainer'>
                <div className='age-scraper'>
                    <div id='age-number'>
                        <h3>Age: {age}</h3>
                    </div>

                    <div className='age-image'>
                    <img
                        // id='face-image' is used for DOM manipulation
                        // cannot be edited
                        id='face-image'
                        src={imageUrl}
                        alt="Ooops...It seems the entered URL is BROKEN...Please enter a working URL starting with 'https' in .jpg format"
                    /> 
                    </div>
                </div>

                <div className="saveBtn u-margin-top-small">
                    <button 
                    className="saveBtn__p"
                    onClick={() => { saveAge(); showModal();} } // AgeRecognition.jsx saveAge()
                    >
                        Save to Account
                    </button>
                </div>

                <div className='modal-window'>
                    <h1 class='modal-window--inner'>
                        {responseStatusCode === 200 ? 'Processed!' : 'Failed action' }
                    </h1>
                </div>
                
                {/* Save to Device button */}
                <div className="saveBtn u-margin-top-tiny">
                    <button 
                    className="saveBtn__p"
                    onClick={() => { saveToDevice(htmlToSave); showModal();} } // ColorDetails.jsx saveColor()
                    >
                        Save to Device
                    </button>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}
export default AgeRecognition

