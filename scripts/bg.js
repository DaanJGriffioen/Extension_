let time = 0;
let deadline = Date.now()/1000 + 3600;

// On getting the message, remove the tab and send back that it is done
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(`Received msg from ${sender.url}: ${request}`);
    if (request.action === "tab_rmv") {
      if(removeTab() != -1)
        sendResponse({status: "Done!"});
      else
        sendResponse({status: "Failed!"});
    }
    else if(request.action === "check_cookie") {
      checkCookie();
    }
  }
);

async function removeTab() {
  let queryOptions = { url: ["*://*.youtube.com/*", "*://*.reddit.com/*"] };
  
  let tabs = await chrome.tabs.query(queryOptions);
  tabs.forEach( async tab => {
    try {
      
      chrome.tabs.remove(tab.id);

    } catch (error) {
      console.log("tab " + tab.url + " could not be closed due to error: " + error);
      return -1;
    }
  });
}

// async function checkCookie() {
//   let cookies = await chrome.cookies.get({name:"YT-RD-AWAY", url:"https://www.youtube.com/"});
//   console.log(cookies);

//   if ( cookies != undefined) {

//     if(removeTab() != -1) {
//       console.log("Closed tab succesfully");
//     }
//   }
//   // If no cookie is present, disregard
// }