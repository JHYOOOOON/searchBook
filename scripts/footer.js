const footerInit = () =>{
    const foot = document.getElementsByClassName("footer-text")[0];
    console.log(foot);
    const date = new Date();
    const year = date.getFullYear();
    foot.innerText = `Copyright (c) ${year}. JHYOON. All rights reserved.`
}

footerInit();