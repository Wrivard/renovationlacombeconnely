// Filter functionality for realisations page
document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and project items
  const filterButtons = document.querySelectorAll('.category-filter-link');
  const projectItems = document.querySelectorAll('.blog6_item');
  
  // Function to apply filter
  function applyFilter(category) {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Find and activate the matching button
    const matchingButton = Array.from(filterButtons).find(btn => {
      const btnCategory = btn.querySelector('div').textContent.trim().toLowerCase();
      return btnCategory === category || (category === null && btnCategory === 'voir tout');
    });
    
    if (matchingButton) {
      matchingButton.classList.add('active');
    }
    
    // Show all items if "Voir tout" is clicked or no filter
    if (category === null || category === 'voir tout') {
      projectItems.forEach(item => {
        item.style.display = 'block';
      });
      return;
    }
    
    // Filter items based on category
    projectItems.forEach(item => {
      const itemCategory = item.querySelector('.tag.is-alternate.rea').textContent.trim().toLowerCase();
      
      if (itemCategory === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get category to filter by
      const category = this.querySelector('div').textContent.trim().toLowerCase();
      
      // Update URL hash without reloading the page
      if (category === 'voir tout') {
        history.pushState(null, null, ' '); // Remove hash
      } else {
        history.pushState(null, null, `#${category}`);
      }
      
      // Apply filter
      applyFilter(category);
    });
  });
  
  // Check if there's a hash in the URL for filtering
  if (window.location.hash) {
    const category = window.location.hash.substring(1); // Remove the # character
    applyFilter(category);
  } else {
    // Set "Voir tout" as active by default
    applyFilter('voir tout');
  }
  
  // Handle browser back/forward navigation
  window.addEventListener('popstate', function() {
    if (window.location.hash) {
      const category = window.location.hash.substring(1);
      applyFilter(category);
    } else {
      applyFilter('voir tout');
    }
  });
});
