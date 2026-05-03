const API_BASE_URL = "https://tonrevampv3-api.onrender.com/api";

const pageMeta = {
  "/index": { brand: "ton", nav: "" },
  "/login": { brand: "ton", nav: "" },
  "/signup": { brand: "ton", nav: "" },
  "/partner-login": { brand: "partnerAds", nav: "" },
  "/partner-signup": { brand: "partnerAds", nav: "" },
  "/profile": { brand: "ton", nav: "profile" },
  "/swap": { brand: "swap", nav: "swap" },
  "/matches": { brand: "swap", nav: "matches" },
  "/messages": { brand: "ton", nav: "messages" },
  "/notifications": { brand: "ton", nav: "notifications" },
  "/news": { brand: "ton", nav: "news" },
  "/blogs": { brand: "ton", nav: "blogs" },
  "/videos": { brand: "creators", nav: "videos" },
  "/watch": { brand: "creators", nav: "videos" },
  "/shop": { brand: "ton", nav: "shop" },
  "/partner": { brand: "partnerAds", nav: "partner" },
  "/my-shop": { brand: "ton", nav: "my-shop" },
  "/creator-studio": { brand: "ton", nav: "my-blog" }
};

const brandMeta = {
  ton: {
    logo: "logo/ton.png",
    name: "Teachers Online Network",
    subtitle: "Professional infrastructure for educators"
  },
  swap: {
    logo: "logo/swap.png",
    name: "EasySwap",
    subtitle: "Teacher transfer matching"
  },
  creators: {
    logo: "logo/creators.png",
    name: "EasySwap Creators",
    subtitle: "Video lessons, podcasts, and creator tools"
  },
  partnerAds: {
    logo: "logo/ton.png",
    name: "TON Growth Ads",
    subtitle: "Turn attention into customers"
  }
};

const navTargets = {
  profile: "/profile",
  swap: "/swap",
  matches: "/matches",
  messages: "/messages",
  notifications: "/notifications",
  news: "/news",
  blogs: "/blogs",
  videos: "/videos",
  shop: "/shop",
  partner: "/partner",
  "my-shop": "/my-shop",
  "my-blog": "/creator-studio"
};

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

const staticVideos = [
  ["cbc-science-practicals", "CBC Science Practicals Using Local Materials", "Faith Wanjiku", "CBC", "12.4K views", "18:42", "#196f4d"],
  ["ai-lesson-planning", "Using AI to Plan CBC Lessons", "Tom Omondi", "Technology", "8.1K views", "24:10", "#245f9d"],
  ["tsc-transfer-process", "Understanding the TSC Transfer Process", "Mary Achieng", "TSC", "19.7K views", "31:08", "#b17918"],
  ["form-two-maths", "Making Form 2 Mathematics Less Abstract", "Peter Mwangi", "STEM", "5.6K views", "15:35", "#7a4f9a"]
];

const adCreatives = [
  {
    title: "CBC Revision Pack",
    body: "Reach teachers looking for ready-to-use learning materials.",
    cta: "Download",
    tag: "Sponsored",
    color: "#7c3aed"
  },
  {
    title: "Teacher Training Webinar",
    body: "Fill seats faster with verified education audiences.",
    cta: "Book Now",
    tag: "Promoted",
    color: "#196f4d"
  },
  {
    title: "School Software Offer",
    body: "Get your product seen by schools and teachers this week.",
    cta: "Learn More",
    tag: "Growth Ad",
    color: "#245f9d"
  }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const state = { reference: null };

function token() {
  return localStorage.getItem("ton_auth_token") || "";
}

function partnerSession() {
  return JSON.parse(localStorage.getItem("ton_partner_session") || "null");
}

function partnerToken() {
  return localStorage.getItem("ton_partner_token") || "";
}

async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token()) headers.Authorization = `Bearer ${token()}`;
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Request failed.");
  return body;
}

async function partnerApi(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (partnerToken()) headers.Authorization = `Bearer ${partnerToken()}`;
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Request failed.");
  return body;
}

function currentPath() {
  let path = window.location.pathname;
  if (path === "/" || path === "/index.html" || path === "/index") return "/index";
  if (path.endsWith("/")) path = path.slice(0, -1);
  return path.replace(/\.html$/, "");
}

function optionList(items, selected = "") {
  return items.map((item) => `<option ${item === selected ? "selected" : ""}>${item}</option>`).join("");
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function escapeRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeKenyanPhone(value = "") {
  const compact = String(value).replace(/\s+/g, "");
  if (/^07\d{8}$/.test(compact)) return `+254${compact.slice(1)}`;
  if (/^01\d{8}$/.test(compact)) return `+254${compact.slice(1)}`;
  if (/^254[17]\d{8}$/.test(compact)) return `+${compact}`;
  return compact;
}

function bindPasswordToggles() {
  $$("[data-password-toggle]").forEach((button) => {
    const input = $(`#${button.dataset.passwordToggle}`);
    if (!input) return;
    button.textContent = input.type === "password" ? "Show" : "Hide";
    button.addEventListener("click", () => {
      input.type = input.type === "password" ? "text" : "password";
      button.textContent = input.type === "password" ? "Show" : "Hide";
    });
  });
}

function clearPageMessage() {
  const box = $("#page-message") || $("#auth-message");
  if (!box) return;
  box.textContent = "";
  box.className = "auth-message";
}

function setMessage(message, type = "error") {
  const box = $("#page-message") || $("#auth-message");
  if (!box) {
    showToast(message, type);
    return;
  }
  box.textContent = message;
  box.className = `auth-message ${type}`;
  showToast(message, type);
}

function showToast(message, type = "success") {
  let toast = $("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function setBrand() {
  const meta = pageMeta[currentPath()] || pageMeta["/index"];
  const brand = brandMeta[meta.brand] || brandMeta.ton;
  if ($("#brand-logo")) $("#brand-logo").src = brand.logo;
  if ($("#brand-logo")) $("#brand-logo").alt = `${brand.name} logo`;
  if ($("#brand-name")) $("#brand-name").textContent = brand.name;
  if ($("#brand-subtitle")) $("#brand-subtitle").textContent = brand.subtitle;
  $$("[data-nav]").forEach((item) => item.classList.toggle("active", item.dataset.nav === meta.nav));
}

function bindNavigation() {
  $$("[data-nav]").forEach((item) => {
    item.addEventListener("click", () => {
      window.location.href = navTargets[item.dataset.nav] || "/profile";
    });
  });
}

function bindGlobalActions() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    if (action === "mark-read") {
      $$(".list-item").forEach((item) => item.classList.add("is-read"));
      setMessage("Notifications marked as read.", "success");
    }
    if (action === "submit-product") {
      setMessage("Product submitted to verification pipeline.", "success");
    }
    if (action === "publish-draft") {
      setMessage("Draft saved and queued for publishing workflow.", "success");
    }
    if (action === "withdraw") {
      setMessage("Withdrawal request started. M-Pesa verification will be required.", "success");
    }
    if (action === "follow") setMessage("Creator followed.", "success");
    if (action === "like") {
      button.classList.toggle("is-selected");
      setMessage(button.classList.contains("is-selected") ? "Video liked." : "Like removed.", "success");
    }
    if (action === "comment") setMessage("Comment box will open in the threaded comments panel.", "success");
    if (action === "share") setMessage("Share link copied.", "success");
    if (action === "save") setMessage("Video saved to bookmarks.", "success");
    if (action === "playlist") setMessage("Video added to playlist.", "success");
    if (action === "report-video") setMessage("Video report submitted to moderation.", "success");
    if (action === "ad-click") setMessage("Sponsored promotion opened.", "success");
    if (action === "skip-ad") {
      button.closest(".video-ad-overlay")?.classList.add("is-skipped");
      setMessage("Ad skipped.", "success");
    }
  });
}

function adCreative(slot = "") {
  const index = Math.abs([...slot].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % adCreatives.length;
  return adCreatives[index];
}

function renderAdSlots() {
  $$("[data-ad-slot]").forEach((slot) => {
    const creative = adCreative(slot.dataset.adSlot || "");
    slot.innerHTML = `
      <div class="ad-label">${creative.tag}</div>
      <strong>${creative.title}</strong>
      <p>${creative.body}</p>
      <button type="button" data-action="ad-click">${creative.cta}</button>
    `;
    slot.style.setProperty("--ad-accent", creative.color);
  });
}

function adCard(slot) {
  const creative = adCreative(slot);
  return `
    <article class="ad-slot ad-slot-inline" data-ad-slot="${slot}" style="--ad-accent:${creative.color}">
      <div class="ad-label">${creative.tag}</div>
      <strong>${creative.title}</strong>
      <p>${creative.body}</p>
      <button type="button" data-action="ad-click">${creative.cta}</button>
    </article>
  `;
}

function setProfileEditing(enabled) {
  const form = $("#profile-form");
  if (!form) return;
  form.classList.toggle("profile-readonly", !enabled);
  $$("#profile-form input, #profile-form select").forEach((field) => {
    field.disabled = !enabled;
  });
  $("#save-profile-button").hidden = !enabled;
  $("#cancel-profile-edit").hidden = !enabled;
  $("#edit-profile-button").hidden = enabled;
}

function requireAuth() {
  const publicPages = ["/index", "/login", "/signup", "/partner-login", "/partner-signup", "/partner"];
  if (!token() && !publicPages.includes(currentPath())) {
    window.location.href = "/login";
  }
}

function bootShell() {
  setBrand();
  bindNavigation();
  bindGlobalActions();
  requireAuth();
  const logout = $("#logout-button");
  if (logout) {
    logout.addEventListener("click", () => {
      localStorage.removeItem("ton_auth_token");
      window.location.href = "/login";
    });
  }
}

function passwordIsStrong(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password);
}

async function bootLogin() {
  bindPasswordToggles();
  $("#login-identifier")?.addEventListener("input", clearPageMessage);
  $("#login-password")?.addEventListener("input", clearPageMessage);
  $("#login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          identifier: $("#login-identifier").value.trim(),
          password: $("#login-password").value
        })
      });
      localStorage.setItem("ton_auth_token", data.token);
      window.location.href = data.profile?.profileCompleted ? "/swap" : "/profile";
    } catch (error) {
      setMessage(error.message);
    }
  });
}

async function bootSignup() {
  bindPasswordToggles();
  $("#email")?.addEventListener("input", clearPageMessage);
  $("#confirm-email")?.addEventListener("input", clearPageMessage);
  $("#phone")?.addEventListener("input", clearPageMessage);
  $("#confirm-phone")?.addEventListener("input", clearPageMessage);
  $("#password")?.addEventListener("input", clearPageMessage);
  $("#confirm-password")?.addEventListener("input", clearPageMessage);
  $("#signup-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = $("#email").value.trim();
    const phone = normalizeKenyanPhone($("#phone").value);
    const password = $("#password").value;
    if (email !== $("#confirm-email").value.trim()) return setMessage("Email confirmation must match.");
    if (phone !== normalizeKenyanPhone($("#confirm-phone").value)) return setMessage("Phone confirmation must match.");
    if (!passwordIsStrong(password)) return setMessage("Password must include uppercase, lowercase, number, and special character.");
    if (password !== $("#confirm-password").value) return setMessage("Password confirmation must match.");
    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, phoneNumber: phone, password })
      });
      localStorage.setItem("ton_auth_token", data.token);
      window.location.href = "/profile";
    } catch (error) {
      setMessage(error.message);
    }
  });
}

async function bootPartnerLogin() {
  bindPasswordToggles();
  if (partnerSession()) {
    window.location.href = "/partner";
    return;
  }
  $("#partner-login-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = $("#partner-login-email").value.trim().toLowerCase();
    const password = $("#partner-login-password").value;
    try {
      const data = await partnerApi("/partner/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem("ton_partner_token", data.token);
      localStorage.setItem("ton_partner_session", JSON.stringify({ email: data.user.email, entityName: data.partner?.entityName || data.user.email, signedInAt: new Date().toISOString() }));
      window.location.href = "/partner";
    } catch (error) {
      setMessage(error.message || "Invalid partner email or password.");
    }
  });
}

async function bootPartnerSignup() {
  bindPasswordToggles();
  if (partnerSession()) {
    window.location.href = "/partner";
    return;
  }
  state.partnerOnboardingStep = Number(localStorage.getItem("ton_partner_onboarding_step") || 0);
  const reference = await api("/reference").catch(() => null);
  const countyOptions = reference?.counties?.length ? reference.counties : counties;
  $("#partner-signup-county").innerHTML = optionList(["All counties", ...countyOptions], "All counties");
  restorePartnerOnboardingDraft();
  refreshPartnerOnboarding();
  $$("input[name='partner-account-type']").forEach((item) => item.addEventListener("change", refreshPartnerOnboarding));
  $$("#partner-signup-form input, #partner-signup-form select, #partner-signup-form textarea").forEach((field) => {
    field.addEventListener("input", () => savePartnerOnboardingDraft(state.partnerOnboardingStep || 0));
    field.addEventListener("change", () => {
      savePartnerOnboardingDraft(state.partnerOnboardingStep || 0);
      refreshPartnerOnboarding();
    });
  });
  $("#partner-signup-countrywide")?.addEventListener("change", () => {
    $("#partner-signup-county").disabled = $("#partner-signup-countrywide").checked;
    if ($("#partner-signup-countrywide").checked) $("#partner-signup-county").value = "All counties";
  });
  $("#partner-onboarding-prev")?.addEventListener("click", () => {
    state.partnerOnboardingStep = Math.max(0, (state.partnerOnboardingStep || 0) - 1);
    savePartnerOnboardingDraft(state.partnerOnboardingStep);
    refreshPartnerOnboarding();
  });
  $("#partner-onboarding-next")?.addEventListener("click", () => {
    const error = validatePartnerOnboardingStep();
    if (error) return setMessage(error);
    state.partnerOnboardingStep = Math.min(4, (state.partnerOnboardingStep || 0) + 1);
    savePartnerOnboardingDraft(state.partnerOnboardingStep);
    refreshPartnerOnboarding();
  });
  $("#partner-onboarding-save")?.addEventListener("click", () => {
    savePartnerOnboardingDraft(state.partnerOnboardingStep || 0);
    setMessage("Partner onboarding draft saved.", "success");
  });
  $("#partner-signup-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const error = validatePartnerOnboardingStep();
    if (error) return setMessage(error);
    const email = $("#partner-signup-email").value.trim().toLowerCase();
    const password = $("#partner-signup-password").value;
    const accountType = $("[name='partner-account-type']:checked")?.value || "individual";
    const account = {
      email,
      password,
      phone: normalizeKenyanPhone($("#partner-signup-phone").value),
      entityType: accountType,
      entityName: $("#partner-signup-entity-name").value.trim(),
      registrationNumber: $("#partner-signup-registration").value.trim(),
      industry: $("#partner-signup-industry").value,
      entityDetails: $("#partner-signup-entity-details").value.trim(),
      county: $("#partner-signup-countrywide").checked ? "All counties" : $("#partner-signup-county").value,
      countrywide: $("#partner-signup-countrywide").checked,
      phoneVerified: true,
      termsAccepted: true,
      createdAt: new Date().toISOString()
    };
    try {
      const data = await partnerApi("/partner/register", {
        method: "POST",
        body: JSON.stringify({
          email: account.email,
          password: account.password,
          phoneNumber: account.phone,
          accountType: account.entityType.toUpperCase(),
          entityName: account.entityName,
          registrationNumber: account.registrationNumber,
          industry: account.industry,
          entityDetails: account.entityDetails,
          county: account.county,
          countrywide: account.countrywide
        })
      });
      localStorage.setItem("ton_partner_token", data.token);
      localStorage.setItem("ton_partner_session", JSON.stringify({ email: data.user.email, entityName: data.partner?.entityName || account.entityName, signedInAt: new Date().toISOString() }));
    } catch (apiError) {
      return setMessage(apiError.message || "Partner signup failed.");
    }
    localStorage.removeItem("ton_partner_onboarding_draft");
    localStorage.removeItem("ton_partner_onboarding_step");
    window.location.href = "/partner";
  });
}

function savePartnerOnboardingDraft(step = 0) {
  const draft = { step };
  $$("#partner-signup-form input, #partner-signup-form select, #partner-signup-form textarea").forEach((field) => {
    if (field.type === "radio") {
      if (field.checked) draft[field.name] = field.value;
    } else if (field.type === "checkbox") {
      draft[field.id] = field.checked;
    } else {
      draft[field.id] = field.value;
    }
  });
  localStorage.setItem("ton_partner_onboarding_draft", JSON.stringify(draft));
  localStorage.setItem("ton_partner_onboarding_step", String(step));
}

function restorePartnerOnboardingDraft() {
  const draft = JSON.parse(localStorage.getItem("ton_partner_onboarding_draft") || "{}");
  Object.entries(draft).forEach(([id, value]) => {
    if (id === "partner-account-type") {
      const radio = $(`[name='partner-account-type'][value='${value}']`);
      if (radio) radio.checked = true;
      return;
    }
    const field = document.getElementById(id);
    if (!field) return;
    if (field.type === "checkbox") field.checked = Boolean(value);
    else field.value = value;
  });
  state.partnerOnboardingStep = Number(draft.step ?? state.partnerOnboardingStep ?? 0);
}

function refreshPartnerOnboarding() {
  const step = state.partnerOnboardingStep || 0;
  $$(".onboarding-step").forEach((item) => item.classList.toggle("active", Number(item.dataset.onboardingStep) === step));
  $("#partner-onboarding-prev").disabled = step === 0;
  $("#partner-onboarding-next").hidden = step === 4;
  $("#partner-onboarding-submit").hidden = step !== 4;
  $("#partner-onboarding-progress").innerHTML = ["Secure", "Business", "Trust", "Verify", "Start"].map((label, index) => `<span class="${index <= step ? "active" : ""}">${index + 1}. ${label}</span>`).join("");
  const type = $("[name='partner-account-type']:checked")?.value || "individual";
  if ($("#partner-display-name-label")) {
    $("#partner-display-name-label").firstChild.textContent = type === "individual" ? "Display Name " : "Business / Company Name ";
  }
  $("#partner-signup-county").disabled = $("#partner-signup-countrywide")?.checked || false;
}

function validatePartnerOnboardingStep() {
  const step = state.partnerOnboardingStep || 0;
  if (step === 0) {
    const email = $("#partner-signup-email").value.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Valid partner email is required.";
    if (!passwordIsStrong($("#partner-signup-password").value)) return "Use a stronger password.";
    if ($("#partner-signup-password").value !== $("#partner-signup-confirm-password").value) return "Password confirmation must match.";
    if (!/^(?:\+254|254|0)[17]\d{8}$/.test($("#partner-signup-phone").value.trim().replace(/\s+/g, ""))) return "Kenyan phone number is required for OTP.";
  }
  if (step === 2 && !$("#partner-signup-entity-name").value.trim()) return "Display or entity name is required.";
  if (step === 3 && !/^\d{6}$/.test($("#partner-signup-otp").value.trim())) return "Enter a valid 6-digit verification code.";
  if (step === 4 && !$("#partner-signup-terms").checked) return "Accept the trust and advertising policy before launching promotions.";
  return "";
}

async function bootProfile() {
  const [data, reference] = await Promise.all([
    api("/me").catch(() => null),
    api("/reference").catch(() => null)
  ]);
  state.reference = reference;
  const profile = data?.profile || {};
  const subjectOptions = reference?.subjectCombinations?.length ? reference.subjectCombinations : subjects;
  const countyOptions = reference?.counties?.length ? reference.counties : counties;
  $("#subject-combination").innerHTML = optionList(subjectOptions, profile.subjectCombination || "English + Literature");
  $("#current-county").innerHTML = optionList(countyOptions, profile.currentCounty || "Nairobi");
  $("#level").value = profile.teachingLevel || "SECONDARY";
  populateSubcountyDropdown(profile.currentSubCounty || "");
  $("#school-name").value = profile.schoolName || "";
  $("#allow-messages").checked = profile.allowMessages !== false;
  $("#allow-calls").checked = profile.allowCalls !== false;
  setProfileEditing(!profile.profileCompleted);
  $("#edit-profile-button")?.addEventListener("click", () => setProfileEditing(true));
  $("#cancel-profile-edit")?.addEventListener("click", () => {
    setProfileEditing(false);
    window.location.reload();
  });
  $("#current-county").addEventListener("change", () => populateSubcountyDropdown(""));

  $("#profile-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await api("/profile", {
        method: "PUT",
        body: JSON.stringify({
          teachingLevel: $("#level").value,
          subjectCombination: $("#level").value === "PRIMARY" ? null : $("#subject-combination").value,
          currentCounty: $("#current-county").value,
          currentSubCounty: $("#sub-county").value,
          schoolName: $("#school-name").value,
          allowMessages: $("#allow-messages").checked,
          allowCalls: $("#allow-calls").checked
        })
      });
      if (profile.profileCompleted) {
        setProfileEditing(false);
        setMessage("Profile changes saved.", "success");
      } else {
        window.location.href = "/swap";
      }
    } catch (error) {
      setMessage(error.message);
    }
  });
}

function partnerDraft() {
  return JSON.parse(localStorage.getItem("ton_partner_draft") || "{}");
}

function partnerCampaigns() {
  return JSON.parse(localStorage.getItem("ton_partner_campaigns") || "[]");
}

function draftHasMeaningfulContent(draft = partnerDraft()) {
  return Object.entries(draft).some(([key, value]) => {
    if (key === "step" || key === "target-nationwide" || key === "ad-type-choice" || key === "ad-type") return false;
    if (Array.isArray(value)) return value.length > 0;
    return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
  });
}

function savePartnerCampaigns(campaigns) {
  localStorage.setItem("ton_partner_campaigns", JSON.stringify(campaigns));
}

async function syncPartnerCampaigns() {
  if (!partnerToken()) return partnerCampaigns();
  try {
    const data = await partnerApi("/partner/campaigns");
    savePartnerCampaigns(data.campaigns || []);
    return data.campaigns || [];
  } catch {
    return partnerCampaigns();
  }
}

function clearPartnerDraft() {
  localStorage.removeItem("ton_partner_draft");
  state.partnerStep = 0;
  state.partnerVideoDuration = 0;
  state.partnerImageMeta = {};
}

function resetPartnerCampaignForm() {
  clearPartnerDraft();
  $("#partner-form")?.reset();
  if ($("#ad-type")) $("#ad-type").value = "text";
  const textRadio = $("[name='ad-type-choice'][value='text']");
  if (textRadio) textRadio.checked = true;
    if ($("#ad-start-date")) $("#ad-start-date").valueAsDate = new Date();
  $("#partner-status").textContent = "Draft";
  refreshPartnerWizard();
}

function savePartnerDraft(step = state.partnerStep || 0) {
  const draft = { step };
  $$("#partner-form input, #partner-form select, #partner-form textarea").forEach((field) => {
    if (field.type === "file") {
      draft[field.id] = [...field.files].map((file) => ({ name: file.name, size: file.size, type: file.type }));
    } else if (field.type === "radio") {
      if (field.checked) draft[field.name] = field.value;
    } else if (field.type === "checkbox") {
      draft[field.id] = field.checked;
    } else {
      draft[field.id] = field.value;
    }
  });
  localStorage.setItem("ton_partner_draft", JSON.stringify(draft));
  return draft;
}

function restorePartnerDraft() {
  const draft = partnerDraft();
  Object.entries(draft).forEach(([id, value]) => {
    const field = document.getElementById(id);
    if (id === "ad-type-choice") {
      const radio = $(`[name='ad-type-choice'][value='${value}']`);
      if (radio) radio.checked = true;
      return;
    }
    if (!field || field.type === "file") return;
    if (field.type === "checkbox") field.checked = Boolean(value);
    else field.value = value;
  });
  state.partnerStep = Number(draft.step || 0);
  const selectedType = draft["ad-type-choice"] || draft["ad-type"] || $("#ad-type")?.value || "text";
  const radio = $(`[name='ad-type-choice'][value='${selectedType}']`);
  if (radio) radio.checked = true;
  if ($("#ad-type")) $("#ad-type").value = selectedType;
}

function adBasePrice(type) {
  if (type === "video") return 899;
  if (type === "photo") return 599;
  return 399;
}

function adFrequencyMultiplier(value) {
  return { all_day: 1.8, twice_day: 1.4, thrice_week: 1.1, once_week: 1 }[value] || 1;
}

function adWordLimit(type) {
  if (type === "photo") return 180;
  if (type === "video") return 140;
  return 100;
}

function pricingBreakdown() {
  const type = $("#ad-type")?.value || "text";
  const duration = Math.max(3, Number($("#ad-duration")?.value || 7));
  const base = adBasePrice(type);
  const billableDays = Math.max(7, duration);
  const durationMultiplier = duration <= 7 ? 1 : Number((1 + ((duration - 7) * 0.08)).toFixed(2));
  const frequency = $("#ad-frequency")?.value || "all_day";
  const frequencyMultiplier = adFrequencyMultiplier(frequency);
  const locationMultiplier = $("#target-nationwide")?.checked ? 1.15 : 1;
  const finalPrice = Math.ceil(base * durationMultiplier * frequencyMultiplier * locationMultiplier);
  return { type, duration, billableDays, base, durationMultiplier, frequency, frequencyMultiplier, locationMultiplier, finalPrice };
}

function adPrice() {
  return pricingBreakdown().finalPrice;
}

function refreshPartnerWizard() {
  const step = state.partnerStep || 0;
  $$(".wizard-step").forEach((item) => item.classList.toggle("active", Number(item.dataset.step) === step));
  $("#partner-prev").disabled = step === 0;
  $("#partner-next").hidden = step === 5;
  $("#partner-submit").hidden = step !== 5;
  $("#partner-status").textContent = step === 5 ? "Ready for approval" : "Draft";
  $("#partner-progress").innerHTML = ["Goal", "Message", "Audience", "Visibility", "Investment", "Launch"].map((label, index) => `<span class="${index <= step ? "active" : ""}">${index + 1}. ${label}</span>`).join("");
  refreshAdRules();
  refreshPartnerReview();
  renderCampaignStateTrack();
}

function refreshAdRules() {
  const type = $("#ad-type")?.value || "text";
  const words = ($("#ad-text")?.value || "").trim().split(/\s+/).filter(Boolean);
  const limit = adWordLimit(type);
  if ($("#ad-word-count")) $("#ad-word-count").textContent = `${words.length} / ${limit} words`;
  if ($("#ad-performance-score")) $("#ad-performance-score").textContent = `Performance score: ${adPerformanceScore()}%`;
  if ($("#ad-price")) $("#ad-price").textContent = `KES ${adPrice().toLocaleString()}`;
  $$("[data-ad-tool]").forEach((item) => item.hidden = item.dataset.adTool !== type);
  $$(".photo-field").forEach((item) => item.hidden = type !== "photo");
  $$(".video-field").forEach((item) => item.hidden = type !== "video");
  if ($("#ad-photos")) $("#ad-photos").disabled = type !== "photo";
  if ($("#ad-video")) $("#ad-video").disabled = type !== "video";
  if ($("#ad-thumbnail")) $("#ad-thumbnail").disabled = type !== "video";
  if ($("#target-county")) $("#target-county").disabled = $("#target-nationwide")?.checked || false;
  $("#ad-word-count")?.classList.toggle("limit-exceeded", words.length > limit);
  renderPricingBreakdown();
  renderMediaPreview();
  renderAdPreview();
}

function renderAdPreview() {
  const target = $("#ad-preview");
  if (!target) return;
  let html = escapeHtml($("#ad-text")?.value || "Your formatted ad text will appear here.");
  const keywords = ($("#ad-keywords")?.value || "").split(",").map((item) => item.trim()).filter(Boolean);
  keywords.forEach((keyword) => {
    const pattern = new RegExp(`(${escapeRegExp(keyword)})`, "gi");
    const tag = $("#ad-keyword-style")?.value === "underline" ? "u" : "mark";
    html = html.replace(pattern, `<${tag}>$1</${tag}>`);
  });
  html = html
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/==([^=]+)==/g, "<mark>$1</mark>");
  const link = $("#ad-link")?.value?.trim();
  if (link) html += `<p><a href="${escapeHtml(link)}" target="_blank" rel="noopener">${escapeHtml($("#ad-cta")?.value || "Learn More")}</a></p>`;
  target.innerHTML = html;
}

function insertAdToken(token) {
  const textarea = $("#ad-text");
  if (!textarea) return;
  const start = textarea.selectionStart || 0;
  const end = textarea.selectionEnd || 0;
  textarea.value = `${textarea.value.slice(0, start)}${token}${textarea.value.slice(end)}`;
  textarea.focus();
  textarea.setSelectionRange(start + token.length, start + token.length);
  refreshPartnerWizard();
}

function formatSelectedAdText(wrapper) {
  const textarea = $("#ad-text");
  if (!textarea) return;
  const start = textarea.selectionStart || 0;
  const end = textarea.selectionEnd || 0;
  const selected = textarea.value.slice(start, end) || "keyword";
  const token = wrapper === "bold" ? `**${selected}**` : `==${selected}==`;
  textarea.value = `${textarea.value.slice(0, start)}${token}${textarea.value.slice(end)}`;
  textarea.focus();
  textarea.setSelectionRange(start, start + token.length);
  refreshPartnerWizard();
}

function renderMediaPreview() {
  const target = $("#media-preview");
  if (!target) return;
  const photos = $("#ad-photos")?.files ? [...$("#ad-photos").files] : [];
  const video = $("#ad-video")?.files?.[0];
  if (!photos.length && !video) {
    target.innerHTML = "";
    return;
  }
  const imageMeta = state.partnerImageMeta || {};
  const items = photos.slice(0, 4).map((file, index) => {
    const meta = imageMeta[file.name];
    const status = meta ? (meta.square ? `${meta.width}x${meta.height}, square` : `${meta.width}x${meta.height}, not square`) : "Checking dimensions";
    return `<div class="${meta && !meta.square ? "invalid" : ""}"><strong>Image ${index + 1}</strong><span>${escapeHtml(file.name)}</span><small>${status}</small><button class="secondary" type="button" data-photo-order="${index}">Order ${index + 1}</button></div>`;
  });
  if (video) items.push(`<div><strong>Video</strong><span>${escapeHtml(video.name)}</span><small>${state.partnerVideoDuration ? `${Math.ceil(state.partnerVideoDuration)} seconds` : "Checking duration"}</small></div>`);
  target.innerHTML = items.join("");
}

function adPerformanceScore() {
  const text = $("#ad-text")?.value || "";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  let score = 20;
  if (($("#ad-title")?.value || "").trim().length > 8) score += 15;
  if (words >= 20) score += 20;
  if (($("#ad-keywords")?.value || "").trim()) score += 15;
  if (($("#ad-link")?.value || "").trim()) score += 15;
  if (($("#ad-cta")?.value || "").trim()) score += 10;
  if ($("#ad-type")?.value === "photo" && ($("#ad-photos")?.files?.length || 0)) score += 5;
  if ($("#ad-type")?.value === "video" && ($("#ad-video")?.files?.length || 0)) score += 5;
  return Math.min(100, score);
}

function applyAdTemplate(template) {
  const presets = {
    exam: {
      title: "CBC and Secondary Exam Revision Pack",
      text: "Help learners revise confidently with updated practice questions, marking guides, and printable teacher notes. ==CBC== resources are ready for classroom and home use.",
      keywords: "CBC, revision, exams",
      cta: "Download"
    },
    software: {
      title: "School Learning Software for Teachers",
      text: "Save preparation time with simple digital tools for assignments, learner progress, and lesson organization. **Built for busy schools and teachers.**",
      keywords: "software, teachers, edtech",
      cta: "Learn More"
    },
    training: {
      title: "Professional Teacher Training Webinar",
      text: "Join a practical teacher training session with certificates, classroom examples, and replay access. Ideal for educators improving modern teaching practice.",
      keywords: "training, webinar, CPD",
      cta: "Book Now"
    }
  };
  const preset = presets[template];
  if (!preset) return;
  $("#ad-title").value = preset.title;
  $("#ad-text").value = preset.text;
  $("#ad-keywords").value = preset.keywords;
  $("#ad-cta").value = preset.cta;
  refreshPartnerWizard();
}

function generateAdCopy() {
  const session = partnerSession() || {};
  const type = $("#ad-type")?.value || "text";
  const title = $("#ad-title")?.value.trim() || `${session.entityName || "Your brand"} campaign`;
  $("#ad-title").value = title;
  $("#ad-text").value = `Discover ${title.toLowerCase()} designed for Kenya's education community. Get practical value, clear support, and reliable results for teachers, learners, and institutions.`;
  $("#ad-keywords").value = "education, teachers, Kenya";
  refreshPartnerWizard();
  setMessage("AI message helper created a customer-ready draft.", "success");
}

function toggleEasySwapAiPanel(force) {
  const panel = $("#easyswap-ai-panel");
  if (!panel) return;
  panel.hidden = typeof force === "boolean" ? !force : !panel.hidden;
}

function populateEasySwapAiCountyOptions(countyOptions = counties) {
  const select = $("#ai-ad-county");
  if (!select) return;
  select.innerHTML = optionList(["Nationwide", ...countyOptions], "Nationwide");
}

function buildWithEasySwapAi() {
  const offer = ($("#ai-ad-offer")?.value || "").trim();
  if (!offer) return setMessage("Tell EasySwap AI what you are promoting.");
  const audience = $("#ai-ad-audience")?.value || "Teachers";
  const goal = $("#ai-ad-goal")?.value || "Generate leads";
  const format = $("#ai-ad-format")?.value || "text";
  const county = $("#ai-ad-county")?.value || "Nationwide";
  const tone = $("#ai-ad-tone")?.value || "Professional";
  const ctaByGoal = {
    "Generate leads": "Contact Us",
    "Sell product": "Shop Now",
    "Drive downloads": "Download",
    "Get bookings": "Book Now",
    "Build awareness": "Learn More"
  };
  const title = `${offer} for ${audience}`;
  const toneLine = {
    Professional: "built for reliable results and clear education impact",
    Friendly: "made simple, helpful, and easy to start using",
    Urgent: "available now for a limited campaign period",
    Premium: "designed for high-quality institutions and serious educators"
  }[tone] || "built for reliable results";
  const text = `${title} is ${toneLine}. Reach ${audience.toLowerCase()} with a focused offer that supports learning, saves time, and delivers practical value across Kenya.`;

  $("#ad-type").value = format;
  const radio = $(`[name='ad-type-choice'][value='${format}']`);
  if (radio) radio.checked = true;
  $("#ad-title").value = title;
  $("#ad-text").value = text;
  $("#ad-keywords").value = [offer.split(" ")[0], audience, goal].filter(Boolean).join(", ");
  $("#ad-cta").value = ctaByGoal[goal] || "Learn More";
  $("#ad-link").value = "";
  $("#target-nationwide").checked = county === "Nationwide";
  if ($("#target-county") && county !== "Nationwide") $("#target-county").value = county;
  $("#ad-placement").value = format === "video" ? "Blogs and videos" : "Platform-wide feed";
  $("#ad-interest").value = audience === "Parents" || audience === "Students" ? audience : "Education";
  $("#ad-duration").value = goal === "Build awareness" ? 14 : 7;
  $("#ad-frequency").value = goal === "Build awareness" ? "all_day" : "twice_day";
  if ($("#ad-start-date") && !$("#ad-start-date").value) $("#ad-start-date").valueAsDate = new Date();
  state.partnerStep = 1;
  savePartnerDraft(state.partnerStep);
  toggleEasySwapAiPanel(false);
  refreshPartnerWizard();
  setMessage("EasySwap AI built a promotion focused on your growth goal. Review it, then launch.", "success");
}

function renderPricingBreakdown() {
  const target = $("#ad-price-breakdown");
  if (!target) return;
  const price = pricingBreakdown();
  target.innerHTML = `
    <div><span>Starter visibility</span><strong>KES ${price.base.toLocaleString()}</strong></div>
    <div><span>Days visible</span><strong>${price.durationMultiplier}x</strong></div>
    <div><span>Visibility level</span><strong>${price.frequencyMultiplier}x</strong></div>
    <div><span>Reach area</span><strong>${price.locationMultiplier}x</strong></div>
    <div><span>Total growth investment</span><strong>KES ${price.finalPrice.toLocaleString()}</strong></div>
  `;
}

function inspectAdVideo() {
  const file = $("#ad-video")?.files?.[0];
  state.partnerVideoDuration = 0;
  if (!file) return;
  const video = document.createElement("video");
  video.preload = "metadata";
  video.onloadedmetadata = () => {
    URL.revokeObjectURL(video.src);
    state.partnerVideoDuration = video.duration || 0;
    const note = $("#ad-upload-note");
    if (note) {
      note.textContent = state.partnerVideoDuration > 300
        ? "Selected video is longer than 5 minutes. Choose a shorter ad video."
        : `Video length accepted: ${Math.ceil(state.partnerVideoDuration)} seconds.`;
    }
    renderMediaPreview();
  };
  video.src = URL.createObjectURL(file);
}

function inspectAdPhotos() {
  const files = $("#ad-photos")?.files ? [...$("#ad-photos").files] : [];
  state.partnerImageMeta = {};
  if (!files.length) {
    renderMediaPreview();
    return;
  }
  files.slice(0, 4).forEach((file) => {
    const image = new Image();
    image.onload = () => {
      state.partnerImageMeta[file.name] = {
        width: image.naturalWidth,
        height: image.naturalHeight,
        square: image.naturalWidth === image.naturalHeight
      };
      URL.revokeObjectURL(image.src);
      renderMediaPreview();
    };
    image.src = URL.createObjectURL(file);
  });
  renderMediaPreview();
}

function validatePartnerStep() {
  if (state.partnerStep === 1) {
    const words = $("#ad-text").value.trim().split(/\s+/).filter(Boolean);
    if (!$("#ad-title").value.trim()) return "Campaign title is required.";
    if (!words.length) return "Ad text is required.";
    if (words.length > adWordLimit($("#ad-type").value)) return "Ad text exceeds the allowed word count.";
    if ($("#ad-type").value === "photo" && $("#ad-photos").files.length > 4) return "Text + photo ads support a maximum of 4 photos.";
    if ($("#ad-type").value === "photo" && !$("#ad-photos").files.length) return "Upload at least one square photo for a text + photo ad.";
    if ($("#ad-type").value === "photo" && Object.values(state.partnerImageMeta || {}).some((item) => !item.square)) return "Every image ad upload must be square (1:1 ratio).";
    if ($("#ad-type").value === "video" && !$("#ad-video").files.length) return "Upload a video ad file.";
    if ($("#ad-type").value === "video" && state.partnerVideoDuration > 300) return "Video ads must be 5 minutes or shorter.";
  }
  if (state.partnerStep === 2) {
    if (!$("#target-nationwide").checked && !$("#target-county").value) return "Select a target county or choose Nationwide.";
  }
  if (state.partnerStep === 3) {
    if (Number($("#ad-duration").value) < 3) return "Minimum selectable duration is 3 days.";
    if (!$("#ad-start-date").value) return "Select a campaign start date.";
  }
  if (state.partnerStep === 4) {
    if (!/^[A-Za-z0-9]{6,16}$/.test($("#verification-code").value.trim())) return "Enter a valid payment verification or transaction code.";
  }
  return "";
}

function refreshPartnerReview() {
  const target = $("#partner-review");
  if (!target) return;
  const session = partnerSession() || {};
  const price = pricingBreakdown();
  target.innerHTML = `
    <div class="metric-card"><span>Partner</span><strong>${session.entityName || session.email || "Not set"}</strong></div>
    <div class="metric-card"><span>Growth approach</span><strong>${price.type === "photo" ? "Visual promotion" : price.type === "video" ? "Maximum visibility" : "Fast visibility"}</strong></div>
    <div class="metric-card"><span>People reached</span><strong>${$("#target-nationwide")?.checked ? "Nationwide" : $("#target-county")?.value}</strong></div>
    <div class="metric-card"><span>Days visible</span><strong>${$("#ad-duration")?.value || 7} days</strong></div>
    <div class="metric-card"><span>Visibility level</span><strong>${$("#ad-frequency")?.selectedOptions[0]?.textContent || "Priority Exposure"}</strong></div>
    <div class="metric-card"><span>Payment</span><strong>${$("#payment-method")?.value || "M-Pesa"}</strong></div>
    <div class="metric-card"><span>Growth investment</span><strong>KES ${price.finalPrice.toLocaleString()}</strong></div>
  `;
}

function renderCampaignStateTrack(status = "DRAFT") {
  const target = $("#campaign-state-track");
  if (!target) return;
  const states = ["DRAFT", "PENDING_PAYMENT", "PENDING_VERIFICATION", "PENDING_APPROVAL", "LIVE", "COMPLETED"];
  const current = states.indexOf(status);
  target.innerHTML = states.map((item, index) => `<span class="${index <= current ? "active" : ""}">${item.replaceAll("_", " ")}</span>`).join("");
}

async function bootPartner() {
  const session = partnerSession();
  if (!session) {
    window.location.href = "/partner-login";
    return;
  }
  if (partnerToken()) {
    try {
      const data = await partnerApi("/partner/me");
      localStorage.setItem("ton_partner_session", JSON.stringify({ email: data.user.email, entityName: data.partner?.entityName || data.user.email, signedInAt: session.signedInAt || new Date().toISOString() }));
    } catch {
      localStorage.removeItem("ton_partner_token");
      localStorage.removeItem("ton_partner_session");
      window.location.href = "/partner-login";
      return;
    }
  }
  if ($("#partner-account-summary")) {
    const currentSession = partnerSession() || session;
    $("#partner-account-summary").textContent = `${currentSession.entityName || currentSession.email} signed in to the dedicated advertiser portal.`;
  }
  $("#partner-logout-button")?.addEventListener("click", () => {
    localStorage.removeItem("ton_partner_token");
    localStorage.removeItem("ton_partner_session");
    window.location.href = "/partner-login";
  });
  const reference = await api("/reference").catch(() => null);
  const countyOptions = reference?.counties?.length ? reference.counties : counties;
  if ($("#target-county")) $("#target-county").innerHTML = optionList(countyOptions, "Nairobi");
  populateEasySwapAiCountyOptions(countyOptions);
  if ($("#ad-start-date") && !$("#ad-start-date").value) $("#ad-start-date").valueAsDate = new Date();
  restorePartnerDraft();
  await syncPartnerCampaigns();
  selectPartnerView("dashboard");
  renderPartnerDashboard();
  refreshPartnerWizard();

  $$("[name='ad-type-choice']").forEach((radio) => {
    radio.addEventListener("change", () => {
      $("#ad-type").value = radio.value;
      savePartnerDraft(state.partnerStep || 0);
      refreshPartnerWizard();
    });
  });
  ["ad-type", "ad-duration", "ad-frequency", "ad-text", "ad-keywords", "ad-keyword-style", "ad-link", "payment-method", "ad-title", "ad-cta", "target-county", "target-nationwide", "ad-placement", "ad-interest", "ad-start-date", "verification-code"].forEach((id) => {
    $(`#${id}`)?.addEventListener("input", refreshPartnerWizard);
    $(`#${id}`)?.addEventListener("change", refreshPartnerWizard);
  });
  $$("[data-insert-token]").forEach((button) => {
    button.addEventListener("click", () => insertAdToken(button.dataset.insertToken));
  });
  $$("[data-format-token]").forEach((button) => {
    button.addEventListener("click", () => formatSelectedAdText(button.dataset.formatToken));
  });
  $$("[data-ad-template]").forEach((button) => {
    button.addEventListener("click", () => applyAdTemplate(button.dataset.adTemplate));
  });
  $("#ai-copy-button")?.addEventListener("click", generateAdCopy);
  $("#easyswap-ai-button")?.addEventListener("click", () => toggleEasySwapAiPanel(true));
  $("#easyswap-ai-close")?.addEventListener("click", () => toggleEasySwapAiPanel(false));
  $("#easyswap-ai-build")?.addEventListener("click", buildWithEasySwapAi);
  $("#ad-video")?.addEventListener("change", inspectAdVideo);
  $("#ad-photos")?.addEventListener("change", () => {
    inspectAdPhotos();
    refreshPartnerWizard();
  });
  $("#ad-thumbnail")?.addEventListener("change", renderMediaPreview);
  $("#why-cost-button")?.addEventListener("click", () => {
    $("#ad-price-breakdown")?.classList.toggle("expanded");
    setMessage("Pricing uses base cost, duration, frequency, and targeting multipliers.", "info");
  });
  $$("[data-partner-view]").forEach((button) => {
    button.addEventListener("click", () => selectPartnerView(button.dataset.partnerView));
  });
  $("#new-campaign-button")?.addEventListener("click", () => {
    resetPartnerCampaignForm();
    selectPartnerView("builder");
    setMessage("Fresh growth workspace opened. Start with the result you want.", "success");
  });
  $("#renew-best-campaign")?.addEventListener("click", () => renewBestCampaign());
  document.addEventListener("click", (event) => {
    const renew = event.target.closest("[data-renew-campaign]");
    if (!renew) return;
    renewCampaign(renew.dataset.renewCampaign);
  });
  $("#partner-prev").addEventListener("click", () => {
    state.partnerStep = Math.max(0, (state.partnerStep || 0) - 1);
    savePartnerDraft(state.partnerStep);
    refreshPartnerWizard();
  });
  $("#partner-next").addEventListener("click", () => {
    const error = validatePartnerStep();
    if (error) return setMessage(error);
    state.partnerStep = Math.min(5, (state.partnerStep || 0) + 1);
    savePartnerDraft(state.partnerStep);
    refreshPartnerWizard();
  });
  $("#partner-save").addEventListener("click", () => {
    savePartnerDraft(state.partnerStep || 0);
    setMessage("Promotion idea saved. You can continue later.", "success");
  });
  $("#partner-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    savePartnerDraft(5);
    let campaign = buildCampaignFromDraft();
    try {
      const result = await partnerApi("/partner/campaigns", {
        method: "POST",
        body: JSON.stringify({
          title: campaign.title,
          type: campaign.type,
          textContent: $("#ad-text").value.trim(),
          keywords: ($("#ad-keywords").value || "").split(",").map((item) => item.trim()).filter(Boolean),
          keywordStyle: $("#ad-keyword-style").value,
          cta: $("#ad-cta").value,
          destinationUrl: $("#ad-link").value.trim(),
          targeting: campaign.targeting,
          placement: campaign.placement,
          interest: campaign.interest,
          startDate: campaign.startDate,
          duration: campaign.duration,
          frequency: campaign.frequency,
          paymentMethod: $("#payment-method").value,
          verificationCode: campaign.verificationCode
        })
      });
      campaign = result.campaign || campaign;
      await syncPartnerCampaigns();
    } catch {
      const campaigns = partnerCampaigns();
      campaigns.unshift(campaign);
      savePartnerCampaigns(campaigns);
    }
    clearPartnerDraft();
    $("#partner-form").reset();
    localStorage.setItem("ton_partner_status", "pending_admin_approval");
    $("#partner-status").textContent = "Pending admin approval";
    renderCampaignStateTrack("PENDING_APPROVAL");
    await renderPartnerDashboard();
    selectPartnerView("dashboard");
    setMessage("Your promotion is paid and queued for trust review.", "success");
  });
  window.clearInterval(state.partnerAutosaveTimer);
  state.partnerAutosaveTimer = window.setInterval(() => {
    if ($("#partner-form")) savePartnerDraft(state.partnerStep || 0);
  }, 15000);
}

function selectPartnerView(view) {
  const sections = {
    dashboard: $("#partner-dashboard"),
    builder: $("#partner-builder"),
    billing: $("#partner-billing-panel"),
    approvals: $("#partner-approvals-panel"),
    analytics: $("#partner-analytics-panel")
  };
  Object.entries(sections).forEach(([key, section]) => {
    if (section) section.hidden = key !== view;
  });
  $$("[data-partner-view]").forEach((button) => button.classList.toggle("active", button.dataset.partnerView === view));
  if (view !== "builder") renderPartnerDashboard();
}

function buildCampaignFromDraft() {
  const session = partnerSession() || {};
  const price = pricingBreakdown();
  return {
    id: `CMP-${Date.now()}`,
    partner: session.entityName || session.email,
    title: $("#ad-title").value.trim(),
    type: price.type.toUpperCase(),
    status: "PENDING_APPROVAL",
    paymentStatus: "PAID",
    verificationCode: $("#verification-code").value.trim(),
    startDate: $("#ad-start-date").value,
    duration: Number($("#ad-duration").value || 7),
    frequency: $("#ad-frequency").value,
    targeting: $("#target-nationwide").checked ? "Nationwide" : $("#target-county").value,
    placement: $("#ad-placement").value,
    interest: $("#ad-interest").value,
    totalCost: price.finalPrice,
    createdAt: new Date().toISOString(),
    endDate: campaignEndDate($("#ad-start-date").value, Number($("#ad-duration").value || 7)),
    budgetBalance: Math.ceil(price.finalPrice * 0.64),
    views: Math.floor(price.finalPrice * 2.7),
    engagements: Math.floor(price.finalPrice * 0.18)
  };
}

function campaignEndDate(startDate, duration) {
  const start = startDate ? new Date(startDate) : new Date();
  start.setDate(start.getDate() + Math.max(3, duration));
  return start.toISOString().slice(0, 10);
}

function daysLeft(campaign) {
  const end = campaign.endDate ? new Date(campaign.endDate) : new Date();
  const diff = Math.ceil((end.getTime() - Date.now()) / 86400000);
  return Math.max(0, diff);
}

function renderPartnerDashboard() {
  const campaigns = partnerCampaigns();
  const draft = partnerDraft();
  const hasDraft = draftHasMeaningfulContent(draft);
  const drafts = campaigns.filter((item) => item.status === "DRAFT").length + (hasDraft ? 1 : 0);
  const pending = campaigns.filter((item) => item.status === "PENDING_APPROVAL").length;
  const live = campaigns.filter((item) => item.status === "LIVE").length;
  const spend = campaigns.reduce((sum, item) => sum + Number(item.totalCost || 0), 0);
  if ($("#campaign-draft-count")) $("#campaign-draft-count").textContent = drafts;
  if ($("#campaign-approval-count")) $("#campaign-approval-count").textContent = pending;
  if ($("#campaign-live-count")) $("#campaign-live-count").textContent = live;
  if ($("#campaign-spend-total")) $("#campaign-spend-total").textContent = `KES ${spend.toLocaleString()}`;
  const list = $("#partner-campaign-list");
  if (list) {
    list.innerHTML = campaigns.length ? campaigns.map(campaignCard).join("") : `<div class="notice">No promotions yet. Start with the customers you want to reach.</div>`;
  }
  if ($("#partner-billing-list")) {
    $("#partner-billing-list").innerHTML = campaigns.length ? campaigns.map((item) => `<article class="list-item"><div><h3>${escapeHtml(item.title)}</h3><p>${item.paymentStatus} - KES ${Number(item.totalCost).toLocaleString()} invested in visibility via confirmation ${escapeHtml(item.verificationCode || "pending")}.</p></div><span class="status-pill">${item.paymentStatus}</span></article>`).join("") : `<div class="notice">No growth investments yet.</div>`;
  }
  if ($("#partner-approvals-list")) {
    $("#partner-approvals-list").innerHTML = campaigns.length ? campaigns.map((item) => `<article class="list-item"><div><h3>${escapeHtml(item.title)}</h3><p>${item.status.replaceAll("_", " ")} - Verified promotions protect trust and help customers feel safe.</p></div><span class="status-pill">${item.status}</span></article>`).join("") : `<div class="notice">No promotions waiting for trust review.</div>`;
  }
  if ($("#partner-views-total")) $("#partner-views-total").textContent = campaigns.reduce((sum, item) => sum + Number(item.views || 0), 0).toLocaleString();
  if ($("#partner-engagement-total")) $("#partner-engagement-total").textContent = campaigns.reduce((sum, item) => sum + Number(item.engagements || 0), 0).toLocaleString();
  const views = campaigns.reduce((sum, item) => sum + Number(item.views || 0), 0);
  const engagements = campaigns.reduce((sum, item) => sum + Number(item.engagements || 0), 0);
  if ($("#partner-ctr-total")) $("#partner-ctr-total").textContent = views ? `${((engagements / views) * 100).toFixed(1)}%` : "0%";
  if ($("#partner-balance-left")) $("#partner-balance-left").textContent = `KES ${campaigns.reduce((sum, item) => sum + Number(item.budgetBalance || 0), 0).toLocaleString()}`;
  if ($("#partner-performance-chart")) {
    const top = campaigns.slice(0, 6);
    const maxViews = Math.max(1, ...top.map((item) => Number(item.views || 0)));
    $("#partner-performance-chart").innerHTML = top.length ? top.map((item) => `<div><span>${escapeHtml(item.title)}</span><b style="width:${Math.max(8, (Number(item.views || 0) / maxViews) * 100)}%"></b><strong>${Number(item.views || 0).toLocaleString()}</strong></div>`).join("") : `<p>No performance data yet.</p>`;
  }
  if ($("#partner-time-left-list")) {
    $("#partner-time-left-list").innerHTML = campaigns.length ? campaigns.map((item) => `<article class="list-item"><div><h3>${escapeHtml(item.title)}</h3><p>${daysLeft(item)} days left to stay visible. Visibility value left KES ${Number(item.budgetBalance || 0).toLocaleString()}.</p></div><button type="button" data-renew-campaign="${item.id}">Keep Running</button></article>`).join("") : `<div class="notice">No active visibility timelines yet.</div>`;
  }
}

function campaignCard(item) {
  return `<article class="list-item campaign-card"><div><h3>${escapeHtml(item.title)}</h3><p>${item.type} promotion for ${escapeHtml(item.targeting)}. ${daysLeft(item)} days left to stay visible, with KES ${Number(item.budgetBalance || 0).toLocaleString()} visibility value remaining.</p><div class="inline-tags"><span>${item.status.replaceAll("_", " ")}</span><span>${item.paymentStatus}</span><span>KES ${Number(item.totalCost).toLocaleString()}</span></div></div><div class="list-actions"><button class="secondary" type="button" data-renew-campaign="${item.id}">Keep Running</button></div></article>`;
}

function renewCampaign(id) {
  const campaigns = partnerCampaigns();
  const original = campaigns.find((item) => item.id === id);
  if (!original) return;
  const today = new Date().toISOString().slice(0, 10);
  const renewed = {
    ...original,
    id: `CMP-${Date.now()}`,
    title: `${original.title} Renewal`,
    status: "DRAFT",
    paymentStatus: "PENDING",
    startDate: today,
    endDate: campaignEndDate(today, Number(original.duration || 7)),
    createdAt: new Date().toISOString()
  };
  campaigns.unshift(renewed);
  savePartnerCampaigns(campaigns);
  renderPartnerDashboard();
  setMessage("Renewal draft created so you can keep your visibility going.", "success");
}

function renewBestCampaign() {
  const campaigns = partnerCampaigns();
  const best = campaigns.slice().sort((a, b) => Number(b.engagements || 0) - Number(a.engagements || 0))[0];
  if (!best) return setMessage("No promotion available to renew yet.", "info");
  renewCampaign(best.id);
}

function populateSubcountyDropdown(selected) {
  const county = $("#current-county")?.value || "Nairobi";
  const options = state.reference?.subcountiesByCounty?.[county] || [];
  $("#sub-county").innerHTML = options.length
    ? optionList(options, selected || options[0])
    : `<option value="">No sub-counties loaded</option>`;
}

async function bootSwap() {
  const data = await api("/me").catch(() => null);
  const profile = data?.profile || {};
  $("#swap-subject").value = profile.subjectCombination || "NULL";
  $("#swap-current").value = profile.currentCounty || "";
  $("#desired-county").innerHTML = optionList(counties, "Kisumu");
  $("#swap-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await api("/swap-requests", {
        method: "POST",
        body: JSON.stringify({
          desiredCounty: $("#desired-county").value,
          desiredMoveMonth: $("#move-month").value,
          urgencyStatus: $("#urgency").value
        })
      });
      window.location.href = "/matches";
    } catch (error) {
      setMessage(error.message);
    }
  });
}

async function bootMatches() {
  const data = await api("/matches").catch(() => ({ matches: [] }));
  const list = $("#matches-list");
  $("#matches-count").textContent = data.matches.length;
  list.innerHTML = data.matches.length ? data.matches.map((match) => `
    <article class="list-item">
      <div>
        <h3>${match.name}</h3>
        <p>${match.subject} teacher in ${match.currentCounty}, wants ${match.desiredCounty}. ${match.urgency}.</p>
        <div class="inline-tags"><span>Exact match</span><span>${match.messages ? "DM enabled" : "DM off"}</span><span>${match.calls ? "Calls enabled" : "Calls off"}</span></div>
      </div>
      <div class="list-actions">
        <button data-match-action="dm" data-match-id="${match.id}" ${match.messages ? "" : "disabled"}>DM</button>
        <button class="secondary" data-match-action="call" data-match-id="${match.id}" ${match.calls ? "" : "disabled"}>Call</button>
        <button class="secondary" data-match-action="report" data-match-id="${match.id}">Report</button>
      </div>
    </article>
  `).join("") : `<div class="notice">No database-backed matches yet. Create a swap request for Kisumu to see the seeded Mary Achieng match.</div>`;
  bindMatchActions();
}

function bindMatchActions() {
  $$("[data-match-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.dataset.matchAction;
      const matchId = button.dataset.matchId;
      button.disabled = true;
      try {
        if (action === "dm") {
          const result = await api(`/matches/${matchId}/dm`, { method: "POST" });
          sessionStorage.setItem("ton_last_conversation_id", result.conversationId);
          window.location.href = "/messages";
          return;
        }
        if (action === "call") {
          const result = await api(`/matches/${matchId}/call`, { method: "POST" });
          setMessage(`${result.message} ${result.phoneNumber}`, "success");
          window.location.href = result.telUrl;
        }
        if (action === "report") {
          const reason = window.prompt("Reason for reporting this match/user", "Inappropriate or suspicious match activity");
          if (!reason) return;
          const result = await api(`/matches/${matchId}/report`, {
            method: "POST",
            body: JSON.stringify({ reason })
          });
          setMessage(result.message, "success");
        }
      } catch (error) {
        setMessage(error.message);
      } finally {
        button.disabled = false;
      }
    });
  });
}

async function bootMessages() {
  const list = $("#conversations-list");
  if (!list) return;
  const data = await api("/conversations").catch((error) => {
    setMessage(error.message);
    return { conversations: [] };
  });
  list.innerHTML = data.conversations.length ? data.conversations.map((conversation) => `
    <article class="list-item">
      <div>
        <h3>${conversation.name}</h3>
        <p>${conversation.lastMessage}</p>
        <div class="inline-tags">
          <span>${conversation.archived ? "Archived" : "Active"}</span>
          <span>${conversation.muted ? "Muted" : "Notifications on"}</span>
          <span>${conversation.blocked ? "Blocked" : "Allowed"}</span>
        </div>
      </div>
      <div class="list-actions">
        <button data-message-action="open" data-conversation-id="${conversation.id}">Open</button>
        <button class="secondary" data-message-action="archive" data-conversation-id="${conversation.id}">Archive</button>
        <button class="danger" data-message-action="block" data-conversation-id="${conversation.id}">Block</button>
      </div>
    </article>
  `).join("") : `<div class="notice">No conversations yet. Open a DM from the Matches page.</div>`;
  bindMessageActions();
}

function bindMessageActions() {
  $$("[data-message-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".list-item");
      if (button.dataset.messageAction === "open") {
        item.classList.add("is-open");
        setMessage("Conversation opened. Full chat composer is the next messaging build step.", "success");
      }
      if (button.dataset.messageAction === "archive") {
        item.classList.add("is-archived");
        setMessage("Conversation archived locally.", "success");
      }
      if (button.dataset.messageAction === "block") {
        item.classList.add("is-blocked");
        setMessage("User blocked locally. Server-side block list is the next moderation step.", "success");
      }
    });
  });
}

function bootVideos() {
  const list = $("#videos-list");
  if (!list) return;
  list.innerHTML = staticVideos.map(([id, title, creator, topic, views, duration, color]) => `
    <article class="video-card" data-video="${id}">
      <div class="thumbnail" style="background:${color}"><span class="play-badge">▶</span><span class="duration">${duration}</span></div>
      <div class="video-card-body"><h3>${title}</h3><p>${creator}</p><p>${topic} • ${views}</p></div>
    </article>
  `).join("");
  $$(".video-card").forEach((card) => {
    card.addEventListener("click", () => {
      window.location.href = `/watch?id=${card.dataset.video}`;
    });
  });
}

function bootWatch() {
  const id = new URLSearchParams(window.location.search).get("id") || "cbc-science-practicals";
  const video = staticVideos.find((item) => item[0] === id) || staticVideos[0];
  $("#watch-player").style.background = video[6];
  $("#watch-title").textContent = video[1];
  $("#watch-creator").textContent = video[2];
  $("#watch-stats").textContent = `${video[4]} • ${video[3]}`;
}

function bootStaticCards() {
  const target = $("#static-cards");
  if (!target) return;
  const cards = JSON.parse(target.dataset.cards || "[]");
  target.innerHTML = cards.map((card) => `
    <article class="card"><p class="eyebrow">${card.type}</p><h3>${card.title}</h3><p>${card.body}</p><footer>${card.meta || ""}</footer></article>
  `).join("");
}

async function boot() {
  bootShell();
  const page = document.body.dataset.page;
  if (page === "login") await bootLogin();
  if (page === "signup") await bootSignup();
  if (page === "partner-login") await bootPartnerLogin();
  if (page === "partner-signup") await bootPartnerSignup();
  if (page === "profile") await bootProfile();
  if (page === "partner") await bootPartner();
  if (page === "swap") await bootSwap();
  if (page === "matches") await bootMatches();
  if (page === "messages") await bootMessages();
  if (page === "videos") bootVideos();
  if (page === "watch") bootWatch();
  bootStaticCards();
}

boot();
