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
document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('imageUpload');
    var uploadedPhotoDiv = document.getElementById('uploadedPhoto');

    input.addEventListener('change', function(e) {
        var file = e.target.files[0];

        if (file) {
            var reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = function() {
                var img = document.createElement('img');
                img.src = reader.result;
                uploadedPhotoDiv.innerHTML = '';
                uploadedPhotoDiv.appendChild(img);
            };
        }
    });
});

