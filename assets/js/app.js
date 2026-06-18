const STORAGE_KEYS = {
      profile: 'decoBotProfile',
      messages: 'decoBotMessages',
      activities: 'decoBotActivities',
      notes: 'decoBotNotes',
      habits: 'decoBotHabits',
      budget: 'decoBotBudget',
      achievements: 'decoBotAchievements',
      visits: 'decoBotVisitCount',
      chatDates: 'decoBotChatDates',
      messageTotal: 'decoBotMessageTotal',
      messagesToday: 'decoBotMessagesToday',
      password: 'decoBotPassword',
      favorites: 'decoBotFavorites',
      quizScore: 'decoBotQuizScore',
      rpsScore: 'decoBotRpsScore',
      sign: 'decoBotSign',
      timer: 'decoBotTimer'
    };

    const EMOJI_LIST = ['😊','😂','❤️','😍','🤔','😢','😠','😴','🎉','👍','👎','🙏','🔥','✅','❌','💪','🌟','😎','🤖','💬','📝','💰','🎮','⏰','📚','⭐','🎵','😮','🤣','😭','💯','🚀','🌈','😅','🤦','🙄','😬','🥳','😇','🤩'];
    const landingPage = document.querySelector('.landing-page');
    const responses = {
      help: 'I can help with notes, habits, budget, games, tools, learning, memory, profile, and exports. Try: “show notes”, “set budget 100”, “play rps”, “word”, or “motivate”.',
      hello: 'Hello! I am DecoBot, your friendly rule-based assistant. What would you like to do today?',
      hi: 'Hi there! I am ready to help with your chat, notes, habits, budget, games, and more.',
      hey: 'Hey! I am DecoBot. Ask me for your status, a joke, a quiz, or a word of the day.',
      'how are you': 'I am doing great! I am ready to help you stay organized and motivated.',
      'how r u': 'I am doing great, thanks! Let me help you stay productive today.',
      hru: 'I am doing great, thanks! Ready when you are.',
      thanks: 'You are welcome! I am always happy to help.',
      sorry: 'No worries — every good assistant learns with practice. 😊',
      love: 'Aww, thank you! I am here to support your day.',
      joke: 'Why did the robot go to school? To improve its circuit-ry! 😄'
    };

    function getNotes() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '[]'); }
    function saveNotes(notes) { localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notes)); }
    function getHabits() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.habits) || '[]'); }
    function saveHabits(habits) { localStorage.setItem(STORAGE_KEYS.habits, JSON.stringify(habits)); }
    function getBudget() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.budget) || '{"limit":0,"spent":0,"items":[]}'); }
    function saveBudget(budget) { localStorage.setItem(STORAGE_KEYS.budget, JSON.stringify(budget)); }
    function getAchievements() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.achievements) || '[]'); }
    function saveAchievements(list) { localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(list)); }
    function getVisitCount() { return Number(localStorage.getItem(STORAGE_KEYS.visits) || 0); }
    function setVisitCount(n) { localStorage.setItem(STORAGE_KEYS.visits, String(n)); }
    function getMessageTotal() { return Number(localStorage.getItem(STORAGE_KEYS.messageTotal) || 0); }
    function setMessageTotal(n) { localStorage.setItem(STORAGE_KEYS.messageTotal, String(n)); }
    function getMessagesToday() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.messagesToday) || '{}'); }
    function setMessagesToday(obj) { localStorage.setItem(STORAGE_KEYS.messagesToday, JSON.stringify(obj)); }
    function getChatDates() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.chatDates) || '[]'); }
    function saveChatDates(list) { localStorage.setItem(STORAGE_KEYS.chatDates, JSON.stringify(list)); }
    function getFavorites() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || '{}'); }
    function saveFavorites(obj) { localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(obj)); }
    function getPassword() { return localStorage.getItem(STORAGE_KEYS.password) || ''; }
    function savePassword(pw) { localStorage.setItem(STORAGE_KEYS.password, pw); }
    function getQuizScore() { return Number(localStorage.getItem(STORAGE_KEYS.quizScore) || 0); }
    function setQuizScore(n) { localStorage.setItem(STORAGE_KEYS.quizScore, String(n)); }
    function getRpsScore() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.rpsScore) || '{"won":0,"lost":0,"tie":0}'); }
    function saveRpsScore(obj) { localStorage.setItem(STORAGE_KEYS.rpsScore, JSON.stringify(obj)); }
    function getStoredSign() { return localStorage.getItem(STORAGE_KEYS.sign) || ''; }
    function saveStoredSign(sign) { localStorage.setItem(STORAGE_KEYS.sign, sign); }

    function incrementVisitCount() {
      const next = getVisitCount() + 1;
      setVisitCount(next);
      return next;
    }

    function recordMessageMeta(text) {
      const total = getMessageTotal() + 1;
      setMessageTotal(total);
      const today = new Date().toISOString().slice(0, 10);
      const data = getMessagesToday();
      data[today] = (data[today] || 0) + 1;
      setMessagesToday(data);
      const dates = getChatDates();
      if (!dates.includes(today)) dates.push(today);
      saveChatDates(dates);
      return { total, today };
    }

    function showToast(text) {
      const toast = document.getElementById('achievementToast');
      if (!toast) return;
      toast.textContent = text;
      toast.classList.add('show');
      clearTimeout(showToast._timer);
      showToast._timer = setTimeout(() => toast.classList.remove('show'), 2600);
    }

    function burstConfetti() {
      const layer = document.createElement('div');
      layer.className = 'confetti-layer';
      for (let i = 0; i < 30; i++) {
        const piece = document.createElement('span');
        piece.className = 'confetti';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = ['#8b5cf6', '#38bdf8', '#f472b6', '#fbbf24', '#34d399'][Math.floor(Math.random() * 5)];
        piece.style.animationDuration = (1.2 + Math.random() * 0.8) + 's';
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        layer.appendChild(piece);
      }
      document.body.appendChild(layer);
      setTimeout(() => layer.remove(), 1800);
    }

    function awardAchievement(name, emoji) {
      const list = getAchievements();
      if (list.includes(name)) return;
      list.push(name);
      saveAchievements(list);
      showToast(`${emoji} ${name}`);
      burstConfetti();
    }

    function renderHabitBudgetNotes() {
      const habitList = document.getElementById('habitList');
      const budgetPanel = document.getElementById('budgetPanel');
      const notesPreview = document.getElementById('notesPreview');
      const notesCountBadge = document.getElementById('notesCountBadge');
      const habits = getHabits();
      const budget = getBudget();
      const notes = getNotes();
      if (habitList) {
        if (!habits.length) {
          habitList.innerHTML = '<article class="empty-state"><div class="emoji">💪</div><strong>No habits yet.</strong><span>Add one in chat to begin your streak.</span></article>';
        } else {
          habitList.innerHTML = habits.map((item, index) => `
            <article class="mini-stat" style="padding:10px;">
              <strong>${index + 1}. ${item.name}</strong>
              <span>Streak ${item.streak || 0} • Done ${item.done || 0}</span>
              <button class="pill-btn" type="button" onclick="window.__markHabit(${index})">Mark done</button>
            </article>
          `).join('');
        }
      }
      if (budgetPanel) {
        budgetPanel.innerHTML = budget.limit ? `<div class="mini-stat"><span>Limit</span><strong>${budget.limit}</strong></div><div class="mini-stat"><span>Spent</span><strong>${budget.spent}</strong></div><div class="mini-stat"><span>Remaining</span><strong>${Math.max(budget.limit - budget.spent, 0)}</strong></div>` : '<article class="empty-state"><div class="emoji">💰</div><strong>No budget set.</strong><span>Tell DecoBot “set budget 100” to get started.</span></article>';
      }
      if (notesPreview) {
        if (!notes.length) notesPreview.innerHTML = '<article class="empty-state"><div class="emoji">📝</div><strong>No notes yet.</strong><span>Use “take note …” to save one.</span></article>';
        else notesPreview.innerHTML = notes.slice(0, 3).map((note, i) => `<div class="mini-stat"><span>Note ${i + 1}</span><strong>${escapeHtml(note)}</strong></div>`).join('');
      }
      if (notesCountBadge) notesCountBadge.textContent = String(notes.length || 0);
    }

    window.__markHabit = function(index) {
      const habits = getHabits();
      if (!habits[index]) return;
      habits[index].done = (habits[index].done || 0) + 1;
      habits[index].streak = (habits[index].streak || 0) + 1;
      saveHabits(habits);
      renderHabitBudgetNotes();
      renderStats();
      showToast('💪 Habit Builder');
    };

    const intro = document.getElementById('intro');
    const introCopy = document.getElementById('introCopy');
    const logoBubble = document.getElementById('logoBubble');
    const welcomeModal = document.getElementById('welcomeModal');
    const welcomeNameInput = document.getElementById('welcomeNameInput');
    const saveNameBtn = document.getElementById('saveNameBtn');
    const skipNameBtn = document.getElementById('skipNameBtn');
    const dashboardPanel = document.getElementById('dashboardPanel');
    const collapseDashboardBtn = document.getElementById('collapseDashboardBtn');
    const chatSearch = document.getElementById('chatSearch');
    const statusCenter = document.getElementById('statusCenter');
    const statusRight = document.getElementById('statusRight');
    const liveClock = document.getElementById('liveClock');
    const commandPalette = document.getElementById('commandPalette');
    const commandInput = document.getElementById('commandInput');
    const commandList = document.getElementById('commandList');
    const scrollTopArrow = document.getElementById('scrollTopArrow');
    const shockwave = document.getElementById('shockwave');
    const introTitle = document.getElementById('introTitle');
    const introSubtitle = document.getElementById('introSubtitle');
    const appShell = document.getElementById('appShell');
    const canvas = document.getElementById('introCanvas');
    const ctx = canvas.getContext('2d');

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function showWelcomeSetup(force = false) {
      const profile = getProfile();
      if (!force && profile.name) {
        checkPasswordGate();
        return;
      }
      if (!welcomeModal) return;
      welcomeModal.classList.remove('hidden');
      welcomeModal.setAttribute('aria-hidden', 'false');
      welcomeNameInput.value = profile.name || '';
      setTimeout(() => welcomeNameInput.focus(), 40);
    }

    function hideWelcomeSetup() {
      if (!welcomeModal) return;
      welcomeModal.classList.add('hidden');
      welcomeModal.setAttribute('aria-hidden', 'true');
      checkPasswordGate();
    }

    function checkPasswordGate() {
      const pw = getPassword();
      if (!pw) return;
      const modal = document.getElementById('loginModal');
      const input = document.getElementById('loginPasswordInput');
      const error = document.getElementById('loginError');
      if (!modal) return;
      if (error) error.style.display = 'none';
      if (input) input.value = '';
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
      setTimeout(() => input?.focus(), 40);
    }

    function handleLogin() {
      const input = document.getElementById('loginPasswordInput');
      const error = document.getElementById('loginError');
      const pw = getPassword();
      if (!pw || !input) return;
      if (input.value === pw) {
        document.getElementById('loginModal')?.classList.add('hidden');
        document.getElementById('loginModal')?.setAttribute('aria-hidden', 'true');
        if (error) error.style.display = 'none';
      } else {
        if (error) error.style.display = 'block';
        input.value = '';
        input.focus();
      }
    }

    function initIntroAnimation() {
      if (intro.dataset.running === 'true') return;
      intro.dataset.running = 'true';
      intro.classList.remove('hidden');
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const resizeCanvas = () => {
        const { innerWidth: w, innerHeight: h } = window;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const words = 'DecoBot'.split('');
      introTitle.innerHTML = words.map((char, i) => `<span style="transition-delay:${90 * i}ms">${char}</span>`).join('');

      const particles = [];
      let exploded = false;
      let started = false;
      let ringScale = 0.1;
      let ringAlpha = 0;
      let introTime = 0;
      const totalDuration = 5000;

      function createParticles() {
        const count = 120;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
          const speed = 1.8 + Math.random() * 2.8;
          const size = 2 + Math.random() * 3;
          const color = ['#fb7185', '#fb923c', '#facc15', '#4ade80', '#38bdf8', '#c084fc', '#f472b6'][Math.floor(Math.random() * 7)];
          particles.push({ x: window.innerWidth / 2, y: window.innerHeight / 2, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, size, color, life: 1, gravity: 0.015 + Math.random() * 0.015 });
        }
      }

      function renderParticles(now) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        particles.forEach((p, index) => {
          p.vy += p.gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.012;
          if (p.life <= 0) particles.splice(index, 1);
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        });
      }

      function animateIntro(ts) {
        if (!started) {
          started = true;
          introTime = ts;
        }
        const elapsed = ts - introTime;
        const progress = Math.min(elapsed / 2000, 1);
        const zoom = easeOutCubic(progress);
        const scale = 0.18 + zoom * 0.82;
        logoBubble.style.transform = `scale(${scale})`;

        if (elapsed > 1200 && !exploded) {
          exploded = true;
          createParticles();
          shockwave.classList.add('active');
          ringScale = 0.8;
          ringAlpha = 1;
          setTimeout(() => {
            shockwave.classList.remove('active');
          }, 700);
        }

        if (exploded) {
          ringScale += 0.02;
          ringAlpha = Math.max(0, 1 - (ringScale - 0.8) * 0.35);
          shockwave.style.opacity = ringAlpha;
          shockwave.style.transform = `scale(${ringScale})`;
        }

        const titleLetters = introTitle.querySelectorAll('span');
        const titleProgress = Math.max(0, (elapsed - 1450) / 1600);
        titleLetters.forEach((span, i) => {
          const letterProgress = Math.min(1, Math.max(0, titleProgress - i * 0.04));
          span.style.opacity = letterProgress > 0.98 ? 1 : letterProgress;
          span.style.transform = `translateY(${letterProgress < 1 ? 8 * (1 - letterProgress) : 0}px)`;
        });

        const subtitleReveal = Math.max(0, (elapsed - 2100) / 1000);
        introSubtitle.style.opacity = subtitleReveal > 1 ? 1 : subtitleReveal;
        introSubtitle.style.transform = `translateY(${subtitleReveal < 1 ? 6 * (1 - subtitleReveal) : 0}px)`;

        if (elapsed > 0) renderParticles(ts);

        if (elapsed < totalDuration) {
          requestAnimationFrame(animateIntro);
        } else {
          intro.dataset.running = 'false';
          intro.classList.add('hidden');
          landingPage.classList.add('page-hidden');
          appShell.style.display = 'block';
          appShell.style.opacity = '1';
          showWelcomeSetup(true);
        }
      }

      introCopy.classList.add('visible');
      requestAnimationFrame(animateIntro);
    }

    function getProfile() {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.profile) || '{}');
    }

    function getMessages() {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.messages) || '[]');
    }

    function getActivities() {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.activities) || '[]');
    }

    function saveProfile(profile) {
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
      updateStatusBanner();
    }

    function saveMessages(messages) {
      localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
      updateStatusBanner();
    }

    function saveActivities(activities) {
      localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(activities));
      updateStatusBanner();
    }

    function applyTheme(theme) {
      const safeTheme = theme === 'dark' ? 'dark' : 'lite';
      document.body.dataset.theme = safeTheme;
      localStorage.setItem('decoBotTheme', safeTheme);
      const lite = document.getElementById('themeLiteBtn');
      const dark = document.getElementById('themeDarkBtn');
      lite?.classList.toggle('active', safeTheme === 'lite');
      dark?.classList.toggle('active', safeTheme === 'dark');
      const landingLite = document.getElementById('landingThemeLite');
      const landingDark = document.getElementById('landingThemeDark');
      landingLite?.classList.toggle('active', safeTheme === 'lite');
      landingDark?.classList.toggle('active', safeTheme === 'dark');
    }

    function updateStatusBanner() {
      const activities = getActivities();
      const messages = getMessages();
      const streak = computeStreak(activities);
      const today = new Date().toISOString().slice(0, 10);
      const todayMessages = messages.filter(item => item.time && item.time.slice(0, 10) === today).length;
      const habits = getHabits();
      const budget = getBudget();
      statusCenter.textContent = `🔥 ${streak} streak • 💬 ${todayMessages} today`;
      statusRight.textContent = '💾 Auto-saved • ' + new Date().toLocaleTimeString();
      document.getElementById('achievementBadge').textContent = String(getAchievements().length || 0);
      document.getElementById('miniMessages').textContent = String(messages.length || 0);
      document.getElementById('miniStreak').textContent = String(streak || 0);
      document.getElementById('miniHabits').textContent = String(habits.length || 0);
      document.getElementById('miniAchievements').textContent = String(getAchievements().length || 0);
      document.getElementById('todayMessagesCount').textContent = String(todayMessages || 0);
      document.getElementById('todayHabitsCount').textContent = `${habits.filter(item => item.done).length || 0} of ${habits.length || 0}`;
      document.getElementById('todayBudgetText').textContent = budget.limit ? `Limit ${budget.limit} • Spent ${budget.spent || 0}` : 'No budget set';
    }

    function formatDayLabel(dateText) {
      return new Date(dateText + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    function computeStreak(activities) {
      const dates = [...new Set(activities.map(item => item.date))].sort((a, b) => new Date(b) - new Date(a));
      if (!dates.length) return 0;
      let streak = 1;
      const today = new Date();
      let current = new Date(dates[0]);
      while (true) {
        const previous = new Date(current);
        previous.setDate(previous.getDate() - 1);
        const key = previous.toISOString().split('T')[0];
        if (dates.includes(key)) {
          streak += 1;
          current = previous;
        } else {
          break;
        }
      }
      return streak;
    }

    function renderStats() {
      updateStatusBanner();
      const messages = getMessages();
      const activities = getActivities();
      const profile = getProfile();
      const totalMinutes = activities.reduce((sum, item) => sum + Number(item.minutes || 0), 0);
      const activeDays = [...new Set(activities.map(item => item.date))].length;
      const streak = computeStreak(activities);
      const stats = [
        { label: 'Sessions saved', value: activities.length ? `${activities.length}` : 'No data', detail: activities.length ? 'Real activity entries' : 'Add one to begin', empty: !activities.length },
        { label: 'Minutes tracked', value: activities.length ? `${totalMinutes}` : 'No data', detail: activities.length ? 'Minutes from your saved activity log' : 'No saved numbers yet', empty: !activities.length },
        { label: 'Active days', value: activities.length ? `${activeDays}` : 'No data', detail: activities.length ? 'Distinct days with real activity' : 'No saved days yet', empty: !activities.length },
        { label: 'Current streak', value: activities.length ? `${streak} day${streak === 1 ? '' : 's'}` : 'No data', detail: activities.length ? 'Consecutive days in localStorage' : 'No streak to show yet', empty: !activities.length }
      ];

      const statsGrid = document.getElementById('statsGrid');
      if (statsGrid) {
        statsGrid.innerHTML = stats.map(card => `
          <article class="stat-card ${card.empty ? 'empty' : ''}">
            <small>${card.label}</small>
            <strong>${card.value}</strong>
            <span>${card.detail}</span>
          </article>
        `).join('');
      }

      const profilePreview = document.getElementById('profilePreview');
      const profileFields = [];
      if (profile.name) profileFields.push(`<div class="field"><label>Name</label><strong>${profile.name}</strong></div>`);
      if (profile.role) profileFields.push(`<div class="field"><label>Role</label><strong>${profile.role}</strong></div>`);
      if (profile.focus) profileFields.push(`<div class="field"><label>Focus</label><strong>${profile.focus}</strong></div>`);
      if (profile.goal) profileFields.push(`<div class="field"><label>Goal</label><strong>${profile.goal}</strong></div>`);
      if (profile.bio) profileFields.push(`<div class="field"><label>Bio</label><strong>${profile.bio}</strong></div>`);
      profilePreview.innerHTML = profileFields.length
        ? profileFields.join('')
        : '<div class="empty-state"><div class="emoji">🫧</div><strong>Profile is empty.</strong><span>Save your name and focus to populate this section.</span></div>';

      document.getElementById('calendarMonthLabel').textContent = new Date().toLocaleString(undefined, { month: 'long', year: 'numeric' });
      renderCalendar();
      renderCharts();
      renderChat();
      renderHabitBudgetNotes();
      document.getElementById('activityForm').reset();
      document.getElementById('activityDate').value = new Date().toISOString().slice(0, 10);
      document.getElementById('nameInput').value = profile.name || '';
      document.getElementById('roleInput').value = profile.role || '';
      document.getElementById('focusInput').value = profile.focus || '';
      document.getElementById('goalInput').value = profile.goal || '';
      document.getElementById('bioInput').value = profile.bio || '';
    }

    function renderQuickCommands() {
      const quickList = document.getElementById('commandQuickList');
      if (!quickList) return;
      const commands = [
        { label: 'Show my status', action: 'show my status' },
        { label: 'Tell me a joke', action: 'joke' },
        { label: 'Motivate me', action: 'motivate me' },
        { label: 'Export report', action: 'export report' },
        { label: 'What happened today?', action: 'what happened today' }
      ];
      quickList.innerHTML = commands.map(item => `<button class="command-action-btn" type="button" data-quick-command="${item.action}"><span>${item.label}</span><span>Run</span></button>`).join('');
    }

    function runQuickCommand(command) {
      const input = document.getElementById('chatInput');
      if (!input) return;
      input.value = command;
      document.getElementById('chatForm')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }

    function renderChat() {
      const messages = getMessages();
      const query = (chatSearch && chatSearch.value || '').trim().toLowerCase();
      const filtered = query ? messages.filter(item => (item.text || '').toLowerCase().includes(query)) : messages;
      const chatWindow = document.getElementById('chatWindow');
      const profile = getProfile();
      const greetingName = profile.name ? profile.name.split(' ')[0] : 'there';

      if (!filtered.length) {
        if (!messages.length) {
          chatWindow.innerHTML = `
            <article class="bubble bot">
              <small>DecoBot</small>
              <p>Hi ${greetingName}! I am ready to help with your tasks, moods, habits, budgets, and reports.</p>
            </article>
            <article class="welcome-note">Try a quick command like “show my status”, “joke”, or “export report”.</article>
            <article class="empty-state"><div class="emoji">💬</div><strong>No chat history yet.</strong><span>Ask DecoBot about your session, activity, or export status.</span></article>
          `;
        } else {
          chatWindow.innerHTML = '<article class="empty-state"><div class="emoji">🔎</div><strong>No matches found.</strong><span>Try a different keyword or clear the search box.</span></article>';
        }
        return;
      }
      window.__reactionMap = window.__reactionMap || {};
      chatWindow.innerHTML = filtered.map((item, index) => {
        const key = (item.time || 'msg') + '_' + index;
        const selected = window.__reactionMap[key] || [];
        return `
          <article class="bubble ${item.role}">
            <small>${item.role === 'user' ? 'You' : 'DecoBot'}</small>
            <p>${escapeHtml(item.text)}</p>
            <div class="reaction-row">
              ${['👍','😂','❤️','😮','😢'].map(emoji => `<button class="reaction-btn ${selected.includes(emoji) ? 'active' : ''}" data-emoji="${emoji}" data-time="${key}" type="button">${emoji}</button>`).join('')}
            </div>
          </article>
        `;
      }).join('');
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function escapeHtml(text) {
      return text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    }

    function renderCalendar() {
      const activities = getActivities();
      const calendarGrid = document.getElementById('calendarGrid');
      const month = new Date();
      const year = month.getFullYear();
      const firstDay = new Date(year, month.getMonth(), 1);
      const lastDay = new Date(year, month.getMonth() + 1, 0);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const activityDates = new Set(activities.map(item => item.date));

      calendarGrid.innerHTML = dayNames.map(day => `<div class="calendar-cell weekday">${day}</div>`).join('');

      const offset = firstDay.getDay();
      for (let i = 0; i < offset; i++) calendarGrid.appendChild(document.createElement('div'));

      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month.getMonth(), day);
        const key = date.toISOString().slice(0, 10);
        const cell = document.createElement('div');
        cell.className = `calendar-cell${activityDates.has(key) ? ' active' : ''}`;
        cell.textContent = day;
        calendarGrid.appendChild(cell);
      }

      const hint = document.getElementById('calendarHint');
      if (hint) {
        if (activityDates.size) {
          hint.textContent = `Highlighted days: ${Array.from(activityDates).sort().map(formatDayLabel).join(', ')}`;
        } else {
          hint.textContent = 'No saved activity days yet — add one above to start the calendar.';
        }
      }
    }

    function renderCharts() {
      const trendWrap = document.getElementById('trendWrap');
      const moodWrap = document.getElementById('moodWrap');
      const activities = getActivities();
      const chartInstances = window.__decoCharts || [];
      chartInstances.forEach(chart => chart.destroy());
      window.__decoCharts = [];

      if (!activities.length) {
        trendWrap.innerHTML = '<article class="empty-state"><div class="emoji">📉</div><strong>No chart data yet.</strong><span>Save a real activity entry to render the weekly trend.</span></article>';
        moodWrap.innerHTML = '<article class="empty-state"><div class="emoji">🎯</div><strong>No mood data yet.</strong><span>Saved activity sessions power the mood chart.</span></article>';
        return;
      }

      const heat = {};
      activities.forEach(item => { heat[item.date] = (heat[item.date] || 0) + Number(item.minutes || 0); });
      const labels = Object.keys(heat).sort((a, b) => new Date(a) - new Date(b)).slice(-7);
      const values = labels.map(date => heat[date]);

      const labelsDisplay = labels.map(date => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
      const trend = new Chart(trendWrap, {
        type: 'line',
        data: {
          labels: labelsDisplay,
          datasets: [{
            label: 'Minutes',
            data: values,
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139,92,246,0.18)',
            tension: 0.35,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148,163,184,0.12)' } }, x: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148,163,184,0.08)' } } }
        }
      });
      window.__decoCharts.push(trend);

      const moodTotals = activities.reduce((acc, item) => {
        acc[item.mood || 'Focused'] = (acc[item.mood || 'Focused'] || 0) + 1;
        return acc;
      }, {});
      const moodChart = new Chart(moodWrap, {
        type: 'doughnut',
        data: {
          labels: Object.keys(moodTotals),
          datasets: [{
            data: Object.values(moodTotals),
            backgroundColor: ['#8b5cf6', '#22d3ee', '#34d399', '#f59e0b', '#fb7185'],
            borderWidth: 1,
            borderColor: 'rgba(3,7,18,0.85)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#e5eefb' } } }
        }
      });
      window.__decoCharts.push(moodChart);
    }

    function handleProfile(event) {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target).entries());
      if (!getVisitCount()) {
        setVisitCount(1);
        awardAchievement('🌟 First Visit', '🌟');
        awardAchievement('🛡️ DecodeLabs Intern', '🛡️');
      }
      saveProfile(data);
      renderStats();
    }

    function saveWelcomeName(name) {
      const value = name.trim() || 'Explorer';
      const current = getProfile();
      current.name = value;
      saveProfile(current);
      hideWelcomeSetup();
      renderStats();
      showToast(`Welcome, ${value} 👋`);
    }

    function handleActivity(event) {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target).entries());
      const activities = getActivities();
      data.minutes = Number(data.minutes || 0);
      data.date = data.date || new Date().toISOString().slice(0, 10);
      activities.unshift(data);
      saveActivities(activities);
      renderStats();
    }

    function getReply(text) {
      const query = text.toLowerCase().trim();
      const profile = getProfile();
      const activities = getActivities();
      const notes = getNotes();
      const habits = getHabits();
      const budget = getBudget();
      const totalMinutes = activities.reduce((sum, item) => sum + Number(item.minutes || 0), 0);
      const activeDays = [...new Set(activities.map(item => item.date))].length;
      const streak = computeStreak(activities);
      const name = profile.name || 'friend';

      if (/\b(bye|quit|exit|goodbye|cya)\b/.test(query)) return `Goodbye, ${name}! I’ll be here when you return. 😊`;
      if (/\b(note|notes|take note|show notes|my notes)\b/.test(query)) {
        if (query.startsWith('delete note')) {
          const n = Number(query.replace(/[^0-9]/g, '')) || 0;
          if (n > 0 && notes[n - 1]) { notes.splice(n - 1, 1); saveNotes(notes); return `Deleted note ${n}. You now have ${notes.length} note${notes.length === 1 ? '' : 's'}.`; }
          return 'I could not find that note number. Try “show notes” first.';
        }
        if (/take note/.test(query)) {
          const item = query.replace(/take note/i, '').trim();
          if (!item) return 'Sure — what should I save as a note?';
          notes.unshift(item);
          saveNotes(notes);
          awardAchievement('📝 Note Taker', '📝');
          return `Saved note: “${item}”.`;
        }
        return notes.length ? `Your notes:\n${notes.map((item, i) => `${i + 1}. ${item}`).join('\n')}` : 'You have no saved notes yet. Try “take note ...”.';
      }
      if (/\b(habit|habits|add habit|done habit|show habits|completed)\b/.test(query)) {
        if (/add habit/.test(query)) {
          const item = query.replace(/add habit/i, '').trim();
          if (!item) return 'Sure — what habit should I add?';
          habits.push({ name: item, done: 0, streak: 1 });
          saveHabits(habits);
          awardAchievement('💪 Habit Builder', '💪');
          return `Added habit “${item}”. I’ve saved it in your tracker.`;
        }
        if (/done habit/.test(query)) {
          const n = Number(query.replace(/[^0-9]/g, '')) || 0;
          if (n > 0 && habits[n - 1]) { habits[n - 1].done = (habits[n - 1].done || 0) + 1; habits[n - 1].streak = (habits[n - 1].streak || 0) + 1; saveHabits(habits); return `Marked “${habits[n - 1].name}” done. Nice work!`; }
          return 'I could not find that habit number. Try “show habits”.';
        }
        return habits.length ? `Your habits:\n${habits.map((item, i) => `${i + 1}. ${item.name} — done ${item.done || 0}, streak ${item.streak || 0}`).join('\n')}` : 'No habits saved yet. Try “add habit read 20 minutes”.';
      }
      if (/\b(budget|spent|spending|set budget|reset budget|clear budget)\b/.test(query)) {
        if (/set budget/.test(query)) {
          const limit = Number(query.replace(/[^0-9]/g, ''));
          if (!Number.isFinite(limit) || limit <= 0) return 'Please tell me a valid budget amount, for example “set budget 100”.';
          const next = { limit, spent: budget.spent || 0, items: budget.items || [] };
          saveBudget(next);
          awardAchievement('💰 Budget Boss', '💰');
          return `Budget set to ${limit}. You have ${Math.max(limit - next.spent, 0)} left.`;
        }
        if (/spent|spending/.test(query)) {
          const amount = Number(query.replace(/[^0-9]/g, ''));
          if (!Number.isFinite(amount) || amount <= 0) return 'Please tell me an amount you spent, for example “spent 15 on coffee”.';
          budget.spent = (budget.spent || 0) + amount;
          budget.items.push({ item: query.replace(/spent|spending/i, '').trim() || 'Expense', amount });
          saveBudget(budget);
          return `Logged ${amount}. Remaining budget: ${Math.max((budget.limit || 0) - budget.spent, 0)}.`;
        }
        return budget.limit ? `Budget limit ${budget.limit}, spent ${budget.spent || 0}, remaining ${Math.max(budget.limit - (budget.spent || 0), 0)}.` : 'No budget is set yet. Try “set budget 200”.';
      }
      const quiz = JSON.parse(localStorage.getItem('decoBotCurrentQuiz') || 'null');
      if (quiz && query.includes(quiz.a.toLowerCase())) {
        const score = getQuizScore() + 1;
        setQuizScore(score);
        localStorage.removeItem('decoBotCurrentQuiz');
        awardAchievement('❓ Quiz Master', '❓');
        return `Correct! “${quiz.q}” → ${quiz.a}. Your quiz score is now ${score}.`;
      }

      if (/\b(play|rps|rock paper scissors|quiz|trivia|test me)\b/.test(query)) {
        if (/rps|rock paper scissors/.test(query)) {
          const options = ['rock', 'paper', 'scissors'];
          const bot = options[Math.floor(Math.random() * options.length)];
          const user = query.includes('paper') ? 'paper' : query.includes('scissors') ? 'scissors' : 'rock';
          let result = 'Tie';
          if ((user === 'rock' && bot === 'scissors') || (user === 'paper' && bot === 'rock') || (user === 'scissors' && bot === 'paper')) result = 'You win';
          if ((user === 'rock' && bot === 'paper') || (user === 'paper' && bot === 'scissors') || (user === 'scissors' && bot === 'rock')) result = 'You lose';
          const score = getRpsScore();
          if (result === 'You win') score.won += 1; else if (result === 'You lose') score.lost += 1; else score.tie += 1;
          saveRpsScore(score);
          return `Rock Paper Scissors — you chose ${user}, I chose ${bot}. ${result}! Score: ${score.won} wins, ${score.lost} losses, ${score.tie} ties.`;
        }
        if (/quiz|trivia/.test(query)) {
          const questions = [
            ['What does AI stand for?', 'artificial intelligence'],
            ['How many days are in a week?', '7'],
            ['What color is the sky on a clear day?', 'blue']
          ];
          const [q, a] = questions[Math.floor(Math.random() * questions.length)];
          localStorage.setItem('decoBotCurrentQuiz', JSON.stringify({ q, a }));
          return `Quiz time! ${q} Reply with the answer.`;
        }
        return 'I can play Rock Paper Scissors or a trivia quiz. Try “play rps” or “quiz me”.';
      }
      if (/\b(time|date|calculate|math|solve|timer|countdown)\b/.test(query)) {
        if (/time/.test(query)) return `The current time is ${new Date().toLocaleTimeString()}.`;
        if (/date/.test(query)) return `Today is ${new Date().toLocaleDateString()}.`;
        if (/timer|countdown/.test(query)) {
          const sec = Number(query.replace(/[^0-9]/g, ''));
          if (!Number.isFinite(sec) || sec <= 0) return 'Tell me how many seconds to count down, for example: “timer 10”.';
          let remaining = sec;
          const reply = `Countdown started for ${sec} seconds. I’ll update the chat live.`;
          const timerLabel = setInterval(() => {
            remaining -= 1;
            const bubble = document.getElementById('chatWindow');
            if (bubble) bubble.insertAdjacentHTML('beforeend', `<article class="bubble bot"><small>Timer</small><p>${remaining > 0 ? remaining + ' seconds left' : 'Time is up!'} ⏰</p></article>`);
            if (remaining <= 0) clearInterval(timerLabel);
          }, 1000);
          return reply;
        }
        if (/calculate|math|solve/.test(query)) {
          const expression = query.replace(/(calculate|math|solve|=)/gi, '').trim();
          const safe = /^[0-9+\-*\/().\s%]+$/.test(expression);
          if (!safe) return 'Only numbers and operators allowed! 😊';
          try {
            const value = Function(`"use strict"; return (${expression})`)();
            if (!Number.isFinite(value)) return 'Cannot divide by zero! 😊';
            if (Number.isNaN(value)) return 'That is not a valid math problem! 😊';
            return `The result is ${value}.`;
          } catch (err) {
            return 'Could not solve that! Check your input 😅';
          }
        }
      }
      if (/\b(word of the day|new word|word|horoscope|zodiac|star sign|music|song|playlist)\b/.test(query)) {
        const words = ['Synergy', 'Clarity', 'Momentum', 'Focus', 'Spark'];
        const word = words[new Date().getDate() % words.length];
        if (/word|new word|word of the day/.test(query)) { awardAchievement('📚 Word Nerd', '📚'); return `Today’s word is “${word}”. Use it in a sentence to sharpen your thinking.`; }
        if (/horoscope|zodiac|star sign/.test(query)) {
          const sign = getStoredSign() || profile.name || 'Aries';
          if (!getStoredSign()) { saveStoredSign(sign); }
          awardAchievement('⭐ Star Gazer', '⭐');
          return `${sign}, your horoscope says today is a great day to trust your instincts and keep your momentum high. 🌟`;
        }
        if (/music|song|playlist/.test(query)) {
          const mood = query.includes('sad') ? 'Calm' : query.includes('happy') ? 'Upbeat' : 'Focus';
          return `Music by mood: for ${mood}, I recommend “Sunset Flow”, “Glow”, and “Drive”. 🎵`;
        }
      }
      if (/\b(memory|show memory|forget|facts|show facts|history|show history|achievements|badges|mood|mood history|count)\b/.test(query)) {
        if (/history/.test(query)) return `Session history (${getMessages().length} messages)\n${getMessages().slice(-6).map((item, index) => `${index + 1}. ${item.role === 'user' ? 'You' : 'DecoBot'}: ${item.text}`).join('\n')}`;
        if (/facts|memory/.test(query)) return 'Memory is now stored in your browser. I remember your profile, activities, and the notes you save.';
        if (/achievements|badges/.test(query)) return `Achievements: ${getAchievements().length ? getAchievements().join(', ') : 'None yet'}`;
        return `You have ${getMessageTotal()} total messages, ${Object.values(getMessagesToday()).reduce((a,b)=>a+b,0) || 0} messages today, and ${getVisitCount()} visits.`;
      }
      if (/\b(call me|remember|favourite color|favourite food|favourite movie|favourite song|favourite sport|set password|remove password)\b/.test(query)) {
        if (/call me/.test(query)) {
          const nickname = query.replace(/call me/i, '').trim();
          if (!nickname) return 'Sure — what name should I call you?';
          const next = { ...profile, name: nickname };
          saveProfile(next);
          return `Got it — I will call you ${nickname}.`;
        }
        if (/favourite color|favourite food|favourite movie|favourite song|favourite sport/.test(query)) {
          const favorites = getFavorites();
          const key = query.match(/color|food|movie|song|sport/)[0];
          const value = query.replace(/.*(color|food|movie|song|sport)\s+(is|=)\s*/i, '').trim();
          favorites[key] = value;
          saveFavorites(favorites);
          return `Saved your favourite ${key} as “${value}”.`;
        }
        if (/set password/.test(query)) {
          const pw = query.replace(/set password/i, '').trim();
          if (!pw) return 'Please choose a password to save.';
          savePassword(pw);
          awardAchievement('🔒 Security Expert', '🔒');
          return 'Password saved securely in this browser.';
        }
        if (/remove password/.test(query)) {
          localStorage.removeItem(STORAGE_KEYS.password);
          return 'Password removed.';
        }
      }
      if (/\b(hello|hi|hey|how are you|how r u|hru)\b/.test(query)) return responses[query.split(' ')[0]] || responses.hello;
      if (/\b(joke|funny|laugh|make me laugh)\b/.test(query)) return 'Sure — why did the robot bring a ladder? It wanted to reach the cloud! 😄';
      if (/\b(motivat|inspire|encourage|push me|i give up|i cant do this)\b/.test(query)) { awardAchievement('💪 Motivated', '💪'); return 'You are stronger than this moment. One step, one breath, one task at a time. I believe in you. 🌟'; }
      if (/\b(compliment|say something nice)\b/.test(query)) return 'You are thoughtful, capable, and doing a great job. I am proud of your progress.';
      if (/(sad|angry|happy|confused|tired)/.test(query)) { if (/happy/.test(query)) awardAchievement('😊 Positive Vibes', '😊'); return 'I can sense that mood. I will keep the tone supportive and calm.'; }
      if (/\b(thank|sorry|love|help)\b/.test(query)) return responses[query.split(' ')[0]] || 'I am here to help.';
      if (responses[query]) return responses[query];
      return `I do not know that yet, ${name}! Type help! 😊`;
    }

    function handleChat(event) {
      event.preventDefault();
      const input = document.getElementById('chatInput');
      const text = input.value.trim();
      if (!text) return;
      const userMessage = { role: 'user', text, time: new Date().toISOString() };
      const messages = getMessages();
      messages.push(userMessage);
      saveMessages(messages);
      const meta = recordMessageMeta(text);
      if (meta.total === 10) awardAchievement('💬 Chatty User', '💬');
      if (meta.total === 25) awardAchievement('🗣️ Super Chatty', '🗣️');
      if (meta.total === 50) awardAchievement('🏆 Chat Champion', '🏆');
      const visitCount = incrementVisitCount();
      if (visitCount === 5) awardAchievement('🌟 Loyal User', '🌟');
      if (visitCount === 10) awardAchievement('👑 DecoBot Legend', '👑');
      const reply = { role: 'bot', text: getReply(text), time: new Date().toISOString() };
      messages.push(reply);
      saveMessages(messages);
      input.value = '';
      renderChat();
      renderStats();
    }

    function resetData() {
      localStorage.removeItem(STORAGE_KEYS.profile);
      localStorage.removeItem(STORAGE_KEYS.messages);
      localStorage.removeItem(STORAGE_KEYS.activities);
      renderStats();
    }

    function exportLocalStorageBackup() {
      if (!window.JSZip) {
        showToast('Backup library is unavailable right now.');
        return;
      }

      const zip = new JSZip();
      const exportEntries = {};
      const keys = Object.keys(localStorage).filter(key => key.startsWith('decoBot') || key.startsWith('decoBotCurrentQuiz'));

      keys.forEach(key => {
        const raw = localStorage.getItem(key);
        try {
          exportEntries[key] = JSON.parse(raw);
        } catch {
          exportEntries[key] = raw;
        }
      });

      zip.file('decoBot-backup/README.txt', 'DecoBot localStorage backup generated from your browser.\nOpen the JSON files in this folder to inspect your saved data.');
      zip.file('decoBot-backup/manifest.json', JSON.stringify({ exportedAt: new Date().toISOString(), totalKeys: keys.length, keys }, null, 2));
      keys.forEach(key => {
        const value = exportEntries[key];
        zip.file(`decoBot-backup/${key}.json`, JSON.stringify(value, null, 2));
      });

      zip.generateAsync({ type: 'blob' }).then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `decoBot-backup-${new Date().toISOString().slice(0, 10)}.zip`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        showToast('Backup downloaded as a ZIP file.');
      }).catch(() => {
        showToast('Backup failed. Please try again.');
      });
    }

    function exportPdf() {
      const { jsPDF } = window.jspdf;
      const profile = getProfile();
      const activities = getActivities();
      const doc = new jsPDF();
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('DecoBot Activity Report', 14, 18);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text(`Generated for: ${profile.name || 'Explorer'}`, 14, 30);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 38);
      doc.text(`Total activity entries: ${activities.length}`, 14, 50);
      doc.text(`Total minutes tracked: ${activities.reduce((sum, item) => sum + Number(item.minutes || 0), 0)}`, 14, 58);
      doc.text('Saved sessions:', 14, 70);
      activities.slice(0, 8).forEach((item, index) => {
        doc.text(`• ${formatDayLabel(item.date)} — ${item.label || 'Activity'} — ${item.minutes} min — ${item.mood || 'Focused'}`, 18, 80 + index * 8);
      });
      doc.save(`decoBot-${(profile.name || 'user').toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.pdf`);
    }

    saveNameBtn?.addEventListener('click', () => saveWelcomeName(welcomeNameInput.value));
    skipNameBtn?.addEventListener('click', () => saveWelcomeName('Explorer'));
    welcomeNameInput?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        saveWelcomeName(welcomeNameInput.value);
      }
    });
    document.getElementById('loginSubmitBtn')?.addEventListener('click', handleLogin);
    document.getElementById('loginPasswordInput')?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleLogin();
      }
    });

    document.getElementById('profileForm').addEventListener('submit', handleProfile);
    document.getElementById('activityForm').addEventListener('submit', handleActivity);
    document.getElementById('chatForm').addEventListener('submit', handleChat);
    document.getElementById('backupBtn').addEventListener('click', exportLocalStorageBackup);
    document.getElementById('exportBtn').addEventListener('click', exportPdf);

      const micBtn = document.getElementById('micBtn');
      const emojiBtn = document.getElementById('emojiBtn');
      const emojiPicker = document.getElementById('emojiPicker');
      const emojiGrid = emojiPicker?.querySelector('.emoji-grid');
      const chatInput = document.getElementById('chatInput');
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          chatInput.value = (chatInput.value ? chatInput.value + ' ' : '') + transcript;
          chatInput.focus();
        };
        recognition.onend = () => micBtn?.classList.remove('active');
        micBtn?.addEventListener('click', () => { micBtn.classList.add('active'); recognition.start(); });
      } else if (micBtn) {
        micBtn.style.display = 'none';
      }

      if (emojiGrid) {
        emojiGrid.innerHTML = EMOJI_LIST.map(emoji => `<button type="button" class="emoji-chip" data-emoji="${emoji}">${emoji}</button>`).join('');
        emojiGrid.addEventListener('click', (event) => {
          const button = event.target.closest('.emoji-chip');
          if (!button) return;
          const emoji = button.dataset.emoji;
          const start = chatInput.selectionStart || chatInput.value.length;
          const end = chatInput.selectionEnd || start;
          chatInput.setRangeText(emoji, start, end, 'end');
          chatInput.focus();
          emojiPicker.classList.remove('open');
        });
      }
      emojiBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        emojiPicker.classList.toggle('open');
      });
      document.addEventListener('click', (event) => {
        if (!emojiPicker?.contains(event.target) && event.target !== emojiBtn) {
          emojiPicker?.classList.remove('open');
        }
      });

      document.getElementById('chatWindow')?.addEventListener('click', (event) => {
        const quickCommand = event.target.closest('[data-quick-command]');
        if (quickCommand) {
          runQuickCommand(quickCommand.dataset.quickCommand);
          return;
        }
        const button = event.target.closest('.reaction-btn');
        if (!button) return;
        const key = button.dataset.time;
        window.__reactionMap = window.__reactionMap || {};
        const selected = window.__reactionMap[key] || [];
        if (selected.includes(button.dataset.emoji)) selected.splice(selected.indexOf(button.dataset.emoji), 1);
        else selected.push(button.dataset.emoji);
        window.__reactionMap[key] = selected;
        renderChat();
      });

      const appGrid = document.querySelector('.app-grid');
      const commandSidebar = document.querySelector('.command-sidebar');
      function setDashboardCollapsed(isCollapsed) {
        dashboardPanel.classList.toggle('collapsed', isCollapsed);
        appGrid?.classList.toggle('dashboard-collapsed', isCollapsed);
        commandSidebar?.classList.toggle('collapsed', isCollapsed);
        commandSidebar?.setAttribute('aria-hidden', String(isCollapsed));
        collapseDashboardBtn.textContent = isCollapsed ? '▶' : '◀';
        collapseDashboardBtn.setAttribute('aria-label', isCollapsed ? 'Expand dashboard' : 'Collapse dashboard');
      }

      collapseDashboardBtn?.addEventListener('click', () => {
        const isCollapsed = !dashboardPanel.classList.contains('collapsed');
        setDashboardCollapsed(isCollapsed);
      });

      setDashboardCollapsed(true);

      chatSearch.addEventListener('input', renderChat);

      renderQuickCommands();

      const commandItems = [
        { label: 'Hello', desc: 'Start a friendly chat', action: 'hello' },
        { label: 'Joke', desc: 'Get a quick joke', action: 'joke' },
        { label: 'Motivate', desc: 'Boost your focus', action: 'motivate' },
        { label: 'Quiz', desc: 'Launch a quick quiz', action: 'quiz' },
        { label: 'Time', desc: 'Show the current time', action: 'time' },
        { label: 'Date', desc: 'Show today\'s date', action: 'date' },
        { label: 'Budget', desc: 'Check your spending', action: 'budget' },
        { label: 'Mood', desc: 'Log how you feel today', action: 'mood' }
      ];

      function openPalette() {
        commandPalette.classList.add('open');
        commandInput.value = '';
        commandInput.focus();
        renderCommands('');
      }
      function closePalette() { commandPalette.classList.remove('open'); }
      function renderCommands(term) {
        const value = term.toLowerCase();
        commandList.innerHTML = commandItems
          .filter(item => item.label.toLowerCase().includes(value) || item.desc.toLowerCase().includes(value))
          .map(item => `<button class="command-item" type="button" data-action="${item.action}"><span><strong>${item.label}</strong><small>${item.desc}</small></span><span>↵</span></button>`)
          .join('');
      }
      commandInput.addEventListener('input', e => renderCommands(e.target.value));
      commandList.addEventListener('click', e => {
        const item = e.target.closest('.command-item');
        if (!item) return;
        document.getElementById('chatInput').value = item.dataset.action;
        closePalette();
        document.getElementById('chatForm').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      });

      document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); }
        if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) { e.preventDefault(); openPalette(); }
        if (e.key === 'Escape') closePalette();
      });
      commandPalette.addEventListener('click', e => { if (e.target === commandPalette) closePalette(); });

      document.querySelectorAll('[data-quick-command]').forEach(button => {
        button.addEventListener('click', () => runQuickCommand(button.dataset.quickCommand));
      });

      document.getElementById('scrollTopBtn').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      document.getElementById('quickNoteBtn').addEventListener('click', () => {
        const text = window.prompt('Enter your note:');
        if (!text || !text.trim()) return;
        const notes = getNotes();
        notes.unshift(text.trim());
        saveNotes(notes);
        renderHabitBudgetNotes();
        showToast('📝 Note saved!');
      });
      document.getElementById('quickMoodBtn').addEventListener('click', () => {
        const mood = window.prompt('How are you feeling? (Focused, Calm, Creative, Energetic, Happy, Sad, Angry, Tired)');
        if (!mood || !mood.trim()) return;
        const activities = getActivities();
        activities.unshift({
          date: new Date().toISOString().slice(0, 10),
          minutes: 0,
          mood: mood.trim(),
          label: 'Quick mood log'
        });
        saveActivities(activities);
        renderStats();
        showToast('😊 Mood logged!');
      });
      window.addEventListener('scroll', () => {
        const show = window.scrollY > 300;
        scrollTopArrow.classList.toggle('visible', show);
      });
      scrollTopArrow.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

      setInterval(() => {
        liveClock.textContent = new Date().toLocaleTimeString();
      }, 1000);

    document.querySelector('button[aria-label="Notifications"]')?.addEventListener('click', () => {
      const list = getAchievements();
      showToast(list.length ? `🏆 Achievements: ${list.join(', ')}` : 'No achievements yet. Start chatting!');
    });

    document.querySelectorAll('[data-launch-app]').forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        if (intro.dataset.running === 'true') return;
        landingPage.classList.add('page-hidden');
        intro.classList.remove('hidden');
        appShell.style.display = 'none';
        appShell.style.opacity = '0';
        initIntroAnimation();
      });
    });

    applyTheme(localStorage.getItem('decoBotTheme') || 'lite');
    document.getElementById('themeLiteBtn')?.addEventListener('click', () => applyTheme('lite'));
    document.getElementById('themeDarkBtn')?.addEventListener('click', () => applyTheme('dark'));
    document.getElementById('landingThemeLite')?.addEventListener('click', () => applyTheme('lite'));
    document.getElementById('landingThemeDark')?.addEventListener('click', () => applyTheme('dark'));

    renderStats();

    const landingCanvas = document.getElementById('landingCanvas');
    if (landingCanvas) {
      const lc = landingCanvas.getContext('2d');
      let w = 0; let h = 0;
      const dots = [];
      const resize = () => {
        const rect = landingCanvas.getBoundingClientRect();
        w = rect.width;
        h = rect.height;
        landingCanvas.width = Math.max(1, Math.floor(rect.width * (window.devicePixelRatio || 1)));
        landingCanvas.height = Math.max(1, Math.floor(rect.height * (window.devicePixelRatio || 1)));
        lc.setTransform((window.devicePixelRatio || 1), 0, 0, (window.devicePixelRatio || 1), 0, 0);
        dots.length = 0;
        const count = Math.min(45, Math.max(18, Math.floor((w * h) / 14000)));
        for (let i = 0; i < count; i++) dots.push({ x: Math.random() * w, y: Math.random() * h, r: 1.5 + Math.random() * 2.5, s: 0.4 + Math.random() * 0.8, c: ['#8b5cf6', '#38bdf8', '#ec4899', '#22d3ee'][Math.floor(Math.random() * 4)] });
      };
      window.addEventListener('resize', resize);
      resize();
      function drawDots() {
        lc.clearRect(0, 0, w, h);
        dots.forEach(dot => {
          dot.y += dot.s;
          if (dot.y > h + 8) dot.y = -8;
          lc.beginPath();
          lc.fillStyle = dot.c;
          lc.globalAlpha = 0.35;
          lc.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
          lc.fill();
        });
        lc.globalAlpha = 1;
        requestAnimationFrame(drawDots);
      }
      drawDots();
    }
