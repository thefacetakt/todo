$(function() {
    console.log('on');
    window.socket = io();
    var list = new TodoList($("#container"), 'YATDL');
});