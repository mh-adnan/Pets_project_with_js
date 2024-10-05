document.addEventListener("DOMContentLoaded", () => {
    const petsContainer = document.getElementById("pets-container");

    // Fetch data from the API
    async function fetchPets() {
        try {
            const response = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
            const data = await response.json();
            displayPets(data.pets);
        } catch (error) {
            console.error("Error fetching pets data:", error);
        }
    }

    function displayPets(pets) {
        petsContainer.innerHTML = ''; 

        pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.classList.add('bg-white', 'shadow-md', 'rounded-lg', 'p-6', 'text-center');

            const petName = pet.name ? `<h2 class="text-xl font-bold mt-4">${pet.name}</h2>` : '';

            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name || 'Pet Image'}" class="w-full h-40 object-cover rounded-t-lg">
                ${petName} <!-- Display pet name first -->
                <p class="text-gray-600 mt-2 text-2xl font-bold">${pet.breed || 'N/A'}</p> <!-- Emphasize breed -->
                <p class="text-gray-500 mt-2">Date of Birth: ${pet.date_of_birth || 'N/A'}</p>
                <p class="text-gray-500 mt-2">Price: $${pet.price || 'N/A'}</p>
                <p class="text-gray-500 mt-2">Gender: ${pet.gender || 'N/A'}</p>
            `;

            petsContainer.appendChild(petCard);
        });
    }

    fetchPets();
});
