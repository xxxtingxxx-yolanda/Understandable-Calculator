const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const reveals = [...document.querySelectorAll('.reveal')];
const chapters = [...document.querySelectorAll('.chapter[data-stage]')];
const navLinks = [...document.querySelectorAll('#quickNav a[data-stage]')];
const progressFill = document.getElementById('progressFill');
const projectLinks = {
  0: { href: 'https://xxxtingxxx-yolanda.github.io/my-portfolio/', label: '访问个人落地页' },
  1: { href: './project-detail.html?stage=1', label: '查看 ofd2pdf 项目页' },
  2: { href: './project-detail.html?stage=2', label: '查看相册项目页' },
  3: { href: './project-detail.html?stage=3', label: '查看食遇记项目页' },
  4: { href: './project-detail.html?stage=4', label: '查看导师筛选项目页' },
  5: { href: './project-detail.html?stage=5', label: '查看样机工具项目页' },
  6: { href: './project-detail.html?stage=6', label: '查看论文工作流项目页' },
  7: { href: './project-detail.html?stage=7', label: '查看教材工作流项目页' },
  8: { href: './project-detail.html?stage=8', label: '查看 AI 计划大师项目页' },
};

document.body.classList.add('motion-ready');

function setActiveStage(stageIndex) {
  chapters.forEach((chapter, index) => {
    chapter.classList.toggle('is-active', index === stageIndex);
  });

  navLinks.forEach((link) => {
    const active = Number(link.dataset.stage) === stageIndex;
    link.classList.toggle('active', active);
  });

  if (progressFill) {
    const maxIndex = Math.max(0, chapters.length - 1);
    const pct = maxIndex === 0 ? 100 : (stageIndex / maxIndex) * 100;
    progressFill.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  }

}

function bindNavEvents() {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function injectProjectLinks() {
  chapters.forEach((chapter, index) => {
    const info = chapter.querySelector('.chapter-grid > div:last-child');
    if (!info) return;
    const data = projectLinks[index] || { href: `./project-detail.html?stage=${index}`, label: '查看项目页' };

    let row = info.querySelector('.card-link-row');
    if (!row) {
      row = document.createElement('p');
      row.className = 'card-link-row';
      info.appendChild(row);
    }

    let link = row.querySelector('.card-link');
    if (!link) {
      link = document.createElement('a');
      link.className = 'card-link';
      row.appendChild(link);
    }

    link.href = data.href;
    link.textContent = data.label;
    if (index === 0) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.removeAttribute('target');
      link.removeAttribute('rel');
    }
  });
}

function initFallbackAnimation() {
  if (!('IntersectionObserver' in window)) {
    reveals.forEach((item) => item.classList.add('is-visible'));
    setActiveStage(0);
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  const chapterObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visible.length) return;
      const stageIndex = Number(visible[0].target.dataset.stage || 0);
      setActiveStage(stageIndex);
    },
    {
      threshold: [0.2, 0.35, 0.52, 0.7],
      rootMargin: '-20% 0px -42% 0px',
    }
  );

  chapters.forEach((chapter) => chapterObserver.observe(chapter));
  setActiveStage(0);
}

function initGsapAnimation() {
  const gsapApi = window.gsap;
  const scrollTriggerApi = window.ScrollTrigger;

  gsapApi.registerPlugin(scrollTriggerApi);

  reveals.forEach((item) => item.classList.add('is-visible'));
  setActiveStage(0);

  gsapApi.to('.shape-a', {
    x: 30,
    y: 20,
    duration: 13,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsapApi.to('.shape-b', {
    x: -36,
    y: 18,
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  const heroTl = gsapApi.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('.eyebrow', { autoAlpha: 0, y: 26, duration: 0.52 })
    .from('.hero h1', { autoAlpha: 0, y: 36, duration: 0.72 }, '-=0.24')
    .from('.lead', { autoAlpha: 0, y: 24, duration: 0.58 }, '-=0.28')
    .from('.hero-meta span', { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.35 }, '-=0.2')
    .from('.hero-right', { autoAlpha: 0, x: 28, duration: 0.62 }, '-=0.64')
    .from('.portfolio-jump', { autoAlpha: 0, y: 10, duration: 0.32 }, '-=0.25');

  gsapApi.from('.manifesto article', {
    autoAlpha: 0,
    y: 28,
    duration: 0.72,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.manifesto',
      start: 'top 82%',
      once: true,
    },
  });

  gsapApi.from('.manifesto li', {
    autoAlpha: 0,
    y: 20,
    stagger: 0.08,
    duration: 0.45,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.manifesto',
      start: 'top 80%',
      once: true,
    },
  });

  gsapApi.from('.nav-box', {
    autoAlpha: 0,
    x: -20,
    duration: 0.72,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.layout',
      start: 'top 86%',
      once: true,
    },
  });

  chapters.forEach((chapter, index) => {
    const image = chapter.querySelector('img');
    const chips = chapter.querySelectorAll('.chips span');

    gsapApi.from(chapter, {
      autoAlpha: 0,
      y: 76,
      rotateX: 8,
      duration: 0.82,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: chapter,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    if (chips.length) {
      gsapApi.from(chips, {
        autoAlpha: 0,
        y: 14,
        stagger: 0.05,
        duration: 0.34,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: chapter,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    if (image) {
      gsapApi.fromTo(
        image,
        { scale: 1.16, filter: 'saturate(1.16) contrast(1.06)' },
        {
          scale: 1,
          filter: 'saturate(1.06) contrast(1.02)',
          ease: 'none',
          scrollTrigger: {
            trigger: chapter,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.65,
          },
        }
      );
    }

    scrollTriggerApi.create({
      trigger: chapter,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveStage(index),
      onEnterBack: () => setActiveStage(index),
    });
  });

  const firstChapter = chapters[0];
  const lastChapter = chapters[chapters.length - 1];

  if (firstChapter && lastChapter && progressFill) {
    scrollTriggerApi.create({
      trigger: firstChapter,
      start: 'top center',
      endTrigger: lastChapter,
      end: 'bottom center',
      onUpdate: (self) => {
        const value = Math.max(0, Math.min(1, self.progress));
        progressFill.style.width = `${(value * 100).toFixed(2)}%`;
      },
    });
  }

  gsapApi.from('.action', {
    autoAlpha: 0,
    y: 26,
    duration: 0.68,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.action',
      start: 'top 84%',
      once: true,
    },
  });
}

injectProjectLinks();
bindNavEvents();

if (prefersReducedMotion) {
  reveals.forEach((item) => item.classList.add('is-visible'));
  setActiveStage(0);
} else if (window.gsap && window.ScrollTrigger) {
  initGsapAnimation();
} else {
  initFallbackAnimation();
}
