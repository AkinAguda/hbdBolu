import './styles/index.scss';

(function () {
    var grid = document.getElementById("wishes");
    var loader = document.getElementById("loader");

    function hideLoader() {
        loader.classList.add('fade-out');
        setTimeout(function () {
            loader.style.display = "none";
        }, 300)
    }

    function buildGridItem(sender, content) {
        var item = document.createElement('div');
        item.classList.add('item');
        var wish = document.createElement('article');
        wish.classList.add('wish');
        var paragraph = document.createElement('p');
        paragraph.innerText = content;
        var span = document.createElement('span');
        span.innerText = "- " + sender;

        wish.appendChild(paragraph);
        wish.appendChild(span);
        item.appendChild(wish);

        return item;
    }

    function appendGridItems(items) {
        items.reverse();
        items.forEach(function (item) {
            grid.appendChild(buildGridItem(item.yourName, item.saySomethingNiceAboutBolu));
        });
    }

    function resizeGridItem(item) {
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

    function fetchData() {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                appendGridItems(data.formResponses1);
                resizeAllGridItems();
                hideLoader();
            }
        };
        xmlhttp.open("GET", "https://api.sheety.co/b482c821d106f1406292bda79e48b1d8/bolusbirthday/formResponses1", true);
        xmlhttp.send();
    }

    window.onload = fetchData();

    window.addEventListener("resize", resizeAllGridItems);

}())