// Lightbox functionality for project images
document.addEventListener('DOMContentLoaded', function() {
  // Create lightbox elements
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';
  
  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';
  
  const lightboxImage = document.createElement('img');
  lightboxImage.className = 'lightbox-image';
  
  const lightboxClose = document.createElement('button');
  lightboxClose.className = 'lightbox-close';
  lightboxClose.innerHTML = '&times;';
  
  const lightboxCaption = document.createElement('div');
  lightboxCaption.className = 'lightbox-caption';
  
  // Assemble lightbox elements
  lightboxContent.appendChild(lightboxImage);
  lightboxContent.appendChild(lightboxClose);
  lightboxContent.appendChild(lightboxCaption);
  lightboxOverlay.appendChild(lightboxContent);
  document.body.appendChild(lightboxOverlay);
  
  // Get all project items
  const projectItems = document.querySelectorAll('.blog6_item');
  
  // Add click event to each project item
  projectItems.forEach(item => {
    item.addEventListener('click', function() {
      // Get image source
      const imageElement = item.querySelector('img');
      if (imageElement) {
        const imageSrc = imageElement.src;
        const categoryTag = item.querySelector('.tag.is-alternate.rea');
        const categoryText = categoryTag ? categoryTag.textContent.trim() : '';
        
        // Set lightbox image source and caption
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = categoryText;
        
        // Show lightbox
        lightboxOverlay.classList.add('active');
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Close lightbox when clicking the close button
  lightboxClose.addEventListener('click', function() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Close lightbox when clicking outside the image
  lightboxOverlay.addEventListener('click', function(e) {
    if (e.target === lightboxOverlay) {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
