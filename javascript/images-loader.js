const images = document.querySelectorAll("img:not(.ignore-src)");

const observer = new MutationObserver(mutationList=>{
    for(let mutation of mutationList) {
        if(mutation.type == "attributes" && mutation.target instanceof Image && !mutation.target.classList.contains("low-quality-image") && !mutation.target.classList.contains("ignore-src")) {
            customImageLoading(mutation.target);
        }
    }
});

function connectObserver() {
    observer.observe(document.body, {attributes:true, subtree:true});
}

function disconnectObserver() {
    observer.disconnect();
}

function customImageLoading(img) {
    if(img.src.search("images/source") != -1){
        disconnectObserver();
        img.classList.add("low-quality-image");

        const sourceImagePath = img.src;
        img.src = img.src.replace("images/source", "images/low");
        
        var backgroundLoader = new Image();
        backgroundLoader.onload = ()=>{
            disconnectObserver();
            img.src = sourceImagePath;
            img.classList.remove("low-quality-image");
            backgroundLoader = null;
            connectObserver();
        }

        backgroundLoader.src = sourceImagePath;
        connectObserver();
    }
}

images.forEach(imageElement => customImageLoading(imageElement));