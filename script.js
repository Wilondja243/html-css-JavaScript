document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];

    if (!file) {
        alert("Veuillez sélectionner une image.");
        return;
    }

    if (!file.type.startsWith('image/')) {
        alert("Veuillez sélectionner un fichier image.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const base64Image = e.target.result; 

        const userId = 2

        const data = {
            profil_id:userId,
            image: base64Image,
        };

        console.log(data)

        fetch('http://127.0.0.1:8000/api/v1/profil/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Succès:', data);
        })
        .catch((error) => {
            console.error('Erreur:', error);
            alert('Erreur lors du téléchargement de l\'image.');
        });
    };

    reader.readAsDataURL(file);
});

fetch("http://127.0.0.1:8000/api/v1/profil/2/user-profil/",{
    method:'GET',
    headers:{
        'content-Type':'application/json'
    }
}).then(resp =>{
    if(!resp.ok){
        throw new Error('Erreur', resp.status)
    }

    const contentType = resp.headers.get('Content-Type')
    if(contentType && contentType.includes('application/json')){
        return resp.json()
    }
    else{
        throw new Error('Reponse non json')
    }
}).then(data =>{
    console.log("donnee recues :", data)

    const container = document.getElementById("container")
    const img = document.createElement('img')

    img.src = data.profil_data.profil_image

    container.appendChild(img)
})
.catch(error => console.error('error', error))


