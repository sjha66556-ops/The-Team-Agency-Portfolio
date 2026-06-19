import { showFormStatus } from './render.js';

const form = document.getElementById('contactForm');
const rules = {
  name: {
    validate: (value) => value.trim().length >= 2,
    message: 'Please enter a name (at least 2 letters).'
  },
  email: {
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address.'
  },
  message: {
    validate: (value) => value.trim().length >= 10,
    message: 'Your message must be at least 10 characters long.'
  }
};

function validateField(field) {
  const input = form.elements[field];
  const errorElement = form.querySelector(`[data-error-for="${field}"]`);
  if (!input) return true;

  const value = input.value || '';
  const rule = rules[field];
  const valid = rule.validate(value);

  if (valid) {
    input.classList.remove('input-invalid');
    input.classList.add('input-valid');
    input.setAttribute('aria-invalid', 'false');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  } else {
    input.classList.remove('input-valid');
    input.classList.add('input-invalid');
    input.setAttribute('aria-invalid', 'true');
    if (errorElement) {
      errorElement.textContent = rule.message;
      errorElement.style.display = 'block';
    }
  }
  return valid;
}

function validateForm() {
  let isAllValid = true;
  Object.keys(rules).forEach((field) => {
    const isValid = validateField(field);
    if (!isValid) isAllValid = false;
  });
  return isAllValid;
}

function handleSubmit(event) {
  event.preventDefault();
  showFormStatus(''); // Reset previous messages
  
  const valid = validateForm();
  
  if (!valid) {
    showFormStatus('Could not send. Please check the fields highlighted above.', true);
    
    // Add visual feedback (shake effect) to the form panel
    const formPanel = form.closest('.contact-panel');
    if (formPanel) {
      formPanel.classList.remove('shake');
      void formPanel.offsetWidth; // Trigger reflow to restart the keyframe animation
      formPanel.classList.add('shake');
      setTimeout(() => formPanel.classList.remove('shake'), 600);
    }
    return;
  }

  showFormStatus('Message received! We will be in touch shortly.');
  
  // Clean up input visual states
  Object.keys(rules).forEach((field) => {
    const input = form.elements[field];
    if (input) {
      input.classList.remove('input-valid', 'input-invalid');
      input.removeAttribute('aria-invalid');
    }
  });

  form.reset();
}

export function initForm() {
  if (!form) return;

  // Add validation checks in real time as the user inputs characters
  form.addEventListener('input', (event) => {
    const fieldName = event.target.name;
    if (fieldName && rules[fieldName]) {
      validateField(fieldName);
      
      // If the whole form is valid, clear the banner error status
      const valid = Object.keys(rules).every((field) => {
        const input = form.elements[field];
        return input ? rules[field].validate(input.value || '') : false;
      });
      
      if (valid) {
        showFormStatus('');
      }
    }
  });

  form.addEventListener('submit', handleSubmit);
}
