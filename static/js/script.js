
// ==========================================
// 1. HTML ELEMENT REFERENCES
// ==========================================

const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const chatContent = document.getElementById("chat-content");
const typingIndicator = document.getElementById("typing-indicator");
const sendButton = document.getElementById("send-button");
const clearButton = document.getElementById("clear-chat");

let isSending = false;


// ==========================================
// 2. SCROLL FUNCTIONS
// ==========================================

function scrollToBottom() {
    chatContent.scrollTo({
        top: chatContent.scrollHeight,
        behavior: "smooth"
    });
}

function scrollToChat() {
    document.getElementById("chat-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// ==========================================
// 3. ADD MESSAGE
// ==========================================

function addMessage(message, sender, category = "") {

    const row = document.createElement("div");
    row.className = `message-row ${sender}-row`;

    const avatar = document.createElement("div");
    avatar.className = `avatar ${sender}-avatar`;

    const icon = document.createElement("i");

    icon.className = sender === "bot"
        ? "fa-solid fa-sparkles"
        : "fa-solid fa-user";

    avatar.appendChild(icon);

    const content = document.createElement("div");
    content.className = "message-content";

    const name = document.createElement("div");
    name.className = "message-name";

    name.textContent = sender === "bot"
        ? "SupportMate AI"
        : "You";

    const bubble = document.createElement("div");
    bubble.className = `message-bubble ${sender}-bubble`;

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    bubble.appendChild(paragraph);

    const time = document.createElement("small");

    time.textContent = sender === "bot" && category
        ? `Category: ${category}`
        : "Just now";

    content.appendChild(name);
    content.appendChild(bubble);
    content.appendChild(time);

    row.appendChild(avatar);
    row.appendChild(content);

    chatContent.appendChild(row);

    scrollToBottom();
}


// ==========================================
// 4. TYPING INDICATOR
// ==========================================

function showTypingIndicator() {
    typingIndicator.classList.remove("hidden");
    scrollToBottom();
}

function hideTypingIndicator() {
    typingIndicator.classList.add("hidden");
}


// ==========================================
// 5. SEND MESSAGE TO FLASK API
// ==========================================

async function sendMessage(message) {

    message = message.trim();

    if (!message || isSending) {
        return;
    }

    isSending = true;

    addMessage(message, "user");

    messageInput.value = "";

    sendButton.disabled = true;

    showTypingIndicator();

    try {

        const response = await fetch("/api/chat", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        hideTypingIndicator();

        if (data.answer) {

            addMessage(
                data.answer,
                "bot",
                data.category || "General Support"
            );

        } else {

            addMessage(
                "Sorry, I couldn't find an answer. Please try another question.",
                "bot"
            );

        }

    } catch (error) {

        console.error("Chatbot Error:", error);

        hideTypingIndicator();

        addMessage(
            "I'm unable to connect to the support server right now. Please check that the Flask application is running and try again.",
            "bot"
        );

    } finally {

        isSending = false;

        sendButton.disabled = false;

        messageInput.focus();

    }
}


// ==========================================
// 6. LOAD FAQ SUGGESTIONS
// ==========================================

async function loadSuggestions() {

    const suggestionList =
        document.getElementById("suggestion-list");

    if (!suggestionList) {
        return;
    }

    suggestionList.innerHTML = "";

    try {

        const response = await fetch("/api/faqs");

        if (!response.ok) {
            throw new Error("Could not load FAQ suggestions.");
        }

        const data = await response.json();

        const suggestions = data.suggestions || [];

        suggestions.forEach(item => {

            const button = document.createElement("button");

            button.type = "button";

            button.className = "suggestion-chip";

            button.textContent = item.question;

            button.dataset.question = item.question;

            suggestionList.appendChild(button);

        });

    } catch (error) {

        console.error("FAQ Suggestions Error:", error);

    }
}


// ==========================================
// 7. CHAT FORM SUBMISSION
// ==========================================

chatForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const message = messageInput.value.trim();

    if (message) {
        sendMessage(message);
    }

});


// ==========================================
// 8. FAQ SUGGESTION CLICK
// ==========================================

chatContent.addEventListener("click", function(event) {

    const button = event.target.closest(".suggestion-chip");

    if (!button || isSending) {
        return;
    }

    const question = button.dataset.question;

    if (question) {
        sendMessage(question);
    }

});


// ==========================================
// 9. SUPPORT CATEGORY CLICK
// ==========================================

document.querySelectorAll(".support-card").forEach(card => {

    card.addEventListener("click", function() {

        if (isSending) {
            return;
        }

        const question = this.dataset.question;

        if (!question) {
            return;
        }

        scrollToChat();

        sendMessage(question);

    });

});


// ==========================================
// 10. NEED MORE HELP CLICK
// ==========================================

const helpCard = document.getElementById("help-card");

helpCard.addEventListener("click", function() {

    if (isSending) {
        return;
    }

    const question = this.dataset.question;

    scrollToChat();

    sendMessage(question);

});


// ==========================================
// 11. SIDEBAR NAVIGATION
// ==========================================

document.querySelectorAll('.sidebar-nav a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        document.querySelectorAll(".nav-link").forEach(nav => {
            nav.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// ==========================================
// 12. CLEAR CHAT
// ==========================================

clearButton.addEventListener("click", function() {

    if (isSending) {
        return;
    }

    chatContent.innerHTML = `

        <div class="chat-date">
            <span>NEW CONVERSATION</span>
        </div>

        <div class="message-row bot-row">

            <div class="avatar bot-avatar">
                <i class="fa-solid fa-sparkles"></i>
            </div>

            <div class="message-content">

                <div class="message-name">
                    SupportMate AI
                    <small>Just now</small>
                </div>

                <div class="message-bubble bot-bubble">

                    <p>Hello again! 👋</p>

                    <p>
                        Welcome back to SupportMate.
                        How can I help you today?
                    </p>

                </div>

            </div>

        </div>

        <div class="suggestion-section" id="suggestion-section">

            <div class="suggestion-title">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                QUICK QUESTIONS
            </div>

            <div class="suggestion-list" id="suggestion-list">
            </div>

        </div>

    `;

    hideTypingIndicator();

    loadSuggestions();

    chatContent.scrollTop = 0;

});


// ==========================================
// 13. INITIALIZE CHATBOT
// ==========================================

loadSuggestions();

messageInput.focus();
