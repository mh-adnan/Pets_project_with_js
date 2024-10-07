document.addEventListener("DOMContentLoaded", () => {
    const petsContainer = document.getElementById('pets-container');
    const detailsModal = document.getElementById('details-modal'); 
    const closeXDetailsBtn = document.getElementById('close-x-details'); 
    const countdownDetailsElement = document.getElementById('countdown-timer-details'); 
 
    detailsModal.style.display = 'none';


    function displayPets() {
        const petCard = document.createElement('div');
        petCard.classList.add('bg-white', 'shadow-md', 'rounded-lg', 'p-4', 'text-left', 'border', 'border-gray-200');

        petCard.innerHTML = `
            <h2 class="text-xl font-bold mb-2">Pet Name</h2>
            <div class="flex justify-between items-center">
                <button class="btn bg-blue-500 text-white rounded-md px-4 py-2 details-btn">Details</button>
            </div>
        `;

        petsContainer.appendChild(petCard);
    }

    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = '';
    }

    function startCountdown() {
        let timeLeft = 3; 
        countdownDetailsElement.textContent = timeLeft;
        countdownDetailsElement.style.color = '#FF4500'; 
        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownDetailsElement.textContent = timeLeft;

      
            if (timeLeft === 2) {
                countdownDetailsElement.style.color = '#FFA500'; 
            } else if (timeLeft === 1) {
                countdownDetailsElement.style.color = '#FFD700';
            }

            if (timeLeft <= 0) {
                clearInterval(countdownInterval); 
                detailsModal.style.display = 'none'; 
                enableScroll(); 
            }
        }, 1000); 
    }

    petsContainer.addEventListener('click', (e) => {
        const detailsBtn = e.target.closest('.details-btn'); 
        if (detailsBtn) {
            console.log('Details button clicked');

            detailsModal.style.display = 'flex'; clicked
            disableScroll(); 

            startCountdown();
        }
    });

    closeXDetailsBtn.addEventListener('click', () => {
        detailsModal.style.display = 'none'; 
        enableScroll(); 
    });

    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            detailsModal.style.display = 'none'; box
            enableScroll(); 
        }
    });
    displayPets();
});
