/**
 * user-menu.js
 *
 * Manages visibility of guest/user menu. If a user is logged in (data in localStorage),
 * shows the user menu with initials and handles logout.
 */
document.addEventListener('DOMContentLoaded', () => {
  const guestMenu = document.getElementById('guestMenu');
  const userMenu = document.getElementById('userMenu');
  const userAvatar = document.getElementById('userAvatar');
  const userIcon = document.getElementById('userIcon');
  const logoutBtn = document.getElementById('logoutBtn');

  if (!guestMenu || !userMenu || !userAvatar || !logoutBtn) {
    console.warn('Menu elements not found. Script will not run.');
    return;
  }

  try {
    const studentData = localStorage.getItem('primerpaso_student');

    if (studentData) {
  // User is logged in
      guestMenu.classList.add('hidden');
      userMenu.classList.remove('hidden');

      const student = JSON.parse(studentData);
      const firstName = student.firstName || '';
      const lastName = student.lastName || '';

      const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

      if (initials.trim() && userAvatar) {
        userAvatar.textContent = initials;
      } else if (userIcon) {
        // If no initials, show generic icon
        userAvatar.style.display = 'none';
        userIcon.style.display = 'block';
      }

      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('primerpaso_student');
        localStorage.removeItem('primerpaso_saved_jobs'); // Also clear saved jobs
        window.location.href = '/'; // Redirect to home
      });
    }
    // Si no hay studentData, los menús se quedan como están (invitado visible, usuario oculto).
  } catch (error) {
    console.error('Error al procesar los datos de sesión:', error);
    // En caso de error (ej. JSON malformado), no hacer nada y dejar el menú de invitado.
  }
});