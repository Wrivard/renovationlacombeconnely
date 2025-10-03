// Filter functionality for realisations page
document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and project items
  const filterButtons = document.querySelectorAll('.category-filter-link');
  const projectItems = document.querySelectorAll('.blog6_item');
  
  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get category to filter by
      const category = this.querySelector('div').textContent.trim().toLowerCase();
      
      // Show all items if "Voir tout" is clicked
      if (category === 'voir tout') {
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
    });
  });
  
  // Set "Voir tout" as active by default and trigger its click event
  const showAllButton = document.querySelector('.category-filter-link:first-child');
  if (showAllButton) {
    showAllButton.classList.add('active');
  }
  
  // Check if there's a hash in the URL for filtering
  if (window.location.hash) {
    const category = window.location.hash.substring(1); // Remove the # character
    const matchingButton = Array.from(filterButtons).find(btn => {
      const btnCategory = btn.querySelector('div').textContent.trim().toLowerCase();
      return btnCategory === category;
    });
    
    if (matchingButton) {
      matchingButton.click();
    }
  }
});
