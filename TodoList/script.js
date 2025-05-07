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

    const imgInput = document.getElementById('imageInput').files[0];
    const imgFile = URL.createObjectURL(imgInput);

    const title = document.getElementById("title").value.split();
    const description = document.getElementById("description").value.trim();

    if(formValid(imgFile, title, description)){
        addItem(imgFile, title, description);
        document.querySelector('.modal__form').reset();

        if(modalContainer.classList.contains("show-modal")){
            modalContainer.classList.remove('show-modal');
            modalContainer.classList.add('hide');
        }  
    }
})

function addItem(imgFile, title, description){

    const content = document.querySelector('.content')

    content.innerHTML +=
        `
            <div class="content__item">
                <div class="item__image">
                    <img src="${imgFile}" alt="Card Image">
                    <p>Lorem ipsum dolor site amet</p>
                </div>
                <div class="item__infos">
                    <h1>${title}</h1>
                    <p>${description}</p>
                    <div class="item__infos__btns">
                        <button class="btn">Details</button>
                        <div class="item__infos__icons">
                            <i class="bi bi-pen"></i>
                            <i class="bi bi-trash"></i>
                            <div class="alert-content"></div>
                        </div>
                    </div>
                </div>
            </div>

        `
}
