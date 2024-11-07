document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movieForm');
    const resetButton = document.getElementById('delete');
    const yearSelect = document.getElementById('year');
    const dropdownButton = document.getElementById('rate');
    const checkboxFeedback = document.querySelector('.checkbox-feedback');
    const customCheckbox = document.getElementById('customCheckbox');
    const customTextInput = document.getElementById('customTextInput');

    customCheckbox.addEventListener('change', () => {
        if (customCheckbox.checked) {
            customTextInput.disabled = false;
            customTextInput.required = true;
        } else {
            customTextInput.disabled = true;
            customTextInput.value = "";
            customTextInput.classList.remove('is-invalid', 'is-valid');
            customTextInput.required = false;
        }
    });

    for (let year = 2025; year >= 1900; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            dropdownButton.textContent = this.textContent;
            dropdownButton.dataset.selectedRate = this.textContent;
            dropdownButton.classList.remove("is-invalid");
            dropdownButton.classList.add("is-valid");
        });
    });

    function setValidationState(element, isValid) {
        element.classList.toggle('is-invalid', !isValid);
        element.classList.toggle('is-valid', isValid);
    }

    movieForm.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', () => {
            setValidationState(input, input.checkValidity());
        });
    });

    resetButton.addEventListener('click', () => {
        movieForm.reset();
        movieForm.classList.remove('was-validated');
        dropdownButton.textContent = 'Movie Rate';
        delete dropdownButton.dataset.selectedRate;
        checkboxFeedback.classList.remove('d-block');

        movieForm.querySelectorAll('.is-valid, .is-invalid').forEach(elem => {
            elem.classList.remove('is-valid', 'is-invalid');
        });

        customTextInput.disabled = true;
        customTextInput.value = "";
        customTextInput.classList.remove('is-valid', 'is-invalid');
        customCheckbox.checked = false;
    });

    movieForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let isFormValid = true;

        if (yearSelect.value === "") {
            setValidationState(yearSelect, false);
            isFormValid = false;
        } else {
            setValidationState(yearSelect, true);
        }

        if (!dropdownButton.dataset.selectedRate) {
            setValidationState(dropdownButton, false);
            isFormValid = false;
        } else {
            setValidationState(dropdownButton, true);
        }

        const checkboxes = document.querySelectorAll(".form-check-input:not(#customCheckbox)");
        const isAnyCheckboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

        if (isAnyCheckboxChecked || customCheckbox.checked) {
            checkboxFeedback.classList.remove('d-block');
            checkboxes.forEach(checkbox => checkbox.classList.remove('is-invalid'));
        } else {
            checkboxFeedback.classList.add('d-block');
            checkboxes.forEach(checkbox => checkbox.classList.add('is-invalid'));
            isFormValid = false;
        }

        if (customCheckbox.checked) {
            if (customTextInput.value.trim() === "" || !/^[A-Za-z ]+$/.test(customTextInput.value)) {
                setValidationState(customTextInput, false);
                isFormValid = false;
            } else {
                setValidationState(customTextInput, true);
            }
        }

        if (!movieForm.checkValidity() || !isFormValid) {
            event.stopPropagation();
            movieForm.classList.add("was-validated");
        } else {
            movieForm.classList.add("was-validated");

            const genreArray = Array.from(document.querySelectorAll(".form-check-input:checked"))
                .map(checkbox => {
                    return checkbox.nextElementSibling ? checkbox.nextElementSibling.textContent : '';
                });

            if (customCheckbox.checked && customTextInput.value.trim() !== "") {
                genreArray.push(customTextInput.value.trim());
            }


            const formData = {
                title: document.getElementById('title').value,
                year: parseInt(yearSelect.value),
                director: document.getElementById('director').value,
                duration: document.getElementById('duration').value + "min",
                genre: genreArray,
                rate: dropdownButton.textContent.trim(),
                poster: document.getElementById('poster').value,
            };


            console.log('formdata before post request:',formData);
            async function submitFormData() {
                try {
                    const response = await axios.post("http://localhost:3000/movies", formData);
                    console.log("Form submitted successfully", response.data);
                    document.getElementById('movieForm').reset();
                    movieForm.classList.remove('was-validated');
                    dropdownButton.textContent = 'Movie Rate';
                    delete dropdownButton.dataset.selectedRate;
                    checkboxFeedback.classList.remove('d-block');
            
                    movieForm.querySelectorAll('.is-valid, .is-invalid').forEach(elem => {
                        elem.classList.remove('is-valid', 'is-invalid');
                    });
            
                    customTextInput.disabled = true;
                    customTextInput.value = "";
                    customTextInput.classList.remove('is-valid', 'is-invalid');
                    customCheckbox.checked = false;            
                    Swal.fire({
                        icon: 'success',
                        titleText: 'Movie submitted',
                        text: 'Thank you',
                        showConfirmButton: true,
                        confirmButtonText: 'Close',
                        timer: '3000',
                    });
                } catch (error) {
                    console.error("Error submitting form", error);
                }
            }

            submitFormData();
        }
    });
});

