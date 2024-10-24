// Function to convert Blob to Base64
async function blobToBase64(blob) {
    // try {
        return new Promise((resolve, reject) => {
            if (!(blob instanceof Blob)) {
                // return reject(new TypeError(`\nThe provided value is not a Blob\n`));
                alert(`The entered imageUrl cannot be converted into a Blob for saving :(`);
                return;
            }
        
            const reader = new FileReader();

            // reader.onerror = reject;
            reader.onerror = () => {
                alert(`\nError reading the Blob object from entered imageUrl :(\n`);
                reader.abort();
            }

            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    // } catch (err) {
    //     console.error(`\nFailed to convert imageUrl from Blob to Base64\n`);
    //     return;
    // }
};

export default blobToBase64;