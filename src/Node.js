/**
 * @constructor
 * @param {String} tagName The tag name this node represents (e.g. 'p', 'div', etc)
 */
Jaml.Node = function(tagName) {
  /**
   * @property tagName
   * @type String
   * This node's current tag
   */
  this.tagName = tagName;
  
  /**
   * @property attributes
   * @type Object
   * Sets of attributes on this node (e.g. 'cls', 'id', etc)
   */
  this.attributes = "";
  
  /**
   * @property children
   * @type Array
   * Array of rendered child nodes that will be included as this node's innerHTML
   */
  this.children = [];
};

Jaml.Node.prototype = {
  /**
   * Adds attributes to this node
   * @param {Object} attrs Object containing key: value pairs of node attributes
   */
  setAttributes: function(attrs) {
    if (attrs["cls"]) {
      attrs["class"] = attrs["cls"];
      delete attrs["cls"];
    }
    
    for (var key in attrs) {
      this.attributes += " " + key + "=\"" + Jaml.escape(attrs[key]) + "\"";
    }
  },
  
  /**
   * Adds a child string to this node. This can be called as often as needed to add children to a node
   * @param {String} childText The text of the child node
   */
  addChild: function(childText) {
    this.children.push(childText);
  },
  
  /**
   * Renders this node with its attributes and children
   * @param {Number} lpad Amount of whitespace to add to the left of the string (defaults to 0)
   * @return {String} The rendered node
   */
  render: function(lpad) {
    lpad = lpad || 0;
    
    var node      = "",
        textnode  = (this instanceof Jaml.TextNode),
        multiline = this.isMultiLineTag();
    
    //add any left padding
    if (!textnode) node += this.getPadding(lpad);
    
    //open the tag
    node += "<" + this.tagName;
    
    //add any tag attributes
    node += this.attributes;
    
    if (this.isSelfClosing()) {
      node += " />\n";
    } else {
      node += ">";
      
      if (multiline) node += "\n";
      
      for (var i=0; i < this.children.length; i++) {
        node += this.children[i].render(lpad + 2);
      }
      
      if (multiline) node += (this.getPadding(lpad));
      node += "</" + this.tagName + ">\n";
    }
    
    return node;
  },
  
  /**
   * Returns true if this tag should be rendered with multiple newlines (e.g. if it contains child nodes)
   * @return {Boolean} True to render this tag as multi-line
   */
  isMultiLineTag: function() {
    var childLength = this.children.length,
        multiLine   = childLength > 0;
    
    if (childLength == 1 && this.children[0] instanceof Jaml.TextNode) multiLine = false;
    
    return multiLine;
  },
  
  /**
   * Returns a string with the given number of whitespace characters, suitable for padding
   * @param {Number} amount The number of whitespace characters to add
   * @return {String} A padding string
   */
  getPadding: function(amount) {
    return new Array(amount + 1).join(" ");
  },
  
  /**
   * Returns true if this tag should close itself (e.g. no </tag> element)
   * @return {Boolean} True if this tag should close itself
   */
  isSelfClosing: function() {
    return Jaml.selfClosingTags[this.tagName];
  }
};

Jaml.TextNode = function(text) {
  this.text = text;
};

Jaml.TextNode.prototype = {
  render: function() {
    return this.text;
  }
};