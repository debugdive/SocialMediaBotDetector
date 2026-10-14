from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Social Media Bot Detection - Presentation', 0, 1, 'C')
        self.ln(10)

pdf = PDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()

slides = [
    ("Slide 1: Title Slide", "Title: Social Media Bot Detection System\nSubtitle: A Multi-Modal Machine Learning Approach\nCourse: Minor in Data Science\n\nSpeaker Notes:\nGood morning everyone. Today I will be presenting my Data Science minor project: A Social Media Bot Detection System. I built a full-stack AI application designed to catch malicious bots hiding among real users."),
    ("Slide 2: The Problem", "The Threat: Automated bots cause fraud, spread misinformation, and manipulate trends.\nThe Evolution: Bots are no longer just spamming; they use AI to generate realistic bios and 'Deepfake' profile pictures.\nThe Flaw: Traditional systems only look at numbers (like follower counts), which is no longer enough.\n\nSpeaker Notes:\nThe problem today is that bots are getting smarter. They don't just spam; they use AI to generate fake faces and realistic text. Standard detection systems that only look at follower counts are failing. We need a smarter solution."),
    ("Slide 3: The Goal & Solution", "Goal: Build an end-to-end detection tool with a realistic UI.\nThe Solution: A Multi-Modal AI approach. Analyzing 3 Pillars of Data:\n1. Behavioral Stats (Numbers)\n2. Profile Bio (Text)\n3. Profile Pictures (Images)\n\nSpeaker Notes:\nMy goal was to build a multi-modal AI system. Multi-modal means the AI doesn't just look at one thing. It acts like a real human detective by scanning three pillars: the behavioral statistics, the text in the bio, and the pixels in the profile picture."),
    ("Slide 4: The Tech Stack", "Frontend (UI): HTML5, CSS3, JavaScript\nBackend (API): Python, Flask\nMachine Learning (AI): Scikit-Learn, Pandas, SciPy\n\nSpeaker Notes:\nTo make this a real-world project, I didn't just train a model in a notebook. I built a Full-Stack application. I used HTML and CSS to clone an Instagram UI, Flask for the backend server, and Scikit-Learn to train the Machine Learning models."),
    ("Slide 5: Data & Feature Engineering", "Feature Engineering: Extracting behaviors, not just data.\nNumerical Features: Account Age, Follower/Following Ratio, Post Frequency.\nText Features: Bio keywords and sentence structure.\nThe Labels: Human (0) vs. Malicious Bot (1).\n\nSpeaker Notes:\nA model is only as good as its data. I engineered specific features for the AI. For example, humans have a balanced follower-to-following ratio. Bots often follow 5,000 people but only have 10 followers. I extracted these behaviors so the AI could learn the patterns."),
    ("Slide 6: Algorithm 1 - Behavioral Analysis", "Algorithm: Random Forest Classifier\nPurpose: Scan numerical stats.\nHow it works: An ensemble of Decision Trees voting on anomalies.\n\nSpeaker Notes:\nFor the numerical data, I used a Random Forest Classifier. This algorithm works by creating a 'forest' of many Decision Trees. Each tree asks questions like 'Is the account age less than 5 days?' All the trees vote, and the majority wins. It is highly accurate for spotting unnatural behavior."),
    ("Slide 7: Algorithm 2 - Text Analysis (NLP)", "Algorithm: Natural Language Processing (NLP)\nTechnique: TF-IDF (Term Frequency-Inverse Document Frequency)\nPurpose: Convert text into mathematical vectors to find malicious language.\n\nSpeaker Notes:\nAlgorithms can't read English, so I used Natural Language Processing. Specifically, I used TF-IDF vectorization. This converts the words in a profile's bio into a mathematical matrix. It learns that words like 'free crypto' or 'click my link' have a high probability of being malicious."),
    ("Slide 8: Algorithm 3 - Image Analysis (Computer Vision)", "Algorithm: Deep Learning / Computer Vision\nPurpose: Detect AI-generated 'Deepfake' profile pictures.\nHow it works: Analyzes unnatural pixel blending and asymmetrical lighting.\n\nSpeaker Notes:\nFinally, to catch modern bots, I integrated Computer Vision. This scans the profile picture for Deepfakes. AI-generated faces from tools like Midjourney often have unnatural pixel smoothing on the skin or weird lighting. The vision algorithm catches what the human eye misses."),
    ("Slide 9: System Architecture", "Step 1: User interacts with UI (Clicks Scan).\nStep 2: JavaScript sends API request to Flask server.\nStep 3: Flask runs data through ML models.\nStep 4: JSON response updates UI (Red/Green Alert).\n\nSpeaker Notes:\nHere is how the software pipeline works. When a user clicks 'Scan' on the website, it sends an API request to my Flask backend. Flask feeds the data into the Machine Learning models, calculates the threat level, and sends a JSON response back to update the screen in real-time."),
    ("Slide 10: Live Demonstration", "Live Demo\n(Switch screens to your VS Code and Web Browser here!)\n\nSpeaker Notes:\nTheory is great, but let me show you how it actually works. I will now run the application..."),
    ("Slide 11: Conclusion & Future Scope", "Conclusion: Multi-modal AI is necessary for modern security.\nFuture Scope:\n- Connect to the real Instagram API.\n- Add a Chrome Extension version.\n- Train on massive datasets like Kaggle's Twitter Bot dataset.\n\nSpeaker Notes:\nIn conclusion, catching bots requires looking at numbers, text, and images together. In the future, I would love to connect this directly to the Instagram API or turn it into a Google Chrome extension that protects users while they browse."),
    ("Slide 12: Q&A", "Thank You!\nQuestions?\n\nSpeaker Notes:\nThank you for your time and for reviewing my project. I am happy to answer any questions about the code or the Machine Learning theory!")
]

for title, content in slides:
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, title, 0, 1)
    pdf.set_font('Arial', '', 11)
    pdf.multi_cell(0, 6, content)
    pdf.ln(8)

pdf.output("Presentation_Slides.pdf")
print("PDF created successfully!")
