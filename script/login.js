// Tab switching function
function switchTab(tabName, button) {
  // Hide all panels
  const panels = document.querySelectorAll(".panel");
  panels.forEach((panel) => panel.classList.remove("active"));

  // Remove active class from all buttons
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Show selected panel
  const selectedPanel = document.getElementById(tabName);
  if (selectedPanel) {
    selectedPanel.classList.add("active");
  }

  // Add active class to clicked button
  button.classList.add("active");
}

// Google sign-in handler
function handleGoogle(type) {
  console.log(`${type === "login" ? "Sign In" : "Sign Up"} with Google`);
  // Implementation would go here
  alert(`${type === "login" ? "Sign In" : "Sign Up"} with Google clicked!`);
}

// Toggle button state based on checkbox
function toggleBtn(checkboxId, btnId) {
  const checkbox = document.getElementById(checkboxId);
  const button = document.getElementById(btnId);

  if (button) {
    button.disabled = !checkbox.checked;
  }
}
