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
    
    expect(stripWhitespace(Jaml.render('simple'))).toEqual(stripWhitespace("\
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
    
    expect(stripWhitespace(Jaml.render('product', bsg))).toEqual(stripWhitespace("\
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
  
  it("should render collections and partials", function() {
    Jaml.register('category', function(category) {
      div({cls: 'category'},
        h1(category.name),
        p(category.products.length + " products in this category:"),

        div({cls: 'products'},
          Jaml.render('product', category.products)
        )
      );
    });
    
    var bsg = {
      title      : 'Battlestar Galactica DVDs',
      thumbUrl   : 'thumbnail.png',
      imageUrl   : 'image.png',
      description: 'Best. Show. Evar.'
    };
    
    //here's a second product
    var snowWhite = {
      title      : 'Snow White',
      description: 'not so great actually',
      thumbUrl   : 'thumbnail.png',
      imageUrl   : 'image.png'
    };

    //and a category
    var category = {
      name    : 'Doovde',
      products: [bsg, snowWhite]
    };
    
    expect(stripWhitespace(Jaml.render('category', category))).toEqual(stripWhitespace("\
      <div class=\"category\">\
        <h1>Doovde</h1>\
        <p>2 products in this category:</p>\
        <div class=\"products\">\
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
          <div class=\"product\">\
            <h1>Snow White</h1>\
            <p>not so great actually</p>\
            <img src=\"thumbnail.png\" />\
            <a href=\"image.png\">View larger image</a>\
            <form>\
              <label for=\"quantity\">Quantity</label>\
              <input type=\"text\" name=\"quantity\" id=\"quantity\" value=\"1\" />\
              <input type=\"submit\" value=\"Add to Cart\" />\
            </form>\
          </div>\
        </div>\
      </div>\
    "));
    
  })
});