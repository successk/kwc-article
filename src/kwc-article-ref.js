(() => {
  "use strict";

  class KwcArticleRef {
    beforeRegister() {
      this.is = "kwc-article-ref";
    }

    attachedCallback() {
      this.fire("attached");
    }

    get references() {
      if (this._references == null) {
        this._references = [];
        const dl = Polymer.dom(this).querySelector("dl");
        let currentDt = null;
        Array.from(dl.children).forEach((elt) => {
          if (elt.nodeName === "DT") {
            if (currentDt) {
              this._references.push(currentDt);
            }
            currentDt = {ref: elt.textContent, name: elt.getAttribute("data-kwc-article-ref-name")};
          } else if (elt.nodeName === "DD") {
            if (elt.firstChild && elt.firstChild.nodeName === "A") {
              currentDt.link = elt.firstChild.getAttribute("href");
            } else {
              currentDt.description = elt.textContent;
            }
          }
        });
        if (currentDt) {
          this._references.push(currentDt);
        }
      }
      return this._references;
    }
  }

  Polymer(KwcArticleRef);
})();