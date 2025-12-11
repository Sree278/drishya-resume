// Minimalist Resume Interactive Functionality
document.addEventListener('DOMContentLoaded', function () {
    initializeScrollAnimations();
    // initializeMaterialEffects(); // Disabled - keeping design clean
    initializeRotatingTitle();
    initializeTypingEffect();
    // initializeThemeToggle(); // Removed - theme toggle button no longer exists
    initializeGlowEffect();
    initializeMinimalAnimations();
    initializeSkillChart();
    initializeProjectInteractions();
});

// Scroll-triggered Animations with Intersection Observer
function initializeScrollAnimations() {
    // Create Intersection Observer
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Stop observing after reveal (one-time animation)
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Add scroll-reveal class to all bento items and sections
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach(item => {
        if (!item.classList.contains('scroll-reveal')) {
            item.classList.add('scroll-reveal');
            observer.observe(item);
        }
    });

    // Add scroll-reveal to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        if (!card.classList.contains('scroll-reveal')) {
            card.classList.add('scroll-reveal');
            observer.observe(card);
        }
    });

    // Mark current role as attention card
    const currentRole = document.querySelector('.bento-item');
    if (currentRole) {
        currentRole.classList.add('attention-card');
    }
}

// Ultra-Modern Material Effects
function initializeMaterialEffects() {
    // Add utility classes to cards
    const allCards = document.querySelectorAll('.bento-item, .project-card');
    allCards.forEach((card, index) => {
        // Add layered depth to all cards
        card.classList.add('layered-depth');

        // Add metallic shine to every 4th card (less frequent)
        if (index % 4 === 0) {
            card.classList.add('metallic-shine');
        }

        // Add 3D transform to project cards only
        if (card.classList.contains('project-card')) {
            card.classList.add('transform-3d');
        }
    });

    // Add key lighting to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const parent = title.closest('.minimal-section');
        if (parent) {
            parent.classList.add('key-light-glow');
        }
    });

    // Don't add gradient mesh - keep background clean

    // Dynamic mouse-based lighting effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Apply dynamic lighting to cards
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create dynamic light spot
            this.style.setProperty('--light-x', `${x}px`);
            this.style.setProperty('--light-y', `${y}px`);

            // Add temporary glow
            this.classList.add('key-light-top');
        });

        card.addEventListener('mouseleave', function () {
            this.classList.remove('key-light-top');
        });
    });

    // Add glow pulse to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-primary');
    ctaButtons.forEach(btn => {
        btn.classList.add('glow-pulse');
    });

    // Add frosted overlay to stats cards
    const statsCards = document.querySelectorAll('.stats-card-modern, .stat-item-modern');
    statsCards.forEach(card => {
        card.classList.add('frosted-overlay');
    });
}

// Rotating Title Animation
function initializeRotatingTitle() {
    const titles = [
        'SharePoint Administrator',
        'SharePoint Developer',
        'Power Platform Expert',
        'Migration Specialist'
    ];

    const rotatingElement = document.getElementById('rotating-title');
    if (!rotatingElement) return;

    let currentIndex = 0;

    function rotateTitle() {
        rotatingElement.style.opacity = '0';
        rotatingElement.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % titles.length;
            rotatingElement.textContent = titles[currentIndex];
            rotatingElement.style.opacity = '1';
            rotatingElement.style.transform = 'translateY(0)';
        }, 300);
    }

    // Rotate every 3 seconds
    setInterval(rotateTitle, 3000);

    // Add transition styles
    rotatingElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// Cursor Reactive Glow Effect
function initializeGlowEffect() {
    const cards = document.querySelectorAll('.stat-item, .skill-category, .timeline-content, .project-card, .contact-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            localStorage.setItem('theme', 'light');
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }
    });
}

// Typing Effect for Hero
function initializeTypingEffect() {
    const text = "Drishya E";
    const element = document.getElementById('hero-typing-text');
    if (!element) return;

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        }
    }
    // Start after a small delay
    setTimeout(typeWriter, 500);
}

// Minimal Animation Initialization
function initializeMinimalAnimations() {
    // Fade in animations for all elements with .fade-in class
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    delay: index * 100,
                    easing: 'easeOutCubic'
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Subtle hover animations for interactive elements
    document.querySelectorAll('.stat-item, .skill-category, .timeline-content, .project-card, .contact-item').forEach(element => {
        element.addEventListener('mouseenter', function () {
            anime({
                targets: this,
                translateY: -5,
                boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        element.addEventListener('mouseleave', function () {
            anime({
                targets: this,
                translateY: 0,
                boxShadow: 'none', // Reset or keep original if defined in CSS
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });

    // Button hover animations
    document.querySelectorAll('.minimal-btn').forEach(button => {
        button.addEventListener('mouseenter', function () {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutCubic'
            });
        });

        button.addEventListener('mouseleave', function () {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutCubic'
            });
        });
    });
}

// Skill Chart (ECharts Radar)
function initializeSkillChart() {
    const chartDom = document.getElementById('skills-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    const option = {
        color: ['#059669'],
        tooltip: {
            trigger: 'item'
        },
        radar: {
            indicator: [
                { name: 'SharePoint Online', max: 100 },
                { name: 'SPFx', max: 100 },
                { name: 'Power Automate', max: 100 },
                { name: 'JavaScript/TS', max: 100 },
                { name: 'React', max: 100 },
                { name: 'Migration', max: 100 }
            ],
            shape: 'circle',
            splitNumber: 5,
            axisName: {
                color: '#064E3B',
                fontWeight: '500'
            },
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(5, 150, 105, 0.1)',
                        'rgba(5, 150, 105, 0.2)',
                        'rgba(5, 150, 105, 0.4)',
                        'rgba(5, 150, 105, 0.6)',
                        'rgba(5, 150, 105, 0.8)',
                        'rgba(5, 150, 105, 1)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(5, 150, 105, 0.5)'
                }
            }
        },
        series: [
            {
                name: 'Technical Proficiency',
                type: 'radar',
                data: [
                    {
                        value: [95, 85, 90, 85, 75, 95],
                        name: 'Skill Level',
                        areaStyle: {
                            color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                                {
                                    color: 'rgba(5, 150, 105, 0.5)',
                                    offset: 0
                                },
                                {
                                    color: 'rgba(5, 150, 105, 0.1)',
                                    offset: 1
                                }
                            ])
                        },
                        lineStyle: {
                            width: 2
                        },
                        symbol: 'circle',
                        symbolSize: 6
                    }
                ]
            }
        ]
    };

    // Animate chart on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                myChart.setOption(option);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(chartDom);

    // Resize chart on window resize
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// Project Interactions
function initializeProjectInteractions() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function () {
            // Add subtle click animation
            anime({
                targets: this,
                scale: [1, 0.98, 1],
                duration: 200,
                easing: 'easeOutCubic'
            });
        });
    });
}


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function () {
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutCubic'
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(updateActiveNavigation, 100);
window.addEventListener('scroll', debouncedScrollHandler);

// --- Dynamic Content Loading ---

async function fetchAndRenderData() {
    if (!supabase) {
        console.error('Supabase not initialized');
        return;
    }

    try {
        // 1. Profile
        const { data: profile } = await supabase.from('profile').select('*').single();
        if (profile) {
            updateElementText('hero-name', profile.name);
            updateElementText('hero-title', profile.title);
            updateElementText('hero-bio', profile.bio);
            updateElementText('contact-email', profile.email);
            updateElementText('contact-phone', profile.phone);
            updateElementText('contact-location', profile.location);

            const resumeBtn = document.getElementById('download-resume-btn');
            if (resumeBtn) {
                resumeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.print();
                });
                // If a URL exists, we could optionally offer it as a fallback or secondary option, 
                // but for now we prioritize the print-to-pdf feature.
            }
        }

        // 2. Experience
        const { data: experience } = await supabase.from('experience').select('*').order('display_order', { ascending: true });
        if (experience && experience.length > 0) {
            const container = document.getElementById('experience-list');
            if (container) {
                container.innerHTML = experience.map(item => `
                    <div class="timeline-item relative pl-8 pb-12 border-l-2 border-slate-200 dark:border-slate-700 last:border-0 fade-in">
                        <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900"></div>
                        <div class="timeline-content p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700">
                            <div class="flex flex-col sm:flex-row justify-between mb-2">
                                <h3 class="text-xl font-bold text-slate-900 dark:text-white">${item.role}</h3>
                                <span class="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">${item.period}</span>
                            </div>
                            <p class="text-lg font-medium text-slate-700 dark:text-slate-300 mb-3">${item.company}</p>
                            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">${item.description}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        // 3. Projects
        const { data: projects } = await supabase.from('projects').select('*').order('display_order', { ascending: true });
        if (projects && projects.length > 0) {
            const container = document.getElementById('projects-grid');
            if (container) {
                container.innerHTML = projects.map(item => `
                    <div class="project-card group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 fade-in">
                        <div class="p-8">
                            <div class="flex justify-between items-start mb-6">
                                <div class="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                                    <svg class="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                ${item.link ? `<a href="${item.link}" target="_blank" class="text-slate-400 hover:text-emerald-500 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>` : ''}
                            </div>
                            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">${item.title}</h3>
                            <p class="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">${item.description}</p>
                            <div class="flex flex-wrap gap-2">
                                ${(item.tags || []).map(tag => `<span class="px-3 py-1 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-full">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // 4. Stats
        const { data: stats } = await supabase.from('stats').select('*').order('display_order', { ascending: true });
        if (stats && stats.length > 0) {
            const container = document.getElementById('stats-container');
            if (container) {
                container.innerHTML = stats.map(item => `
                    <div class="stat-item text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 fade-in">
                        <div class="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">${item.value}</div>
                        <div class="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">${item.label}</div>
                    </div>
                `).join('');
            }
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateElementText(id, text) {
    const el = document.getElementById(id);
    if (el && text) el.textContent = text;
}

function updateActiveNavigation() {
    // Placeholder for nav update logic if needed
}