(() => {
  "use strict";
  
  class KwcArticleSlide {
    beforeRegister() {
      this.is = "kwc-article-slide";

      this.properties = {
        type: {
          type: String,
          value: null
        }
      };
    }

    isType(type, wanted) {
      return type === wanted;
    }
  }

  Polymer(KwcArticleSlide);
})();