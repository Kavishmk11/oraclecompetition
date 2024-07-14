const firebaseConfig = {
    apiKey: "AIzaSyB2kWJAb5m9pGmPJ24wKvi2jpGTLUQD80w",
    authDomain: "oraclerepository-df042.firebaseapp.com",
    projectId: "oraclerepository-df042",
    storageBucket: "oraclerepository-df042.appspot.com",
    messagingSenderId: "270815941907",
    appId: "1:270815941907:web:db580dbd069cbcb170b6e6",
    measurementId: "G-191ZFP7SWT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = firebase.storage();
let browseFilesButton = document.getElementById('browseFiles');
// Define files array to hold dropped or selected files
let files = [];

// File upload button click event handler
const uploadFilesButton = document.getElementById('uploadFiles');
uploadFilesButton.addEventListener('click', async () => {
    const totalFiles = files.length;
    let filesUploaded = 0;

    // Show loader overlay
    const loaderOverlay = document.getElementById('loaderOverlay');
    loaderOverlay.style.display = 'block';

    files.forEach(async (file) => {
        const fileName = file.name;
        const fileRef = storage.ref().child('uploads/' + fileName);

        const contentType = file.type || 'application/octet-stream';
        const metadata = {
            contentType: contentType
        };

        const uploadTask = fileRef.put(file, metadata);

        // Update progress bar
        uploadTask.on('state_changed',
            (snapshot) => {
                // Update progress bar percentage
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                const progressBar = document.querySelector('.progress-bar');
                progressBar.style.width = progress + '%';
                progressBar.setAttribute('aria-valuenow', progress);
            },
            (error) => {
                console.error('Error uploading file:', error);
                // Handle specific errors
            },
            () => {
                // Upload completed successfully
                filesUploaded++;
                console.log(`File ${fileName} uploaded successfully`);

                // Check if all files are uploaded
                if (filesUploaded === totalFiles) {
                    // Optionally, update UI or perform additional actions after all files are uploaded
                    console.log('All files uploaded successfully');
                    // Hide loader overlay after upload completion
                    loaderOverlay.style.display = 'none';
                }
            }
        );
    });
});


// Check login status and handle UI updates
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn) {
    window.location.href = 'login.html'; // Redirect to login page if not logged in
} else {
    const teamName = localStorage.getItem('teamName');
    if (teamName) {
        document.getElementById('teamName').innerText = teamName;
    }
}

// Logout functionality
const logoutLink = document.getElementById('logoutLink');
logoutLink.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem('isLoggedIn'); // Clear session
    window.location.href = 'index.html'; // Redirect to login page
});

browseFilesButton.addEventListener('click', () => {
    fileInput.click();
});

// Drag and drop area events
const dragDropArea = document.getElementById('drag-drop-area');
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
    const droppedFiles = event.dataTransfer.files;
    handleFiles(droppedFiles);
});

// File input change event
fileInput.addEventListener('change', function (event) {
    const selectedFiles = event.target.files;
    handleFiles(selectedFiles);
});

// Handle dropped or selected files
function handleFiles(files) {
    for (let file of files) {
        console.log('File dropped or selected:', file.name);
        addFileToTable(file);
    }
}

// Display file in table
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
        files = files.filter(f => f.name !== file.name); // Remove file from files array
    });

    // Add file to files array
    files.push(file);
}
