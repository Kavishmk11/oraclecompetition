const isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn) {
    window.location.href = 'login.html'; // Redirect to login page if not logged in
} else {
    const teamName = localStorage.getItem('teamName');
    const folderUsername = localStorage.getItem('folderusername');
    if (teamName) {
        document.getElementById('teamName').innerText = teamName;
    }
}

const logoutLink = document.getElementById('logoutLink');
logoutLink.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('isLoggedIn'); // Clear session
    window.location.href = 'index.html'; // Redirect to login page
});

const dragDropArea = document.getElementById('drag-drop-area');
const fileInput = document.getElementById('fileInput');
const browseFilesButton = document.getElementById('browseFiles');
const fileTableBody = document.getElementById('fileTableBody');

browseFilesButton.addEventListener('click', () => {
    fileInput.click();
});

dragDropArea.addEventListener('dragover', function (event) {
    event.preventDefault();
    dragDropArea.classList.add('dragover');
});

dragDropArea.addEventListener('dragleave', function () {
    dragDropArea.classList.remove('dragover');
});

dragDropArea.addEventListener('drop', function (event) {
    event.preventDefault();
    dragDropArea.classList.remove('dragover');
    const files = event.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', function (event) {
    const files = event.target.files;
    handleFiles(files);
});

function handleFiles(files) {
    for (let file of files) {
        console.log('File dropped:', file.name);
        addFileToTable(file);
    }
}

function addFileToTable(file) {
    const row = document.createElement('tr');
    row.innerHTML = `
          <td>${file.name}</td>
          <td>${(file.size / 1024).toFixed(2)} KB</td>
          <td>
            <button class="btn btn-danger btn-sm delete-button">Delete</button>
          </td>
        `;
    fileTableBody.appendChild(row);

    row.querySelector('.delete-button').addEventListener('click', () => {
        fileTableBody.removeChild(row);
    });
}