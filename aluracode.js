// ==UserScript==
// @name         Alura Destroyer V2
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Script para marcar lições como concluídas e avançar automaticamente na Alura
// @author       Biell
// @match        https://cursos.alura.com.br/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("--- ALURA DESTROYER V2 BY Biell ---");

    // Modifica a marca d'água da página
    const waterMark = document.querySelector('.formattedText');
    if (waterMark) {
        waterMark.innerHTML = 'Alura destroyer V2 by Biell';
    }

    // Obtém os cookies e a URL atual
    let cookies = document.cookie;
    let actualUrl = window.location.href;
    let nextLessonButton = document.getElementsByClassName("bootcamp-next-button")[0];

    // Verifica se o botão da próxima lição existe
    if (nextLessonButton) {
        let nextLessonLink = nextLessonButton.getAttribute('href');
        let parts = actualUrl.split('/');
        let lessonName = parts[4];
        let lessonId = parts[6];
        console.log(`[DEBUG] Lesson_Name: ${lessonName} Lesson_Id: ${lessonId}`);

        // Faz uma requisição para marcar a lição como concluída
        fetch(`https://cursos.alura.com.br/course/${lessonName}/task/${lessonId}/mark-video`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies
            }
        }).then(data => {
            console.log("[DEBUG] Lição concluída com sucesso!");
            
            // Clica automaticamente no botão para avançar para a próxima lição
            nextLessonButton.click();
        }).catch(error => {
            console.error("[DEBUG] Falha ao marcar a lição:", error);
        });

    } else {
        // Exibe alerta caso o botão não seja encontrado
        alert("Botão da próxima lição não encontrado 😦 Verifique se você está na página correta.");
    }

})();