(function() {
    function TodoList($selector, name) {
        if (name === undefined)
            name = 'List Name';
        var self = this;
        this.$selector = $selector;
        this.$innerList = $('<div class="list-group">');
        this.$inputField = $('<input type="text" class="form-control" id="input" placeholder="">');

        $selector.append(
            $('<div class="page-header">').append(
                $('<h1 class="text-center">').text(
                    name
                )
            )
        ).append(
            $('<div class="form group">').append(
                this.$inputField
            ).append(
                $('<hr>')
            ).append(
                this.$innerList
            )
        );

        this.$inputField.on('keypress', function (e) {
            if (e.which == 13) {
                socket.emit('new task', self.$inputField.val());
                self.$inputField.select();
            }
        });

        socket.on('new task', function(data) {
            console.log(data);
            self.add(data.text, data.id);
        });

        socket.on('change', function(data) {
            ($selector.find("[data-todo-id='" + data.id.toString() + "'] .todo-text")).text(data.text);
        });

        socket.on('delete', function(id) {
             console.log($selector.find("[data-todo-id='" + id.toString() + "']"));
            ($selector.find("[data-todo-id='" + id.toString() + "']")).remove();
        });
    }

    TodoList.prototype.add = function (value, id) {
        var todoList = this;
        var $deleteButton = $('<span class="glyphicon glyphicon-remove-circle pull-right glyphicon-lg delete-button" aria-hidden="true">');
        var $text = $('<span contenteditable="true" class="todo-text">').text(value);
        this.$innerList.append(
            $('<div class="row list-group-item" data-todo-id="' + id.toString() + '">').append(
                $('<div class="col-md-11">').append(
                    $text
                )
            ).append(
                $('<div class="col-md-1">').append(
                    $deleteButton
                )
            )
        );

        $text.on('input', function() {
            //alert($text.text());
            socket.emit('change', {
                text: $text.text(),
                id: id
            });
        });

        $deleteButton.on('mouseover', function () {
            $(this).removeClass("glyphicon-remove-circle");
            $(this).addClass("glyphicon-remove-sign");
        });

        $deleteButton.on('mouseout', function () {
            $(this).removeClass("glyphicon-remove-sign");
            $(this).addClass("glyphicon-remove-circle");
        });

        $deleteButton.on('click', function() {
            /*
            var $self = $(this);
            while (!$self.hasClass("list-group-item")) {
                $self = $self.parent();
            }
            $self.remove();
            */
            socket.emit('delete', id);
        });
    }
    window.TodoList = TodoList;
})();
