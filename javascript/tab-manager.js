window.onload = ()=>{
    function rsplit(str, separator, maxsplit) {
        const reversed = str.split('').reverse().join('');
        const reversedResult = reversed.split(separator).slice(0, maxsplit);
        const result = reversedResult.map(part => part.split('').reverse().join('')).reverse();
        return result;
    }

    const topLinksContainer = document.querySelector("#top-menu-links-container");
    let currentTabName = rsplit(window.location.href, "/", 1)[0];
    console.log(currentTabName);
    document.querySelector(`a[href="${currentTabName}"]`).classList.add("disabled");
}