// Inicializa as animações AOS
AOS.init();

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
    // Carrega o conteúdo inicial
    carregarConteudo('inicio');
});

// Toggle do menu lateral
document.getElementById("menuToggle").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("wrapper").classList.toggle("toggled");
});

// Gerenciamento do conteúdo
document.querySelectorAll('#barraLateral a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pagina = this.getAttribute('data-page');
        if (pagina === 'inicio' || pagina === 'pontos-turisticos' || pagina === 'comidas-tipicas') {
            carregarConteudo(pagina);
        } else if (pagina === 'contato') {
            mostrarFormularioContato();
        }
    });
});

// Função para carregar conteúdo usando AJAX
function carregarConteudo(pagina) {
    const conteudoPrincipal = document.getElementById('conteudoPrincipal');
    const formularioContato = document.getElementById('formularioContato');
    
    conteudoPrincipal.style.display = 'block';
    formularioContato.style.display = 'none';
    
    conteudoPrincipal.innerHTML = '<p>Carregando...</p>'; // Mensagem de carregamento

    fetch(`${pagina}.html`)
        .then(response => response.text())
        .then(html => {
            conteudoPrincipal.innerHTML = html;
            // Reinicia as animações AOS para o novo conteúdo
            AOS.refresh();
            // Adiciona os event listeners para as imagens de comidas típicas
            if (pagina === 'comidas-tipicas') {
                adicionarEventListenersComidas();
            }
        })
        .catch(error => {
            console.error('Erro ao carregar a página:', error);
            conteudoPrincipal.innerHTML = '<p>Erro ao carregar o conteúdo. Por favor, tente novamente.</p>';
        });
}

// Função para adicionar event listeners às imagens de comidas típicas
function adicionarEventListenersComidas() {
    document.querySelectorAll('.comida-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, '_blank');
        });
    });
}

// Mostrar formulário de contato
function mostrarFormularioContato() {
    document.getElementById("conteudoPrincipal").style.display = "none";
    document.getElementById("formularioContato").style.display = "block";
    document.getElementById("formularioContato").scrollIntoView({behavior: "smooth"});
}

// Inicializa o EmailJS
(function() {
    emailjs.init("YOUR_USER_ID"); // Substitua com seu User ID do EmailJS
})();

// Manipulador de evento para o formulário de contato
document.getElementById('formContato').addEventListener('submit', function(e) {
    e.preventDefault();
    
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            console.log('SUCCESS!');
            alert('Mensagem enviada com sucesso!');
            document.getElementById('formContato').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Falha ao enviar a mensagem. Por favor, tente novamente.');
        });
});

// Efeito de fade para imagens
window.addEventListener('scroll', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
        if (isVisible) {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
        } else {
            img.style.opacity = '0';
            img.style.transform = 'translateY(20px)';
        }
    });
});