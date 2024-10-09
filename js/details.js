document.addEventListener("DOMContentLoaded", () => {
    const petsContainer = document.getElementById('pets-container');
    const detailsModal = document.getElementById('details-modal'); 
    const closeXDetailsBtn = document.getElementById('close-x-details'); 
    const countdownDetailsElement = document.getElementById('countdown-timer-details'); 
 
    detailsModal.style.display = 'none';

    function newDetails() {
        fetch('https://openapi.programming-hero.com/api/peddy/pet/2')
            .then(res => res.json())
            .then(data => displayPets(data))
            .catch(err => console.error('Error fetching pet data:', err));
    }
    
    function displayPets(data) {
        console.log(data.petData.pet_details);
    
        const dynamicContentDiv = document.getElementById('dynamic-pet-details');
        const petData = data.petData;
        
        dynamicContentDiv.innerHTML = `
        <img src="${petData.image}" alt="${petData.pet_name}" style="width: 100%; border-radius: 8px;">
        <h3 style="font-size: 18px; font-weight: bold;">${petData.pet_name}</h3>
        <h4 style="font-size: 16px;">
            <span style="font-weight: bold;">Date of Birth:</span> ${petData.date_of_birth}
        </h4>
        <h4 style="font-size: 16px;">
            <span style="font-weight: bold;">Breed:</span> ${petData.breed}
        </h4>
        <h4 style="font-size: 16px;">
            <span style="font-weight: bold;">Age:</span> ${petData.age}
        </h4>
        <h4 style="font-size: 16px;">
            <span style="font-weight: bold;">Gender:</span> ${petData.gender}
        </h4>
        <h4 style="font-size: 16px;">
            <span style="font-weight: bold;">Price:</span> ${petData.price}
        </h4>
        <h4 style="font-size: 16px;">
            <span style="font-weight: bold;">Vaccinated Status:</span> ${petData.vaccinated_status}
        </h4>
        <p><span style="font-weight: bold;">Description:</span> ${petData.pet_details}</p>
        `;
    
        detailsModal.style.display = 'flex';
        disableScroll();


        closeXDetailsBtn.onclick = function() {
            detailsModal.style.display = 'none'; 
            enableScroll(); 
        };


        detailsModal.onclick = function(e) {
            if (e.target === detailsModal) {
                detailsModal.style.display = 'none'; 
                enableScroll(); 
            }
        };
    }

    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableScroll() {
        document.body.style.overflow = '';
    }

 

    petsContainer.addEventListener('click', (e) => {
        const detailsBtn = e.target.closest('.details-btn'); 
        if (detailsBtn) {
            console.log('Details button clicked');
            newDetails(); 
        }
    });

   
});
