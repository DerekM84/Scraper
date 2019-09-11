

$(".get-new").on("click", function () {
    console.log("get-new-button-clicked");
    $(".article-display").empty();
    $.get("/all").then(function (data) {
        $(".article-display").empty();
    for (let i = 0; i < data.length; i++) {
        const e = data[i];

        console.log("reached for each loop");
        var wrap = $("<div>").addClass("article-wrap");
        var left = $("<div>").addClass("article-left");
        var img = $("<img>").addClass("article-image").attr("src", e.img);
        left.append(img);
        var middle = $("<div>").addClass("article-middle");
        var heading = $("<div>").addClass("article-heading");
        var h5 = $("<h5>").addClass("article-title").text(e.time);
        var h4 = $("<h4>").addClass("article-title").text(e.author);
        heading.append(h4, h5);
        var p = $("<p>").addClass("article-summary").text(e.headline);
        middle.append(heading, p);
        var right = $("<div>").addClass("article-right");
        var b1 = $("<button>").addClass("save-button article-button").text("Save")
        .attr("data-time", e.time)
        .attr("data-author", e.author)
        .attr("data-headline", e.headline)
        .attr("data-img", e.img)
        .attr("data-id", e._id)
        .attr("data-link",e.link);

        var b2 = $("<button>").addClass("article-button").text("Button");
        var b3 = $("<button>").addClass("article-button").text("Button");
        right.append(b1, b2, b3);
        wrap.append(left, middle, right);
        $(".article-display").append(wrap);
    }
    });
})

$(".saved").on("click", function () {
    console.log("saved-button-clicked");
    $.get("/saved").then(function (data) {
        $(".article-display").empty();
    for (let i = 0; i < data.length; i++) {
        const e = data[i];
        console.log("reached for each loop");
        var wrap = $("<div>").addClass("article-wrap");
        var left = $("<div>").addClass("article-left");
        var img = $("<img>").addClass("article-image").attr("src", e.img);
        left.append(img);
        var middle = $("<div>").addClass("article-middle");
        var heading = $("<div>").addClass("article-heading");
        var h5 = $("<h5>").addClass("article-title").text(e.time);
        var h4 = $("<h4>").addClass("article-title").text(e.author);
        heading.append(h4, h5);
        var p = $("<p>").addClass("article-summary").text(e.headline);
        middle.append(heading, p);
        var right = $("<div>").addClass("article-right");

        var b1 = $("<button>").addClass("unsave-button article-button").text("Unsave")
        .attr("data-time", e.time)
        .attr("data-author", e.author)
        .attr("data-headline", e.headline)
        .attr("data-img", e.img)
        .attr("data-id", e._id)
        .attr("data-link",e.link);


        var b2 = $("<button>").addClass("comment-button article-button").text("Comment")
        .attr("data-headline", e.headline)
        ;

        right.append(b1, b2);
        wrap.append(left, middle, right);
        $(".article-display").append(wrap);
    }
    })
});

$(document).on("click", ".save-button", function() {
    $.get("/saved", function(data) {
        console.log(data)
        // for (var i = 0; 1 < data.length; i++) {
        //     let oldId = data[i]._id
        //     if (this.data-id === oldId) {
        //         return
        //     }
        // }

        // only add to saved collection if not in already
    }) 
    console.log("clicked save button");
    var article = {

        time: $(this).attr("data-time"),
        headline: $(this).attr("data-headline"),
        img: $(this).attr("data-img"),
        author: $(this).attr("data-author"),
        _id: $(this).attr("data-id"),
        link:$(this).attr("data-link")

    }

    $.post("/save", article).then(function(err, data) {
        if (err) console.log(err);
        console.log(data);
    });

});
$(document).on("click", ".unsave-button", function() {
    var id = $(this).attr("data-id");
    $.post("/unsave", id).then(function(err, data) {
        if (err) console.log(err);
        console.log("deleted: " + data);
    });
});
