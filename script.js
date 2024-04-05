/*
*   ============ Definir os principais objetos =========
    */
    let addNote = document.querySelector('#add-note');
    let closeModal =  document.querySelector('#close-modal');
    let modal = document.querySelector('#modal');
    let modalView = document.querySelector('#modal-view');
    let notes = document.querySelector('#notes');
    let btnSaveNote = document.querySelector("#btn-save-note");
    let btnCloseNote = document.querySelector("#btn-close-note");
    /*
*   ============ Eventos =========
    */
addNote. addEventListener("click", (evt)=>{
    evt.preventDefault();
    modal.style.display = "block";
    notes.style.display = "none";
    addNote.style.display = "none";
})

closeModal.addEventListener("click",(evt)=> {
    evt.preventDefault();
    modalView.style.display = "none";
    modal.style.display = "none";
    notes.style.display = "flex";
    addNote.style.display = "block";
    document.querySelector("#input-id").innerHTML = "oaoa";
    document.querySelector('#title-note').innerText = "";
    document.querySelector('#content-note').innerText = "";
    document.querySelector('#controls-note').innerText = "";

})

btnCloseNote. addEventListener ("click",(evt)=>{
    evt.preventDefault();
    modal.style.display = "none";
    notes.style.display = "flex";
    addNote.style.display = "block";
    document.querySelector('#input-id').value = '';
    document.querySelector('#input-title').value = '';
    document.querySelector('#input-content').value = '';
})

btnSaveNote. addEventListener ("click",(evt)=>{
    evt.preventDefault();
    let data = {
        id: document.querySelector("#input-id").value,
        title: document.querySelector("#input-title").value ,
        content: document.querySelector("#input-content").value ,
        lastTime: new Date().getTime()
    }

    SaveNote(data);
    
    

    notes.innerHTML = "";

    listNotes();
    
})



 /*
*   ============ Funções =========
    */

const SaveNote = (data) => { //SALVA AS NOTAS
   let notes = loadNotes();

    if(data.id.length < 1){
        data.id = new Date().getTime();
        document.querySelector("#input-id").value = data.id;
        notes.push(data);
    }else{
        console.log (data.id);
        notes.forEach((item, i) =>{
            if(item.id == data.id){
                notes[i] = data;
            }
        })
    }
    console.log(data);

    notes = JSON.stringify(notes);
    
    localStorage.setItem('notes',notes);
};



const listNotes = () => { //LISTA DE NOTAS NA PAGINA INICIAL

  let listNote = loadNotes();

  console.log(notes);

  

  listNote.forEach((item) => {

    let divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.style.width = '20rem';

    

    let divCardBody = document.createElement ('div');
    divCardBody.className = 'card-body';
    let h1 = document.createElement ('h1');
    h1.innerText = item.title;
    divCardBody.appendChild(h1);
    divCard.appendChild(divCardBody);
    notes.appendChild(divCard);

    let pContent = document.createElement ('p');
    pContent.innerText = item.content;
    divCardBody.appendChild(pContent);
    let pLastTime = document.createElement ('p');
    pLastTime.innerText = "Última edição: " + new Date(item.lastTime).toLocaleDateString ("pt-BR");
    divCardBody.appendChild(pLastTime);
  
   

    divCard.addEventListener("click",(evt)=>{
                evt.preventDefault();
                showNotes (item);

    
    });

  });
  
}
const editModal = (item)=> {
    console.log(item.tittle);
    
        modal.style.display = "block"; 
        notes.style.display = "none";
        addNote.style.display = "none";
        modalView.style.display = 'none';

        document.querySelector('#title-note').innerText = "";
        document.querySelector('#content-note').innerText = "";

        document.querySelector("#input-id").value = item.id;
        document.querySelector("#input-title").value =item.title;
        document.querySelector("#input-content").value = item.content;  
    }


    let icons = document.createElement( 'div');
    icons.className = "iconsDelEdi"

    modalView.appendChild(icons);
    
    let icomEdit = document.createElement('i');
    icomEdit.className = "bi bi-brush iconEdit";

    let icomDelete = document.createElement('i');
    icomDelete.className = 'bi bi-trash3';

    icons.appendChild(icomEdit);
    icons.appendChild(icomDelete);

    const deleteModal = (item) => {
        console.log("Deletando nota:", item.id);

        let notes = loadNotes();
    
        // Localizando o índice da nota a ser excluída
        let index = -1;
        for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === item.id) {
            index = i;
            break;
        }
        }
    
        // Removendo a nota do array
        if (index !== -1) {
        notes.splice(index, 1);
        }

        localStorage.setItem('notes', JSON.stringify(notes));

        listNotes();
    }



const showNotes = (item) => { //MOSTRA AS NOTAS
    
    modalView.style.display = "block";
    notes.style.display = "none";
    addNote.style.display = "none";


    document.querySelector('#title-note').innerText = item.title;//titulo

    let pContent = document.createElement('p');//paragrafo
    pContent.innerText = item.content;
    document.querySelector('#content-note').appendChild(pContent);
    
    let pLastTime = document.createElement('p');//tempo
    pLastTime.innerText = "Última alteração: "+ new Date (item.lastTime).toLocaleDateString('pt-BR');
    document.querySelector('#controls-note').appendChild(pLastTime);

        icomEdit.addEventListener("click", (evt) => {
        evt.preventDefault();
        console.log(evt.className)
        console.log("excluir p1")
        editModal(item);

    } )

    icomDelete.addEventListener("click", (evt) => {
        evt.preventDefault();
        deleteModal(item);
    } ) 

    }
    
   
    


const loadNotes = () => { //CARREAGA AS NOTAS
    let notes = localStorage.getItem ('notes');
    if(!notes){
        notes = [];
    }else{
        notes = JSON.parse(notes);
    }
    
    return notes;
}

listNotes();