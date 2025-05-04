 // Communication with backend happens via postMessage to the parent Wix page
    /********************************************
     * WIKIPEDIA LIGHTBOX LOGIC
     ********************************************/
    const wikiLinks = {
      "Sanusi Lamido":        "https://en.wikipedia.org/wiki/Sanusi_Lamido_Sanusi",
      "Goodluck Jonathan":  "https://en.wikipedia.org/wiki/Goodluck_Jonathan",
      "Aminu Tambuwal":     "https://en.wikipedia.org/wiki/Aminu_Tambuwal",
      "Rotimi Amaechi":     "https://en.wikipedia.org/wiki/Rotimi_Amaechi",
      "Bukola Saraki":      "https://en.wikipedia.org/wiki/Bukola_Saraki",
      "Godswill Akpabio":   "https://en.wikipedia.org/wiki/Godswill_Akpabio",
      "Nyesom Wike":        "https://en.wikipedia.org/wiki/Nyesom_Wike",
      "Yemi Osinbajo":      "https://en.wikipedia.org/wiki/Yemi_Osinbajo",
      "Yakubu Dogara":      "https://en.wikipedia.org/wiki/Yakubu_Dogara",
      "Atiku Abubakar":     "https://en.wikipedia.org/wiki/Atiku_Abubakar",
      "Rabiu Kwankwaso":    "https://en.wikipedia.org/wiki/Rabiu_Kwankwaso",
      "Peter Obi":          "https://en.wikipedia.org/wiki/Peter_Obi",
      "Nasir El-Rufai":     "https://en.wikipedia.org/wiki/Nasir_El-Rufai",
      "Kashim Shettima":    "https://en.wikipedia.org/wiki/Kashim_Shettima",
      "Bola Tinubu":        "https://en.wikipedia.org/wiki/Bola_Tinubu"
    };
    const wikiLightbox = document.getElementById('wikiLightbox');
    const wikiIframe   = document.getElementById('wikiIframe');
    const wikiCloseBtn = document.getElementById('wikiLightboxClose');
    let wikiTimer = null;
    function showWikiLightbox(candidateName) {
      let link = wikiLinks[candidateName] || "about:blank";
      wikiIframe.src = link;
      wikiLightbox.style.display = 'flex';
    }
    function closeWikiLightbox() {
      wikiLightbox.style.display = 'none';
      wikiIframe.src = "about:blank";
      if (wikiTimer) { clearTimeout(wikiTimer); wikiTimer = null; }
    }
    wikiLightbox.addEventListener("click", (event) => { if (event.target === wikiLightbox) { closeWikiLightbox(); } });
    wikiCloseBtn.addEventListener('click', closeWikiLightbox);
    /********************************************
     * GLOBALS, DATA STORAGE
     ********************************************/
    let candidates       = [];
    let candidateImages  = {};
    let candidateDetails = {};
    let candidateLikes   = {};
    let votesData        = {};
    let comboComments    = {};
    let loyalists        = {};
    let mapStatesData    = [];
    let selectedPresident= null;
    let selectedVP       = null;
    let currentCombo     = null;
    let userIP           = "123.45.67.89"; // Mock IP
    // DOM References
    const presidentListEl     = document.getElementById('presidentList');
    const vicePresidentListEl = document.getElementById('vicePresidentList');
    const voteBtn             = document.getElementById('voteBtn');
    const buttonFillEl        = document.getElementById('buttonFill');
    const chartBarsEl         = document.getElementById('chartBars');
    const loyalistCombosEl    = document.getElementById('loyalistCombosContainer');
    const comboGridEl         = document.getElementById('comboGrid');
    const voterNameEl         = document.getElementById('voterName');
    const voterPhoneEl        = document.getElementById('voterPhone');
    const voterStateEl        = document.getElementById('voterState');
    const voterCityEl         = document.getElementById('voterCity');
    const voterGenderEl       = document.getElementById('voterGender');
    const voterAgeEl          = document.getElementById('voterAge');
    const voterReferralEl     = document.getElementById('voterReferral');
    // const autoGenCodeEl       = document.getElementById('autoGenCode'); // Removed
    const comboCommentSection = document.getElementById('commentsSection'); // Corrected ID used
    const comboCommentTitle   = document.getElementById('comboCommentTitle');
    const comboCommentName    = document.getElementById('comboCommentName');
    const comboCommentText    = document.getElementById('comboCommentText');
    const comboCommentPostBtn = document.getElementById('comboCommentPostBtn');
    const comboCommentListEl  = document.getElementById('comboCommentList');
    const contactUsBtn        = document.getElementById('contactUsBtn');
    const lightboxOverlay     = document.getElementById('lightboxOverlay');
    const lightboxClose       = document.getElementById('lightboxClose');
    const lightboxForm        = document.getElementById('lightboxForm');
    const contactFullNameEl   = document.getElementById('contactFullName');
    const contactPhoneEl      = document.getElementById('contactPhone');
    const contactEmailEl      = document.getElementById('contactEmail');
    const contactMessageEl    = document.getElementById('contactMessage');
    const lightboxSubmitMsg   = document.getElementById('lightboxSubmitMsg');
    const mobileMenuBtn       = document.getElementById('mobileMenuBtn');
    const mobileNavPanel      = document.getElementById('mobileNavPanel');
    const mobileNavCloseBtn   = mobileNavPanel.querySelector('.menu-close-btn');
    const mobileNavLinks      = mobileNavPanel.querySelectorAll('nav a');
    const getReferralCodeBtn  = document.getElementById('getReferralCodeBtn'); // New button
    const referralLightbox    = document.getElementById('referralLightbox'); // New lightbox
    const referralLightboxClose = document.getElementById('referralLightboxClose'); // New close button
    const referralRequestForm = document.getElementById('referralRequestForm'); // New form
    const referralNameEl      = document.getElementById('referralName'); // New input
    const referralContactEl   = document.getElementById('referralContact'); // New input
    const referralSubmitMsg   = document.getElementById('referralSubmitMsg'); // New message div
    // amCharts Globals
    let mapChart;
    let polygonSeries;
    let pieRoot;
    let pieChart;
    /********************************************
     * COUNTDOWN TIMER
     ********************************************/
    const countdownEl = document.getElementById('countdownTimer');
    const endMs = Date.now() + (3 * 24 * 60 * 60 + 2 * 60 * 60 + 3 * 60 + 45) * 1000;
    function updateCountdown() {
      const current = Date.now();
      const diff = endMs - current;
      if (diff <= 0) {
        countdownEl.textContent = "Poll Ended!";
        clearInterval(countdownInterval);
        return;
      }
      let s = Math.floor(diff / 1000);
      let d = Math.floor(s / 86400); s %= 86400;
      let h = Math.floor(s / 3600); s %= 3600;
      let m = Math.floor(s / 60); s %= 60;
      countdownEl.textContent = `Poll Ends: ${d}d ${h}h ${m}m ${s}s`;
    }
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
    /********************************************
     * INPUT VALIDATION & EVENT LISTENERS
     ********************************************/
    voterPhoneEl.addEventListener('input', () => {
      voterPhoneEl.value = voterPhoneEl.value.replace(/\D/g, '').slice(0, 11);
      updateProgress();
    });
    voterAgeEl.addEventListener('input', () => {
      voterAgeEl.value = voterAgeEl.value.replace(/\D/g, '');
      updateProgress();
    });
     contactPhoneEl.addEventListener('input', () => {
      contactPhoneEl.value = contactPhoneEl.value.replace(/\D/g, '').slice(0,11);
    });
    voterNameEl.addEventListener('input', updateProgress);
    voterStateEl.addEventListener('change', updateProgress);
    voterCityEl.addEventListener('change', updateProgress);
    voterGenderEl.addEventListener('change', updateProgress);
    if (presidentListEl) presidentListEl.addEventListener('click', updateProgress);
    if (vicePresidentListEl) vicePresidentListEl.addEventListener('click', updateProgress);
    if (contactUsBtn) {
        contactUsBtn.addEventListener('click', () => {
          if (lightboxOverlay) lightboxOverlay.style.display = 'flex';
        });
    }
     if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            if (lightboxOverlay) lightboxOverlay.style.display = 'none';
        });
    }
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                lightboxOverlay.style.display = 'none';
            }
        });
    }
    if (lightboxForm) {
        lightboxForm.addEventListener('submit', (e) => {
          e.preventDefault();
          let fn = contactFullNameEl.value.trim();
          let ph = contactPhoneEl.value.trim();
          let em = contactEmailEl.value.trim();
          if (!fn || ph.length !== 11 || !ph.startsWith('0') || !em.includes('@') || !em.includes('.')) {
            alert("Please fill out all contact form fields correctly!");
            return;
          }
          if (lightboxSubmitMsg) lightboxSubmitMsg.style.display = 'block';
          lightboxForm.style.display = 'none';
          // Simulate submission
          setTimeout(() => {
            if (lightboxOverlay) lightboxOverlay.style.display = 'none';
            if (lightboxSubmitMsg) lightboxSubmitMsg.style.display = 'none';
            lightboxForm.style.display = 'flex';
            contactFullNameEl.value = '';
            contactPhoneEl.value = '';
            contactEmailEl.value = '';
            contactMessageEl.value = '';
          }, 2500);
        });
    }
    // --- Mobile Menu Listeners ---
    if (mobileMenuBtn && mobileNavPanel) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavPanel.classList.add('active');
        });
    }
    if (mobileNavCloseBtn && mobileNavPanel) {
         mobileNavCloseBtn.addEventListener('click', () => {
            mobileNavPanel.classList.remove('active');
        });
    }
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = link.getAttribute('href'); // Get '#sectionId'
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (mobileNavPanel) {
                mobileNavPanel.classList.remove('active'); // Close menu after clicking link
            }
        });
    });
    // --- Referral Request Lightbox Listeners ---
    if (getReferralCodeBtn && referralLightbox) {
        getReferralCodeBtn.addEventListener('click', () => {
            referralLightbox.style.display = 'flex'; // Show referral lightbox
        });
    }
    if (referralLightboxClose && referralLightbox) {
        referralLightboxClose.addEventListener('click', () => {
            referralLightbox.style.display = 'none'; // Hide referral lightbox
            // Reset form appearance if needed
             if (referralSubmitMsg) referralSubmitMsg.style.display = 'none';
             if (referralRequestForm) referralRequestForm.style.display = 'flex';
        });
    }
     if (referralLightbox) {
        referralLightbox.addEventListener('click', (e) => {
            if (e.target === referralLightbox) { // Click on overlay background
                referralLightbox.style.display = 'none';
                 if (referralSubmitMsg) referralSubmitMsg.style.display = 'none';
                 if (referralRequestForm) referralRequestForm.style.display = 'flex';
            }
        });
    }
    if (referralRequestForm) {
        referralRequestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = referralNameEl.value.trim();
            const contact = referralContactEl.value.trim();
            const submitButton = referralRequestForm.querySelector('button[type="submit"]');

            if (!name || !contact) {
                alert("Please enter your name and phone/email.");
                return;
            }

            // Disable button, show loading
            if(submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
            }

            const requestPayload = { name, contact };
            console.log("Sending referral request message to parent page:", requestPayload);

            // Send message to parent Wix page
            window.parent.postMessage({
                type: 'requestReferralCode',
                payload: requestPayload
            }, '*');

            // Show confirmation message in lightbox, hide form
            if (referralSubmitMsg) referralSubmitMsg.style.display = 'block';
            referralRequestForm.style.display = 'none';

            // Re-enable button and optionally close lightbox after delay
            setTimeout(() => {
                if(submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Request Code';
                }
                // Optionally close lightbox automatically
                // if (referralLightbox) referralLightbox.style.display = 'none';
                // if (referralRequestForm) referralRequestForm.style.display = 'flex'; // Reset form visibility for next time
                // referralNameEl.value = ''; // Clear fields
                // referralContactEl.value = '';
            }, 3000); // Adjust delay as needed
        });
    }
    /********************************************
     * HELPER FUNCTIONS
     ********************************************/
    function updateProgress() {
      let steps = 8;
      let done = 0;
      if (selectedPresident) done++;
      if (selectedVP) done++;
      if (voterNameEl?.value.trim()) done++;
      if (voterPhoneEl?.value.length === 11 && voterPhoneEl.value.startsWith('0')) done++;
      if (voterStateEl?.value) done++;
      if (voterCityEl?.value) done++;
      if (voterGenderEl?.value) done++;
      if (voterAgeEl?.value.trim()) done++;
      let ratio = (steps > 0) ? (done / steps) * 100 : 0;
      if (buttonFillEl) buttonFillEl.style.width = ratio + "%";
      if (voteBtn) {
          if (done === steps) {
            voteBtn.disabled = false;
            voteBtn.classList.add('bounce');
          } else {
            voteBtn.disabled = true;
            voteBtn.classList.remove('bounce');
          }
      }
    }
    function formatNumber(num) {
      if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
      if (num >= 1000)    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
      return String(num);
    }
    function generateReferralCode() { // Still needed locally for display before vote confirmation
      return "REF" + Math.floor(Math.random() * 90000 + 10000);
    }
    function imageError(imgElement) {
        imgElement.onerror = null;
        imgElement.src = 'https://placehold.co/80x80/cccccc/ffffff?text=N/A';
    }
    function showHeartBlast(event) {
        const numHearts = 8;
        const duration = 1200;
        for (let i = 0; i < numHearts; i++) {
            const heart = document.createElement('span');
            heart.classList.add('heart-particle');
            heart.textContent = '♥';
            const x = event.clientX;
            const y = event.clientY;
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            const randomX = (Math.random() - 0.5) * 100;
            const randomY = -60 - Math.random() * 50;
            heart.style.setProperty('--tx', `${randomX}px`);
            heart.style.setProperty('--ty', `${randomY}px`);
            document.body.appendChild(heart);
            setTimeout(() => { heart.remove(); }, duration);
        }
    }
    /********************************************
     * DATA READING FUNCTIONS (FROM HIDDEN TABLES - Optional)
     ********************************************/
    function readCandidateTable() {
      const tbl = document.getElementById('candidateDataTable');
      if (!tbl) return;
      const tbody = tbl.querySelector('tbody');
      if (!tbody) return; // Check if tbody exists
      const rows = tbody.querySelectorAll('tr');
      candidates = []; // Reset arrays
      candidateImages = {};
      candidateDetails = {};
      candidateLikes = {};
      rows.forEach(r => {
        const c = r.querySelectorAll('td');
        if (c.length >= 6) { // Basic check for enough cells
            const name = c[0].textContent.trim();
            const imgUrl = c[1].textContent.trim();
            const age = c[3].textContent.trim();
            const zone = c[4].textContent.trim();
            const likes = parseInt(c[5].textContent.trim()) || 0;
            if (name) { // Ensure name is not empty
                candidates.push(name);
                candidateImages[name] = imgUrl || 'https://placehold.co/80x80/cccccc/ffffff?text=N/A';
                candidateDetails[name] = { age, zone };
                candidateLikes[name] = likes;
            }
        }
      });
      // console.log("Read candidates from table:", candidates.length);
    }
    function readComboTable() {
      const tbl= document.getElementById('comboDataTable');
      if (!tbl) return;
      const tbody = tbl.querySelector('tbody');
      if (!tbody) return; // Check if tbody exists
      const rows= tbody.querySelectorAll('tr');
      votesData = {}; // Reset
      rows.forEach(r => {
        let c= r.querySelectorAll('td');
         if (c.length >= 3) {
            let pres= c[0].textContent.trim();
            let vp  = c[1].textContent.trim();
            let vt  = parseInt(c[2].textContent.trim())||0;
            if (pres && vp) {
                let key = `${pres} & ${vp}`;
                votesData[key] = vt;
            }
         }
      });
       // console.log("Read combos from table:", Object.keys(votesData).length);
    }
     function readUserDataTable() {
        const tbl = document.getElementById('userDataTable');
        if (!tbl) return;
        const tbody = tbl.querySelector('tbody');
        if (!tbody) return; // Check if tbody exists
        const rows = tbody.querySelectorAll('tr');
        let allComments = [];
        comboComments = {}; // Reset
        rows.forEach(r => {
            let c = r.querySelectorAll('td');
            if (c.length >= 5) { // Need at least ID, Combo, ParentID, Name, Comment
                // Use optional chaining and nullish coalescing for safety
                let id = parseInt(c[0]?.textContent.trim() ?? '0');
                let combo = c[1]?.textContent.trim() ?? '';
                let pid = parseInt(c[2]?.textContent.trim() ?? '0');
                let nm = c[3]?.textContent.trim() ?? '';
                let tx = c[4]?.textContent.trim() ?? '';
                if (id && combo) { // Require valid ID and Combo
                    allComments.push({
                        id: id, // Use ID from table
                        comboKey: combo,
                        parentID: pid,
                        name: nm || "Anonymous",
                        text: tx || "(No comment)",
                        replies: []
                    });
                }
            }
        });
        // Build hierarchy
        let commentsById = {};
        allComments.forEach(comment => commentsById[comment.id] = comment);
        allComments.forEach(comment => {
            if (comment.parentID !== 0 && commentsById[comment.parentID]) {
                if (!commentsById[comment.parentID].replies) {
                    commentsById[comment.parentID].replies = [];
                }
                commentsById[comment.parentID].replies.push(comment);
            }
        });
        // Populate the main comboComments object with top-level comments
        allComments.forEach(comment => {
            if (comment.parentID === 0) {
                if (!comboComments[comment.comboKey]) {
                    comboComments[comment.comboKey] = [];
                }
                comboComments[comment.comboKey].push(comment);
            }
        });
        // console.log("Read user comments from table.");
    }
    function readLoyalistDataTable() {
      const tbl= document.getElementById('loyalistDataTable');
       if (!tbl) return;
       const tbody = tbl.querySelector('tbody');
       if (!tbody) return; // Check if tbody exists
      const rows= tbody.querySelectorAll('tr');
      loyalists = {}; // Reset
      rows.forEach(r => {
        let c= r.querySelectorAll('td');
         if (c.length >= 8) {
            let code= c[0]?.textContent.trim() ?? '';
            let loyName= c[1]?.textContent.trim() ?? '';
            let city= c[2]?.textContent.trim() ?? '';
            let combo= c[3]?.textContent.trim() ?? '';
            let supporters= parseInt(c[4]?.textContent.trim() ?? '0');
            let donation= parseFloat(c[5]?.textContent.trim() ?? '0');
            let img1= c[6]?.textContent.trim() ?? '';
            let img2= c[7]?.textContent.trim() ?? '';
            if (code) { // Require referral code
                loyalists[code.toUpperCase()] = { // Standardize code to uppercase
                    loyalistName: loyName,
                    city: city,
                    combo: combo,
                    supporters: supporters,
                    donation: donation,
                    comboImg1: img1 || 'https://placehold.co/50x50/cccccc/ffffff?text=N/A',
                    comboImg2: img2 || 'https://placehold.co/50x50/cccccc/ffffff?text=N/A'
                };
            }
         }
      });
      // console.log("Read loyalists from table:", Object.keys(loyalists).length);
    }
    /********************************************
     * UI RENDERING FUNCTIONS
     ********************************************/
    function populateCandidateList(listEl, candidatesArray, isPresidentList) {
      if (!listEl) return;
      listEl.innerHTML = '';
      candidatesArray.forEach(candidateName => {
        const li = document.createElement('li');
        li.className = 'candidate-item';
        li.dataset.candidateName = candidateName;
        const img = document.createElement('img');
        img.className = 'candidate-photo';
        img.src = candidateImages[candidateName] || 'https://placehold.co/80x80/cccccc/ffffff?text=N/A';
        img.alt = candidateName;
        img.onerror = () => imageError(img);
        const nameDiv = document.createElement('div');
        nameDiv.className = 'candidate-name';
        nameDiv.textContent = candidateName;
        const details = candidateDetails[candidateName] || { age: '?', zone: '?' };
        const infoDiv = document.createElement('div');
        infoDiv.className = 'candidate-details';
        infoDiv.textContent = `${details.age} - ${details.zone}`;
        const likeDiv = document.createElement('div');
        likeDiv.className = 'like-container';
        const likeBtn = document.createElement('button');
        likeBtn.className = 'like-btn';
        likeBtn.innerHTML = '♥';
        const likeCountSpan = document.createElement('span');
        likeCountSpan.className = 'like-count';
        likeCountSpan.textContent = formatNumber(candidateLikes[candidateName] || 0);
        // --- Like button click listener (Uses postMessage) ---
        likeBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          const originalLikes = candidateLikes[candidateName] || 0;
          candidateLikes[candidateName] = originalLikes + 1; // Optimistic UI update
          updateCandidateLikesUI(candidateName);
          showHeartBlast(event);
          console.log(`Liking ${candidateName}... (Sending message to page)`);
          likeBtn.disabled = true;
          // Send message to parent Wix page
          window.parent.postMessage({
              type: 'recordLike',
              payload: { candidateName: candidateName }
          }, '*');
          // Re-enable button after a short delay
          setTimeout(() => { likeBtn.disabled = false; }, 1000);
        });
        // --- End Like button ---
        likeDiv.appendChild(likeBtn);
        likeDiv.appendChild(likeCountSpan);
        li.addEventListener('click', () => {
          if (isPresidentList) {
            if (selectedPresident !== candidateName) {
                selectedPresident = candidateName;
                highlightSelected(presidentListEl, candidateName);
                showWikiLightbox(candidateName);
            }
          } else {
             if (selectedVP !== candidateName) {
                selectedVP = candidateName;
                highlightSelected(vicePresidentListEl, candidateName);
                showWikiLightbox(candidateName);
             }
          }
          updateProgress();
        });
        li.appendChild(img);
        li.appendChild(nameDiv);
        li.appendChild(infoDiv);
        li.appendChild(likeDiv);
        listEl.appendChild(li);
      });
    }
    function highlightSelected(listEl, selectedName) {
        if (!listEl) return;
        const items = listEl.querySelectorAll('.candidate-item');
        items.forEach(item => {
            if (item.dataset.candidateName === selectedName) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }
    function updateCandidateLikesUI(candidateName) {
        const currentLikes = candidateLikes[candidateName] || 0;
        const formattedLikes = formatNumber(currentLikes);
        const likeElements = document.querySelectorAll(`.candidate-item[data-candidate-name="${candidateName}"] .like-count`);
        likeElements.forEach(span => {
            span.textContent = formattedLikes;
        });
    }
    /********************************************
     * VOTING LOGIC
     ********************************************/
    if (voteBtn) {
        // --- Vote button click listener (Uses postMessage) ---
        voteBtn.addEventListener('click', () => {
          // Validations
          if (voteBtn.disabled) { return; }
          if (!selectedPresident || !selectedVP) { alert("Please select both a President and a Vice President."); return; }
          if (selectedPresident === selectedVP) { alert("President and Vice President cannot be the same person."); return; }
          const name = voterNameEl?.value.trim();
          const phone = voterPhoneEl?.value.trim();
          const state = voterStateEl?.value;
          const city = voterCityEl?.value;
          const gender = voterGenderEl?.value;
          const age = voterAgeEl?.value.trim();
          if (!name || phone.length !== 11 || !phone.startsWith('0') || !state || !city || !gender || !age) { alert("Please ensure all voter information fields are filled correctly."); return; }
          // Disable button and show loading state
          voteBtn.disabled = true;
          const originalButtonText = voteBtn.querySelector('.vote-text').textContent;
          voteBtn.querySelector('.vote-text').textContent = 'Voting...';
          voteBtn.classList.remove('bounce');
          // Prepare Vote Data
          const comboKey = `${selectedPresident} & ${selectedVP}`;
          const typedReferral = voterReferralEl?.value.trim().toUpperCase() || null; // Get referral if entered
          const votePayload = {
              name: name, phone: phone, state: state, city: city, gender: gender,
              age: parseInt(age) || 0, combo: comboKey, referralCodeUsed: typedReferral
          };
          console.log("Sending vote message to parent page:", votePayload);
          // Send message to parent Wix page
          window.parent.postMessage({
              type: 'recordVote',
              payload: votePayload
          }, '*');
          // Optimistic UI Update & Confirmation
          votesData[comboKey] = (votesData[comboKey] || 0) + 1;
          // Don't add loyalist locally here, wait for backend confirmation via message
          if (typedReferral && loyalists[typedReferral]) { loyalists[typedReferral].supporters++; }
          renderChart();
          renderComboGrid();
          renderComboLoyalists();
          renderPieChart();
          alert(`Vote submitted for ${comboKey}!`); // Simpler alert now
          // Clear the referral input field after voting
          if (voterReferralEl) voterReferralEl.value = '';
          // Re-enable button after delay
          setTimeout(() => {
              voteBtn.disabled = false;
              voteBtn.querySelector('.vote-text').textContent = originalButtonText;
              updateProgress();
          }, 2000);
        });
        // --- End Vote button ---
    }
    /********************************************
     * BAR CHART RENDER (Using DIVs)
     ********************************************/
    function renderChart() {
        if (!chartBarsEl) return;
        chartBarsEl.innerHTML = '';
        const sortedVotes = Object.entries(votesData).sort(([,a],[,b]) => b - a);
        if (!sortedVotes.length) {
            chartBarsEl.innerHTML = "<p>No votes recorded yet.</p>";
            return;
        }
        const maxVotes = sortedVotes.length > 0 ? sortedVotes[0][1] : 0;
        sortedVotes.forEach(([combo, count]) => {
            const row = document.createElement('div');
            row.className = 'chart-bar';
            const labelDiv = document.createElement('div');
            labelDiv.className = 'bar-label';
            labelDiv.textContent = combo;
            labelDiv.title = `${combo} (${formatNumber(count)} votes)`;
            const countSpan = document.createElement('span');
            countSpan.className = 'vote-count-label';
            countSpan.textContent = ` (${formatNumber(count)})`;
            labelDiv.appendChild(countSpan);
            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';
            const barFill = document.createElement('div');
            barFill.className = 'bar-fill';
            const percentage = (maxVotes > 0) ? (count / maxVotes) * 100 : 0;
            barFill.style.width = `${percentage.toFixed(1)}%`;
            barContainer.appendChild(barFill);
            row.appendChild(labelDiv);
            row.appendChild(barContainer);
            chartBarsEl.appendChild(row);
        });
    }
    /********************************************
     * COMBO GRID RENDER
     ********************************************/
    function renderComboGrid() {
        if (!comboGridEl) return;
        comboGridEl.innerHTML = '';
        const sortedVotes = Object.entries(votesData).sort(([,a],[,b]) => b - a);
        if (!sortedVotes.length) {
            comboGridEl.innerHTML = "<p>No combinations voted for yet.</p>";
            return;
        }
        sortedVotes.forEach(([combo, count]) => {
            const card = document.createElement('div');
            card.className = 'combo-card';
            card.dataset.comboKey = combo;
            const shareBtn = document.createElement('button');
            shareBtn.className = 'share-btn';
            shareBtn.innerHTML = '🔗';
            shareBtn.title = `Share ${combo}`;
            shareBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                const shareText = `Check out the ${combo} combo in the 2027 Nigeria Election Poll! Vote here: ${window.location.href}`;
                if (navigator.share) {
                     navigator.share({ title: 'Nigeria Election Poll Combo', text: shareText })
                       .then(() => console.log('Successful share'))
                       .catch((error) => console.log('Error sharing:', error));
                } else {
                    navigator.clipboard.writeText(shareText)
                        .then(() => alert(`Sharing info for ${combo} copied to clipboard!`))
                        .catch(err => alert('Failed to copy sharing info.'));
                }
            });
            card.appendChild(shareBtn);
            const topDiv = document.createElement('div');
            topDiv.className = 'combo-top';
            const [presName, vpName] = combo.split(" & ");
            const imgPres = document.createElement('img');
            imgPres.className = 'combo-img';
            imgPres.src = candidateImages[presName] || 'https://placehold.co/55x55/cccccc/ffffff?text=N/A';
            imgPres.alt = presName;
            imgPres.onerror = () => imageError(imgPres);
            const imgVP = document.createElement('img');
            imgVP.className = 'combo-img';
            imgVP.src = candidateImages[vpName] || 'https://placehold.co/55x55/cccccc/ffffff?text=N/A';
            imgVP.alt = vpName;
            imgVP.onerror = () => imageError(imgVP);
            topDiv.appendChild(imgPres);
            topDiv.appendChild(imgVP);
            card.appendChild(topDiv);
            const titleDiv = document.createElement('div');
            titleDiv.className = 'combo-title';
            titleDiv.textContent = combo;
            card.appendChild(titleDiv);
            const statsDiv = document.createElement('div');
            statsDiv.className = 'combo-stats';
            const voteSpan = document.createElement('span');
            voteSpan.className = 'vote-heart';
            voteSpan.innerHTML = `♥ ${formatNumber(count)}`;
            statsDiv.appendChild(voteSpan);
            const commentsArray = comboComments[combo] || [];
            let totalComments = 0;
            function countCommentsRecursive(comments) {
                comments.forEach(comment => {
                    totalComments++;
                    if (comment.replies && comment.replies.length > 0) {
                        countCommentsRecursive(comment.replies);
                    }
                });
            }
            countCommentsRecursive(commentsArray);
            const commentSpan = document.createElement('span');
            commentSpan.className = 'comment-icon';
            commentSpan.innerHTML = `💬 ${formatNumber(totalComments)}`;
            statsDiv.appendChild(commentSpan);
            card.appendChild(statsDiv);
            card.addEventListener('click', () => { openComboComments(combo); });
            comboGridEl.appendChild(card);
        });
    }
    /********************************************
     * LOYALISTS RENDER (Top Combo Peddlers)
     ********************************************/
function renderComboLoyalists() {
  if (!loyalistCombosEl) return; // Ensure the container element exists
  loyalistCombosEl.innerHTML = '';

  // 1) Group loyalists by combo
  const comboMap = {};
  Object.entries(loyalists).forEach(([refCode, loyData]) => {
    const comboName = loyData.combo;
    if (!comboName) return;
    if (!comboMap[comboName]) {
      comboMap[comboName] = [];
    }
    comboMap[comboName].push({
      code: refCode,
      name: loyData.loyalistName || "Anonymous",
      city: loyData.city || "Unknown",
      supporters: loyData.supporters || 0,
      comboImg1: loyData.comboImg1 || "",
      comboImg2: loyData.comboImg2 || ""
    });
  });

  const medalIcons = ["🥇", "🥈", "🥉"]; // for top 3 places
  let foundAny = false;

  // 2) Render each combo that has loyalists
  Object.keys(comboMap).forEach((comboName) => {
    const arr = comboMap[comboName];
    if (!arr || arr.length === 0) return;

    foundAny = true;

    // Sort the loyalists for this combo by descending supporters
    arr.sort((a, b) => b.supporters - a.supporters);

    // We'll use the first loyalist's record to get the combo images
    const { comboImg1, comboImg2 } = arr[0];

    // Create outer wrapper for this combo block
    const comboWrapper = document.createElement('div');
    comboWrapper.className = 'loyalist-combo-wrap';

    // Add a title for the combo
    const comboTitle = document.createElement('h4');
    comboTitle.className = 'loyalist-combo-title';
    comboTitle.textContent = comboName;
    comboWrapper.appendChild(comboTitle);

    // Create the flex container that holds images on the left, influencers on the right
    const flexContainer = document.createElement('div');
    flexContainer.className = 'loyalist-flex';

    // Left column: images
    const imagesCol = document.createElement('div');
    imagesCol.className = 'loyalist-images-col';

    const img1 = document.createElement('img');
    img1.className = 'loyalist-square-img';
    img1.src = comboImg1 || 'https://placehold.co/50x50';
    img1.onerror = () => { img1.src = 'https://placehold.co/50x50'; };

    const img2 = document.createElement('img');
    img2.className = 'loyalist-square-img';
    img2.src = comboImg2 || 'https://placehold.co/50x50';
    img2.onerror = () => { img2.src = 'https://placehold.co/50x50'; };

    imagesCol.appendChild(img1);
    imagesCol.appendChild(img2);

    // Right column: influencer rows
    const influencersCol = document.createElement('div');
    influencersCol.className = 'loyalist-influencers-col';

    arr.forEach((loy, index) => {
      // Decide medal or star
      let icon = medalIcons[index] || '⭐';

      const row = document.createElement('div');
      row.className = 'loyalist-row';

      // Build the influencer text
      const textLine = document.createElement('div');
      textLine.className = 'loyalist-info';
      textLine.innerHTML = `
        ${icon} <strong>${loy.name}</strong> from <em>${loy.city}</em>
        influenced <strong>${loy.supporters.toLocaleString()}</strong> supporters
        to vote <em>${comboName}</em>.
      `;

      row.appendChild(textLine);
      influencersCol.appendChild(row);
    });

    // Assemble the flex container
    flexContainer.appendChild(imagesCol);
    flexContainer.appendChild(influencersCol);

    // Add the flex container into the combo wrapper
    comboWrapper.appendChild(flexContainer);

    // Finally, attach this combo wrapper to the main container
    loyalistCombosEl.appendChild(comboWrapper);
  });

  // 3) If no combos had loyalists, show a placeholder
  if (!foundAny) {
    loyalistCombosEl.innerHTML = "<p>No loyalist data available for any combo yet.</p>";
  }
}




    /********************************************
     * COMMENTS RENDER & INTERACTION
     ********************************************/
     function renderComboComments() {
        if (!comboCommentListEl || !currentCombo) return;
        comboCommentListEl.innerHTML = '';
        const commentsForCombo = comboComments[currentCombo] || [];
        if (commentsForCombo.length === 0) {
            comboCommentListEl.innerHTML = '<p>Be the first to comment on this combo!</p>';
            return;
        }
        commentsForCombo.forEach(comment => {
            if (!comment.parentID || comment.parentID === 0) {
                 comboCommentListEl.appendChild(createCommentElement(comment));
            }
        });
    }
     function createCommentElement(commentData) {
        const wrap = document.createElement('div');
        wrap.className = 'combo-comment-item';
        wrap.dataset.commentId = commentData.id;
        const authorDiv = document.createElement('div');
        authorDiv.className = 'comment-author';
        authorDiv.textContent = commentData.name || "Anonymous";
        const textDiv = document.createElement('div');
        textDiv.className = 'comment-text';
        textDiv.textContent = commentData.text || "(No comment)";
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'comment-actions';
        actionsDiv.textContent = 'Reply';
        actionsDiv.style.cursor = 'pointer';
        const replyFormDiv = document.createElement('div');
        replyFormDiv.className = 'reply-form';
        const replyNameInput = document.createElement('input');
        replyNameInput.className = 'reply-input';
        replyNameInput.type = 'text';
        replyNameInput.placeholder = 'Your Name';
        const replyTextInput = document.createElement('textarea');
        replyTextInput.className = 'reply-textarea';
        replyTextInput.rows = 2;
        replyTextInput.placeholder = 'Your reply...';
        const replyBtn = document.createElement('button');
        replyBtn.className = 'reply-btn';
        replyBtn.textContent = 'Post Reply';
        actionsDiv.addEventListener('click', () => {
            const isVisible = replyFormDiv.style.display === 'flex';
            replyFormDiv.style.display = isVisible ? 'none' : 'flex';
        });
        // --- Reply button click listener (Uses postMessage) ---
        replyBtn.addEventListener('click', () => {
            const replyName = replyNameInput.value.trim();
            const replyText = replyTextInput.value.trim();
            if (!replyName || !replyText) { alert("Please enter name and reply."); return; }
            replyBtn.disabled = true;
            const originalButtonText = replyBtn.textContent;
            replyBtn.textContent = 'Posting...';
            const replyPayload = {
                parentID: commentData.id,
                name: replyName,
                text: replyText,
                comboKey: commentData.comboKey
            };
            console.log("Sending reply message to parent page:", replyPayload);
            // Send message to parent Wix page
            window.parent.postMessage({
                type: 'addComment',
                payload: replyPayload
            }, '*');
            // Optimistic UI Update
            const tempReplyData = { ...replyPayload, id: `temp-${Date.now()}`, replies: [] };
            if (!commentData.replies) commentData.replies = [];
            commentData.replies.push(tempReplyData);
            replyNameInput.value = '';
            replyTextInput.value = '';
            replyFormDiv.style.display = 'none';
            renderComboComments();
            renderComboGrid();
             setTimeout(() => {
                replyBtn.disabled = false;
                replyBtn.textContent = originalButtonText;
             }, 1500);
        });
        // --- End Reply button ---
        replyFormDiv.appendChild(replyNameInput);
        replyFormDiv.appendChild(replyTextInput);
        replyFormDiv.appendChild(replyBtn);
        wrap.appendChild(authorDiv);
        wrap.appendChild(textDiv);
        wrap.appendChild(actionsDiv);
        wrap.appendChild(replyFormDiv);
        if (commentData.replies && commentData.replies.length > 0) {
            const repliesContainer = document.createElement('div');
            repliesContainer.className = 'comment-replies';
            commentData.replies.forEach(reply => {
                repliesContainer.appendChild(createCommentElement(reply));
            });
            wrap.appendChild(repliesContainer);
        }
        return wrap;
    }
     // --- Comment Post button listener (Uses postMessage) ---
    if (comboCommentPostBtn) {
        comboCommentPostBtn.addEventListener('click', () => {
          if (!currentCombo) { alert("No combo selected..."); return; }
          const name = comboCommentName?.value.trim();
          const text = comboCommentText?.value.trim();
          if (!name || !text) { alert("Please enter name and comment."); return; }
          comboCommentPostBtn.disabled = true;
          const originalButtonText = comboCommentPostBtn.textContent;
          comboCommentPostBtn.textContent = 'Posting...';
          const commentPayload = {
            parentID: 0, name: name, text: text, comboKey: currentCombo
          };
          console.log("Sending new comment message to parent page:", commentPayload);
          // Send message to parent Wix page
          window.parent.postMessage({
              type: 'addComment',
              payload: commentPayload
          }, '*');
          // Optimistic UI update
          const tempCommentData = { ...commentPayload, id: `temp-${Date.now()}`, replies: [] };
          if (!comboComments[currentCombo]) comboComments[currentCombo] = [];
          comboComments[currentCombo].push(tempCommentData);
          // Clear form and re-render
          if (comboCommentName) comboCommentName.value = '';
          if (comboCommentText) comboCommentText.value = '';
          renderComboComments();
          renderComboGrid();
          // Re-enable button after delay
          setTimeout(() => {
              comboCommentPostBtn.disabled = false;
              comboCommentPostBtn.textContent = originalButtonText;
          }, 1500);
        });
    }
    // --- End Comment Post button ---
     function openComboComments(comboKey) {
        currentCombo = comboKey;
        const sectionElement = document.getElementById('commentsSection'); // Use the correct ID
        if (sectionElement) {
            sectionElement.classList.add('active');
            if (comboCommentTitle) comboCommentTitle.textContent = `Comments for: ${comboKey}`;
            renderComboComments();
            sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.error("Comment section element with ID 'commentsSection' not found.");
        }
    }
    /********************************************
     * amCharts MAP RENDER
     ********************************************/
    function initMap() {
      am5.ready(function() {
          try {
            let root = am5.Root.new("nigeriaMap");
            root.setThemes([am5themes_Animated.new(root)]);
            mapChart = root.container.children.push(
              am5map.MapChart.new(root, {
                panX: "rotateX", panY: "none", wheelX: "zoom", wheelY: "none",
                projection: am5map.geoMercator(), maxZoomLevel: 4, minZoomLevel: 0.8
              })
            );
            polygonSeries = mapChart.series.push(
              am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_nigeriaLow, valueField: "value", calculateAggregates: true
              })
            );
            polygonSeries.set("heatRules", [{
              target: polygonSeries.mapPolygons.template, min: am5.color(0xccffcc),
              max: am5.color(0x006400), dataField: "value", key: "fill", logarithmic: true
            }]);
            polygonSeries.mapPolygons.template.setAll({
              interactive: true,
              tooltipHTML: `<div style="min-width:150px; font-family: 'Montserrat', sans-serif;">{tooltipHTML}</div>`,
              templateField: "polygonSettings"
            });
             polygonSeries.mapPolygons.template.states.create("hover", { fill: am5.color(0xffa500) });
            mapChart.set("zoomControl", am5map.ZoomControl.new(root, {}));
            renderMap(); // Render initially (might use empty data if mapStatesData isn't ready)
          } catch (e) {
              console.error("Error initializing amCharts map:", e);
              const mapDiv = document.getElementById("nigeriaMap");
              if (mapDiv) mapDiv.innerHTML = "<p style='color:red; text-align:center; padding: 20px;'>Error loading map. Please refresh.</p>";
          }
      });
    }
    function computeStateTopCombosFromCMS() {
        let stateResults = {};
        if (!Array.isArray(mapStatesData) || mapStatesData.length === 0) {
            // console.warn("computeStateTopCombosFromCMS: mapStatesData is empty or not an array."); // Less verbose
            return stateResults;
        }
        const keyToComboNameMap = {
            "Bola Tinubu & Kashim Shettima": "Bola Tinubu & Kashim Shettima", "tinubuKashim": "Bola Tinubu & Kashim Shettima",
            "Atiku Abubakar & Nyesom Wike": "Atiku Abubakar & Nyesom Wike", "atikuWike": "Atiku Abubakar & Nyesom Wike",
            "Peter Obi & Yemi Osinbajo": "Peter Obi & Yemi Osinbajo", "peterObiYemiOsinbajo": "Peter Obi & Yemi Osinbajo", "peterYemi": "Peter Obi & Yemi Osinbajo",
            "Goodluck Jonathan & Nasir El-Rufai": "Goodluck Jonathan & Nasir El-Rufai", "goodluckElRufai": "Goodluck Jonathan & Nasir El-Rufai",
            "Rabiu Kwankwaso & Rotimi Amaechi": "Rabiu Kwankwaso & Rotimi Amaechi", "rabiuAmaechi": "Rabiu Kwankwaso & Rotimi Amaechi",
            "Atiku Abubakar & Rotimi Amaechi": "Atiku Abubakar & Rotimi Amaechi", "atikuRotimiAmaechi": "Atiku Abubakar & Rotimi Amaechi",
            "Yemi Osinbajo & Bukola Saraki": "Yemi Osinbajo & Bukola Saraki", "yemiBukola": "Yemi Osinbajo & Bukola Saraki",
            "Sanusi Lamido & Yemi Osinbajo": "Sanusi Lamido & Yemi Osinbajo", "sanusiYemi": "Sanusi Lamido & Yemi Osinbajo",
            "Yemi Osinbajo & Sanusi Lamido": "Yemi Osinbajo & Sanusi Lamido", "yemiSanusi": "Yemi Osinbajo & Sanusi Lamido",
            "Peter Obi & Sanusi Lamido": "Peter Obi & Sanusi Lamido", "peterSanusi": "Peter Obi & Sanusi Lamido", "peterObiSanusiLamidu": "Peter Obi & Sanusi Lamido",
            "Rotimi Amaechi & Bukola Saraki": "Rotimi Amaechi & Bukola Saraki", "rotimiBukola": "Rotimi Amaechi & Bukola Saraki",
            "Aminu Tambuwal & Nyesom Wike": "Aminu Tambuwal & Nyesom Wike", "tambuwalWike": "Aminu Tambuwal & Nyesom Wike",
            "Goodluck Jonathan & Rabiu Kwankwaso": "Goodluck Jonathan & Rabiu Kwankwaso", "goodluckRabiu": "Goodluck Jonathan & Rabiu Kwankwaso",
            "Peter Obi & Nasir El-Rufai": "Peter Obi & Nasir El-Rufai", "peterNasir": "Peter Obi & Nasir El-Rufai",
            "Rabiu Kwankwaso & Peter Obi": "Rabiu Kwankwaso & Peter Obi", "rabiuPeter": "Rabiu Kwankwaso & Peter Obi",
            "Aminu Tambuwal & Peter Obi": "Aminu Tambuwal & Peter Obi", "tambuwalPeter": "Aminu Tambuwal & Peter Obi",
            "Atiku Abubakar & Goodluck Jonathan": "Atiku Abubakar & Goodluck Jonathan", "atikuGoodluck": "Atiku Abubakar & Goodluck Jonathan",
            "Atiku Abubakar & Peter Obi": "Atiku Abubakar & Peter Obi", "atikuPeter": "Atiku Abubakar & Peter Obi",
            "Goodluck Jonathan & Aminu Tambuwal": "Goodluck Jonathan & Aminu Tambuwal", "goodluckTambuwal": "Goodluck Jonathan & Aminu Tambuwal",
            "Nasir El-Rufai & Peter Obi": "Nasir El-Rufai & Peter Obi", "nasirElRufaiPeterObi": "Nasir El-Rufai & Peter Obi",
            "Peter Obi & Bukola Saraki": "Peter Obi & Bukola Saraki", "peterBukola": "Peter Obi & Bukola Saraki",
            "Peter Obi & Rabiu Kwankwaso": "Peter Obi & Rabiu Kwankwaso", "peterRabiu": "Peter Obi & Rabiu Kwankwaso",
            "Peter Obi & Aminu Tambuwal": "Peter Obi & Aminu Tambuwal", "peterTambuwal": "Peter Obi & Aminu Tambuwal",
            "Nyesom Wike & Aminu Tambuwal": "Nyesom Wike & Aminu Tambuwal", "wikeTambuwal": "Nyesom Wike & Aminu Tambuwal",
            "Nyesom Wike & Sanusi Lamido": "Nyesom Wike & Sanusi Lamido", "wikeSanusi": "Nyesom Wike & Sanusi Lamido",
            "Sanusi Lamido & Peter Obi": "Sanusi Lamido & Peter Obi", "sanusiPeter": "Sanusi Lamido & Peter Obi",
        };
        const unmappedKeys = new Set();
        mapStatesData.forEach(stateItem => {
            if (!stateItem || !stateItem.state || stateItem.state.toUpperCase() === "TOTAL") { return; }
            const stateName = stateItem.state;
            let topComboName = null;
            let maxVotes = -1;
            for (const key in stateItem) {
                if (key !== 'state' && key !== 'zone' && !key.startsWith('_') && typeof stateItem[key] === 'number') {
                    const currentVotes = stateItem[key];
                    if (currentVotes > maxVotes) {
                        const standardizedComboName = keyToComboNameMap[key];
                        if (standardizedComboName) {
                            maxVotes = currentVotes;
                            topComboName = standardizedComboName;
                        } else {
                            if (!unmappedKeys.has(key)) {
                                console.warn(`Map Data Warning: No combo name mapping found for key: '${key}' in state '${stateName}'. Add this key to keyToComboNameMap in computeStateTopCombosFromCMS.`);
                                unmappedKeys.add(key);
                            }
                        }
                    }
                }
            }
            stateResults[stateName] = (topComboName !== null) ? { combo: topComboName, count: maxVotes } : { combo: "N/A", count: 0 };
        });
        return stateResults;
    }
    function renderMap() {
        if (!polygonSeries) { console.log("renderMap: polygonSeries not ready yet."); return; }
        const stateIdMap = {
            "Abia": "NG-AB", "Adamawa": "NG-AD", "Akwa Ibom": "NG-AK", "Anambra": "NG-AN", "Bauchi": "NG-BA", "Bayelsa": "NG-BY", "Benue": "NG-BE", "Borno": "NG-BO",
            "Cross River": "NG-CR", "Delta": "NG-DE", "Ebonyi": "NG-EB", "Edo": "NG-ED", "Ekiti": "NG-EK", "Enugu": "NG-EN", "FCT Abuja": "NG-FC", "Gombe": "NG-GO",
            "Imo": "NG-IM", "Jigawa": "NG-JI", "Kaduna": "NG-KD", "Kano": "NG-KN", "Katsina": "NG-KT", "Kebbi": "NG-KE", "Kogi": "NG-KO", "Kwara": "NG-KW",
            "Lagos": "NG-LA", "Nasarawa": "NG-NA", "Niger": "NG-NI", "Ogun": "NG-OG", "Ondo": "NG-ON", "Osun": "NG-OS", "Oyo": "NG-OY", "Plateau": "NG-PL",
            "Rivers": "NG-RI", "Sokoto": "NG-SO", "Taraba": "NG-TA", "Yobe": "NG-YO", "Zamfara": "NG-ZA"
        };
        let topCombosByState = computeStateTopCombosFromCMS();
        let mapDataForSeries = [];
        Object.entries(stateIdMap).forEach(([stateName, geoId]) => {
            let comboInfo = topCombosByState[stateName];
            let tooltipContent = `<strong>${stateName}</strong><br>No voting data available`;
            let voteCount = 0;
            if (comboInfo && comboInfo.combo && comboInfo.combo !== "N/A" && comboInfo.count >= 0) {
                voteCount = comboInfo.count;
                const [presName, vpName] = comboInfo.combo.split(" & ");
                const imgPresSrc = candidateImages[presName] || 'https://placehold.co/35x35/cccccc/ffffff?text=P';
                const imgVPSrc = candidateImages[vpName] || 'https://placehold.co/35x35/cccccc/ffffff?text=V';
                tooltipContent = `
                    <div style="font-size:0.85rem; text-align: center;">
                        <strong>${stateName}</strong><hr style='margin: 3px 0;'>
                        Top Combo: <br><em>${comboInfo.combo}</em><br>
                        Votes: <strong>${formatNumber(voteCount)}</strong>
                        <div style="margin-top:5px; display: flex; justify-content: center; gap: 5px;">
                          <img src="${imgPresSrc}" alt="${presName}" style="width:35px; height:35px; border-radius:50%; object-fit: cover; border: 1px solid #ccc;" onerror="this.onerror=null; this.src='https://placehold.co/35x35/cccccc/ffffff?text=P';">
                          <img src="${imgVPSrc}" alt="${vpName}" style="width:35px; height:35px; border-radius:50%; object-fit: cover; border: 1px solid #ccc;" onerror="this.onerror=null; this.src='https://placehold.co/35x35/cccccc/ffffff?text=V';">
                        </div>
                    </div>`;
            }
            mapDataForSeries.push({ id: geoId, name: stateName, value: voteCount, tooltipHTML: tooltipContent });
        });
        polygonSeries.data.setAll(mapDataForSeries);
        // console.log("Map data updated with", mapDataForSeries.length, "state entries."); // Less verbose
    }
     /********************************************
     * amCharts PIE CHART RENDER
     ********************************************/
     function renderPieChart() {
        if (pieRoot) { pieRoot.dispose(); pieRoot = null; }
        const pieDiv = document.getElementById("popularityPie");
        if (!pieDiv) return;
        const chartData = Object.entries(votesData)
                                .map(([combo, votes]) => ({ combo, votes }))
                                .filter(item => item.votes > 0);
        if (!chartData.length) {
             pieDiv.innerHTML = "<p style='text-align: center; padding: 20px;'>No votes yet to display popularity.</p>";
             return;
        } else {
            pieDiv.innerHTML = "";
        }
        chartData.sort((a, b) => b.votes - a.votes);
        am5.ready(function() {
             try {
                pieRoot = am5.Root.new("popularityPie");
                pieRoot.setThemes([am5themes_Animated.new(pieRoot)]);
                 let container = pieRoot.container.children.push(am5.Container.new(pieRoot, {
                    width: am5.percent(100), height: am5.percent(100), layout: pieRoot.verticalLayout
                }));
                pieChart = container.children.push(
                    am5percent.PieChart.new(pieRoot, { layout: pieRoot.verticalLayout })
                );
                let series = pieChart.series.push(
                    am5percent.PieSeries.new(pieRoot, {
                        valueField: "votes", categoryField: "combo", alignLabels: true, radius: am5.percent(85)
                    })
                );
                series.data.setAll(chartData);
                series.labels.template.setAll({
                    radius: 10, text: "{category}: {valuePercentTotal.formatNumber('0.0')}%", fontSize: "0.75em",
                    fill: am5.color(0x333333), oversizedBehavior: "truncate", maxWidth: 110, populateText: true
                });
                 series.labels.template.adapters.add("hidden", function(hidden, target) {
                   return target.dataItem.get("valuePercentTotal") < 3;
                 });
                 series.ticks.template.setAll({
                    strokeOpacity: 0.4, stroke: am5.color(0x666666), location: 0.5, length: 10, visible: true
                 });
                 series.ticks.template.adapters.add("hidden", function(hidden, target) {
                   return target.dataItem.get("valuePercentTotal") < 3;
                 });
                series.slices.template.setAll({
                    tooltipText: "{category}: {value} votes ({valuePercentTotal.formatNumber('0.0')}%)",
                    stroke: am5.color(0xffffff), strokeWidth: 1,
                });
                 series.slices.template.states.create("hover", { scale: 1.03 });
                let legend = container.children.push(am5.Legend.new(pieRoot, {
                    centerX: am5.percent(50), x: am5.percent(50), marginTop: 15, marginBottom: 15,
                    layout: pieRoot.horizontalLayout, width: am5.percent(95), wrap: true
                }));
                 legend.labels.template.setAll({ fontSize: "0.8em", fontWeight: "500", fill: am5.color(0x333333) });
                 legend.itemContainers.template.setAll({ paddingTop: 2, paddingBottom: 2 });
                legend.data.setAll(series.dataItems);
                series.appear(1000, 100);
             } catch (e) {
                 console.error("Error rendering amCharts pie chart:", e);
                 if (pieDiv) pieDiv.innerHTML = "<p style='color:red; text-align:center; padding: 20px;'>Error loading popularity chart.</p>";
             }
        });
    }
    /********************************************
     * INITIALIZATION FUNCTION
     ********************************************/
    function init(){
      console.log("Initializing application...");
      readCandidateTable();
      readComboTable();
      readUserDataTable();
      readLoyalistDataTable();
      populateCandidateList(presidentListEl, candidates, true);
      populateCandidateList(vicePresidentListEl, candidates, false);
      renderChart();
      renderComboGrid();
      renderComboLoyalists();
      initMap();
      renderPieChart();
      updateProgress();
      console.log("Initialization complete. Waiting for Wix data...");
    }
    // --- Run Initialization ---
    document.addEventListener('DOMContentLoaded', init);
    /********************************************
     * WIX INTEGRATION (Message Listener)
     ********************************************/
    window.addEventListener("message", function(event) {
        // Optional: Add origin check for security
        // if (event.origin !== "YOUR_WIX_SITE_URL") return;
        const msg = event.data;
        if (msg && typeof msg === 'object') {
            switch (msg.type) {
                case "electionData":
                    console.log("Received 'electionData' from Wix Page:", msg);
                    populateDataFromWix(msg); // Existing function to populate UI
                    break;
                case "voteRecorded":
                    console.log("Received 'voteRecorded' confirmation from Wix Page:", msg);
                    // Note: The autoGenCodeEl was removed, so we just log or alert if needed
                    if (msg.payload?.newReferralCode) {
                        console.log("Received new referral code (for info only):", msg.payload.newReferralCode);
                        // alert(`Vote recorded! Your personal referral code is ${msg.payload.newReferralCode}`); // Example alert
                    }
                    break;
                case "referralCodeRequested": // Confirmation from page code after sending request
                     console.log("Received 'referralCodeRequested' confirmation from Wix Page:", msg.payload);
                     // The confirmation message is already shown in the lightbox form handler
                     // Optionally close the lightbox here if desired, or let the user close it.
                     // if (referralLightbox) referralLightbox.style.display = 'none';
                     break;
                case "commentAdded":
                     console.log("Received 'commentAdded' confirmation from Wix Page:", msg.payload);
                     // Update local comment ID if needed
                     if (msg.payload?._id && msg.payload?.comboKey) {
                         const combo = msg.payload.comboKey;
                         const parent = msg.payload.parentId || 0;
                         const realId = msg.payload._id;
                         if (comboComments[combo]) {
                             const findAndUpdate = (comments) => {
                                 for (let i = 0; i < comments.length; i++) {
                                     if (comments[i].id.startsWith('temp-') && comments[i].text === msg.payload.comment) {
                                         console.log(`Updating temp comment ID ${comments[i].id} to ${realId}`);
                                         comments[i].id = realId;
                                         return true;
                                     }
                                     if (comments[i].replies && findAndUpdate(comments[i].replies)) { return true; }
                                 }
                                 return false;
                             };
                             findAndUpdate(comboComments[combo]);
                         }
                     }
                     break;
                case "likeRecorded":
                     console.log("Received 'likeRecorded' confirmation from Wix Page:", msg.payload);
                     // UI was already updated optimistically.
                     break;
                case "operationFailed":
                     console.error("Received 'operationFailed' message from Wix Page:", msg.payload);
                     alert(`Operation failed: ${msg.payload?.message || 'Unknown error'}`);
                     // Potentially revert optimistic UI updates here if needed
                     break;
                default:
                    // console.log("Received message of unknown type:", msg);
                    break;
            }
        }
    });
    // Processes the data received from Wix and updates the application state and UI
    function populateDataFromWix(data) {
      console.log("Processing Wix data...");
      if (!data || typeof data !== 'object') {
          console.error("Invalid data object received from Wix.", data);
          return;
      }
      let uiNeedsUpdate = false;
      if (Array.isArray(data.candidates)) {
          uiNeedsUpdate = true;
          candidates = []; candidateDetails = {}; candidateLikes = {}; candidateImages = {};
          data.candidates.forEach(c => {
            if (c && c.name) {
                candidates.push(c.name);
                candidateImages[c.name] = c.imageUrl || 'https://placehold.co/80x80/cccccc/ffffff?text=N/A';
                candidateDetails[c.name] = { age: c.age ?? '?', zone: c.zone ?? '?' };
                candidateLikes[c.name] = c.likes ?? 0;
            }
          });
          console.log(`Updated ${candidates.length} candidates from Wix.`);
          populateCandidateList(presidentListEl, candidates, true);
          populateCandidateList(vicePresidentListEl, candidates, false);
      }
       if (Array.isArray(data.combos)) {
           uiNeedsUpdate = true;
           votesData = {};
           data.combos.forEach(c => {
               if (c && c.president && c.vicePresident) {
                   const key = `${c.president} & ${c.vicePresident}`;
                   votesData[key] = c.totalVotes ?? 0;
                   if (c.presidentImageUrl) candidateImages[c.president] = c.presidentImageUrl;
                   if (c.vicePresidentImageUrl) candidateImages[c.vicePresident] = c.vicePresidentImageUrl;
               }
           });
           console.log(`Updated ${Object.keys(votesData).length} vote combos from Wix.`);
       }
       if (Array.isArray(data.users)) {
            uiNeedsUpdate = true;
            let allComments = [];
            comboComments = {};
            data.users.forEach(user => {
                 if (user && user._id && user.combo) {
                    allComments.push({
                        id: user._id, comboKey: user.combo, parentID: user.parentId || 0,
                        name: user.name || "Anonymous", text: user.comment || "", replies: []
                    });
                 }
            });
            let commentsById = {};
            allComments.forEach(comment => commentsById[comment.id] = comment);
            allComments.forEach(comment => {
                if (comment.parentID !== 0 && commentsById[comment.parentID]) {
                     if (!commentsById[comment.parentID].replies) commentsById[comment.parentID].replies = [];
                    commentsById[comment.parentID].replies.push(comment);
                }
            });
            allComments.forEach(comment => {
                if (comment.parentID === 0) {
                    if (!comboComments[comment.comboKey]) comboComments[comment.comboKey] = [];
                    comboComments[comment.comboKey].push(comment);
                }
            });
            console.log("Updated comments structure from Wix data.");
       }
        if (Array.isArray(data.mapStates)) {
            uiNeedsUpdate = true;
            mapStatesData = data.mapStates;
            console.log(`Updated map data source with ${mapStatesData.length} state entries from Wix.`);
        }
        if (Array.isArray(data.loyalists)) {
            uiNeedsUpdate = true;
            loyalists = {};
            data.loyalists.forEach(l => {
                if (l && l.referralCode) {
                    loyalists[l.referralCode.toUpperCase()] = {
                        loyalistName: l.loyalistName || "Anonymous", city: l.city || "", combo: l.combo || "",
                        supporters: l.supporters ?? 0, donation: l.donation ?? 0,
                        comboImg1: l.comboImg1 || 'https://placehold.co/50x50/cccccc/ffffff?text=N/A',
                        comboImg2: l.comboImg2 || 'https://placehold.co/50x50/cccccc/ffffff?text=N/A',
                    };
                }
            });
             console.log(`Updated ${Object.keys(loyalists).length} loyalists from Wix.`);
        }
        if (uiNeedsUpdate) {
            console.log("Wix data processed, re-rendering UI components...");
            renderChart();
            renderComboGrid();
            renderComboLoyalists();
            renderMap();
            renderPieChart();
            if (currentCombo && comboCommentSection?.classList.contains('active')) {
                renderComboComments();
            }
            console.log("UI update complete.");
        } else {
            console.log("No new data fields found in Wix message to process.");
        }
    }
