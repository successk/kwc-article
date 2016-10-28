(() => {
  "use strict";

  class KwcArticleGlossary {
    beforeRegister() {
      this.is = "kwc-article-glossary";
    }

    attachedCallback() {
      this.fire("attached");
    }

    get definitions() {
      if (this._definitions == null) {
        this._definitions = [];
        const dl = Polymer.dom(this).querySelector("dl");
        let currentDt = null;
        Array.from(dl.children).forEach((elt) => {
          if (elt.nodeName === "DT") {
            if (currentDt) {
              this._definitions.push(currentDt);
            }
            currentDt = {dt: elt.textContent, dd: []};
          } else if (elt.nodeName === "DD") {
            if (currentDt) {
              currentDt.dd.push(elt.textContent);
            }
          }
        });
        if (currentDt) {
          this._definitions.push(currentDt);
        }
      }
      return this._definitions;
    }
  }

  Polymer(KwcArticleGlossary);
})();