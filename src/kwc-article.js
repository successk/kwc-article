(() => {
  "use strict";

  class KwcArticle {
    beforeRegister() {
      this.is = "kwc-article";

      this.properties = {};
    }

    attachedCallback() {
      this.buildSummary();
      this.buildGlossary();
      this.buildReferences();
    }

    buildSummary() {
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
              if (flatItems[i].level < level) {
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

    buildGlossary() {
      const glossary = this.querySelector("kwc-article-glossary");
      if (glossary) {
        glossary.addEventListener("attached", (e) => {
          const definitions = glossary.definitions;
          const text = Polymer.dom(this).querySelector(".kwc-article-text");
          this.insertGlossaryInText(text, definitions);
        });
      }
    }

    insertGlossaryInText(node, definitions) {
      // Transform only final nodes to avoid replacing attributes or whatever
      if (node.children.length > 0) {
        Array.from(node.children).forEach((n) => this.insertGlossaryInText(n, definitions));
      } else {
        let html = node.innerHTML;
        definitions.forEach((def) => {
          const description = def.dd.join("\n");
          html = html.replace(new RegExp(def.dt, "gi"), (dt) => `<kwc-article-tooltip description="${description}">${dt}</kwc-article-tooltip>`);
        });
        node.innerHTML = html;
      }
    }

    buildReferences() {
      const ref = this.querySelector("kwc-article-ref");
      if (ref) {
        ref.addEventListener("attached", (e) => {
          ref.references.forEach((ref) => {
            Array.from(Polymer.dom(this).querySelectorAll(`*[data-kwc-article-ref="${ref.name}"]`)).forEach((elt) => {
              elt.innerHTML = `<kwc-article-tooltip description="${ref.description}"><a href="${ref.link}" target="_blank">${ref.ref}</a></kwc-article-tooltip>`
            });
          });
        });
      }
    }
  }

  Polymer(KwcArticle);
})();