
from flask import Flask, render_template, request, jsonify

from chatbot import CustomerSupportBot


app = Flask(__name__)

# Initialize chatbot using the FAQ database
bot = CustomerSupportBot("data/faqs.json")


# ==========================================
# HOME PAGE
# ==========================================

@app.route("/")
def home():
    return render_template("index.html")


# ==========================================
# CHAT API
# ==========================================

@app.route("/api/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json(silent=True) or {}

        message = data.get("message", "")

        if not isinstance(message, str):

            return jsonify({
                "error": "Message must be text."
            }), 400

        message = message.strip()

        if not message:

            return jsonify({
                "error": "Message cannot be empty."
            }), 400

        if len(message) > 500:

            return jsonify({
                "error": "Message is too long."
            }), 400

        response = bot.get_response(message)

        return jsonify(response)

    except Exception:

        app.logger.exception("Chat API error")

        return jsonify({
            "error": "An internal server error occurred."
        }), 500


# ==========================================
# FAQ SUGGESTIONS API
# ==========================================

@app.route("/api/faqs", methods=["GET"])
def faqs():

    return jsonify({
        "suggestions": bot.get_suggestions()
    })


# ==========================================
# HEALTH CHECK
# ==========================================

@app.route("/health", methods=["GET"])
def health():

    return jsonify({
        "status": "healthy",
        "message": "SupportMate is running successfully."
    })


# ==========================================
# RUN APPLICATION
# ==========================================

if __name__ == "__main__":

    app.run(debug=True)
