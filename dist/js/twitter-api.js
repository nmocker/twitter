"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TwitterApi = /*#__PURE__*/function () {
  function TwitterApi() {
    _classCallCheck(this, TwitterApi);

    _defineProperty(this, "API_URL", 'https://circuslabs.net/proxies/twitter/twitter-proxy3.php');
  }

  _createClass(TwitterApi, [{
    key: "keywordSearch",
    value: function keywordSearch(term) {
      axios.get(this.API_URL, {
        params: {
          q: term,
          'op': 'search_tweets'
        }
      }).then(this.handleResponse).catch(this.handleError);
    }
  }, {
    key: "handleResponse",
    value: function handleResponse(response) {
      console.log('got a response', response);
      var event = new CustomEvent('got-results', {
        detail: response.data.statuses
      });
      document.querySelector('body').dispatchEvent(event);
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      console.log('got an error', error);
      var event = new CustomEvent('got-error', {
        detail: error
      });
      document.querySelector('body').dispatchEvent(event);
    }
  }]);

  return TwitterApi;
}();
//# sourceMappingURL=twitter-api.js.map
