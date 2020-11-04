class Main {
    constructor() {
        this.twitterListeners();
    }
    twitterListeners() {
        const bodyEL = document.querySelector('body');
        bodyEL.addEventListener('got-results', this.handleResults);
        bodyEL.addEventListener('got-error', this.handleSearchError);
        const searchBtn = document.querySelector('[name="search"]');
    }

    handleSearch = (event) => {
        
    }


}