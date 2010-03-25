describe("Hello world", function () {
  it("should render hello world", function() {
    Jaml.register("my_template", function() {
      p("hello world");
    });
    
    expect(Jaml.render("my_template")).toEqual("<p>hello world</p>\n");
  });
}