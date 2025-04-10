
const svg = document.getElementById("branch-chart");
const tooltip = document.getElementById("tooltip");
const container = document.getElementById("chart-container");

branches = [];

function add_point(start, end, description, link, color, start_year, end_year, level=0) {
    const min_y = 50
    const max_y = min_y - 10*level;
    const dist = 0.01;

    scale = end - start;
    min_x = (start_year - start) / scale;
    max_x = (end_year - start) / scale;
    path = [[min_x, min_y], [min_x + dist, max_y],  [max_x - dist, max_y], [max_x, min_y]];

    branches.push({ year: start_year, description: description, link: link, color: color, path: path });
}

function renderChart() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const svgRect = svg.getBoundingClientRect();
    const width = svgRect.width;
    const height = 250;

    branches.forEach((branch, index) => {
        const d = branch.path.map((point, i) => {
            const x = point[0] * width;
            const y = 100 + point[1];
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(" ");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        path.setAttribute("stroke", branch.color);
        path.setAttribute("stroke-width", "3");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        path.style.cursor = "pointer";

        const [startX, startY] = branch.path[0];
        const [endX, endY] = branch.path[branch.path.length - 1];

        const startDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        startDot.setAttribute("cx", startX * width);
        startDot.setAttribute("cy", 100 + startY);
        startDot.setAttribute("r", 5);
        startDot.setAttribute("fill", branch.color);

        const endDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        endDot.setAttribute("cx", endX * width);
        endDot.setAttribute("cy", 100 + endY);
        endDot.setAttribute("r", 5);
        endDot.setAttribute("fill", branch.color);

        const handleMouseEnter = (e) => {
            tooltip.textContent = branch.description;
            const containerRect = container.getBoundingClientRect();
            tooltip.style.left = `${e.clientX - containerRect.left}px`;
            tooltip.style.top = `${e.clientY - containerRect.top}px`;
            tooltip.style.display = "block";
            path.setAttribute("stroke", "#ffff00");
            startDot.setAttribute("fill", "#ffff00");
            endDot.setAttribute("fill", "#ffff00");
        };

        const handleMouseLeave = () => {
            tooltip.style.display = "none";
            path.setAttribute("stroke", branch.color);
            startDot.setAttribute("fill", branch.color);
            endDot.setAttribute("fill", branch.color);
        };

        const hitPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        hitPath.setAttribute("d", d);
        hitPath.setAttribute("stroke", "transparent");
        hitPath.setAttribute("stroke-width", "15");
        hitPath.setAttribute("fill", "none");
        hitPath.style.cursor = "pointer";
        hitPath.addEventListener("mouseenter", handleMouseEnter);
        hitPath.addEventListener("mouseleave", handleMouseLeave);
        hitPath.addEventListener("click", () => window.open(branch.link, "_blank"));

        [startDot, endDot].forEach(el => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
            el.addEventListener("click", () => window.open(branch.link, "_blank"));
        });

        svg.appendChild(path);
        svg.appendChild(hitPath);
        svg.appendChild(startDot);
        svg.appendChild(endDot);

        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", startX * width);
        label.setAttribute("y", 200);
        label.setAttribute("transform", `rotate(-90 ${startX * width} 200)`);
        label.textContent = branch.year;
        svg.appendChild(label);
    });
}


add_point(2005, 2026, "My career", "https://example.com/2020", "#000000", 2005, 2026);
add_point(2005, 2026, "CEFET/SE, Technical education, electronics", "https://example.com/2020", "#964B00", 2007, 2009, -2);
add_point(2005, 2026, "Lumen Games/SE", "https://example.com/2020", "#404040", 2009, 2011, -2);
add_point(2005, 2026, "Unit/SE, Bachelor's degree, Computer Science", "https://example.com/2020", "#964B00", 2007, 2011, 2);
add_point(2005, 2026, "UFS/SE, Undergraduate Professor (Full Time)", "https://example.com/2020", "#404040", 2011, 2013, 2);
add_point(2005, 2026, "Unicamp/SP, Master's degree, Computer Science", "https://example.com/2020", "#964B00", 2013, 2015, 2);
add_point(2005, 2026, "IBM/SP, Linux Technology Center<br>Linux Software Engineer (Hybrid)", "https://example.com/2020", "#808080", 2015, 2017, 2);
add_point(2005, 2026, "Unicmap/SP, Phd, Computer Science", "https://example.com/2020", "#964B00", 2017, 2020, 2);
add_point(2005, 2026, "IdeaIP/SP, Computer Architecture Research (Part Time)", "https://example.com/2020", "#808080", 2019, 2020, 4);
add_point(2005, 2026, "PUC/SP, Undergraduate Professor - Full Time", "https://example.com/2020", "#404040", 2021, 2022, 2);
add_point(2005, 2026, "AXNTEK/SE", "https://example.com/2020", "#808080", 2020, 2022, 4);
add_point(2005, 2026, "DELL Technologies/SP, Software Engineer", "https://example.com/2020", "#808080", 2022, 2025, 2);
add_point(2005, 2026, "Covid, Lockdown - searching for new purpose in life! :(", "https://example.com/2020", "#FF0000", 2019, 2022, -6);
add_point(2005, 2026, "Today", "https://example.com/2020", "#000000", 2025, 2026, 0);

renderChart();
window.addEventListener("resize", renderChart);
