function main() {
  const container = document.querySelector(".container");
  const pagesBtn = document.querySelectorAll(".dropMenu nav ul li button");
  const postURLApiBtn = document.querySelector(".postURLApiBtn");
  const backToMainPageBtn = document.querySelectorAll(".backToMainPageBtn");
  const saveApiKeyBtn = document.querySelector(".saveApiKeyBtn");
  const apiKeyYoutube = document.querySelector(".apiKeyYoutube");
  const apiKeyGitHub = document.querySelector(".apiKeyGitHub");
  const errorBox = document.querySelector(".errorBox");
  const loading = document.querySelector(".loading");

  //for change the page
  let pageClasses = ["showMainPage", "showHelpPage", "showSettingPage"];
  let interval = null;

  // window.config = {
  //   from: "6107005393",
  // };
  container.classList.add("loadingShow");
  //sending user url page and Api key
  async function sendUrlToServer(url) {
    //Checking if the page URL is correct
    if (
      !url ||
      (url.search(/github.com/) === -1 && url.search(/youtube.com/) === -1)
    )
      return showBoxes("error", "آدرس صفحه اشتباه", true);
    //Getting Api key from user storage
    let apikeys = JSON.parse(localStorage.getItem("apikeys"));
    //Api URL
    let apiUrl = `https://li-80-il.site/API.php?Kay=${
      apikeys.gitHub
    }$text=${encodeURIComponent(url)}`;
    if (!apikeys) {
      return showBoxes("error", "Api key در تنظیمات وارد نشده !!!", true);
    }
    //Loading animation
    container.classList.add("loadingShow");
    let post = await fetch(apiUrl).catch(() => {
      showBoxes("error", " دوباره تلاش کنید!!", true);
    });
    // --------------------Log---------------
    console.log(post);
    container.classList.remove("loadingShow");
    showBoxes("successfully");
  }
  function removeContainerClasses(container, newClass) {
    container.className = "";
    container.classList.add(newClass);
    container.classList.add("container");
  }
  function showBoxes(boxClass, content = "", text = false) {
    text ? (errorBox.children[0].textContent = content) : [];
    interval === null ? interval : clearInterval(interval);
    interval = setTimeout(() => {
      container.classList.remove(boxClass);
    }, 2000);
    container.classList.add(boxClass);
  }

  postURLApiBtn.addEventListener("click", function () {
    if (!navigator.onLine) return showBoxes("error", "افلاینی ", true);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let activeTab = tabs[0];
      let pageUrl = activeTab.url;
      sendUrlToServer(pageUrl);
    });
  });

  pagesBtn.forEach((pageBtn) => {
    pageBtn.addEventListener("click", () => {
      if (pageBtn.textContent === "راهنما")
        removeContainerClasses(container, pageClasses[1]);
      else removeContainerClasses(container, pageClasses[2]);
    });
  });
  backToMainPageBtn.forEach((backBtn) => {
    backBtn.addEventListener("click", () => {
      removeContainerClasses(
        document.querySelector(".container"),
        pageClasses[0]
      );
    });
  });
  saveApiKeyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!apiKeyYoutube.value && !apiKeyGitHub.value) {
      return showBoxes("error", "کادر ها خالین !!", true);
    }
    let apikeys = {
      youTube: apiKeyYoutube.value.trim(),
      gitHub: apiKeyGitHub.value.trim(),
    };
    localStorage.setItem("apikeys", JSON.stringify(apikeys));
    apiKeyYoutube.value = "";
    apiKeyGitHub.value = "";
  });
}
main();
let a = "https:youtube S 1 asdas dasdasd ";
