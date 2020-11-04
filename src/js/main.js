class Main {
    constructor() {
        this.twitterListeners();
    }
    twitterListeners() {
        const bodyEL = document.querySelector('body');
        bodyEL.addEventListener('got-results', this.handleResults);
        bodyEL.addEventListener('got-error', this.handleSearchError);
        const searchBtn = document.querySelector('[name="search"]');
        searchBtn.addEventListener('click', this.handleSearch);
    }

    handleSearch = (event) => {
        event.preventDefault();

        const searchInputFieldEl = document.querySelector('[name="field"]');
        const inputKeywordEl = searchInputFieldEl.value;

        console.log('searching...', inputKeywordEl);

        const api = new TwitterApi();
        
        if (inputKeywordEl === '') {
            alert('Please enter a keyword')
        } else {
            api.keywordSearch(inputKeywordEl);
        }
    }

    handleResults = (event) => {
        const tweetsUl = document.querySelector('.tweets-ul');
        tweetsUl.innerHTML = '';

        const results = event.detail;
        console.log('result', results)

        for (let r in results) {
            const tweets = results[r];

            const tweetEl = document.createElement('li');
            tweetsUl.appendChild(tweetEl);

            const userEl = document.createElement('h2');
            tweetEl.appendChild(userEl);
            userEl.textContent = tweets.user.name;

            const contentEl = document.createElement('p');
            tweetEl.appendChild(contentEl);
            contentEl.textContent = tweets.text;

            const timeEl = document.createElement('span');
            tweetEl.appendChild(timeEl);
            timeEl.textContent = tweets.created_at;
        }
    }

    addHyperlinks = (text) => {
        // look for anything that can be turned into a link
        // such as URLs (start with http:// or https://) (and up thru whitespace or end of tweet)
        // or @mentions (prepend with https://twitter.com/<MENTION NAME>)
        // or #hashtags (prepend with https://twitter.com/hashtag/<HASHTAG>)
    
        /*
            \s = whitespace, e.g. \n \r \t ' '
            \S = non-whitespace
            \d = digit, e.g. 0-9
            \D = non-digit
            \w = word character, e.g a-z 0-9
            \W = non-word character, generally a special character
    
            * = 0 or more
            + = 1 or more
            ? = 0 or 1
        */
        var matches = text.match(/(https?:\/\/[\w\.]+)/g)
        if (matches) { 
            // let's add an A tag around each
            // for (let index in matches) {
                // let url = matches[index]
            for (let url of matches) {
                text = text.replace(url, `<a href="${url}">${url}</a>`)
            }	
        } 
    
        return text
    }
}
new Main();