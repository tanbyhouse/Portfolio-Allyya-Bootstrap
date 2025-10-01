$(function() {
    // Carousel (jQuery version)
    var $carousel = $('#carousel-viewport');
    var $prevBtn = $('#prevBtn');
    var $nextBtn = $('#nextBtn');
    var $slides = $carousel.find('.carousel-slide');

    if ($carousel.length && $slides.length) {
        var slideWidth = $slides.first().outerWidth(true); // Include margin
        
        // Next button click handler
        $nextBtn.on('click', function() {
            var currentScroll = $carousel.scrollLeft();
            var maxScroll = $carousel[0].scrollWidth - $carousel.outerWidth();
            var newScroll = currentScroll + (slideWidth * 2);
            
            // Don't scroll beyond the end
            $carousel.scrollLeft(Math.min(newScroll, maxScroll));
        });

        // Previous button click handler
        $prevBtn.on('click', function() {
            var currentScroll = $carousel.scrollLeft();
            var newScroll = currentScroll - (slideWidth * 2);
            
            // Don't scroll beyond the start
            $carousel.scrollLeft(Math.max(newScroll, 0));
        });

        // Handle window resize to update slide width
        $(window).on('resize', function() {
            slideWidth = $slides.first().outerWidth(true);
        });
    }

    // Navbar coloring (jQuery version)
    var $nav = $('#nav');
    var $aboutSection = $('#about');
    var $projectsSection = $('#projects');

    // Only run if all required elements exist
    if ($nav.length && $aboutSection.length && $projectsSection.length) {
        function updateNavbar() {
            var scrollPosition = $(window).scrollTop() + 100;
            var aboutOffset = $aboutSection.offset().top;
            var projectsOffset = $projectsSection.offset().top;
            
            // Add buffer for smoother transitions
            var buffer = 50;
            
            if (scrollPosition < aboutOffset - buffer) {
                $nav.css('background-color', 'var(--vivid-lilac)');
            } else if (scrollPosition < projectsOffset - buffer) {
                $nav.css('background-color', 'var(--light-blue)');
            } else {
                $nav.css('background-color', 'var(--saddle)');
            }
        }

        // Throttled scroll event with requestAnimationFrame
        var ticking = false;
        $(window).on('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    updateNavbar();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial call
        updateNavbar();
    }
});