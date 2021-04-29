setTimeout(function(){
  chrome.runtime.sendMessage({"message": "wbSetToken", "token": "aaabbbccc"});
}, 3000);
