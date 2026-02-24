// ===== TYPING EFFECT =====
const typedEl = document.getElementById('typed');
if (typedEl) {
  const toType = ['routine.', 'skin.', 'confidence.', 'glow.'];
  let wordIndex = 0, charIndex = 0, deleting = false;
  function type() {
    const current = toType[wordIndex];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1100);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % toType.length;
      }
    }
    setTimeout(type, deleting ? 60 : 95);
  }
  type();
}


$(document).ready(function() {
 
  $('a[href*="#"]').not('[href="#"]').click(function(event) {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      event.preventDefault();
      const target = $(this.hash);
      if (target.length) {
        const offset = $('.navbar').outerHeight() || 0;
        $('html, body').animate({
          scrollTop: target.offset().top - offset
        }, 800);
      }
    }
  });

  // ===== jQUERY: MENU TOGGLE =====
  $('.menu-toggle').click(function() {
    $('.nav-links').toggleClass('active');
    $('body').toggleClass('menu-open');
    $(this).attr('aria-expanded', $('.nav-links').hasClass('active'));
  });

  $(document).click(function(e) {
    if (!$(e.target).closest('.nav-links, .menu-toggle').length) {
      $('.nav-links').removeClass('active');
      $('body').removeClass('menu-open');
      $('.menu-toggle').attr('aria-expanded', 'false');
    }
  });

// ===== jQUERY: SERVICES ACCORDION =====
$('.service-more').click(function() {
  const $card = $(this).closest('.service-card');
  const $details = $card.find('.service-details');
  
  // Close other cards
  $('.service-card').not($card).removeClass('active').find('.service-details').slideUp(400);
  
  // Toggle current card
  $card.toggleClass('active');
  $details.slideToggle(400, function() {
    // Update aria-expanded after animation completes
    $(this).closest('.service-card').find('.service-more').attr('aria-expanded', $card.hasClass('active'));
  });
});

$('.service-more').keydown(function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    $(this).trigger('click');
  }
});
// ===== BACK TO TOP =====
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // Smooth scroll to top on click
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
  // ===== jQUERY: PRODUCT FILTERS =====
 // Product filtering
$(document).on('click', '.filter-btn', function () {
    const filter = $(this).data('filter');

    // Update active button
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
        $('.product').show();
    } else {
        $('.product').hide();
        $('.product[data-category="' + filter + '"]').show();
    }
});

  // ===== jQUERY: PRODUCT HOVER EFFECT =====
  $('.product').hover(
    function() {
      $(this).addClass('product-hover');
    },
    function() {
      $(this).removeClass('product-hover');
    }
  );
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== TOOLTIP =====
const tooltip = document.getElementById('tooltip');
if (tooltip) {
  document.querySelectorAll('.ingredient').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      const info = el.dataset.info;
      if (info) {
        tooltip.textContent = info;
        tooltip.style.display = 'block';
        const rect = el.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
        tooltip.style.left = `${Math.min(Math.max(rect.left + rect.width / 2 + window.scrollX, 5), window.innerWidth - tooltip.getBoundingClientRect().width - 5)}px`;
        tooltip.style.transform = 'translateX(-50%)';
      }
    });
    el.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });
  window.addEventListener('scroll', () => tooltip.style.display = 'none');
  window.addEventListener('resize', () => tooltip.style.display = 'none');
}

// ===== TESTIMONIALS CAROUSEL =====
const track = document.getElementById('t-track');
if (track) {
  const cards = Array.from(track.children);
  let index = 0;
  let itemsPerView = 3;

  function setItemsPerView() {
    const w = window.innerWidth;
    itemsPerView = w <= 640 ? 1 : (w <= 980 ? 2 : 3);
    sizeCards();
    goTo(index);
  }

  function sizeCards() {
    if (cards.length === 0) return;
    cards.forEach(card => {
      card.style.width = `${100 / itemsPerView}%`;
    });
  }

  function goTo(i) {
    if (cards.length === 0) return;
    const maxIndex = Math.max(0, cards.length - itemsPerView);
    index = Math.min(Math.max(i, 0), maxIndex);
    const percent = -(100 / itemsPerView) * index;
    track.style.transform = `translateX(${percent}%)`;
  }

  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  if (prev) prev.addEventListener('click', () => goTo(index - 1));
  if (next) next.addEventListener('click', () => goTo(index + 1));

  window.addEventListener('resize', setItemsPerView);
  setItemsPerView();
}

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const success = document.getElementById('successMsg');
if (form && success) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = form.querySelector('#firstName').value.trim();
    const lastName = form.querySelector('#lastName').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const message = form.querySelector('#message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!firstName || !lastName) {
      success.textContent = 'Please enter both first and last name.';
      success.style.display = 'block';
      success.setAttribute('aria-hidden', 'false');
      setTimeout(() => {
        success.style.display = 'none';
        success.setAttribute('aria-hidden', 'true');
        success.textContent = 'Thank you! Your message has been sent ✨';
      }, 4000);
      return;
    }
    if (!emailRegex.test(email)) {
      success.textContent = 'Please enter a valid email address.';
      success.style.display = 'block';
      success.setAttribute('aria-hidden', 'false');
      setTimeout(() => {
        success.style.display = 'none';
        success.setAttribute('aria-hidden', 'true');
        success.textContent = 'Thank you! Your message has been sent ✨';
      }, 4000);
      return;
    }
    if (!phoneRegex.test(phone)) {
      success.textContent = 'Please enter a valid phone number.';
      success.style.display = 'block';
      success.setAttribute('aria-hidden', 'false');
      setTimeout(() => {
        success.style.display = 'none';
        success.setAttribute('aria-hidden', 'true');
        success.textContent = 'Thank you! Your message has been sent ✨';
      }, 4000);
      return;
    }
    if (!message) {
      success.textContent = 'Please enter a message.';
      success.style.display = 'block';
      success.setAttribute('aria-hidden', 'false');
      setTimeout(() => {
        success.style.display = 'none';
        success.setAttribute('aria-hidden', 'true');
        success.textContent = 'Thank you! Your message has been sent ✨';
      }, 4000);
      return;
    }
    success.style.display = 'block';
    success.setAttribute('aria-hidden', 'false');
    form.reset();
    document.querySelectorAll('.field').forEach(f => f.classList.remove('filled'));
    setTimeout(() => {
      success.style.display = 'none';
      success.setAttribute('aria-hidden', 'true');
    }, 4000);
  });
}

// ===== NEWSLETTER SUBMISSION =====
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');
if (newsletterForm && newsletterMessage) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput?.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailRegex.test(email)) {
      newsletterMessage.textContent = `Thank you! ${email.replace(/</g, '&lt;')} has been successfully subscribed to the newsletter. 🌸`;
      newsletterMessage.setAttribute('aria-hidden', 'false');
      newsletterForm.reset();
    } else {
      newsletterMessage.textContent = 'Please enter a valid email address.';
      newsletterMessage.setAttribute('aria-hidden', 'false');
    }
    setTimeout(() => {
      newsletterMessage.textContent = '';
      newsletterMessage.setAttribute('aria-hidden', 'true');
    }, 4000);
  });
}
const quizForm = document.getElementById('skin-quiz');
const quizResult = document.getElementById('quiz-result');
if (quizForm && quizResult) {
  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const skinType = document.getElementById('skin-type').value;
    const concern = document.getElementById('concern').value;

    // Expanded recommendations with new products
    const recommendations = {
      oily: {
        acne: 'Try “Velvet Cleanse” Oil and “Night Renew” Serum for gentle cleansing and skin renewal.',
        dryness: 'Use “Hydra Veil” Moisturizer and “Crystal Mist” Toner to hydrate without clogging pores.',
        dullness: 'Try “Radiant Bloom” Serum and “Crystal Mist” Toner for a brighter complexion.',
        aging: 'Use “Night Renew” Serum and “Luminous Guard” SPF 50 to reduce fine lines and protect skin.'
      },
      dry: {
        acne: 'Try “Velvet Cleanse” Oil and “Crystal Mist” Toner for gentle care and balance.',
        dryness: 'Use “Hydra Veil” Moisturizer and “Crystal Mist” Toner for deep hydration and comfort.',
        dullness: 'Try “Radiant Bloom” Serum and “Hydra Veil” Moisturizer for radiance and moisture.',
        aging: 'Use “Night Renew” Serum and “Hydra Veil” Moisturizer to nourish and reduce fine lines.'
      },
      combination: {
        acne: 'Try “Velvet Cleanse” Oil and “Radiant Bloom” Serum for balanced cleansing and clarity.',
        dryness: 'Use “Hydra Veil” Moisturizer and “Luminous Guard” SPF 50 for hydration and protection.',
        dullness: 'Try “Radiant Bloom” Serum and “Crystal Mist” Toner for an even, glowing complexion.',
        aging: 'Use “Night Renew” Serum and “Crystal Mist” Toner to smooth and balance skin.'
      },
      sensitive: {
        acne: 'Try “Velvet Cleanse” Oil and “Crystal Mist” Toner for soothing, non-irritating care.',
        dryness: 'Use “Hydra Veil” Moisturizer and “Crystal Mist” Toner for gentle hydration.',
        dullness: 'Try “Radiant Bloom” Serum and “Luminous Guard” SPF 50 for a gentle glow.',
        aging: 'Use “Night Renew” Serum and “Luminous Guard” SPF 50 for renewal without irritation.'
      }
    };

    // Validate inputs
    let result, isError = false;
    if (!skinType || !concern) {
      result = 'Please select both skin type and concern.';
      isError = true;
    } else if (!recommendations[skinType]?.[concern]) {
      result = 'No recommendations available for this combination.';
      isError = true;
    } else {
      result = recommendations[skinType][concern];
    }

    // Display result with animation
    quizResult.textContent = result;
    quizResult.classList.toggle('error', isError);
    quizResult.style.display = 'block';
    quizResult.setAttribute('aria-hidden', 'false');
    quizResult.setAttribute('aria-live', 'polite');
    quizResult.focus(); // Focus for accessibility

    // Save to localStorage
    if (!isError) {
      localStorage.setItem('quizResult', JSON.stringify({ skinType, concern, result }));
    }

    // Animate and hide result
    setTimeout(() => {
      quizResult.style.opacity = '0';
      setTimeout(() => {
        quizResult.style.display = 'none';
        quizResult.style.opacity = '1';
        quizResult.setAttribute('aria-hidden', 'true');
        quizResult.classList.remove('error');
        quizForm.reset();
        document.querySelectorAll('.quiz-field').forEach(f => f.classList.remove('filled'));
      }, 400); // Match CSS transition duration
    }, 5000); // Extended display time for better UX
  });

  // Load saved result on page load
  const savedResult = localStorage.getItem('quizResult');
  if (savedResult) {
    const { result } = JSON.parse(savedResult);
    quizResult.textContent = result;
    quizResult.style.display = 'block';
    quizResult.setAttribute('aria-hidden', 'false');
    quizResult.setAttribute('aria-live', 'polite');
    setTimeout(() => {
      quizResult.style.opacity = '0';
      setTimeout(() => {
        quizResult.style.display = 'none';
        quizResult.style.opacity = '1';
        quizResult.setAttribute('aria-hidden', 'true');
      }, 400);
    }, 5000);
  }
}
// ===== FLOATING LABELS =====
document.querySelectorAll('.field input, .field textarea, .field select').forEach(input => {
  const field = input.parentElement;
  if (field) {
    function toggle() {
      field.classList.toggle('filled', !!input.value.trim());
    }
    input.addEventListener('input', toggle);
    input.addEventListener('blur', toggle);
    toggle();
  }
});

// ===== FOOTER YEAR =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const modal = document.getElementById('quick-view-modal');
const modalContent = document.getElementById('quick-view-content');
const closeModal = document.querySelector('.modal-close');
document.querySelectorAll('.quick-view').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.dataset.product;
    const productData = {
      'cloud-gel': { name: '“Cloud Gel” Face Wash', desc: 'Gently removes impurities without tightness. With betaine & panthenol.' },
      'silk-barrier': { name: '“Silk Barrier” Cream', desc: 'Niacinamide + ceramides to restore barrier and lock in lasting moisture.' },
      'morning-glow': { name: '“Morning Glow” Vitamin C', desc: 'Stable 10% formula for an even skin tone and extra radiance.' },
      'feather-shield': { name: '“Feather Shield” SPF 50', desc: 'No white cast, lightweight, and perfect for daily wear.' },
      'reset-retinol': { name: '“Reset” Retinol 0.2%', desc: 'Gently introduces retinoids for smooth, clear skin without irritation.' },
      'rose-dew': { name: '“Rose Dew” Toner', desc: 'With hyaluronic acid and rose water for plump, refreshed skin.' },
      'cleansing-oil': { name: '“Velvet Cleanse” Oil', desc: 'Dissolves makeup and impurities while nourishing skin. With jojoba & squalane.' },
      'hydra-veil': { name: '“Hydra Veil” Moisturizer', desc: 'Hyaluronic acid + aloe vera for deep hydration and a plump, dewy finish.' },
      'radiant-bloom': { name: '“Radiant Bloom” Serum', desc: 'Peptides + ferulic acid to boost collagen and enhance skin’s glow.' },
      'luminous-guard': { name: '“Luminous Guard” SPF 50', desc: 'Broad-spectrum protection with a sheer finish, ideal for all skin tones.' },
      'night-renew': { name: '“Night Renew” Serum', desc: 'Bakuchiol + peptides to promote skin renewal and reduce fine lines.' },
      'crystal-mist': { name: '“Crystal Mist” Toner', desc: 'Witch hazel + chamomile to balance and soothe for a refreshed complexion.' }
    };
    modalContent.innerHTML = `<h3>${productData[product].name}</h3><p>${productData[product].desc}</p>`;
    modal.style.display = 'flex';
  });
});
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});




// ===== WISHLIST =====
let wishlist = JSON.parse(localStorage.getItem('glownest-wishlist') || '[]');

const productImages = {
  'cloud-gel':      './slike/cleasinggel.jpeg',
  'silk-barrier':   './slike/moisturizer.jpeg',
  'morning-glow':   './slike/vitaminc.jpeg',
  'feather-shield': './slike/spf.jpeg',
  'reset-retinol':  './slike/retinol.jpeg',
  'rose-dew':       './slike/toner.jpeg',
  'cleansing-oil':  './slike/Pure Cleansing Oil.jpeg',
  'hydra-veil':     './slike/cream.jpeg',
  'radiant-bloom':  './slike/serum.jpeg',
  'luminous-guard': './slike/spf1.jpeg',
  'night-renew':    './slike/night.jpeg',
  'crystal-mist':   './slike/crystal.jpeg'
};

const productNames = {
  'cloud-gel':      '"Cloud Gel" Face Wash',
  'silk-barrier':   '"Silk Barrier" Cream',
  'morning-glow':   '"Morning Glow" Vitamin C',
  'feather-shield': '"Feather Shield" SPF 50',
  'reset-retinol':  '"Reset" Retinol 0.2%',
  'rose-dew':       '"Rose Dew" Toner',
  'cleansing-oil':  '"Velvet Cleanse" Oil',
  'hydra-veil':     '"Hydra Veil" Moisturizer',
  'radiant-bloom':  '"Radiant Bloom" Serum',
  'luminous-guard': '"Luminous Guard" SPF 50',
  'night-renew':    '"Night Renew" Serum',
  'crystal-mist':   '"Crystal Mist" Toner'
};

function updateWishlistButtons() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const product = btn.dataset.product;
    const isWished = wishlist.includes(product);
    btn.textContent = isWished ? '\u{1F497}' : '\u{1F90D}';
    btn.title = isWished ? 'Remove from wishlist' : 'Add to wishlist';
    btn.setAttribute('aria-pressed', String(isWished));
  });
  const badge = document.getElementById('wishlist-count');
  if (badge) {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
  }
}

function renderWishlistPanel() {
  const list = document.getElementById('wishlist-items');
  if (!list) return;
  if (wishlist.length === 0) {
    list.innerHTML = '<p class="wishlist-empty">No saved items yet.<br>Click \u{1F90D} on any product!</p>';
    return;
  }
  list.innerHTML = wishlist.map(id => {
    const img = productImages[id] || '';
    const name = productNames[id] || id;
    return `<div class="wishlist-item">
      <img src="${img}" alt="${name}" />
      <span>${name}</span>
      <button class="wishlist-remove" data-product="${id}" aria-label="Remove">\u2715</button>
    </div>`;
  }).join('');
  list.querySelectorAll('.wishlist-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      wishlist = wishlist.filter(p => p !== btn.dataset.product);
      localStorage.setItem('glownest-wishlist', JSON.stringify(wishlist));
      updateWishlistButtons();
      renderWishlistPanel();
    });
  });
}

$(document).on('click', '.wishlist-btn', function (e) {
  e.stopPropagation();
  const product = $(this).data('product');
  if (wishlist.includes(product)) {
    wishlist = wishlist.filter(p => p !== product);
  } else {
    wishlist.push(product);
  }
  localStorage.setItem('glownest-wishlist', JSON.stringify(wishlist));
  updateWishlistButtons();
});

$(document).on('click', '#wishlist-icon', function () {
  const panel = $('#wishlist-panel');
  panel.toggleClass('open');
  if (panel.hasClass('open')) renderWishlistPanel();
});

$(document).on('click', '#wishlist-close', function () {
  $('#wishlist-panel').removeClass('open');
});

$(document).on('click', function (e) {
  if (!$(e.target).closest('#wishlist-panel, #wishlist-icon').length) {
    $('#wishlist-panel').removeClass('open');
  }
});

updateWishlistButtons();
