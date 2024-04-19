document.addEventListener('DOMContentLoaded', function() {
    var nameInput = document.getElementById('name');
    var contactInput = document.getElementById('contact');
    
    if (nameInput.value.trim() === '') {
        nameInput.value = nameInput.getAttribute('data-default');
    }
    
    if (contactInput.value.trim() === '') {
        contactInput.value = contactInput.getAttribute('data-default');
    }
});

function clearInputValue(element) {
    if (element.value.trim() === element.getAttribute('data-default')) {
        element.value = ''; 
    }
}

function setDefaultText(element) {
    if (element.value.trim() === '') {
        element.value = element.getAttribute('data-default'); 
    }
}

// Get the file input element
var input = document.getElementById('imageUpload');
// Get the div where the uploaded photo will be displayed
var uploadedPhotoDiv = document.getElementById('uploadedPhoto');

// Add an event listener to handle file selection
input.addEventListener('change', function(e) {
    // Get the selected file
    var file = e.target.files[0];

    // Check if a file is selected
    if (file) {
        // Create a FileReader object
        var reader = new FileReader();

        // Set up the FileReader to read the file as a data URL
        reader.readAsDataURL(file);

        // When the FileReader has loaded the file...
        reader.onload = function() {
            // Create an image element
            var img = document.createElement('img');
            // Set the src attribute to the data URL
            img.src = reader.result;
            // Append the image to the uploadedPhotoDiv
            uploadedPhotoDiv.innerHTML = '';
            uploadedPhotoDiv.appendChild(img);
        };
    }
});

