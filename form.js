const validateEmails = () => {
    const emailInput = document.getElementById('emails');
    const emailString = emailInput.value;
    const emailArray = emailString.split(/[,;]+/).map(email => email.trim()).filter(email => email !== '');

    const validEmails = [];
    const invalidEntries = [];

    emailArray.forEach(entry => {
        const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let email = null;

        // Intentar extraer el correo electrónico de la entrada
        const emailMatch = entry.match(/<?([^<>@\s]+@[^<>\s]+\.[^<>\s]+)>?/);
        if (emailMatch) {
            email = emailMatch[1].trim();
            if (emailValidationRegex.test(email)) {
                validEmails.push(`<${email}>`);
            } else {
                invalidEntries.push(entry);
            }
        } else {
            // No se encontró un correo electrónico válido en la entrada
            invalidEntries.push(entry);
        }
    });

    // Actualizar el campo de texto con los correos válidos
    emailInput.value = validEmails.join('; ');

    // Mostrar los correos inválidos en la caja
    const invalidEmailsBox = document.getElementById('invalidEmailsBox');
    if (invalidEntries.length > 0) {
        invalidEmailsBox.innerText = invalidEntries.join('; ');
    } else {
        invalidEmailsBox.innerText = 'No hay correos inválidos.';
    }
};

document.getElementById('validateButton').addEventListener('click', validateEmails);
