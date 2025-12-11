document.addEventListener('DOMContentLoaded', () => {
    const dockContainer = document.querySelector('.floating-dock-container');
    const dockItems = document.querySelectorAll('.dock-item');

    if (!dockContainer || dockItems.length === 0) return;

    const maxScale = 2.5;
    const baseWidth = 40;
    const proximity = 150;

    // Add drag handle to dock
    const dragHandle = document.createElement('div');
    dragHandle.className = 'dock-drag-handle';
    dragHandle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="5" r="1"/>
            <circle cx="9" cy="12" r="1"/>
            <circle cx="9" cy="19" r="1"/>
            <circle cx="15" cy="5" r="1"/>
            <circle cx="15" cy="12" r="1"/>
            <circle cx="15" cy="19" r="1"/>
        </svg>
    `;
    dragHandle.title = 'Drag to reposition';
    dockContainer.insertBefore(dragHandle, dockContainer.firstChild);

    // Draggable functionality
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;


    // Load saved position from localStorage with fallback
    let savedPosition = null;
    try {
        savedPosition = localStorage.getItem('dockPosition');
        if (savedPosition) {
            const { x, y } = JSON.parse(savedPosition);
            xOffset = x;
            yOffset = y;
            dockContainer.style.left = `${x}px`;
            dockContainer.style.bottom = `${y}px`;
            dockContainer.style.transform = 'none';
        }
    } catch (e) {
        // localStorage blocked by tracking prevention - use default position
        console.log('localStorage not available, using default position');
    }

    dragHandle.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    dragHandle.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', dragEnd);

    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === dragHandle || dragHandle.contains(e.target)) {
            isDragging = true;
            dockContainer.style.cursor = 'grabbing';
            dockContainer.style.transform = 'scale(1.05)';
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            // Get dock dimensions
            const dockWidth = dockContainer.offsetWidth;
            const dockHeight = dockContainer.offsetHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Add padding to prevent touching edges
            const padding = 10;

            // Constrain X position (left/right boundaries)
            const minX = padding;
            const maxX = windowWidth - dockWidth - padding;
            currentX = Math.max(minX, Math.min(currentX, maxX));

            // Constrain Y position (top/bottom boundaries)
            const minY = padding;
            const maxY = windowHeight - dockHeight - padding;
            currentY = Math.max(minY, Math.min(currentY, maxY));

            xOffset = currentX;
            yOffset = currentY;

            const bottomPos = windowHeight - currentY - dockHeight;

            dockContainer.style.left = `${currentX}px`;
            dockContainer.style.bottom = `${bottomPos}px`;
            dockContainer.style.transform = 'scale(1.05)';
        }
    }

    function dragEnd(e) {
        if (isDragging) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            dockContainer.style.cursor = 'grab';
            dockContainer.style.transform = 'scale(1)';

            const bottomPos = window.innerHeight - currentY - dockContainer.offsetHeight;

            // Save position with fallback
            try {
                localStorage.setItem('dockPosition', JSON.stringify({
                    x: currentX,
                    y: bottomPos
                }));
            } catch (e) {
                // localStorage blocked - position won't persist
            }
        }
    }

    // Intelligent scroll behavior
    let lastScrollTop = 0;
    let scrollTimeout;
    let isIdle = false;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        clearTimeout(scrollTimeout);
        isIdle = false;
        dockContainer.style.opacity = '1';

        if (!savedPosition) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                dockContainer.style.opacity = '0.5';
            } else {
                dockContainer.style.opacity = '1';
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        scrollTimeout = setTimeout(() => {
            if (window.pageYOffset > 200) {
                isIdle = true;
                dockContainer.style.opacity = '0.6';
            }
        }, 3000);
    });

    dockContainer.addEventListener('mouseenter', () => {
        dockContainer.style.opacity = '1';
    });

    dockContainer.addEventListener('mouseleave', () => {
        if (isIdle && window.pageYOffset > 200) {
            dockContainer.style.opacity = '0.6';
        }
    });

    // Bounce/Pop effect
    dockContainer.addEventListener('mousemove', (e) => {
        if (isDragging) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        dockItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const itemCenterY = rect.top + rect.height / 2;

            const distance = Math.sqrt(
                Math.pow(mouseX - itemCenterX, 2) +
                Math.pow(mouseY - itemCenterY, 2)
            );

            if (distance < proximity) {
                const val = 1 - (distance / proximity);
                const bounceScale = 1 + (0.4 * Math.pow(val, 2));
                const rotation = val * 10;

                item.style.transform = `scale(${bounceScale}) rotate(${rotation}deg)`;
                item.style.boxShadow = `0 ${8 * val}px ${16 * val}px rgba(16, 185, 129, ${0.3 * val})`;
            } else {
                item.style.transform = 'scale(1) rotate(0deg)';
                item.style.boxShadow = '';
            }
        });
    });

    dockContainer.addEventListener('mouseleave', () => {
        dockItems.forEach(item => {
            item.style.transform = 'scale(1) rotate(0deg)';
            item.style.boxShadow = '';
        });
    });

    // Auto-hide tooltips
    const tooltips = document.querySelectorAll('.dock-tooltip');
    const tooltipTimeouts = new Map();

    function showTooltip(tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';

        if (tooltipTimeouts.has(tooltip)) {
            clearTimeout(tooltipTimeouts.get(tooltip));
        }

        const timeout = setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                tooltip.style.visibility = 'hidden';
            }, 300);
        }, 2500);

        tooltipTimeouts.set(tooltip, timeout);
    }

    setTimeout(() => {
        tooltips.forEach(tooltip => {
            showTooltip(tooltip);
        });
    }, 500);

    dockItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const tooltip = item.querySelector('.dock-tooltip');
            if (tooltip) {
                showTooltip(tooltip);
            }
        });
        item.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
    });

    dockContainer.style.transition = 'opacity 0.3s ease, transform 0.2s ease';
    dragHandle.style.cursor = 'grab';

    // Download button - FIXED
    const downloadBtn = document.querySelector('.dock-download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (e) {
            e.preventDefault();

            this.classList.add('downloading');

            // Simply use window.location to download
            setTimeout(() => {
                window.location.href = 'Drishya_Resume_2025.pdf';

                this.classList.remove('downloading');
                this.classList.add('downloaded');

                setTimeout(() => {
                    this.classList.remove('downloaded');
                }, 2000);
            }, 500);
        });
    }

    // Handle window resize to keep dock on screen
    window.addEventListener('resize', () => {
        const dockWidth = dockContainer.offsetWidth;
        const dockHeight = dockContainer.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const padding = 10;

        // Get current position
        const currentLeft = parseInt(dockContainer.style.left) || 0;
        const currentBottom = parseInt(dockContainer.style.bottom) || 0;

        // Calculate constrained position
        const maxX = windowWidth - dockWidth - padding;
        const maxBottom = windowHeight - dockHeight - padding;

        // Adjust if out of bounds
        let newLeft = Math.max(padding, Math.min(currentLeft, maxX));
        let newBottom = Math.max(padding, Math.min(currentBottom, maxBottom));

        dockContainer.style.left = `${newLeft}px`;
        dockContainer.style.bottom = `${newBottom}px`;
    });
});
