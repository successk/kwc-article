(() => {
  "use strict";

  class KwcArticle {
    beforeRegister() {
      this.is = "kwc-article";

      this.properties = {};
    }

    attachedCallback() {
      const summary = this.querySelector("kwc-article-summary");
      if (summary) {
        const titleNodes = Array.from(this.querySelectorAll(".kwc-article-text h2, .kwc-article-text h3, .kwc-article-text h4, .kwc-article-text h5, .kwc-article-text h6"));
        const summaryItems = [];
        const flatItems = [];

        titleNodes.forEach((titleNode)=> {
          if (!titleNode.hasAttribute("id") || titleNode.getAttribute("id").trim() === "") {
            const canonical = titleNode.textContent
              .toLowerCase()
              .replace(/[^a-zA-Z0-9+_-]/gi, "-")
              .replace(/-+/gi, "-");
            titleNode.setAttribute("id", canonical);
          }
        });

        titleNodes.forEach((titleNode) => {
          const level = parseInt(titleNode.tagName.substr(1), 10);
          const item = {level: level, name: titleNode.textContent, id: titleNode.getAttribute("id"), children: []};
          if (level > 2) {
            for (let i = flatItems.length - 1; i >= 0; i--) {
              if (flatItems[i].level !== level) {
                flatItems[i].children.push(item);
                break;
              }
            }
          } else {
            summaryItems.push(item);
          }
          flatItems.push(item);
        });

        summary.setAttribute("items", JSON.stringify(summaryItems));
      }
    }
  }

  Polymer(KwcArticle);
})();