//this is where I use export

//child remover function originally from swapi
export function killYounglings(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
