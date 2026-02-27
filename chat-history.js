const chatHistoryList = document.getElementById('chat-history-list');
const searchInput = document.getElementById('search-chat');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const chatArea = document.getElementById('chat-area');

let chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');

// ------------------------
// Render chat history list
// ------------------------
function renderChatHistory() {
    chatHistoryList.innerHTML = '';
    // Sort by latest
    const reversedHistory = [...chatHistory].sort((a,b) => b.timestamp - a.timestamp);

    reversedHistory.forEach(chat => {
        const li = document.createElement('li');
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.padding = '6px 10px';
        li.style.borderBottom = '1px solid #ddd';

        // Left content: title + timestamp
        const leftDiv = document.createElement('div');
        leftDiv.style.display = 'flex';
        leftDiv.style.flexDirection = 'column';

        const title = document.createElement('span');
        title.textContent = chat.title;
        title.style.fontWeight = 'bold';
        leftDiv.appendChild(title);

        const time = document.createElement('small');
        time.textContent = new Date(chat.timestamp).toLocaleString();
        time.style.color = '#555';
        leftDiv.appendChild(time);

        li.appendChild(leftDiv);

        // Click to load in main chat area
        li.onclick = () => {
            const chatBox = document.getElementById('chat-box');
            if(chatBox) {
                chatBox.innerHTML = ''; // clear previous messages
                const msgDiv = document.createElement('div');
                msgDiv.className = 'message ai';
                msgDiv.textContent = chat.message;
                chatBox.appendChild(msgDiv);
                chatBox.scrollTop = chatBox.scrollHeight;
            } else {
                // fallback: open in main.html
                localStorage.setItem('loadChat', JSON.stringify(chat));
                window.location.href = 'main.html';
            }
        };

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = '❌';
        delBtn.style.background = 'transparent';
        delBtn.style.border = 'none';
        delBtn.style.cursor = 'pointer';
        delBtn.onclick = (e) => {
            e.stopPropagation();
            if(confirm('নিশ্চিতভাবে মুছবেন?')) {
                chatHistory = chatHistory.filter(c => c.timestamp !== chat.timestamp);
                localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
                renderChatHistory();
            }
        };

        li.appendChild(delBtn);
        chatHistoryList.appendChild(li);
    });
}

// ------------------------
// Add new chat automatically
// ------------------------
function addNewChat(messageContent) {
    const words = messageContent.trim().split(' ');
    const headline = words.slice(0,5).join(' ') + (words.length > 5 ? '...' : '');
    const newChat = { title: headline, message: messageContent, timestamp: Date.now() };
    chatHistory.push(newChat);
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    renderChatHistory();
}

// ------------------------
// Filter chat list live
// ------------------------
function filterChats() {
    const query = searchInput.value.toLowerCase();
    Array.from(chatHistoryList.children).forEach(li => {
        const title = li.querySelector('span').textContent.toLowerCase();
        li.style.display = title.includes(query) ? 'flex' : 'none';
    });
}

// ------------------------
// Sidebar toggle
// ------------------------
function toggleSidebar() {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
    chatArea.style.filter = sidebar.classList.contains('show') ? 'blur(2px)' : 'none';
}

function closeSidebar() {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    chatArea.style.filter = 'none';
}

// ------------------------
// Initial render
// ------------------------
document.addEventListener('DOMContentLoaded', () => {
    renderChatHistory();
    if(searchInput){
        searchInput.addEventListener('input', filterChats);
    }
});
