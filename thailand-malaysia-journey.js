import './auto-storage.js';
import dashboardStorage from './storage-manager.js';

// Define a unique ID for this dashboard
const DASHBOARD_ID = 'thailand-malaysia-journey';

// Initialize or load the dashboard state
function initDashboardState() {
  // Define default state based on current DOM structure
  const defaultState = collectCurrentState();
  
  // Load saved state or use defaults
  const state = dashboardStorage.loadDashboard(DASHBOARD_ID, defaultState);
  
  // Apply the state to your dashboard elements
  applyState(state);
  
  // Set up listeners to save state changes
  setupStateChangeListeners();
}

// Collect current state from DOM
function collectCurrentState() {
  const state = {
    expandedSections: {},
    checkboxStates: {},
    inputValues: {},
    selectedOptions: {}
  };
  
  // Collect expanded/collapsed sections
  document.querySelectorAll('.collapsible').forEach(section => {
    if (section.id) {
      state.expandedSections[section.id] = !section.classList.contains('collapsed');
    }
  });
  
  // Collect checkbox states
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.id || checkbox.name) {
      const key = checkbox.id || checkbox.name;
      state.checkboxStates[key] = checkbox.checked;
    }
  });
  
  // Collect input values
  document.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(input => {
    if (input.id || input.name) {
      const key = input.id || input.name;
      state.inputValues[key] = input.value;
    }
  });
  
  // Collect select options
  document.querySelectorAll('select').forEach(select => {
    if (select.id || select.name) {
      const key = select.id || select.name;
      state.selectedOptions[key] = select.value;
    }
  });
  
  return state;
}

// Apply state to DOM elements
function applyState(state) {
  // Apply expanded/collapsed sections
  for (const [id, isExpanded] of Object.entries(state.expandedSections || {})) {
    const section = document.getElementById(id);
    if (section) {
      if (isExpanded) {
        section.classList.remove('collapsed');
      } else {
        section.classList.add('collapsed');
      }
    }
  }
  
  // Apply checkbox states
  for (const [id, isChecked] of Object.entries(state.checkboxStates || {})) {
    const checkbox = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
    if (checkbox) {
      checkbox.checked = isChecked;
    }
  }
  
  // Apply input values
  for (const [id, value] of Object.entries(state.inputValues || {})) {
    const input = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
    if (input) {
      input.value = value;
    }
  }
  
  // Apply select options
  for (const [id, value] of Object.entries(state.selectedOptions || {})) {
    const select = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
    if (select) {
      select.value = value;
    }
  }
}

// Save state when changes happen
function setupStateChangeListeners() {
  // Handle collapsible sections
  document.querySelectorAll('.collapsible').forEach(section => {
    if (section.id) {
      section.addEventListener('toggle', saveCurrentState);
    }
  });
  
  // Handle checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.id || checkbox.name) {
      checkbox.addEventListener('change', saveCurrentState);
    }
  });
  
  // Handle inputs
  document.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(input => {
    if (input.id || input.name) {
      input.addEventListener('change', saveCurrentState);
      input.addEventListener('blur', saveCurrentState);
    }
  });
  
  // Handle selects
  document.querySelectorAll('select').forEach(select => {
    if (select.id || select.name) {
      select.addEventListener('change', saveCurrentState);
    }
  });
}

// Save current state to storage
function saveCurrentState() {
  const currentState = collectCurrentState();
  dashboardStorage.saveDashboard(DASHBOARD_ID, currentState);
}

// Call initialization when document is ready
document.addEventListener('DOMContentLoaded', initDashboardState);
