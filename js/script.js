document.addEventListener("DOMContentLoaded", () => {
    const petsContainer = document.getElementById('pets-container');
    const likedPetsImagesContainer = document.getElementById('liked-pets-images');
    const sortingButton = document.getElementById('sorting'); 
    const adoptModal = document.getElementById('pop_up_adopt');
    const modalPetName = document.getElementById('modal-pet-name');
    const modalPetInfo = document.getElementById('modal-pet-info');
    const closeModalButton = document.querySelector('.close-modal-btn'); 
    const loadingSpinner = document.getElementById('loading-spinner'); 
    const extraTwoBtn = document.getElementById('extra-two-btn');
    let allPets = [];
    const likedPets = []; 

    async function fetchAllPets() {
        petsContainer.innerHTML = `<span class="loading loading-dots loading-lg"></span>`;
        try {
            const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
            const data = await response.json();
            allPets = data.pets; 
            displayPets(allPets); 
        } catch (error) {
            console.error("Error fetching pets data:", error);
            petsContainer.innerHTML = `<p>Failed to load data. Please try again later.</p>`;
        }
    }

    const viewMoreButton = document.getElementById('viewMore'); 

    viewMoreButton.addEventListener('click', () => {
        const petsSection = document.getElementById('pets-container'); 
        petsSection.scrollIntoView({ behavior: 'smooth' }); 
    });

    viewMoreButton.style.backgroundColor = "rgba(14,122,129)"; 
    viewMoreButton.style.color = "white"; 
    viewMoreButton.style.border = "none"; 
    viewMoreButton.style.padding = "10px 20px"; 
    viewMoreButton.style.borderRadius = "5px"; 
    viewMoreButton.style.cursor = "pointer"; 

    viewMoreButton.addEventListener("mouseover", () => {
        viewMoreButton.style.backgroundColor = "rgba(14,122,129)";
    });

    viewMoreButton.addEventListener("mouseout", () => {
        viewMoreButton.style.backgroundColor = "rgba(14,122,129)"; 
    });

    function displayPets(pets) {
        petsContainer.innerHTML = ''; 

        if (pets.length === 0) {
            petsContainer.innerHTML = `
<div class="flex justify-center items-center h-full">
    <img src="images/error.webp" alt="No pets found" class="w-2/4">

</div>
 <p class="text-black text-lg font-semibold text-justify">
    Nothing's found 
    Please check back later or explore other options.<br>
    If you need assistance, feel free to contact support.
</p>

            `;
            return; 
        }

        pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.classList.add('bg-white', 'shadow-md', 'rounded-lg', 'p-4', 'text-left', 'border', 'border-gray-200', 'flex', 'flex-col', 'mb-4');
        
            petCard.innerHTML = `
                <!-- Image section -->
  <img src="${pet.image}" alt="${pet.name || 'Pet Image'}" class="w-full h-auto sm:h-90 lg:h-56 rounded-lg mb-2 object-cover border-red-300 2pxl solid">

               
        
                <!-- Pet details -->
                <h2 class="text-lg sm:text-xl font-bold mb-2">${pet.pet_name || 'nai'}</h2>
                <h2 class="text-lg sm:text-xl font-bold mb-2">${pet.petId || 'nai'}</h2>
                <p class="text-gray-600 mb-1"><i class="fa-solid fa-paw"></i> Breed: ${pet.breed || 'Not Available'}</p>
                <p class="text-gray-500 mb-1"><i class="fa-solid fa-cake-candles"></i> Birth: ${pet.date_of_birth || 'Not Available'}</p>
                <p class="text-gray-500 mb-1"><i class="fa-solid fa-venus-mars"></i> Gender: ${pet.gender || 'Not Available'}</p>
                <p class="text-gray-500 mb-4"><i class="fa-solid fa-dollar-sign"></i> Price: $${pet.price || 'Not Available'}</p>
        
                <!-- Buttons layout (responsive for small and large devices) -->
                <div class="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
                    <button class="btn bg-red-500 text-white rounded-md px-4 py-2 like-btn" data-image="${pet.image}">
                        <i class="fa-solid fa-heart"></i> Like
                    </button>
                    <button class="btn bg-green-500 text-white rounded-md px-4 py-2 adnan1" data-pet='${JSON.stringify(pet)}'>Adopt</button>
                    <button class="btn bg-blue-500 text-white rounded-md px-4 py-2 details-btn" data-pet='${JSON.stringify(pet)}'>Details</button>
                </div>
            `;
        
            petsContainer.appendChild(petCard);
        });
        

        addLikeButtonListeners();
        addAdoptButtonListeners();
        addDetailsButtonListeners();
    }

    function addLikeButtonListeners() {
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const petImage = e.target.closest('button').dataset.image;
                addToLikedPets(petImage);
            });
        });
    }

    function addAdoptButtonListeners() {
        const adoptButtons = document.querySelectorAll('.adopt-btn');
        adoptButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const petData = JSON.parse(e.target.dataset.pet);
                showAdoptModal(petData);
            });
        });
    }
    
    function addDetailsButtonListeners() {
        const detailsButtons = document.querySelectorAll('.details-btn');
        detailsButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const petData = JSON.parse(e.target.dataset.pet);
                showAdoptModal(petData);
            });
        });
    }

    function showAdoptModal(pet) {
        modalPetName.textContent = pet.name || 'Pet Details';
        modalPetInfo.innerHTML = `
            <p><strong>Breed:</strong> ${pet.breed || 'Not Available'}</p>
            <p><strong>Date of Birth:</strong> ${pet.date_of_birth || 'Unknown'}</p>
            <p><strong>Gender:</strong> ${pet.gender || 'Unknown'}</p>
            <p><strong>Price:</strong> $${pet.price || 'N/A'}</p>
        `;

        adoptModal.classList.remove('hidden'); 
    }

    closeModalButton.addEventListener('click', (e) => {
        e.preventDefault();
        adoptModal.classList.add('hidden'); 
    });

    function addToLikedPets(image) {
        if (!likedPets.includes(image)) { 
            likedPets.push(image);
            displayLikedPets();
        }
    }

    function displayLikedPets() {
        likedPetsImagesContainer.innerHTML = `<h2 class="text-xl font-bold mb-2">Liked Pets</h2>`; 
        likedPets.forEach(image => {
            const likedPetImage = document.createElement('img');
            likedPetImage.src = image;
            likedPetImage.alt = "Liked Pet";
            likedPetImage.classList.add('w-32', 'h-32', 'object-cover', 'mb-2', 'rounded-lg', 'shadow-md');
            likedPetsImagesContainer.appendChild(likedPetImage);
        });
    }

    async function filterPetsByCategory(category) {
        loadingSpinner.classList.remove('hidden'); 
        petsContainer.innerHTML = ''; 

        extraTwoBtn.classList.add('hidden');
        loadingSpinner.classList.remove('hidden'); 

        setTimeout(() => {
            const filteredPets = allPets.filter(pet => pet.category.toLowerCase() === category);
            displayPets(filteredPets);

            loadingSpinner.classList.add('hidden'); 
            extraTwoBtn.classList.remove('hidden'); 
            displayLikedPets();
        }, 2000); 
    }

    function sortPets() {
        const sortedPets = [...allPets].sort((a, b) => b.price - a.price); 
        displayPets(sortedPets); 
    }

    sortingButton.addEventListener('click', () => {
        const currentSortOrder = sortingButton.dataset.sortOrder || 'desc'; 
        if (currentSortOrder === 'desc') {
            sortingButton.dataset.sortOrder = 'default'; 
            sortingButton.textContent = 'Sort by Price: Default'; 
            displayPets(allPets); 
        } else {
            sortingButton.dataset.sortOrder = 'desc'; 
            sortingButton.textContent = 'Sort by Price: Descending'; 
            sortPets(); 
        }
    });

    document.getElementById('birdsBtn').addEventListener('click', function() {
        likedPets.length = 0; 
        displayLikedPets(); 
    });

    document.getElementById('dogsBtn').addEventListener('click', () => filterPetsByCategory('dog'));
    document.getElementById('catsBtn').addEventListener('click', () => filterPetsByCategory('cat'));
    document.getElementById('rabbitsBtn').addEventListener('click', () => filterPetsByCategory('rabbit'));
    document.getElementById('birdsBtn').addEventListener('click', () => filterPetsByCategory('bird'));

    fetchAllPets();
});
