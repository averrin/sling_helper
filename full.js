(function() {
  $('#notification_area_static, #rc_notification_area_static, #rc_notification_area, #notification_area').remove();
  Sling.watch.slingboxSelector.localDiscoveryProxy();
  window.show = function() {
    var list = $('#receivers_popup_wrapper');
    $('#selector').hide();
    $('#receivers_popup_wrapper').hide();
    // list.attr('id', 'list');
    $('body').off("click");
    $('body').off("mousemove");
    Sling.watch.slingboxSelector.hideSelector = function() {};
    list.off('mouseout');
    list.css('display', 'block');
    list.css('position', 'relative');
    list.css('left', '0');
    list.css('top', '0');
    list.css('width', '100%');
    list.css('height', '660px');
    list.css('padding', '0');
    list.find('#receivers_popup, ul').css('height', '660px');
    list.find('#receivers_popup, ul').css('max-height', '660px');
    list.find('#receivers_popup, .slingboxDirectoryNameDiv, ul, li').css('width', '100%');
    list.find('.receiver_name').css('float', 'left');
    list.find('.receiver_name').css('width', '340px');
    list.find('.slingboxListRightArrow').css('float', 'right');
    list.find('.slingboxListRightArrow').css('top', '-12px');

    var ul = $('#slingbox_list');
    var listitems = ul.children('li').get();
    listitems.sort(function(a, b) {
       var c = $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
       return c;
    });
    $.each(listitems, function(idx, itm) { ul.append(itm); });

    $('#sidePaneContainer').prepend(list);
    var q = $('<input type="text" id="query" placeholder="Search...">');
    q.css('width', '100%');
    q.css('margin-bottom', '4px');
    q.on('keyup', function(event) {
      if (event.keyCode === 13) {
      var sling;
      $('.slingboxDirectoryNameDiv').each(
        function(i, e) {
          if (e.innerHTML.toLowerCase().indexOf(q.val().toLowerCase()) != -1) {
            sling = $(e).parent().parent();
          }
        }
      );

        sling.trigger('click');
      } else {
        ul.find('li').hide();
        $('.slingboxDirectoryNameDiv').each(function(i, e) {
          if (!e){return;}
          if (e.innerHTML.toLowerCase().indexOf(q.val().toLowerCase()) !== -1) {
             $(e).parent().parent().show();
          }
        });
      }
    });
   $('#sidePaneContainer').prepend(q);
    var donate = $('<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----"><input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form>');
   donate.css('margin-top', '16px');
   donate.css('float', 'right');
   $('#sidePaneContainer').append(donate);
    q.focus();

  };
  setTimeout(show, 500);
})();
