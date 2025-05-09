const add = document.getElementById("add");
const hideModal = document.querySelector(".bi-x");
const modalContainer = document.getElementById("modal-container");
const modalBtn = document.getElementById("modal-btn");

function showAddModal(){
    modalContainer.classList.remove("hide");
    document.body.classList.add("hideScrollBar");
    modalContainer.classList.add('show-modal');
}

function hideAddModal(){
    modalContainer.classList.remove('show-modal');
    document.body.classList.remove("hideScrollBar");
    modalContainer.classList.add('hide');
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

// Script to load file

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

// Script to verify form and add item

modalBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    const imgInput = document.getElementById('imageInput').files[0];

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    const reader = new FileReader();
    reader.onload = (e)=>{

        imgFile = e.target.result;
    
        if(formValid(imgFile, title, description)){
            const id = Date.now();

            addItem(id, imgFile, title, description);

            let storageData = JSON.parse(localStorage.getItem("content"))
            if(!storageData) {
                storageData = []
            }

            let itemData = { id , imgFile, title, description }

            storageData.push(itemData)

            localStorage.setItem("content", JSON.stringify(storageData));

            document.getElementById("imageInput").value = "";
            document.getElementById("image-preview").src = "";
            document.querySelector('.modal__form').reset();

            if(modalContainer.classList.contains("show-modal")){
                
                modalContainer.classList.remove('show-modal');
                document.body.classList.remove("hideScrollBar");
                modalContainer.classList.add('hide');
            }  
            
        }
    }

    reader.readAsDataURL(imgInput);
})

// Function to insert data in the content element

function addItem(id, imgFile, title, description){

    const content = document.querySelector('.content');

    content.innerHTML +=
        `
            <div class="content__item item" data-id="${id}">
                <div class="item__image">
                    <img src="${imgFile}" alt="Card Image">
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


// Script to update item

function updatItem(){

    let currentContentElement = null;

    document.querySelector(".content").addEventListener('click', (e)=>{
        if(e.target.classList.contains('bi-pen')){

            currentContentElement = e.target.closest(".content__item");

            if(modalContainer.classList.contains("hide")){

                modalContainer.classList.remove("hide");
                document.body.classList.add("hideScrollBar");
                modalContainer.classList.add("show-modal");

                document.getElementById("image-preview").src = currentContentElement.querySelector('.item__image img').src;
                document.getElementById("title").value = currentContentElement.querySelector(".item__infos h1").textContent;
                document.getElementById("description").value = currentContentElement.querySelector(".item__infos p").textContent;
                
            }
        }
    })

    document.getElementById("modal-btn").addEventListener('click', ()=>{
        if(currentContentElement){
            currentContentElement.querySelector('.item__image img').src = document.getElementById("image-preview").src;
            currentContentElement.querySelector(".item__infos h1").textContent = document.getElementById("title").value;
            currentContentElement.querySelector(".item__infos p").textContent = document.getElementById("description").value;
        }
    })

}

updatItem()


// Script to remove item

document.querySelector(".content").addEventListener("click", (e)=>{

    if(e.target.classList.contains("bi-trash")){
        const item = e.target.closest(".item");
        item.remove();

        let storageData = JSON.parse(localStorage.getItem("content")) || [];
        const itemId = Number(item.dataset.id);

        const index = storageData.findIndex(item => item.id === itemId);

        if(index !== -1){
            storageData.splice(index, 1);
            localStorage.setItem("content", JSON.stringify(storageData));
        }
        
    }
})

// Script to take all data in localStorage after reload page

window.onload = ()=>{
    itemData = JSON.parse(localStorage.getItem("content"));
    if(!itemData){
        itemData = [];
    }

    const content = document.querySelector(".content");

    itemData.forEach(item =>{

        content.innerHTML +=
            `
                <div class="content__item item" data-id="${item.id}">
                    <div class="item__image">
                        <img src="${item.imgFile}" alt="Item Image">
                    </div>
                    <div class="item__infos">
                        <h1>${item.title}</h1>
                        <p>${item.description}</p>
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
    })
}