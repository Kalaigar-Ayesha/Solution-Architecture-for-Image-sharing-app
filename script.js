const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const imagesContainer = document.getElementById('imagesContainer');

// Replace with your actual API Gateway endpoint
const API_ENDPOINT = "https://your-api-id.execute-api.region.amazonaws.com/prod/upload";

uploadBtn.addEventListener('click', async () => {
    const file = imageInput.files[0];
    if (!file) {
        alert('Please select an image first.');
        return;
    }

    // Convert image to base64
    const reader = new FileReader();
    reader.onload = async function(event) {
        const base64Image = event.target.result.split(',')[1]; // remove data:image/*;base64, prefix

        // Display image immediately
        const imgElement = document.createElement('img');
        imgElement.src = event.target.result;
        imagesContainer.appendChild(imgElement);

        // Send image to API Gateway
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: base64Image, filename: file.name })
            });

            const data = await response.json();
            console.log('Upload successful:', data);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    reader.readAsDataURL(file);
});
