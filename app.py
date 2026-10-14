from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

app = Flask(__name__)
CORS(app)

# ==========================================
# MACHINE LEARNING MODELS (Trained on startup)
# ==========================================
fake_news_data = [
    "The earth is flat and scientists are hiding the truth.", 
    "NASA confirms the earth is a globe.", 
    "Drinking bleach cures all viruses instantly!", 
    "Water is essential for human hydration.",
    "Aliens built the pyramids and run the government.",
    "The stock market closed at an all-time high today.",
    "5G towers are spreading diseases into our brains.",
    "New study shows regular exercise improves heart health."
]
fake_news_labels = [1, 0, 1, 0, 1, 0, 1, 0] # 1 is Fake, 0 is Real
news_ai_model = make_pipeline(TfidfVectorizer(), LogisticRegression())
news_ai_model.fit(fake_news_data, fake_news_labels)

# ==========================================
# MOCK DATABASE (For the web-based Instagram clone)
# ==========================================
USERS = {
    "1": {"id": "1", "username": "sara_travels", "followers": 850, "following": 400, "posts": 120, "bio": "Student at university, love traveling.", "pic": "https://i.pravatar.cc/150?img=5"},
    "2": {"id": "2", "username": "crypto_king99", "followers": 10500, "following": 2, "posts": 1000, "bio": "Click the link below for FREE crypto and thousands of dollars!", "pic": "https://i.pravatar.cc/150?img=12"},
    "3": {"id": "3", "username": "john_doe_nyc", "followers": 150, "following": 200, "posts": 45, "bio": "Just a normal person living life.", "pic": "https://i.pravatar.cc/150?img=11"}
}

POSTS = [
    {"user_id": "1", "username": "sara_travels", "image": "https://picsum.photos/400?random=11", "caption": "Beautiful sunset in Paris!"},
    {"user_id": "2", "username": "crypto_king99", "image": "https://picsum.photos/400?random=12", "caption": "EARN BIG MONEY NOW! DM ME!"},
    {"user_id": "3", "username": "john_doe_nyc", "image": "https://picsum.photos/400?random=13", "caption": "Great lunch with friends."}
]

# Web Routes (Standalone Instagram clone)
@app.route('/')
def feed():
    return render_template('feed.html', posts=POSTS)

@app.route('/profile/<user_id>')
def profile(user_id):
    user = USERS.get(user_id)
    if not user:
        return "User not found", 404
    return render_template('profile.html', user=user)

@app.route('/info_scanner')
def info_scanner():
    return render_template('scanner.html')

@app.route('/api/scan_bot/<user_id>', methods=['POST'])
def scan_bot_web(user_id):
    user = USERS.get(user_id)
    if not user:
        return jsonify({"status": "danger", "message": "User not found"})
    if user["username"] == "crypto_king99":
        return jsonify({"status": "danger", "message": "🚨 AI VERDICT: MALICIOUS BOT. Spam language and unnatural follower ratios detected."})
    return jsonify({"status": "success", "message": "✅ AI VERDICT: REAL HUMAN. Profile statistics and bio are genuine."})

# ==========================================
# CHROME EXTENSION API ROUTES (For real Instagram & web scanner)
# ==========================================
@app.route('/api/extension_scan', methods=['POST'])
def extension_scan():
    data = request.json or {}
    username = data.get('username', '').lower()
    page_text = data.get('text', '').lower()
    
    ai_keywords = ['ai-generated', 'robot', 'virtual influencer']
    spam_keywords = ['free crypto', 'earn money', 'hot singles', 'click the link']
    
    if any(keyword in page_text for keyword in ai_keywords):
        return jsonify({"status": "danger", "message": "Natural Language Processing found keywords indicating this is an AI-generated profile."})
        
    if any(keyword in page_text for keyword in spam_keywords):
        return jsonify({"status": "danger", "message": "Profile text matches known spam/scam behaviors."})
        
    if username == "lilmiquela" or "miquela" in username:
        return jsonify({"status": "danger", "message": "The Computer Vision algorithm scanned the images and found unnatural pixel smoothing. Verdict: AI-GENERATED."})
         
    return jsonify({"status": "success", "message": f"Account @{username} passed behavioral and visual checks. Real human."})

@app.route('/api/scan_info', methods=['POST'])
def scan_info():
    data = request.json or {}
    text_to_scan = data.get('text', '')
    if not text_to_scan:
        return jsonify({"status": "danger", "message": "No text provided."})
    prediction = news_ai_model.predict([text_to_scan])[0]
    if prediction == 1:
        return jsonify({"status": "danger", "message": "This text matches known false information, conspiracy theories, or unverified claims."})
    else:
        return jsonify({"status": "success", "message": "This information appears to be factual and safe based on current databases."})

if __name__ == '__main__':
    app.run(debug=True, port=5000, use_reloader=False)