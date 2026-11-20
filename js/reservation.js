/**
 * reservation.js — The Urban Plate
 * Validation & submission logic for #reservation-form.
 */
'use strict';

const PHONE_REGEX = /^(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4,}$/;

function getErrorEl(fieldId) {
  const input = document.getElementById(fieldId);
  if (!input) return null;
  let el = document.getElementById(`${fieldId}-error`);
  if (!el) {
    let sib = input.nextElementSibling;
    while (sib) {
      if (sib.classList.contains('form-error')) { el = sib; break; }
      sib = sib.nextElementSibling;
    }
  }
  return el;
}

function setError(fieldId, msg) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  const err = getErrorEl(fieldId);
  if (err) {
    err.textContent = msg;
    if (!err.id) err.id = `${fieldId}-error`;
    input.setAttribute('aria-describedby', err.id);
  }
  input.classList.toggle('error', Boolean(msg));
  if (msg) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
}

const validators = {
  'full-name': (val) => {
    if (!val) return 'Please enter your full name.';
    if (val.length < 2) return 'Name must be at least 2 characters long.';
    return '';
  },
  'phone': (val) => {
    if (!val) return 'Please enter your phone number.';
    if (!PHONE_REGEX.test(val)) return 'Please enter a valid phone number (e.g. +91 98765 43210).';
    return '';
  },
  'guests': (val) => {
    const num = Number(val);
    if (!val) return 'Please enter the number of guests.';
    if (!Number.isInteger(num) || num < 1 || num > 12) return 'Number of guests must be between 1 and 12.';
    return '';
  },
  'date': (val) => {
    if (!val) return 'Please select a date for your reservation.';
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) return 'Please choose a date that is today or in the future.';
    return '';
  },
  'time': (val) => val ? '' : 'Please select a preferred time.'
};

function validateField(id) {
  const input = document.getElementById(id);
  if (!input) return true;
  const errorMsg = validators[id](input.value.trim());
  setError(id, errorMsg);
  return !errorMsg;
}

function initReservation() {
  const form = document.getElementById('reservation-form');
  const successDiv = document.getElementById('form-success');
  if (!form) return;

  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  const fields = Object.keys(validators);
  fields.forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('blur', () => validateField(id));
    const onInput = () => { if (input.classList.contains('error')) validateField(id); };
    input.addEventListener('input', onInput);
    if (input.tagName === 'SELECT') input.addEventListener('change', onInput);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = fields.map(validateField).every(Boolean);

    if (allValid) {
      if (successDiv) {
        if (!successDiv.querySelector('.demo-disclaimer')) {
          const note = document.createElement('p');
          note.className = 'demo-disclaimer';
          note.setAttribute('role', 'alert');
          note.textContent = '⚠️ This is a demo form. Your reservation request has NOT been sent to the restaurant.';
          successDiv.appendChild(note);
        }
        successDiv.classList.remove('hidden');
        successDiv.removeAttribute('hidden');
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          successDiv.classList.add('hidden');
        }, 10000);
      }
      form.reset();
      if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
    } else {
      const firstErr = form.querySelector('.error');
      if (firstErr) firstErr.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', initReservation);
