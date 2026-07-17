/* script.js */

// 페이지 로드 완료 시 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initAudioAccessibility();
});

/**
 * 네비게이션바 메뉴 클릭 시 특정 섹션으로 부드러운 스크롤 이동
 */
function initSmoothScroll() {
    const navLink = document.querySelector('nav a');
    
    if (navLink) {
        navLink.addEventListener('click', (event) => {
            event.preventDefault();
            
            const targetId = navLink.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

/**
 * 오디오 상호작용성 제어
 * 플레이어가 여러 개일 때, 하나를 재생하면 다른 플레이어들은 자동으로 일시정지 되도록 처리
 */
function initAudioAccessibility() {
    const audios = document.querySelectorAll('audio');
    
    audios.forEach(audio => {
        audio.addEventListener('play', () => {
            audios.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                }
            });
        });
    });
}

/**
 * 만화(Comic) 슬라이드쇼 관리 데이터 및 기능
 */
let comicSubIndex = 0;

// 만화 컷별 설명 문구 배열
const comicCaptions = [
    "1화: 오늘도 평화로운 하루를 보내던 곰돌이, 갑작스러운 번개와 함께 파괴된 마을을 보며 강해지기로 결심합니다.",
    "2화: 폭포 아래서 마음을 비우고 거대한 바위를 번쩍 들며 피나는 수련을 하던 중, 하늘의 별이 서서히 빛을 내며 부르기 시작합니다.",
    "3화: 신비로운 빛과 빨간 망토를 부여받으며 마침내 '슈퍼 베어'로 각성 성공! 위험에 처한 친구들을 지키며 행복한 미소로 여정을 마칩니다."
];

/**
 * 만화 슬라이드 변경 함수
 * @param {number} n - 이동할 방향 (1: 다음, -1: 이전)
 */
function moveComicSlide(n) {
    const slides = document.querySelectorAll('.comic-viewer .comic-slide');
    const captionElement = document.querySelector('.comic-caption');
    
    if (!slides.length) return;

    // 현재 활성화 상태 해제
    slides[comicSubIndex].classList.remove('active');
    
    // 인덱스 계산 및 순환 예외 처리
    comicSubIndex += n;
    if (comicSubIndex >= slides.length) {
        comicSubIndex = 0;
    }
    if (comicSubIndex < 0) {
        comicSubIndex = slides.length - 1;
    }
    
    // 새 슬라이드 및 캡션 활성화
    slides[comicSubIndex].classList.add('active');
    if (captionElement && comicCaptions[comicSubIndex]) {
        captionElement.innerText = comicCaptions[comicSubIndex];
    }
}