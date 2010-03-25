describe("stripWhitespace method", function() {
  it("should remove whitespace between tags", function() {
    expect(stripWhitespace("<b>  </b>   <div>  </div>")).toEqual("<b></b><div></div>");
  });
  
  it("should trim before and after", function() {
    expect(stripWhitespace("  <b>  ")).toEqual("<b>");
  });
  
  it("should remove newlines", function() {
    expect(stripWhitespace("\na\nb\n\n\n")).toEqual("ab");
  });
});

function stripWhitespace(string) {
  string = string.replace(/>\s+</g, "><");
  string = string.replace(/^\s+/, "");
  string = string.replace(/\s+$/, "");
  string = string.replace(/\n/, "");
  return string;
}