const tabData = {
  home:     { desc: 'The <strong>Home</strong> tab shows quick links to Discord & GitHub, a Get Started mini-guide, Support Development with creator code, and app credits at a glance.' },
  ipa:      { desc: 'The <strong>IPA Downloads</strong> tab lets you select, preview, and download the latest Fortnite IPA with a customisable download path.' },
  patch:    { desc: 'The <strong>Fortnite Mac Patcher</strong> applies required entitlements to Fortnite\'s provisioning file entirely on-device, with live console output.' },
  update:   { desc: 'The <strong>Update Assistant</strong> (originally by altermine) watches Fortnite\'s log file and automatically downloads game chunks so you don\'t have to.' },
  assets:   { desc: 'The <strong>Game Assets</strong> tab (powered by fort-dl by Sneakyf1shy) lets you cherry-pick which Fortnite modes to download — Battle Royale, Creative, LEGO, Festival, and more.' },
  data:     { desc: 'The <strong>Data Manager</strong> shows all installed bundles, UEFN/additional maps, and total storage used — with easy deletion.' },
  faq:      { desc: 'The built-in <strong>FAQ</strong> answers the most common setup and troubleshooting questions right inside the app.' },
  settings: { desc: '<strong>Settings</strong> lets you configure download location, fort-dl paths, temp folder, Fortnite container, and notification preferences.' },
};

function showScreenshot(tab) {
  document.querySelectorAll('.screenshot-img').forEach(img => img.classList.remove('active'));

  const img = document.getElementById('ss-' + tab);
  const placeholder = document.getElementById('ss-placeholder');

  if (img) {
    const activate = () => {
      img.classList.add('active');
      placeholder.classList.add('hidden');
    };

    if (img.complete && img.naturalWidth > 0) {
      activate();
    } else {
      img.onload = activate;
      img.onerror = () => { placeholder.classList.remove('hidden'); };
      img.classList.add('active');
      placeholder.classList.add('hidden');
    }
  } else {
    placeholder.classList.remove('hidden');
  }
}

document.querySelectorAll('.stab').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    showScreenshot(tab);

    const descEl = document.getElementById('screenshotDesc');
    if (descEl && tabData[tab]) {
      descEl.innerHTML = tabData[tab].desc;
    }
  });
});

window.addEventListener('load', () => {
  const activeImg = document.getElementById('ss-home');
  const placeholder = document.getElementById('ss-placeholder');
  if (activeImg && !(activeImg.complete && activeImg.naturalWidth > 0)) {
    activeImg.onerror = () => {
      activeImg.classList.remove('active');
      placeholder.classList.remove('hidden');
    };
  } else if (activeImg && activeImg.complete && activeImg.naturalWidth > 0) {
    placeholder.classList.add('hidden');
    activeImg.classList.add('active');
  }
});

document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const wasOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').classList.remove('open');
    });

    if (!wasOpen) {
      item.classList.add('open');
      answer.classList.add('open');
    }
  });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(10,10,15,0.95)';
    navbar.style.boxShadow = '0 1px 40px rgba(0,0,0,0.5)';
  } else {
    navbar.style.background = 'rgba(10,10,15,0.7)';
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });

const observerOpts = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

const style = document.createElement('style');
style.textContent = `
  .feature-card, .step-card, .credit-card, .req-item, .faq-item {
    opacity: 0; transform: translateY(24px);
    transition: opacity .55s ease, transform .55s ease, border-color .25s, box-shadow .25s;
  }
  .feature-card.revealed, .step-card.revealed, .credit-card.revealed,
  .req-item.revealed, .faq-item.revealed {
    opacity: 1; transform: translateY(0);
  }
`;
document.head.appendChild(style);

document.querySelectorAll('.feature-card, .step-card, .credit-card, .req-item, .faq-item')
  .forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    revealObserver.observe(el);
  });
