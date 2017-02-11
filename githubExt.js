// ==UserScript==
// @name         github-project-ext
// @namespace    https://github.com/sakuxz
// @version      0.1
// @description  make the issue which in issue-card can be preview
// @author       sakuxz
// @match        https://github.com/*/projects/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

(function() {
  'use strict';
  // Your code here...
  var style = `
    #issue-preview {
      position: fixed;
      top: 3.5em;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      width: 90%;
      max-width: 1050px;
      height: 86%;
      overflow: auto;
      margin: auto;
      z-index: 1000;
      background: white;
      border-radius: 5px;
      box-shadow: 0 8px 30px -3px rgba(0, 0, 0, 0.65);

      transition: 0.3s all ease-in-out;
      visibility: hidden;
      transform: scale(0.9) translateY(-2em);
      opacity: 0;
    }

    #issue-preview.open {
      visibility: visible;
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    #preview-mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      background: rgba(0,0,0,0.65);

      transition: 0.2s all;
      visibility: hidden;
      opacity: 0;
    }

    #preview-mask.open {
      visibility: visible;
      opacity: 1;
    }

    .preview-header {
      padding: 15px 12px 12px;
      margin-bottom: 6px;
      background: whitesmoke;
      border-bottom: 1px solid #dadada;
    }

    .preview-header a {
      font-weight: 900;
      text-decoration: none;
    }

    .preview-content {
      margin-bottom: 5px;
      padding: 2.5em;
      overflow: auto;
      height: 100%;
    }

    .discussion-timeline {
      width: calc(100% - 230px);
    }
  `;

  $('head').append('<style>' + style + '</style>')
  $('body').append('<div id="issue-preview">\
       <div class="preview-header"><a href="" target="_blank">issue</a></div>\
       <div class="preview-content"></div>\
    </div>')
  $('body').append('<div id="preview-mask"></div>')
  $(document).on('click', '.issue-card a', function () {
    $('#issue-preview').addClass('open');
    $('#preview-mask').addClass('open');

    $('.preview-header a').attr('href', this.href);
    $('.preview-header a').text(this.text);
    $.get(this.href).then(function(e){
      $(e).find('.repository-content').appendTo('.preview-content');
    })
    return false;
  });
  $('#preview-mask').click(function(event) {
    $('#issue-preview').removeClass('open');
    $('#preview-mask').removeClass('open');
    $('.preview-content').html('')
  });

})();
