document.getElementById('formulario-contacto').addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('http://localhost:3001/api/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      mensaje: document.getElementById('mensaje').value
    }),
  });
  const data = await response.json();
  alert(data.success || data.error);
});