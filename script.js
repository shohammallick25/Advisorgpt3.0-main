// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const chatArea = document.getElementById('chat-area');

const hamburger = document.querySelector('.hamburger');

const docContainer = document.getElementById('doc-container');
    const addBtn = document.getElementById('add-doc-btn');

function toggleSidebar() {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
    chatArea.classList.toggle('blurred', sidebar.classList.contains('show'));
chatArea.style.filter = sidebar.classList.contains('show') ? 'blur(2px)' : 'none';
}

function closeSidebar() {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    chatArea.style.filter = 'none';
}

// Fix mobile 100vh issue
function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVh);
window.addEventListener('load', setVh);
setVh();

function scrollChatToBottom() {
    const chatBox = document.querySelector('.chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Use localStorage to save chat history
const chatHistoryList = document.getElementById('chat-history-list');

function saveMessageToHistory(message, sender='user') {
    let history = JSON.parse(localStorage.getItem('chatHistory') || '[]');

    const title = generateChatTitle(message); // স্বয়ংক্রিয় title

    history.push({ message, sender, timestamp: new Date().toISOString(), title });
    localStorage.setItem('chatHistory', JSON.stringify(history));

    renderChatHistory(); // sidebar update
}

function generateChatTitle(message) {
    message = message.trim();
    let sentenceEnd = message.indexOf('.') !== -1 ? message.indexOf('.') : message.length;
    let snippet = message.slice(0, sentenceEnd);
    let words = snippet.split(/\s+/).slice(0, 7).join(' ');
    return words + (message.length > snippet.length ? '...' : '');
}

function saveMessageToHistory(message, sender='user') {
    let history = JSON.parse(localStorage.getItem('chatHistory') || '[]');

    const title = generateChatTitle(message);

    history.push({ message, sender, timestamp: new Date().toISOString(), title });
    localStorage.setItem('chatHistory', JSON.stringify(history));
    renderChatHistory();
}


function renderChatHistory() {
    chatHistoryList.innerHTML = '';
    let history = JSON.parse(localStorage.getItem('chatHistory') || '[]');

    history.forEach((chat, index) => {
        const li = document.createElement('li');
        li.className = chat.sender; // user বা ai
        li.textContent = chat.title; // sidebar title
        li.title = chat.message; // hover এ full message
        li.onclick = () => loadChat(chat); // click করলে chatbox load হবে
        chatHistoryList.appendChild(li);
    });

    // Scroll sidebar chat history to bottom automatically
    chatHistoryList.scrollTop = chatHistoryList.scrollHeight;
}


// Wallpaper
    function changeWallpaper(color){
        document.body.style.background = color;
        localStorage.setItem('wallpaper', color);
    }






















function sendMessage() {
    const input = document.getElementById('user-input').value.trim();
    if (!input) return;

    const chatBox = document.getElementById('chat-box');

    // User Message
    const userDiv = document.createElement('div');
    userDiv.classList.add('message', 'user');

    // Profile Pic + Name
    const img = document.createElement('img');
    img.src = window.accountSettings.profile;
    img.alt = window.accountSettings.name;

    const content = document.createElement('div');
    content.innerHTML = `<strong>${window.accountSettings.name}:</strong><br>${input}`;

    userDiv.appendChild(img);
    userDiv.appendChild(content);

    if (window.chatSettings.anim) {
        userDiv.style.opacity = 0;
        chatBox.appendChild(userDiv);
        setTimeout(()=>userDiv.style.opacity=1, 50);
    } else {
        chatBox.appendChild(userDiv);
    }

    // Play sound if enabled
    if(window.chatSettings.sound){
        const audio = new Audio('send.mp3'); // your sound file
        audio.play();
    }

    document.getElementById('user-input').value = '';

    // AI Response simulation
    setTimeout(() => aiResponse(input), 500);
}

function sendMessage() {
    const input = document.getElementById('user-input').value.trim();
    if (!input) return;

    const chatBox = document.getElementById('chat-box');

    // User Message
    const userDiv = document.createElement('div');
    userDiv.classList.add('message', 'user');

    // Profile Pic + Name
    const img = document.createElement('img');
    img.src = window.accountSettings.profile;
    img.alt = window.accountSettings.name;

    const content = document.createElement('div');
    content.innerHTML = `<strong>${window.accountSettings.name}:</strong><br>${input}`;

    userDiv.appendChild(img);
    userDiv.appendChild(content);

    if (window.chatSettings.anim) {
        userDiv.style.opacity = 0;
        chatBox.appendChild(userDiv);
        setTimeout(()=>userDiv.style.opacity=1, 50);
    } else {
        chatBox.appendChild(userDiv);
    }

    // Play sound if enabled
    if(window.chatSettings.sound){
        const audio = new Audio('send.mp3'); // your sound file
        audio.play();
    }

    document.getElementById('user-input').value = '';

    // AI Response simulation
    setTimeout(() => aiResponse(input), 500);
}




















function generateChatTitle(message) {
    // Take first sentence or first 5–7 words
    let sentenceEnd = message.indexOf('.') !== -1 ? message.indexOf('.') : message.length;
    let snippet = message.slice(0, sentenceEnd);
    let words = snippet.split(/\s+/).slice(0, 7).join(' ');
    return words + (message.length > snippet.length ? '...' : '');
}



// Optional: load a chat into main chat area
function loadChat(chat) {
    const chatBox = document.getElementById('chat-box');
    const div = document.createElement('div');
    div.classList.add('message', chat.sender);
    div.innerHTML = `<div>${chat.message}</div>`;
    chatBox.appendChild(div);

    // Always scroll chatbox to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ================= New Chat =================
function startNewChat() {
    const chatBox = document.getElementById('chat-box');
    const inputEl = document.getElementById('user-input');

    // আগের চ্যাট sidebar এ save
    const messages = chatBox.querySelectorAll('.message.user, .message.ai');
    if (messages.length) {
        let combinedText = '';
        messages.forEach(msg => {
            // 'আপনি:' বা 'AdvisorGPT:' remove করা
            combinedText += msg.innerText.replace(/^আপনি:|AdvisorGPT:/g, '').trim() + '\n';
        });
        combinedText = combinedText.trim();
        if (combinedText) saveMessageToHistory(combinedText, 'user');
    }

    // নতুন চ্যাটের জন্য chatBox পরিষ্কার
    chatBox.innerHTML = '';
    inputEl.value = '';

    // Optional: নতুন chat শুরু হলে scroll bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ================= Sidebar update =================
function renderChatHistory() {
    chatHistoryList.innerHTML = '';
    let history = JSON.parse(localStorage.getItem('chatHistory') || '[]');

    history.forEach((chat, index) => {
        const li = document.createElement('li');
        li.className = chat.sender;
        li.textContent = chat.title;
        li.title = chat.message;
        li.onclick = () => loadChat(chat);
        chatHistoryList.appendChild(li);
    });

    // Scroll sidebar history to bottom automatically
    chatHistoryList.scrollTop = chatHistoryList.scrollHeight;
}


// Call this when sending a message
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    appendUserMessage(message);
    saveMessageToHistory(message, 'user');

    // Clear input
    input.value = '';

    // Simulate AI response
    setTimeout(() => {
        const aiMsg = "AI উত্তর: " + message; // Replace with actual AI call
        appendAIMessage(aiMsg);
        saveMessageToHistory(aiMsg, 'ai');
    }, 500);
}

// Render chat history on page load
document.addEventListener('DOMContentLoaded', () => {
    renderChatHistory();
});







// Speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'bn-BD';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('user-input').value = transcript;
        sendMessage();
    };

    recognition.onerror = function (event) {
        alert("ভয়েস রিকগনিশনে সমস্যা হয়েছে: " + event.error);
    };
}

// Scroll chat to bottom
function scrollToBottom() {
    const chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Lawyer-style law database
const lawDatabase = [
    {
        keywords: ["মিথ্যা মামলা", "false case", "মামলা"], response: {
            laws: [
                "ধারা 499: মানহানি এবং মিথ্যা অভিযোগ সম্পর্কিত।",
                "ধারা 500: দোষীদের শাস্তি।",
                "CrPC 154: General Diary (GD) দায়ের প্রক্রিয়া।"
            ],
            guidance: [
                "স্থানীয় থানায় General Diary (GD) দাখিল করুন।",
                "প্রয়োজনীয় সকল প্রমাণ ও দলিল সংগ্রহ করুন।",
                "মানহানি মামলা দায়ের করতে হলে আদালতে আবেদন করুন।",
                "সাক্ষী প্রস্তুত রাখুন এবং প্রতিটি ধাপ লিখিতভাবে নোট করুন।"
            ],
            caution: [
                "ভুল বা অসম্পূর্ণ প্রমাণ ব্যবহার থেকে বিরত থাকুন।",
                "গুরুতর মামলার ক্ষেত্রে লাইসেন্সধারী আইনজীবীর সঙ্গে পরামর্শ করুন।"
            ]
        }
    },
    {
          keywords: ["ভ্রুতি মামলা", "fraud", "scam"], response: {
                  laws: [
                      "Penal Code, Section 420: প্রতারণা ও জালিয়াতি দমন।",
                      "Consumer Protection Act: ভোক্তা অধিকার সুরক্ষা।"
                  ],
                  guidance: [
                      "প্রমাণ সংরক্ষণ করুন (চিঠি, ছবি, ভিডিও)।",
                      "প্রয়োজনে থানায় অভিযোগ দাখিল করুন।",
                      "ব্যক্তিগত ও আর্থিক তথ্য নিরাপদ রাখুন।"
                  ],
                  caution: [
                      "মিথ্যা অভিযোগ করা বেআইনি।",
                      "সতর্কতা অবলম্বন না করলে আর্থিক ক্ষতি হতে পারে।"
                  ]
          }
     },
     {
           keywords: ["শ্রম সমস্যা", "labor dispute"], response: {
                   laws: [
                       "Bangladesh Labor Act 2006: শ্রমিক ও নিয়োগকর্তার অধিকার ও বাধ্যবাধকতা।",
                       "Section 50-55: শ্রমিক নিরাপত্তা, বেতন ও ছুটির বিধান।"
                   ],
                   guidance: [
                       "শ্রমিক ও নিয়োগকর্তা উভয় পক্ষের নথি প্রস্তুত রাখুন।",
                       "যেকোনো ঝামেলা বা অনিয়মের ঘটনা নথিভুক্ত করুন।",
                       "প্রয়োজনে শ্রম আদালতে মামলা বা মধ্যস্থতার চেষ্টা করুন।"
                   ],
                   caution: [
                       "আইন অমান্য করলে জরিমানা বা শাস্তি হতে পারে।",
                       "প্রকল্প ও চুক্তি ভঙ্গ এড়ানোর জন্য সতর্ক থাকুন।"
                   ]
          }
     },
     {
          keywords: ["বিবাহ বিচ্ছেদ", "divorce"], response: {
                   laws: [
                       "Family Court Act 2010: বিবাহ-বিচ্ছেদ ও পরিবারিক মামলার বিধি।",
                       "Personal Law Section: বৈবাহিক সমস্যা সমাধান।"
                   ],
                   guidance: [
                       "Family Court-এ আবেদন জমা দিন।",
                       "প্রয়োজনীয় দলিলাদি ও বিবাহ সনদ প্রস্তুত রাখুন।",
                       "মধ্যস্থতা বা সালিশ বোর্ডের মাধ্যমে মীমাংসা চেষ্টা করুন।",
                       "আদালতে শুনানি চলাকালীন সমস্ত নথি সঠিকভাবে উপস্থাপন করুন।"
                   ],
                   caution: [
                       "মামলা চলাকালীন অসদাচরণ থেকে বিরত থাকুন।",
                       "গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার আগে আইনি পরামর্শ নিন।"
                   ]
         }
     },
     // Marriage & Family
     {
       keywords: ["বিবাহ", "marriage"],
       response: {
         laws: [
           "Muslim Family Laws Ordinance 1961: বিবাহ ও বৈবাহিক অধিকার সংক্রান্ত আইন।",
           "Personal Law Section: বিবাহিক চুক্তি ও অধিকার।"
         ],
         guidance: [
           "বিবাহ নথি সঠিকভাবে সম্পন্ন করুন।",
           "প্রয়োজনীয় সাক্ষী এবং দলিল প্রস্তুত রাখুন।",
           "বিবাহ রেজিস্ট্রেশন করুন।"
         ],
         caution: [
           "বিবাহের ক্ষেত্রে মিথ্যা বা অসম্পূর্ণ তথ্য ব্যবহার করবেন না।",
           "আইনগত সমস্যা এড়াতে স্থানীয় আইনজীবীর পরামর্শ নিন।"
         ]
       }
     },

     // Child Custody
     {
       keywords: ["সন্তান হেফাজত", "child custody"],
       response: {
         laws: [
           "Guardians and Wards Act 1890: শিশু হেফাজত ও অভিভাবক সংক্রান্ত আইন।",
           "Family Court Rules: হেফাজত মামলা পরিচালনার বিধি।"
         ],
         guidance: [
           "Family Court-এ হেফাজত মামলা করুন।",
           "সন্তানের সুরক্ষা ও কল্যাণ নিশ্চিত করুন।",
           "প্রয়োজনীয় প্রমাণ যেমন জন্মসনদ ও পরিচয়পত্র জমা দিন।"
         ],
         caution: [
           "মিথ্যা তথ্য বা কৌশল ব্যবহার করবেন না।",
           "শিশুর কল্যাণের প্রতি সর্বদা অগ্রাধিকার দিন।"
         ]
       }
     },

     // Property Dispute
     {
       keywords: ["জমি বিরোধ", "property dispute"],
       response: {
         laws: [
           "Section 6: দলিল যাচাই এবং আদালতের নির্দেশ।",
           "Civil Procedure Code: সম্পত্তি মামলা পরিচালনা।"
         ],
         guidance: [
           "সম্পত্তি সংক্রান্ত সমস্ত দলিল যাচাই করুন।",
           "প্রয়োজনে নোটারি বা আইনজীবীর সাহায্য নিন।",
           "আদালতে প্রমাণ এবং দলিল জমা দিন।"
         ],
         caution: [
           "দলিল ফ্রড বা মিথ্যা প্রমাণ ব্যবহার করবেন না।",
           "মধ্যস্থতা বা সালিশ বোর্ডের মাধ্যমে সমাধান করার চেষ্টা করুন।"
         ]
       }
     },

     // Labor Dispute
     {
       keywords: ["শ্রম বিরোধ", "labor dispute"],
       response: {
         laws: [
           "Bangladesh Labor Act 2006: শ্রমিক এবং নিয়োগকর্তার অধিকার।",
           "Section 50-55: শ্রমিক নিরাপত্তা, বেতন ও ছুটি সংক্রান্ত বিধান।"
         ],
         guidance: [
           "প্রয়োজনীয় নথি এবং প্রমাণ সংরক্ষণ করুন।",
           "শ্রম আদালতে অভিযোগ করুন বা মধ্যস্থতার চেষ্টা করুন।",
           "চুক্তি এবং নিয়ম মেনে চলুন।"
         ],
         caution: [
           "আইন অমান্য করলে জরিমানা বা শাস্তি হতে পারে।",
           "বিরোধ নিরসনে সতর্ক থাকুন।"
         ]
       }
     },

     // Cybercrime
     {
       keywords: ["সাইবার ক্রাইম", "cybercrime", "ICT"],
       response: {
         laws: [
           "ICT Act 2006, Section 57: অনলাইন হুমকি ও ক্ষতিকর প্রকাশ নিষিদ্ধ।",
           "Digital Security Act 2018: অনলাইন প্রতারণা ও হ্যাকিং নিয়ন্ত্রণ।"
         ],
         guidance: [
           "সাইবার হুমকি বা প্রতারণার প্রমাণ সংরক্ষণ করুন।",
           "থানায় বা CERT-BD-এ অভিযোগ দাখিল করুন।",
           "ব্যক্তিগত তথ্য এবং লগ নিরাপদ রাখুন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ বা অননুমোদিত হ্যাকিং থেকে বিরত থাকুন।",
           "আইনের নিয়ম লঙ্ঘন করলে কঠোর শাস্তি হতে পারে।"
         ]
       }
     },
     // Traffic Law
     {
       keywords: ["ট্রাফিক আইন", "traffic law", "road rules"],
       response: {
         laws: [
           "Motor Vehicle Ordinance 1983: যানবাহন ও সড়ক নিরাপত্তা নিয়ন্ত্রণ।",
           "Traffic Rules 1999: সিগন্যাল, স্পিড সীমা ও নিরাপত্তা বিধি।"
         ],
         guidance: [
           "ট্রাফিক আইন মেনে যানবাহন চালান।",
           "দুর্ঘটনা হলে পুলিশকে অবিলম্বে জানান।",
           "প্রয়োজন হলে ট্রাফিক কমিশনার বা স্থানীয় আইনজীবীর সাহায্য নিন।"
         ],
         caution: [
           "অমান্য করলে জরিমানা বা কারাদণ্ড হতে পারে।",
           "দ্রুতগতি বা অসতর্কতার কারণে দুর্ঘটনা ঘটতে পারে।"
         ]
       }
     },

     // Consumer Rights
     {
       keywords: ["ভোক্তা অধিকার", "consumer rights"],
       response: {
         laws: [
           "Consumer Protection Act 2009: ভোক্তা অধিকার এবং প্রতারণা দমন।"
         ],
         guidance: [
           "ভোক্তা অধিকার লঙ্ঘনের ঘটনা নথিভুক্ত করুন।",
           "প্রয়োজনে ভোক্তা অধিকার সংস্থার সাথে যোগাযোগ করুন।",
           "চালানো পণ্য বা সেবার রিসিপ্ট এবং প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ করবেন না।",
           "প্রমাণ ছাড়া দাবি করা আইনি ঝুঁকিপূর্ণ।"
         ]
       }
     },

     // Domestic Violence
     {
       keywords: ["গার্হস্থ্য হিংসা", "domestic violence"],
       response: {
         laws: [
           "Domestic Violence (Prevention and Protection) Act 2010: গার্হস্থ্য হিংসা প্রতিরোধ।"
         ],
         guidance: [
           "প্রমাণ (ছবি, ভিডিও, ডাক্তারী রিপোর্ট) সংরক্ষণ করুন।",
           "নিরাপদ আশ্রয় কেন্দ্র বা থানায় অভিযোগ করুন।",
           "Family Court-এ মামলা করুন।"
         ],
         caution: [
           "হুমকি বা ভয় দেখানো থেকে বিরত থাকুন।",
           "সঠিক আইনি পরামর্শ নিন।"
         ]
       }
     },

     // Education Law
     {
       keywords: ["শিক্ষা আইন", "education law"],
       response: {
         laws: [
           "Education Act 2010: শিক্ষার্থীর অধিকার এবং বিদ্যালয় নীতি।"
         ],
         guidance: [
           "শিক্ষা সংক্রান্ত অভিযোগ বা অনিয়ম নথিভুক্ত করুন।",
           "প্রয়োজন হলে শিক্ষাবোর্ড বা শিক্ষা বিভাগে রিপোর্ট করুন।"
         ],
         caution: [
           "মিথ্যা তথ্য বা অসদাচরণ এড়ান।",
           "শিক্ষার ক্ষেত্রে বৈষম্য অনুমোদনযোগ্য নয়।"
         ]
       }
     },

     // Criminal Law
     {
       keywords: ["ফৌজদারি আইন", "criminal law", "crime"],
       response: {
         laws: [
           "Penal Code 1860: অপরাধ এবং শাস্তি সম্পর্কিত আইন।",
           "CrPC: ফৌজদারি মামলা পরিচালনার বিধি।"
         ],
         guidance: [
           "অপরাধ সংঘটিত হলে পুলিশে রিপোর্ট করুন।",
           "প্রমাণ সংরক্ষণ করুন এবং আইনানুগভাবে আদালতে উপস্থাপন করুন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ করা বেআইনি।",
           "অপরাধে জড়িত হলে কঠোর শাস্তি হতে পারে।"
         ]
       }
     },

     // Environmental Law
     {
       keywords: ["পরিবেশ আইন", "environment law", "pollution"],
       response: {
         laws: [
           "Environment Conservation Act 1995: পরিবেশ সুরক্ষা এবং দূষণ নিয়ন্ত্রণ।"
         ],
         guidance: [
           "দূষণ বা অবৈধ প্রকল্পের ঘটনা নথিভুক্ত করুন।",
           "প্রয়োজন হলে স্থানীয় পরিবেশ সংস্থা বা আদালতের সঙ্গে যোগাযোগ করুন।"
         ],
         caution: [
           "পরিবেশ আইনের লঙ্ঘন গুরুতর জরিমানা বা শাস্তিযোগ্য।"
         ]
       }
     },

     // Employment & Professional Dispute
     {
       keywords: ["চাকুরি বিরোধ", "employment dispute", "professional dispute"],
       response: {
         laws: [
           "Employment Act 2000: চাকুরি সংক্রান্ত অধিকার ও বাধ্যবাধকতা।",
           "Industrial Tribunal Rules: পেশাগত বিরোধ নিষ্পত্তি।"
         ],
         guidance: [
           "চুক্তি এবং প্রমাণ সংরক্ষণ করুন।",
           "প্রয়োজনে মধ্যস্থতা বা আদালতের মাধ্যমে সমাধান করুন।"
         ],
         caution: [
           "অসদাচরণ বা মিথ্যা অভিযোগ এড়ান।",
           "আইনি পরামর্শ ছাড়া গুরুতর সিদ্ধান্ত নেবেন না।"
         ]
       }
     },

     // Fraud & Scam
     {
       keywords: ["প্রতারণা", "fraud", "scam"],
       response: {
         laws: [
           "Penal Code, Section 420: প্রতারণা ও জালিয়াতি দমন।",
           "Consumer Protection Act: ভোক্তা সুরক্ষা।"
         ],
         guidance: [
           "প্রমাণ সংরক্ষণ করুন (চিঠি, ছবি, ভিডিও)।",
           "প্রয়োজনে থানায় অভিযোগ দাখিল করুন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ করা বেআইনি।",
           "সতর্কতা অবলম্বন না করলে আর্থিক ক্ষতি হতে পারে।"
         ]
       }
     },
     // Property Dispute
     {
       keywords: ["জমি", "মালিকানা", "property dispute"],
       response: {
         laws: [
           "Section 4: জমি ও সম্পত্তি সংক্রান্ত মামলা।",
           "Section 6: দলিল যাচাই এবং আদালতের নির্দেশ।"
         ],
         guidance: [
           "সম্পত্তি সম্পর্কিত সকল দলিল যাচাই করুন।",
           "প্রয়োজনে নোটারি বা আইনজীবীর সাহায্য নিন।",
           "আদালতে মামলা বা প্রমাণসমূহ উপস্থাপন করুন।"
         ],
         caution: [
           "দলিল বা প্রমাণে ত্রুটি এড়ান।",
           "মধ্যস্থতা ও আদালতের প্রক্রিয়া মেনে চলুন।"
         ]
       }
     },

     // Cybercrime
     {
       keywords: ["সাইবার সমস্যা", "cybercrime", "ICT"],
       response: {
         laws: [
           "ICT Act 2006, Section 57: অবৈধ বা ক্ষতিকর ডিজিটাল প্রকাশ নিষিদ্ধ।",
           "Digital Security Act 2018: অনলাইন হুমকি ও প্রতারণা দমন।"
         ],
         guidance: [
           "সাইবার হুমকি বা প্রতারণার প্রমাণ সংরক্ষণ করুন।",
           "পুলিশ বা CERT-BD-এ অভিযোগ দাখিল করুন।",
           "ব্যক্তিগত তথ্য ও লগ নিরাপদ রাখুন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ বা অননুমোদিত হ্যাকিং থেকে বিরত থাকুন।",
           "ধারা লঙ্ঘন করলে কঠোর আইনি শাস্তি হতে পারে।"
         ]
       }
     },

     // Divorce & Family Law (Expanded)
     {
       keywords: ["বিবাহ বিচ্ছেদ", "divorce", "family court"],
       response: {
         laws: [
           "Family Court Act 2010: বিবাহ-বিচ্ছেদ ও পরিবারিক মামলার বিধি।",
           "Personal Law Section: বৈবাহিক সমস্যা সমাধান।",
           "Guardians and Wards Act: সন্তানের হেফাজত সম্পর্কিত বিধি।"
         ],
         guidance: [
           "Family Court-এ আবেদন জমা দিন।",
           "প্রয়োজনীয় দলিলাদি ও বিবাহ সনদ প্রস্তুত রাখুন।",
           "মধ্যস্থতা বা সালিশ বোর্ডের মাধ্যমে মীমাংসা চেষ্টা করুন।",
           "আদালতে শুনানি চলাকালীন সমস্ত নথি সঠিকভাবে উপস্থাপন করুন।",
           "সন্তান বা সম্পত্তি বিতরণের ক্ষেত্রে আইনজীবীর পরামর্শ নিন।"
         ],
         caution: [
           "মামলা চলাকালীন অসদাচরণ থেকে বিরত থাকুন।",
           "গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার আগে আইনি পরামর্শ নিন।"
         ]
       }
     },

     // Labor & Workplace Dispute
     {
       keywords: ["শ্রম সমস্যা", "labor dispute", "employment law"],
       response: {
         laws: [
           "Bangladesh Labor Act 2006: শ্রমিক ও নিয়োগকর্তার অধিকার।",
           "Section 50-55: শ্রমিক নিরাপত্তা, বেতন ও ছুটির বিধান।"
         ],
         guidance: [
           "শ্রমিক ও নিয়োগকর্তা উভয় পক্ষের নথি প্রস্তুত রাখুন।",
           "যেকোনো ঝামেলা বা অনিয়ম নথিভুক্ত করুন।",
           "প্রয়োজনে শ্রম আদালতে মামলা বা মধ্যস্থতার চেষ্টা করুন।"
         ],
         caution: [
           "আইন অমান্য করলে জরিমানা বা শাস্তি হতে পারে।",
           "প্রকল্প ও চুক্তি ভঙ্গ এড়ানোর জন্য সতর্ক থাকুন।"
         ]
       }
     },

     // Consumer Fraud & Protection
     {
       keywords: ["ভোক্তা প্রতারণা", "consumer fraud", "consumer protection"],
       response: {
         laws: [
           "Consumer Protection Act 2009: ভোক্তা অধিকার সুরক্ষা।",
           "Penal Code Section 420: প্রতারণা ও জালিয়াতি দমন।"
         ],
         guidance: [
           "প্রমাণ সংরক্ষণ করুন (চিঠি, ছবি, ভিডিও)।",
           "প্রয়োজনে থানায় অভিযোগ দাখিল করুন।",
           "ভোক্তা অধিকার সংস্থার সঙ্গে যোগাযোগ করুন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ করা বেআইনি।",
           "অযাচিত কার্যক্রম এড়ান।"
         ]
       }
     },

     // Education & Student Rights
     {
       keywords: ["শিক্ষা সমস্যা", "student rights", "education law"],
       response: {
         laws: [
           "Education Act 2010: শিক্ষার্থীর অধিকার ও বিদ্যালয় নীতি।",
           "National Education Policy: শিক্ষার মান ও নীতি নির্ধারণ।"
         ],
         guidance: [
           "শিক্ষা সংক্রান্ত অভিযোগ নথিভুক্ত করুন।",
           "প্রয়োজনে শিক্ষাবোর্ড বা শিক্ষা বিভাগে রিপোর্ট করুন।",
           "বিদ্যালয় প্রশাসনের সাথে আলোচনা করুন।"
         ],
         caution: [
           "মিথ্যা তথ্য প্রদান করবেন না।",
           "শিক্ষার ক্ষেত্রে বৈষম্য সহ্যযোগ্য নয়।"
         ]
       }
     },
     // Traffic Violations
     {
       keywords: ["ট্রাফিক সমস্যা", "traffic", "road safety"],
       response: {
         laws: [
           "Motor Vehicle Ordinance 1983: সড়ক ও যানবাহন নিয়ন্ত্রণ।",
           "Traffic Rules 1999: ট্রাফিক সিগন্যাল, স্পিড সীমা ও আইন মেনে চলা বাধ্যতামূলক।"
         ],
         guidance: [
           "ট্রাফিক আইন মেনে যানবাহন চালান।",
           "যেকোনো দুর্ঘটনা বা অভিযোগ পুলিশের নিকট রিপোর্ট করুন।",
           "হেলমেট, সিটবেল্ট ও অন্যান্য নিরাপত্তা ব্যবস্থা অনুসরণ করুন।"
         ],
         caution: [
           "অমান্য করলে জরিমানা বা কারাদণ্ড হতে পারে।",
           "দ্রুতগতি বা অসতর্কতার কারণে দুর্ঘটনা ঘটতে পারে।"
         ]
       }
     },

     // Police & FIR Related
     {
       keywords: ["ধারা 154", "FIR", "police complaint"],
       response: {
         laws: [
           "CrPC ধারা 154: FIR (First Information Report) দাখিলের বিধান।",
           "যেকোনো অপরাধের ঘটনা পুলিশের নিকট জানাতে হবে।"
         ],
         guidance: [
           "প্রমাণ এবং তথ্যসহ FIR জমা দিন।",
           "প্রয়োজনে আইনজীবীর পরামর্শ নিন।",
           "ঘটনার বিবরণ সুস্পষ্টভাবে লিখুন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ করা বেআইনি।",
           "প্রমাণ ছাড়া কোনো মামলা দায়ী হতে পারে।"
         ]
       }
     },

     // Domestic Violence
     {
       keywords: ["গার্হস্থ্য সহিংসতা", "domestic violence", "abuse"],
       response: {
         laws: [
           "Domestic Violence (Prevention and Protection) Act 2010",
           "Penal Code Section 323: শারীরিক আঘাতের শাস্তি।"
         ],
         guidance: [
           "যদি হুমকি বা আঘাত হয়, তা নথিভুক্ত করুন।",
           "প্রয়োজনে থানায় অভিযোগ দাখিল করুন।",
           "সুরক্ষার জন্য স্থানীয় প্রশাসন বা NGO-র সঙ্গে যোগাযোগ করুন।"
         ],
         caution: [
           "অপরাধীকে সরাসরি konfrontation করা বিপজ্জনক হতে পারে।",
           "আইনি পরামর্শ ছাড়া ব্যবস্থা নেবেন না।"
         ]
       }
     },

     // Cyberbullying
     {
       keywords: ["সাইবার হ্যারাসমেন্ট", "cyberbullying", "online harassment"],
       response: {
         laws: [
           "ICT Act 2006, Section 57: ডিজিটাল হুমকি ও কুৎসা নিষিদ্ধ।",
           "Digital Security Act 2018: অনলাইন প্রতারণা ও হ্যারাসমেন্ট দমন।"
         ],
         guidance: [
           "প্রমাণ যেমন স্ক্রিনশট, চ্যাট লোগ সংরক্ষণ করুন।",
           "পুলিশ বা CERT-BD-এ অভিযোগ দাখিল করুন।",
           "প্রয়োজন হলে আইনজীবীর সাহায্য নিন।"
         ],
         caution: [
           "অনুমোদন ছাড়া কাউকে হুমকি বা তথ্য প্রকাশ করবেন না।",
           "ধারা লঙ্ঘন করলে আইনি শাস্তি হতে পারে।"
         ]
       }
     },

     // Intellectual Property & Copyright
     {
       keywords: ["মেধাস্বত্ব", "copyright", "IPR"],
       response: {
         laws: [
           "Copyright Act 2000: সাহিত্য, সঙ্গীত, চিত্রকর্ম ও সফটওয়্যার সংরক্ষণ।",
           "Patent and Design Act 1911: উদ্ভাবনী প্রযুক্তি ও নকশা সংরক্ষণ।"
         ],
         guidance: [
           "নিজের কাজ রেজিস্ট্রেশন করুন।",
           "অনুমোদন ছাড়া অন্যের কাজ ব্যবহার করবেন না।",
           "আইনি নথি ও চুক্তি সংরক্ষণ করুন।"
         ],
         caution: [
           "অন্যের কপিরাইট লঙ্ঘন করা বেআইনি।",
           "বাণিজ্যিক উদ্দেশ্যে অননুমোদিত ব্যবহার আইনি ঝুঁকি বাড়ায়।"
         ]
       }
     },

     // Consumer Rights
     {
       keywords: ["ভোক্তা অধিকার", "consumer rights", "consumer protection"],
       response: {
         laws: [
           "Consumer Protection Act 2009: ভোক্তা অধিকার সুরক্ষা।",
           "Penal Code Section 420: প্রতারণা ও জালিয়াতি দমন।"
         ],
         guidance: [
           "ভোক্তা অধিকার লঙ্ঘন হলে প্রমাণ সংরক্ষণ করুন।",
           "প্রয়োজনে ভোক্তা অধিকার সংস্থার কাছে অভিযোগ করুন।",
           "চুক্তি বা বিল ঠিকভাবে নথিভুক্ত করুন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ করা বেআইনি।",
           "অযাচিত কার্যক্রম এড়াতে সতর্ক থাকুন।"
         ]
       }
     },

     // Medical Negligence
     {
       keywords: ["চিকিৎসা ত্রুটি", "medical negligence", "doctor dispute"],
       response: {
         laws: [
           "Bangladesh Medical & Dental Council Act: চিকিৎসক ও স্বাস্থ্যসেবা নিয়ন্ত্রণ।",
           "Penal Code Section 304A: অবহেলার ফলে মৃত্যুর শাস্তি।"
         ],
         guidance: [
           "চিকিৎসা সংক্রান্ত নথি সংরক্ষণ করুন।",
           "প্রয়োজনে মেডিকেল বোর্ড বা আদালতে অভিযোগ করুন।",
           "আইনজীবীর পরামর্শ নিন।"
         ],
         caution: [
           "অযাচিত বা মিথ্যা অভিযোগ আইনি ঝুঁকি বাড়ায়।",
           "প্রমাণ ছাড়া মামলা করা না।"
         ]
       }
     },
     // Employment & Workplace Disputes
     {
       keywords: ["চাকুরি সমস্যা", "employment dispute", "workplace"],
       response: {
         laws: [
           "Bangladesh Labor Act 2006: শ্রমিক ও নিয়োগকর্তার অধিকার ও বাধ্যবাধকতা।",
           "Industrial Tribunal Rules: পেশাগত বিরোধ নিষ্পত্তি।"
         ],
         guidance: [
           "চুক্তি ও নথি সঠিকভাবে সংরক্ষণ করুন।",
           "শ্রমিক বা নিয়োগকর্তা উভয় পক্ষের অভিযোগ নথিভুক্ত করুন।",
           "প্রয়োজনে মধ্যস্থতা বা আদালতের মাধ্যমে সমাধান করুন।"
         ],
         caution: [
           "অপ্রীতিকর পরিস্থিতি এড়াতে আইনগত পরামর্শ নিন।",
           "মিথ্যা অভিযোগ বা অসদাচরণ সমস্যা বাড়াতে পারে।"
         ]
       }
     },

     // Land & Property Disputes
     {
       keywords: ["জমি বিরোধ", "land dispute", "property issue"],
       response: {
         laws: [
           "Section 6: জমি ও সম্পত্তি সংক্রান্ত দলিল যাচাই।",
           "Title Registration Act: সম্পত্তি মালিকানা নিশ্চিত করা।"
         ],
         guidance: [
           "সম্পত্তি সম্পর্কিত সকল দলিল যাচাই করুন।",
           "প্রয়োজনে স্থানীয় নোটারি বা আইনজীবীর সাহায্য নিন।",
           "আদালতে মামলা বা তফসিল অনুযায়ী প্রমাণ জমা দিন।"
         ],
         caution: [
           "দলিল বা প্রমাণে কোন ত্রুটি থেকে বিরত থাকুন।",
           "মধ্যস্থতা ও আদালতের প্রক্রিয়া মেনে চলুন।"
         ]
       }
     },

     // Divorce & Family Issues
     {
       keywords: ["বিবাহ বিচ্ছেদ", "divorce", "family court"],
       response: {
         laws: [
           "Family Court Act 2010: বিবাহ-বিচ্ছেদ ও পরিবারিক মামলার বিধি।",
           "Personal Law Section: বৈবাহিক সমস্যা সমাধান।"
         ],
         guidance: [
           "Family Court-এ আবেদন জমা দিন।",
           "প্রয়োজনীয় দলিলাদি ও বিবাহ সনদ প্রস্তুত রাখুন।",
           "মধ্যস্থতা বা সালিশ বোর্ডের মাধ্যমে মীমাংসা চেষ্টা করুন।",
           "আদালতে শুনানি চলাকালীন সমস্ত নথি সঠিকভাবে উপস্থাপন করুন।"
         ],
         caution: [
           "মামলা চলাকালীন অসদাচরণ থেকে বিরত থাকুন।",
           "গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার আগে আইনি পরামর্শ নিন।"
         ]
       }
     },

     // Consumer Protection
     {
       keywords: ["ভোক্তা অধিকার", "consumer rights", "fraud"],
       response: {
         laws: [
           "Consumer Protection Act 2009: ভোক্তা অধিকার সুরক্ষা।",
           "Penal Code Section 420: প্রতারণা ও জালিয়াতি দমন।"
         ],
         guidance: [
           "প্রমাণ সংরক্ষণ করুন (চুক্তি, বিল, ছবি)।",
           "প্রয়োজনে ভোক্তা অধিকার সংস্থার কাছে অভিযোগ করুন।",
           "অবৈধ চুক্তি বা প্রতারণা এড়াতে সতর্ক থাকুন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ করা বেআইনি।",
           "অযাচিত কার্যক্রম এড়াতে সতর্ক থাকুন।"
         ]
       }
     },

     // Cybercrime
     {
       keywords: ["সাইবার সমস্যা", "cybercrime", "ICT Act"],
       response: {
         laws: [
           "ICT Act 2006, Section 57: অবৈধ বা ক্ষতিকর ডিজিটাল প্রকাশ নিষিদ্ধ।",
           "Digital Security Act 2018: অনলাইন হুমকি ও প্রতারণা দমন।"
         ],
         guidance: [
           "সাইবার হুমকি বা প্রতারণা সম্পর্কে প্রমাণ সংরক্ষণ করুন।",
           "পুলিশ বা CERT-BD-এ অভিযোগ দাখিল করুন।",
           "ব্যক্তিগত তথ্য ও লগ নিরাপদ রাখুন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ বা অননুমোদিত হ্যাকিং থেকে বিরত থাকুন।",
           "ধারা লঙ্ঘন করলে কঠোর আইনি শাস্তি হতে পারে।"
         ]
       }
     },

     // Medical Negligence
     {
       keywords: ["চিকিৎসা ত্রুটি", "medical negligence", "doctor dispute"],
       response: {
         laws: [
           "Bangladesh Medical & Dental Council Act: চিকিৎসক ও স্বাস্থ্যসেবা নিয়ন্ত্রণ।",
           "Penal Code Section 304A: অবহেলার ফলে মৃত্যুর শাস্তি।"
         ],
         guidance: [
           "চিকিৎসা সংক্রান্ত নথি সংরক্ষণ করুন।",
           "প্রয়োজনে মেডিকেল বোর্ড বা আদালতে অভিযোগ করুন।",
           "আইনজীবীর পরামর্শ নিন।"
         ],
         caution: [
           "অযাচিত বা মিথ্যা অভিযোগ আইনি ঝুঁকি বাড়ায়।",
           "প্রমাণ ছাড়া মামলা করা না।"
         ]
       }
     },

     // Intellectual Property
     {
       keywords: ["মেধাস্বত্ব", "copyright", "IPR"],
       response: {
         laws: [
           "Copyright Act 2000: সাহিত্য, সঙ্গীত, চিত্রকর্ম ও সফটওয়্যার সংরক্ষণ।",
           "Patent and Design Act 1911: উদ্ভাবনী প্রযুক্তি ও নকশা সংরক্ষণ।"
         ],
         guidance: [
           "নিজের কাজ রেজিস্ট্রেশন করুন।",
           "অনুমোদন ছাড়া অন্যের কাজ ব্যবহার করবেন না।",
           "আইনি নথি ও চুক্তি সংরক্ষণ করুন।"
         ],
         caution: [
           "অন্যের কপিরাইট লঙ্ঘন করা বেআইনি।",
           "বাণিজ্যিক উদ্দেশ্যে অননুমোদিত ব্যবহার আইনি ঝুঁকি বাড়ায়।"
         ]
       }
     },
     // Traffic Violations
     {
       keywords: ["ট্রাফিক সমস্যা", "traffic violation", "road accident"],
       response: {
         laws: [
           "Motor Vehicle Ordinance 1983: সড়ক ও যানবাহন নিয়ন্ত্রণ।",
           "Traffic Rules 1999: ট্রাফিক সিগন্যাল, স্পিড সীমা ও আইন মেনে চলা বাধ্যতামূলক।"
         ],
         guidance: [
           "ট্রাফিক আইন মেনে যানবাহন চালান।",
           "যেকোনো দুর্ঘটনা বা অভিযোগ পুলিশের নিকট রিপোর্ট করুন।",
           "সিগন্যাল, হেলমেট এবং অন্যান্য নিরাপত্তা ব্যবস্থা অনুসরণ করুন।"
         ],
         caution: [
           "অমান্য করলে জরিমানা বা কারাদণ্ড হতে পারে।",
           "দ্রুতগতি বা অসতর্কতার কারণে দুর্ঘটনা ঘটতে পারে।"
         ]
       }
     },

     // Domestic Violence
     {
       keywords: ["ঘরোয়া হিংসা", "domestic violence", "family abuse"],
       response: {
         laws: [
           "Domestic Violence (Prevention and Protection) Act 2010: পারিবারিক হিংসা রোধ।",
           "Penal Code Section 325: শারীরিক আঘাত এবং নির্যাতন।"
         ],
         guidance: [
           "হুমকির প্রমাণ (ছবি, ভিডিও, মেডিকেল রিপোর্ট) সংরক্ষণ করুন।",
           "স্থানীয় থানায় অভিযোগ করুন।",
           "সাপোর্ট গ্রুপ বা আইনজীবীর পরামর্শ নিন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ থেকে বিরত থাকুন।",
           "নিজের ও পরিবারের নিরাপত্তা সর্বদা নিশ্চিত করুন।"
         ]
       }
     },

     // Education Disputes
     {
       keywords: ["শিক্ষা সমস্যা", "education dispute", "school issue"],
       response: {
         laws: [
           "Education Act 2010: শিক্ষাপ্রতিষ্ঠান ও শিক্ষার্থীর অধিকার।",
           "Right to Education Act: শিক্ষার্থীর মৌলিক অধিকার সুরক্ষা।"
         ],
         guidance: [
           "শিক্ষাপ্রতিষ্ঠানের অভিযোগ বা নথি সংরক্ষণ করুন।",
           "প্রয়োজনে স্থানীয় শিক্ষা বোর্ড বা আদালতের সাথে যোগাযোগ করুন।",
           "আইনগত পরামর্শ নিন।"
         ],
         caution: [
           "মিথ্যা তথ্য প্রদান আইন লঙ্ঘন হতে পারে।",
           "অপ্রয়োজনীয় বিরোধ এড়াতে মধ্যস্থতা করুন।"
         ]
       }
     },

     // Banking & Finance Issues
     {
       keywords: ["ব্যাংক সমস্যা", "finance dispute", "loan issue"],
       response: {
         laws: [
           "Bank Company Act 1991: ব্যাংক ও আর্থিক প্রতিষ্ঠান নিয়ন্ত্রণ।",
           "Contract Act 1872: ঋণ ও চুক্তি সম্পর্কিত বিধি।"
         ],
         guidance: [
           "ব্যাংকের নথি ও চুক্তি সংরক্ষণ করুন।",
           "ঋণ বা আর্থিক বিরোধের ক্ষেত্রে ব্যাংক ম্যানেজার বা আইনজীবীর সঙ্গে আলোচনা করুন।",
           "প্রমাণসহ অভিযোগ দাখিল করুন।"
         ],
         caution: [
           "মিথ্যা দাবী বা চুক্তি লঙ্ঘন আইনি ঝুঁকি বাড়ায়।",
           "আর্থিক লেনদেনে সতর্ক থাকুন।"
         ]
       }
     },

     // Environmental Law
     {
       keywords: ["পরিবেশ আইন", "environment", "pollution"],
       response: {
         laws: [
           "Bangladesh Environment Conservation Act 1995: পরিবেশ সংরক্ষণ।",
           "Penal Code Section 268-290: দূষণ ও পরিবেশের ক্ষতি প্রতিরোধ।"
         ],
         guidance: [
           "দূষণ বা পরিবেশের ক্ষতি হলে প্রমাণ নথিভুক্ত করুন।",
           "স্থানীয় পরিবেশ সংস্থা বা প্রশাসনের সঙ্গে যোগাযোগ করুন।",
           "আইন অনুযায়ী ব্যবস্থা গ্রহণ করুন।"
         ],
         caution: [
           "দূষণ বা পরিবেশ ক্ষতি করলে কঠোর জরিমানা বা শাস্তি হতে পারে।",
           "অবৈধ কার্যক্রম থেকে বিরত থাকুন।"
         ]
       }
     },

     // Contract Law
     {
       keywords: ["চুক্তি", "contract dispute", "agreement issue"],
       response: {
         laws: [
           "Contract Act 1872: চুক্তি আইন।",
           "Specific Relief Act 1877: চুক্তি লঙ্ঘন প্রতিকার।"
         ],
         guidance: [
           "চুক্তি কপি এবং সংশ্লিষ্ট নথি সংরক্ষণ করুন।",
           "চুক্তি লঙ্ঘনের ক্ষেত্রে আইনজীবীর সঙ্গে পরামর্শ করুন।",
           "মধ্যস্থতা বা আদালতের মাধ্যমে সমাধান করুন।"
         ],
         caution: [
           "চুক্তি লঙ্ঘন আইনগত ঝুঁকি বাড়ায়।",
           "মিথ্যা দাবী বা তথ্য প্রদান থেকে বিরত থাকুন।"
         ]
       }
     },

     // Criminal Offense
     {
       keywords: ["অপরাধ", "criminal offense", "crime"],
       response: {
         laws: [
           "Penal Code 1860: বিভিন্ন অপরাধের শাস্তি।",
           "CrPC 1973: অপরাধ তদন্ত ও প্রক্রিয়া।"
         ],
         guidance: [
           "অপরাধের প্রমাণ সংরক্ষণ করুন।",
           "পুলিশ বা আদালতের সঙ্গে সহযোগিতা করুন।",
           "আইনজীবীর পরামর্শ নিন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ করা বেআইনি।",
           "সংশ্লিষ্ট তথ্য গোপন করা আইনি সমস্যা সৃষ্টি করতে পারে।"
         ]
       }
     },
     // Cybercrime & Online Fraud
     {
       keywords: ["সাইবার ক্রাইম", "cybercrime", "online fraud", "ICT"],
       response: {
         laws: [
           "ICT Act 2006, Section 57: অবৈধ বা ক্ষতিকর ডিজিটাল প্রকাশ নিষিদ্ধ।",
           "Digital Security Act 2018: অনলাইন হুমকি ও প্রতারণা দমন।"
         ],
         guidance: [
           "সাইবার হুমকি বা প্রতারণার প্রমাণ সংরক্ষণ করুন।",
           "পুলিশ বা CERT-BD-এ অভিযোগ দাখিল করুন।",
           "ব্যক্তিগত তথ্য এবং লগ নিরাপদ রাখুন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ বা অননুমোদিত হ্যাকিং থেকে বিরত থাকুন।",
           "ধারা লঙ্ঘন করলে কঠোর আইনি শাস্তি হতে পারে।"
         ]
       }
     },

     // Labor Disputes
     {
       keywords: ["শ্রম সমস্যা", "labor dispute", "workplace issue"],
       response: {
         laws: [
           "Bangladesh Labor Act 2006: শ্রমিক ও নিয়োগকর্তার অধিকার ও বাধ্যবাধকতা।",
           "Section 50-55: শ্রমিক নিরাপত্তা, বেতন ও ছুটির বিধান।"
         ],
         guidance: [
           "শ্রমিক ও নিয়োগকর্তা উভয় পক্ষের নথি প্রস্তুত রাখুন।",
           "যেকোনো ঝামেলা বা অনিয়ম নথিভুক্ত করুন।",
           "প্রয়োজনে শ্রম আদালতে মামলা বা মধ্যস্থতার চেষ্টা করুন।"
         ],
         caution: [
           "আইন অমান্য করলে জরিমানা বা শাস্তি হতে পারে।",
           "চুক্তি ভঙ্গ এড়াতে সতর্ক থাকুন।"
         ]
       }
     },

     // Property & Land Disputes
     {
       keywords: ["জমি সমস্যা", "property dispute", "land issue"],
       response: {
         laws: [
           "Section 6: দলিল যাচাই এবং আদালতের নির্দেশ।",
           "Title Deed Law: সম্পত্তির বৈধতা নির্ধারণ।"
         ],
         guidance: [
           "সম্পত্তি সম্পর্কিত সকল দলিল যাচাই করুন।",
           "স্থানীয় নোটারি বা আইনজীবীর সাহায্য নিন।",
           "আদালতে মামলা বা তফসিল অনুযায়ী প্রমাণ জমা দিন।"
         ],
         caution: [
           "দলিল বা প্রমাণে কোন ত্রুটি থেকে বিরত থাকুন।",
           "মধ্যস্থতা ও আদালতের প্রক্রিয়া মেনে চলুন।"
         ]
       }
     },

     // Family Issues (Child Custody)
     {
       keywords: ["শিশু অভিভাবকত্ব", "child custody", "family law"],
       response: {
         laws: [
           "Family Court Act 2010: শিশু এবং পারিবারিক মামলার বিধি।",
           "Guardianship Act: শিশুর নিরাপত্তা ও হেফাজত।"
         ],
         guidance: [
           "শিশুর কল্যাণ প্রমাণের জন্য নথি সংরক্ষণ করুন।",
           "Family Court-এ আবেদনের মাধ্যমে হেফাজত মামলা করুন।",
           "মধ্যস্থতা বা সালিশ বোর্ডের মাধ্যমে সমাধান চেষ্টা করুন।"
         ],
         caution: [
           "শিশুর সুরক্ষা নিশ্চিত না করলে আইনগত সমস্যা হতে পারে।",
           "মিথ্যা তথ্য প্রদান থেকে বিরত থাকুন।"
         ]
       }
     },

     // Consumer Protection
     {
       keywords: ["ভোক্তা অধিকার", "consumer protection", "product issue"],
       response: {
         laws: [
           "Consumer Protection Act 2009: ভোক্তার অধিকার ও সুরক্ষা।",
           "Penal Code Section 420: প্রতারণা এবং জালিয়াতি প্রতিরোধ।"
         ],
         guidance: [
           "পণ্য বা সেবার প্রমাণ সংরক্ষণ করুন।",
           "অভিযোগ বা ক্ষতির নথি নিয়ে সংশ্লিষ্ট কর্তৃপক্ষের সঙ্গে যোগাযোগ করুন।",
           "আইনজীবীর পরামর্শ নিন।"
         ],
         caution: [
           "মিথ্যা অভিযোগ করা বেআইনি।",
           "সতর্ক না হলে আর্থিক ক্ষতি হতে পারে।"
         ]
       }
     },

     // Marriage & Divorce
     {
       keywords: ["বিবাহ", "marriage issue", "divorce"],
       response: {
         laws: [
           "Family Court Act 2010: বিবাহ-বিচ্ছেদ ও পরিবারিক মামলা।",
           "Personal Law Section: বৈবাহিক সমস্যা সমাধান।"
         ],
         guidance: [
           "Family Court-এ আবেদন জমা দিন।",
           "প্রয়োজনীয় দলিলাদি প্রস্তুত রাখুন।",
           "মধ্যস্থতা বা সালিশ বোর্ডের মাধ্যমে মীমাংসা চেষ্টা করুন।",
           "আদালতে শুনানি চলাকালীন সমস্ত নথি সঠিকভাবে উপস্থাপন করুন।"
         ],
         caution: [
           "মামলা চলাকালীন অসদাচরণ থেকে বিরত থাকুন।",
           "গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার আগে আইনি পরামর্শ নিন।"
         ]
       }
     },

     // Criminal Investigation
     {
       keywords: ["ফৌজদারি মামলা", "criminal case", "police investigation"],
       response: {
         laws: [
           "Penal Code 1860: বিভিন্ন অপরাধ ও শাস্তি।",
           "CrPC 1973: অপরাধ তদন্ত ও প্রক্রিয়া।"
         ],
         guidance: [
           "অপরাধের প্রমাণ সংরক্ষণ করুন।",
           "পুলিশ বা আদালতের সঙ্গে সহযোগিতা করুন।",
           "আইনজীবীর পরামর্শ নিন।"
         ],
         caution: [
           "মিথ্যা তথ্য প্রদান বা প্রমাণ লুকানো আইনি সমস্যা সৃষ্টি করতে পারে।",
           "সংশ্লিষ্ট আইন মেনে চলুন।"
         ]
       }
     },
     // Fundamental Rights – সংবিধান থেকে
     {
       keywords: ["ধারা 27", "Section 27", "Constitution", "সমান অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 27: নাগরিকদের সমান অধিকার।",
           "যেকোনো বৈষম্য আইনত নিষিদ্ধ।"
         ],
         guidance: [
           "আপনার অধিকার সম্পর্কে সচেতন থাকুন।",
           "যেকোনো বৈষম্যের ঘটনা নথিভুক্ত করুন এবং প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "অধিকার লঙ্ঘন হলে প্রশাসনের নিকট অভিযোগ করতে পারেন।",
           "গুরুত্বপূর্ণ ক্ষেত্রে আইনজীবীর পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 32", "Section 32", "Constitution", "Fundamental Rights", "জীবন"],
       response: {
         laws: [
           "সংবিধান ধারা 32: জীবন ও ব্যক্তিগত স্বাধীনতার অধিকার।",
           "কারাবাস বা বেআইনি হস্তক্ষেপ থেকে নাগরিকদের সুরক্ষা।"
         ],
         guidance: [
           "যেকোনো হুমকি বা অনিয়মের ক্ষেত্রে নিকটতম আদালতে আবেদন করুন।",
           "প্রয়োজনীয় প্রমাণ যেমন নথি বা ছবি সংরক্ষণ করুন।"
         ],
         caution: [
           "বেআইনি হস্তক্ষেপের বিরুদ্ধে সঠিকভাবে আইনি ব্যবস্থা নিন।",
           "সচেতনতা ছাড়া ব্যক্তিগত নিরাপত্তা ঝুঁকিপূর্ণ হতে পারে।"
         ]
       }
     },

     {
       keywords: ["ধারা 35", "Section 35", "Constitution", "Fundamental Rights", "নাগরিক নিরাপত্তা"],
       response: {
         laws: [
           "সংবিধান ধারা 35: স্বাধীনতা ও ব্যক্তিগত নিরাপত্তা নিশ্চিত।",
           "নাগরিকদের শারীরিক ও মানসিক নিরাপত্তা আইনের মাধ্যমে সুরক্ষিত।"
         ],
         guidance: [
           "যেকোনো হুমকি বা অনিয়মের ঘটনা নথিভুক্ত করুন।",
           "প্রয়োজনে স্থানীয় প্রশাসন বা আদালতের সঙ্গে যোগাযোগ করুন।"
         ],
         caution: [
           "বেআইনি হস্তক্ষেপে আইনি ব্যবস্থা নিতে দেরি করবেন না।",
           "নিজের নিরাপত্তা নিশ্চিত করতে সচেতন থাকুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 31", "Section 31", "Constitution", "Fundamental Rights", "শিক্ষা"],
       response: {
         laws: [
           "সংবিধান ধারা 31: শিক্ষা অধিকার।",
           "প্রত্যেক নাগরিকের জন্য প্রাথমিক শিক্ষা বাধ্যতামূলক।"
         ],
         guidance: [
           "শিক্ষার সুযোগ গ্রহণ করুন।",
           "যদি কোনো শিশু বা নাগরিক শিক্ষার অধিকার থেকে বঞ্চিত হয়, অভিযোগ করুন।"
         ],
         caution: [
           "শিক্ষা সংক্রান্ত অধিকার লঙ্ঘন বেআইনি।",
           "প্রয়োজন হলে আইনজীবীর সঙ্গে পরামর্শ করুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 39", "Section 39", "Constitution", "Fundamental Rights", "স্বাধীনতা"],
       response: {
         laws: [
           "সংবিধান ধারা 39: ব্যক্তিগত স্বাধীনতা।",
           "নাগরিকদের ব্যক্তিগত স্বাধীনতা লঙ্ঘন করা বেআইনি।"
         ],
         guidance: [
           "যেকোনো হস্তক্ষেপের ক্ষেত্রে আদালতে আবেদন করুন।",
           "প্রমাণ ও দলিল সংরক্ষণ করুন।"
         ],
         caution: [
           "বেআইনি বাধা প্রদানের ক্ষেত্রে কঠোর আইনি ব্যবস্থা গ্রহণ করা যেতে পারে।",
           "সচেতন থাকুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 44", "Section 44", "Constitution", "Fundamental Rights", "শ্রম"],
       response: {
         laws: [
           "সংবিধান ধারা 44: শ্রমিক ও কর্মচারীর অধিকার।",
           "শ্রমিকদের ন্যায্য সুবিধা ও নিরাপত্তা প্রদান বাধ্যতামূলক।"
         ],
         guidance: [
           "শ্রমিক বা কর্মচারী অধিকার লঙ্ঘন হলে স্থানীয় প্রশাসন বা শ্রম আদালতের সঙ্গে যোগাযোগ করুন।",
           "প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "বেআইনি ছাঁটাই বা শ্রম অধিকার লঙ্ঘন কঠোর শাস্তির কারণ হতে পারে।"
         ]
       }
     },
     {
       keywords: ["ধারা 28", "Section 28", "Constitution", "সমান অধিকার", "ধর্ম"],
       response: {
         laws: [
           "সংবিধান ধারা 28: সকল নাগরিকের সমান অধিকার।",
           "ধর্ম, বর্ণ, লিঙ্গ বা অঞ্চলভিত্তিক বৈষম্য নিষিদ্ধ।"
         ],
         guidance: [
           "আপনার অধিকার সম্পর্কে সচেতন থাকুন।",
           "যেকোনো বৈষম্যের ঘটনা প্রশাসনের কাছে রিপোর্ট করুন।"
         ],
         caution: [
           "বৈষম্য সম্পূর্ণভাবে আইনের দ্বারা দমনযোগ্য।",
           "গুরুত্বপূর্ণ ক্ষেত্রে আইনজীবীর পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 29", "Section 29", "Constitution", "শিক্ষা", "সাম্য"],
       response: {
         laws: [
           "সংবিধান ধারা 29: শিক্ষা অধিকার ও সমান সুযোগ।",
           "প্রত্যেক নাগরিককে শিক্ষা গ্রহণের সুযোগ নিশ্চিত।"
         ],
         guidance: [
           "যেকোনো শিক্ষাগত বৈষম্য বা বাধা প্রশাসনের নিকট রিপোর্ট করুন।",
           "শিক্ষা সংক্রান্ত নথি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "শিক্ষা অধিকার লঙ্ঘন বেআইনি।",
           "প্রয়োজনে আইনজীবীর সঙ্গে পরামর্শ করুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 33", "Section 33", "Constitution", "ধর্মের স্বাধীনতা"],
       response: {
         laws: [
           "সংবিধান ধারা 33: ধর্মীয় স্বাধীনতা।",
           "প্রত্যেক নাগরিক নিজের ধর্ম পালন এবং প্রচার করতে পারে।"
         ],
         guidance: [
           "ধর্মীয় স্বাধীনতা লঙ্ঘন হলে আদালতে আবেদন করুন।",
           "প্রয়োজনীয় প্রমাণ (চিঠি, ছবি, ভিডিও) সংরক্ষণ করুন।"
         ],
         caution: [
           "বেআইনি বাধা বা হস্তক্ষেপ কঠোর আইনি শাস্তির যোগ্য।"
         ]
       }
     },

     {
       keywords: ["ধারা 34", "Section 34", "Constitution", "ভাষা", "সংস্কৃতি"],
       response: {
         laws: [
           "সংবিধান ধারা 34: ভাষা ও সংস্কৃতির স্বাধীনতা।",
           "প্রত্যেক নাগরিক তার ভাষা, সাহিত্য ও সংস্কৃতিকে অনুসরণ করতে পারে।"
         ],
         guidance: [
           "ভাষা বা সাংস্কৃতিক অধিকার লঙ্ঘন হলে প্রশাসনের কাছে অভিযোগ করুন।",
           "প্রমাণ ও দলিল সংরক্ষণ করুন।"
         ],
         caution: [
           "বেআইনি হস্তক্ষেপ আইনত দণ্ডনীয়।"
         ]
       }
     },

     {
       keywords: ["ধারা 36", "Section 36", "Constitution", "প্রেস স্বাধীনতা", "মিডিয়া"],
       response: {
         laws: [
           "সংবিধান ধারা 36: প্রকাশ ও সংবাদপত্রের স্বাধীনতা।",
           "সীমিত শর্তে প্রশাসন কর্তৃক বাধা প্রদানযোগ্য।"
         ],
         guidance: [
           "যেকোনো অবৈধ চাপ বা সেন্সরশিপ রিপোর্ট করুন।",
           "প্রকাশিত বিষয়ের প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "মিথ্যা বা অপপ্রচার আইনের আওতায় হতে পারে।",
           "প্রকাশের আগে আইনি দিক বিবেচনা করুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 37", "Section 37", "Constitution", "সংগঠন", "সমবায়"],
       response: {
         laws: [
           "সংবিধান ধারা 37: সমবায় এবং সামাজিক সংগঠন প্রতিষ্ঠার স্বাধীনতা।",
           "সরকারি অনুমোদন ছাড়া আইনত বাধা সীমিত।"
         ],
         guidance: [
           "সংগঠন বা সমবায় প্রতিষ্ঠার আগে নিয়মাবলী মেনে চলুন।",
           "যেকোনো বাধা প্রশাসনের কাছে রিপোর্ট করুন।"
         ],
         caution: [
           "বেআইনি বাধা আইনত দণ্ডনীয়।",
           "সংগঠন পরিচালনার সময় আইন ও নিয়মাবলী মানুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 40", "Section 40", "Constitution", "আর্থিক অধিকার", "সম্পদ"],
       response: {
         laws: [
           "সংবিধান ধারা 40: ব্যক্তিগত সম্পত্তি ও আয় সংক্রান্ত অধিকার।",
           "বেআইনি হস্তক্ষেপ বা জবরদখল নিষিদ্ধ।"
         ],
         guidance: [
           "সম্পত্তি বা আয় লঙ্ঘনের ক্ষেত্রে আদালতে আবেদন করুন।",
           "দলিল ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "বেআইনি দখল বা জবরদখল কঠোর শাস্তির যোগ্য।"
         ]
       }
     },
     {
       keywords: ["ধারা 41", "Section 41", "Constitution", "শ্রম অধিকার", "কর্মচারী"],
       response: {
         laws: [
           "সংবিধান ধারা 41: শ্রমিকদের অধিকার ও সুরক্ষা।",
           "নিরাপদ কর্মপরিবেশ এবং ন্যায্য বেতন নিশ্চিত।"
         ],
         guidance: [
           "কোনো শ্রমিক অধিকার লঙ্ঘন হলে প্রশাসনের কাছে রিপোর্ট করুন।",
           "প্রমাণ ও চুক্তিপত্র সংরক্ষণ করুন।"
         ],
         caution: [
           "বেআইনি শ্রম অনুশীলন আইনের আওতায় আসে।",
           "প্রয়োজনে শ্রম আদালতের সঙ্গে পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 42", "Section 42", "Constitution", "স্বাস্থ্য অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 42: স্বাস্থ্যসেবা ও স্বাস্থ্য অধিকার।",
           "প্রত্যেক নাগরিককে প্রাথমিক স্বাস্থ্যসেবা পাওয়ার অধিকার আছে।"
         ],
         guidance: [
           "স্বাস্থ্যসেবা বাধাগ্রস্ত হলে প্রশাসনের নিকট অভিযোগ করুন।",
           "মেডিকেল রেকর্ড ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "স্বাস্থ্য অধিকার লঙ্ঘন বেআইনি।",
           "প্রয়োজনে স্বাস্থ্য আইনের সঙ্গে পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 43", "Section 43", "Constitution", "শিশু অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 43: শিশুদের নিরাপত্তা ও সুরক্ষা।",
           "শিশু শ্রম ও exploitation নিষিদ্ধ।"
         ],
         guidance: [
           "শিশু অধিকার লঙ্ঘনের ঘটনা পুলিশ বা শিশু অধিকার সংস্থার কাছে রিপোর্ট করুন।",
           "প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "বেআইনি শিশু শ্রম কঠোর শাস্তিযোগ্য।"
         ]
       }
     },

     {
       keywords: ["ধারা 44", "Section 44", "Constitution", "প্রাকৃতিক সম্পদ", "পরিবেশ"],
       response: {
         laws: [
           "সংবিধান ধারা 44: প্রাকৃতিক সম্পদ সংরক্ষণ ও পরিবেশ সুরক্ষা।",
           "সরকারি নীতিমালা অনুযায়ী সম্পদ ব্যবহার বাধ্যতামূলক।"
         ],
         guidance: [
           "পরিবেশের ক্ষতি হলে স্থানীয় পরিবেশ সংস্থার কাছে রিপোর্ট করুন।",
           "প্রয়োজনীয় প্রমাণ ও নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "পরিবেশ নাশ আইনত শাস্তিযোগ্য।",
           "নিয়ম অনুযায়ী অনুমোদন ছাড়া কার্যক্রম বন্ধ করুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 45", "Section 45", "Constitution", "নারীর অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 45: নারীর সমান অধিকার ও সুরক্ষা।",
           "কর্মসংস্থান, শিক্ষা এবং সামাজিক অংশগ্রহণে সমান সুযোগ।"
         ],
         guidance: [
           "নারী অধিকার লঙ্ঘনের ঘটনা প্রশাসনের কাছে রিপোর্ট করুন।",
           "প্রমাণ ও দলিল সংরক্ষণ করুন।"
         ],
         caution: [
           "বৈষম্য বা নিপীড়ন আইনের আওতায় আসে।",
           "গুরুত্বপূর্ণ ক্ষেত্রে আইনজীবীর পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 46", "Section 46", "Constitution", "মুক্তি অধিকার", "আন্দোলন"],
       response: {
         laws: [
           "সংবিধান ধারা 46: শান্তিপূর্ণ সমাবেশ এবং আন্দোলনের অধিকার।",
           "শর্তসাপেক্ষে সরকারের অনুমোদন বাধ্যতামূলক।"
         ],
         guidance: [
           "সমাবেশের আগে স্থানীয় প্রশাসনের নিকট নোটিশ দিন।",
           "যেকোনো বাধা বা হস্তক্ষেপ প্রশাসনের কাছে রিপোর্ট করুন।"
         ],
         caution: [
           "অবৈধ সমাবেশ আইনত শাস্তিযোগ্য।",
           "সকল সময় নিরাপত্তা নিশ্চিত করুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 47", "Section 47", "Constitution", "নাগরিক অধিকার", "সুরক্ষা"],
       response: {
         laws: [
           "সংবিধান ধারা 47: নাগরিকদের মৌলিক অধিকার ও সুরক্ষা।",
           "আইন অনুযায়ী ব্যক্তিগত স্বাধীনতা রক্ষা।"
         ],
         guidance: [
           "নাগরিক অধিকার লঙ্ঘন হলে আদালতে আবেদন করুন।",
           "প্রমাণ ও নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "অবৈধ হস্তক্ষেপ বা আটক আইনের আওতায় শাস্তিযোগ্য।"
         ]
       }
     },
     {
       keywords: ["ধারা 48", "Section 48", "Constitution", "শিক্ষা অধিকার", "শিক্ষা"],
       response: {
         laws: [
           "সংবিধান ধারা 48: প্রাথমিক ও মাধ্যমিক শিক্ষার অধিকার।",
           "প্রত্যেক নাগরিককে প্রাথমিক শিক্ষা বিনামূল্যে প্রদান বাধ্যতামূলক।"
         ],
         guidance: [
           "শিক্ষা অধিকার লঙ্ঘন হলে শিক্ষা বোর্ড বা প্রশাসনের কাছে রিপোর্ট করুন।",
           "প্রয়োজনীয় নথি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "শিক্ষা অধিকার লঙ্ঘন বেআইনি।",
           "গুরুত্বপূর্ণ ক্ষেত্রে আইনজীবীর পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 49", "Section 49", "Constitution", "ধর্মীয় স্বাধীনতা", "ধর্ম"],
       response: {
         laws: [
           "সংবিধান ধারা 49: ধর্ম স্বাধীনতার অধিকার।",
           "নাগরিকরা স্বাধীনভাবে ধর্ম পালন করতে পারবেন।"
         ],
         guidance: [
           "ধর্মীয় স্বাধীনতা লঙ্ঘনের ঘটনা প্রশাসনের কাছে রিপোর্ট করুন।",
           "প্রয়োজনীয় প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "ধর্মীয় অধিকার লঙ্ঘন আইনত শাস্তিযোগ্য।",
           "সমাজে সহনশীলতা বজায় রাখুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 50", "Section 50", "Constitution", "ভোটাধিকার", "নাগরিক অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 50: নাগরিকদের ভোটাধিকার।",
           "নির্বাচনে অংশগ্রহণের অধিকার সকল নাগরিকের জন্য নিশ্চিত।"
         ],
         guidance: [
           "ভোটাধিকার প্রয়োগে বাধা পেলে নির্বাচন কমিশনের কাছে রিপোর্ট করুন।",
           "প্রয়োজনীয় ভোট পরিচয়পত্র বা নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "ভোটাধিকার লঙ্ঘন বেআইনি।",
           "সতর্ক থাকুন এবং শান্তিপূর্ণভাবে ভোট প্রদান করুন।"
         ]
       }
     },
     {
       keywords: ["ধারা 51", "Section 51", "Constitution", "নাগরিক অধিকার", "সমতার অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 51: সকল নাগরিকের প্রতি সমান অধিকার নিশ্চিত।",
           "ধর্ম, বর্ণ, লিঙ্গ, বা সমাজিক অবস্থার ভিত্তিতে বৈষম্য বেআইনি।"
         ],
         guidance: [
           "সমতার অধিকার লঙ্ঘনের ঘটনা নথিভুক্ত করুন।",
           "প্রয়োজনে আদালত বা আইনজীবীর মাধ্যমে প্রতিকার নিন।"
         ],
         caution: [
           "বৈষম্য বা সমতার অধিকার লঙ্ঘন আইনত শাস্তিযোগ্য।",
           "যেকোনো পদক্ষেপের আগে প্রমাণ সংগ্রহ করুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 52", "Section 52", "Constitution", "সংবিধান", "ভাষা অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 52: সরকারি ও শিক্ষাপ্রতিষ্ঠানে ভাষার অধিকার।",
           "রাষ্ট্রভাষা বাংলা, তবে শিক্ষাপ্রতিষ্ঠানে অন্যান্য ভাষা শেখার অধিকার আছে।"
         ],
         guidance: [
           "ভাষা সংক্রান্ত কোনো অধিকার লঙ্ঘন হলে শিক্ষা বোর্ড বা প্রশাসনের কাছে রিপোর্ট করুন।",
           "প্রয়োজনীয় নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "ভাষা অধিকার লঙ্ঘন বেআইনি।",
           "আইনি পদক্ষেপের আগে প্রমাণ সংগ্রহ করুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 53", "Section 53", "Constitution", "সচিবালয়", "প্রশাসন"],
       response: {
         laws: [
           "সংবিধান ধারা 53: কেন্দ্রীয় ও স্থানীয় প্রশাসন সংক্রান্ত বিধান।",
           "সরকারি নীতি ও সিদ্ধান্ত গ্রহণে নাগরিকদের অংশগ্রহণ।"
         ],
         guidance: [
           "প্রশাসনিক সিদ্ধান্তে অসুবিধা হলে যথাযথ অফিসে অভিযোগ করুন।",
           "প্রয়োজনীয় নথি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "প্রশাসনিক বাধা বা অসদাচরণ আইনত শাস্তিযোগ্য।",
           "সমস্যার ক্ষেত্রে আইনজীবীর পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 54", "Section 54", "Constitution", "মত প্রকাশের স্বাধীনতা", "প্রেস"],
       response: {
         laws: [
           "সংবিধান ধারা 54: মত প্রকাশের স্বাধীনতা।",
           "সকল নাগরিকের নিজের মত প্রকাশের অধিকার রয়েছে।"
         ],
         guidance: [
           "মত প্রকাশে বাধা পেলে প্রশাসনের কাছে অভিযোগ করুন।",
           "প্রয়োজনীয় প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "অত্যধিক বা অবৈধ প্রকাশ আইন লঙ্ঘন হতে পারে।",
           "সচেতনভাবে এবং শান্তিপূর্ণভাবে মত প্রকাশ করুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 55", "Section 55", "Constitution", "সংঘঠন ও সমিতি", "মিটিং অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 55: শান্তিপূর্ণ সভা, সমিতি ও ধর্মীয় সংঘঠনের অধিকার।",
           "সকল নাগরিক শান্তিপূর্ণভাবে সমিতি ও মিটিং করার অধিকার রাখে।"
         ],
         guidance: [
           "অধিকার লঙ্ঘনের ঘটনা প্রশাসনের কাছে রিপোর্ট করুন।",
           "প্রয়োজনীয় নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "হিংসাত্মক বা বেআইনি সমিতি আইনত শাস্তিযোগ্য।",
           "সাবধান ও শান্তিপূর্ণভাবে অধিকার ব্যবহার করুন।"
         ]
       }
     },
     {
       keywords: ["ধারা 56", "Section 56", "Constitution", "রাষ্ট্রপতি", "নির্বাচন"],
       response: {
         laws: [
           "সংবিধান ধারা 56: রাষ্ট্রপতির নির্বাচন এবং ক্ষমতার সীমা।",
           "রাষ্ট্রপতি সংবিধান অনুযায়ী রাষ্ট্রের শীর্ষ কর্মকর্তা।"
         ],
         guidance: [
           "রাষ্ট্রপতি সংক্রান্ত অভিযোগ বা প্রমাণ প্রশাসনের কাছে জমা দিন।",
           "নির্বাচন ও কার্যক্রমে স্বচ্ছতা নিশ্চিত করুন।"
         ],
         caution: [
           "অবৈধ প্রভাব বা হস্তক্ষেপ আইনের লঙ্ঘন।",
           "প্রয়োজন হলে আইনজীবীর পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 57", "Section 57", "Constitution", "ICT Act", "ডিজিটাল অধিকার"],
       response: {
         laws: [
           "ICT Act ধারা 57: ডিজিটাল মাধ্যমে হুমকি, কুৎসা বা বিভ্রান্তিকর তথ্য দেওয়া নিষিদ্ধ।",
           "ডিজিটাল প্রকাশের নিয়ন্ত্রণ এবং নাগরিকদের সুরক্ষা।"
         ],
         guidance: [
           "অবৈধ কনটেন্টের ক্ষেত্রে পুলিশ বা CERT-BD-এ রিপোর্ট করুন।",
           "ব্যক্তিগত তথ্য নিরাপদে সংরক্ষণ করুন।"
         ],
         caution: [
           "ধারা লঙ্ঘন করলে জেল অথবা জরিমানা হতে পারে।",
           "সতর্কতা অবলম্বন করুন এবং অবৈধ পোস্ট থেকে বিরত থাকুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 58", "Section 58", "Constitution", "প্রধানমন্ত্রী", "সরকার"],
       response: {
         laws: [
           "সংবিধান ধারা 58: প্রধানমন্ত্রী ও কেবিনেটের ক্ষমতা ও দায়িত্ব।",
           "সরকারি নীতি ও প্রশাসনিক কার্যক্রম সংক্রান্ত বিধান।"
         ],
         guidance: [
           "সরকারি নীতি বা সিদ্ধান্তে অসুবিধা হলে যথাযথ কর্তৃপক্ষকে জানান।",
           "প্রয়োজনীয় নথি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "অবৈধ প্রভাব বা পদক্ষেপ আইনত শাস্তিযোগ্য।",
           "সমস্যা হলে আইনজীবীর পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 59", "Section 59", "Constitution", "সাংসদ", "নির্বাচন"],
       response: {
         laws: [
           "সংবিধান ধারা 59: সংসদ সদস্য নির্বাচনের নিয়ম ও ক্ষমতা।",
           "নির্বাচন প্রক্রিয়ায় স্বচ্ছতা এবং সুষ্ঠু নির্বাচন নিশ্চিত।"
         ],
         guidance: [
           "নির্বাচন সংক্রান্ত অভিযোগ নির্বাচন কমিশনের কাছে জানান।",
           "প্রয়োজনীয় দলিল ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "নির্বাচন প্রক্রিয়ায় হস্তক্ষেপ বেআইনি।",
           "আইনি পদক্ষেপের আগে প্রমাণ সংগ্রহ করুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 60", "Section 60", "Constitution", "নাগরিক কর্তব্য", "শিক্ষা"],
       response: {
         laws: [
           "সংবিধান ধারা 60: নাগরিকদের শিক্ষার অধিকার ও কর্তব্য।",
           "প্রাথমিক ও মাধ্যমিক শিক্ষার প্রয়োজনীয়তা এবং সরকারের দায়িত্ব।"
         ],
         guidance: [
           "শিক্ষা সংক্রান্ত অধিকার লঙ্ঘন হলে স্থানীয় শিক্ষা অফিসে অভিযোগ করুন।",
           "শিক্ষা সংক্রান্ত নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "শিক্ষা অধিকার লঙ্ঘন বেআইনি।",
           "আইনি পদক্ষেপের আগে যথাযথ প্রমাণ রাখুন।"
         ]
       }
     },
     {
       keywords: ["ধারা 61", "Section 61", "Constitution", "রাষ্ট্রপতি নির্বাচন"],
       response: {
         laws: [
           "সংবিধান ধারা 61: রাষ্ট্রপতির নির্বাচনের প্রক্রিয়া ও যোগ্যতা।",
           "রাষ্ট্রপতি নির্বাচনের সময় ভোটিং ও প্রত্যাহারের বিধান।"
         ],
         guidance: [
           "নির্বাচন সংক্রান্ত কোন অসুবিধা নির্বাচন কমিশনের কাছে জানান।",
           "প্রয়োজনীয় প্রমাণ ও নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "অবৈধ প্রভাব বা হস্তক্ষেপ আইনত শাস্তিযোগ্য।",
           "আইনি পদক্ষেপের আগে সঠিক প্রমাণ সংগ্রহ করুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 62", "Section 62", "Constitution", "প্রধানমন্ত্রী"],
       response: {
         laws: [
           "সংবিধান ধারা 62: প্রধানমন্ত্রী ও কেবিনেট মন্ত্রিসভার নির্বাচন ও নিয়ম।",
           "প্রধানমন্ত্রীর দায়িত্ব ও ক্ষমতার সীমা।"
         ],
         guidance: [
           "সরকারি নীতি বা সিদ্ধান্তে অসুবিধা হলে যথাযথ কর্তৃপক্ষকে জানান।",
           "প্রয়োজনীয় দলিলাদি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "অবৈধ পদক্ষেপ আইনত শাস্তিযোগ্য।",
           "আইনি পদক্ষেপের আগে পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 63", "Section 63", "Constitution", "সাংসদ"],
       response: {
         laws: [
           "সংবিধান ধারা 63: সংসদ সদস্য নির্বাচন ও দায়িত্ব।",
           "নির্বাচিত সংসদ সদস্যের শপথ ও কর্তব্য।"
         ],
         guidance: [
           "সাংসদ সংক্রান্ত অভিযোগ নির্বাচন কমিশনের কাছে জানান।",
           "প্রয়োজনীয় দলিলাদি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "অবৈধ হস্তক্ষেপ বা প্রভাব আইনত শাস্তিযোগ্য।",
           "আইনি পদক্ষেপের আগে প্রমাণ সংগ্রহ করুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 64", "Section 64", "Constitution", "নাগরিক অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 64: নাগরিকদের মৌলিক অধিকার ও কর্তব্য।",
           "নাগরিকদের জীবনের নিরাপত্তা ও স্বাধীনতা সুরক্ষিত।"
         ],
         guidance: [
           "অধিকার লঙ্ঘনের ঘটনা প্রশাসনের কাছে রিপোর্ট করুন।",
           "প্রয়োজনীয় দলিল ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "অধিকার লঙ্ঘন বেআইনি।",
           "আইনি পদক্ষেপের আগে যথাযথ প্রমাণ রাখুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 65", "Section 65", "Constitution", "শিক্ষা অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 65: শিক্ষার অধিকার ও দায়িত্ব।",
           "সরকারের শিক্ষাব্যবস্থা ও নাগরিকের শিক্ষাগত সুবিধা।"
         ],
         guidance: [
           "শিক্ষা সংক্রান্ত সমস্যা স্থানীয় শিক্ষা অফিসে রিপোর্ট করুন।",
           "শিক্ষা সংক্রান্ত নথি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "শিক্ষা অধিকার লঙ্ঘন বেআইনি।",
           "আইনি পদক্ষেপের আগে যথাযথ প্রমাণ সংগ্রহ করুন।"
         ]
       }
     },
     {
       keywords: ["ধারা 66", "Section 66", "Constitution", "সংবিধান সংরক্ষণ"],
       response: {
         laws: [
           "সংবিধান ধারা 66: সংবিধান রক্ষা ও মান্যতার দায়িত্ব।",
           "প্রশাসন ও সরকার সংবিধান অনুযায়ী কাজ করবে।"
         ],
         guidance: [
           "প্রশাসনিক বা আইনগত সমস্যা হলে যথাযথ কর্তৃপক্ষকে জানান।",
           "প্রয়োজনীয় দলিলাদি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "সংবিধান লঙ্ঘন বেআইনি।",
           "আইনি পদক্ষেপের আগে যথাযথ প্রমাণ রাখুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 67", "Section 67", "Constitution", "সরকারি দায়িত্ব"],
       response: {
         laws: [
           "সংবিধান ধারা 67: সরকারের কর্তব্য ও প্রশাসনিক দায়িত্ব।",
           "সরকারের সমস্ত কার্যক্রম সংবিধান অনুযায়ী হবে।"
         ],
         guidance: [
           "সরকারি কার্যক্রমে অসুবিধা বা ভ্রষ্টাচার দেখতে হলে রিপোর্ট করুন।",
           "প্রয়োজনীয় নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "অবৈধ কার্যক্রম আইনত শাস্তিযোগ্য।",
           "প্রমাণ ছাড়া অভিযোগ করা এড়াতে হবে।"
         ]
       }
     },

     {
       keywords: ["ধারা 68", "Section 68", "Constitution", "নাগরিক সচেতনতা"],
       response: {
         laws: [
           "সংবিধান ধারা 68: নাগরিকদের সচেতনতা ও অধিকার রক্ষা।",
           "প্রত্যেক নাগরিকের ন্যায়বিচারের অধিকার নিশ্চিত।"
         ],
         guidance: [
           "অধিকার লঙ্ঘনের ক্ষেত্রে যথাযথ কর্তৃপক্ষকে জানান।",
           "প্রমাণ সংরক্ষণ করে আইনি পদক্ষেপ নিন।"
         ],
         caution: [
           "অধিকার লঙ্ঘন বেআইনি।",
           "প্রমাণ ছাড়া আইনি পদক্ষেপ নেওয়া এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 69", "Section 69", "Constitution", "বেসরকারি প্রতিষ্ঠান"],
       response: {
         laws: [
           "সংবিধান ধারা 69: বেসরকারি প্রতিষ্ঠান ও সংস্থার কার্যক্রম।",
           "প্রাতিষ্ঠানিক নীতি ও নিয়ম সংবিধান অনুযায়ী হবে।"
         ],
         guidance: [
           "বেসরকারি প্রতিষ্ঠান সংক্রান্ত অভিযোগ যথাযথ কর্তৃপক্ষের কাছে জানান।",
           "প্রয়োজনীয় নথি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "বেসরকারি প্রতিষ্ঠানের ভুল বা অনিয়ম আইনত শাস্তিযোগ্য।",
           "প্রমাণ ছাড়া অভিযোগ করা এড়াতে হবে।"
         ]
       }
     },

     {
       keywords: ["ধারা 70", "Section 70", "Constitution", "আঞ্চলিক স্বায়ত্তশাসন"],
       response: {
         laws: [
           "সংবিধান ধারা 70: আঞ্চলিক ও স্থানীয় স্বায়ত্তশাসনের বিধান।",
           "স্থানীয় সরকারের কার্যক্রম স্বায়ত্তশাসন অনুযায়ী পরিচালিত হবে।"
         ],
         guidance: [
           "স্থানীয় স্বায়ত্তশাসন লঙ্ঘনের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রয়োজনীয় দলিলাদি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "অবৈধ হস্তক্ষেপ আইনত শাস্তিযোগ্য।",
           "প্রমাণ ছাড়া আইনি পদক্ষেপ নেওয়া এড়িয়ে চলুন।"
         ]
       }
     },
     {
       keywords: ["ধারা 71", "Section 71", "Constitution", "নাগরিক অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 71: নাগরিক অধিকার সংরক্ষণ।",
           "প্রত্যেক নাগরিককে সমান অধিকার নিশ্চিত।"
         ],
         guidance: [
           "অধিকার লঙ্ঘনের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রয়োজনীয় নথি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "অধিকার লঙ্ঘন বেআইনি।",
           "প্রমাণ ছাড়া অভিযোগ করা এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 72", "Section 72", "Constitution", "আইনি প্রক্রিয়া"],
       response: {
         laws: [
           "সংবিধান ধারা 72: আইনি প্রক্রিয়া ও আদালতের নিয়ম।",
           "আইন অনুযায়ী বিচারপ্রক্রিয়া সম্পন্ন হবে।"
         ],
         guidance: [
           "যেকোনো আইনি অসুবিধা হলে প্রমাণসহ আদালতে অভিযোগ জানান।",
           "প্রয়োজনীয় দলিলাদি সংরক্ষণ করুন।"
         ],
         caution: [
           "আইনি প্রক্রিয়ায় বাধা দেওয়া বেআইনি।",
           "প্রমাণ ছাড়া আইনি পদক্ষেপ নেওয়া এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 73", "Section 73", "Constitution", "শিক্ষা অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 73: শিক্ষার অধিকার ও নীতি।",
           "সকল নাগরিককে সমান শিক্ষা সুবিধা প্রদান নিশ্চিত।"
         ],
         guidance: [
           "শিক্ষার সুযোগে বাধা বা বৈষম্য দেখলে কর্তৃপক্ষকে জানান।",
           "প্রয়োজনীয় নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "শিক্ষার অধিকার লঙ্ঘন বেআইনি।",
           "প্রমাণ ছাড়া অভিযোগ করা এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 74", "Section 74", "Constitution", "স্বাস্থ্য অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 74: স্বাস্থ্য ও চিকিৎসা অধিকার নিশ্চিত।",
           "সকল নাগরিককে স্বাস্থ্যসেবা সুবিধা প্রদান নিশ্চিত।"
         ],
         guidance: [
           "স্বাস্থ্য অধিকার লঙ্ঘনের ঘটনা কর্তৃপক্ষকে জানান।",
           "প্রয়োজনীয় নথি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "স্বাস্থ্য অধিকার লঙ্ঘন বেআইনি।",
           "প্রমাণ ছাড়া অভিযোগ করা এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 75", "Section 75", "Constitution", "পরিবেশ অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 75: পরিবেশ ও প্রাকৃতিক সম্পদ রক্ষা।",
           "প্রতিটি নাগরিকের পরিবেশ রক্ষার দায়িত্ব।"
         ],
         guidance: [
           "পরিবেশ দূষণ বা সম্পদ অব্যবস্থাপনা প্রশাসনের কাছে জানান।",
           "প্রয়োজনীয় প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "পরিবেশ লঙ্ঘন আইনত শাস্তিযোগ্য।",
           "প্রমাণ ছাড়া অভিযোগ করা এড়িয়ে চলুন।"
         ]
       }
     },
     {
       keywords: ["ধারা 76", "Section 76", "Constitution", "নাগরিক স্বাধীনতা"],
       response: {
         laws: [
           "সংবিধান ধারা 76: নাগরিকদের মৌলিক স্বাধীনতা ও অধিকার।",
           "সকল নাগরিককে স্বাধীনভাবে জীবনযাপন ও মত প্রকাশের অধিকার।"
         ],
         guidance: [
           "নাগরিক অধিকার লঙ্ঘনের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রয়োজনীয় দলিলাদি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "মৌলিক অধিকার লঙ্ঘন বেআইনি।",
           "অধিকার রক্ষা নিশ্চিত করতে আইনগত পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 77", "Section 77", "Constitution", "সাম্য ও বৈষম্য"],
       response: {
         laws: [
           "সংবিধান ধারা 77: নাগরিকদের সমান অধিকার ও সুযোগ নিশ্চিত।",
           "কোনো বৈষম্য বা বিভাজন বেআইনি।"
         ],
         guidance: [
           "বৈষম্যের ঘটনা প্রশাসন বা মানবাধিকার সংস্থাকে জানান।",
           "প্রমাণ ও নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "বৈষম্য রোধে সচেতন থাকুন।",
           "আইনি পদক্ষেপ নেওয়ার আগে পরামর্শ নিন।"
         ]
       }
     },

     {
       keywords: ["ধারা 78", "Section 78", "Constitution", "সাংবিধানিক কর্তৃপক্ষ"],
       response: {
         laws: [
           "সংবিধান ধারা 78: সরকারি ও সাংবিধানিক কর্তৃপক্ষের কার্যক্রম নিয়ন্ত্রণ।",
           "সকল প্রশাসনিক কর্মকাণ্ড আইন অনুযায়ী পরিচালিত হবে।"
         ],
         guidance: [
           "সরকারি সিদ্ধান্ত বা আদেশে অসঙ্গতি দেখলে অভিযোগ জানান।",
           "প্রয়োজনীয় দলিলাদি সংরক্ষণ করুন।"
         ],
         caution: [
           "সরকারি আদেশ লঙ্ঘন বেআইনি।",
           "প্রমাণ ছাড়া অভিযোগ করা এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 79", "Section 79", "Constitution", "প্রেস ও প্রকাশ স্বাধীনতা"],
       response: {
         laws: [
           "সংবিধান ধারা 79: মত প্রকাশ ও প্রেস স্বাধীনতা নিশ্চিত।",
           "নাগরিক ও গণমাধ্যম স্বাধীনভাবে মত প্রকাশ করতে পারবে।"
         ],
         guidance: [
           "মত প্রকাশে বাধা বা হুমকি দেখলে প্রশাসনের কাছে জানান।",
           "প্রয়োজনীয় প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "মৌলিক স্বাধীনতা লঙ্ঘন বেআইনি।",
           "অযাচিত হস্তক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 80", "Section 80", "Constitution", "ভোটাধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 80: ভোটাধিকার নিশ্চিত।",
           "সকল যোগ্য নাগরিককে ভোট দিতে সমান সুযোগ প্রদান।"
         ],
         guidance: [
           "ভোটাধিকার লঙ্ঘনের ঘটনা নির্বাচন কমিশনের কাছে জানান।",
           "প্রয়োজনীয় প্রমাণ ও নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "ভোটাধিকার লঙ্ঘন বেআইনি।",
           "প্রমাণ ছাড়া অভিযোগ করা এড়িয়ে চলুন।"
         ]
       }
     },
     {
       keywords: ["ধারা 81", "Section 81", "Constitution", "জাতীয় নিরাপত্তা"],
       response: {
         laws: [
           "সংবিধান ধারা 81: দেশের নিরাপত্তা ও আইনশৃঙ্খলা রক্ষা।",
           "প্রয়োজনীয় ক্ষেত্রে সরকার জাতীয় নিরাপত্তা রক্ষা করতে ব্যবস্থা নিতে পারবে।"
         ],
         guidance: [
           "জাতীয় নিরাপত্তা হুমকির ঘটনা প্রশাসনের কাছে জানান।",
           "প্রমাণ ও তথ্য সংরক্ষণ করুন।"
         ],
         caution: [
           "জাতীয় নিরাপত্তা লঙ্ঘন বেআইনি।",
           "সতর্কতা অবলম্বন করুন এবং ভুল তথ্য প্রদান থেকে বিরত থাকুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 82", "Section 82", "Constitution", "আইন প্রণয়ন"],
       response: {
         laws: [
           "সংবিধান ধারা 82: আইন প্রণয়ন ও কার্যকর করার ক্ষমতা।",
           "সকল আইন সংবিধান অনুযায়ী প্রণীত হবে।"
         ],
         guidance: [
           "আইন সংক্রান্ত অসঙ্গতি বা প্রশ্ন থাকলে আইনজ্ঞের সঙ্গে পরামর্শ করুন।",
           "প্রয়োজনীয় নথি ও প্রমাণ সংরক্ষণ করুন।"
         ],
         caution: [
           "আইন লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 83", "Section 83", "Constitution", "শিক্ষা অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 83: নাগরিকদের মৌলিক শিক্ষা অধিকার নিশ্চিত।",
           "সকল নাগরিককে শিক্ষার সমান সুযোগ প্রদান।"
         ],
         guidance: [
           "শিক্ষা সংক্রান্ত অধিকার লঙ্ঘনের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রয়োজনীয় দলিলাদি সংরক্ষণ করুন।"
         ],
         caution: [
           "শিক্ষা অধিকার লঙ্ঘন বেআইনি।",
           "আইনি পরামর্শ ছাড়া পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 84", "Section 84", "Constitution", "চিকিৎসা অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 84: মৌলিক স্বাস্থ্য ও চিকিৎসা অধিকার।",
           "প্রত্যেক নাগরিকের স্বাস্থ্য সুরক্ষা নিশ্চিত করা হবে।"
         ],
         guidance: [
           "চিকিৎসা অধিকার লঙ্ঘনের ঘটনা সংশ্লিষ্ট কর্তৃপক্ষকে জানান।",
           "প্রয়োজনীয় মেডিকেল নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "স্বাস্থ্য অধিকার লঙ্ঘন বেআইনি।",
           "সঠিক প্রমাণ ব্যতীত অভিযোগ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 85", "Section 85", "Constitution", "সাংস্কৃতিক অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 85: নাগরিকদের সাংস্কৃতিক ও ভাষাগত অধিকার নিশ্চিত।",
           "সকল নাগরিককে নিজ সংস্কৃতি ও ভাষা রক্ষার সুযোগ।"
         ],
         guidance: [
           "সাংস্কৃতিক অধিকার লঙ্ঘনের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রয়োজনীয় দলিলাদি সংরক্ষণ করুন।"
         ],
         caution: [
           "সাংস্কৃতিক অধিকার লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },
     {
       keywords: ["ধারা 86", "Section 86", "Constitution", "মহিলাদের অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 86: মহিলাদের সমান অধিকার ও সুরক্ষা।",
           "কর্মসংস্থান, শিক্ষা ও রাজনৈতিক অংশগ্রহণে সমান সুযোগ নিশ্চিত।"
         ],
         guidance: [
           "মহিলাদের অধিকার লঙ্ঘনের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রয়োজনীয় দলিলাদি সংরক্ষণ করুন।"
         ],
         caution: [
           "লিঙ্গভিত্তিক বৈষম্য বেআইনি।",
           "আইনি পরামর্শ ছাড়া পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 87", "Section 87", "Constitution", "শিশু অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 87: শিশুদের মৌলিক অধিকার ও সুরক্ষা।",
           "শিশুদের শিক্ষা, স্বাস্থ্য ও নিরাপত্তা নিশ্চিত।"
         ],
         guidance: [
           "শিশু অধিকার লঙ্ঘনের ঘটনা সংশ্লিষ্ট কর্তৃপক্ষকে জানান।",
           "প্রমাণ এবং নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "শিশুদের অধিকার লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 88", "Section 88", "Constitution", "সামাজিক ন্যায়"],
       response: {
         laws: [
           "সংবিধান ধারা 88: সামাজিক ন্যায় ও সমতার নিশ্চয়তা।",
           "সকল নাগরিককে বৈষম্য থেকে সুরক্ষা প্রদান।"
         ],
         guidance: [
           "সামাজিক বৈষম্য বা অন্যায়ের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রমাণ এবং নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "সামাজিক ন্যায় লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 89", "Section 89", "Constitution", "মৃত্যুদণ্ড সীমাবদ্ধতা"],
       response: {
         laws: [
           "সংবিধান ধারা 89: মৃত্যুদণ্ড প্রয়োগ সীমিত ও সংবিধানসম্মত হতে হবে।",
           "জরুরি ও গুরুতর অপরাধের ক্ষেত্রে আদালত মৃত্যুদণ্ড দিতে পারে।"
         ],
         guidance: [
           "মৃত্যুদণ্ডের মামলা সম্পর্কিত সকল নথি সংরক্ষণ করুন।",
           "প্রয়োজন হলে অভিজ্ঞ আইনজীবীর সঙ্গে পরামর্শ করুন।"
         ],
         caution: [
           "অবৈধ বা অবাঞ্ছিত মৃত্যুদণ্ড বেআইনি।",
           "সঠিক প্রমাণ ব্যতীত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 90", "Section 90", "Constitution", "প্রসঙ্গিক আইন অনুসরণ"],
       response: {
         laws: [
           "সংবিধান ধারা 90: সকল আইন সংবিধান অনুযায়ী প্রণয়ন ও কার্যকর।",
           "প্রসঙ্গিক আইনগুলি নাগরিকের অধিকার ও দায়িত্ব নিশ্চিত করে।"
         ],
         guidance: [
           "প্রসঙ্গিক আইন সম্পর্কিত প্রশ্ন বা সমস্যা আইনজ্ঞের কাছে জানান।",
           "প্রয়োজনীয় দলিলাদি সংরক্ষণ করুন।"
         ],
         caution: [
           "আইন অমান্য করা বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },
     {
       keywords: ["ধারা 91", "Section 91", "Constitution", "ধর্ম ও বিবেকের স্বাধীনতা"],
       response: {
         laws: [
           "সংবিধান ধারা 91: ধর্ম ও বিবেকের স্বাধীনতা।",
           "নাগরিকেরা তাদের ধর্ম পালনের স্বাধীন অধিকার রাখে।"
         ],
         guidance: [
           "ধর্মীয় স্বাধীনতা লঙ্ঘনের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রমাণ ও নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "ধর্মীয় স্বাধীনতা লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 92", "Section 92", "Constitution", "শিক্ষার অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 92: নাগরিকদের মৌলিক শিক্ষার অধিকার।",
           "শিক্ষা সমানভাবে সকল নাগরিকের জন্য নিশ্চিত।"
         ],
         guidance: [
           "শিক্ষা অধিকার লঙ্ঘনের ঘটনা কর্তৃপক্ষকে জানান।",
           "প্রয়োজনীয় দলিলাদি সংরক্ষণ করুন।"
         ],
         caution: [
           "শিক্ষা অধিকার লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 93", "Section 93", "Constitution", "ভাষার অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 93: রাষ্ট্রভাষা ও মাতৃভাষার ব্যবহার।",
           "বাংলা ভাষা রাষ্ট্রভাষা হিসেবে সংবিধান দ্বারা স্বীকৃত।"
         ],
         guidance: [
           "ভাষা সংক্রান্ত বৈষম্য বা লঙ্ঘনের ঘটনা নথিভুক্ত করুন।",
           "প্রয়োজনে প্রশাসনের সঙ্গে যোগাযোগ করুন।"
         ],
         caution: [
           "ভাষার অধিকার লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 94", "Section 94", "Constitution", "স্বাস্থ্য অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 94: নাগরিকদের স্বাস্থ্য ও চিকিৎসা সুবিধা।",
           "সকল নাগরিকের জন্য মৌলিক স্বাস্থ্য সেবা নিশ্চিত।"
         ],
         guidance: [
           "স্বাস্থ্য অধিকার লঙ্ঘনের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রমাণ ও নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "স্বাস্থ্য অধিকার লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 95", "Section 95", "Constitution", "শ্রমিক অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 95: শ্রমিকদের মৌলিক অধিকার ও নিরাপত্তা।",
           "মজুরি, কর্মঘণ্টা, ছুটি ও স্বাস্থ্য সুরক্ষা নিশ্চিত।"
         ],
         guidance: [
           "শ্রমিক অধিকার লঙ্ঘনের ঘটনা কর্তৃপক্ষকে জানান।",
           "প্রয়োজনীয় দলিলাদি সংরক্ষণ করুন।"
         ],
         caution: [
           "শ্রমিক অধিকার লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },
     {
       keywords: ["ধারা 96", "Section 96", "Constitution", "নারী অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 96: নারী ও মেয়েদের মৌলিক অধিকার নিশ্চিত।",
           "নারী শিক্ষার সুযোগ, স্বাস্থ্য ও নিরাপত্তা সংরক্ষিত।"
         ],
         guidance: [
           "নারী অধিকার লঙ্ঘনের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রমাণ ও নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "নারী অধিকার লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 97", "Section 97", "Constitution", "শিশু অধিকার"],
       response: {
         laws: [
           "সংবিধান ধারা 97: শিশুদের মৌলিক অধিকার ও সুরক্ষা।",
           "শিশুরা শিক্ষার অধিকার ও স্বাস্থ্য সেবা পায়।"
         ],
         guidance: [
           "শিশু অধিকার লঙ্ঘনের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রয়োজনীয় দলিলাদি সংরক্ষণ করুন।"
         ],
         caution: [
           "শিশু অধিকার লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 98", "Section 98", "Constitution", "নাগরিক নিরাপত্তা"],
       response: {
         laws: [
           "সংবিধান ধারা 98: নাগরিকদের শারীরিক ও মানসিক নিরাপত্তা।",
           "নাগরিকদের বিরুদ্ধে বেআইনি হস্তক্ষেপ রোধ করা।"
         ],
         guidance: [
           "নাগরিক নিরাপত্তা লঙ্ঘনের ঘটনা প্রশাসনের কাছে জানান।",
           "প্রমাণ ও নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "নাগরিক নিরাপত্তা লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
       keywords: ["ধারা 99", "Section 99", "Constitution", "সমাজকল্যাণ"],
       response: {
         laws: [
           "সংবিধান ধারা 99: রাষ্ট্রের দায়িত্ব সমাজকল্যাণ ও সাধারণ জনগণের কল্যাণ নিশ্চিত করা।"
         ],
         guidance: [
           "সমাজকল্যাণে অবহেলার ঘটনা প্রশাসনের কাছে জানান।",
           "প্রমাণ ও নথি সংরক্ষণ করুন।"
         ],
         caution: [
           "অযাচিত অবহেলা বা লঙ্ঘন বেআইনি।",
           "আইনগত পরামর্শ নিতে ভয় পাবেন না।"
         ]
       }
     },

     {
       keywords: ["ধারা 100", "Section 100", "Constitution", "রাষ্ট্রীয় সম্পদ ও স্বার্থ"],
       response: {
         laws: [
           "সংবিধান ধারা 100: রাষ্ট্রীয় সম্পদ ও স্বার্থ রক্ষা করা।",
           "প্রশাসন ও নাগরিকদের মধ্যে দায়িত্ব নির্ধারণ।"
         ],
         guidance: [
           "রাষ্ট্রীয় সম্পদের অবৈধ ব্যবহার বা লঙ্ঘন নথিভুক্ত করুন।",
           "প্রয়োজন হলে প্রশাসনের সঙ্গে যোগাযোগ করুন।"
         ],
         caution: [
           "রাষ্ট্রীয় সম্পদের লঙ্ঘন বেআইনি।",
           "অযাচিত পদক্ষেপ এড়িয়ে চলুন।"
         ]
       }
     },

     {
          keywords: ["সাইবার সমস্যা", "cybercrime", "ICT"],  response: {
                   laws: [
                       "ICT Act 2006, Section 57: অবৈধ বা ক্ষতিকর ডিজিটাল প্রকাশ নিষিদ্ধ।",
                       "Digital Security Act 2018: অনলাইন হুমকি ও প্রতারণা দমন।"
                   ],
                   guidance: [
                       "সাইবার হুমকি বা প্রতারণা সম্পর্কে প্রমাণ সংরক্ষণ করুন।",
                       "পুলিশ বা CERT-BD-এ অভিযোগ দাখিল করুন।",
                       "ব্যক্তিগত তথ্য ও লগ নিরাপদ রাখুন।"
                   ],
                   caution: [
                       "মিথ্যা অভিযোগ বা অননুমোদিত হ্যাকিং থেকে বিরত থাকুন।",
                       "ধারা লঙ্ঘন করলে কঠোর আইনি শাস্তি হতে পারে।"
                   ]
         }
     },
     {
          keywords: ["ট্রাফিক সমস্যা", "traffic"], response: {
                   laws: [
                       "Motor Vehicle Ordinance 1983: সড়ক ও যানবাহন নিয়ন্ত্রণ।",
                       "Traffic Rules 1999: ট্রাফিক সিগন্যাল, স্পিড সীমা ও আইন মেনে চলা বাধ্যতামূলক।"
                   ],
                   guidance: [
                       "ট্রাফিক আইন মেনে যানবাহন চালান।",
                       "যেকোনো দুর্ঘটনা বা অভিযোগ পুলিশের নিকট রিপোর্ট করুন।",
                       "সিগন্যাল, হেলমেট এবং অন্যান্য নিরাপত্তা ব্যবস্থা অনুসরণ করুন।"
                   ],
                   caution: [
                       "অমান্য করলে জরিমানা বা কারাদণ্ড হতে পারে।",
                       "দ্রুতগতি বা অসতর্কতার কারণে দুর্ঘটনা ঘটতে পারে।"
                   ]
          }
     },
    {
         keywords: ["পেশাগত বিরোধ", "professional dispute"], response: {
                  laws: [
                      "Employment Act 2000: চাকুরি ও পেশাগত অধিকার।",
                      "Industrial Tribunal Rules: পেশাগত বিরোধ নিষ্পত্তি।"
                  ],
                  guidance: [
                      "চুক্তি ও নথি সঠিকভাবে সংরক্ষণ করুন।",
                      "প্রয়োজন হলে মধ্যস্থতা বা আদালতের মাধ্যমে সমাধান করুন।",
                      "পেশাগত আচরণ এবং নীতি মেনে চলুন।"
                  ],
                  caution: [
                      "অপ্রীতিকর পরিস্থিতি এড়াতে আইনগত পরামর্শ নিন।",
                      "অসদাচরণ বা মিথ্যা অভিযোগের ফলে সমস্যা বাড়তে পারে।"
                  ]
         }
    },
    {
        keywords: ["সেকশন 144", "Section 144"], response: {
            laws: [
                "ধারা 144: জরুরি পরিস্থিতিতে স্থানীয় ম্যাজিস্ট্রেটের ক্ষমতা।",
                "CrPC 144(1): জনশান্তি বজায় রাখতে আদেশ।"
            ],
            guidance: [
                "স্থানীয় ম্যাজিস্ট্রেটের সাথে যোগাযোগ করুন।",
                "প্রয়োজনীয় প্রমাণ বা ঘটনার বিবরণ জমা দিন।",
                "আদেশের ধারা ও সময়সীমা অনুযায়ী ব্যবস্থা গ্রহণ করুন।"
            ],
            caution: [
                "আদেশ অমান্য করলে আইনগত সমস্যায় পড়তে পারেন।",
                "প্রয়োজন হলে স্থানীয় আইনজীবীর সঙ্গে পরামর্শ করুন।"
            ]
        }
    },
    // Add more entries here as needed
];

// Send message with lawyer-style response
function sendMessage() {
    const inputEl = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userText = inputEl.value.trim();
    if (!userText) return;
    inputEl.value = '';

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = `<img src="usericon.png" alt="User"><div><strong>আপনি:</strong><br>${userText}</div>`;
    chatBox.appendChild(userMsg);
    scrollToBottom();

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = `<div><strong>AdvisorGPT:</strong> <span></span><span></span><span></span></div>`;
    chatBox.appendChild(typing);
    scrollToBottom();

    // AI response after delay
    setTimeout(() => {
        typing.remove();

        // Match user text with law database
        let matched = lawDatabase.find(entry =>
            entry.keywords.some(k => userText.toLowerCase().includes(k.toLowerCase()))
        );

        let laws = [], guidance = [], caution = [];
        if (matched) {
            laws = matched.response.laws;
            guidance = matched.response.guidance;
            caution = matched.response.caution;
        } else {
            // Fallback generic response
            laws = ["- প্রাসঙ্গিক আইন নেই।"];
            guidance = ["- পরামর্শ: প্রাসঙ্গিক আইনজীবীর সঙ্গে যোগাযোগ করুন।"];
            caution = ["- সতর্কতা: ভুল বা অসম্পূর্ণ তথ্য ব্যবহার থেকে বিরত থাকুন।"];
        }

        // Format response
        let responseHTML = `<strong>আপনি জিজ্ঞাসা করেছেন:</strong> '${userText}'<br><br>`;
        responseHTML += `<strong>Relevant Laws:</strong><br>${laws.map(l => "- " + l).join('<br>')}<br><br>`;
        responseHTML += `<strong>Step-by-Step Guidance:</strong><br>${guidance.map((g, i) => `${i + 1}. ${g}`).join('<br>')}<br><br>`;
        responseHTML += `<strong>Cautions & Advice:</strong><br>${caution.map(c => "- " + c).join('<br>')}`;

        // Append AI message
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai';
        aiMsg.innerHTML = `<div>${responseHTML}</div><img src="aiicon.png" alt="AI">`;
        chatBox.appendChild(aiMsg);
        scrollToBottom();
    }, 1500);
}

// Start voice recognition
function startRecognition() {
    if (!recognition) return alert("ভয়েস রিকগনিশন সাপোর্ট নেই।");

    recognition.start();
    console.log("ভয়েস রিকগনিশন শুরু হয়েছে...");

    recognition.onstart = function () {
        console.log("ভয়েস রেকগনিশন চালু আছে।");
    };

    recognition.onend = function () {
        console.log("ভয়েস রেকগনিশন বন্ধ হয়েছে।");
    };

    recognition.onerror = function (event) {
        alert("ভয়েস রিকগনিশনে সমস্যা হয়েছে: " + event.error);
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('user-input').value = transcript;
        sendMessage();
        recognition.stop(); // stop after processing
    };
}

// Optional: handle file upload
function handleFileUpload(event) {
    const chatBox = document.getElementById('chat-box');
    const file = event.target.files[0];
    if (!file) return;

    const fileMsg = document.createElement('div');
    fileMsg.className = 'message user';
    fileMsg.innerHTML = `<img src="usericon.png" alt="User"><div><strong>আপনি ফাইল আপলোড করেছেন:</strong><br>${file.name}</div>`;
    chatBox.appendChild(fileMsg);
    scrollToBottom();

    // Reset file input
    event.target.value = '';
}


addBtn.addEventListener('click', () => {
      const titleInput = document.getElementById('doc-title').value.trim();
      const urlInput = document.getElementById('doc-url').value.trim();

      if(!titleInput || !urlInput) {
        alert("Please provide both title and URL!");
        return;
      }

      // Determine type (PDF or image)
      let type = 'pdf';
      if(urlInput.match(/\.(jpeg|jpg|png|gif)$/i)) type = 'image';

      // Create document card
      const card = document.createElement('div');
      card.classList.add('doc-card');

      let previewHTML = '';
      if(type === 'pdf') {
        previewHTML = `<iframe src="${urlInput}"></iframe>`;
      } else {
        previewHTML = `<img src="${urlInput}" alt="${titleInput}">`;
      }

      card.innerHTML = `
        <h3>${titleInput}</h3>
        <div class="doc-preview">${previewHTML}</div>
        <div class="doc-actions">
          <a href="${urlInput}" target="_blank" class="btn-view"><i class="fa-solid fa-eye"></i> View</a>
          <a href="${urlInput}" download class="btn-download"><i class="fa-solid fa-download"></i> Download</a>
        </div>
      `;

      docContainer.appendChild(card);

      // Reset inputs
      document.getElementById('doc-title').value = '';
      document.getElementById('doc-url').value = '';
    });

    particlesJS("particles-js", {
    particles: {
      number: { value: 80 },
      color: { value: "#1E90FF" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      line_linked: { enable: true, distance: 120, color: "#00BFFF", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2 }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
      modes: { grab: { distance: 150, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });