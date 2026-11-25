/**
 * @file Lógica de la interfaz de AI Blog & Content Writer.
 *
 * Toda la comunicación con el backend se realiza con `fetch`. Las respuestas
 * del modelo se insertan en el DOM mediante `textContent` o creando nodos,
 * nunca con `innerHTML`, para evitar inyección de HTML.
 */

"use strict";

/**
 * Muestra un mensaje de error dentro de un contenedor.
 *
 * @param {HTMLElement} container - Elemento donde se mostrará el mensaje.
 * @param {string} message - Texto del error.
 * @returns {void}
 */
function showError(container, message) {
    container.replaceChildren();
    const paragraph = document.createElement("p");
    paragraph.className = "error-message";
    paragraph.textContent = message;
    container.appendChild(paragraph);
}

/**
 * Sustituye el contenido de un contenedor por un párrafo de texto plano.
 *
 * @param {HTMLElement} container - Elemento que se actualizará.
 * @param {string} text - Texto a mostrar.
 * @returns {void}
 */
function setParagraph(container, text) {
    container.replaceChildren();
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    container.appendChild(paragraph);
}

/** Campo del tema sobre el que escribir. */
const topicInput = document.getElementById("topic");
/** Selector del tono del texto. */
const styleSelect = document.getElementById("style");
/** Botón que solicita la generación. */
const generateButton = document.getElementById("generate-button");
/** Caja de texto donde se muestra el contenido. */
const outputArea = document.getElementById("output");

/**
 * Solicita al backend un texto sobre el tema y el tono elegidos.
 *
 * @async
 * @function generateContent
 * @param {Event} event - Evento de clic del botón.
 * @returns {Promise<void>} No devuelve valor; actualiza el DOM.
 */
async function generateContent(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("topic", topicInput.value);
    formData.append("style", styleSelect.value);

    try {
        const response = await fetch("/generate", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            outputArea.value = "Error: Failed to generate content.";
            return;
        }

        const data = await response.json();
        outputArea.value = data.content;
    } catch (error) {
        outputArea.value = "Error: Failed to generate content.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    generateButton.addEventListener("click", generateContent);
});
