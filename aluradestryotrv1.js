javascript:(function() {
    'use strict';

    console.log("--- ALURA DESTROYER BY Biell ---");

    const waterMark = document.querySelector('.formattedText');
    if (waterMark) {
        waterMark.innerHTML = 'Alura destroyer by Biell';
    }

    let cookies = document.cookie;
    let actualUrl = window.location.href;
    let nextLessonButton = document.getElementsByClassName("bootcamp-next-button")[0];

    if (nextLessonButton) {
        let nextLessonLink = nextLessonButton.getAttribute('href');
        let parts = actualUrl.split('/');
        let lessonName = parts[4];
        let lessonId = parts[6];
        console.log(`[DEBUG] Lesson_Name: ${lessonName} Lesson_Id: ${lessonId}`);

        fetch(`https://cursos.alura.com.br/course/${lessonName}/task/${lessonId}/mark-video`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies
            }
        }).then(data => {
            console.log("[DEBUG] Lesson Done!");
            nextLessonButton.click();
        });

    } else {
        alert("Next Lesson Button not found 😦 Are you sure you are on the correct page?");
    }
})();
