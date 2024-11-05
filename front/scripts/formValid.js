document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movieForm');
    const yearSelect = document.getElementById('yearSelect');

    for (let year = 2024; year >= 1900; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    const inputs = movieForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            }
        });
    });

    const resetButton = document.getElementById('delete');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            movieForm.reset();
            movieForm.classList.remove('was-validated');
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });
        });
    }

    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const dropdownButton = document.getElementById('rate');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            dropdownButton.textContent = this.textContent;
        });
    });

    setupFormValidation();
});

function setupFormValidation() {
    "use strict";

    const forms = document.querySelectorAll(".needs-validation");
    forms.forEach(form => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();  

            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add("was-validated");
            } else {
                form.classList.add("was-validated");

                const formData = {
                    movieTitle: document.getElementById('movieTitle').value,
                    yearSelect: document.getElementById('yearSelect').value,
                    director: document.getElementById('director').value,
                    duration: document.getElementById('duration').value,
                    genre: Array.from(document.querySelectorAll(".form-check-input:checked"))
                        .map(checkbox => checkbox.nextElementSibling.textContent),
                    rate: document.getElementById('rate').textContent.trim(),
                    moviePoster: document.getElementById('inputGroupFile01').files[0]
                };

                try {
                    console.log("Attempting to make a POST request...");
                    const response = await axios.post("http://localhost:3000/movies", formData, {
                    });
                    console.log("Data posted successfully:", response.data);
                } catch (error) {
                    console.error("Error posting data:", error.message);
                }
            }
        });
    });
}
            
