(() => {
  "use strict";

  class KwcArticleSummary {
    beforeRegister() {
      this.is = "kwc-article-summary";

      this.properties = {
        items: {
          type: Array,
          value: [],
          observer: "_itemsChanged"
        }
      };
    }

    _itemsChanged(items) {
      const $root = Polymer.dom(this.$.root);
      $root.childNodes.forEach((child) => $root.removeChild(child));
      if (items && items.length > 0) {
        items.forEach((item) => $root.appendChild(this.buildItem(item)));
      }
    }

    buildItem(item) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.setAttribute("href", `#${item.id}`);
      a.appendChild(document.createTextNode(item.name));
      li.appendChild(a);
      if (item.children && item.children.length > 0) {
        const ol = document.createElement("ol");
        li.appendChild(ol);
        item.children.forEach((child) => ol.appendChild(this.buildItem(child)));
      }
      return li;
    }
  }

  Polymer(KwcArticleSummary);
})();