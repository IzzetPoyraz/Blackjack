const form = document.querySelector('form');
const playersField = document.querySelector('input[name="players"]');
const errPlayers = document.querySelector('#players-valid');

const resetErrors = () => {
    errPlayers.style.display = 'none';
};

const resetForm = () => {
    playersField.value = '';
};

const setError = (element, message) => {
    console.log(element);
    element.style.display = 'block';
    element.innerText = message;
};

const checkOnLostFocus = e => {
    if (e.target.value.length === 0) {
      setError(errPlayers, 'Aantal spelers is verplicht!');
    }
};


form.addEventListener('submit', e => {
    e.preventDefault();
    resetErrors();
    const isValid = validateForm();
    if (isValid) {
        resetForm();
        console.log(Array.from(new FormData(form)));
        const formData = new FormData(form);
        const value = formData.values();
        console.log(value);
    }
});

playersField.addEventListener('focusout', checkOnLostFocus);

const validateForm = () => {
    let isValid = true;

    if (playersField.value !== '' && isNaN(playersField.value)) {
      setError(errZipCode, 'Aantal spelers moet een geldig getal zijn');
      isValid = false;
    }

    return isValid;
};