javascript:(function() {
    'use strict';

    console.log("--- ALURA DESTROYER V2 BY Biell ---");

    // Mantém a modificação da marca d'água
    const waterMark = document.querySelector('.formattedText');
    if (waterMark) {
        waterMark.innerHTML = 'Alura destroyer V2 by Biell';
    }

    // Obtém cookies e URL atual
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

        // Requisição para marcar a lição como concluída
        fetch(`https://cursos.alura.com.br/course/${lessonName}/task/${lessonId}/mark-video`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies
            }
        }).then(data => {
            console.log("[DEBUG] Lesson Done!");
            
            // Clica imediatamente no botão da próxima lição
            nextLessonButton.click();
        }).catch(error => {
            console.error("[DEBUG] Falha ao marcar a lição:", error);
        });

    } else {
        alert("Botão da próxima lição não encontrado 😦 Verifique se você está na página correta.");
    }
})();