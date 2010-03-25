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
  })
});

function clean(string) {
  string.replace(/>\s+</, "><");
}