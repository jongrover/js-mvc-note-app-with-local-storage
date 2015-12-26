"use strict";

var app = (function() {

  // Collection

  var notes = notes || [];

  var noteView,
      noteController;

  // Utility Methods

  function saveState() {
    localStorage.setItem('notes', JSON.stringify(notes));
    noteView.render();
  }

  function loadState() {
    return JSON.parse(localStorage.getItem('notes'));
  }

  function clearState() {
    localStorage.clear();
  }

  function init() {
    noteView = new NoteView();
    noteController = new NoteController();

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
    var text = $('#note-text').val();
    $('#note-text').val('');
    noteController.new(text);
  }
  NoteView.prototype.listen = function () {
    var self = this;

    $('#create-note').click(function() {
      self.createNote();
    });

    $('#note-list').on('click', '.destroy', function (event) {
      event.preventDefault();
      var id = $(this).parent().data('id');
      noteController.destroy(id);
    });
  };

  // Controller

  function NoteController() {
  }
  NoteController.prototype.new = function (text) {
    var note = new Note(text);
  }
  NoteController.prototype.destroy = function (id) {
    var note = notes[id];
    note.destroy();
  };

  // Public API

  return {
    init: init
  };

})();

$(function () {
  app.init();
});