// dynamic generation of an article display to match CSS

var wrap = $("<div>").addClass("article-wrap");

var left = $("<div>").addClass("article-left");
var img = $("<img>").addClass("article-image").attr("src", ?);

var middle = $("<div>").addClass("article-middle");
var heading = $("<div>").addClass("article-heading");
var h2 = $("<h2>").addClass("article-title").text(?);
var h6 = $("<h6>").addClass("article-title").text(?);
heading.append(h2, h6);
var p = $("<p>").addClass("article-summary").text(?);
middle.append(heading, p);

var right = $("<div>").addClass("article-right");
var b1= $("<button>").addClass("article-button").text("Save");
var b2 = $("<button>").addClass("article-button").text("Button");
var b3 = $("<button>").addClass("article-button").text("Button");
right.append(b1,b2,b3);

wrap.append(left,middle,right);

$(".article-display").append(wrap);