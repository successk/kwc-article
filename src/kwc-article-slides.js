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
        }
      };

      this.listeners = {
        "previous.tap": "_previousTap",
        "next.tap": "_nextTap",
        "fullscreen.tap": "_fullscreenTap"
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
      const documentElement = document.documentElement;
      if (this.classList.contains("full-screen")) {
        this.classList.remove("full-screen");
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      } else {
        this.classList.add("full-screen");
        if (documentElement.requestFullScreen) {
          documentElement.requestFullScreen();
        } else if (documentElement.mozRequestFullScreen) {
          documentElement.mozRequestFullScreen();
        } else if (documentElement.webkitRequestFullScreen) {
          documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
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
    }

    get _currentSlide() {
      return this.querySelector(`kwc-article-slide[name=${this.slide}]`);
    }
  }

  Polymer(KwcArticleSlides);
})();