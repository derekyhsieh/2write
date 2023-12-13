# 2write
Welcome to 2write, a cloud-enabled AI-powered text editor designed for writing essays. This application is built using Mantine, React, Vite and Firebase, with OpenAI's GPT-3 model powering the AI features.

https://github.com/DerekHsiehDev/2write/assets/44245721/963ca5f5-ec23-4c9b-a341-f2ea34aaa0ee

## Features
2write provides a range of features that make it a comprehensive writing platform for students and writers, including:

- Essay management: Users can view, rename, delete and create new essays from the home page.
<img width="1491" alt="home" src="https://user-images.githubusercontent.com/44245721/227432605-2cc6e408-a85d-4532-aef1-1c10dd98362b.png">

- AI-generated snippets: 2write uses OpenAI's GPT-3 model to provide intelligent autocomplete suggestions for faster and more accurate writing.
- Notepad powered by NLP: The application is powered by natural language processing, allowing for seamless writing experiences.
- Essay outlines: Users can generate essay outlines by providing 2write with their essay prompt.
<img width="1491" alt="edit" src="https://user-images.githubusercontent.com/44245721/227432644-173518b3-7a2e-407c-8ed6-82c3c8314928.png">

- Rewrite feature: 2write provides a feature that allows users to highlight text and rewrite it with AI, with word count information displayed for the selected text.
<img width="935" alt="rewrite" src="https://user-images.githubusercontent.com/44245721/227432617-4c0b956f-792e-4cff-b9cf-81e9dac0a26f.png">

- Essay analytics: Users can track word count with or without citations, character count, top words, reading time and sentiment analysis, providing helpful insights into their writing.
<img width="1491" alt="analytics" src="https://user-images.githubusercontent.com/44245721/236967827-14103b3c-8638-4b0f-9b08-f7ac9b27a435.png">

- Todo list: There is a built-in todo list inside the editor for users to keep track of what they want to do.
<img width="1091" alt="todo" src="https://user-images.githubusercontent.com/44245721/227432625-0fba325c-af60-4472-b310-985f24527a53.png">

- AI plagiarism report: 2write provides a machine learning-powered plagiarism report that checks if text is written by a human or AI.
<img width="1491" alt="aicheck" src="https://user-images.githubusercontent.com/44245721/227432477-7b887f3f-14a0-4290-9d92-ea43b32e2018.png">
- File upload: Users can upload files in the .docx format and 2write will let them edit using its editor.
<img width="1491" alt="upload" src="https://user-images.githubusercontent.com/44245721/227432459-ab2b2768-fe58-4147-b9ab-a043cab672ad.png">

## Getting Started
To get started with 2write, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies by running `yarn`.
3. Set up a Firebase project and add your Firebase credentials to the .env.local file as: 
    - `VITE_FIREBASE_API_KEY`
    - `VITE_FIREBASE_AUTH_DOMAIN`
    - `VITE_FIREBASE_PROJECT_ID`
    - `VITE_FIREBASE_STORAGE_BUCKET`
    - `VITE_FIREBASE_MESSAGING_SENDER_ID`
    - `VITE_FIREBASE_APP_ID`
    - `VITE_FIREBASE_MEASUREMENT_ID`
    - `VITE_FIREBASE_SERVICE_ACCOUNT_KEY`
4. Set up an OpenAI account and add your API key to the .env.local file as `VITE_OPENAI_API_KEY`.
5. If you want email notifications for when OpenAI credits run out, create a SendGrid account and add the API key to the .env.local file as `VITE_SENDGRID_API_KEY`.
6. Run the development server by running `yarn dev`.
7. Navigate to http://localhost:3000 to view the application.

## Technologies

- [Mantine](https://mantine.dev) - Fully Featured React Component Library
- [React](https://reactjs.org) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev) - Build tool for modern web projects
- [Firebase](https://firebase.google.com) - Backend for authentication and database
- [OpenAI](https://openai.com) - Running fine-tuned and GPT-3 models

## Getting Help
If you have any questions or run into any issues with 2write, please feel free to reach out to our team by opening an issue on our GitHub repository. We are always happy to help and are committed to providing a positive experience for all users of our application.

## Contributing
If you're interested in contributing to 2write, we welcome your contributions!
