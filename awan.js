document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        appendMessage('You: ' + userInput);
        getWeather(userInput);
        document.getElementById('user-input').value = '';
    }
});

function appendMessage(message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

async function getWeather(location) {
    const apiKey = 'YOUR_API_KEY'; // Replace this with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather not found');
        const data = await response.json();
        const weatherInfo = `The weather in ${data.name} is ${data.weather[0].description} with a temperature of ${data.main.temp}°C.`;
        appendMessage('Bot: ' + weatherInfo);
    } catch (error) {
        appendMessage('Bot: Sorry, I couldn\'t find the weather for that location.');
    }
}
