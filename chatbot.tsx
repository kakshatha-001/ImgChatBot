
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Analyzer Chatbot</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="chat-container">
        <!-- Chat header -->
        <div class="chat-header">
            <h1>Image Analyzer Chatbot</h1>
        </div>

        <!-- Chat messages area -->
        <div class="chat-messages" id="chatMessages">
            <!-- Chat messages will be injected dynamically here -->
        </div>

        <!-- Image upload and query section -->
        <div class="chat-footer">
            <!-- Image upload -->
            <div class="input-row">
                <input type="file" id="imageInput" accept="image/*" hidden />
                <label for="imageInput" id="imageIcon" class="image-upload-icon">
                    <img src="https://w7.pngwing.com/pngs/348/219/png-transparent-gallery-image-picture-ui-photo-user-interface-outline-icon.png"  alt="Upload" />
                </label>

                <!-- Query input -->
                <input type="text" id="queryInput" placeholder="Ask a question..." />

                <!-- Send button -->
                <button id="sendButton" class="send-button">
                    <img src="https://static.vecteezy.com/system/resources/previews/036/885/312/original/blue-send-icon-free-png.png"   alt="Send" />
                </button>
            </div>
        </div>

        <!-- Hidden loader (used for image processing simulation) -->
        <div id="loader" class="loader hidden">Processing Image...</div>
    </div>

    <script src="app.js"></script>
</body>
</html>
