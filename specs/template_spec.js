describe("Templates", function () {
  it("should support write nodes", function() {
    Jaml.register("my_template", function() {
      write("hello ");
      strong("world");
    });
    
    expect(stripWhitespace(Jaml.render("my_template"))).toEqual("hello <strong>world</strong>");
  });
});