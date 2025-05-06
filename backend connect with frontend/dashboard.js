// Fetch and display all users
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Display users in the table
function displayUsers(users) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="showEditModal('${user._id}', '${user.name}', '${user.email}')">Edit</button>
                <button class="delete-btn" onclick="deleteUser('${user._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Show/hide modals
function showEditModal(userId, name, email) {
    document.getElementById('editUserId').value = userId;
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    document.getElementById('editUserModal').style.display = 'block';
}

function showAddUserModal() {
    document.getElementById('addUserModal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editUserModal').style.display = 'none';
}

function closeAddModal() {
    document.getElementById('addUserModal').style.display = 'none';
    document.getElementById('addUserForm').reset();
}

// Show message function
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    setTimeout(() => messageDiv.style.display = 'none', 3000);
}

// Add new user
document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('newName').value,
        email: document.getElementById('newEmail').value,
        password: document.getElementById('newPassword').value
    };

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Failed to add user');
        
        showMessage('User added successfully', 'success');
        closeAddModal();
        fetchUsers();
    } catch (error) {
        showMessage(error.message, 'error');
    }
});

// Update user
document.getElementById('editUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('editUserId').value;
    const formData = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value
    };

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Failed to update user');
        
        showMessage('User updated successfully', 'success');
        closeEditModal();
        fetchUsers();
    } catch (error) {
        showMessage(error.message, 'error');
    }
});

// Delete user
async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete user');
        
        showMessage('User deleted successfully', 'success');
        fetchUsers();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Initial load
fetchUsers();