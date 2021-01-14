import './styles/index.scss';

(function () {
    function resizeGridItem(item) {
        var grid = document.getElementById("wishes");
        var rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        var rowSpan = Math.ceil((item.querySelector('.wish').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = "span " + rowSpan;
    }

    function resizeAllGridItems() {
        var allItems = document.getElementsByClassName("item");
        for (var x = 0; x < allItems.length; x++) {
            resizeGridItem(allItems[x]);
        }
    }

    window.onload = resizeAllGridItems();

    window.addEventListener("resize", resizeAllGridItems);

}())