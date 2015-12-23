"use strict";

// var app = app || {};

// app.main = (function(){

  // Collection
  var notes = notes || [];

  // Utility Methods
  function saveState() {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  function loadState() {
    notes = JSON.parse(localStorage.getItem('notes'));
  }

  function clearState() {
    localStorage.clear('notes');
  }

  function buildModels() {
    for (var i = 0; i < notes.length; i++) {
      var note = new Note(notes[i].text);
    }
  }

  function initialize() {
    if ('notes' in localStorage && localStorage.getItem('notes').length > 0) {
      loadState();
      buildModels();
    }
  }

  // Model
  function Note(text) {
    this.text = text;
    this.liked = false;
    notes.push(this);`
    //saveState();
  }
  Note.prototype.like = function () {
    this.liked = !this.liked;
    return this;
  };
  Note.prototype.update = function (text) {
    this.text = text;
    saveState();
    return this;
  };
  Note.prototype.destroy = function () {
    var index = notes.indexOf(this);
    notes.splice(index, 1);
    saveState();
    return this;
  };

  // View
  // function NoteView(note, ele) {
  //   this.note = note;
  //   this.ele = ele;
  // }
  // NoteView.prototype.render = function () {

  // };

  // public app API

//   return {
//     init: initialize
//   };

// })();


$(function(){
  //initialize();
});