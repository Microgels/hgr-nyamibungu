// document.addEventListener("DOMContentLoaded", function() {
//   console.log("[DEBUG] DOMContentLoaded event fired.");

//   /**
//    * Initializes header-related scripts: scroll effect and mobile menu.
//    */
//   function initializeHeader() {
//     console.log("[DEBUG] Initializing header scripts...");
//     const mainHeader = document.getElementById("main-header");
//     const mobileMenuButton = document.getElementById("mobile-menu-button");
//     const mobileMenu = document.getElementById("mobile-menu");

//     if (!mainHeader) {
//       console.error("[DEBUG] FATAL: main-header element not found!");
//       return;
//     }

//     const isHomepage = !!document.querySelector('.swiper-container');
//     console.log(`[DEBUG] Is Homepage? ${isHomepage}`);

//     // On non-homepages, make the header solid from the start and add body padding
//     if (!isHomepage) {
//       document.body.style.paddingTop = `${mainHeader.offsetHeight}px`;
//       mainHeader.classList.add('scrolled-static');
//     }

//     // Scroll listener for the transparent-to-solid effect
//     window.addEventListener('scroll', () => {
//       if (window.scrollY > 50) {
//         mainHeader.classList.add('scrolled');
//       } else {
//         mainHeader.classList.remove('scrolled');
//       }
//     });

//     // Mobile menu toggle
//     if (mobileMenuButton && mobileMenu) {
//       mobileMenuButton.addEventListener("click", () => {
//         mobileMenu.classList.toggle("hidden");
//       });
//       console.log("[DEBUG] Mobile menu listener attached.");
//     }
//   }

//   /**
//    * Initializes the Swiper.js carousel.
//    */
//   function initializeSwiper() {
//     console.log("[DEBUG] Attempting to initialize Swiper...");
//     const swiperContainer = document.querySelector('.swiper-container');

//     if (swiperContainer) {
//       console.log("[DEBUG] Swiper container found. Initializing...");
//       try {
//         const swiper = new Swiper('.swiper-container', {
//           loop: true,
//           effect: 'fade',
//           fadeEffect: {
//             crossFade: true
//           },
//           autoplay: {
//             delay: 5000,
//             disableOnInteraction: false,
//           },
//           pagination: {
//             el: '.swiper-pagination',
//             clickable: true,
//           },
//           navigation: {
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//           },
//         });
//         console.log("[DEBUG] Swiper initialized successfully.", swiper);
//       } catch (e) {
//         console.error("[DEBUG] FATAL: Error during Swiper initialization:", e);
//       }
//     } else {
//       console.log("[DEBUG] Swiper container not found on this page.");
//     }
//   }

//   /**
//    * Initializes GSAP ScrollTrigger for scroll animations.
//    */
//   function initializeGsapAnimations() {
//     console.log("[DEBUG] Initializing GSAP ScrollTrigger animations...");
    
//     // Register ScrollTrigger plugin
//     gsap.registerPlugin(ScrollTrigger);

//     // Fade-in-up effect for elements with .scroll-animate
//     gsap.utils.toArray(".scroll-animate").forEach((element) => {
//       gsap.fromTo(
//         element,
//         {
//           opacity: 0,
//           y: 50,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: element,
//             start: "top 80%", // Start animation when 80% of the element is in view
//             end: "bottom top",
//             toggleActions: "play none none none",
//             // markers: true, // For debugging - remove in production
//           },
//         }
//       );
//     });

//     // Optional: Hero section text animation (subtle fade in)
//     gsap.from(".swiper-slide h1", {
//       opacity: 0,
//       y: 20,
//       duration: 1,
//       ease: "power2.out",
//       delay: 0.5,
//     });
//     gsap.from(".swiper-slide p", {
//       opacity: 0,
//       y: 20,
//       duration: 1,
//       ease: "power2.out",
//       delay: 0.7,
//     });
//     gsap.from(".swiper-slide a", {
//       opacity: 0,
//       y: 20,
//       duration: 1,
//       ease: "power2.out",
//       delay: 0.9,
//     });
    
//     console.log("[DEBUG] GSAP ScrollTrigger animations initialized.");
//   }

//   /**
//    * Initializes the scroll-to-top button visibility and functionality.
//    */
//   function initializeScrollToTop() {
//     console.log("[DEBUG] Initializing scroll-to-top button...");
//     const scrollToTopButton = document.getElementById("scroll-to-top");

//     if (scrollToTopButton) {
//       window.addEventListener("scroll", () => {
//         if (window.scrollY > 200) { // Show button after scrolling 200px
//           scrollToTopButton.classList.remove("opacity-0", "invisible");
//           scrollToTopButton.classList.add("opacity-100", "visible");
//         } else {
//           scrollToTopButton.classList.remove("opacity-100", "visible");
//           scrollToTopButton.classList.add("opacity-0", "invisible");
//         }
//       });

//       scrollToTopButton.addEventListener("click", () => {
//         window.scrollTo({
//           top: 0,
//           behavior: "smooth"
//         });
//       });
//       console.log("[DEBUG] Scroll-to-top button initialized.");
//     } else {
//       console.log("[DEBUG] Scroll-to-top button not found.");
//     }
//   }


//   // --- Main Execution ---
//   initializeHeader();
//   initializeSwiper();
//   initializeGsapAnimations(); // Use new GSAP animation initializer
//   initializeScrollToTop();

// });


// GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
  // Animate elements on scroll
  gsap.registerPlugin(ScrollTrigger);

  // Animate service cards
  gsap.utils.toArray('.service-card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // Animate stats
  gsap.utils.toArray('.stat-number').forEach(stat => {
    const target = parseInt(stat.textContent);
    let count = 0;
    
    gsap.to(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 90%',
        onEnter: () => {
          const interval = setInterval(() => {
            count += Math.ceil(target / 50);
            if (count >= target) {
              count = target;
              clearInterval(interval);
            }
            stat.textContent = count + (stat.textContent.includes('+') ? '+' : 
                                      stat.textContent.includes('%') ? '%' : '');
          }, 30);
        }
      }
    });
  });

  // Parallax effect for hero section
  gsap.to('.hero-overlay', {
    scrollTrigger: {
      trigger: 'main',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: '50%',
    ease: 'none'
  });
});

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
}

// Scroll to top functionality
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        scrollToTopBtn.classList.remove('opacity-100', 'visible');
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
      }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollToTop();
  initSmoothScroll();
  
  // Logo carousel animation reset
  const logoCarousel = document.querySelector('.logo-carousel');
  if (logoCarousel) {
    logoCarousel.addEventListener('animationiteration', () => {
      // Reset position for seamless loop
      if (logoCarousel.offsetLeft <= -logoCarousel.scrollWidth / 2) {
        logoCarousel.style.transform = 'translateX(0)';
      }
    });
  }
});