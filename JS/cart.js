
    // ========================================
    // CART BADGE UPDATE FUNCTION
    // This function updates the cart notification badge
    // It reads from localStorage and displays total item count
    // ========================================
    function updateCartBadge() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const badge = document.getElementById("cartBadge");
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      
      if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = "flex";
        // Add pop animation when badge appears
        badge.classList.add('pop');
        setTimeout(() => badge.classList.remove('pop'), 400);
      } else {
        badge.style.display = "none";
      }
    }

    // Call on page load to show existing cart items
    updateCartBadge();

    // Image Gallery & Thumbnails
    const thumbs = document.querySelectorAll('.thumb');
    const currentImage = document.getElementById('currentImage');
    const imageWrapper = document.getElementById('imageWrapper');
    const zoomToggle = document.getElementById('zoomToggle');
    let isZoomed = false;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        document.querySelector('.thumb.active')?.classList.remove('active');
        thumb.classList.add('active');
        currentImage.style.opacity = '0';
        setTimeout(() => {
          currentImage.src = thumb.src;
          currentImage.style.opacity = '1';
        }, 200);
      });
    });

    // Zoom functionality
    zoomToggle.addEventListener('click', () => {
      isZoomed = !isZoomed;
      if (isZoomed) {
        imageWrapper.classList.add('zoom-active');
        zoomToggle.innerHTML = '<i class="fas fa-search-minus"></i>';
      } else {
        imageWrapper.classList.remove('zoom-active');
        zoomToggle.innerHTML = '<i class="fas fa-search-plus"></i>';
      }
    });

    // Quantity Controls
    const quantityInput = document.getElementById('quantityInput');
    const increaseBtn = document.getElementById('increaseBtn');
    const decreaseBtn = document.getElementById('decreaseBtn');

    increaseBtn.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      if (value < 99) {
        quantityInput.value = value + 1;
      }
    });

    decreaseBtn.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });

    // Wishlist Button
    const wishlistBtn = document.getElementById('wishlistBtn');
    let isWishlisted = false;
    wishlistBtn.addEventListener('click', () => {
      isWishlisted = !isWishlisted;
      if (isWishlisted) {
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
        wishlistBtn.style.color = '#ef4444';
      } else {
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        wishlistBtn.style.color = '';
      }
    });

    // Share Button
    const shareBtn = document.getElementById('shareBtn');
    shareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: 'Premium Medical Stethoscope',
          text: 'Check out this amazing stethoscope!',
          url: window.location.href
        });
      } else {
        alert('Product URL copied to clipboard!');
      }
    });

    // Tabs System
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
      });
    });

    // Recommendations Carousel
    const recoTrack = document.getElementById('recoTrack');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    scrollLeftBtn.addEventListener('click', () => {
      recoTrack.scrollBy({ left: -280, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
      recoTrack.scrollBy({ left: 280, behavior: 'smooth' });
    });

    // Drag to scroll
    let isDragging = false;
    let startX;
    let scrollLeft;

    recoTrack.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - recoTrack.offsetLeft;
      scrollLeft = recoTrack.scrollLeft;
      recoTrack.style.cursor = 'grabbing';
    });

    recoTrack.addEventListener('mouseleave', () => {
      isDragging = false;
      recoTrack.style.cursor = 'grab';
    });

    recoTrack.addEventListener('mouseup', () => {
      isDragging = false;
      recoTrack.style.cursor = 'grab';
    });

    recoTrack.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - recoTrack.offsetLeft;
      const walk = (x - startX) * 2;
      recoTrack.scrollLeft = scrollLeft - walk;
    });

    // Prevent link click during drag
    let moving = false;
    recoTrack.addEventListener('mousedown', () => { moving = false; });
    recoTrack.addEventListener('mousemove', () => { moving = true; });
    recoTrack.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', e => { if (moving) e.preventDefault(); });
    });

  
    function addToCart(name, price) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let existingItem = cart.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          name: name,
          price: price,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // Update badge with animation (no flying product)
      updateCartBadge();
      
      // Button feedback
      const btn = document.getElementById('addToCartBtn');
      const originalContent = btn.innerHTML;
      btn.innerHTML = '<span><i class="fas fa-check"></i> Added to Cart!</span>';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      
      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.style.background = '';
      }, 2000);
    }