// $('body').append('<div id="issue-preview">\
//      <div class="preview-header"><a href="" target="_blank">issue</a></div>\
//      <div class="preview-content"></div>\
//   </div>')
// $('body').append('<div id="preview-mask"></div>')
var iframeStyles = `
  body > .navbar-gitlab,
  .page-gutter.page-with-sidebar > div.layout-nav,
  .page-gutter.page-with-sidebar > .content-wrapper.page-with-layout-nav h2.title {
    display: none !important;
  }
  .page-gutter.page-with-sidebar > .content-wrapper.page-with-layout-nav,
  .page-gutter.page-with-sidebar .right-sidebar {
    margin-top: -105px !important;
  }
`;

$(document).on('click', '.card-title a', function (e) {
  // $('.preview-content').html('<div class="loading-spinner">\
  //     <div class="bounce1"></div>\
  //     <div class="bounce2"></div>\
  //     <div class="bounce3"></div>\
  //   </div>');
  $('.preview-content').html('');
  $('#issue-preview').addClass('open');
  $('#preview-mask').addClass('open');
  $('.preview-header a').attr('href', this.href);
  $('.preview-header a').text(this.text);

  var iframe = $('<iframe style="width:100%; height: 100%;" />');
  iframe.attr('src', this.href);
  $('.preview-content').append(iframe);
  iframe.on('load', function() {
    $('.preview-content iframe').contents().find('head').append('<style>' + iframeStyles + '</style>');
  });
  // $.get(this.href).then(function(e){
  //   $('.preview-content').html('');
  //   $(e).find('.repository-content').appendTo('.preview-content');
  // })
  return false;
});
$('#preview-mask').click(function(event) {
  $('#issue-preview').removeClass('open');
  $('#preview-mask').removeClass('open');
});
