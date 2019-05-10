$.getJSON("/scraper", function(data) {
});


$(document).on("click", "#generate", function() {
    $.ajax({
        method:"GET",
        url:"/all"
    }).then(function(data)
    {
        for (let story of data)
        {
            console.log(story);

            $("#headlines").append("<div class='row'><h10 id='" + story._id +"_hl'>" + story.Headline + "</h10></div>");
            $("#urls").append("<div class='row'><a href='"+story.URL+"' target='_blank'>URL</a></div>");
            $("#comments").append("<div class='row'><input type='text' id='"+story._id+"'</input><button class='comment'>Leave a Comment!</button></div>");

        }   
    })
});