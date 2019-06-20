$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var addImage = '';
    if (message.image.url) {
      addImage = `<img src="${message.image.url}" class="lower-message__image">`;
    }
    var html = `
        <div class="chat__contents__content" data-message-id="${message.id}">
          <div class="chat__contents__content-top" data-message-id="${message.id}">
            <div class="chat__contents__content-top__user">${message.name}</div>
            <div class="chat__contents__content-top__timestamp">${message.date}</div>
          </div>
          <div class="chat__contents__content__text">
            <p class="chat__contents__content__text">
              ${message.content}
            </p>
            ${addImage}
          </div>
        </div>`;
    return html;
  }

  $('.new_message').on('submit', function(e) {
    e.preventDefault();
    var formdata = new FormData(this);
    $.ajax({
      url: location.href,
      type: 'POST',
      data: formdata,
      dataType: 'json',
      contentType: false,
      processData: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.chat__contents').append(html)
      $('.form__message').val('');
      $('.btn').prop('disabled', false);
      $('.chat').animate({scrollTop: $('.chat__contents')[0].scrollHeight}, 'fast');
      $('.hidden').remove();
    })
    .fail(function(message) {
      alert('メッセージを入力してください');
    })
  })