(() => {
  'use strict';

  // Select all forms with the class 'needs-validation'
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over each form and apply custom Bootstrap validation
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();      // Prevent form submission
        event.stopPropagation();     // Stop event from bubbling
      }

      form.classList.add('was-validated'); // Add Bootstrap validation class
    }, false);
  });
})();
