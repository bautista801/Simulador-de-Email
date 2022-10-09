// VARIABLES

const btnEnviar = document.querySelector('#enviar')

const btnReset = document.querySelector('#resetBtn')

const formualrio = document.querySelector('#enviar-mail')

const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

const parrafo = document.createElement('p')

const er =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//función principal

eventListener();
function eventListener() {
    document.addEventListener('DOMContentLoaded', iniciarApp)

    //campos del formulario
    email.addEventListener('blur', validarFormulario)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)

    //enviar correo
    formualrio.addEventListener('submit', enviarCorreo)

}



// FUNCIONES

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
    email.classList.remove('border', 'border-green-500')
    asunto.classList.remove('border', 'border-green-500')
    mensaje.classList.remove('border', 'border-green-500')
}

btnReset.addEventListener('click', resetearForm)

function resetearForm(){
    email.classList.remove('border', 'border-green-500')
    asunto.classList.remove('border', 'border-green-500')
    mensaje.classList.remove('border', 'border-green-500')
}

function validarFormulario(e) {

    if(e.target.value.length > 0){

        const error = document.querySelector('p.error')
        if(error){
            error.remove()
        }

        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
    }else {
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')

        mostrarError('Todos los campos son obligatorios');
    }


    if (e.target.type === 'email') {
        
        if (er.test(e.target.value)){
            const error = document.querySelector('p.error')
            if(error){
                error.remove()
            }
            

            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500')
        }else {
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')

            mostrarError('El email debe incluir un @ y un dominio');
        }
    }


    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
    }

}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje
    mensajeError.classList.add('border', 'border-red-500', 'text-red-500', 'p-3', 'error', 'text-center', 'mt-5')

    const errores = document.querySelectorAll('.error')
    if(errores.length === 0){
        formualrio.appendChild(mensajeError)
    }

}

function enviarCorreo(e){
    e.preventDefault();

    const spinner = document.querySelector('#spinner')
    spinner.style.display = 'flex';

    setTimeout( () => {
        spinner.style.display = 'none';

        // const parrafo = document.createElement('p')
        parrafo.textContent = 'Mensaje enviado correctamente'
        parrafo.classList.add('bg-green-400', 'text-center', 'text-white', 'my-10', 'p-2')

        formualrio.insertBefore(parrafo, spinner)

        setTimeout( () => {
            parrafo.remove();
        }, 3000)

        resetFormulario()

    }, 2000)

}

function resetFormulario(){
    formualrio.reset()

    iniciarApp()
}
