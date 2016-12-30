$(document).ready(function(){
  function handle(e){
    return false; // disable 'Enter' key
  }
  $("#search").on("click", function(){
    var topic = $("#topic").val();
    var topicURI = topic.replace(/\s+/g, "+").toLowerCase(); // URI-friendly
    var apiURL = "https://en.wikipedia.org/w/api.php?callback=?&action=query&format=json&list=search&srsearch="+topicURI;
    
    $.getJSON(apiURL, function(data){
      $("#numResults").empty();
      $("#results").empty();
      $("#numResults").append("<p>Found "+data.query.searchinfo.totalhits+" articles</p>");
      $.each(data.query.search, function(i, entry){
        $("#results").append($("<a href='http://en.wikipedia.org/wiki/"+encodeURIComponent(entry.title)+"' target='_blank'><div class='article'><span id='title'>"+entry.title+"</span><br><p>"+entry.snippet+"...</p></div></a>").hide().delay(200*i).fadeIn(500));  // fadeIn each <a> one after the other
      }); // /.each()
      $(".article").mouseenter(function(){
        $(this).css("box-shadow" , "0px 0px 10px 2px black");
      });
      $(".article").mouseleave(function(){
        $(this).css("box-shadow" , "0 0 0 0");
      });
    }); // /.getJSON()
  }); // /.on()
});