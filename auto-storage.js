import dashboardStorage from './storage-manager.js';

/**
 * AutoStorage - Automatically handles storage for all dashboard elements
 */
class AutoStorage {
  constructor() {
    this.dashboardId = this.detectDashboardId();
    this.setupMutationObserver();
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }
  
  // Detect dashboard ID from filename, URL, or document title
  detectDashboardId() {
    // Try to get from current script path
    const scriptPath = document.currentScript?.src?.split('/').pop()?.replace('.js', '');
    if (scriptPath && scriptPath !== 'auto-storage') {
      return scriptPath;
    }
    
    // Try from page URL
    const urlPath = window.location.pathname.split('/').pop()?.replace('.html', '');
    if (urlPath) {
      return urlPath;
    }
    
    // Fallback to document title or fixed string
    return document.title ? document.title.toLowerCase().replace(/\s+/g, '-') : 'dashboard';
  }
  
  // Initialize storage
  init() {
    console.log(`AutoStorage initialized for "${this.dashboardId}"`);
    
    // Load saved state
    const savedState = dashboardStorage.loadDashboard(this.dashboardId, {});
    
    // Apply saved state if exists
    if (Object.keys(savedState).length > 0) {
      this.applyState(savedState);
    }
    
    // Set up listeners for all interactive elements
    this.setupEventListeners();
  }
  
  // Watch for DOM changes to attach event listeners to new elements
  setupMutationObserver() {
    const observer = new MutationObserver(mutations => {
      let shouldUpdateListeners = false;
      
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          shouldUpdateListeners = true;
        }
      });
      
      if (shouldUpdateListeners) {
        this.setupEventListeners();
      }
    });
    
    // Start observing once DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, { childList: true, subtree: true });
      });
    } else {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
  
  // Add event listeners to all interactive elements
  setupEventListeners() {
    // Checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      if (!checkbox.hasAttribute('data-storage-bound')) {
        checkbox.setAttribute('data-storage-bound', 'true');
        checkbox.addEventListener('change', () => this.saveCurrentState());
      }
    });
    
    // Text inputs and textareas
    document.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(input => {
      if (!input.hasAttribute('data-storage-bound')) {
        input.setAttribute('data-storage-bound', 'true');
        input.addEventListener('change', () => this.saveCurrentState());
        input.addEventListener('blur', () => this.saveCurrentState());
      }
    });
    
    // Select dropdowns
    document.querySelectorAll('select').forEach(select => {
      if (!select.hasAttribute('data-storage-bound')) {
        select.setAttribute('data-storage-bound', 'true');
        select.addEventListener('change', () => this.saveCurrentState());
      }
    });
    
    // Radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      if (!radio.hasAttribute('data-storage-bound')) {
        radio.setAttribute('data-storage-bound', 'true');
        radio.addEventListener('change', () => this.saveCurrentState());
      }
    });
    
    // Collapsible sections (if they have a standard class)
    document.querySelectorAll('.collapsible, .accordion, [data-collapsible]').forEach(section => {
      if (!section.hasAttribute('data-storage-bound')) {
        section.setAttribute('data-storage-bound', 'true');
        section.addEventListener('toggle', () => this.saveCurrentState());
      }
    });
  }
  
  // Collect all form data
  collectCurrentState() {
    const state = {
      checkboxes: {},
      inputs: {},
      selects: {},
      radios: {},
      collapsibles: {}
    };
    
    // Checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      const id = this.getElementIdentifier(checkbox);
      if (id) {
        state.checkboxes[id] = checkbox.checked;
      }
    });
    
    // Text inputs and textareas
    document.querySelectorAll('input[type="text"], input[type="number"], textarea').forEach(input => {
      const id = this.getElementIdentifier(input);
      if (id) {
        state.inputs[id] = input.value;
      }
    });
    
    // Select dropdowns
    document.querySelectorAll('select').forEach(select => {
      const id = this.getElementIdentifier(select);
      if (id) {
        state.selects[id] = select.value;
      }
    });
    
    // Radio buttons
    document.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
      const name = radio.name;
      if (name) {
        state.radios[name] = radio.value;
      }
    });
    
    // Collapsible sections
    document.querySelectorAll('.collapsible, .accordion, [data-collapsible]').forEach(section => {
      const id = this.getElementIdentifier(section);
      if (id) {
        state.collapsibles[id] = !section.classList.contains('collapsed');
      }
    });
    
    return state;
  }
  
  // Apply state to all elements
  applyState(state) {
    // Apply checkbox states
    for (const [id, isChecked] of Object.entries(state.checkboxes || {})) {
      const checkbox = this.findElementById(id);
      if (checkbox) {
        checkbox.checked = isChecked;
      }
    }
    
    // Apply input values
    for (const [id, value] of Object.entries(state.inputs || {})) {
      const input = this.findElementById(id);
      if (input) {
        input.value = value;
      }
    }
    
    // Apply select values
    for (const [id, value] of Object.entries(state.selects || {})) {
      const select = this.findElementById(id);
      if (select) {
        select.value = value;
      }
    }
    
    // Apply radio button selections
    for (const [name, value] of Object.entries(state.radios || {})) {
      const radio = document.querySelector(`input[type="radio"][name="${name}"][value="${value}"]`);
      if (radio) {
        radio.checked = true;
      }
    }
    
    // Apply collapsible states
    for (const [id, isExpanded] of Object.entries(state.collapsibles || {})) {
      const section = this.findElementById(id);
      if (section) {
        if (isExpanded) {
          section.classList.remove('collapsed');
        } else {
          section.classList.add('collapsed');
        }
      }
    }
  }
  
  // Get a unique identifier for an element
  getElementIdentifier(element) {
    return element.id || element.name || element.getAttribute('data-id');
  }
  
  // Find element by various identifiers
  findElementById(id) {
    return document.getElementById(id) || 
           document.querySelector(`[name="${id}"]`) || 
           document.querySelector(`[data-id="${id}"]`);
  }
  
  // Save current state
  saveCurrentState() {
    const state = this.collectCurrentState();
    dashboardStorage.saveDashboard(this.dashboardId, state);
    console.log(`Saved state for "${this.dashboardId}"`);
  }
}

// Initialize auto-storage
const autoStorage = new AutoStorage();

export default autoStorage;
