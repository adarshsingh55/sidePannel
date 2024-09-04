chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (!tab.url) return;

    const url = new URL(tab.url);

    if (url.origin === 'https://example.com') {
        chrome.sidePanel.setOptions({ tabId, path: 'sidepanel.html', enabled: true });
    } else {
        chrome.sidePanel.setOptions({ tabId, enabled: false });
    }
});
