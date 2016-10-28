(() => {
  "use strict";

  class KwcArticleTooltip {
    beforeRegister() {
      this.is = "kwc-article-tooltip";

      this.properties = {
        description: {
          type: String,
          value: null
        },
        margin: {
          type: Number,
          value: 5
        }
      };
    }

    attachedCallback() {
      this.addEventListener("mouseover", () => {
        this.$.description.style.display = "block";

        const top = this.offsetTop + (this.offsetHeight - this.$.description.offsetHeight) / 2;
        const middle = this.offsetLeft + this.offsetWidth / 2;
        let left;
        if (middle < window.innerWidth / 2) {
          left = this.offsetLeft + this.offsetWidth + this.margin;
        } else {
          left = this.offsetLeft - this.$.description.offsetWidth - this.margin;
        }
        this.$.description.style.top = `${top}px`;
        this.$.description.style.left = `${left}px`;
      });
      this.addEventListener("mouseout", () => {
        this.$.description.style.display = "none";
      });
    }
  }

  Polymer(KwcArticleTooltip);
})();