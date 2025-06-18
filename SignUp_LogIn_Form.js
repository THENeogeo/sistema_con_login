const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

// Mostrar formulario de registro
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

// Mostrar formulario de login
loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// LOGIN: Verificar con base de datos
document.querySelector(".form-box.login form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuario = this.querySelector("input[placeholder='Usuario']").value;
    const contrasena = this.querySelector("input[placeholder='Contraseña']").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario, contrasena })
        });

        const result = await response.json();

        if (response.ok) {
            alert("✅ Inicio de sesión exitoso");
            window.location.href = "loading.html"; // redirige al panel principal
        } else {
            alert("❌ " + result.message);
        }

    } catch (err) {
        console.error(err);
        alert("❌ Error de conexión con el servidor.");
    }
});

// REGISTRO: Enviar datos al backend
document.querySelector(".form-box.register form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;

    const data = {
        nombre_completo: form.nombre_completo.value,
        usuario: form.usuario.value,
        correo: form.correo.value,
        fecha_nacimiento: form.fecha_nacimiento.value,
        contrasena: form.contrasena.value
    };

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("✅ Usuario registrado exitosamente.");
            form.reset();
            container.classList.remove("active"); // volver al login
        } else {
            alert("❌ Error al registrar usuario.");
        }
    } catch (err) {
        console.error("Error de conexión:", err);
        alert("❌ Error de conexión con el servidor.");
    }
});
