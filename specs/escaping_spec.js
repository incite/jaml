describe("Jaml escaping", function() {
  it("should escape html attributes", function() {
    Jaml.register("myTemplate", function() {
      a({name: "< less than < > greater than > \" quote \""}, "click me!");
    });
    
    expect(stripWhitespace(Jaml.render("myTemplate"))).toEqual(stripWhitespace("\
      <a name=\"&lt; less than &lt; &gt; greater than &gt; &quot; quote &quot;\">click me!</a>\
    "));
  })
});