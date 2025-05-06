document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const messageDiv = document.getElementById('message');
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        messageDiv.textContent = 'Registration successful!';
        messageDiv.className = 'message success';
        messageDiv.style.display = 'block';
        
        // Clear the form
        e.target.reset();
    } catch (error) {
        messageDiv.textContent = 'Error: ' + error.message;
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
    }
})