// Function to convert Blob to Base64
const blobToBase64 = blob => new Promise((resolve, reject) => {
    if (!(blob instanceof Blob)) {
        return reject(new TypeError(`\nThe provided value is not a Blob\n`));
    }

    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

export default blobToBase64;