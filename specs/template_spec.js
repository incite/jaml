describe("Templates", function () {
  it("should support write nodes", function() {
    Jaml.register("my_template", function() {
      write("hello ");
      strong("world");
    });
    
    expect(stripWhitespace(Jaml.render("my_template"))).toEqual("hello <strong>world</strong>");
  });
  
  it("should call another template", function() {
    Jaml.register("hi", function(name) {
      p("hello " + escape(name));
    });
    
    Jaml.register("outer", function() {
      template("hi", "world");
    });
    
    expect(stripWhitespace(Jaml.render("outer"))).toEqual("<p>hello world</p>");
  });
});