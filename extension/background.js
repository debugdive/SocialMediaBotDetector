chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    // Handle Fake News Text Scanning
    if (request.action === "scan_news") {
        fetch("http://127.0.0.1:5000/api/scan_info", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({text: request.text})
        })
        .then(res => res.json())
        .then(data => sendResponse(data))
        .catch(err => sendResponse({status: "error", message: "Python Server Offline"}));
        
        return true; // Keep the communication channel open!
    }
    
    // Handle Instagram Profile Scanning
    if (request.action === "scan_profile") {
        fetch("http://127.0.0.1:5000/api/extension_scan", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: request.username, text: request.text})
        })
        .then(res => res.json())
        .then(data => sendResponse(data))
        .catch(err => sendResponse({status: "error", message: "Python Server Offline"}));
        
        return true;
    }
});
