/* 
   ==========================================================================
   DOM READY & CORE INITIALIZER
   ========================================================================== 
*/

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDynamicContent();
  initHeroHover();
  initTerminal();
  initObsidianGraph();
  initAsciiHandshake();
  initProjectsFilter();
  setupSmoothScrolling();
  initHeroParticles();
});

/* 
   ==========================================================================
   1. DUAL THEME TOGGLE (LIGHT / DARK)
   ========================================================================== 
*/

function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Set default theme attribute
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Regenerate particles with new theme colors after styles apply
    if (typeof createParticles === 'function') {
      setTimeout(createParticles, 50);
    }
  });
}

/* 
   ==========================================================================
   2. CONTENT POPULATION (FROM data.js)
   ========================================================================== 
*/

function initDynamicContent() {
  // Populate About Section info
  const aboutBio = document.getElementById('about-bio');
  if (aboutBio) aboutBio.textContent = personalInfo.bio;
  
  const metaName = document.getElementById('meta-name');
  if (metaName) metaName.textContent = personalInfo.name;
  
  const metaDob = document.getElementById('meta-dob');
  if (metaDob) metaDob.textContent = personalInfo.dob;
  
  const metaEmp = document.getElementById('meta-emp');
  if (metaEmp) metaEmp.textContent = personalInfo.company;
  
  const metaUptime = document.getElementById('meta-uptime');
  if (metaUptime) metaUptime.textContent = personalInfo.uptime;
  
  // Populate skills tags
  const skillsTags = document.getElementById('skills-tags');
  if (skillsTags) {
    const allSkills = Object.values(personalInfo.skills).flat();
    skillsTags.innerHTML = allSkills.map(skill => 
      `<span class="skill-tag">${skill}</span>`
    ).join('');
  }
  
  // Populate Connect items
  const emailText = document.getElementById('email-text');
  if (emailText) emailText.textContent = personalInfo.email;
  const locationText = document.getElementById('location-text');
  if (locationText) locationText.textContent = personalInfo.location;

  // Render Contributions Timeline (My Work)
  const timelineTech = document.getElementById('timeline-tech');
  const timelineCreative = document.getElementById('timeline-creative');

  if (timelineTech) {
    timelineTech.innerHTML = techProjects.map((project, index) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <div class="timeline-title-group">
              <h4>${project.title}</h4>
              <span class="timeline-role">${project.role}</span>
            </div>
            <div class="timeline-tech-tags">
              ${project.tech.map(t => `<span class="timeline-tech-tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="timeline-body">
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="card-link">Explore Code &rarr;</a>
          </div>
          <div class="timeline-image-bottom">
            <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" onload="this.style.display='block'; this.nextElementSibling.style.display='none';" style="display:none;" />
            <div class="fallback-container timeline-img-fallback" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
              <div class="slide-image-glow"></div>
              <div class="card-img-fallback">${project.title} Visual</div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (timelineCreative) {
    timelineCreative.innerHTML = creativeProjects.map((project, index) => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <div class="timeline-title-group">
              <h4>${project.title}</h4>
              <span class="timeline-role">${project.role}</span>
            </div>
            <div class="timeline-tech-tags">
              ${project.tech.map(t => `<span class="timeline-tech-tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="timeline-body">
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" class="card-link">Explore Project &rarr;</a>
          </div>
          <div class="timeline-image-bottom">
            <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" onload="this.style.display='block'; this.nextElementSibling.style.display='none';" style="display:none;" />
            <div class="fallback-container timeline-img-fallback" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
              <div class="slide-image-glow"></div>
              <div class="card-img-fallback">${project.title} Visual</div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

/* 
   ==========================================================================
   3. HERO PANEL SWITCHER (LEFT HOVER -> RIGHT VISUALS)
   ========================================================================== 
*/

let activeVisualId = null;

function initHeroHover() {
  const titleLinks = document.querySelectorAll('.hero-title-link');
  const visualCards = document.querySelectorAll('.visual-card');
  const defaultVisual = document.getElementById('visual-default');
  
  titleLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const visualId = link.getAttribute('data-visual');
      
      // Hide default visual
      if (defaultVisual) defaultVisual.style.display = 'none';
      
      // Hide all visual cards
      visualCards.forEach(card => card.classList.remove('active'));
      
      // Show targeted visual card
      const targetCard = document.getElementById(visualId);
      if (targetCard) {
        targetCard.classList.add('active');
        activeVisualId = visualId;
        
        // Trigger specific animations on activation
        triggerVisualAnimation(visualId);
      }
    });
    
    link.addEventListener('mouseleave', () => {
      // Keep last active or reset to default if moved off container completely.
      // Handled at container level below for better user experience.
    });
  });
  
  // Clear visual panels if mouse leaves the titles container completely
  const leftPanel = document.querySelector('.hero-left');
  leftPanel.addEventListener('mouseleave', () => {
    visualCards.forEach(card => card.classList.remove('active'));
    if (defaultVisual) defaultVisual.style.display = 'flex';
    activeVisualId = null;
    
    // Stop animations
    stopAllVisualAnimations();
  });
}

function triggerVisualAnimation(id) {
  if (id === 'visual-me') {
    startTerminalTyping();
  } else if (id === 'visual-contributions') {
    startObsidianGraph();
  } else if (id === 'visual-connect') {
    startAsciiHandshake();
  }
}

function stopAllVisualAnimations() {
  stopTerminalTyping();
  stopObsidianGraph();
  stopAsciiHandshake();
}

/* 
   ==========================================================================
   4. VISUALIZER 1: TERMINAL / NEOFETCH TYPING ENGINE
   ========================================================================== 
*/

let terminalIntervals = [];
let isTerminalTyping = false;

const asciiLogo = 
`    __  ___
   /  |/  /___
  / /|_/ / _ \\
 / /  / /  __/
/_/  /_/\\___/
`;

function initTerminal() {
  // Terminal visual block setup, static structure elements are drawn in HTML.
}

function startTerminalTyping() {
  if (isTerminalTyping) return;
  isTerminalTyping = true;
  
  const promptContainer = document.getElementById('term-body-prompt');
  const asciiContainer = document.getElementById('term-body-logo');
  const statsContainer = document.getElementById('term-body-stats');
  
  if (!promptContainer || !asciiContainer || !statsContainer) return;
  
  // Clear contents
  promptContainer.innerHTML = '';
  asciiContainer.textContent = '';
  statsContainer.textContent = '';
  
  // Step 1: Type the prompt command
  const commandText = " guest@himan:~$ neofetch";
  let charIdx = 0;
  
  function typeCommand() {
    if (charIdx < commandText.length) {
      promptContainer.textContent += commandText.charAt(charIdx);
      charIdx++;
      const timeout = setTimeout(typeCommand, 35);
      terminalIntervals.push(timeout);
    } else {
      // Finished typing command. Wait brief delay, then dump specs
      const timeout = setTimeout(showNeofetchContent, 200);
      terminalIntervals.push(timeout);
    }
  }
  
  typeCommand();
}

function showNeofetchContent() {
  const asciiContainer = document.getElementById('term-body-logo');
  const statsContainer = document.getElementById('term-body-stats');
  
  if (!asciiContainer || !statsContainer) return;
  
  // Display ASCII logo immediately
  asciiContainer.textContent = asciiLogo;
  
  // System info entries
  const specs = [
    `OS: Debian OS v13.5.0`,
    `Host: Himan-Portfolio-x86_64`,
    `Kernel: WebBrowser 1.0.69-stable`,
    `Uptime: ${personalInfo.uptime}`,
    `Shell: bash 5.1`,
    `Resolution: Responsive CSS`,
    `Role: ${personalInfo.role}`,
    `Employment: ${personalInfo.company}`,
    `DOB: ${personalInfo.dob}`,
    `Location: ${personalInfo.location}`,
    `\nAchievements:`,
    `---------------`
  ];
  
  // Append all achievements from data.js dynamically
  if (personalInfo.achievements && personalInfo.achievements.length > 0) {
    personalInfo.achievements.forEach(ach => {
      specs.push(`* ${ach}`);
    });
  }
  
  // Append categorized skills under a single heading
  specs.push(`\nSkills:`);
  specs.push(`---------------`);
  if (personalInfo.skills) {
    if (personalInfo.skills.technical && personalInfo.skills.technical.length > 0) {
      specs.push(`Technical: ${personalInfo.skills.technical.join(', ')}`);
    }
    if (personalInfo.skills.security && personalInfo.skills.security.length > 0) {
      specs.push(`Cybersecurity: ${personalInfo.skills.security.join(', ')}`);
    }
    if (personalInfo.skills.creative && personalInfo.skills.creative.length > 0) {
      specs.push(`Creative: ${personalInfo.skills.creative.join(', ')}`);
    }
  }
  
  let lineIdx = 0;
  
  function typeSpecsLine() {
    if (lineIdx < specs.length) {
      statsContainer.textContent += specs[lineIdx] + '\n';
      lineIdx++;
      const timeout = setTimeout(typeSpecsLine, 60);
      terminalIntervals.push(timeout);
    }
  }
  
  typeSpecsLine();
}

function stopTerminalTyping() {
  terminalIntervals.forEach(clearTimeout);
  terminalIntervals = [];
  isTerminalTyping = false;
}

/* 
   ==========================================================================
   5. VISUALIZER 2: OBSIDIAN GRAPH MAP CANVAS ENGINE
   ========================================================================== 
*/

let graphCanvas = null;
let graphCtx = null;
let graphAnimationId = null;
let graphNodes = [];
let cursorIndex = 0;
let cursorX = 0;
let cursorY = 0;
let lastTimeNodeReached = 0;
let graphRotationAngle = 0; // Tracks slow, continuous celestial rotation
let isNodeReached = false; // Tracks if cursor is locked on node
const CURSOR_SPEED = 0.05; // Lerp speed (0.01 to 0.1)

function initObsidianGraph() {
  graphCanvas = document.getElementById('obsidian-canvas');
  if (!graphCanvas) return;
  
  graphCtx = graphCanvas.getContext('2d');
  
  // Resize handler
  window.addEventListener('resize', resizeGraphCanvas);
  resizeGraphCanvas();
}

function resizeGraphCanvas() {
  if (!graphCanvas) return;
  const parent = graphCanvas.parentElement;
  graphCanvas.width = parent.clientWidth;
  graphCanvas.height = parent.clientHeight;
  generateNodes();
}

function generateNodes() {
  if (!graphCanvas) return;
  
  graphNodes = [];
  const w = graphCanvas.width;
  const h = graphCanvas.height;
  const allProjects = [...techProjects, ...creativeProjects];
  const nodeCount = allProjects.length;
  
  for (let i = 0; i < nodeCount; i++) {
    const project = allProjects[i];
    const isCreative = creativeProjects.includes(project);
    
    // Distribute angles in a circle
    const baseAngle = (i / nodeCount) * Math.PI * 2;
    
    graphNodes.push({
      index: i,
      baseAngle: baseAngle,
      driftAngle: Math.random() * Math.PI * 2,
      driftSpeed: 0.008 + Math.random() * 0.008, // Slow individual drift frequency
      driftRange: 8 + Math.random() * 8, // Subtle floating offset radius
      r: 6,
      x: 0, // Assigned dynamically in updateNodeCoordinates()
      y: 0,
      projectTitle: project.title,
      projectDesc: project.description,
      projectRole: project.role,
      type: isCreative ? 'Creative' : 'Technical',
      color: isCreative ? '#8b5cf6' : '#10b981'
    });
  }
}

// Compute new positions based on static center coordinates and drift offsets
function updateNodeCoordinates() {
  if (!graphCanvas) return;
  const w = graphCanvas.width;
  const h = graphCanvas.height;
  
  graphNodes.forEach(node => {
    // 1. Calculate base static coordinates (no global rotation)
    const radius = Math.min(w, h) * 0.25;
    const baseX = w / 2 + Math.cos(node.baseAngle) * radius;
    const baseY = h / 2 + Math.sin(node.baseAngle) * radius;
    
    // 2. Add subtle individual floating drift
    node.driftAngle += node.driftSpeed;
    node.x = baseX + Math.cos(node.driftAngle) * node.driftRange;
    node.y = baseY + Math.sin(node.driftAngle) * node.driftRange;
  });
}

function startObsidianGraph() {
  if (graphAnimationId) return;
  
  graphRotationAngle = 0; // Reset rotation
  resizeGraphCanvas();
  
  // Calculate initial coordinates immediately for tracking cursor starting point
  updateNodeCoordinates();
  
  cursorIndex = 0;
  isNodeReached = false;
  
  if (graphNodes.length > 0) {
    cursorX = graphNodes[0].x;
    cursorY = graphNodes[0].y;
    isNodeReached = true; // Lock onto the first node immediately
    updateGraphTooltip(graphNodes[0]); // Update details for the first node immediately
  }
  
  lastTimeNodeReached = Date.now();
  animateGraph();
}

function animateGraph() {
  if (!graphCtx || !graphCanvas) return;
  
  const w = graphCanvas.width;
  const h = graphCanvas.height;
  
  graphCtx.clearRect(0, 0, w, h);
  
  // No global rotation
  
  // Calculate new coordinates for all elements
  updateNodeCoordinates();
  
  // Theme check for line colors
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const lineStroke = isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)';
  
  // 1. Draw web of background connections (Obsidian style)
  graphCtx.beginPath();
  graphCtx.strokeStyle = lineStroke;
  graphCtx.lineWidth = 1;
  for (let i = 0; i < graphNodes.length; i++) {
    for (let j = i + 1; j < graphNodes.length; j++) {
      graphCtx.moveTo(graphNodes[i].x, graphNodes[i].y);
      graphCtx.lineTo(graphNodes[j].x, graphNodes[j].y);
    }
  }
  graphCtx.stroke();
  
  // 2. Draw static nodes
  graphNodes.forEach((node, idx) => {
    graphCtx.beginPath();
    graphCtx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    graphCtx.fillStyle = node.color;
    graphCtx.shadowColor = node.color;
    graphCtx.shadowBlur = (idx === cursorIndex) ? 12 : 0;
    graphCtx.fill();
    graphCtx.shadowBlur = 0; // reset
  });
  
  // 3. Move virtual cursor toward current target node
  const targetNode = graphNodes[cursorIndex];
  const dx = targetNode.x - cursorX;
  const dy = targetNode.y - cursorY;
  const distance = Math.hypot(dx, dy);
  
  if (!isNodeReached) {
    // Smoothly move towards target node
    if (distance > 3) {
      // Approach target node with a minimum step to prevent getting stuck due to drift
      const speed = Math.max(1.5, distance * CURSOR_SPEED);
      if (speed >= distance) {
        cursorX = targetNode.x;
        cursorY = targetNode.y;
      } else {
        cursorX += (dx / distance) * speed;
        cursorY += (dy / distance) * speed;
      }
    } else {
      isNodeReached = true;
      lastTimeNodeReached = Date.now();
      updateGraphTooltip(targetNode);
      cursorX = targetNode.x;
      cursorY = targetNode.y;
    }
  } else {
    // Lock cursor to the moving target node's coordinates
    cursorX = targetNode.x;
    cursorY = targetNode.y;
    
    // Hold position for 2.2 seconds before setting off for the next node
    const now = Date.now();
    if (now - lastTimeNodeReached > 2200) {
      cursorIndex = (cursorIndex + 1) % graphNodes.length;
      isNodeReached = false;
    }
  }
  
  // 4. Draw cursor & path from previous node
  const prevIndex = (cursorIndex - 1 + graphNodes.length) % graphNodes.length;
  const prevNode = graphNodes[prevIndex];
  
  graphCtx.beginPath();
  graphCtx.strokeStyle = targetNode.color;
  graphCtx.lineWidth = 2;
  graphCtx.moveTo(prevNode.x, prevNode.y);
  graphCtx.lineTo(cursorX, cursorY);
  graphCtx.stroke();
  
  // Draw virtual cursor dot
  graphCtx.beginPath();
  graphCtx.arc(cursorX, cursorY, 4, 0, Math.PI * 2);
  graphCtx.fillStyle = '#ffffff';
  graphCtx.shadowColor = '#ffffff';
  graphCtx.shadowBlur = 8;
  graphCtx.fill();
  graphCtx.shadowBlur = 0;
  
  graphAnimationId = requestAnimationFrame(animateGraph);
}

function updateGraphTooltip(node) {
  const tType = document.getElementById('tooltip-type');
  const tTitle = document.getElementById('tooltip-title');
  const tDesc = document.getElementById('tooltip-desc');
  const tooltip = document.getElementById('canvas-tooltip');
  
  if (!tType || !tTitle || !tDesc || !tooltip) return;
  
  // Fade out, update content, fade in
  tooltip.style.opacity = '0';
  setTimeout(() => {
    tType.textContent = node.type;
    tType.style.color = node.color;
    tTitle.textContent = node.projectTitle;
    tDesc.textContent = node.projectDesc;
    tooltip.style.opacity = '1';
  }, 150);
}

function stopObsidianGraph() {
  if (graphAnimationId) {
    cancelAnimationFrame(graphAnimationId);
    graphAnimationId = null;
  }
}

/* 
   ==========================================================================
   6. VISUALIZER 3: CONNECT HANDSHAKE ASCII ANIMATION ENGINE
   ========================================================================== 
*/

let asciiInterval = null;
let asciiFrameIndex = 0;

function initAsciiHandshake() {
  // ASCII block setup
}

function startAsciiHandshake() {
  if (asciiInterval) return;
  
  const asciiContent = document.getElementById('ascii-content');
  if (!asciiContent) return;
  
  asciiFrameIndex = 0;
  asciiContent.textContent = handshakeFrames[asciiFrameIndex];
  
  function playNextFrame() {
    asciiFrameIndex = (asciiFrameIndex + 1) % handshakeFrames.length;
    asciiContent.textContent = handshakeFrames[asciiFrameIndex];
    
    // Pause on the ESTABLISHED (last) frame for 2 seconds, otherwise step at 250ms
    const nextDelay = (asciiFrameIndex === handshakeFrames.length - 1) ? 2000 : 250;
    asciiInterval = setTimeout(playNextFrame, nextDelay);
  }
  
  asciiInterval = setTimeout(playNextFrame, 250);
}

function stopAsciiHandshake() {
  if (asciiInterval) {
    clearTimeout(asciiInterval);
    asciiInterval = null;
  }
}



function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const dropdownItems = document.querySelectorAll('.dropdown-item.filter-trigger');
  
  function applyFilter(filter) {
    // Toggle button classes
    filterBtns.forEach(btn => {
      btn.classList.remove('active', 'active-creative');
      if (btn.getAttribute('data-filter') === filter) {
        if (filter === 'creative') {
          btn.classList.add('active-creative');
        } else {
          btn.classList.add('active');
        }
      }
    });
    
    // Filter items
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
        // Fade entry
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      applyFilter(filter);
    });
  });

  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const filter = item.getAttribute('data-filter');
      applyFilter(filter);
    });
  });
}

/* 
   ==========================================================================
   9. SMOOTH SCROLLING FOR LANDING SECTIONS
   ========================================================================== 
*/

function setupSmoothScrolling() {
  const navbarLinks = document.querySelectorAll('.nav-link, .hero-title-link, .btn, .dropdown-item');
  
  navbarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
          e.preventDefault();
          
          // Adjust scroll offset due to sticky navbar
          const navHeight = 70;
          const targetPosition = targetSection.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* 
   ==========================================================================
   10. INTERACTIVE HERO PARTICLES BACKGROUND (FROM tsParticles BEHAVIOR)
   ========================================================================== 
*/

let particlesCanvas = null;
let particlesCtx = null;
let particlesAnimationId = null;
let particlesArray = [];
let particlesMouse = { x: null, y: null, active: false };

function initHeroParticles() {
  particlesCanvas = document.getElementById('hero-particles-canvas');
  if (!particlesCanvas) return;
  
  particlesCtx = particlesCanvas.getContext('2d');
  
  // Resize canvas
  resizeParticlesCanvas();
  window.addEventListener('resize', resizeParticlesCanvas);
  
  // Mouse interaction on the left menu pane only
  const container = document.querySelector('.hero-left');
  if (container) {
    container.addEventListener('mousemove', (e) => {
      const rect = particlesCanvas.getBoundingClientRect();
      particlesMouse.x = e.clientX - rect.left;
      particlesMouse.y = e.clientY - rect.top;
      particlesMouse.active = true;
    });
    
    container.addEventListener('mouseleave', () => {
      particlesMouse.active = false;
    });
    
    container.addEventListener('click', (e) => {
      const rect = particlesCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      repulseParticles(clickX, clickY);
    });
  }
  
  // Create initial particles
  createParticles();
  
  // Start loop
  startParticlesAnimation();
}

function resizeParticlesCanvas() {
  if (!particlesCanvas) return;
  const parent = particlesCanvas.parentElement;
  particlesCanvas.width = parent.clientWidth;
  particlesCanvas.height = parent.clientHeight;
}

function createParticles() {
  if (!particlesCanvas) return;
  particlesArray = [];
  const w = particlesCanvas.width;
  const h = particlesCanvas.height;
  
  // Dynamic density based on canvas area
  const count = Math.max(30, Math.min(100, Math.floor((w * h) / 7500)));
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 2 + 1.2; // sizes 1.2px to 3.2px
    const x = Math.random() * (w - size * 2) + size;
    const y = Math.random() * (h - size * 2) + size;
    
    // Slow drifting speed vectors
    const vx = (Math.random() - 0.5) * 0.6;
    const vy = (Math.random() - 0.5) * 0.6;
    
    particlesArray.push({
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      radius: size,
      originalVx: vx,
      originalVy: vy,
      friction: 0.95 // How quickly it slows down after being repulsed
    });
  }
}

function repulseParticles(clickX, clickY) {
  const repulseRadius = 180;
  const forceFactor = 6;
  
  particlesArray.forEach(p => {
    const dx = p.x - clickX;
    const dy = p.y - clickY;
    const distance = Math.hypot(dx, dy);
    
    if (distance < repulseRadius && distance > 0) {
      const force = (repulseRadius - distance) / repulseRadius;
      const angle = Math.atan2(dy, dx);
      
      // Add sudden repulsion acceleration impulse
      p.vx += Math.cos(angle) * force * forceFactor;
      p.vy += Math.sin(angle) * force * forceFactor;
    }
  });
}

function startParticlesAnimation() {
  // Ensure we don't start duplicate loops
  if (!particlesAnimationId) {
    animateParticles();
  }
}

function stopParticlesAnimation() {
  if (particlesAnimationId) {
    cancelAnimationFrame(particlesAnimationId);
    particlesAnimationId = null;
  }
}

function animateParticles() {
  if (!particlesCtx || !particlesCanvas) return;
  
  const w = particlesCanvas.width;
  const h = particlesCanvas.height;
  
  particlesCtx.clearRect(0, 0, w, h);
  
  // Theme-aware particle color (White in dark mode, Dark Gray in light mode to keep visible)
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const dotColor = theme === 'light' ? '#0f172a' : '#ffffff';
  
  // 1. Draw connection lines between nearby particles that are also close to the cursor (Interactive Web)
  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i + 1; j < particlesArray.length; j++) {
      const p1 = particlesArray[i];
      const p2 = particlesArray[j];
      
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.hypot(dx, dy);
      
      if (dist < 80) { // If particles are close to each other
        if (particlesMouse.active && particlesMouse.x !== null && particlesMouse.y !== null) {
          const mDist1 = Math.hypot(p1.x - particlesMouse.x, p1.y - particlesMouse.y);
          const mDist2 = Math.hypot(p2.x - particlesMouse.x, p2.y - particlesMouse.y);
          
          // Only draw a line between them if both particles are near the cursor (Local web effect)
          if (mDist1 < 140 && mDist2 < 140) {
            const mouseFactor = (140 - Math.max(mDist1, mDist2)) / 140;
            const distFactor = (80 - dist) / 80;
            const opacity = mouseFactor * distFactor * 0.60; // Higher opacity factor
            
            particlesCtx.beginPath();
            particlesCtx.moveTo(p1.x, p1.y);
            particlesCtx.lineTo(p2.x, p2.y);
            particlesCtx.strokeStyle = dotColor;
            particlesCtx.lineWidth = 1.5; // Thicker lines
            particlesCtx.globalAlpha = opacity;
            particlesCtx.stroke();
            particlesCtx.globalAlpha = 1.0;
          }
        }
      }
    }
  }
  
  // 2. Move and draw particles, and draw lines to mouse
  particlesArray.forEach(p => {
    // Return to original speed slowly (friction physics)
    p.vx = p.vx * p.friction + p.originalVx * (1 - p.friction);
    p.vy = p.vy * p.friction + p.originalVy * (1 - p.friction);
    
    p.x += p.vx;
    p.y += p.vy;
    
    // Bouncing physics off boundaries
    if (p.x - p.radius < 0) {
      p.x = p.radius;
      p.vx = -p.vx;
      p.originalVx = -p.originalVx;
    } else if (p.x + p.radius > w) {
      p.x = w - p.radius;
      p.vx = -p.vx;
      p.originalVx = -p.originalVx;
    }
    
    if (p.y - p.radius < 0) {
      p.y = p.radius;
      p.vy = -p.vy;
      p.originalVy = -p.originalVy;
    } else if (p.y + p.radius > h) {
      p.y = h - p.radius;
      p.vy = -p.vy;
      p.originalVy = -p.originalVy;
    }
    
    // Draw particle node
    particlesCtx.beginPath();
    particlesCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    particlesCtx.fillStyle = dotColor;
    particlesCtx.fill();
    
    // Draw hover grab lines (interactivity to cursor)
    if (particlesMouse.active && particlesMouse.x !== null && particlesMouse.y !== null) {
      const dx = p.x - particlesMouse.x;
      const dy = p.y - particlesMouse.y;
      const distance = Math.hypot(dx, dy);
      
      if (distance < 130) {
        const opacity = ((130 - distance) / 130) * 0.60; // Higher opacity factor
        
        particlesCtx.beginPath();
        particlesCtx.moveTo(p.x, p.y);
        particlesCtx.lineTo(particlesMouse.x, particlesMouse.y);
        particlesCtx.strokeStyle = dotColor;
        particlesCtx.lineWidth = 2.0; // Thicker grab lines
        particlesCtx.globalAlpha = opacity;
        particlesCtx.stroke();
        particlesCtx.globalAlpha = 1.0; // Reset canvas global opacity
      }
    }
  });
  
  particlesAnimationId = requestAnimationFrame(animateParticles);
}

