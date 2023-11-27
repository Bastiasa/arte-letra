"use strict";

class importer {
    static async here(pathToHtm) {
        try {
            const currentScript = document.currentScript;
            const currentScriptParent = currentScript.parentElement;
            const result = await fetch(pathToHtm, { method: "GET", cache:'no-cache' }).then(response => response.text());
            const container = document.createElement("div");
            container.innerHTML = result;
            const containerChildren = Array.from(container.children);
            for (const containerChildIndex in containerChildren) {
                const containerChild = containerChildren[containerChildIndex];
                if (parseInt(containerChildIndex) == 0) {
                    currentScriptParent.insertBefore(containerChild, currentScript);
                }
                else {
                    currentScriptParent.insertBefore(containerChild, containerChildren[parseInt(containerChildIndex) - 1]);
                }
            }
            currentScript.remove();
        }
        catch (err) {
            console.log(`Error al importar el archivo ${pathToHtm}: `, err, ".");
        }
    }
}