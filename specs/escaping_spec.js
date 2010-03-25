describe("Jaml escaping", function() {
  it("should escape html attributes", function() {
    Jaml.register("myTemplate", function() {
      a({name: "< less than < > greater than > \" quote \""}, "click me!");
    });
    
    expect(stripWhitespace(Jaml.render("myTemplate"))).toEqual(stripWhitespace("\
      <a name=\"&lt; less than &lt; &gt; greater than &gt; &quot; quote &quot;\">click me!</a>\
    "));
  });
  
  it("should escape html text", function() {
    Jaml.register("myTemplate", function() {
      a(escape("< less than < > greater than > \" quote \""));
    });
    
    expect(stripWhitespace(Jaml.render("myTemplate"))).toEqual(stripWhitespace("\
      <a>&lt; less than &lt; &gt; greater than &gt; &quot; quote &quot;</a>\
    "));
  });
  
  it("should escape the undefined value", function() {
    Jaml.register("myTemplate", function() {
      write(escape(undefined));
    });
    
    expect(stripWhitespace(Jaml.render("myTemplate"))).toEqual("");
  })
});