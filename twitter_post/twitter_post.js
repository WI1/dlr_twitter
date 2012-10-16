/**
 * Attach handlers to toggle the twitter message field and inform the number
 * of characters remaining to achieve the max length
 */
Drupal.behaviors.twitter_post = function (context) {
   var titleOffset = 0;
   var max_length = 105;

   $("#edit-title", context).keyup(function() {
     if($("#twitter-textfield").val().indexOf("!title") != -1) {
       titleOffset = $("#edit-title").val().length - 6; /* length of !title*/
       var realLength = $("#twitter-textfield").val().length + titleOffset;
       var charsLeft = (max_length - realLength);
       
       var descDiv = $("#twitter-textfield").next();
       $(descDiv).html("<strong>" + charsLeft + "</strong> characters remaining " + realLength);

       if (charsLeft < 0) {
        $("#twitter-textfield").val($("#twitter-textfield").val().substring(0, max_length - titleOffset));
        $(descDiv).html("<strong>" + 0 + "</strong> characters remaining. Maximum length reached");
        $(descDiv).css("color","#FF0000");   
       } else {
         $(descDiv).removeAttr("style");
       }
     }
   });

   $("#twitter-textfield", context).keyup(function() {
    if($("#twitter-textfield").val().indexOf("!title") != -1) {
       titleOffset = $("#edit-title").val().length - 6; /* length of !title*/
    }else{
       titleOffset = 0;
    }
    var realLength = $(this).val().length + titleOffset;
    var charsLeft = (max_length - realLength);

    var descDiv = $(this).next();
    $(descDiv).html("<strong>" + charsLeft + "</strong> characters remaining");

    if (charsLeft < 0) {
      $("#twitter-textfield").val($("#twitter-textfield").val().substring(0, max_length - titleOffset));
      $(descDiv).html("<strong>" + 0 + "</strong> characters remaining. Maximum length reached");
      $(descDiv).css("color","#FF0000");
    } else {
      $(descDiv).removeClass("negative");
      $(descDiv).removeAttr("style");
    }
  });

  if (!$("#twitter-toggle").attr("checked")) {
    $("#twitter-textfield-wrapper").hide();
  }

  $("#twitter-toggle").bind("click", function() {
    if ($("#twitter-toggle").attr("checked")) {
      $("#twitter-textfield-wrapper").show();
    }
    else {
      $("#twitter-textfield-wrapper").hide();
    }
  });
};
