# AI-Powered Customer Support Chatbot

## Project Overview

An NLP-based customer support chatbot developed using Python
and Flask. It understands customer questions and retrieves
relevant answers from a predefined FAQ dataset.

## Technologies Used

- Python
- Flask
- Scikit-learn
- TF-IDF Vectorization
- Cosine Similarity
- HTML
- CSS
- JavaScript
- JSON

## Features

- NLP-based question matching
- Automated FAQ responses
- Customer order support
- Payment-related assistance
- Shipping and delivery information
- Return and refund information
- Responsive chatbot interface
- Quick FAQ suggestions

## Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Navigate to the project:

cd AI_Customer_Support_Chatbot

Create a virtual environment:

python -m venv venv

Activate the environment on Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run the application:

python app.py

Open in your browser:

http://127.0.0.1:5000

## API Endpoints

- GET / : Chatbot homepage
- POST /api/chat : Send a customer message
- GET /api/faqs : Retrieve FAQ suggestions
- GET /health : Application health check

## Deployment

The application can be deployed using Render
with Gunicorn as the production server.