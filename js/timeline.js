const svg = document.getElementById("branch-chart");
const tooltip = document.getElementById("tooltip");
const container = document.getElementById("chart-container");
const branches = [];

function addPoint(start, end, desc, line_color, startYear, endYear, level = 0) {
    const baseY = 30;
    const verticalOffset = 10;
    const curveSpread = 0.01;

    const scale = end - start;
    const minX = (startYear - start) / scale;
    const maxX = (endYear - start) / scale;
    const minY = baseY;
    const maxY = baseY - verticalOffset * level;

    const final_path = [
        [minX, minY],
        [minX + curveSpread, maxY],
        [maxX - curveSpread, maxY],
        [maxX, minY],
    ];

    if (startYear != Math.round(startYear))
        startYear = ""

    branches.push({ year: startYear, description: desc, color: line_color, path: final_path });
}

function createSVGElement(type, attributes) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", type);
    for (const [key, value] of Object.entries(attributes)) {
        el.setAttribute(key, value);
    }
    return el;
}

function renderChart() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const { width } = svg.getBoundingClientRect();
    const baselineY = 100;
    const labelY = 200;

    // Add legend above the chart
    const legendY = 20; // Position above the chart
    const legendItems = [
        { color: "#964B00", text: "Education" },
        { color: "#404040", text: "Academic Work" },
        { color: "#808080", text: "Industry work" }
    ];

    legendItems.forEach((item, index) => {
        const legendX = width * 0.1 + index * (width * 0.25);
        
        // Add colored circle
        const circle = createSVGElement("circle", {
            cx: legendX,
            cy: legendY,
            r: 5,
            fill: item.color
        });
        svg.appendChild(circle);

        // Add text
        const text = createSVGElement("text", {
            x: legendX + 10,
            y: legendY + 5,
            "font-size": "12px",
            fill: "currentColor"
        });
        text.textContent = item.text;
        svg.appendChild(text);
    });

    branches.forEach(branch => {
        const pathData = branch.path.map(([x, y], i) => {
            return `${i === 0 ? "M" : "L"} ${x * width} ${baselineY + y}`;
        }).join(" ");

        const drawPath = createSVGElement("path", {
            d: pathData,
            stroke: branch.color,
            "stroke-width": 3,
            fill: "none",
            "stroke-linecap": "round"
        });
        drawPath.style.cursor = "pointer";

        const [[startX, startY], , , [endX, endY]] = branch.path;

        const startDot = createSVGElement("circle", {
            cx: startX * width,
            cy: baselineY + startY,
            r: 5,
            fill: branch.color
        });

        const endDot = createSVGElement("circle", {
            cx: endX * width,
            cy: baselineY + endY,
            r: 5,
            fill: branch.color
        });

        const handleMouseEnter = (e) => {
            tooltip.innerHTML = branch.description;
            const containerRect = container.getBoundingClientRect();
            tooltip.style.left = `${e.clientX - containerRect.left + 10}px`;
            tooltip.style.top = `${e.clientY - containerRect.top - 20}px`;
            tooltip.style.display = "block";

            drawPath.setAttribute("stroke", "#ffff00");
            startDot.setAttribute("fill", "#ffff00");
            endDot.setAttribute("fill", "#ffff00");
        };

        const handleMouseLeave = () => {
            tooltip.style.display = "none";
            drawPath.setAttribute("stroke", branch.color);
            startDot.setAttribute("fill", branch.color);
            endDot.setAttribute("fill", branch.color);
        };

        const interactivePath = createSVGElement("path", {
            d: pathData,
            stroke: "transparent",
            "stroke-width": 15,
            fill: "none"
        });
        interactivePath.style.cursor = "pointer";
        interactivePath.addEventListener("mouseenter", handleMouseEnter);
        interactivePath.addEventListener("mouseleave", handleMouseLeave);
        interactivePath.setAttribute("pointer-events", "stroke");

        [startDot, endDot].forEach(dot => {
            dot.addEventListener("mouseenter", handleMouseEnter);
            dot.addEventListener("mouseleave", handleMouseLeave);
        });

        svg.appendChild(drawPath);
        svg.appendChild(interactivePath);
        svg.appendChild(startDot);
        svg.appendChild(endDot);

        const label = createSVGElement("text", {
            x: startX * width,
            y: labelY,
            transform: `rotate(-90 ${startX * width} ${labelY})`,
        });
        label.textContent = branch.year;
        svg.appendChild(label);
    });
}

// Add your data points
addPoint(2005, 2026, "My career", "#000000", 2005, 2026);
addPoint(2005, 2026, "LDG, Sergipe, Brazil<br>Game Programing Research (Part Time)", "#404040", 2008.5, 2009, 4);
addPoint(2005, 2026, "CEFET, Sergipe, Brazil<br>Technical education, electronics", "#964B00", 2007, 2009, -2);
addPoint(2005, 2026, "Lumen Games, Sergipe, Brazil<br>Game Developer", "#808080", 2009, 2011, -2);
addPoint(2005, 2026, "University Tirandentes (UNIT), Sergipe, Brazil<br>Bachelor's degree, Computer Science", "#964B00", 2007, 2011, 2);
addPoint(2005, 2026, "Universidade Federal de Sergipe (UFS)<br>Sergipe, Brazil<br>Undergraduate Professor (Full Time)", "#404040", 2011, 2013, 2);
addPoint(2005, 2026, "Unicamp, São Paulo, Brazil<br>Master's degree, Computer Science", "#964B00", 2013, 2015, 2);
addPoint(2005, 2026, "IBM, São Paulo, Brazil<br>Linux Technology Center<br>Linux Software Engineer (Hybrid)", "#808080", 2015, 2017, 2);
addPoint(2005, 2026, "Unicamp, São Paulo, Brazil<br>PhD, Computer Science<br>(Paused) All credit requirements completed", "#964B00", 2017, 2020, 2);
addPoint(2005, 2026, "IdeaIP, São Paulo, Brazil<br>Computer Architecture Research (Part Time)", "#404040", 2019, 2020, 4);
addPoint(2005, 2026, "Pontifícia Universidade Católica (PUC)<br>São Paulo, Brazil<br>Undergraduate Professor (Full Time)", "#404040", 2021, 2022, 2);
addPoint(2005, 2026, "AXNTEK, Sergipe, Brazil<br>Lead Game Programmer", "#808080", 2020, 2022, 4);
addPoint(2005, 2026, "DELL Technologies, São Paulo, Brazil<br>Senior Engineer", "#808080", 2022, 2025, 2);
addPoint(2005, 2026, "Covid19, 2020 Lockdown", "#FF0000", 2019, 2022, -6);
addPoint(2005, 2026, "Today", "#000000", 2025, 2026, 0);

renderChart();
window.addEventListener("resize", renderChart);
