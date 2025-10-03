// Enhanced lightbox functionality for project images
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
  lightboxClose.setAttribute('aria-label', 'Fermer');
  
  const lightboxPrev = document.createElement('button');
  lightboxPrev.className = 'lightbox-nav lightbox-prev';
  lightboxPrev.innerHTML = '‹';
  lightboxPrev.setAttribute('aria-label', 'Image précédente');
  
  const lightboxNext = document.createElement('button');
  lightboxNext.className = 'lightbox-nav lightbox-next';
  lightboxNext.innerHTML = '›';
  lightboxNext.setAttribute('aria-label', 'Image suivante');
  
  const lightboxCaption = document.createElement('div');
  lightboxCaption.className = 'lightbox-caption';
  
  // Assemble lightbox elements
  lightboxContent.appendChild(lightboxImage);
  lightboxContent.appendChild(lightboxClose);
  lightboxContent.appendChild(lightboxPrev);
  lightboxContent.appendChild(lightboxNext);
  lightboxContent.appendChild(lightboxCaption);
  lightboxOverlay.appendChild(lightboxContent);
  document.body.appendChild(lightboxOverlay);
  
  // Get all project items and create image array
  const projectItems = document.querySelectorAll('.blog6_item');
  let currentImageIndex = 0;
  let currentImages = [];
  
  // Create array of visible images for navigation
  function updateVisibleImages() {
    currentImages = Array.from(projectItems)
      .filter(item => item.style.display !== 'none')
      .map(item => {
        const imageElement = item.querySelector('img');
        const categoryTag = item.querySelector('.tag.is-alternate.rea');
        return {
          src: imageElement ? imageElement.src : '',
          category: categoryTag ? categoryTag.textContent.trim() : ''
        };
      });
  }
  
  // Show image at specific index
  function showImage(index) {
    if (currentImages.length === 0) return;
    
    currentImageIndex = index;
    const imageData = currentImages[currentImageIndex];
    
    lightboxImage.src = imageData.src;
    lightboxCaption.textContent = imageData.category;
    
    // Update navigation button states
    lightboxPrev.style.display = currentImages.length > 1 ? 'flex' : 'none';
    lightboxNext.style.display = currentImages.length > 1 ? 'flex' : 'none';
  }
  
  // Add click event to each project item
  projectItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      updateVisibleImages();
      const itemIndex = Array.from(projectItems).indexOf(item);
      const visibleIndex = currentImages.findIndex(img => 
        Array.from(projectItems)[itemIndex].querySelector('img').src === img.src
      );
      
      if (visibleIndex !== -1) {
        showImage(visibleIndex);
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Navigation functions
  function showNextImage() {
    if (currentImages.length > 1) {
      const nextIndex = (currentImageIndex + 1) % currentImages.length;
      showImage(nextIndex);
    }
  }
  
  function showPrevImage() {
    if (currentImages.length > 1) {
      const prevIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
      showImage(prevIndex);
    }
  }
  
  // Close lightbox function
  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Event listeners
  lightboxClose.addEventListener('click', closeLightbox);
  
  lightboxNext.addEventListener('click', function(e) {
    e.stopPropagation();
    showNextImage();
  });
  
  lightboxPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    showPrevImage();
  });
  
  // Close lightbox when clicking outside the image
  lightboxOverlay.addEventListener('click', function(e) {
    if (e.target === lightboxOverlay) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (lightboxOverlay.classList.contains('active')) {
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          showNextImage();
          break;
        case 'ArrowLeft':
          showPrevImage();
          break;
      }
    }
  });
});
