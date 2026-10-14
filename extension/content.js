// ==========================================
// 1. BEAUTIFUL ON-SCREEN NOTIFICATION BANNER
// ==========================================
function showNotification(title, message, isDanger) {
    let existing = document.getElementById("ai-result-banner");
    if (existing) existing.remove();

    let banner = document.createElement("div");
    banner.id = "ai-result-banner";
    let bgColor = isDanger ? "#e74c3c" : "#2ecc71"; 
    
    banner.style.cssText = `
        position: fixed; top: -150px; left: 50%; transform: translateX(-50%);
        background: ${bgColor}; color: white; padding: 25px 40px; border-radius: 12px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.4); z-index: 999999999;
        font-family: Arial, sans-serif; text-align: center; min-width: 450px;
        transition: top 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    
    banner.innerHTML = `<h2 style="margin:0 0 10px 0; font-size:26px; color:white;">${title}</h2><p style="margin:0; font-size:16px; color:white;">${message}</p>`;
    document.body.appendChild(banner);
    
    setTimeout(() => { banner.style.top = "40px"; }, 50);
    
    setTimeout(() => { 
        banner.style.top = "-200px"; 
        setTimeout(() => banner.remove(), 600);
    }, 6000);
}


// ==========================================
// 2. INSTAGRAM PROFILE SCANNER
// ==========================================
function injectScannerButton() {
    if (!window.location.hostname.includes("instagram.com")) return;
    if (document.getElementById('ai-scanner-btn')) return;

    let btn = document.createElement("button");
    btn.id = "ai-scanner-btn";
    btn.innerText = "🤖 RUN PROFILE SCAN";
    btn.style.cssText = "position:fixed; top:80px; right:20px; z-index:999999; background:#E1306C; color:white; padding:12px 20px; border-radius:8px; font-weight:bold; cursor:pointer; border:none; box-shadow: 0px 4px 10px rgba(0,0,0,0.3); font-size:16px;";
    
    btn.onclick = function() {
        btn.innerText = "Scanning...";
        btn.style.background = "orange";
        
        let laser = document.createElement("div");
        laser.id = "ai-laser-line";
        laser.style.cssText = "position:fixed; top:0; left:0; width:100%; height:4px; background:rgba(0, 255, 0, 0.8); box-shadow: 0 0 20px 8px rgba(0, 255, 0, 0.5); z-index:9999999; transition: top 2s ease-in-out;";
        document.body.appendChild(laser);
        setTimeout(() => { laser.style.top = "100vh"; }, 50);
        
        setTimeout(() => {
            let pageText = document.body.innerText.substring(0, 5000);
            let username = window.location.pathname.replaceAll("/", "");
            
            // USE THE NEW STEALTH BACKGROUND SCRIPT TO BYPASS FIREWALLS
            chrome.runtime.sendMessage({
                action: "scan_profile", 
                username: username, 
                text: pageText
            }, function(data) {
                if(document.getElementById("ai-laser-line")) document.getElementById("ai-laser-line").remove();
                btn.style.background = '#E1306C';
                btn.innerText = "🤖 RUN PROFILE SCAN";
                
                if (data && data.status !== "error") {
                    let title = data.status === 'danger' ? '🚨 BOT / AI DETECTED' : '✅ REAL HUMAN';
                    showNotification(title, data.message, data.status === 'danger');
                } else {
                    showNotification('Error', 'Python Backend is offline!', true);
                }
            });
        }, 2000);
    };
    document.body.appendChild(btn);
}
setInterval(injectScannerButton, 2000);


// ==========================================
// 3. THE MAGIC HIGHLIGHTER (FAKE NEWS SCANNER)
// ==========================================
document.addEventListener("mouseup", function(e) {
    let selectedText = window.getSelection().toString().trim();
    
    let oldTooltip = document.getElementById("ai-news-tooltip");
    if (oldTooltip) oldTooltip.remove();
    
    if (selectedText.length > 20) { 
        let tooltip = document.createElement("div");
        tooltip.id = "ai-news-tooltip";
        tooltip.innerHTML = "🔍 Scan for Fake News";
        
        tooltip.style.cssText = `
            position: absolute; top: ${e.pageY - 50}px; left: ${e.pageX - 70}px;
            background: #333; color: #fff; padding: 10px 15px; border-radius: 8px;
            font-family: Arial; font-size: 14px; font-weight: bold; cursor: pointer;
            z-index: 9999999; box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        `;
        
        tooltip.onclick = function() {
            tooltip.innerHTML = "⏳ Scanning Database...";
            tooltip.style.background = "orange";
            
            // USE THE NEW STEALTH BACKGROUND SCRIPT TO BYPASS FIREWALLS
            chrome.runtime.sendMessage({
                action: "scan_news", 
                text: selectedText
            }, function(data) {
                tooltip.remove();
                window.getSelection().removeAllRanges(); 
                
                if (data && data.status !== "error") {
                    let title = data.status === 'danger' ? '🚨 FAKE NEWS DETECTED' : '✅ VERIFIED REAL';
                    showNotification(title, data.message, data.status === 'danger');
                } else {
                    showNotification('Error', 'Python Backend is offline!', true);
                }
            });
        };
        
        document.body.appendChild(tooltip);
    }
});

document.addEventListener("mousedown", function(e) {
    if (e.target.id !== "ai-news-tooltip") {
        let oldTooltip = document.getElementById("ai-news-tooltip");
        if (oldTooltip) oldTooltip.remove();
    }
});
