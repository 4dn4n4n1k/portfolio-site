import * as THREE from 'three';

export const initBinaryBackground = () => {
    // Dynamic Canvas Creation
    let canvas = document.querySelector('#bg-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'bg-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1'; // Behind everything
        document.body.appendChild(canvas);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Particle Configuration
    const particleCount = 1000; // Reduced for performance
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3); // For movement
    const types = new Float32Array(particleCount); // 0 or 1

    // Initial scatter
    for (let i = 0; i < particleCount; i++) {
        // Spread across a wide volume
        positions[i * 3] = (Math.random() - 0.5) * 40; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z

        // Random slow drift velocities
        velocities[i * 3] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

        types[i] = Math.random() > 0.5 ? 1 : 0;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('type', new THREE.BufferAttribute(types, 1)); // Store type for shader

    // Create Textures for 0 and 1
    const createCharTexture = (char) => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        // Base glow color handled here for simplicity
        ctx.font = 'bold 50px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(char, 32, 32);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    };

    const texture0 = createCharTexture('0');
    const texture1 = createCharTexture('1');

    // Geometry/Material Setup
    const geometry0 = new THREE.BufferGeometry();
    const geometry1 = new THREE.BufferGeometry();

    const pos0 = [], pos1 = [];
    const vel0 = [], vel1 = [];

    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 50;
        const z = (Math.random() - 0.5) * 30;
        const vx = (Math.random() - 0.5) * 0.01;
        const vy = (Math.random() - 0.5) * 0.01;
        const vz = (Math.random() - 0.5) * 0.01;

        if (Math.random() > 0.5) {
            pos0.push(x, y, z);
            vel0.push(vx, vy, vz);
        } else {
            pos1.push(x, y, z);
            vel1.push(vx, vy, vz);
        }
    }

    geometry0.setAttribute('position', new THREE.Float32BufferAttribute(pos0, 3));
    geometry1.setAttribute('position', new THREE.Float32BufferAttribute(pos1, 3));

    // Store velocities in userData for easy access in animation loop
    geometry0.userData = { velocities: vel0, originalPositions: [...pos0] };
    geometry1.userData = { velocities: vel1, originalPositions: [...pos1] };

    const materialBase = {
        size: 0.8,
        transparent: true,
        opacity: 0.4, // Reduced opacity for subtlety
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: new THREE.Color('#22c55e') // Matrix Green
    };

    const material0 = new THREE.PointsMaterial({ ...materialBase, map: texture0 });
    const material1 = new THREE.PointsMaterial({ ...materialBase, map: texture1 });

    const cloud0 = new THREE.Points(geometry0, material0);
    const cloud1 = new THREE.Points(geometry1, material1);

    scene.add(cloud0);
    scene.add(cloud1);

    camera.position.z = 20;

    // Interaction Support
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05; // Scale for world space roughly
        mouseY = -(event.clientY - windowHalfY) * 0.05;
    });

    // Animate
    const clock = new THREE.Clock();

    const animate = () => {
        requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        targetX = mouseX * 0.5; // Damping target
        targetY = mouseY * 0.5;

        // Update Cloud 0
        updateParticles(cloud0, targetX, targetY, time);
        // Update Cloud 1
        updateParticles(cloud1, targetX, targetY, time + 100);

        // Gentle camera float
        camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.1 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    const updateParticles = (cloud, tx, ty, t) => {
        const positions = cloud.geometry.attributes.position.array;
        const velocities = cloud.geometry.userData.velocities;

        for (let i = 0; i < positions.length; i += 3) {
            // Basic Drift
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];

            // Interaction: Gentle Flow/Repulsion
            // Calculate distance to mouse projected in world mostly on xy plane at Z=0 roughly
            const dx = tx - positions[i];
            const dy = ty - positions[i + 1];

            const dist = Math.sqrt(dx * dx + dy * dy);

            // "Flow" Effect: Gentle push away when close
            if (dist < 10) {
                // Determine push strength
                const force = (10 - dist) * 0.02;

                // Push away
                positions[i] -= (dx / dist) * force;
                positions[i + 1] -= (dy / dist) * force;

                // NO Z-turbulence here to prevent shaking
            } else {
                // Normal rain drift
                positions[i + 1] -= 0.02;
            }

            // Reset bounds (infinite wrap)
            if (positions[i + 1] < -25) positions[i + 1] = 25;
            if (positions[i + 1] > 25) positions[i + 1] = -25;
            if (positions[i] < -35) positions[i] = 35;
            if (positions[i] > 35) positions[i] = -35;
        }
        cloud.geometry.attributes.position.needsUpdate = true;
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};
