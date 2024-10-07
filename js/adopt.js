document.addEventListener("DOMContentLoaded", () => {
    const petsContainer = document.getElementById('pets-container');
    const modal = document.getElementById('adopt-modal'); 
    const closeXBtn = document.getElementById('close-x'); 
    const countdownElement = document.getElementById('countdown-timer'); 


    modal.style.display = 'none';


    function displayPets() {
        const petCard = document.createElement('div');
        petCard.classList.add('bg-white', 'shadow-md', 'rounded-lg', 'p-4', 'text-left', 'border', 'border-gray-200');

        petCard.innerHTML = `
            <h2 class="text-xl font-bold mb-2">Pet Name</h2>
            <div class="flex justify-between items-center">
                <button class="btn bg-red-500 text-white rounded-md px-4 py-2 adnan1">Adopt</button>
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
        countdownElement.textContent = timeLeft;

        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval); 
                modal.style.display = 'none'; 
                enableScroll(); 
            }
        }, 1000); 
    }


    petsContainer.addEventListener('click', (e) => {
        const adoptBtn = e.target.closest('.adnan1'); 
        if (adoptBtn) {
            console.log('Adopt button clicked'); 

         
            adoptBtn.disabled = true; 
            adoptBtn.style.backgroundColor = '#d1d5db'; 
            adoptBtn.style.color = '#374151'; 
            adoptBtn.textContent = 'Adopted'; 

      
            modal.style.display = 'flex'; 
            disableScroll();

  
            startCountdown();
        }
    });

    closeXBtn.addEventListener('click', () => {
        modal.style.display = 'none'; 
        enableScroll(); 
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'; 
            enableScroll(); 
        }
    });

    displayPets();
});
