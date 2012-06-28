/**
 * Attach handlers to toggle the twitter message field and inform the number
 * of characters remaining to achieve the max length
 */
Drupal.behaviors.twitter_post = function (context) {
   var titleOffset = 0;

   $("#edit-title", context).keyup(function() {
     if($("#twitter-textfield").val().indexOf("!title") != -1) {
       titleOffset = $("#edit-title").val().length; 
       var charsLeft = (120 - titleOffset - $("#twitter-textfield").val().length +6);
       var descDiv = $("#twitter-textfield").next();
       $(descDiv).html("<strong>" + charsLeft + "</strong> characters remaining");
       if (charsLeft < 0) {
         $("#edit-title").val($("#edit-title").val().substring(0, 120 - $("#twitter-textfield").val().length + 5));
       }
     }
   });

   $("#twitter-textfield", context).keyup(function() {
    var charsLeft = (120 - $(this).val().length - titleOffset + 6);
    var descDiv = $(this).next();
    $(descDiv).html("<strong>" + charsLeft + "</strong> characters remaining");
    if (charsLeft < 0) {
      if($("#twitter-textfield").val().indexOf("!title") != -1) {
        $("#twitter-textfield").val($("#twitter-textfield").val().substring(0, 120 - $("#edit-title").val().length + 6));
      }else{
        $("#twitter-textfield").val($("#twitter-textfield").val().substring(0, 120));
      }
    } else {
      $(descDiv).removeClass("negative");
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
