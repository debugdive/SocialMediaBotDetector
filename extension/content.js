```javascript
// ==========================================
// SOCIAL MEDIA BOT & AI DETECTION SUITE
// Instagram Profile Scanner
// ==========================================

function showNotification(title, message, isDanger = false) {
    let existing = document.getElementById("ai-result-banner");
    if (existing) existing.remove();

    const banner = document.createElement("div");
    banner.id = "ai-result-banner";

    banner.style.cssText = `
        position: fixed;
        top: 25px;
        left: 50%;
        transform: translateX(-50%);
        width: min(440px, calc(100vw - 40px));
        box-sizing: border-box;
        background: #171725;
        color: white;
        padding: 22px;
        border: 1px solid ${isDanger ? "#ef4444" : "#8b5cf6"};
        border-radius: 14px;
        box-shadow: 0 12px 35px rgba(0,0,0,.35);
        z-index: 2147483647;
        font-family: Arial, sans-serif;
    `;

    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.style.cssText = "margin:0 0 12px;font-size:20px;color:white;";

    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    paragraph.style.cssText = "margin:0;font-size:14px;line-height:1.6;color:#eee;";

    const close = document.createElement("button");
    close.textContent = "Close";
    close.style.cssText = `
        margin-top:14px;padding:8px 14px;border:0;border-radius:7px;
        cursor:pointer;background:#7c3aed;color:white;font-weight:bold;
    `;
    close.onclick = () => banner.remove();

    banner.append(heading, paragraph, close);
    document.body.appendChild(banner);

    setTimeout(() => {
        if (banner.isConnected) banner.remove();
    }, 12000);
}


// ==========================================
// PROFILE SCAN BUTTON
// ==========================================

function injectScannerButton() {
    if (!window.location.hostname.endsWith("instagram.com")) return;
    if (!document.body || document.getElementById("ai-scanner-btn")) return;

    const btn = document.createElement("button");
    btn.id = "ai-scanner-btn";
    btn.textContent = "🔎 Scan Profile";

    btn.style.cssText = `
        position:fixed;top:85px;right:20px;z-index:2147483646;
        background:#7c3aed;color:white;padding:12px 18px;
        border-radius:10px;font-weight:bold;cursor:pointer;
        border:none;box-shadow:0 4px 14px #0004;font-size:14px;
    `;

    btn.addEventListener("click", async () => {
        const originalText = "🔎 Scan Profile";
        btn.disabled = true;
        btn.textContent = "Scanning...";
        btn.style.opacity = "0.7";

        try {
            const username = window.location.pathname
                .split("/")
                .filter(Boolean)[0] || "";

            const profileText = document.body.innerText
                .replace(/\s+/g, " ")
                .slice(0, 10000);

            if (!username || ["accounts", "explore", "direct", "reels"].includes(username)) {
                showNotification(
                    "Open a profile first",
                    "Navigate to an Instagram user's profile and try again."
                );
                return;
            }

            const response = await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage(
                    {
                        action: "scan_profile",
                        username,
                        text: profileText
                    },
                    data => {
                        if (chrome.runtime.lastError) {
                            reject(new Error(chrome.runtime.lastError.message));
                            return;
                        }
                        resolve(data);
                    }
                );
            });

            if (!response || response.status === "error") {
                throw new Error(response?.message || "The scanner did not return a result.");
            }

            const score = Number.isFinite(Number(response.risk_score))
                ? Number(response.risk_score)
                : null;

            const reasons = Array.isArray(response.reasons)
                ? response.reasons.join("; ")
                : "";

            let message = score === null
                ? response.message || "The scan returned no explanation."
                : `Risk score: ${score}/100. ${response.message || ""}`;

            if (reasons) message += ` Reasons: ${reasons}`;
            message += " This experimental text-based scan cannot prove that an account is genuine or AI-generated.";

            const highRisk = score !== null
                ? score >= 40
                : response.status === "danger";

            showNotification(
                score === null
                    ? "Profile Scan Result"
                    : `Profile Risk Score: ${score}/100`,
                message,
                highRisk
            );

        } catch (error) {
            showNotification(
                "Scan unavailable",
                `${error.message}. Check that the Flask backend is running and the extension is connected.`,
                true
            );
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
            btn.style.opacity = "1";
        }
    });

    document.body.appendChild(btn);
}

setInterval(injectScannerButton, 2000);


// ==========================================
// FAKE-NEWS TEXT SCANNER
// ==========================================

document.addEventListener("mouseup", event => {
    const selectedText = window.getSelection()?.toString().trim() || "";

    const oldTooltip = document.getElementById("ai-news-tooltip");
    if (oldTooltip) oldTooltip.remove();

    if (selectedText.length <= 20) return;

    const tooltip = document.createElement("button");
    tooltip.id = "ai-news-tooltip";
    tooltip.textContent = "🔍 Analyze selected text";

    tooltip.style.cssText = `
        position:fixed;top:${Math.min(event.clientY, window.innerHeight - 60)}px;
        left:${Math.min(event.clientX, window.innerWidth - 220)}px;
        background:#171725;color:white;padding:11px 15px;
        border:1px solid #8b5cf6;border-radius:8px;
        font-size:13px;font-weight:bold;cursor:pointer;
        z-index:2147483647;
    `;

    tooltip.addEventListener("click", () => {
        tooltip.textContent = "Analyzing...";

        chrome.runtime.sendMessage(
            { action: "scan_news", text: selectedText },
            response => {
                if (chrome.runtime.lastError || !response ||
                    response.status === "error") {
                    tooltip.remove();
                    showNotification(
                        "Analysis unavailable",
                        "Check that the backend is running and the extension is connected.",
                        true
                    );
                    return;
                }

                tooltip.remove();

                showNotification(
                    response.label || "Text Analysis Result",
                    response.message || "No explanation was returned.",
                    response.status === "danger"
                );
            }
        );
    });

    document.body.appendChild(tooltip);
});

document.addEventListener("mousedown", event => {
    const tooltip = document.getElementById("ai-news-tooltip");
    if (tooltip && !tooltip.contains(event.target)) tooltip.remove();
});
```
