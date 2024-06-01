// Select the necessary HTML elements by their IDs
let generateImageForm = document.getElementById('generate-image-form');
let formInput = document.getElementById('input-value');
let imageContainerText = document.getElementById('imageContainerText');
let imageGenerated = document.getElementById('generated-image');
let imageContainer = document.getElementById('images-visible');
let loadingIndicator = document.getElementById('loading'); // Select the loading indicator element

// Asynchronous function to fetch images from Pexels API
async function fetchImages(category) {
    try {
        loadingIndicator.style.display = "block";  // Show loading indicator
        let response = await fetch(`https://api.pexels.com/v1/search?query=${category}`, {
            headers: {
                Authorization: 'X426t2ReRzeBiebZh2XoU0jVyyGWz2EIDXPQkIUQQ88N1MSLMyRqF5g0'
            }
        });
        
        if (!response.ok) {
            throw new Error('Unable to fetch the data');
        }
        
        let data = await response.json();
        let imageUrl = data.photos[0].src.medium; // Fetch the medium size URL of the first photo
        imageContainerText.innerText = "Below is your generated Image:";
        imageContainer.style.display = "block";
        imageGenerated.src = imageUrl;
        console.log(imageUrl);
    } catch (error) {
        imageContainerText.innerText = "An error occurred: " + error.message;
        console.log(error);
    } finally {
        loadingIndicator.style.display = "none";  // Hide loading indicator
    }
}

// Add event listener to the form for the submit event
generateImageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let enteredText = formInput.value;
    if (enteredText !== "") {
        fetchImages(enteredText);
    } else {
        imageContainerText.innerText = "Input field cannot be empty!";
    }
});
