document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clear');
    const chalkButtons = document.querySelectorAll('.chalk-btn');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = Math.min(window.innerWidth - 40, 1200);
        canvas.height = Math.min(window.innerHeight - 150, 800);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Drawing variables
    let isDrawing = false;
    let currentColor = '#ffffff';
    let lastX = 0;
    let lastY = 0;

    // Chalk effect settings
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.85;

    // Drawing functions
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = getCoordinates(e);
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function draw(e) {
        if (!isDrawing) return;

        const [x, y] = getCoordinates(e);

        // Chalk effect
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2;
        
        // Main line
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Chalk texture effect
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(lastX + (Math.random() - 0.5) * 2, 
                      lastY + (Math.random() - 0.5) * 2);
            ctx.lineTo(x + (Math.random() - 0.5) * 2, 
                      y + (Math.random() - 0.5) * 2);
            ctx.stroke();
        }

        [lastX, lastY] = [x, y];
    }

    function getCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.type.includes('touch') 
            ? e.touches[0].clientX - rect.left 
            : e.clientX - rect.left;
        const y = e.type.includes('touch') 
            ? e.touches[0].clientY - rect.top 
            : e.clientY - rect.top;
        return [x, y];
    }

    // Event listeners for mouse
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Event listeners for touch devices
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e);
    });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e);
    });
    canvas.addEventListener('touchend', stopDrawing);

    // Clear canvas
    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Color selection
    chalkButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            chalkButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Set current color
            currentColor = btn.dataset.color;
        });
    });
});