const WA = '5589994472889';

// Revelação ao rolar a página
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}

// Formulário: monta a mensagem e abre o WhatsApp
const form = document.getElementById('lead');
const err = document.getElementById('err');

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const nome = (d.nome || '').trim();
  const cro = (d.cro || '').trim();

  if (!nome || !cro) {
    err.hidden = false;
    return;
  }
  err.hidden = true;

  const msg = [
    'Olá! Vim pelo site da Living Art e quero agendar a conversa de 15 minutos.',
    '',
    `Nome: ${nome}`,
    `CRO e cidade: ${cro}`,
    `Trabalho com: ${d.interesse}`,
    `Scanner intraoral: ${d.scanner}`,
  ].join('\n');

  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});
