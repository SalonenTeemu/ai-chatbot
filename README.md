# ai-chatbot

This is a simple AI chatbot implemented with Google Gemini API using the 1.5 Flash model. You can type questions and it will try to answer them. It was interesting to test how AI can be used in web development.

## Running the application

The application can be tested on my [homepage](https://salonenteemu.fi/projects/ai-chatbot-app) as it is one of the projects there.

A Gemini API key can be retrieved from [Google AI Studio](https://aistudio.google.com/app/apikey) if you want to test this version of the application by setting the key as an environment variable. **Remember to not give any personal information to the chatbot.**

### Running the backend

- change working directory to the project root
- run `npm install` to install all dependencies
- run `npm run start` or `node server.js` to run the backend on port 5000

### Running the frontend

- change working directory to `frontend`
- run `npm install` to install all dependencies
- run `npm start` to run the frontend
- access the frontend from `http://localhost:3000`
