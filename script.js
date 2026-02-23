document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // --- 2. Offer Banner Dismissal ---
    const offerBanner = document.getElementById('offerBanner');
    const closeBanner = document.getElementById('closeBanner');
    const navbar = document.getElementById('navbar');

    if (closeBanner && offerBanner) {
        closeBanner.addEventListener('click', () => {
            offerBanner.classList.add('hidden');
            if (navbar) navbar.classList.add('no-banner');
            document.body.style.paddingTop = '0';
        });
    }

    // --- 3. Navbar Background on Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }
    });

    // --- 4. Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // --- 5. Statistics Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, '');

                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc).toLocaleString();
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString() + '+';
                }
            };
            updateCount();
        });
    };

    // Use Intersection Observer to start counter when visible
    const counterSection = document.getElementById('counter-section');
    if (counterSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counterSection);
    }

    // --- 6. Pricing Tabs Logic (Single Plan) ---
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const planPrice = document.getElementById('planPrice');
    const planMeta = document.getElementById('planMeta');
    const planCoupon = document.getElementById('planCoupon');

    const planData = {
        monthly: { price: '&#8377;2,000', sub: '/mo', meta: '', coupon: '' },
        sixmonth: { price: '&#8377;11,500', sub: '/6 mo', meta: 'Save 10% &mdash; Total &#8377;11,500 for 6 months', coupon: '' },
        yearly: { price: '&#8377;23,000', sub: '/yr', meta: 'Save 20% &mdash; Total &#8377;23,000 for 1 year', coupon: '' }
    };

    function updatePlan(period) {
        const d = planData[period];
        if (!planPrice) return;

        planPrice.style.opacity = '0';
        setTimeout(() => {
            planPrice.innerHTML = `${d.price}<span>${d.sub}</span>`;
            planMeta.innerHTML = d.meta;
            if (d.coupon) {
                planCoupon.innerHTML = `<span class="coupon-label">Use code:</span> <span class="coupon-code">${d.coupon}</span>`;
                planCoupon.style.display = 'flex';
            } else {
                planCoupon.style.display = 'none';
                planCoupon.innerHTML = '';
            }
            planPrice.style.opacity = '1';
        }, 200);
    }

    pricingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            pricingTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            updatePlan(tab.getAttribute('data-period'));
        });
    });

    // Init: hide coupon on load
    if (planCoupon) planCoupon.style.display = 'none';

    // --- 7. BMI Calculator Logic ---
    const bmiForm = document.getElementById('bmiForm');
    const bmiResult = document.getElementById('bmiResult');
    const bmiValue = document.getElementById('bmiValue');
    const bmiStatus = document.getElementById('bmiStatus');

    if (bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const heightCm = document.getElementById('bmiHeight').value;
            const weightKg = document.getElementById('bmiWeight').value;

            if (heightCm > 0 && weightKg > 0) {
                const heightM = heightCm / 100;
                const bmi = (weightKg / (heightM * heightM)).toFixed(1);

                bmiValue.innerText = bmi;

                let status = '';
                let color = '';

                if (bmi < 18.5) {
                    status = 'Underweight';
                    color = '#3b82f6'; // Blue
                } else if (bmi >= 18.5 && bmi <= 24.9) {
                    status = 'Healthy Weight';
                    color = '#22c55e'; // Green
                } else if (bmi >= 25 && bmi <= 29.9) {
                    status = 'Overweight';
                    color = '#eab308'; // Yellow
                } else {
                    status = 'Obese';
                    color = 'var(--primary)'; // Red
                }

                bmiStatus.innerText = status;
                bmiStatus.style.color = color;

                bmiResult.classList.remove('hide');
            }
        });
    }

    // --- 8. Contact Form Simulation ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Message sent successfully! We will contact you soon.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.style.opacity = '1';
            }, 1000);
        });
    }

    // --- 9. Expandable Programs ---
    const programLinks = document.querySelectorAll('.program-card .link-arrow');
    programLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = e.target.closest('.program-card');
            card.classList.toggle('expanded');
            if (card.classList.contains('expanded')) {
                e.target.innerHTML = 'Read Less &uarr;';
            } else {
                e.target.innerHTML = 'Read More &rarr;';
            }
        });
    });
});

