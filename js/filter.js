// Client-side filter functionality - no navigation, query string only
document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and project items
  const filterButtons = document.querySelectorAll('.category-filter-link');
  const projectItems = document.querySelectorAll('.blog6_item');
  
  // Function to apply filter based on category
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
  
  // Function to update URL with query parameter (no page reload)
  function updateURL(filterValue) {
    const url = new URL(window.location.href);
    if (filterValue === 'voir tout' || filterValue === null) {
      url.searchParams.delete('filter');
    } else {
      url.searchParams.set('filter', filterValue);
    }
    history.replaceState(null, '', url.toString());
  }
  
  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent any navigation
      
      // Get category to filter by
      const category = this.querySelector('div').textContent.trim().toLowerCase();
      
      // Update URL with query parameter
      updateURL(category);
      
      // Apply filter
      applyFilter(category);
    });
  });
  
  // Read query parameter on page load and apply filter
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');
  
  if (filterParam) {
    applyFilter(filterParam);
  } else {
    // Set "Voir tout" as active by default
    applyFilter('voir tout');
  }
  
  // Handle browser back/forward navigation
  window.addEventListener('popstate', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam) {
      applyFilter(filterParam);
    } else {
      applyFilter('voir tout');
    }
  });
});
