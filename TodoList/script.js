const add = document.getElementById("add");
const hideModal = document.querySelector(".bi-x");
const modalContainer = document.getElementById("modal-container");
const modalBtn = document.getElementById("modal-btn");

function showAddModal(){
    modalContainer.classList.remove("hide");
    modalContainer.classList.add('show-modal');
}

function hideAddModal(){
    modalContainer.classList.remove('show-modal');
    modalContainer.classList.add('hide')
}

add.addEventListener('click', showAddModal);
hideModal.addEventListener('click', hideAddModal);

// modal verification

function errorMessage(text){
    const errors = document.querySelector('.errors');
    if(errors.classList.contains('error')){
        errors.textContent = text;

        setTimeout(()=>{
            errors.style.display = 'none';
        }, 5000)
    }
}

function formValid(img, title, description){
    if(!img || !title || !description){
        errorMessage("Veiller remplir tous les champs.");
        return false;
    }
    return true;
}

function loadFile(event){
    const file = event.target.files[0];

    if(file && file.type.startsWith('image/')){
        const reader = new FileReader();
        reader.onload = function(e){
            document.getElementById("image-preview").src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
    else{
        console.log("erreur de chargement")
    }
}

document.getElementById("imageInput").addEventListener('change', loadFile);

modalBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    const imgInput = document.getElementById('imageInput');
    const imgFile = imgInput.files[0];
    console.log(imgFile)
    const title = document.getElementById("title").value.split();
    const description = document.getElementById("description").value.trim();

    if(formValid(imgFile, title, description)){
        
    }
})
