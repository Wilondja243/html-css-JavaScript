// Ouvrir la modal lorsqu'une méthode est sélectionnée
const methodCards = document.querySelectorAll('.method-card');
const modal = document.getElementById('transactionModal');
const closeModal = document.querySelector('.close-modal');

methodCards.forEach(card => {
    card.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
});

// Fermer la modal
closeModal.addEventListener('click', () => {// Gérer le clic sur une méthode de transaction
    const methodCards = document.querySelectorAll('.method-card');
    const subMethodsSection = document.getElementById('subMethods');
    const modal = document.getElementById('transactionModal');
    const closeModal = document.querySelector('.close-modal');
    
    methodCards.forEach(card => {
        card.addEventListener('click', () => {
            const method = card.getAttribute('data-method');
    
            if (method === 'mobile-money') {
                // Afficher les sous-méthodes pour Mobile Money
                subMethodsSection.classList.remove('hidden');
            } else {
                // Afficher directement le formulaire pour les autres méthodes
                subMethodsSection.classList.add('hidden');
                modal.style.display = 'flex';
            }
        });
    });
    
    // Gérer le clic sur une sous-méthode
    const subMethods = document.querySelectorAll('.sub-method');
    subMethods.forEach(subMethod => {
        subMethod.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    });
    
    // Fermer la modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Fermer la modal si on clique en dehors
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Gérer la soumission du formulaire
    const transactionForm = document.getElementById('transactionForm');
    transactionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Transaction effectuée avec succès !');
        modal.style.display = 'none';
    });
    modal.style.display = 'none';
});

// Fermer la modal si on clique en dehors
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Gérer la soumission du formulaire
const transactionForm = document.getElementById('transactionForm');
transactionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Transaction effectuée avec succès !');
    modal.style.display = 'none';
});