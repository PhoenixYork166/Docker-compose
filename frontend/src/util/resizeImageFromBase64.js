/* 
Usage

const handleImageUpload = (base64Image, mimeType) => {
    resizeImageFromBase64(base64Image, 'image/jpeg', 800, 600)
    .then((blob) => {
        // Now we have a Blob of the resized image
        // fs.writeFile() to upload to Node.js server or other uses
    })
    .catch((err) => {
        console.error(`\nError resizing image: `, err, `\n`);
    })
}
*/

const resizeImageFromBase64 = (base64, mime, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      // Create an Image element
      const img = new Image();
      img.onload = () => {
        // Create a canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;
  
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
  
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
  
        // Draw the image with new dimensions
        ctx.drawImage(img, 0, 0, width, height);
  
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          resolve(blob);
        }, mime);
      };
      img.onerror = (error) => {
        reject(error);
      };
  
      // Start loading the image
      img.src = base64;
    });
};

export default resizeImageFromBase64;