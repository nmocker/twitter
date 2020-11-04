class TwitterApi {
    API_URL = 'https://circuslabs.net/proxies/twitter/twitter-proxy.php';

    keywordSearch(term) {
        axios
            .get(this.API_URL, {
                params: {
                    q: term,
                    'op': 'search_tweets',

                },
            })
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    handleResponse(response) {
        console.log('got a response', response);
        const event = new CustomEvent('got-results', {
            detail: response.data.statuses,
        });
        document.querySelector('body').dispatchEvent(event);
    }
    handleError(error) {
        console.log('got an error', error);
        const event = new CustomEvent('got-error', { detail: error });
        document.querySelector('body').dispatchEvent(event);
    }
}