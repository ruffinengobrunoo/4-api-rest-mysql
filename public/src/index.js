import{navbar} from './navbar.js';

document.querySelector('#divNav').innerHTML = navbar;

let ingresar = document.querySelector('#ingresar');

var usuario= document.querySelector('#user');

usuario.style.display = 'none';

ingresar.addEventListener('click', ()=>{
    
    ingresar.style.display = "none";
    usuario.style.display = "block";

});

import{footer} from './footer.js';

document.querySelector('#divFooter').innerHTML = footer;

var salir = document.querySelector('#salir');

salir.addEventListener('click', ()=>{

    ingresar.style.display = "block";
    usuario.style.display = "none";

});