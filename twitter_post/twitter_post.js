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
       
       $(descDiv).html("Der hier eingegebene Text wird auf Twitter.com im Kanal @DemoScreen veröffentlicht, nachdem er zuvor durch den Hashtag #demografie sowie einen" 
          + " TinyURL-Link zu diesem Beitrag erweitert wurde. Daher stehen Ihnen für den eigenen Text nur " + max_length + " Zeichen zur Verfügung. Fügen Sie in diesem Feld die Zeichenkette "
          + "'!title' ein, so wird diese vor der Übertragung zu Twitter durch den Inhalt des Eingabefeldes 'Titelzeile' ersetze. Wenn Sie dieses Eingabefeld leer lassen, "
          + "wird ausschließlich der Inhalt aus dem Feld 'Titelzeile' als Nachricht für Twitter.com verwendet. <br><br> Noch <strong>" + charsLeft + "</strong> weitere Zeichen können zu Twitter übertragen werden");

       $(titleDescDiv).html("Tragen Sie hier den Titel des Beitrags ein. Noch " + charsLeft +" weitere Zeichen können zu Twitter übertragen werden"); 

       if (charsLeft < 0) {
        /*$("#twitter-textfield").val($("#twitter-textfield").val().substring(0, max_length - titleOffset));*/
        $(descDiv).html("Die Maximallänge für Twitter-Nachrichten wurde überschritten. Entfernen Sie mindestens <strong>" + -1*charsLeft +" </strong> Zeichen, ansonsten werden diese automatisch vom Ende abgeschnitten.");
        $(titleDescDiv).html("Die Maximallänge für Twitter-Nachrichten wurde überschritten. Entfernen Sie mindestens <strong>" + -1*charsLeft +"</strong> Zeichen, ansonsten werden diese automatisch vom Ende abgeschnitten.");
        $(titleDescDiv).css("color","#FF0000");
        $(titleDescDiv).css("display","block"); 
        $(descDiv).css("color","#FF0000");   
        $(descDiv).css("display","block");
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

    $(descDiv).html("Der hier eingegebene Text wird auf Twitter.com im Kanal @DemoScreen veröffentlicht, nachdem er zuvor durch den Hashtag #demografie sowie einen" 
      + " TinyURL-Link zu diesem Beitrag erweitert wurde. Daher stehen Ihnen für den eigenen Text nur " + max_length + " Zeichen zur Verfügung. Fügen Sie in diesem Feld die Zeichenkette "
      + "'!title' ein, so wird diese vor der Übertragung zu Twitter durch den Inhalt des Eingabefeldes 'Titelzeile' ersetze. Wenn Sie dieses Eingabefeld leer lassen, "
      + "wird ausschließlich der Inhalt aus dem Feld 'Titelzeile' als Nachricht für Twitter.com verwendet. <br><br> Noch <strong>" + charsLeft + "</strong> weitere Zeichen können zu Twitter übertragen werden");

    if (charsLeft < 0) {
      /* $("#twitter-textfield").val($("#twitter-textfield").val().substring(0, max_length - titleOffset));*/
      $(descDiv).html("Die Maximallänge für Twitter-Nachrichten wurde überschritten. Entfernen Sie mindestens <strong>" + -1*charsLeft +" </strong> Zeichen, ansonsten werden diese automatisch vom Ende abgeschnitten.");
      $(titleDescDiv).html("Die Maximallänge für Twitter-Nachrichten wurde überschritten. Entfernen Sie mindestens <strong>" + -1*charsLeft +"</strong> Zeichen, ansonsten werden diese automatisch vom Ende abgeschnitten.");      

      $(descDiv).css("color","#FF0000");
      $(descDiv).css("display","block");
      $(titleDescDiv).css("color","#FF0000");
      $(titleDescDiv).css("display","block");
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
        $(descDiv).html("Die Maximallänge für Twitter-Nachrichten wurde überschritten. Entfernen Sie mindestens <strong>" + -1*charsLeft +" </strong> Zeichen, ansonsten werden diese automatisch vom Ende abgeschnitten.");
        $(titleDescDiv).html("Die Maximallänge für Twitter-Nachrichten wurde überschritten. Entfernen Sie mindestens <strong>" + -1*charsLeft +"</strong> Zeichen, ansonsten werden diese automatisch vom Ende abgeschnitten.");        

        $(descDiv).css("color","#FF0000");
        $(descDiv).css("display","block");
        $(titleDescDiv).css("color","#FF0000");
        $(titleDescDiv).css("display","block");
        
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
