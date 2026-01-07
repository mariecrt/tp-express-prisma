const API_URL = 'http://localhost:3000/api/books';

// Éléments DOM
const booksList = document.getElementById('booksList');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const addBookBtn = document.getElementById('addBookBtn');
const bookModal = document.getElementById('bookModal');
const bookForm = document.getElementById('bookForm');
const modalTitle = document.getElementById('modalTitle');
const cancelBtn = document.getElementById('cancelBtn');
const closeBtn = document.querySelector('.close');

let editingBookId = null;

// Charger les livres au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    
    // Événements
    addBookBtn.addEventListener('click', () => openModal());
    closeBtn.addEventListener('click', () => closeModal());
    cancelBtn.addEventListener('click', () => closeModal());
    bookForm.addEventListener('submit', handleSubmit);
    
    // Fermer la modal en cliquant à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === bookModal) {
            closeModal();
        }
    });
});

// Charger tous les livres
async function loadBooks() {
    try {
        loading.style.display = 'block';
        errorDiv.style.display = 'none';
        booksList.innerHTML = '';
        
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erreur lors du chargement des livres');
        
        const books = await response.json();
        loading.style.display = 'none';
        
        if (books.length === 0) {
            booksList.innerHTML = `
                <div class="empty-state">
                    <h3>Aucun livre pour le moment</h3>
                    <p>Cliquez sur "Ajouter un livre" pour commencer</p>
                </div>
            `;
            return;
        }
        
        books.forEach(book => {
            const bookCard = createBookCard(book);
            booksList.appendChild(bookCard);
        });
    } catch (err) {
        loading.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.textContent = `Erreur: ${err.message}`;
    }
}

// Créer une carte de livre
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    const date = new Date(book.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <h3>${escapeHtml(book.title)}</h3>
        <p><strong>Auteur:</strong> ${escapeHtml(book.author)}</p>
        <p class="book-date">Ajouté le ${date}</p>
        <div class="book-actions">
            <button class="btn btn-edit" onclick="editBook(${book.id})">Modifier</button>
            <button class="btn btn-danger" onclick="deleteBook(${book.id})">Supprimer</button>
        </div>
    `;
    
    return card;
}

// Ouvrir la modal pour créer ou éditer
function openModal(book = null) {
    editingBookId = book ? book.id : null;
    modalTitle.textContent = book ? 'Modifier le livre' : 'Ajouter un livre';
    bookForm.reset();
    document.getElementById('bookId').value = '';
    
    if (book) {
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('bookId').value = book.id;
    }
    
    bookModal.style.display = 'block';
}

// Fermer la modal
function closeModal() {
    bookModal.style.display = 'none';
    editingBookId = null;
    bookForm.reset();
}

// Gérer la soumission du formulaire
async function handleSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const bookId = document.getElementById('bookId').value;
    
    if (!title || !author) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    try {
        const bookData = { title, author };
        let response;
        
        if (bookId) {
            // Mise à jour
            response = await fetch(`${API_URL}/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });
        } else {
            // Création
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });
        }
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erreur lors de l\'enregistrement');
        }
        
        closeModal();
        loadBooks();
    } catch (err) {
        alert(`Erreur: ${err.message}`);
    }
}

// Éditer un livre
async function editBook(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Livre non trouvé');
        
        const book = await response.json();
        openModal(book);
    } catch (err) {
        alert(`Erreur: ${err.message}`);
    }
}

// Supprimer un livre
async function deleteBook(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erreur lors de la suppression');
        }
        
        loadBooks();
    } catch (err) {
        alert(`Erreur: ${err.message}`);
    }
}

// Échapper le HTML pour éviter les injections XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Exposer les fonctions globalement pour les boutons onclick
window.editBook = editBook;
window.deleteBook = deleteBook;


