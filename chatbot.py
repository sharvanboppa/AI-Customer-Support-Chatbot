
import json
import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class CustomerSupportBot:

    def __init__(self, faq_path):

        self.faq_path = faq_path
        self.faqs = self.load_faqs()

        if not self.faqs:
            raise ValueError("FAQ database is empty.")

        self.vectorizer = TfidfVectorizer(
            lowercase=True,
            stop_words="english",
            ngram_range=(1, 2),
            sublinear_tf=True
        )

        self.questions = []
        self.question_faq_indices = []

        for index, faq in enumerate(self.faqs):

            all_questions = [faq["question"]]

            all_questions.extend(
                faq.get("alternatives", [])
            )

            for question in all_questions:
                self.questions.append(question)
                self.question_faq_indices.append(index)

        self.question_vectors = self.vectorizer.fit_transform(
            self.questions
        )


    def load_faqs(self):

        if not os.path.exists(self.faq_path):
            raise FileNotFoundError(
                f"FAQ file not found: {self.faq_path}"
            )

        with open(
            self.faq_path,
            "r",
            encoding="utf-8"
        ) as file:

            faqs = json.load(file)

        return faqs


    def get_response(self, user_message):

        user_message = user_message.strip()

        if not user_message:

            return {
                "answer": "Please enter a question.",
                "category": "General Support",
                "confidence": 0,
                "matched": False
            }

        # GREETING DETECTION
        greetings = [
            "hi",
            "hello",
            "hey",
            "good morning",
            "good afternoon",
            "good evening"
        ]

        if user_message.lower() in greetings:

            return {
                "answer": (
                    "Hello! Welcome to SupportMate. "
                    "I'm your AI customer support assistant. "
                    "You can ask me about orders, payments, "
                    "shipping, returns, and accounts. "
                    "How can I help you?"
                ),
                "category": "General Support",
                "confidence": 1.0,
                "matched": True
            }

        # TRANSFORM USER QUESTION
        user_vector = self.vectorizer.transform(
            [user_message]
        )

        # CALCULATE SIMILARITY
        similarities = cosine_similarity(
            user_vector,
            self.question_vectors
        ).flatten()

        best_match_index = int(similarities.argmax())

        confidence = float(
            similarities[best_match_index]
        )

        faq_index = self.question_faq_indices[
            best_match_index
        ]

        matched_faq = self.faqs[faq_index]

        # MATCHING THRESHOLD
        threshold = 0.16

        if confidence >= threshold:

            return {
                "answer": matched_faq["answer"],
                "category": matched_faq["category"],
                "confidence": round(confidence, 3),
                "matched": True
            }

        return {
            "answer": (
                "I'm sorry, I couldn't understand your question. "
                "Please try asking about orders, payments, "
                "shipping, returns, accounts, or general support."
            ),
            "category": "General Support",
            "confidence": round(confidence, 3),
            "matched": False
        }


    def get_suggestions(self):

        return [
            {
                "question": faq["question"],
                "category": faq["category"]
            }
            for faq in self.faqs[:8]
        ]
