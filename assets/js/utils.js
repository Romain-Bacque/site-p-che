const utilsModule = {
    loader: function() {
        const loaderDOM = document.getElementById('loader__dom');

        const loadNow = (opacity) => {
            if(opacity <= 0){
                scrollHeader();
                displayContent();    
            } else {
                loaderDOM.style.opacity = opacity;
                window.setTimeout(() => {
                    loadNow(opacity - 0.05)
                }, 50);
            }
        }
        
        const displayContent = () => {
            loaderDOM.style.display = 'none';
        }
    }
}