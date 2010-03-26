/**
 * @class Jaml
 * @author Ed Spencer (http://edspencer.net)
 * Jaml is a simple JavaScript library which makes HTML generation easy and pleasurable.
 * Examples: http://edspencer.github.com/jaml
 * Introduction: http://edspencer.net/2009/11/jaml-beautiful-html-generation-for-javascript.html
 */
Jaml = function() {
  return {
    automaticScope: true,
    templates: {},
    helpers  : {},
    
    /**
     * Registers a template by name
     * @param {String} name The name of the template
     * @param {Function} template The template function
     */
    register: function(name, template) {
      this.templates[name] = template;
    },
    
    /**
     * Renders the given template name with an optional data object
     * @param {String} name The name of the template to render
     * @param {Object} data Optional data object
     */
    render: function(name, data) {
      var template = this.templates[name],
          renderer = new Jaml.Template(template);
          
      return renderer.render(data);
    },
    
    /**
     * Registers a helper function
     * @param {String} name The name of the helper
     * @param {Function} helperFn The helper function
     */
    registerHelper: function(name, helperFn) {
      this.helpers[name] = helperFn;
    },
  
    tags: [
      "html", "head", "body", "script", "meta", "title", "link",
      "div", "p", "span", "a", "img", "br", "hr",
      "table", "tr", "th", "td", "thead", "tbody",
      "ul", "ol", "li", 
      "dl", "dt", "dd",
      "h1", "h2", "h3", "h4", "h5", "h6", "h7",
      "form", "input", "label",
      "b", "strong", "i", "em"
    ],
  
    /**
     * @property selfClosingTags
     * @type Array
     * An array of all tags that should be self closing
     */
    selfClosingTags: {
      "col": true,
      "basefont": true,
      "isindex": true,
      "img": true,
      "param": true,
      "meta": true,
      "br": true,
      "frame": true,
      "area": true,
      "link": true,
      "input": true,
      "hr": true,
      "base": true
    },
    
    escape: function(string) {
      if (!string) {
        return "";
      }
      string = String(string);
      string = string.replace(/</g, "&lt;");
      string = string.replace(/>/g, "&gt;");
      string = string.replace(/"/g, "&quot;");
      return string;
    }
  };
}();