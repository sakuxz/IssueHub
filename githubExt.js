$(function () {
  function preventDefault(e) {
    e.preventDefault();
  }
  $('.js-issue-row .link-gray-dark').on('click', preventDefault);
  setInterval(function () {
    $('.js-issue-row .link-gray-dark').off('click', preventDefault);
    $('.js-issue-row .link-gray-dark').on('click', preventDefault);
  }, 500);
  // $('.issue-card > h5').after('<i class="fa fa-hand-paper-o assign-myself" title="assign myself" aria-hidden="true"></i>')
});

$('body').append('<div id="issue-preview">\
     <div class="preview-header"><a href="" target="_blank">issue</a></div>\
     <div class="preview-content"></div>\
  </div>')
$('body').append('<div id="preview-mask"></div>')
$(document).on('click', '.issue-card > h5 > a, .js-issue-row .link-gray-dark', function (e) {
  $('.preview-content').html('<div class="loading-spinner">\
      <div class="bounce1"></div>\
      <div class="bounce2"></div>\
      <div class="bounce3"></div>\
    </div>');
  $('#issue-preview').addClass('open');
  $('#preview-mask').addClass('open');

  $('.preview-header a').attr('href', this.href);
  $('.preview-header a').text(this.text);
  $.get(this.href).then(function(e){
    $('.preview-content').html('');
    $(e).find('.repository-content').appendTo('.preview-content');
  })
  return false;
});
$('#preview-mask').click(function(event) {
  $('#issue-preview').removeClass('open');
  $('#preview-mask').removeClass('open');
});
