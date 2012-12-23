/**
 * Attach handlers to toggle the twitter message field and inform the number
 * of characters remaining to achieve the max length
 */
Drupal.behaviors.twitter_post = function (context) {
   var titleOffset = 0;
   var max_length = 100;
   var descDiv = $("#twitter-textfield").next();
   var titleDescDiv = $("#edit-title").next();

   $("#edit-title", context).keyup(function() {
     if($("#twitter-textfield").val().indexOf("!title") != -1 && $("#twitter-toggle").attr('checked')) {
       titleOffset = $("#edit-title").val().length - 6; /* length of !title*/
       var realLength = $("#twitter-textfield").val().length + titleOffset;
       var charsLeft = (max_length - realLength);
       
       $(descDiv).html("<strong>" + charsLeft + "</strong> characters remaining");
       $(titleDescDiv).html("Enter title here"); 
       if (charsLeft < 0) {
        /*$("#twitter-textfield").val($("#twitter-textfield").val().substring(0, max_length - titleOffset));*/
        $(descDiv).html("<strong>" + 0 + "</strong> characters remaining. Twitter text field will be truncated");
        $(titleDescDiv).html("Twitter text field will be truncated");
        $(titleDescDiv).css("color","#FF0000");
        $(titleDescDiv).css("display","block"); 
        $(descDiv).css("color","#FF0000");   
       } else {
         $(descDiv).removeAttr("style");
         $(titleDescDiv).removeAttr("style");
       }
     }
   });

   $("#twitter-textfield", context).keyup(function() {
    titleOffset = 0;
    if($("#twitter-textfield").val().indexOf("!title") != -1) {
       titleOffset = $("#edit-title").val().length - 6; /* length of !title*/
    }
    var realLength = $(this).val().length + titleOffset;
    var charsLeft = (max_length - realLength);

    $(descDiv).html("<strong>" + charsLeft + "</strong> characters remaining");

    if (charsLeft < 0) {
      /* $("#twitter-textfield").val($("#twitter-textfield").val().substring(0, max_length - titleOffset));*/
      $(descDiv).html("<strong>" + 0 + "</strong> characters remaining. Twitter text field will be truncated");
      $(descDiv).css("color","#FF0000");
      $(descDiv).css("display","block");
    } else {
      $(descDiv).removeClass("negative");
      $(descDiv).removeAttr("style");
      $(titleDescDiv).removeAttr("style");
    }
  });

  if (!$("#twitter-toggle").attr("checked")) {
    $("#twitter-textfield-wrapper").hide();
  }

  $("#twitter-toggle").bind("click", function() {
    if ($("#twitter-toggle").attr("checked")) {
      $("#twitter-textfield-wrapper").show();
      
      if($("#twitter-textfield").val().indexOf("!title") != -1) {
         titleOffset = $("#edit-title").val().length - 6; /* length of !title*/
      }
      var realLength = $("#twitter-textfield").val().length + titleOffset;
      var charsLeft = (max_length - realLength);
      $(descDiv).html("<strong>" + charsLeft + "</strong> characters remaining");
      if (charsLeft < 0) {
        $(descDiv).html("<strong>" + 0 + "</strong> characters remaining. Twitter text field will be truncated");
        $(descDiv).css("color","#FF0000");
        $(descDiv).css("display","block");
        } else {
        $(descDiv).removeClass("negative");
        $(descDiv).removeAttr("style");
        $(titleDescDiv).removeAttr("style");
        $(titleDescDiv).html("Enter title here"); 
      }
    }
    else {
      $("#twitter-textfield-wrapper").hide();
      $(descDiv).removeAttr("style");
      $(titleDescDiv).removeAttr("style");
      $(titleDescDiv).html("Enter title here"); 
    }
  });
};
