document.addEventListener('DOMContentLoaded', getAllUsers);

async function getAllUsers() {
    const response = await fetch('/users/');
    const users = await response.json();
    const tbody = document.getElementById('usersBody');
    tbody.innerHTML = '';
    users.forEach(user => {
        const roles = user.roles.map(r => r.roleName).join(', ');
        tbody.innerHTML += `
            <tr>
                <td>${user.id}</td><td>${user.firstName}</td><td>${user.lastName}</td>
                <td>${user.age}</td><td>${user.email}</td><td>${roles}</td>
                <td><button class="btn btn-info" onclick="openEditModal(${user.id})">Edit</button></td>
                <td><button class="btn btn-danger" onclick="openDeleteModal(${user.id})">Delete</button></td>
            </tr>`;
    });
}

document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const roles = Array.from(document.getElementById('roleSelect').selectedOptions).map(o => ({ roleName: o.value }));
    const user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        roles: roles
    };
    const response = await fetch('/users/', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(user) });
    if (response.ok) {
        getAllUsers();
        document.querySelector('a[href="#usersTable"]').click();
        document.getElementById('addUserForm').reset();
    } else {
        const error = await response.json();
        alert('Error: ' + error.message);
    }
});

async function openEditModal(id) {
    const response = await fetch(`/users/${id}`);
    const user = await response.json();
    document.getElementById('editId').value = user.id;
    document.getElementById('editFirstName').value = user.firstName;
    document.getElementById('editLastName').value = user.lastName;
    document.getElementById('editAge').value = user.age;
    document.getElementById('editEmail').value = user.email;

    const roleSelect = document.getElementById('editRoleSelect');
    for (let i = 0; i < roleSelect.options.length; i++) {
        roleSelect.options[i].selected = user.roles.some(r => r.roleName === roleSelect.options[i].value);
    }
    
    $('#editModal').modal('show');
}

async function updateUser() {
    const id = document.getElementById('editId').value;
    const roles = Array.from(document.getElementById('editRoleSelect').selectedOptions).map(o => ({ roleName: o.value }));
    const user = {
        id: id,
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastName').value,
        age: document.getElementById('editAge').value,
        email: document.getElementById('editEmail').value,
        password: document.getElementById('editPassword').value,
        roles: roles
    };
    const response = await fetch(`/users/${id}`, { method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(user) });
    if (response.ok) {
        $('#editModal').modal('hide');
        getAllUsers();
    } else {
        alert('Error updating user');
    }
}

async function openDeleteModal(id) {
    const response = await fetch(`/users/${id}`);
    const user = await response.json();
    document.getElementById('deleteId').value = user.id;
    document.getElementById('deleteFirstName').value = user.firstName;
    document.getElementById('deleteLastName').value = user.lastName;
    document.getElementById('deleteAge').value = user.age;
    document.getElementById('deleteEmail').value = user.email;
    $('#deleteModal').modal('show');
}

async function deleteUser() {
    const id = document.getElementById('deleteId').value;
    const response = await fetch(`/users/${id}`, { method: 'DELETE' });
    if (response.ok) {
        $('#deleteModal').modal('hide');
        getAllUsers();
    } else {
        alert('Error updating user');
    }
}
