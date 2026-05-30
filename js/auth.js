/* ======================
   auth.js
   Handles user registration and login.
   Uses localStorage to store user accounts under the key 'subtrack_users'.
   The currently logged-in username is stored under 'subtrack_current_user'.

   Loaded by: login.html, register.html
   ====================== */

/* ---------- SHARED HELPERS ---------- */

/**
 * Retrieve the users array from localStorage.
 * Returns an empty array if nothing is stored yet.
 */
function getUsers() {
  return JSON.parse(localStorage.getItem('subtrack_users')) || [];
}

/**
 * Persist the users array back to localStorage.
 * @param {Array} users
 */
function saveUsers(users) {
  localStorage.setItem('subtrack_users', JSON.stringify(users));
}

/**
 * Show a feedback message inside a given element.
 * @param {HTMLElement} container
 * @param {string}      message
 * @param {'error'|'success'} type
 */
function showMessage(container, message, type) {
  if (!container) return;
  container.innerHTML = '<div class="' + type + '-msg">' + message + '</div>';
}


/* ---------- LOGIN ---------- */

(function initLogin() {
  var loginBtn = document.getElementById('loginBtn');
  if (!loginBtn) return; // Not on login page

  var msgDiv = document.getElementById('loginMessage');

  loginBtn.addEventListener('click', function () {
    var username = document.getElementById('loginUsername').value.trim();
    var password = document.getElementById('loginPassword').value;

    // Basic validation
    if (!username || !password) {
      showMessage(msgDiv, '&#10060; Please enter username and password', 'error');
      return;
    }

    // Look for a matching account
    var users = getUsers();
    var match = users.find(function (u) {
      return u.username === username && u.password === password;
    });

    if (match) {
      // Store session and redirect to dashboard
      localStorage.setItem('subtrack_current_user', username);
      window.location.href = 'index.html';
    } else {
      showMessage(msgDiv, '&#10060; Invalid username or password', 'error');
    }
  });
})();


/* ---------- REGISTER ---------- */

(function initRegister() {
  var registerBtn = document.getElementById('registerBtn');
  if (!registerBtn) return; // Not on register page

  var msgDiv = document.getElementById('regMessage');

  registerBtn.addEventListener('click', function () {
    var username = document.getElementById('regUsername').value.trim();
    var password = document.getElementById('regPassword').value;
    var confirm  = document.getElementById('regConfirm').value;

    // Validation checks
    if (!username || !password) {
      showMessage(msgDiv, '&#10060; Username and password are required', 'error');
      return;
    }

    if (password !== confirm) {
      showMessage(msgDiv, '&#10060; Passwords do not match', 'error');
      return;
    }

    if (password.length < 3) {
      showMessage(msgDiv, '&#10060; Password must be at least 3 characters', 'error');
      return;
    }

    var users = getUsers();

    // Prevent duplicate usernames
    if (users.find(function (u) { return u.username === username; })) {
      showMessage(msgDiv, '&#10060; Username already exists', 'error');
      return;
    }

    // Save new user and show success
    users.push({ username: username, password: password });
    saveUsers(users);

    showMessage(
      msgDiv,
      '&#10003; Registration successful! <a href="login.html">Login now</a>',
      'success'
    );
  });
})();