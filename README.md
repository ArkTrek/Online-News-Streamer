# 📺 Global News Wire (StreamHub)

Welcome to Global News Wire! This is a simple, web-based TV dashboard that lets you watch live news channels from around the world directly in your internet browser. 

Instead of paying for a cable box, this application automatically finds free, legally broadcasted live streams on the internet, organizes them neatly, and plays them for you in one place. You don't need an account or a password—just launch it and start watching!

---

## 🛠️ How It Works (In Simple Terms)

Think of this app as a smart TV Guide combined with a TV screen:

1. **The Brains (The Server):** When you turn the app on, it acts as a digital librarian. It reaches out to a public database on the internet and downloads a massive list of live TV channels.
2. **The Sorting Hat:** It then filters this massive list, throwing away things that aren't news, and organizes the remaining channels into three clean folders: **Regional News (Malayalam)**, **National News (India)**, and **International News**.
3. **The Display (The Dashboard):** It builds a website and sends it to your screen. You click a channel on the left, and the video starts playing on the right. 

---

## 🧠 The Technology Behind It

This app is built using two incredibly popular technologies: **Node.js** and **Express.js**. 



If you imagine our application as a restaurant:

* **Node.js is the Kitchen (The Engine):** Normally, JavaScript (a coding language) only runs *inside* your web browser (like Chrome or Safari). Node.js is a special tool that allows JavaScript to run on the computer's backend (the server). It is the kitchen where all the actual cooking (fetching channels and organizing data) happens behind closed doors.
* **Express.js is the Waiter (The Framework):** Express is an add-on for Node.js. When you type our website address into your browser, Express acts like the waiter. It takes your request ("I'd like to see the news dashboard, please"), walks back to the Node.js kitchen to get it, and delivers the finished web page directly to your screen. 

---

## 🚀 How to Run the App

Follow these simple steps to start the application:

1. **Install Node.js:** Download and install Node.js from [nodejs.org](https://nodejs.org). Use the standard default settings.
2. **Install Dependencies:** Open your computer's "Terminal" or "Command Prompt", navigate to this project's folder, and type:
   `npm install`
   *(This creates a new `node_modules` folder containing required background files. You can just ignore this folder).*
3. **Start the Server:** In the same terminal window, type:
   `npm start`
   *(Leave this terminal window open in the background).*
4. **Open the Dashboard:** Open your web browser (Chrome, Safari, Edge) and go to:
   **http://localhost:5000**
   
