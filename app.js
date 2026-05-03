const counties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", "Homa Bay",
  "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii",
  "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera",
  "Marsabit", "Meru", "Migori", "Mombasa", "Muranga", "Nairobi", "Nakuru", "Nandi",
  "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita Taveta",
  "Tana River", "Tharaka Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga",
  "Wajir", "West Pokot"
];

const subjects = [
  "Mathematics + Physics", "Mathematics + Chemistry", "Mathematics + Biology", "Mathematics + Geography",
  "Mathematics + Business Studies", "Mathematics + Computer Studies", "Mathematics + Economics",
  "Mathematics + Home Science", "Physics + Chemistry", "Physics + Computer Studies", "Physics + Geography",
  "Chemistry + Biology", "Chemistry + Agriculture", "Chemistry + Home Science", "Biology + Agriculture",
  "Biology + Geography", "Biology + Home Science", "English + Literature", "English + Kiswahili",
  "English + History", "English + Geography", "English + CRE", "English + French", "Kiswahili + History",
  "Kiswahili + CRE", "Kiswahili + Geography", "Kiswahili + IRE", "History + CRE", "History + Geography",
  "History + Political Science", "History + English", "Geography + CRE", "Geography + Agriculture",
  "Geography + Business Studies", "CRE + English", "CRE + Geography", "CRE + Kiswahili", "CRE + History",
  "IRE + Arabic", "IRE + Kiswahili", "IRE + History", "French + English", "French + German",
  "French + Literature", "Arabic + IRE", "Arabic + History", "Agriculture + Biology",
  "Agriculture + Geography", "Agriculture + Chemistry", "Agriculture + Business Studies",
  "Business Studies + Mathematics", "Business Studies + Economics", "Business Studies + Geography",
  "Business Studies + Computer Studies", "Computer Studies + Mathematics", "Computer Studies + Physics",
  "Computer Studies + Business Studies", "Computer Studies + Geography", "Home Science + Biology",
  "Home Science + Chemistry", "Home Science + Business Studies", "Music + English", "Music + CRE",
  "Music + Kiswahili", "Fine Art + History", "Fine Art + Geography", "Art & Design + History",
  "Special Needs Education + English", "Special Needs Education + Mathematics",
  "Special Needs Education + Biology", "Special Needs Education + Geography",
  "Guidance & Counseling + English", "Guidance & Counseling + CRE", "Guidance & Counseling + History"
];

const teachers = [
  { name: "Mary Achieng", level: "SECONDARY", subject: "English + Literature", currentCounty: "Kisumu", desiredCounty: "Nairobi", month: "2026-08", urgency: "Urgent", calls: true, messages: true },
  { name: "Peter Mwangi", level: "SECONDARY", subject: "Mathematics + Business Studies", currentCounty: "Nakuru", desiredCounty: "Nairobi", month: "2026-09", urgency: "Not urgent", calls: false, messages: true },
  { name: "Faith Wanjiku", level: "PRIMARY", subject: "NULL", currentCounty: "Kiambu", desiredCounty: "Nairobi", month: "2026-07", urgency: "Urgent", calls: true, messages: false },
  { name: "Daniel Otieno", level: "SECONDARY", subject: "English + Literature", currentCounty: "Kisumu", desiredCounty: "Mombasa", month: "2026-08", urgency: "Not urgent", calls: true, messages: true }
];

const news = [
  { category: "TSC", title: "TSC transfer application window opens for Term 2", source: "TSC Desk" },
  { category: "CBC", title: "New CBC assessment resources released for junior school", source: "Education Kenya" },
  { category: "Cambridge", title: "Cambridge schools update science practical requirements", source: "Global Curriculum" },
  { category: "IB", title: "IB announces updated digital assessment guidance", source: "International Desk" },
  { category: "STEM", title: "Kenyan robotics clubs expand into rural schools", source: "STEM Watch" },
  { category: "Education Tech", title: "AI lesson planning tools gain adoption among teachers", source: "Tech Classroom" }
];

const blogs = [
  { title: "How to prepare a strong transfer request", topic: "TSC", format: "Blog", stats: "1.9k reads" },
  { title: "CBC science practicals using local materials", topic: "CBC", format: "Vlog", stats: "420 likes" },
  { title: "Teaching English set books with podcasts", topic: "Literature", format: "Podcast", stats: "860 plays" },
  { title: "Making Form 2 maths revision less abstract", topic: "STEM", format: "Blog", stats: "312 comments" },
  { title: "Video lessons, tutorials, and CPD sessions", topic: "Video", format: "Video", stats: "Open video hub" }
];

const videos = [
  {
    id: "cbc-science-practicals",
    title: "CBC Science Practicals Using Local Materials",
    topic: "CBC",
    creator: "Faith Wanjiku",
    duration: "18:42",
    views: "12.4K views",
    posted: "2 days ago",
    likes: 842,
    color: "#196f4d",
    description: "A practical classroom guide for setting up CBC science activities with locally available materials.",
    comments: ["This is useful for junior school labs.", "Please make another one for Grade 7 assessment."]
  },
  {
    id: "ai-lesson-planning",
    title: "Using AI to Plan CBC Lessons",
    topic: "Technology",
    creator: "Tom Omondi",
    duration: "24:10",
    views: "8.1K views",
    posted: "1 week ago",
    likes: 611,
    color: "#245f9d",
    description: "How teachers can responsibly draft lesson plans, activities, and revision prompts using AI tools.",
    comments: ["The prompt examples are clear.", "Can you cover assessment rubrics next?"]
  },
  {
    id: "tsc-transfer-process",
    title: "Understanding the TSC Transfer Process",
    topic: "TSC",
    creator: "Mary Achieng",
    duration: "31:08",
    views: "19.7K views",
    posted: "3 weeks ago",
    likes: 1320,
    color: "#b17918",
    description: "A teacher-focused breakdown of transfer timing, documentation, common mistakes, and follow-up etiquette.",
    comments: ["The spouse transfer section helped me.", "Please add hardship area examples."]
  },
  {
    id: "form-two-maths",
    title: "Making Form 2 Mathematics Less Abstract",
    topic: "STEM",
    creator: "Peter Mwangi",
    duration: "15:35",
    views: "5.6K views",
    posted: "5 days ago",
    likes: 390,
    color: "#7a4f9a",
    description: "A visual method for teaching algebra, linear equations, and word problems to Form 2 learners.",
    comments: ["My learners understood substitution better.", "Great board examples."]
  },
  {
    id: "teacher-cpd-webinar",
    title: "CPD Webinar: Building a Digital Teaching Portfolio",
    topic: "Professional Development",
    creator: "TON Academy",
    duration: "42:22",
    views: "3.9K views",
    posted: "1 month ago",
    likes: 274,
    color: "#8a3f35",
    description: "A professional development session on documenting teaching resources, evidence, and creator work.",
    comments: ["The portfolio checklist is excellent.", "Can this count toward CPD hours?"]
  }
];

const products = [
  { name: "Form 3 Biology Topical Questions", type: "PAST_PAPER", seller: "UDPBB27PE9", price: "KES 250" },
  { name: "CBC Grade 6 Digital Revision Pack", type: "EBOOK", seller: "KPA91MNTQ2", price: "KES 450" },
  { name: "Mathematics Video Course Bundle", type: "VIDEO_COURSE", seller: "MKO22PAX19", price: "KES 1,500" },
  { name: "Teacher CPD Webinar Replay", type: "WEBINAR", seller: "WBT83QKL10", price: "KES 800" }
];

const demoAccounts = [
  {
    handle: "klickviews2026!",
    email: "klickviews2026@ton.co.ke",
    phone: "+254716226416",
    password: "Klickviews2026!"
  }
];

const API_BASE_URL = "http://127.0.0.1:4000/api";

const notifications = [
  { title: "New possible swap match", target: "matches", detail: "Mary Achieng matches your Kisumu request." },
  { title: "Message received", target: "messages", detail: "Mary asked about your preferred move date." },
  { title: "Product pending review", target: "my-shop", detail: "CBC Grade 6 Revision Pack entered verification." },
  { title: "Blog engagement", target: "my-blog", detail: "Your AI lesson planning draft has 12 new comments." }
];

const state = {
  signedUp: false,
  authMode: "signup",
  authToken: localStorage.getItem("ton_auth_token") || "",
  currentUser: null,
  profileComplete: false,
  profile: {
    level: "SECONDARY",
    subject: "English + Literature",
    currentCounty: "Nairobi",
    subCounty: "Westlands",
    school: "Riverbank Secondary",
    allowCalls: true,
    allowMessages: true
  },
  swapRequest: null,
  activeNewsCategory: "TSC",
  activeVideoTopic: "All",
  activeVideoId: "cbc-science-practicals"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function optionList(items, selected) {
  return items.map((item) => `<option ${item === selected ? "selected" : ""}>${item}</option>`).join("");
}

function boot() {
  $("#subject-combination").innerHTML = optionList(subjects, state.profile.subject);
  $("#edit-subject").innerHTML = optionList(subjects, state.profile.subject);
  $("#current-county").innerHTML = optionList(counties, state.profile.currentCounty);
  $("#desired-county").innerHTML = optionList(counties, "Kisumu");
  $("#blog-filter").innerHTML = optionList(["All", "TSC", "CBC", "Literature", "STEM", "Technology", "Video"], "All");
  $("#video-filter").innerHTML = optionList(["Newest", "Most viewed", "Most liked"], "Newest");
  $("#shop-filter").innerHTML = optionList(["All", "EBOOK", "PAST_PAPER", "VIDEO_COURSE", "WEBINAR"], "All");
  bindEvents();
  syncProfileFields();
  renderAll();
  setView("profile");
  restoreSession();
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  if (state.authToken) headers.Authorization = `Bearer ${state.authToken}`;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Request failed.");
  return body;
}

async function restoreSession() {
  if (!state.authToken) return;
  try {
    const data = await apiRequest("/me");
    applyAuthPayload(data, false);
  } catch {
    localStorage.removeItem("ton_auth_token");
    state.authToken = "";
  }
}

function bindEvents() {
  $$("[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  $$("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
  });

  $$("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = $(`#${button.dataset.passwordToggle}`);
      input.type = input.type === "password" ? "text" : "password";
      button.textContent = input.type === "password" ? "Show" : "Hide";
    });
  });

  $("#password").addEventListener("input", () => {
    updatePasswordRules($("#password").value);
    clearAuthMessage();
  });

  ["email", "confirm-email", "phone", "confirm-phone", "confirm-password", "login-email", "login-password"].forEach((id) => {
    $(`#${id}`).addEventListener("input", clearAuthMessage);
  });

  $("#forgot-password").addEventListener("click", () => {
    setAuthMessage("Password reset email would be sent after backend email verification is connected.", "info");
  });

  $("#complete-verification").addEventListener("click", () => {
    const code = $("#otp-code").value.trim();
    if (!/^\d{6}$/.test(code)) {
      setFieldError("otp", "Enter a 6-digit OTP code.");
      return;
    }
    completeAuth();
  });

  $("#signup-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (state.authMode === "login") {
      if (!validateLogin(false)) return;
      await loginWithApi();
      return;
    }
    if (!validateSignup()) return;
    await registerWithApi();
  });

  $("#level").addEventListener("change", () => {
    const isPrimary = $("#level").value === "PRIMARY";
    $("#subject-combination").disabled = isPrimary;
    $("#subject-combination").value = isPrimary ? subjects[0] : $("#subject-combination").value;
  });

  $("#profile-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    await saveProfileWithApi();
  });

  $("#edit-profile").addEventListener("click", () => {
    $("#edit-level").value = state.profile.level;
    $("#edit-subject").value = state.profile.subject === "NULL" ? subjects[0] : state.profile.subject;
    $("#edit-subject").disabled = state.profile.level === "PRIMARY";
    setView("edit-profile");
  });

  $("#edit-level").addEventListener("change", () => {
    $("#edit-subject").disabled = $("#edit-level").value === "PRIMARY";
  });

  $("#edit-profile-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.profile.level = $("#edit-level").value;
    state.profile.subject = state.profile.level === "PRIMARY" ? "NULL" : $("#edit-subject").value;
    syncProfileFields();
    renderAll();
    setView("profile");
    alert("Account changes saved. In production, email and phone changes also update authentication records.");
  });

  $$(".toggle").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      const active = button.classList.contains("active");
      button.textContent = active ? "Active" : "Inactive";
      if (button.dataset.toggle === "messages") state.profile.allowMessages = active;
      if (button.dataset.toggle === "calls") state.profile.allowCalls = active;
    });
  });

  $("#swap-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.profileComplete) {
      alert("Complete your profile before requesting a swap.");
      return;
    }
    await createSwapRequestWithApi();
    setView("matches");
  });

  $("#match-search").addEventListener("input", renderMatches);
  $("#blog-filter").addEventListener("change", renderBlogs);
  $("#shop-filter").addEventListener("change", renderShop);
  $("#shop-search").addEventListener("input", renderShop);
  $("#video-search").addEventListener("input", renderVideos);
  $("#video-filter").addEventListener("change", renderVideos);
  $$(".video-sidebar button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeVideoTopic = button.dataset.videoTopic;
      $$(".video-sidebar button").forEach((item) => item.classList.toggle("active", item === button));
      renderVideos();
    });
  });
  $("#comment-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#comment-input");
    if (!input.value.trim()) return;
    const video = getActiveVideo();
    video.comments.unshift(input.value.trim());
    input.value = "";
    renderWatchPage();
  });
  $("#like-video").addEventListener("click", () => {
    const video = getActiveVideo();
    video.likes += 1;
    renderWatchPage();
  });
  $("#comment-focus").addEventListener("click", () => $("#comment-input").focus());
  $("#share-video").addEventListener("click", () => alert("Share link copied for this prototype."));
  $("#save-video").addEventListener("click", () => alert("Video saved to bookmarks."));
  $("#playlist-video").addEventListener("click", () => alert("Video added to playlist."));
  $("#emoji-video").addEventListener("click", () => alert("Reaction added."));
  $("#report-video").addEventListener("click", () => alert("Report submitted to moderation."));
  $("#follow-creator").addEventListener("click", () => alert("Creator followed."));
  $("#message-archive-all").addEventListener("click", () => alert("Read threads archived in this prototype."));
  $("#message-report-center").addEventListener("click", () => alert("Reports center will connect to moderation workflows."));
  $("#mark-notifications-read").addEventListener("click", () => {
    $("#notification-count").textContent = "0";
    setMetricRow("#notifications-summary", [
      ["Unread", "0"],
      ["Total", notifications.length],
      ["Delivery", "In-app ready"]
    ]);
  });
  $("#global-search").addEventListener("submit", (event) => {
    event.preventDefault();
    setView("matches");
    $("#match-search").value = $("#search-input").value;
    renderMatches();
  });
  $("#search-input").addEventListener("input", renderSuggestions);

  $("#product-form").addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Product submitted to verification pipeline.");
  });
  $("#post-form").addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Draft published in Creator Studio.");
  });
}

function applyAuthPayload(data, navigate = true) {
  if (data.token) {
    state.authToken = data.token;
    localStorage.setItem("ton_auth_token", data.token);
  }
  state.currentUser = data.user || state.currentUser;
  if (data.profile) applyProfilePayload(data.profile);
  state.signedUp = true;
  $("#auth-panel").style.display = "none";
  $(".app-shell").classList.remove("auth-locked");
  syncProfileFields();
  renderAll();
  loadMatchesFromApi();
  if (navigate) setView(state.profileComplete ? "swap" : "profile");
}

function applyProfilePayload(profile) {
  state.profile.level = profile.teachingLevel || "SECONDARY";
  state.profile.subject = profile.subjectCombination || "NULL";
  state.profile.currentCounty = profile.currentCounty || "Nairobi";
  state.profile.subCounty = profile.currentSubCounty || "";
  state.profile.school = profile.schoolName || "";
  state.profile.allowCalls = Boolean(profile.allowCalls);
  state.profile.allowMessages = Boolean(profile.allowMessages);
  state.profileComplete = Boolean(profile.profileCompleted);
}

async function loginWithApi() {
  try {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        identifier: $("#login-email").value.trim(),
        password: $("#login-password").value
      })
    });
    applyAuthPayload(data);
  } catch (error) {
    setAuthMessage(error.message);
  }
}

async function registerWithApi() {
  try {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: $("#email").value.trim(),
        phoneNumber: $("#phone").value.trim(),
        password: $("#password").value
      })
    });
    $("#verification-panel").hidden = false;
    $("#verification-copy").textContent = "Email and phone verification are marked complete in this local API build.";
    setAuthMessage("Account created. Continue to complete your teacher profile.", "success");
    applyAuthPayload(data, true);
  } catch (error) {
    setAuthMessage(error.message);
  }
}

async function saveProfileWithApi() {
  try {
    const payload = {
      teachingLevel: $("#level").value,
      subjectCombination: $("#level").value === "PRIMARY" ? null : $("#subject-combination").value,
      currentCounty: $("#current-county").value,
      currentSubCounty: $("#sub-county").value,
      schoolName: $("#school-name").value,
      allowMessages: state.profile.allowMessages,
      allowCalls: state.profile.allowCalls
    };
    const data = await apiRequest("/profile", {
      method: "PUT",
      body: JSON.stringify(payload)
    });
    applyProfilePayload(data.profile);
    syncProfileFields();
    renderAll();
    setView("swap");
  } catch (error) {
    alert(error.message);
  }
}

async function createSwapRequestWithApi() {
  try {
    await apiRequest("/swap-requests", {
      method: "POST",
      body: JSON.stringify({
        desiredCounty: $("#desired-county").value,
        desiredMoveMonth: $("#move-month").value,
        urgencyStatus: $("#urgency").value === "Not urgent" ? "NOT_URGENT" : "URGENT"
      })
    });
    state.swapRequest = {
      level: state.profile.level,
      subject: state.profile.subject,
      currentCounty: state.profile.currentCounty,
      desiredCounty: $("#desired-county").value,
      month: $("#move-month").value,
      urgency: $("#urgency").value
    };
    await loadMatchesFromApi();
  } catch (error) {
    alert(error.message);
  }
}

async function loadMatchesFromApi() {
  if (!state.authToken) return;
  try {
    const data = await apiRequest("/matches");
    state.apiMatches = data.matches || [];
    renderMatches();
  } catch {
    state.apiMatches = [];
  }
}

function setAuthMode(mode) {
  state.authMode = mode;
  clearAuthMessage();
  clearFieldErrors();
  $("#verification-panel").hidden = true;
  $$("[data-auth-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authMode === mode);
  });
  $$("[data-auth-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.authPanel === mode);
  });
}

function completeAuth() {
  state.signedUp = true;
  $("#auth-panel").style.display = "none";
  $(".app-shell").classList.remove("auth-locked");
  setView("profile");
}

function clearAuthMessage() {
  const message = $("#auth-message");
  message.textContent = "";
  message.className = "auth-message";
}

function setAuthMessage(message, type = "error") {
  const box = $("#auth-message");
  box.textContent = message;
  box.className = `auth-message ${type}`;
}

function setFieldError(field, message) {
  const target = $(`#${field}-error`);
  if (target) target.textContent = message;
}

function clearFieldErrors() {
  $$("small[id$='-error']").forEach((item) => {
    item.textContent = "";
  });
}

function normalizeKenyanPhone(value) {
  const compact = value.replace(/\s+/g, "");
  if (/^07\d{8}$/.test(compact)) return `+254${compact.slice(1)}`;
  if (/^01\d{8}$/.test(compact)) return `+254${compact.slice(1)}`;
  if (/^254[17]\d{8}$/.test(compact)) return `+${compact}`;
  return compact;
}

function isValidKenyanPhone(value) {
  return /^\+254[17]\d{8}$/.test(normalizeKenyanPhone(value));
}

function passwordChecks(password) {
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
}

function updatePasswordRules(password) {
  const checks = passwordChecks(password);
  Object.entries(checks).forEach(([rule, passed]) => {
    const item = $(`#password-rules [data-rule="${rule}"]`);
    if (item) item.classList.toggle("passed", passed);
  });
  return Object.values(checks).every(Boolean);
}

function validateSignup() {
  clearFieldErrors();
  const email = $("#email").value.trim().toLowerCase();
  const confirmEmail = $("#confirm-email").value.trim().toLowerCase();
  const phone = $("#phone").value.trim();
  const confirmPhone = $("#confirm-phone").value.trim();
  const password = $("#password").value;
  const confirmPassword = $("#confirm-password").value;
  let valid = true;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFieldError("email", "Enter a valid email address.");
    valid = false;
  }
  if (email !== confirmEmail) {
    setFieldError("confirm-email", "Email confirmation must match.");
    valid = false;
  }
  if (!isValidKenyanPhone(phone)) {
    setFieldError("phone", "Use a Kenyan number, e.g. +254712345678.");
    valid = false;
  }
  if (normalizeKenyanPhone(phone) !== normalizeKenyanPhone(confirmPhone)) {
    setFieldError("confirm-phone", "Phone confirmation must match.");
    valid = false;
  }
  if (!updatePasswordRules(password)) {
    setFieldError("password", "Password does not meet the required policy.");
    valid = false;
  }
  if (password !== confirmPassword) {
    setFieldError("confirm-password", "Password confirmation must match.");
    valid = false;
  }
  if (!$("#terms").checked) {
    setAuthMessage("Accept the account, privacy, and marketplace rules to continue.");
    valid = false;
  }
  if (!valid && !$("#auth-message").textContent) {
    setAuthMessage("Review the highlighted fields and try again.");
  }
  return valid;
}

function validateLogin(strictSeeded = true) {
  clearFieldErrors();
  const identifier = $("#login-email").value.trim();
  const normalizedIdentifier = normalizeKenyanPhone(identifier).toLowerCase();
  const password = $("#login-password").value;
  if (!strictSeeded) {
    if (!identifier) {
      setFieldError("login-email", "Enter your email, phone, or handle.");
      return false;
    }
    if (password.length < 8) {
      setFieldError("login-password", "Password must be at least 8 characters.");
      return false;
    }
    return true;
  }

  const account = demoAccounts.find((item) => {
    return item.email.toLowerCase() === identifier.toLowerCase() ||
      item.handle.toLowerCase() === identifier.toLowerCase() ||
      item.phone.toLowerCase() === normalizedIdentifier;
  });

  if (!account) {
    setFieldError("login-email", "Use the seeded email, phone, or handle.");
    setAuthMessage("No seeded prototype account matches those details.");
    return false;
  }
  if (password !== account.password) {
    setFieldError("login-password", "Password does not match the seeded account.");
    setAuthMessage("Unable to sign in with the provided details.");
    return false;
  }
  return true;
}

function setView(view) {
  $$(".view").forEach((section) => section.classList.remove("active"));
  const target = $(`#view-${view}`);
  if (target) target.classList.add("active");
  $$(".sidenav button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  updateBrandForView(view);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateBrandForView(view) {
  const brandMap = {
    swap: {
      logo: "logo/swap.png",
      name: "EasySwap",
      subtitle: "Teacher transfer matching"
    },
    matches: {
      logo: "logo/swap.png",
      name: "EasySwap",
      subtitle: "Teacher transfer matching"
    },
    videos: {
      logo: "logo/creators.png",
      name: "EasySwap Creators",
      subtitle: "Video lessons, podcasts, and creator tools"
    },
    watch: {
      logo: "logo/creators.png",
      name: "EasySwap Creators",
      subtitle: "Video lessons, podcasts, and creator tools"
    }
  };
  const fallback = {
    logo: "logo/ton.png",
    name: "Teachers Online Network",
    subtitle: "Professional infrastructure for educators"
  };
  const brand = brandMap[view] || fallback;
  $("#brand-logo").src = brand.logo;
  $("#brand-logo").alt = `${brand.name} logo`;
  $("#brand-name").textContent = brand.name;
  $("#brand-subtitle").textContent = brand.subtitle;
}

function syncProfileFields() {
  $("#level").value = state.profile.level;
  $("#subject-combination").value = state.profile.subject === "NULL" ? subjects[0] : state.profile.subject;
  $("#subject-combination").disabled = state.profile.level === "PRIMARY";
  $("#current-county").value = state.profile.currentCounty;
  $("#swap-subject").value = state.profile.subject;
  $("#swap-current").value = state.profile.currentCounty;
  $("#profile-status").textContent = state.profileComplete ? "Profile complete" : "Profile pending";
  $("#profile-notice").textContent = state.profileComplete
    ? "Profile complete. SwapTool, Matches, and partner features are active."
    : "Complete and save your profile to activate the home modules.";
}

function renderAll() {
  renderMatches();
  renderMessages();
  renderNotifications();
  renderNewsTabs();
  renderNews();
  renderBlogs();
  renderVideos();
  renderWatchPage();
  renderShop();
}

function getMatches() {
  if (state.apiMatches?.length) return state.apiMatches;
  if (!state.swapRequest) return [];
  return teachers.filter((teacher) =>
    teacher.currentCounty === state.swapRequest.desiredCounty &&
    teacher.desiredCounty === state.swapRequest.currentCounty &&
    teacher.subject === state.swapRequest.subject &&
    teacher.level === state.swapRequest.level
  );
}

function renderMatches() {
  const query = $("#match-search")?.value?.toLowerCase() || "";
  const matches = getMatches().filter((match) => `${match.name} ${match.currentCounty} ${match.urgency}`.toLowerCase().includes(query));
  const container = $("#matches-list");
  setMetricRow("#matches-summary", [
    ["Active request", state.swapRequest ? "Yes" : "No"],
    ["Exact matches", matches.length],
    ["Match rule", "County + level + subject"]
  ]);
  if (!state.swapRequest) {
    container.innerHTML = `<div class="notice">Submit a swap request before viewing possible matches.</div>`;
    return;
  }
  container.innerHTML = matches.length ? matches.map((match) => `
    <article class="list-item">
      <div>
        <h3>${match.name}</h3>
        <p>${match.subject} teacher in ${match.currentCounty}, wants ${match.desiredCounty}. Move month: ${match.month}. ${match.urgency}.</p>
        <div class="inline-tags">
          <span>Verified profile</span>
          <span>Exact reciprocal interest</span>
          <span>${match.messages ? "DM enabled" : "DM off"}</span>
          <span>${match.calls ? "Calls enabled" : "Calls off"}</span>
        </div>
      </div>
      <div class="list-actions">
        ${match.messages ? "<button>DM</button>" : ""}
        ${match.calls ? "<button class=\"secondary\">Call</button>" : ""}
        <button class="secondary">Report</button>
        <button class="danger">Block</button>
        <button class="secondary">Save</button>
      </div>
    </article>
  `).join("") : `<div class="notice">No exact mutual match yet. Try a different desired county or check later.</div>`;
}

function renderMessages() {
  setMetricRow("#messages-summary", [
    ["Unread", "2"],
    ["Archived", "4"],
    ["Moderation", "Reports enabled"]
  ]);
  $("#messages-list").innerHTML = `
    <article class="list-item">
      <div>
        <h3>Mary Achieng</h3>
        <p>10 messages folded. Mary asked whether August 2026 is still suitable for your transfer plan.</p>
        <div class="inline-tags">
          <span>Matched user</span>
          <span>Typing indicator ready</span>
          <span>Read receipts ready</span>
        </div>
      </div>
      <div class="list-actions">
        <button>View More</button>
        <button class="secondary">Archive</button>
        <button class="secondary">Report</button>
        <button class="danger">Block User</button>
      </div>
    </article>
  `;
}

function renderNotifications() {
  $("#notification-count").textContent = notifications.length;
  setMetricRow("#notifications-summary", [
    ["Unread", notifications.length],
    ["Channels", "In-app, email, push"],
    ["Priority", "Account + match events"]
  ]);
  $("#notifications-list").innerHTML = notifications.map((item) => `
    <article class="list-item">
      <div>
        <h3>${item.title}</h3>
        <p>${item.detail}</p>
      </div>
      <button data-view="${item.target}">Open</button>
    </article>
  `).join("");
  $$("#notifications-list [data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
}

function renderNewsTabs() {
  const categories = ["TSC", "CBC", "Cambridge", "IB", "STEM", "Education Tech"];
  $("#news-tabs").innerHTML = categories.map((category) =>
    `<button class="${category === state.activeNewsCategory ? "active" : ""}" data-category="${category}">${category}</button>`
  ).join("");
  $$("#news-tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeNewsCategory = button.dataset.category;
      renderNewsTabs();
      renderNews();
    });
  });
}

function renderNews() {
  setMetricRow("#news-summary", [
    ["Category", state.activeNewsCategory],
    ["Articles", news.filter((item) => item.category === state.activeNewsCategory).length],
    ["Ordering", "Newest first"]
  ]);
  $("#news-list").innerHTML = news
    .filter((item) => item.category === state.activeNewsCategory)
    .map((item) => `
      <article class="news-card">
        <p class="eyebrow">${item.category}</p>
        <h3>${item.title}</h3>
        <p>RSS-ready education news card with moderation status and source attribution.</p>
        <footer>${item.source} <span>Newest first</span><span>Verified source</span></footer>
      </article>
    `).join("");
}

function renderBlogs() {
  const filter = $("#blog-filter").value;
  const filtered = blogs.filter((blog) => filter === "All" || blog.topic === filter);
  setMetricRow("#blogs-summary", [
    ["Filter", filter],
    ["Items", filtered.length],
    ["Monetization", "Ads + sponsored posts"]
  ]);
  $("#blogs-list").innerHTML = filtered
    .map((blog) => `
      <article class="card">
        <p class="eyebrow">${blog.format} / ${blog.topic}</p>
        <h3>${blog.title}</h3>
        <p>Supports comments, replies, likes, shares, reports, bookmarks, playlists, and creator follow actions.</p>
        <footer>${blog.stats} ${blog.topic === "Video" ? "<button data-view=\"videos\">Open Videos</button>" : "<span>Ad eligible</span>"}</footer>
      </article>
    `).join("");
  $$("#blogs-list [data-view='videos']").forEach((button) => {
    button.addEventListener("click", () => setView("videos"));
  });
}

function getActiveVideo() {
  return videos.find((video) => video.id === state.activeVideoId) || videos[0];
}

function openWatch(videoId) {
  state.activeVideoId = videoId;
  renderWatchPage();
  setView("watch");
}

function renderVideos() {
  const query = $("#video-search")?.value?.toLowerCase() || "";
  const sort = $("#video-filter")?.value || "Newest";
  const filtered = videos
    .filter((video) => state.activeVideoTopic === "All" || video.topic === state.activeVideoTopic)
    .filter((video) => `${video.title} ${video.creator} ${video.topic}`.toLowerCase().includes(query));

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Most liked") return b.likes - a.likes;
    if (sort === "Most viewed") return parseFloat(b.views) - parseFloat(a.views);
    return 0;
  });

  setMetricRow("#videos-summary", [
    ["Topic", state.activeVideoTopic],
    ["Videos", sorted.length],
    ["Engagement", "Likes, comments, shares, playlists"]
  ]);

  $("#videos-list").innerHTML = sorted.map((video) => `
    <article class="video-card" data-video-id="${video.id}">
      <div class="thumbnail" style="background:${video.color}">
        <span class="play-badge">▶</span>
        <span class="duration">${video.duration}</span>
      </div>
      <div class="video-card-body">
        <h3>${video.title}</h3>
        <p>${video.creator}</p>
        <p>${video.views} • ${video.posted}</p>
      </div>
    </article>
  `).join("");

  $$("#videos-list .video-card").forEach((card) => {
    card.addEventListener("click", () => openWatch(card.dataset.videoId));
  });
}

function renderWatchPage() {
  const video = getActiveVideo();
  $("#watch-player").style.background = video.color;
  $("#watch-title").textContent = video.title;
  $("#watch-creator").textContent = video.creator;
  $("#watch-stats").textContent = `${video.views} • ${video.posted} • ${video.topic}`;
  $("#watch-likes").textContent = video.likes.toLocaleString();
  $("#watch-description").textContent = video.description;
  $("#comments-list").innerHTML = video.comments.map((comment) => `
    <article class="comment-item">
      <strong>Teacher User</strong>
      <p>${comment}</p>
      <div>
        <button class="secondary">Reply</button>
        <button class="secondary">Like</button>
        <button class="secondary">Report</button>
      </div>
    </article>
  `).join("");
  $("#related-videos").innerHTML = videos
    .filter((item) => item.id !== video.id)
    .map((item) => `
      <article class="related-video" data-video-id="${item.id}">
        <div class="related-thumb" style="background:${item.color}"><span>${item.duration}</span></div>
        <div>
          <strong>${item.title}</strong>
          <p>${item.creator}</p>
          <p>${item.views}</p>
        </div>
      </article>
    `).join("");
  $$("#related-videos .related-video").forEach((card) => {
    card.addEventListener("click", () => openWatch(card.dataset.videoId));
  });
}

function renderShop() {
  const filter = $("#shop-filter")?.value || "All";
  const query = $("#shop-search")?.value?.toLowerCase() || "";
  const filtered = products
    .filter((product) => filter === "All" || product.type === filter)
    .filter((product) => `${product.name} ${product.type} ${product.seller}`.toLowerCase().includes(query));
  setMetricRow("#shop-summary", [
    ["Approved items", filtered.length],
    ["Buyer protection", "On-platform only"],
    ["Seller privacy", "Sales IDs only"]
  ]);
  setMetricRow("#my-shop-summary", [
    ["Pending review", "1"],
    ["Approved", "3"],
    ["Wallet status", "Withdrawals enabled"]
  ]);
  setMetricRow("#creator-summary", [
    ["Drafts", "1"],
    ["Published", "4"],
    ["Earnings", "KES 12,450"]
  ]);
  $("#shop-list").innerHTML = filtered.map((product) => `
    <article class="card">
      <p class="eyebrow">${product.type}</p>
      <h3>${product.name}</h3>
      <p>Seller identity is protected through partner Sales ID ${product.seller}. Purchases stay on-platform.</p>
      <div class="inline-tags">
        <span>Admin verified</span>
        <span>Virus scan passed</span>
        <span>Instant delivery</span>
      </div>
      <footer>${product.price} <button>Buy</button></footer>
    </article>
  `).join("");
}

function setMetricRow(selector, metrics) {
  const container = $(selector);
  if (!container) return;
  container.innerHTML = metrics.map(([label, value]) => `
    <div class="metric-card">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function renderSuggestions() {
  const query = $("#search-input").value.trim().toLowerCase();
  const box = $("#suggestions");
  if (query.length < 2) {
    box.hidden = true;
    return;
  }
  const pool = [
    ...teachers.map((item) => `${item.name} - ${item.subject} swap`),
    ...blogs.map((item) => item.title),
    ...products.map((item) => item.name),
    ...news.map((item) => item.title)
  ];
  const results = pool.filter((item) => item.toLowerCase().includes(query)).slice(0, 6);
  box.innerHTML = results.map((item) => `<button type="button">${item}</button>`).join("");
  box.hidden = results.length === 0;
  $$("#suggestions button").forEach((button) => {
    button.addEventListener("click", () => {
      $("#search-input").value = button.textContent;
      box.hidden = true;
    });
  });
}

boot();
