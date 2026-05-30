/* ======================
   modal.js
   Basic open / close logic for the Add Subscription modal.
   Used on static wireframe pages that don't load simple_CRUD.js.
   Pages with simple_CRUD.js handle modal state inside that class.
   ====================== */

(function () {
  var overlay   = document.getElementById('modalOverlay');
  var openBtn   = document.getElementById('openModalBtn');
  var closeBtn  = document.getElementById('closeModalBtn');
  var cancelBtn = document.getElementById('cancelModalBtn');

  function openModal() {
    if (overlay) overlay.classList.add('is-open');
  }

  function closeModal() {
    if (overlay) overlay.classList.remove('is-open');
  }

  // Wire up open / close triggers
  if (openBtn)   openBtn.addEventListener('click', openModal);
  if (closeBtn)  closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  // Close when clicking the backdrop
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
      closeModal();
    }
  });
})();