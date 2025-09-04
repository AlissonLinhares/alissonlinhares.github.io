const videos = [
    {
        id: "__2N7SsV8l8?si=euRKoM5JOC3Ub6Tb",
        title: "Week 7: This is a movement mechanic prototype",
        notes: [
            "Due to tracking limitations and the need for the player to constantly face the screen, most Kinect-style games present content in a passive way. I’ve always thought this was lazy and boring. So, I’ve been experimenting with different ideas for navigating environments in more natural and less restrictive ways.",
            "I want players to be able to kick, jump, interact with objects using their hands, and perform basic real-life actions like walking, running, and dodging obstacles. To test this, I built a prototype using basic tank controls (similar to classic Resident Evil) to rotate the camera when the character passes a threshold relative to it. The movement and rotation speed are determined by the distance and velocity of the motion."
        ]
    },
    {
        id: "u0-PRksRT0E?si=1-ZCHc3AUa3s2zry",
        title: "Week 5-6: Basic World interaction",
        notes: [
            "I’m testing different game mechanics and creating tech demos to explore the system’s limitations. So far, I can interact with the environment, walk around, and capture movements and animations."
        ]
    },
    {
        id: "jlhFV1P1BTU?si=5dHGA0vidpx4IVP3",
        title: "Week 3-4: Multiprocessing, noise reduction, and 3D face scanning",
        notes: [
            "I made several improvements to the tracking system. Everything now runs in a separate process, including camera capture, the engine, network transfer, and the face, hands, and body processing pipelines. The performance improvement was substantial. I also implemented noise reduction filters to improve stability."
        ]
    },
    {
        id: "0yuF1WUrYlg?si=GdZ0n6fPYLCa6NdU",
        title: "Week 2: Face and eye tracking",
        notes: [
            "I have also added support for face and eye tracking. Overall, the performance is reasonable for live streaming. However, it still falls far behind proprietary solutions like Metahuman with ARKit / Live Link Face integration.",
            "It is possible to track several landmarks at a distance of 0.35–1.5 meters from the camera. However, when I add hand and body tracking, it becomes apparent that several frames are being skipped. I plan to profile the application to see if I can further improve thread and network performance.",
            "In parallel with the face recognition experiments, I have also written an adapter interface to auto-calibrate the body and control blendshapes inside Unity3D. That said, I’ll need something more robust to compensate for variations in human measurements."
        ]
    },
    {
        id: "Dq9WZb2T_DQ?si=FyTOeyZs8t3rZp6R",
        title: "Week 1: This is another view of my demo",
        notes: [
            "I am using a mobile phone to stream a 720p video to my server over Wi-Fi. Then, to simulate the latency of a VR headset, I stream the game camera to my TV, again over Wi-Fi.",
            "There’s still plenty of room for optimization. This was just a test of upper-bound performance. If, in the worst-case scenario, we can achieve low-latency interaction, I think it’s safe to say the results exceeded my expectations.",
            "With two more cameras, I believe I could build open-scale virtual reality experiences, create digital twins, design new game interactions, or even control industrial and military machinery remotely."
        ]
    },
    {
        id: "aqQ_7gqcaxA?si=ypotphs5lFrh4Oss",
        title: "Week 0: My 3D body tracking system",
        notes: [
            "So far, I’ve mapped the entire body, including fingers, joints, and eye gaze. I believe the performance is already good enough to support Kinect-like games and open-space VR applications. (I’m planning to create some wild stuff with it!)"
        ]
    }
];

const devPanel = document.getElementById("devlog");
const loadMoreBtn = document.getElementById("loadMore");
const POST_PER_PAGE = 4;

let currentIndex = 0;

function loadVideos() {
    const slice = videos.slice(currentIndex, currentIndex + POST_PER_PAGE);

    slice.forEach(video => {
        const post = document.createElement("section");

        const h2 = document.createElement("h2");
        h2.textContent = video.title;
        post.appendChild(h2);

        video.notes.forEach(note => {
            const p = document.createElement("p");
            p.textContent = note;
            post.appendChild(p);
        });

        const wrapper = document.createElement("div");
        wrapper.classList.add("video-wrapper");

        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${video.id}`;
        iframe.title = video.title;
        iframe.frameBorder = "0";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;

        wrapper.appendChild(iframe);
        post.appendChild(wrapper);

        devPanel.appendChild(post);
    });

    currentIndex += slice.length;

    if (currentIndex >= videos.length)
        loadMoreBtn.style.display = "none";
}

loadVideos();
loadMoreBtn.addEventListener("click", loadVideos);
