(() => {
  "use strict";

  class KwcArticleSlides {
    beforeRegister() {
      this.is = "kwc-article-slides";

      this.properties = {
        slide: {
          type: String,
          value: null,
          observer: "_slideChanged"
        },
        start: {
          type: String,
          value: null
        },
        fullScreen: {
          type: Boolean,
          value: false
        },
        partRelated: {
          type: Boolean,
          value: false
        }
      };

      this.listeners = {
        "previous.tap": "_previousTap",
        "next.tap": "_nextTap",
        "fullscreen.tap": "_fullscreenTap",
        "related.tap": "_partRelatedTap"
      };
    }

    attachedCallback() {
      if (this.start) {
        this.slide = this.start;
      } else {
        this.slide = this.querySelector("kwc-article-slide").name;
      }

      this.addEventListener("keydown", (e) => {
        if (e.keyCode === 33) {
          this._pageupPressed(e);
        } else if (e.keyCode === 34) {
          this._pagedownPressed(e);
        } else if (e.keyCode === 37) {
          this._leftPressed(e);
        } else if (e.keyCode === 38) {
          this._upPressed(e);
        } else if (e.keyCode === 39) {
          this._rightPressed(e);
        } else if (e.keyCode === 40) {
          this._downPressed(e);
        }
      }, true);
    }

    _previousTap(e) {
      e.preventDefault();
      this._previous();
    }

    _nextTap(e) {
      e.preventDefault();
      this._next();
    }

    _fullscreenTap(e) {
      e.preventDefault();
      this._fullScreen();
    }

    _pageupPressed(e) {
      e.preventDefault();
      this._previous();
    }

    _pagedownPressed(e) {
      e.preventDefault();
      this._next();
    }

    _upPressed(e) {
      e.preventDefault();
      this._previous();
    }

    _downPressed(e) {
      e.preventDefault();
      this._next();
    }

    _leftPressed(e) {
      e.preventDefault();
      this._previous();
    }

    _rightPressed(e) {
      e.preventDefault();
      this._next();
    }

    _partRelatedTap(e) {
      e.preventDefault();
      this._exitFullScreen().then(() => {
        // We wait the end off full screen exit, otherwise the browser does not trigger "go to hash" action.
        // We remove current hash and reset it to force "go to hash" action.
        window.location.hash = "#";
        window.location.hash = `#${this._currentSlide.getAttribute("part")}`;
      });
    }

    _previous() {
      if (this._currentSlide.hasAttribute("previous")) {
        this.slide = this._currentSlide.getAttribute("previous");
      }
    }

    _next() {
      if (this._currentSlide.hasAttribute("next")) {
        this.slide = this._currentSlide.getAttribute("next");
      }
    }

    _fullScreen() {
      if (this.classList.contains("full-screen")) {
        this._exitFullScreen();
      } else {
        this._enterFullScreen();
      }
    }

    _enterFullScreen() {
      this.classList.add("full-screen");
      const documentElement = document.documentElement;
      if (documentElement.requestFullScreen) {
        documentElement.requestFullScreen();
      } else if (documentElement.mozRequestFullScreen) {
        documentElement.mozRequestFullScreen();
      } else if (documentElement.webkitRequestFullScreen) {
        documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    }

    _exitFullScreen() {
      this.classList.remove("full-screen");
      if (document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen) {
        const promise = new Promise((resolve) => {
          const handler = () => {
            resolve();
            document.removeEventListener("fullscreenchange", handler);
            document.removeEventListener("webkitfullscreenchange", handler);
            document.removeEventListener("mozfullscreenchange", handler);
            document.removeEventListener("msfullscreenchange", handler);
          };
          document.addEventListener("fullscreenchange", handler);
          document.addEventListener("webkitfullscreenchange", handler);
          document.addEventListener("mozfullscreenchange", handler);
          document.addEventListener("msfullscreenchange", handler);
        });
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        return promise;
      } else {
        return Promise.resolve();
      }
    }

    _slideChanged(name) {
      Array.from(this.querySelectorAll("kwc-article-slide")).forEach((slide) => {
        if (slide.getAttribute("name") === name) {
          slide.style.display = "flex";
        } else {
          slide.style.display = "none";
        }
      });
      this.partRelated = this._currentSlide && this._currentSlide.hasAttribute("part");
    }

    get _currentSlide() {
      return this.querySelector(`kwc-article-slide[name=${this.slide}]`);
    }
  }

  Polymer(KwcArticleSlides);
})();