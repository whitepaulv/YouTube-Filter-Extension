const filterYoutube = () => {
    chrome.storage.local.get(["keywords"], (result) => {

        const keywords = result.keywords || [];
        if (keywords.length === 0){
            return;
        }

        const textElements = document.querySelectorAll("yt-lockup-view-model");

        const elementsArray = [...textElements]; 
        console.log(elementsArray);

        textElements.forEach((el) => {
            

            const titleText = el.textContent.toLowerCase();
            
            const hasKeyword = keywords.some(word => 
                titleText.includes(word.toLowerCase())
            )
            
            const videoCard = el.closest("ytd-video-renderer, ytd-rich-item-renderer")
            
            if (videoCard) {
                if (!hasKeyword) {
                    videoCard.style.display = 'none';
                } else {
                    videoCard.style.display = ''; 
                }
            }
        });
    });
};

const youtubeObserver = new MutationObserver(filterYoutube);
youtubeObserver.observe(document.body, { childList: true, subtree: true });


filterYoutube();