# 🤖 AI-Powered Customer Support Chatbot

An NLP-based customer support chatbot built using **Python, Flask, and Machine Learning** that understands customer queries and provides relevant responses using TF-IDF Vectorization and Cosine Similarity.

The application automates frequently asked customer support queries, helping users access information related to orders, payments, shipping, returns, and refunds through an interactive web interface.

## 🚀 Project Overview

The AI-Powered Customer Support Chatbot is designed to simplify customer support by automatically identifying customer questions and retrieving the most relevant answers from a predefined FAQ dataset.

It uses Natural Language Processing (NLP) techniques to process user queries and match them with relevant FAQ responses, reducing the need for manual customer support.

## ✨ Key Features

- **NLP-Based Query Matching:** Understands customer queries using TF-IDF Vectorization and Cosine Similarity.
- **Automated FAQ Responses:** Retrieves relevant answers from a predefined FAQ dataset.
- **Order Support:** Provides assistance with customer order-related queries.
- **Payment Assistance:** Handles frequently asked payment-related questions.
- **Shipping & Delivery:** Provides shipping and delivery information.
- **Returns & Refunds:** Answers questions about return and refund policies.
- **Interactive Chat Interface:** Provides a user-friendly and responsive chatbot interface.
- **Quick FAQ Suggestions:** Allows users to select predefined questions for faster assistance.
- **REST API Integration:** Supports communication between the frontend and Flask backend.

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Programming Language | Python |
| Backend Framework | Flask |
| Machine Learning | Scikit-learn |
| NLP Techniques | TF-IDF Vectorization, Cosine Similarity |
| Frontend | HTML, CSS, JavaScript |
| Data Storage | JSON |
| Deployment | Render |
| Production Server | Gunicorn |
| Version Control | Git & GitHub |

## ⚙️ How It Works

1. The customer enters a question through the chatbot interface.
2. The frontend sends the query to the Flask backend through the chat API.
3. The backend processes the query using TF-IDF Vectorization.
4. Cosine Similarity calculates the similarity between the customer query and predefined FAQ questions.
5. The system identifies the most relevant FAQ based on the similarity score.
6. The corresponding answer is returned and displayed in the chatbot interface.

## 📂 Project Structure

```text
AI_POWERED_CUSTOMER_SUPPORT_CHATBOT/
│
├── app.py
├── requirements.txt
├── Procfile
├── .gitignore
│
├── data/
│   └── faqs.json
│
├── templates/
│   └── index.html
│
└── static/
    ├── css/
    │   └── style.css
    │
    └── js/
        └── script.js
```

## 💻 Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd AI_POWERED_CUSTOMER_SUPPORT_CHATBOT
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Virtual Environment

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Run the Application

```bash
python app.py
```

### 7. Open in Browser

Visit the following URL:

```text
http://127.0.0.1:5000
```

The chatbot application will be available locally.

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Loads the chatbot homepage |
| POST | `/api/chat` | Processes customer messages and returns chatbot responses |
| GET | `/api/faqs` | Retrieves frequently asked questions |
| GET | `/health` | Checks application health status |

## ☁️ Deployment

The application is deployed using **Render**, with **Gunicorn** serving as the production WSGI server.

Deployment configuration:

- **Platform:** Render
- **Framework:** Flask
- **Production Server:** Gunicorn
- **Start Command:** `gunicorn app:app`

## 🎯 Project Objectives

- Apply Natural Language Processing techniques to real-world customer support scenarios.
- Understand text vectorization and similarity-based question matching.
- Develop a full-stack web application using Flask.
- Integrate machine learning functionality with a web-based interface.
- Gain practical experience in application deployment and version control.

## 🔮 Future Enhancements

- Integrate Large Language Models (LLMs) for more natural conversations.
- Implement Retrieval-Augmented Generation (RAG) for improved response retrieval.
- Add conversation history and context awareness.
- Integrate a database for storing customer interactions.
- Expand the FAQ knowledge base.

## 👨‍💻 Author

**Sharvan Boppa**

Electronics and Communication Engineering Graduate | Aspiring Data Scientist | AI Enthusiast

**Areas of Interest:** Python, Machine Learning, Artificial Intelligence, and Natural Language Processing.

---

⭐ If you find this project interesting, consider giving the repository a star!
