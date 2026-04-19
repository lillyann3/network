const audioNet = document.querySelector('.audio-net');
const isMobile = window.innerWidth < 600;
const audioEntries = [
    {
        title: "11:26:57 PST 2026-02-05",
        src: "voicemails/voicemail-1.mp3"
    },
    {
        title: "06:47:59 PST 2026-02-06",
        src: "voicemails/voicemail-2.mp3"
    },
    {
        title: "10:16:13 PST 2026-02-07",
        src: "voicemails/Voicemail-3.mp3"
    },
    {
        title: "20:13:42 PST 2026-02-07",
        src: "voicemails/Voicemail-4.mp3"
    },
    {
        title: "23:48:03 PST 2026-02-06",
        src: "voicemails/Voicemail-5.mp3"
    },
    {
        title: "01:23:08 PST 2026-02-07",
        src: "voicemails/Voicemail-6.mp3"
    },
    {
        title: "11:47:24 PST 2026-02-14",
        src: "voicemails/Voicemail-7.mp3"
    },
    {
        title: "16:12:30 PST 2026-02-15",
        src: "voicemails/Voicemail-8.mp3"
    },
    {
        title: "04:24:47 PST 2026-02-18",
        src: "voicemails/Voicemail-9.mp3"
    },
    {
        title: "23:32:08 PST 2026-02-21",
        src: "voicemails/Voicemail-10.mp3"
    },
    {
        title: "23:35:26 PST 2026-02-21",
        src: "voicemails/Voicemail-11.mp3"
    },
    {
        title: "15:09:15 PST 2026-02-26",
        src: "voicemails/Voicemail-12.mp3"
    },
        {
        title: "11:11:03 PDT 2026-04-18",
        src: "voicemails/Voicemail-13.mp3"
    },
    {
        title: "12:01:28 PDT 2026-04-18",
        src: "voicemails/Voicemail-14.mp3"
    },
    {
        title: "17:39:47 PDT 2026-04-18",
        src: "voicemails/Voicemail-15.mp3"
    },

];

let currentAudio = null;
let currentKnot = null;

const placedPositions = [];
const MIN_DISTANCE = isMobile ? 26 : 18;

function isTooClose(x, y) {
    return placedPositions.some(pos => {
        const dx = pos.x - x;
        const dy = pos.y - y;
        return Math.sqrt(dx * dx + dy * dy) < MIN_DISTANCE;
    });
}

function getRandomPosition() {
    let x, y, tries = 0;

    const scrollHeight =
        Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            window.innerHeight
        );

    do {
        x = Math.random() * 90 + 5; // 5–95% width
        y = Math.random() * (scrollHeight - 200) + 100; // spread vertically
        tries++;
    } while (isTooClose(x, y) && tries < 50);

    placedPositions.push({ x, y });
    return { x, y };
}

audioEntries.forEach(entry => {
    const knot = document.createElement('div');
    knot.className = 'net-knot';

    const button = document.createElement('button');
    button.className = 'knot-button';
    button.textContent = '🪢';

    const label = document.createElement('div');
    label.className = 'audio-label';
    label.textContent = entry.title;

    const audio = new Audio(entry.src);
    audio.preload = 'metadata';

    const { x, y } = getRandomPosition();
    knot.style.left = `${x}%`;
    knot.style.top = `${y}px`;

    button.addEventListener('pointerdown', () => {
        if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentKnot?.classList.remove('active');
        }

        if (audio.paused) {
            audio.play();
            knot.classList.add('active');
            currentAudio = audio;
            currentKnot = knot;
            document.body.classList.add('audio-playing');
        } else {
            audio.pause();
            audio.currentTime = 0;
            knot.classList.remove('active');
            currentAudio = null;
            currentKnot = null;
            document.body.classList.remove('audio-playing');
        }
    });

    audio.addEventListener('ended', () => {
        knot.classList.remove('active');
        currentAudio = null;
        currentKnot = null;
        document.body.classList.remove('audio-playing');
    });

    knot.appendChild(button);
    knot.appendChild(label);
    audioNet.appendChild(knot);
});

