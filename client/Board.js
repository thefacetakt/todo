(function() {
    function Board($selector) {
        var self = this;
        this.$selector = $selector;
        this.$listsContainer = $('<tr>');

        $selector.append(
            $('<div class="table-responsive">').append(
                $('<table class="table">').append(
                    this.$listsContainer
                )
            )
        );
        this.$button = $('<button type="button" class="btn">').text('Add new list');
        this.$buttonTd = $('<td>').append(
            $('<div class="btn-group btn-group-justified">').append(
                $('<div class="btn-group">').append(
                    this.$button
                )
            )
        );

        this.$listsContainer.append(
            this.$buttonTd
        );

        this.$button.on('click', function() {
            var newListSelector = $('<td>');
            var newList = new TodoList(newListSelector);
            self.$listsContainer.append(
                newListSelector
            );
            self.$listsContainer.append(
                this.$buttonTd
            );
        });
    }
    window.Board = Board;
})();