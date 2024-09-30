// ==UserScript==
// @name         Alura Destroyer Multi-Tab
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Script para marcar lições concluídas e abrir próximas lições em múltiplas abas (limite de 3 abas simultâneas)
// @author       Biell
// @match        https://cursos.alura.com.br/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("--- ALURA DESTROYER MULTI-TAB BY Biell ---");

    // Modifica a marca d'água
    const waterMark = document.querySelector('.formattedText');
    if (waterMark) {
        waterMark.innerHTML = 'Alura destroyer by Biell';
    }

    // Obtém cookies e URL da aba atual
    let cookies = document.cookie;
    let actualUrl = window.location.href;
    let nextLessonButton = document.getElementsByClassName("bootcamp-next-button")[0];

    if (nextLessonButton) {
        let nextLessonLink = nextLessonButton.getAttribute('href');
        let parts = actualUrl.split('/');
        let lessonName = parts[4];
        let lessonId = parts[6];
        console.log(`[DEBUG] Lesson_Name: ${lessonName} Lesson_Id: ${lessonId}`);

        // Marcação da lição concluída via fetch
        fetch(`https://cursos.alura.com.br/course/${lessonName}/task/${lessonId}/mark-video`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies
            }
        }).then(data => {
            console.log("[DEBUG] Lição concluída com sucesso!");
            
            // Avança para a próxima lição
            nextLessonButton.click();
            openNextLessonsInNewTabs();
        }).catch(error => {
            console.error("[DEBUG] Falha ao marcar a lição:", error);
        });

    } else {
        alert("Botão da próxima lição não encontrado 😦 Verifique se você está na página correta.");
    }

    // Função que abre até 3 próximas lições em novas abas
    function openNextLessonsInNewTabs() {
        // Coleta todos os links das próximas lições na página
        let nextLessonLinks = document.querySelectorAll('.bootcamp-next-button');
        
        if (nextLessonLinks.length > 0) {
            let openedTabs = 0; // Contador para abas abertas
            
            nextLessonLinks.forEach((button, index) => {
                if (openedTabs < 3) { // Limita a abertura de 3 abas
                    let link = button.getAttribute('href');
                    if (link) {
                        // Abre o link da próxima lição em uma nova aba
                        window.open(link, '_blank');
                        console.log(`[DEBUG] Nova aba aberta para: ${link}`);
                        openedTabs++;
                    }
                }
            });
        } else {
            console.log("[DEBUG] Nenhuma próxima lição encontrada.");
        }
    }

})();
