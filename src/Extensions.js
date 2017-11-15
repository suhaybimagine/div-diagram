$.fn.extend({
    location: function () {

        let locs = [];
        this.each((i, elm) => {
            let position = $(elm).position();
            let x = position.left - parseInt($(elm).css('paddingLeft'));
            let y = position.top - parseInt($(elm).css('paddingTop'));
            locs.push({ top: y, left: x });
        });

        return (locs.length > 1) ? locs : locs[0];
    }
});