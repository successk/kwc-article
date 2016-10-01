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
        },
        totalSlides: {
          type: Number,
          value: 0,
          readOnly: true
        },
        slideIndex: {
          type: Number,
          value: 0,
          readOnly: true
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

      this._setTotalSlides(this.querySelectorAll("kwc-article-slide").length);

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

      window.addEventListener("resize", (e) => {
        this._windowResized(e);
      });
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

    _windowResized(e) {
      this._resize();
    }

    _previous() {
      if (this._currentSlide.hasAttribute("previous")) {
        this.slide = this._currentSlide.getAttribute("previous");
      } else {
        const slides = this.querySelectorAll("kwc-article-slide");
        for (let i = 1, c = slides.length; i < c; i++) {
          if (slides[i].getAttribute("name") === this.slide) {
            this.slide = slides[i - 1].getAttribute("name");
            break;
          }
        }
      }
    }

    _next() {
      if (this._currentSlide.hasAttribute("next")) {
        this.slide = this._currentSlide.getAttribute("next");
      } else {
        const slides = this.querySelectorAll("kwc-article-slide");
        for (let i = 0, c = slides.length - 1 ; i < c ; i++) {
          if (slides[i].getAttribute("name") === this.slide) {
            this.slide = slides[i+1].getAttribute("name");
            break;
          }
        }
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
      this.fullScreen = true;
      this.classList.add("full-screen");
      const documentElement = document.documentElement;
      if (documentElement.requestFullScreen) {
        documentElement.requestFullScreen();
      } else if (documentElement.mozRequestFullScreen) {
        documentElement.mozRequestFullScreen();
      } else if (documentElement.webkitRequestFullScreen) {
        documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
      this._resize();
    }

    _exitFullScreen() {
      this.fullScreen = false;
      this.classList.remove("full-screen");
      if (document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen) {
        const promise = this._createFullScreenChangePromise();
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        this._resize();
        return promise;
      } else {
        this._resize();
        return Promise.resolve();
      }
    }

    _createFullScreenChangePromise() {
      return new Promise((resolve) => {
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
    }

    _resize() {
      if (this.fullScreen) {
        const scale = Math.min(this.$.slidesContainer.offsetWidth, this.$.slidesContainer.offsetHeight) / 500;
        this.$.slides.style.transform = `scale(${scale})`;
      } else {
        this.$.slides.style.transform = "none";
      }
    }

    _slideChanged(name) {
      Array.from(this.querySelectorAll("kwc-article-slide")).forEach((slide, index) => {
        if (slide.getAttribute("name") === name) {
          slide.style.display = "flex";
          this._setSlideIndex(index + 1);
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