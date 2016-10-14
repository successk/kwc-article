(() => {
  "use strict";

  class KwcArticleSlideMask {
    beforeRegister() {
      this.is = "kwc-article-slide-mask";

      this.properties = {
        title: {
          type: String,
          value: null,
          observer: "_attrUpdated"
        },
        slide: {
          type: Number,
          value: 0,
          observer: "_attrUpdated"
        }
      };
    }

    get behaviors() {
      return [Polymer.Templatizer];
    }

    ready() {
      const template = this.querySelector("template");
      this.templatize(template);
    }

    attachedCallback() {
      this._attached = true;
      this._updateContent();
    }

    getContent() {
      return this.stamp({
        "kwc-title": this.title,
        "kwc-slide": this.slide
      });
    }

    _attrUpdated() {
      this._updateContent();
    }

    _updateContent() {
      if (this._attached) {
        const dom = Polymer.dom(this);
        while (dom.lastChild) {
          dom.removeChild(dom.lastChild);
        }
        dom.appendChild(this.getContent().root);
      }
    }
  }
  Polymer(KwcArticleSlideMask);
})();