const addNewKeyword = document.getElementById("addKeywordButton") 
const clearKeywords = document.getElementById("clearKeywordsButton")

const keywordInput = document.getElementById("keywordInput")
const savedKeywords = document.getElementById("savedKeywords")

const updateDisplay = () => {
    chrome.storage.local.get(["keywords"], (result) => {
        const keywords = result.keywords || []
        // Python-esque join query that converts an aray
        // of data into a formatted string
        savedKeywords.textContent = keywords.join(", ")
    })
};

// This function must pull from keywordInput, add it to an array of 
// (keywords + newWord), the set keywords to the new array
addNewKeyword.onclick = () => {
    const tempWord = keywordInput.value.trim()
    if (!tempWord) return

    chrome.storage.local.get(["keywords"], (result) => {
        const currKeywords = result.keywords || []
        const tempArray = [...currKeywords, tempWord]

        chrome.storage.local.set({ keywords: tempArray }, () => {
            console.log("Added:", tempWord)
            keywordInput.value = "" 
            updateDisplay()
        })
    })
}

clearKeywords.onclick = () => {
    chrome.storage.local.get(["keywords"], (result) => {
        const clearedArray = []

        chrome.storage.local.set({ keywords: clearedArray }, () => {
            updateDisplay()
        });
    });
}

// Without this, stored keywords will not update until first click
// of addNewWord
updateDisplay()







