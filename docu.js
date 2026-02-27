const docContainer = document.getElementById('doc-container');
const addBtn = document.getElementById('add-doc-btn');
const fileInput = document.getElementById('file-input');
const docTitle = document.getElementById('doc-title');
const docURL = document.getElementById('doc-url');
const dropArea = document.getElementById('doc-drop-area');
const searchInput = document.getElementById('search-doc');

let docs = JSON.parse(localStorage.getItem('docs')) || [];
renderDocs();

// Helper: save and render
function saveAndRender() {
    localStorage.setItem('docs', JSON.stringify(docs));
    renderDocs();
}

// Render documents
function renderDocs() {
    docContainer.innerHTML = '';
    docs.forEach((doc, idx) => {
        const card = document.createElement('div');
        card.className = 'doc-card';

        let previewHTML = '';
        if(doc.type === 'application/pdf' || doc.url.endsWith('.pdf')) {
            previewHTML = `<iframe src="${doc.url}"></iframe>`;
        } else if(doc.type.startsWith('image/') || /\.(jpg|jpeg|png|gif)$/i.test(doc.url)) {
            previewHTML = `<img src="${doc.url}" alt="${doc.title}">`;
        } else {
            previewHTML = `<p>File ready. Click View to open.</p>`;
        }

        card.innerHTML = `
            <h3>${doc.title}</h3>
            <div class="doc-preview">${previewHTML}</div>
            <div class="doc-actions">
                <a href="${doc.url}" target="_blank" class="btn-view"><i class="fa-solid fa-eye"></i> View</a>
                <a href="${doc.url}" download class="btn-download"><i class="fa-solid fa-download"></i> Download</a>
                <button onclick="deleteDoc(${idx})" style="background:none;border:none;color:red;cursor:pointer;">Delete</button>
            </div>
        `;
        docContainer.appendChild(card);
    });
}

// Delete
function deleteDoc(idx) {
    if(confirm('নিশ্চিতভাবে মুছবেন?')) {
        docs.splice(idx,1);
        saveAndRender();
    }
}

// Search
function filterDocs() {
    const query = searchInput.value.toLowerCase();
    Array.from(docContainer.children).forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
    });
}

// Upload button
addBtn.addEventListener('click', () => {
    const title = docTitle.value.trim();
    const url = docURL.value.trim();
    const files = fileInput.files;

    if(title && url) {
        docs.push({ title, url, type:'url' });
    }

    if(files.length) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = e => {
                docs.push({ title: file.name, url: e.target.result, type: file.type });
                saveAndRender();
            }
            reader.readAsDataURL(file);
        });
    }

    docTitle.value = '';
    docURL.value = '';
    fileInput.value = '';
    saveAndRender();
});

// Drag & Drop
dropArea.addEventListener('dragover', e => {
    e.preventDefault();
    dropArea.style.background = '#e6f7ff';
});

dropArea.addEventListener('dragleave', e => {
    e.preventDefault();
    dropArea.style.background = '';
});

dropArea.addEventListener('drop', e => {
    e.preventDefault();
    dropArea.style.background = '';
    const files = e.dataTransfer.files;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = ev => {
            docs.push({ title: file.name, url: ev.target.result, type: file.type });
            saveAndRender();
        };
        reader.readAsDataURL(file);
    });
});
