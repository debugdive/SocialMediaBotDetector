# 📋 MASTER AI HANDOFF PROMPT (FOR GEMINI / CHATGPT)

> **Instructions for the user:**
> 1. Copy everything below this line.
> 2. Open [gemini.google.com](https://gemini.google.com) or [chatgpt.com](https://chatgpt.com) on your personal account.
> 3. Paste this into the chat and hit Enter. The AI will instantly know your entire project history!

---

Hello! You are my senior AI pair programmer and project mentor. I am presenting my Data Science minor final project, and I need you to understand all the history, architecture, and code that was built so you can guide me seamlessly through setup, troubleshooting, and presentation questions.

### 1. Project Overview & GitHub Repository
- **GitHub Repo URL:** https://github.com/debugdive/SocialMediaBotDetector
- **Project Name:** Social Media Bot & AI Detection Suite
- **Architecture:** Full-Stack Data Science Application (MLOps)
- **Components:**
  1. **Instagram Bot & Deepfake Detector:**
     - Backend: Python Flask server (`app.py`) with Scikit-Learn models.
     - Frontend Option A (In-the-wild): A Google Chrome Extension (`extension/`) that injects a scanning laser & banner directly onto live `instagram.com` pages.
     - Frontend Option B (Standalone clone): Responsive HTML/CSS/JS simulated Instagram interface (`templates/` and `static/style.css`).
  2. **AI vs Human Text Scanner:**
     - Standalone Streamlit application (`ai_detector.py`) for classifying whether pasted text was written by ChatGPT/LLMs or a real human.

---

### 2. Machine Learning Algorithms & Theory
- **Natural Language Processing (NLP):** `TfidfVectorizer` (Term Frequency-Inverse Document Frequency) used to vectorize text and detect spam/bot keywords (e.g., "free crypto", "robot", "AI-generated").
- **Classification Model:** `LogisticRegression` pipeline trained in Scikit-Learn to establish decision boundaries for text veracity and AI authorship.
- **Linguistic Markers for AI Detection:** Analysis of perplexity and stylistic vocabulary (e.g., ChatGPT's overuse of "delve", "tapestry", "in conclusion", "multifaceted", "testament").
- **Behavioral Heuristics:** Automated checks for suspicious follower-to-following ratios (e.g., thousands of following with near-zero followers).
- **Computer Vision (Deepfake Simulation):** Logic evaluating profile pictures for pixel smoothing artifacts and asymmetrical lighting characteristic of generative AI (e.g., Midjourney).

---

### 3. File Structure & 1-Click Launchers
- `app.py`: Flask backend serving API routes (`/api/extension_scan`, `/api/scan_info`) and standalone web clone routes (`/`, `/profile/<user_id>`).
- `ai_detector.py`: Streamlit app for real-time AI vs Human text classification.
- `run_bot_detector.bat`: 1-click Windows batch file that automatically runs `pip install -r requirements.txt` and starts `python app.py`.
- `run_ai_text_scanner.bat`: 1-click Windows batch file that launches `streamlit run ai_detector.py`.
- `extension/`: Chrome Extension folder (`manifest.json`, `content.js`, `background.js`, `popup.html`).
- `requirements.txt`: `flask`, `flask-cors`, `scikit-learn`, `streamlit`, `fpdf`.
- `Presentation_Slides.pdf`: 12-slide summary deck with speaker notes.

---

### 4. How the Project is Run on a New Laptop
1. Download repository ZIP from `https://github.com/debugdive/SocialMediaBotDetector` and extract.
2. Ensure Python 3.10+ is installed (with "Add Python to PATH" checked).
3. Double-click `run_bot_detector.bat` to launch the Instagram Bot Detector backend.
4. (Optional) Load `extension/` via `chrome://extensions/` (Developer Mode -> Load Unpacked) to scan live Instagram accounts.
5. Double-click `run_ai_text_scanner.bat` to launch the Streamlit text detector.

Please confirm you understand this entire project, and let me know you're ready to assist me with running, explaining, or debugging this project.
