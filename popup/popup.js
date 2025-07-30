const btn = document.getElementById("toggle");
let isOn = localStorage.getItem("todoPanelVisible") === "true";

function updateButton() {
  btn.textContent = isOn ? "Hide" : "Show";
  btn.style.backgroundColor = isOn ? "red" : "green";
  btn.style.color = "#fff";
}

function requestPanelState() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab || !tab.id) return updateButton();
    chrome.tabs.sendMessage(
      tab.id,
      { action: "get-todo-panel-state" },
      (response) => {
        if (response && typeof response.panelVisible === "boolean") {
          isOn = response.panelVisible;
          localStorage.setItem("todoPanelVisible", isOn);
        }
        updateButton();
      }
    );
  });
}

btn.addEventListener("click", () => {
  isOn = !isOn;
  localStorage.setItem("todoPanelVisible", isOn);

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab || !tab.id) return;
    chrome.tabs.sendMessage(tab.id, {
      action: "toggle-todo-panel",
      panelVisible: isOn,
    });
  });

  updateButton();
});

requestPanelState();
