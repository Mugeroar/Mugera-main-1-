// app.js - Shared functionality for all pages
const App = {
    // Initialize the app
    init: function() {
        this.setupSaveButtons();
        this.setupPostTimes();
        this.setupNavigation();
        this.setupVideoControls();
        this.setupEventFiltering();
        this.setupLibraryFeatures();
        this.setupSearchFunctionality();
        this.setupSubscriptionButtons();
        this.setupContactButtons();
        this.setupAnimations();
    },

    // Save button functionality (Home page)
    setupSaveButtons: function() {
        document.querySelectorAll('.save-btn').forEach(button => {
            button.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    this.classList.add('active');
                    this.title = 'Remove from saved';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    this.classList.remove('active');
                    this.title = 'Save post';
                }
            });
        });
    },

    // Post timestamp functionality (Home page)
    setupPostTimes: function() {
        const postDates = {
            'post-1': new Date('2025-11-15'),
            'post-2': new Date('2025-11-15'),
            'post-3': new Date('2025-11-15')
        };

        function updatePostTimes() {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            Object.keys(postDates).forEach(postId => {
                const postDate = new Date(postDates[postId]);
                const postDay = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());
                const timeElement = document.getElementById(`${postId}-time`);
                
                if (timeElement) {
                    const diffTime = today - postDay;
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (diffDays === 0) {
                        timeElement.textContent = 'TODAY';
                    } else if (diffDays === 1) {
                        timeElement.textContent = '1 DAY AGO';
                    } else {
                        timeElement.textContent = `${diffDays} DAYS AGO`;
                    }
                }
            });
        }

        updatePostTimes();
    },

    // Navigation setup (All pages)
    setupNavigation: function() {
        // Scroll to element if URL has hash
        if (window.location.hash) {
            const element = document.querySelector(window.location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Set active nav item based on current page
        this.setActiveNavItem();

        // Bottom nav click handling
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                // Only prevent default for current page navigation
                if (this.href === window.location.href) {
                    e.preventDefault();
                }
            });
        });
    },

    // Set active navigation item
    setActiveNavItem: function() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-item').forEach(nav => {
            const navHref = nav.getAttribute('href');
            if (navHref === currentPage) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });
    },

    // Video controls (Home page)
    setupVideoControls: function() {
        // Video autoplay and pause on scroll
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const videoContainer = entry.target;
                const iframe = videoContainer.querySelector('.google-vid-embed');
                
                if (entry.isIntersecting) {
                    console.log('Video in view - would autoplay here');
                } else {
                    console.log('Video out of view - would pause here');
                }
            });
        }, { threshold: 0.7 });

        // Observe video containers
        document.querySelectorAll('.video-container').forEach(container => {
            videoObserver.observe(container);
        });

        // Video controls simulation
        document.querySelectorAll('.play-pause-btn').forEach(button => {
            button.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-pause')) {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                    console.log('Video paused');
                } else {
                    icon.classList.remove('fa-play');
                    icon.classList.add('fa-pause');
                    console.log('Video playing');
                }
            });
        });
    },

    // Event filtering (Events page)
    setupEventFiltering: function() {
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Filter events
                const category = this.getAttribute('data-category');
                const featuredEvent = document.querySelector('.featured-event');
                const eventCards = document.querySelectorAll('.event-card');
                
                if (category === 'all') {
                    if (featuredEvent) featuredEvent.style.display = 'block';
                    eventCards.forEach(card => card.style.display = 'block');
                } else {
                    // Hide/show featured event
                    if (featuredEvent) {
                        if (featuredEvent.getAttribute('data-category') === category) {
                            featuredEvent.style.display = 'block';
                        } else {
                            featuredEvent.style.display = 'none';
                        }
                    }
                    
                    // Hide/show event cards
                    eventCards.forEach(card => {
                        if (card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });

        // Register button functionality
        document.querySelectorAll('.register-btn').forEach(button => {
            button.addEventListener('click', function() {
                const eventCard = this.closest('.event-card, .featured-event');
                const eventTitle = eventCard.querySelector('.event-title').textContent;
                const eventType = eventCard.querySelector('.event-type').textContent;
                
                const message = `Hi Mugera, I want to register for: ${eventTitle} (${eventType})`;
                window.open(`https://wa.me/254727211191?text=${encodeURIComponent(message)}`, '_blank');
            });
        });
    },

    // Library features (Library page)
    setupLibraryFeatures: function() {
        // Book category filtering
        document.querySelectorAll('.category-btn[data-category]').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                const bookCards = document.querySelectorAll('.book-card');
                
                if (category === 'all') {
                    bookCards.forEach(card => card.style.display = 'block');
                } else {
                    bookCards.forEach(card => {
                        if (card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });

        // Borrow button functionality
        document.querySelectorAll('.borrow-btn').forEach(button => {
            button.addEventListener('click', function() {
                const bookCard = this.closest('.book-card');
                const bookTitle = bookCard.querySelector('.book-title').textContent;
                const bookAuthor = bookCard.querySelector('.book-author').textContent;
                
                const message = `Hi Mugera, I want to borrow "${bookTitle}" by ${bookAuthor} from your e-library`;
                window.open(`https://wa.me/254727211191?text=${encodeURIComponent(message)}`, '_blank');
            });
        });
    },

    // Search functionality (Library page)
    setupSearchFunctionality: function() {
        const searchButton = document.getElementById('searchButton');
        const searchInput = document.getElementById('searchInput');

        if (searchButton && searchInput) {
            searchButton.addEventListener('click', () => this.performSearch());
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch();
            });
        }
    },

    performSearch: function() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        
        if (searchTerm === '') {
            document.querySelectorAll('.book-card').forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        document.querySelectorAll('.book-card').forEach(card => {
            const title = card.querySelector('.book-title').textContent.toLowerCase();
            const author = card.querySelector('.book-author').textContent.toLowerCase();
            const category = card.querySelector('.book-category').textContent.toLowerCase();
            const description = card.querySelector('.book-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || author.includes(searchTerm) || 
                category.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    },

    // Subscription buttons (Library page)
    setupSubscriptionButtons: function() {
        document.querySelectorAll('.subscribe-btn').forEach(button => {
            button.addEventListener('click', function() {
                const plan = this.getAttribute('data-plan');
                const price = this.getAttribute('data-price');
                
                const message = `Hi Mugera, I want to subscribe to your ${plan} E-Library plan for KSh ${price}`;
                window.open(`https://wa.me/254727211191?text=${encodeURIComponent(message)}`, '_blank');
            });
        });

        // Coffee support button
        const coffeeBtn = document.getElementById('coffeeBtn');
        if (coffeeBtn) {
            coffeeBtn.addEventListener('click', function() {
                const message = "Hi Mugera, I'd like to support your digital library by buying you a coffee!";
                window.open(`https://wa.me/254727211191?text=${encodeURIComponent(message)}`, '_blank');
            });
        }
    },

    // Contact buttons (All pages)
    setupContactButtons: function() {
        // Generic contact buttons
        document.querySelectorAll('.contact-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.href.includes('mailto:')) {
                    return; // Allow email links to work normally
                }
                if (!this.href.includes('wa.me')) {
                    e.preventDefault();
                    const message = "Hi Mugera, I'd like to connect with you!";
                    window.open(`https://wa.me/254727211191?text=${encodeURIComponent(message)}`, '_blank');
                }
            });
        });
    },

    // Animations (All pages)
    setupAnimations: function() {
        // Animate cards on page load
        const animateCards = (selector, delay = 200) => {
            const cards = document.querySelectorAll(selector);
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * delay);
            });
        };

        // Animate different types of cards
        if (document.querySelector('.post')) animateCards('.post');
        if (document.querySelector('.event-card')) animateCards('.event-card');
        if (document.querySelector('.book-card')) animateCards('.book-card');
        if (document.querySelector('.plan-card')) animateCards('.plan-card');
        if (document.querySelector('.value-card')) animateCards('.value-card');

        // Animate stats (About page)
        this.animateStats();
    },

    animateStats: function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach(stat => {
                            const target = parseInt(stat.textContent);
                            let current = 0;
                            const increment = target / 50;
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    current = target;
                                    clearInterval(timer);
                                }
                                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                            }, 30);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(document.querySelector('.impact-stats'));
        }
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
