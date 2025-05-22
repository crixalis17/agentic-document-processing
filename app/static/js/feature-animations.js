// Feature Animations with Three.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing animations');
    // Initialize 2D feature animations
    init2dFeatureAnimations();
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load
    // Hover listeners will be added to individual 2D elements
});

// Global objects for 2D animations
const animationStates = {}; // Stores animation state (active, hovered, animating)
const animationElements = {}; // Stores the main animation container elements
const sliderContainers = {}; // Stores the container for horizontal slider movement
const documentIconElements = {}; // Stores individual document icon elements
const horizontalAnimationStates = {}; // Stores states for horizontal slider movement

// Colors (define based on your theme)
const colors = {
    primary: 0x0D80F2,
    secondary: 0x21364A,
    accent: 0x8FADCC
};

// --- 2D Animation Logic ---

function init2dFeatureAnimations() {
    console.log('Initializing 2D feature animations');
    // Initialize each feature animation (only document support for now)
    init2dDocumentSupportAnimation();
    // init2dDataExtractionAnimation(); // Add later if needed
    // init2dIntegrationAnimation(); // Add later if needed
     console.log('2D Feature animations initialization attempted.');
}

function handleScroll() {
    const featureSections = document.querySelectorAll('.feature-full-width');
    featureSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isInViewport = (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );

        const animationContainer = section.querySelector('.feature-animation-container');
        if (!animationContainer) return;

        const featureId = animationContainer.id;

        if (animationStates[featureId]) {
            // Animation is active if in viewport
            animationStates[featureId].active = isInViewport;
        }
    });
}

// Document Support 2D Animation (Horizontal Slider)
function init2dDocumentSupportAnimation() {
    console.log('Initializing 2D document support animation (Horizontal Slider)');

    const containerId = 'document-support-canvas';
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container element not found for ID:', containerId);
        return;
    }

    animationElements[containerId] = container;

    // State for horizontal slider movement
    horizontalAnimationStates[containerId] = {
        currentTranslateX: 0,
        singleSetWidth: 0, // Will be calculated after elements are added
        speed: 1.5 // Slider speed (pixels per frame), increased as requested
    };

    // Create a container for the icons for horizontal movement
    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('document-icons-horizontal'); // Add a class for styling
    container.appendChild(iconsContainer);
    sliderContainers[containerId] = iconsContainer; // Store the slider container

    // Styles for the horizontal container are now in style.css (.document-icons-horizontal)

    const documentTypes = [
        { name: 'PDF', imagePath: '/static/images/pdf.png' }, // Placeholder 2D path
        { name: 'DOCX', imagePath: '/static/images/doc.png' }, // Placeholder 2D path
        { name: 'CSV', imagePath: '/static/images/csv.png' }, // Placeholder 2D path
        { name: 'PPT', imagePath: '/static/images/ppt.png' }, // Placeholder 2D path
        { name: 'JPEG', imagePath: '/static/images/jpg.png' }, // Placeholder 2D path
        { name: 'PNG', imagePath: '/static/images/png.png' } // Placeholder 2D path
    ];

    documentIconElements[containerId] = [];

    // Create and add multiple sets of 2D image elements horizontally for seamless looping
    const numberOfSets = 3; // Duplicate the set to create a more seamless loop
    for (let set = 0; set < numberOfSets; set++) {
        documentTypes.forEach((docType, i) => {
            let iconElement;
            // Create an img element for all icons
            iconElement = document.createElement('img');
            iconElement.src = docType.imagePath;
            iconElement.alt = docType.name;
            iconElement.classList.add('document-icon-2d');

            iconElement.dataset.name = docType.name; // Store name for identification

            // Basic styling for horizontal layout will be in CSS
            iconElement.style.transition = 'transform 0.2s ease-in-out'; // Add transition for pop effect

            // Add hover listeners
            iconElement.addEventListener('mouseover', handleIconMouseOver);
            iconElement.addEventListener('mouseout', handleIconMouseOut);

            iconsContainer.appendChild(iconElement);
            documentIconElements[containerId].push({ element: iconElement, name: docType.name });
        });
    }

    // Store the width of a single set of icons for looping calculation
    // This needs to be calculated AFTER the elements are added to the DOM
    // A small delay might be needed to ensure layout is calculated
    setTimeout(() => {
        // Calculate the width of a single set of icons dynamically
        const iconsInSet = documentTypes.length;
         let calculatedWidth = 0;
         for(let i = 0; i < iconsInSet; i++) {
             const icon = iconsContainer.children[i];
             if (icon) {
                calculatedWidth += icon.offsetWidth + (parseFloat(getComputedStyle(iconsContainer).gap) || 0);
             }
         }
         // Remove the last gap as it's not followed by another element in the set
          if (iconsInSet > 0) {
              calculatedWidth -= (parseFloat(getComputedStyle(iconsContainer).gap) || 0);
          }

        horizontalAnimationStates[containerId].singleSetWidth = calculatedWidth;
         console.log('Calculated single set width:', calculatedWidth, 'for container:', containerId);

         // Also log the iconsContainer properties relevant to layout and transform
         console.log('iconsContainer offsetWidth:', iconsContainer.offsetWidth);
         console.log('iconsContainer clientWidth:', iconsContainer.clientWidth);
         console.log('iconsContainer scrollWidth:', iconsContainer.scrollWidth);
         console.log('iconsContainer computedStyle gap:', getComputedStyle(iconsContainer).gap);

    }, 100); // Small delay to allow DOM layout calculation

    // Animation state for this feature
    animationStates[containerId] = {
        active: false, // Active when in viewport
        animating: true, // Whether the slider is currently moving
        hoveredIcon: null // Element of the currently hovered icon
    };

    // Start the 2D animation loop
    animate2d();

    console.log('2D Document support animation (Horizontal Slider) initialization attempted.');
}

function animate2d() {
    requestAnimationFrame(animate2d);

    // console.log('animate2d loop running'); // Keep for debugging if needed

    for (const containerId in animationStates) {
        const state = animationStates[containerId];
        const iconsContainer = sliderContainers[containerId]; // Get the slider container
        const horizontalState = horizontalAnimationStates[containerId];

        // Ensure all necessary elements and states exist
        if (!state || !iconsContainer || !horizontalState || horizontalState.singleSetWidth === 0) return; // Wait until initialized

        // Handle horizontal slider movement (only if active and animating)
        if (state.active && state.animating) { // Use 'animating' for clarity
            horizontalState.currentTranslateX -= horizontalState.speed; // Move left

            // Check if the first set of icons has scrolled out of view
            if (horizontalState.currentTranslateX < -horizontalAnimationStates[containerId].singleSetWidth) {
                // Reset position to the start of the second set for seamless looping
                horizontalState.currentTranslateX += horizontalAnimationStates[containerId].singleSetWidth; // Use the stored singleSetWidth
            }

            iconsContainer.style.transform = `translateX(${horizontalState.currentTranslateX}px)`;
            // console.log(`Applied transform: translateX(${horizontalState.currentTranslateX}px) to ${containerId}`); // Keep for debugging if needed
        }
    }
}

// Hover handlers for 2D icons
function handleIconMouseOver(event) {
    const iconElement = event.target;
    // Find the top-level document icon element if a child was hovered
    let targetIcon = iconElement;
    while (targetIcon && !targetIcon.classList.contains('document-icon-2d')) {
        targetIcon = targetIcon.parentElement;
    }
    if (!targetIcon) return; // Not a document icon element

    const container = targetIcon.closest('.feature-animation-container');
    if (!container) return;

    const containerId = container.id;
    const state = animationStates[containerId];

    if (state) {
        state.animating = false; // Stop horizontal slider movement on hover
        state.hoveredIcon = targetIcon; // Mark the hovered icon

        // Apply pop effect (scale up)
        targetIcon.style.transform = 'scale(1.2)';
        // Optional: bring hovered icon to front with z-index
        targetIcon.style.zIndex = '10';

        console.log('Hovered over 2D icon:', targetIcon.dataset.name);
    }
}

function handleIconMouseOut(event) {
    const iconElement = event.target;
    // Find the top-level document icon element if a child was hovered
    let targetIcon = iconElement;
    while (targetIcon && !targetIcon.classList.contains('document-icon-2d')) {
        targetIcon = targetIcon.parentElement;
    }
    if (!targetIcon) return; // Not a document icon element

    const container = targetIcon.closest('.feature-animation-container');
    if (!container) return;

    const containerId = container.id;
    const state = animationStates[containerId];

    if (state) {
        state.animating = true; // Resume horizontal slider movement on mouse out
        // Remove the pop effect transform (reset scale)
        targetIcon.style.transform = 'scale(1)';
        // Optional: reset z-index
        targetIcon.style.zIndex = '';
        state.hoveredIcon = null; // Clear the hovered icon
        console.log('Hover exited 2D icon:', targetIcon.dataset.name);
    }
}

// You can add init functions for other features here later if needed
// function initDataExtractionAnimation() { /* ... */ }
// function initIntegrationAnimation() { /* ... */ } 