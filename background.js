// myURL="about:blank"; //A default url just in case below code doesn't work
// chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){ //onUpdated should fire when the selected tab is changed or a link is clicked 
//     chrome.tabs.getSelected(null,function(tab){
//         myURL=tab.url;
//         alert('!!!!!!!!!'+myURL);
//     });
// });


// function attack(e) {
// 	chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
// 		var specTab = tabs[0];
// 		console.log('SPECTAB', specTab);
// 	});
// }

// chrome.pageAction.onClicked.addListener(attack);

// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var youtubeUrl='GREG';
// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  if (tab.url.indexOf('youtube.com') > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
    youtubeUrl = tab.url;
    youtubeTitle = tab.title;
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);