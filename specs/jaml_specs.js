describe("Jaml", function () {
  it("should render hello world", function() {
    Jaml.register("my_template", function() {
      p("hello world");
    });
    
    expect(Jaml.render("my_template")).toEqual("<p>hello world</p>\n");
  });
  
  it("should render a simple template", function() {
    Jaml.register('simple', function() {
      div(
        h1("Some title"),
        p("Some exciting paragraph text"),
        br(),

        ul(
          li("First item"),
          li("Second item"),
          li("Third item")
        )
      );
    });
    
    expect(clean(Jaml.render('simple'))).toEqual(clean("\
      <div>\
        <h1>Some title</h1>\
        <p>Some exciting paragraph text</p>\
        <br />\
        <ul>\
          <li>First item</li>\
          <li>Second item</li>\
          <li>Third item</li>\
        </ul>\
      </div>\
    "));
  });
  
  it("should render with injecting data", function() {
    Jaml.register('product', function(product) {
      div({cls: 'product'},
        h1(product.title),
          
        p(product.description),
          
        img({src: product.thumbUrl}),
        a({href: product.imageUrl}, 'View larger image'),
          
        form(
          label({'for': 'quantity'}, "Quantity"),
          input({type: 'text', name: 'quantity', id: 'quantity', value: 1}),
          
          input({type: 'submit', value: 'Add to Cart'})
        )
      );
    });
    
    var bsg = {
      title      : 'Battlestar Galactica DVDs',
      thumbUrl   : 'thumbnail.png',
      imageUrl   : 'image.png',
      description: 'Best. Show. Evar.'
    };
    
    expect(clean(Jaml.render('product', bsg))).toEqual(clean("\
      <div class=\"product\">\
        <h1>Battlestar Galactica DVDs</h1>\
        <p>Best. Show. Evar.</p>\
        <img src=\"thumbnail.png\" />\
        <a href=\"image.png\">View larger image</a>\
        <form>\
          <label for=\"quantity\">Quantity</label>\
          <input type=\"text\" name=\"quantity\" id=\"quantity\" value=\"1\" />\
          <input type=\"submit\" value=\"Add to Cart\" />\
        </form>\
      </div>\
    "));
  });
});

describe("clean method", function() {
  it("should remove whitespace between tags", function() {
    expect(clean("<b>  </b>   <div>  </div>")).toEqual("<b></b><div></div>");
  });
  
  it("should trim whitespace", function() {
    expect(clean("  <b>  ")).toEqual("<b>");
  });
  
  it("should remove newlines", function() {
    expect(clean("\na\nb\n\n\n")).toEqual("ab");
  });
});

function clean(string) {
  string = string.replace(/>\s+</g, "><");
  string = string.replace(/^\s+/, "");
  string = string.replace(/\s+$/, "");
  string = string.replace(/\n/, "");
  return string;
}