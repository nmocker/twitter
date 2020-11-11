"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Main = /*#__PURE__*/function () {
  function Main() {
    var _this = this;

    _classCallCheck(this, Main);

    _defineProperty(this, "handleSearch", function (event) {
      event.preventDefault();
      var searchInputFieldEl = document.querySelector('[name="field"]');
      var inputKeywordEl = searchInputFieldEl.value;
      console.log('searching...', inputKeywordEl);
      var api = new TwitterApi();

      if (inputKeywordEl === '') {
        alert('Please enter a keyword');
      } else {
        api.keywordSearch(inputKeywordEl);
      }
    });

    _defineProperty(this, "handleResults", function (event) {
      var tweetsUl = document.querySelector('.tweets-ul');
      tweetsUl.innerHTML = '';
      var results = event.detail;
      console.log('result', results);

      for (var r in results) {
        var tweet = results[r];
        var tweetEl = document.createElement('li');
        tweetsUl.appendChild(tweetEl);
        var tweetDiv = document.createElement('div');
        tweetEl.appendChild(tweetDiv);
        tweetDiv.classList.add('tweet-div');
        var imgDiv = document.createElement('div');
        tweetEl.appendChild(imgDiv);
        imgDiv.classList.add('img-div');
        var userImg = document.createElement('img');
        userImg.setAttribute('src', tweet.user.profile_image_url);
        imgDiv.appendChild(userImg);
        var userEl = document.createElement('h2');
        tweetDiv.appendChild(userEl);
        userEl.textContent = tweet.user.name;
        var contentEl = document.createElement('p');
        tweetDiv.appendChild(contentEl);

        var hyperlinkedTweet = _this.addHyperlinks(tweet.text);

        contentEl.innerHTML = hyperlinkedTweet;
        var timeEl = document.createElement('span');
        tweetDiv.appendChild(timeEl);
        timeEl.textContent = tweet.user.created_at;
      }
    });

    _defineProperty(this, "addHyperlinks", function (text) {
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
      var matches = text.match(/(https?:\/\/[\w\./\-\_]+)/g);

      if (matches) {
        // let's add an A tag around each
        // for (let index in matches) {
        // let url = matches[index]
        var _iterator = _createForOfIteratorHelper(matches),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var url = _step.value;
            text = text.replace(url, "<a href=\"".concat(url, "\">").concat(url, "</a>"));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      var mentions = text.match(/\s([@#][\w_-]+)/g);

      if (mentions) {
        var _iterator2 = _createForOfIteratorHelper(mentions),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _url = _step2.value;
            text = text.replace(_url, "<a href=\"https://twitter.com/".concat(_url, "\">").concat(_url, "</a>"));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      return text;
    });

    this.twitterListeners();
  }

  _createClass(Main, [{
    key: "twitterListeners",
    value: function twitterListeners() {
      var bodyEL = document.querySelector('body');
      bodyEL.addEventListener('got-results', this.handleResults);
      bodyEL.addEventListener('got-error', this.handleSearchError);
      var searchBtn = document.querySelector('[name="search"]');
      searchBtn.addEventListener('click', this.handleSearch);
    }
  }]);

  return Main;
}();

new Main();
//# sourceMappingURL=main.js.map
