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
        }
      };

      this.listeners = {
        "previous.tap": "_previousTap",
        "next.tap": "_nextTap"
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

    _pageupPressed(e) {
      e.preventDefault();
      this._previous();
    }

    _pagedownPressed(e) {
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