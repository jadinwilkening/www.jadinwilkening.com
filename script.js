// script.js

//Popup Disclaimer Message
function showPopup() {
  document.getElementById('popup-message').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup-message').style.display = 'none';
  // Store in localStorage to remember the user has seen the popup
  localStorage.setItem('popupShown', 'true');
}

window.onload = function() {
  // Check if the popup has already been shown
  if (!localStorage.getItem('popupShown')) {
      // Show the popup message after a short delay
      setTimeout(showPopup, 1000); // Adjust the delay as needed
  }
};
document.getElementById('submit-to-google-sheet').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var spinner = document.getElementById('spinner');
    spinner.style.display = 'block'; // Show the spinner
  
    var formData = new FormData(e.target);
    var data = {};
    formData.forEach((value, key) => data[key] = value);
  
    fetch('https://script.google.com/macros/s/AKfycbwPX01964cPPDcq7h5KiuIlE87TuwpCnG3T-VDoyzY2LSHL8Mcc45ZLJ0iFxOjZ8Dw_xw/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(response => {
        if (response.result === 'success') {
          // Form submission was successful
        }
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        spinner.style.display = 'none'; // Hide the spinner
        submitButton.disabled = false;
      });
    });