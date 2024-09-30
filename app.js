// Function to create a new chat message element
function createMessageElement(message, sender, image = null) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    if (sender === 'user') {
        messageElement.classList.add('user-message');
    } else if (sender === 'bot') {
        messageElement.classList.add('bot-message');
    }

    if (image) {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.classList.add('uploaded-image');
        messageElement.appendChild(imgElement);
    } else {
        messageElement.innerText = message;
    }

    return messageElement;
}

// Function to simulate the image analysis process
function analyzeImage() {
    const botMessages = [
        'Analyzing image...',
        'Image analysis done.',
        'Extracting text...',
        'Text extraction done.',
        'Final analysis in progress...',
        'You can now ask queries related to the image.'
    ];

    let messageIndex = 0;

    // Simulate the process with setInterval
    const interval = setInterval(() => {
        const message = createMessageElement(botMessages[messageIndex], 'bot');
        document.getElementById('chatMessages').appendChild(message);
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
        messageIndex++;

        if (messageIndex === botMessages.length) {
            clearInterval(interval); // End simulation after all messages are sent
            document.getElementById('loader').classList.remove('active'); // Hide loader
        }
    }, 1000); // Delay of 1 second between each step
}

// Handle image upload
document.getElementById('imageInput').addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Display the uploaded image in the chat
            const imageMessage = createMessageElement(null, 'user', e.target.result);
            document.getElementById('chatMessages').appendChild(imageMessage);
            document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;

            // Show loader and simulate analysis process
            document.getElementById('loader').classList.add('active');
            setTimeout(analyzeImage, 1000);
        };

        reader.readAsDataURL(file); // Read the image file as a data URL

        // Clear the image input after use
        document.getElementById('imageInput').value = '';
    }
});

// Handle query input and message sending
function sendMessage() {
    const queryInput = document.getElementById('queryInput');
    const query = queryInput.value.trim();

    if (query) {
        // Display the user's query in the chat
        const userMessage = createMessageElement(query, 'user');
        document.getElementById('chatMessages').appendChild(userMessage);
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;

        // Clear the query input field
        queryInput.value = '';

        // Simulate bot response to the query
        setTimeout(function () {
            const botResponse = createMessageElement('This is the answer/response related to the image.', 'bot');
            document.getElementById('chatMessages').appendChild(botResponse);
            document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
        }, 1000); // Delay to mimic response time
    } else {
        alert('Please enter a query.');
    }
}

// Trigger send message with the Send button
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Trigger send message with the Enter key
document.getElementById('queryInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
