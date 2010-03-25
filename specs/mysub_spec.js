describe("Jaml sub-templates", function() {
  it("should render", function() {
    Jaml.register("mySub", function() {
      ul(
        li("First"),
        li("Second"),
        li("Third")
      )
    });
    
    Jaml.register("myTemplate", function(data) {
      data = data || {};
      
      html(
        head(
          link({preset: "contentType"}),
          title(data.title)
        ),
        body(
          div({id: 'loading-mask'}),
          div({id: 'loading'},
            div({cls: 'loading-indicator'}),
            Jaml.render("mySub")
          )
        )
      );
    });
    
    var res = Jaml.render('myTemplate', {title: 'Some Title'});
    
    expect(stripWhitespace(res)).toEqual(stripWhitespace("\
      <html>\
        <head>\
          <link preset=\"contentType\" />\
          <title>Some Title</title>\
        </head>\
        <body>\
          <div id=\"loading-mask\">\
          </div>\
          <div id=\"loading\">\
          <div class=\"loading-indicator\">\
          </div>\
          <ul>\
            <li>First</li>\
            <li>Second</li>\
            <li>Third</li>\
          </ul>\
          </div>\
        </body>\
      </html>\
    "));
  });
});
