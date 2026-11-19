/**
 * reservation.js — The Urban Plate
 * Handles form validation, real-time UX feedback, and submission logic
 * for the #reservation-form element.
 */

'use strict';

/* ─────────────────────────────────────────────
   Constants & Config
───────────────────────────────────────────── */

/** UK / international phone number regex.
 *  Accepts formats like:
 *    07911 123456
 *    +44 7911 123456
 *    (020) 7946 0958
 *    +1-800-555-1234
 */
const PHONE_REGEX = /^(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4,}$/;

/** Minimum / maximum number of guests accepted. */
const GUEST_MIN = 1;
const GUEST_MAX = 12;

/** Milliseconds before the success banner auto-hides (0 = never). */
const SUCCESS_HIDE_DELAY_MS = 10_000;

/* ─────────────────────────────────────────────
   DOM References (populated after DOMContentLoaded)
───────────────────────────────────────────── */

let form;
let successDiv;

const FIELD_IDS = ['full-name', 'phone', 'guests', 'date', 'time'];

/* ─────────────────────────────────────────────
   Error Helpers
───────────────────────────────────────────── */

/**
 * Display an error message for a given field.
 *
 * Strategy (in priority order):
 *   1. Look for an element with id `${fieldId}-error`
 *   2. Fall back to the next sibling element that has class `.form-error`
 *
 * Also adds the `.error` class to the input and wires up aria-describedby
 * so screen readers announce the message immediately.
 *
 * @param {string} fieldId  - The id of the form input (e.g. "full-name")
 * @param {string} message  - Human-readable error text
 */
function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  if (!input) return;

  // Locate the error element
  let errorEl = document.getElementById(`${fieldId}-error`);
  if (!errorEl) {
    // Walk next siblings looking for .form-error
    let sibling = input.nextElementSibling;
    while (sibling) {
      if (sibling.classList.contains('form-error')) {
        errorEl = sibling;
        break;
      }
      sibling = sibling.nextElementSibling;
    }
  }

  if (errorEl) {
    errorEl.textContent = message;

    // Make sure the error container has role="alert" so it is announced
    // by screen readers even if it was previously empty.
    if (!errorEl.hasAttribute('role')) {
      errorEl.setAttribute('role', 'alert');
    }
    if (!errorEl.hasAttribute('aria-live')) {
      errorEl.setAttribute('aria-live', 'polite');
    }

    // Wire aria-describedby on the input so AT can navigate back to it
    input.setAttribute('aria-describedby', errorEl.id || `${fieldId}-error`);
    if (!errorEl.id) errorEl.id = `${fieldId}-error`;
  }

  // Visual indicator
  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');
}

/**
 * Clear any existing error state for a given field.
 *
 * @param {string} fieldId - The id of the form input
 */
function clearError(fieldId) {
  const input = document.getElementById(fieldId);
  if (!input) return;

  // Find the error element using the same strategy as showError
  let errorEl = document.getElementById(`${fieldId}-error`);
  if (!errorEl) {
    let sibling = input.nextElementSibling;
    while (sibling) {
      if (sibling.classList.contains('form-error')) {
        errorEl = sibling;
        break;
      }
      sibling = sibling.nextElementSibling;
    }
  }

  if (errorEl) {
    errorEl.textContent = '';
  }

  input.classList.remove('error');
  input.removeAttribute('aria-invalid');
}

/* ─────────────────────────────────────────────
   Individual Field Validators
   Each returns true if valid, false otherwise.
   Side-effect: calls showError on failure.
───────────────────────────────────────────── */

/** Validate the Full Name field. */
function validateFullName() {
  const input = document.getElementById('full-name');
  const value = input ? input.value.trim() : '';

  if (!value) {
    showError('full-name', 'Please enter your full name.');
    return false;
  }
  if (value.length < 2) {
    showError('full-name', 'Name must be at least 2 characters long.');
    return false;
  }

  clearError('full-name');
  return true;
}

/** Validate the Phone field. */
function validatePhone() {
  const input = document.getElementById('phone');
  const value = input ? input.value.trim() : '';

  if (!value) {
    showError('phone', 'Please enter your phone number.');
    return false;
  }
  if (!PHONE_REGEX.test(value)) {
    showError('phone', 'Please enter a valid phone number (e.g. +91 98765 43210 or 011 2338 0958).');
    return false;
  }

  clearError('phone');
  return true;
}

/** Validate the Guests field. */
function validateGuests() {
  const input = document.getElementById('guests');
  const raw = input ? input.value.trim() : '';
  const value = Number(raw);

  if (!raw) {
    showError('guests', 'Please enter the number of guests.');
    return false;
  }
  if (!Number.isInteger(value) || value < GUEST_MIN || value > GUEST_MAX) {
    showError('guests', `Number of guests must be between ${GUEST_MIN} and ${GUEST_MAX}.`);
    return false;
  }

  clearError('guests');
  return true;
}

/** Validate the Date field — must be today or in the future. */
function validateDate() {
  const input = document.getElementById('date');
  const value = input ? input.value : '';

  if (!value) {
    showError('date', 'Please select a date for your reservation.');
    return false;
  }

  // Compare calendar dates only (strip time component)
  const selected = new Date(value);          // parsed as local midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selected < today) {
    showError('date', 'Please choose a date that is today or in the future.');
    return false;
  }

  clearError('date');
  return true;
}

/** Validate the Time field. */
function validateTime() {
  const input = document.getElementById('time');
  const value = input ? input.value : '';

  if (!value) {
    showError('time', 'Please select a preferred time.');
    return false;
  }

  clearError('time');
  return true;
}

/* ─────────────────────────────────────────────
   Full Form Validation
───────────────────────────────────────────── */

/**
 * Run all field validators, clear stale errors first.
 * Collects results so every field is validated (not short-circuited).
 *
 * @returns {boolean} true if the entire form is valid
 */
function validateForm() {
  // Clear all existing errors before re-validating
  FIELD_IDS.forEach(clearError);

  const results = [
    validateFullName(),
    validatePhone(),
    validateGuests(),
    validateDate(),
    validateTime(),
  ];

  return results.every(Boolean);
}

/* ─────────────────────────────────────────────
   Date Input Initialisation
───────────────────────────────────────────── */

/**
 * Set the minimum selectable date on the #date input to today (YYYY-MM-DD).
 * This provides a native-UI guard in addition to JS validation.
 */
function initDateInput() {
  const dateInput = document.getElementById('date');
  if (!dateInput) return;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

/* ─────────────────────────────────────────────
   Success Banner
───────────────────────────────────────────── */

/**
 * Show the #form-success banner with a disclaimer, scroll to it,
 * and optionally hide it again after SUCCESS_HIDE_DELAY_MS.
 */
function showSuccess() {
  if (!successDiv) return;

  // Ensure the disclaimer is present in the success message
  const disclaimer = successDiv.querySelector('.demo-disclaimer');
  if (!disclaimer) {
    const note = document.createElement('p');
    note.className = 'demo-disclaimer';
    note.setAttribute('role', 'alert');
    note.textContent =
      '⚠️ This is a demo form. Your reservation request has NOT been sent to the restaurant and no table has been reserved.';
    successDiv.appendChild(note);
  }

  // Make visible
  successDiv.classList.remove('hidden');
  successDiv.removeAttribute('hidden');
  successDiv.setAttribute('aria-hidden', 'false');

  // Smooth scroll
  successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Auto-hide after delay (if configured)
  if (SUCCESS_HIDE_DELAY_MS > 0) {
    setTimeout(() => {
      successDiv.classList.add('hidden');
      successDiv.setAttribute('aria-hidden', 'true');
    }, SUCCESS_HIDE_DELAY_MS);
  }
}

/* ─────────────────────────────────────────────
   Submit Handler
───────────────────────────────────────────── */

/**
 * Handle form submission.
 * Always calls preventDefault to prevent a real HTTP request.
 *
 * @param {SubmitEvent} event
 */
function handleSubmit(event) {
  event.preventDefault();

  const isValid = validateForm();

  if (isValid) {
    // ── Valid ──────────────────────────────────
    showSuccess();
    form.reset();

    // Reset the date min attribute after reset (reset() clears the value)
    initDateInput();
  } else {
    // ── Invalid ────────────────────────────────
    // Focus the first field that now carries the .error class
    const firstErrorInput = form.querySelector('.error');
    if (firstErrorInput) {
      firstErrorInput.focus({ preventScroll: false });
    }
  }
}

/* ─────────────────────────────────────────────
   Real-time / Per-field Validation Helpers
───────────────────────────────────────────── */

/**
 * Map each field id to its dedicated validator function.
 * Used by blur and input event listeners.
 */
const FIELD_VALIDATORS = {
  'full-name': validateFullName,
  'phone':     validatePhone,
  'guests':    validateGuests,
  'date':      validateDate,
  'time':      validateTime,
};

/**
 * Attach blur and input listeners to a single field.
 *
 * - blur  → always run the validator (immediate feedback on leaving field)
 * - input → only re-validate if the field currently has an error (clears it
 *           as soon as the user fixes the value, without nagging prematurely)
 *
 * @param {string} fieldId
 */
function attachFieldListeners(fieldId) {
  const input = document.getElementById(fieldId);
  const validator = FIELD_VALIDATORS[fieldId];
  if (!input || !validator) return;

  // Validate on blur (focus-out)
  input.addEventListener('blur', () => {
    validator();
  });

  // Re-validate on every keystroke / change — but only if already in error state
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) {
      validator();
    }
  });

  // For <select> elements, also listen to 'change' instead of 'input'
  if (input.tagName === 'SELECT') {
    input.addEventListener('change', () => {
      if (input.classList.contains('error')) {
        validator();
      }
    });
  }
}

/* ─────────────────────────────────────────────
   Initialisation
───────────────────────────────────────────── */

/**
 * Wire up everything once the DOM is ready.
 */
function init() {
  form       = document.getElementById('reservation-form');
  successDiv = document.getElementById('form-success');

  if (!form) {
    // No reservation form on this page — nothing to do.
    return;
  }

  // Set the minimum date to today
  initDateInput();

  // Attach the submit handler
  form.addEventListener('submit', handleSubmit);

  // Attach real-time validation listeners to every field
  FIELD_IDS.forEach(attachFieldListeners);
}

// Run after the DOM is fully parsed
document.addEventListener('DOMContentLoaded', init);
