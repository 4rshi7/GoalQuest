export default async function decorate(block){
    // const element = document.createElement('div');
    // element.classList.add('fake-hero');
    // element.append(block);
    // console.log(element);
    block.classList.add('container');
    block.children[0].classList.add('hero-text');
    // const button = document.querySelector('hero-text');
    console.log(button);
}