import axios from 'axios';

// Save to Device button to save Color details into PostgreSQL as blob metadata
const saveToDevice = async (outerHTML) => {
    const devSaveHtmlUrl = 'http://localhost:3001/save-html';
    const prodSaveHtmlUrl = 'https://ai-recognition-backend.onrender.com/save-html';

    const fetchUrl = process.env.NODE_ENV === 'production' ? prodSaveHtmlUrl : devSaveHtmlUrl;
    const date = new Date().toISOString().replace(/:/g, '-');  // Format date for filename

    try {
        const response = await axios({
            method: 'post',
            url: fetchUrl,
            data: { htmlContent: outerHTML },
            responseType: 'arraybuffer'
        });

        console.log(`\nsaveToDevice response.data: `, response.data, `\n`);

        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileUrl = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', `color-details_${date}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Failed to save colorHtml to device:", error);
    }
    
    // axios.request({
    //   method: 'post',
    //   url: fetchUrl,
    //   data: {
    // htmlContent: outerHTML
    //   },
    //   responseType: 'arraybuffer' // To handle PDF files
    // })
    // // axios.request({
    // //   method: 'post',
    // //   url: fetchUrl,
    // //   data: {
    // //     htmlContent: outerHTML
    // //   },
    // //   responseType: 'arraybuffer'
    // // })
    // .then((response) => {
    //   const file = new Blob([response.data], { type: 'application/pdf' });
    //   const fileUrl = window.URL.createObjectURL(file);
    //   const link = document.createElement('a');
    //   link.href = fileUrl;
    //   link.setAttribute('download', `color-details_${date}.pdf`);
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // })
    // .catch(error => {
    //   console.error("Failed to save colorHtml to device:", error);
    //   console.log(error.response || "No response from server");
    // });
};

export default saveToDevice;