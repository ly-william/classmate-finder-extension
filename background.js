let signed_in = false;
let screen = 0; // state is used for determining which step of the import process to display to the user
console.log("runs")

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ signed_in });
  chrome.storage.sync.set({ screen });
  console.log('Signed in has been set to ' + signed_in);
});
