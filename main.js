"use strict";

var app = (function() {

  // Collection

  var notes = notes || [];

  // Utility Methods

  function saveState() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function loadState() {
    return JSON.parse(localStorage.getItem('notes'));
  }

  function clearState() {
    localStorage.clear();
  }

  function init() {
    if ('notes' in localStorage && localStorage.getItem('notes').length > 0) {
      var data = loadState();
      for (var i = 0; i < data.length; i++) {
        var note = new Note(data[i].text);
        if (data[i].liked) {
          note.like();
        }
      }
    } else {
      console.log('There are no saved notes.');
    }
    new NoteView().render();
  }

  // Models

  function Note(text) {
    this.text = text;
    this.liked = false;
    notes.push(this);
    saveState();
  }
  Note.prototype.like = function () {
    this.liked = !this.liked;
    saveState();
  };
  Note.prototype.update = function (text) {
    this.text = text;
    saveState();
  };
  Note.prototype.destroy = function () {
    var index = notes.indexOf(this);
    notes.splice(index, 1);
    saveState();
  };

  // Views

  function NoteView() {
    this.listen();
  }
  NoteView.prototype.render = function () {
    $('#note-list').empty();
    for(var i = 0; i < notes.length; i++) {
      $('#note-list').append('<p data-id="'+i+'">'+notes[i].text+' <a class="destroy" href="#">x</a></p>');
    }
  };
  NoteView.prototype.createNote = function () {
    var txt = $('#note-text').val(),
        note = new Note(txt);
    $('#note-text').val('');
    this.render();
  }
  NoteView.prototype.listen = function () {
    var self = this;

    $('#create-note').click(function() {
      self.createNote();
    });

    $('#note-list').on('click', '.destroy', function (event) {
      event.preventDefault();
      var id = $(this).parent().data('id'),
          note = notes[id];
      note.destroy();
      self.render();
    });
  };

  // Public API

  return {
    init: init
  };

})();

$(function(){
  app.init();
});