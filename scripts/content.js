chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Got message: ");
        console.log(request.status);
    }
);

async function checkCookie() {
    const response = await chrome.runtime.sendMessage({action: "check_cookie"});
    console.log(response);
}

async function closeTab() {
    // Tell the background worker to axe the tab
    const response = await chrome.runtime.sendMessage({action: "tab_rmv"});
    console.log(response);
}


let i = 0;
async function timeFunc() {
    // If we are at a shorts page, close it immediately, shit's poison
    if(location.href.split("/")[3] === "shorts" || location.href.split("/")[2] == "www.reddit.com"){
        closeTab();
    } else if (location.href.split("/")[2] == "www.youtube.com") {
        i += 1;
        console.log(i);
        if (i > 360){
            const response = await chrome.runtime.sendMessage({action: "set_cookie"});
            console.log(response);
            closeTab();
        }
    }
    
}

// First check cookie
checkCookie();


// Then start the timer
setInterval(timeFunc, 1000);
