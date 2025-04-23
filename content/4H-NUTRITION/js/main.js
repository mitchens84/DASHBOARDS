/**
 * Broccoli Sprout Growing Guide - Interactive Checklist JavaScript
 * This script handles the persistent state of checkboxes using localStorage
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all checkboxes in the document
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  // For each checkbox, load saved state and add change event listener
  checkboxes.forEach(checkbox => {
    // Load saved state from localStorage if it exists
    const id = checkbox.getAttribute('id');
    if (id && localStorage.getItem(id) === 'true') {
      checkbox.checked = true;
    }
    
    // Add event listener to save state when checkbox is changed
    checkbox.addEventListener('change', function() {
      if (id) {
        localStorage.setItem(id, this.checked);
      }
    });
  });

  // Enhance navigation links for smooth scrolling
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Update active link styling
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Scroll to target element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Set the first nav link as active by default if not already set
  if (document.querySelector('nav a.active') === null && navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }

  // Fix summary click behavior for details elements
  document.querySelectorAll('.day-section').forEach(section => {
    const summary = section.querySelector('summary');
    if (summary) {
      summary.addEventListener('click', function(e) {
        // This is just to ensure the default toggle behavior works well
        // across different browsers
      });
    }
  });

  // Print button functionality
  const printBtn = document.querySelector('.btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.print();
    });
  }

  console.log('Broccoli sprout guide initialized successfully');
});
