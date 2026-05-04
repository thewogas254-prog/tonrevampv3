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
  {
    id: "transfer-request-guide",
    title: "How to prepare a strong transfer request",
    topic: "TSC",
    format: "Blog",
    author: "Mary Achieng",
    date: "2026-05-01",
    stats: "1.9k reads",
    likes: 245,
    comments: 23,
    shares: 12,
    content: `
      <h2>Understanding the TSC Transfer Process</h2>
      <p>The Teachers Service Commission (TSC) transfer process can be complex, but with proper preparation, you can significantly increase your chances of a successful transfer. This guide covers everything you need to know.</p>

      <h3>Step 1: Research Your Options</h3>
      <p>Before submitting a transfer request, research the counties and schools you're interested in. Consider factors like:</p>
      <ul>
        <li>Cost of living in the target county</li>
        <li>School performance and resources</li>
        <li>Proximity to family and support networks</li>
        <li>Availability of housing</li>
      </ul>

      <h3>Step 2: Prepare Your Documentation</h3>
      <p>Ensure you have all required documents ready:</p>
      <ul>
        <li>Current appointment letter</li>
        <li>Academic certificates</li>
        <li>Medical reports (if applicable)</li>
        <li>Marriage certificate (for spousal transfers)</li>
        <li>Children's birth certificates (for family transfers)</li>
      </ul>

      <h3>Step 3: Submit Your Application</h3>
      <p>Use the TSC online portal to submit your application. Make sure to:</p>
      <ul>
        <li>Fill all fields accurately</li>
        <li>Attach all required documents</li>
        <li>Write a compelling reason for transfer</li>
        <li>Proofread before submitting</li>
      </ul>

      <h3>Common Mistakes to Avoid</h3>
      <p>Many transfer applications are rejected due to these common errors:</p>
      <ul>
        <li>Incomplete documentation</li>
        <li>Poorly written transfer reasons</li>
        <li>Applying to restricted counties without valid grounds</li>
        <li>Missing deadlines</li>
      </ul>
    `,
    comments: [
      {
        id: "comment1",
        author: "Peter Mwangi",
        text: "This guide was really helpful! I submitted my transfer last week.",
        likes: 5,
        replies: 2,
        timestamp: "2026-05-02T10:30:00Z"
      },
      {
        id: "comment2",
        author: "Faith Wanjiku",
        text: "Can you elaborate on the medical transfer requirements?",
        likes: 3,
        replies: 1,
        timestamp: "2026-05-03T14:15:00Z"
      }
    ]
  },
  {
    id: "cbc-practicals",
    title: "CBC science practicals using local materials",
    topic: "CBC",
    format: "Vlog",
    author: "Faith Wanjiku",
    date: "2026-04-28",
    stats: "420 likes",
    likes: 420,
    comments: 18,
    shares: 25,
    content: `
      <h2>Making Science Practical with Local Resources</h2>
      <p>Competency Based Curriculum (CBC) emphasizes hands-on learning, but many schools lack expensive laboratory equipment. This guide shows how to conduct effective science practicals using locally available materials.</p>

      <h3>Why Local Materials Matter</h3>
      <p>Using local materials has several advantages:</p>
      <ul>
        <li>Cost-effective and sustainable</li>
        <li>Easier to source and replace</li>
        <li>More relatable to students' daily lives</li>
        <li>Encourages creativity and innovation</li>
      </ul>

      <h3>Grade 7 Physics: Simple Machines</h3>
      <p>Materials needed: sticks, strings, stones, bottle caps</p>
      <p>Activities:</p>
      <ul>
        <li>Build a lever using a stick and stone</li>
        <li>Create a pulley system with strings and bottle caps</li>
        <li>Construct an inclined plane with wooden planks</li>
      </ul>

      <h3>Grade 8 Chemistry: Acids and Bases</h3>
      <p>Materials needed: lemons, soap, baking soda, red cabbage</p>
      <p>Activities:</p>
      <ul>
        <li>Test natural indicators with lemon juice and soap</li>
        <li>Observe reactions between baking soda and vinegar</li>
        <li>Extract pigments from red cabbage for pH testing</li>
      </ul>
    `,
    comments: [
      {
        id: "comment1",
        author: "Tom Omondi",
        text: "Great practical ideas! The red cabbage indicator is brilliant.",
        likes: 12,
        replies: 3,
        timestamp: "2026-04-29T09:20:00Z"
      }
    ]
  },
  {
    id: "english-set-books",
    title: "Teaching English set books with podcasts",
    topic: "Literature",
    format: "Podcast",
    author: "Daniel Otieno",
    date: "2026-04-25",
    stats: "860 plays",
    likes: 156,
    comments: 31,
    shares: 8,
    content: `
      <h2>Modern Approaches to Teaching Literature</h2>
      <p>Traditional methods of teaching set books can be dry and disengaging. This podcast explores innovative ways to bring literature to life for modern students.</p>

      <h3>Episode 1: Audio Analysis Techniques</h3>
      <p>Using podcasts to analyze character development and themes:</p>
      <ul>
        <li>Record student discussions and analysis</li>
        <li>Create audio essays on character motivations</li>
        <li>Podcast-style book reviews and critiques</li>
      </ul>

      <h3>Episode 2: Digital Storytelling</h3>
      <p>Combining traditional texts with modern technology:</p>
      <ul>
        <li>Video adaptations of key scenes</li>
        <li>Audio drama productions</li>
        <li>Interactive online discussions</li>
      </ul>

      <h3>Episode 3: Assessment Innovation</h3>
      <p>New ways to evaluate literature understanding:</p>
      <ul>
        <li>Podcast-style oral examinations</li>
        <li>Creative audio projects</li>
        <li>Peer review through recorded feedback</li>
      </ul>
    `,
    comments: [
      {
        id: "comment1",
        author: "Grace Wairimu",
        text: "The podcast format is perfect for literature analysis!",
        likes: 8,
        replies: 1,
        timestamp: "2026-04-26T16:45:00Z"
      }
    ]
  },
  {
    id: "maths-revision",
    title: "Making Form 2 maths revision less abstract",
    topic: "STEM",
    format: "Blog",
    author: "Tom Omondi",
    date: "2026-04-20",
    stats: "312 comments",
    likes: 89,
    comments: 312,
    shares: 15,
    content: `
      <h2>Concrete Strategies for Abstract Mathematics</h2>
      <p>Form 2 mathematics introduces abstract concepts that can be challenging for students. This guide provides practical strategies to make these concepts more accessible and engaging.</p>

      <h3>Understanding Functions</h3>
      <p>Functions can be intimidating, but they're just relationships between inputs and outputs. Use real-world examples:</p>
      <ul>
        <li>Cooking recipes (ingredients → meal)</li>
        <li>Mobile phone tariffs (minutes → cost)</li>
        <li>Distance calculations (speed × time = distance)</li>
      </ul>

      <h3>Visualizing Quadratic Equations</h3>
      <p>Make quadratics tangible with physical models:</p>
      <ul>
        <li>Use rope to demonstrate parabolas</li>
        <li>Build quadratic graphs with string and pins</li>
        <li>Create physical models of quadratic relationships</li>
      </ul>

      <h3>Probability with Games</h3>
      <p>Turn probability into an interactive experience:</p>
      <ul>
        <li>Classroom games with dice and cards</li>
        <li>Probability experiments with coins and spinners</li>
        <li>Real-world applications like weather forecasting</li>
      </ul>
    `,
    comments: [
      {
        id: "comment1",
        author: "Sarah Kiprop",
        text: "The rope parabola demonstration is genius!",
        likes: 15,
        replies: 4,
        timestamp: "2026-04-21T11:30:00Z"
      }
    ]
  }
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

const API_BASE_URL = "https://tonrevampv3-api.onrender.com/api";

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
  activeVideoId: "cbc-science-practicals",
  chat: {
    conversations: [
      {
        id: "mary-achieng",
        user: "Mary Achieng",
        avatar: "MA",
        lastMessage: "Mary asked whether August 2026 is still suitable for your transfer plan.",
        timestamp: "2026-05-04T10:30:00Z",
        unread: 2,
        online: true,
        messages: [
          {
            id: "msg1",
            text: "Hi! I saw your profile and we're both interested in moving to Nairobi. Are you still planning for August 2026?",
            timestamp: "2026-05-04T09:00:00Z",
            sender: "them",
            read: true
          },
          {
            id: "msg2",
            text: "Yes, August is still my target month. How about you?",
            timestamp: "2026-05-04T09:15:00Z",
            sender: "me",
            read: true
          },
          {
            id: "msg3",
            text: "Perfect! I'm also targeting August. Have you started the application process yet?",
            timestamp: "2026-05-04T09:30:00Z",
            sender: "them",
            read: true
          },
          {
            id: "msg4",
            text: "Not yet, but I'm planning to submit next week. The TSC portal should be opening soon.",
            timestamp: "2026-05-04T10:00:00Z",
            sender: "me",
            read: true
          },
          {
            id: "msg5",
            text: "Great! Let me know if you need any help with the application. I went through the process last year.",
            timestamp: "2026-05-04T10:15:00Z",
            sender: "them",
            read: false
          },
          {
            id: "msg6",
            text: "That would be really helpful! Thanks for offering.",
            timestamp: "2026-05-04T10:30:00Z",
            sender: "me",
            read: false
          }
        ]
      },
      {
        id: "peter-mwangi",
        user: "Peter Mwangi",
        avatar: "PM",
        lastMessage: "Thanks for the connection! Let's discuss the transfer details.",
        timestamp: "2026-05-03T16:45:00Z",
        unread: 0,
        online: false,
        messages: [
          {
            id: "msg1",
            text: "Hello! I noticed we have similar subject combinations. Are you looking to transfer?",
            timestamp: "2026-05-03T14:00:00Z",
            sender: "them",
            read: true
          },
          {
            id: "msg2",
            text: "Hi Peter! Yes, I'm interested in moving to Nairobi. What about you?",
            timestamp: "2026-05-03T14:30:00Z",
            sender: "me",
            read: true
          },
          {
            id: "msg3",
            text: "Same here! I think we could help each other with the transfer process.",
            timestamp: "2026-05-03T15:00:00Z",
            sender: "them",
            read: true
          },
          {
            id: "msg4",
            text: "Absolutely! Let's discuss the transfer details.",
            timestamp: "2026-05-03T16:45:00Z",
            sender: "me",
            read: true
          }
        ]
      }
    ],
    activeConversation: null,
    typingUsers: new Set()
  },
  creatorStudio: {
    activeTab: "composer",
    contentType: "blog",
    drafts: [
      {
        id: "draft1",
        title: "Draft: AI Lesson Planning Guide",
        type: "blog",
        topic: "Technology",
        lastModified: "2026-05-03",
        content: "This is a draft about using AI for lesson planning..."
      }
    ],
    published: [
      {
        id: "pub1",
        title: "How to prepare a strong transfer request",
        type: "blog",
        topic: "TSC",
        publishedDate: "2026-05-01",
        views: 1900,
        likes: 245,
        comments: 23
      }
    ],
    analytics: {
      totalViews: 15420,
      totalLikes: 892,
      totalComments: 156,
      totalShares: 67,
      earnings: 12450
    }
  }
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
  renderCreatorStudio(); // Initialize creator studio
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
    ["Unread", state.chat.conversations.reduce((sum, conv) => sum + conv.unread, 0)],
    ["Archived", "4"],
    ["Moderation", "Reports enabled"]
  ]);

  // Render conversations list
  $("#conversations-list").innerHTML = state.chat.conversations.map(conv => `
    <article class="list-item ${state.chat.activeConversation === conv.id ? 'active' : ''}" data-conversation="${conv.id}">
      <div class="conversation-item">
        <div class="conversation-avatar">${conv.avatar}</div>
        <div class="conversation-content">
          <div class="conversation-header">
            <h3>${conv.user}</h3>
            <span class="conversation-time">${formatTime(conv.timestamp)}</span>
          </div>
          <p class="conversation-preview">${conv.lastMessage}</p>
          ${conv.unread > 0 ? `<span class="unread-badge">${conv.unread}</span>` : ''}
          <div class="conversation-status ${conv.online ? 'online' : 'offline'}"></div>
        </div>
      </div>
    </article>
  `).join("");

  // Render active chat
  if (state.chat.activeConversation) {
    const conversation = state.chat.conversations.find(c => c.id === state.chat.activeConversation);
    if (conversation) {
      $("#chat-user-name").textContent = conversation.user;
      $("#chat-status").textContent = conversation.online ? "Online" : "Offline";
      $("#chat-status").className = `chat-status ${conversation.online ? 'online' : ''}`;

      $("#chat-messages").innerHTML = conversation.messages.map(msg => `
        <div class="message ${msg.sender === 'me' ? 'own' : ''}">
          ${msg.sender !== 'me' ? `<div class="message-avatar">${conversation.avatar}</div>` : ''}
          <div class="message-content">
            <p class="message-text">${msg.text}</p>
            <span class="message-time">${formatMessageTime(msg.timestamp)}</span>
          </div>
        </div>
      `).join("");

      // Scroll to bottom
      $("#chat-messages").scrollTop = $("#chat-messages").scrollHeight;
    }
  } else {
    $("#chat-user-name").textContent = "Select a conversation";
    $("#chat-status").textContent = "Offline";
    $("#chat-status").className = "chat-status";
    $("#chat-messages").innerHTML = '<div class="no-chat-selected"><p>Select a conversation to start messaging</p></div>';
  }

  // Update typing indicator
  updateTypingIndicator();

  // Bind conversation click events
  $$("#conversations-list .list-item").forEach(item => {
    item.addEventListener("click", () => {
      const conversationId = item.dataset.conversation;
      setActiveConversation(conversationId);
    });
  });

  // Bind chat composer events
  bindChatEvents();
}

// Chat helper functions
function setActiveConversation(conversationId) {
  state.chat.activeConversation = conversationId;
  const conversation = state.chat.conversations.find(c => c.id === conversationId);
  if (conversation) {
    conversation.unread = 0;
    conversation.messages.forEach(msg => {
      if (msg.sender === 'them') msg.read = true;
    });
  }
  renderMessages();
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString();
}

function formatMessageTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function updateTypingIndicator() {
  const indicator = $("#typing-indicator");
  if (state.chat.activeConversation && state.chat.typingUsers.has(state.chat.activeConversation)) {
    indicator.style.display = 'flex';
  } else {
    indicator.style.display = 'none';
  }
}

function bindChatEvents() {
  const messageInput = $("#message-input");
  const sendBtn = $("#send-btn");
  const emojiBtn = $("#emoji-picker-btn");
  const emojiPicker = document.createElement('div');
  emojiPicker.className = 'emoji-picker';
  emojiPicker.innerHTML = `
    😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾
  `;
  emojiPicker.style.display = 'none';
  $("#emoji-picker-btn").parentNode.appendChild(emojiPicker);

  // Message input handler
  messageInput?.addEventListener("input", () => {
    const hasText = messageInput.value.trim().length > 0;
    sendBtn.disabled = !hasText;

    // Auto-resize textarea
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
  });

  // Send message handler
  sendBtn?.addEventListener("click", () => {
    sendMessage();
  });

  // Enter key handler
  messageInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) {
        sendMessage();
      }
    }
  });

  // Emoji picker toggle
  emojiBtn?.addEventListener("click", () => {
    emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'grid' : 'none';
  });

  // Emoji selection
  $$('.emoji-btn').forEach(btn => {
    btn.addEventListener("click", () => {
      messageInput.value += btn.textContent;
      messageInput.dispatchEvent(new Event('input'));
      emojiPicker.style.display = 'none';
      messageInput.focus();
    });
  });

  // Click outside to close emoji picker
  document.addEventListener("click", (e) => {
    if (!emojiBtn.contains(e.target) && !emojiPicker.contains(e.target)) {
      emojiPicker.style.display = 'none';
    }
  });
}

function sendMessage() {
  const messageInput = $("#message-input");
  const text = messageInput.value.trim();
  if (!text || !state.chat.activeConversation) return;

  const conversation = state.chat.conversations.find(c => c.id === state.chat.activeConversation);
  if (!conversation) return;

  const message = {
    id: `msg${Date.now()}`,
    text: text,
    timestamp: new Date().toISOString(),
    sender: 'me',
    read: true
  };

  conversation.messages.push(message);
  conversation.lastMessage = text;
  conversation.timestamp = message.timestamp;

  messageInput.value = '';
  messageInput.dispatchEvent(new Event('input'));

  renderMessages();

  // Simulate reply after a delay
  setTimeout(() => {
    simulateReply(conversation);
  }, 1000 + Math.random() * 3000);
}

function simulateReply(conversation) {
  const replies = [
    "Thanks for your message! That sounds good.",
    "I agree with you on that point.",
    "Let me think about it and get back to you.",
    "That's interesting! Tell me more.",
    "I understand. How can we proceed?",
    "Great idea! Let's discuss the details.",
    "I appreciate your input on this.",
    "That makes sense to me.",
    "I'll look into that for you.",
    "Thanks for keeping me updated."
  ];

  const reply = {
    id: `msg${Date.now()}`,
    text: replies[Math.floor(Math.random() * replies.length)],
    timestamp: new Date().toISOString(),
    sender: 'them',
    read: false
  };

  conversation.messages.push(reply);
  conversation.lastMessage = reply.text;
  conversation.timestamp = reply.timestamp;
  conversation.unread += 1;

  renderMessages();
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
  const searchQuery = $("#blog-search")?.value?.toLowerCase() || "";
  const filtered = blogs.filter((blog) =>
    (filter === "All" || blog.topic === filter) &&
    (blog.title.toLowerCase().includes(searchQuery) ||
     blog.author.toLowerCase().includes(searchQuery) ||
     blog.topic.toLowerCase().includes(searchQuery))
  );

  setMetricRow("#blogs-summary", [
    ["Filter", filter],
    ["Items", filtered.length],
    ["Total engagement", filtered.reduce((sum, blog) => sum + blog.likes + blog.comments + blog.shares, 0)]
  ]);

  // Render blogs list
  $("#blogs-list").innerHTML = filtered.map((blog) => `
    <div class="blog-card" data-blog-id="${blog.id}">
      <h3>${blog.title}</h3>
      <div class="blog-meta">
        <span>By ${blog.author}</span>
        <span>${blog.date}</span>
        <span>${blog.topic}</span>
        <span>${blog.format}</span>
      </div>
      <div class="blog-stats">
        <span>👍 ${blog.likes} • 💬 ${blog.comments} • 📤 ${blog.shares}</span>
        <span>${blog.stats}</span>
      </div>
    </div>
  `).join("");

  // Bind blog click events
  $$(".blog-card").forEach(card => {
    card.addEventListener("click", () => {
      const blogId = card.dataset.blogId;
      openBlog(blogId);
    });
  });
}

function openBlog(blogId) {
  const blog = blogs.find(b => b.id === blogId);
  if (!blog) return;

  // Update UI to show blog reader
  $("#blogs-list").style.display = "none";
  $("#blog-reader").style.display = "flex";

  // Populate blog content
  $("#blog-title").textContent = blog.title;
  $("#blog-author").textContent = blog.author;
  $("#blog-date").textContent = blog.date;
  $("#blog-topic").textContent = blog.topic;
  $("#blog-content").innerHTML = blog.content;

  // Update engagement counts
  $("#like-count").textContent = blog.likes;
  $("#comment-count").textContent = blog.comments;

  // Render comments
  renderBlogComments(blog);

  // Bind blog interaction events
  bindBlogEvents(blog);
}

function renderBlogComments(blog) {
  $("#comments-list").innerHTML = blog.comments.map(comment => `
    <div class="comment-item">
      <strong>${comment.author}</strong>
      <p>${comment.text}</p>
      <div class="comment-actions">
        <button class="like-comment-btn" data-comment-id="${comment.id}">👍 ${comment.likes}</button>
        <button class="reply-btn" data-comment-id="${comment.id}">💬 Reply (${comment.replies})</button>
        <button class="report-comment-btn" data-comment-id="${comment.id}">🚨 Report</button>
      </div>
    </div>
  `).join("");
}

function bindBlogEvents(blog) {
  // Back button
  $("#back-to-blogs")?.addEventListener("click", () => {
    $("#blogs-list").style.display = "block";
    $("#blog-reader").style.display = "none";
  });

  // Like button
  $("#like-btn")?.addEventListener("click", () => {
    const btn = $("#like-btn");
    const isLiked = btn.classList.contains("liked");
    if (isLiked) {
      blog.likes--;
      btn.classList.remove("liked");
    } else {
      blog.likes++;
      btn.classList.add("liked");
    }
    $("#like-count").textContent = blog.likes;
  });

  // Share button
  $("#share-btn")?.addEventListener("click", () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: `Check out this ${blog.format.toLowerCase()}: ${blog.title}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${blog.title} - ${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  });

  // Comment form
  const commentInput = $("#comment-input");
  const submitBtn = $("#submit-comment");

  commentInput?.addEventListener("input", () => {
    submitBtn.disabled = !commentInput.value.trim();
  });

  submitBtn?.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if (!text) return;

    const comment = {
      id: `comment${Date.now()}`,
      author: state.currentUser?.name || "Anonymous User",
      text: text,
      likes: 0,
      replies: 0,
      timestamp: new Date().toISOString()
    };

    blog.comments.push(comment);
    blog.comments++;
    $("#comment-count").textContent = blog.comments;

    commentInput.value = "";
    submitBtn.disabled = true;

    renderBlogComments(blog);
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

  // Set up video element
  const videoElement = $("#video-element");
  const videoSource = $("#video-source");
  const playOverlay = $("#play-overlay");

  // For demo purposes, we'll use a placeholder video URL
  // In a real implementation, this would be the actual video file URL
  videoSource.src = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`; // Placeholder
  videoElement.load(); // Reload the video element

  $("#watch-player").style.background = video.color;
  $("#watch-title").textContent = video.title;
  $("#watch-creator").textContent = video.creator;
  $("#watch-stats").textContent = `${video.views} • ${video.posted} • ${video.topic}`;
  $("#watch-likes").textContent = video.likes.toLocaleString();
  $("#watch-description").textContent = video.description;

  // Update engagement buttons
  $("#like-btn").textContent = `👍 ${video.likes}`;
  $("#comment-count").textContent = video.comments.length;

  // Render comments
  $("#comments-list").innerHTML = video.comments.map((comment) => `
    <article class="comment-item">
      <strong>Teacher User</strong>
      <p>${comment}</p>
      <div>
        <button class="secondary like-comment-btn">👍 Like</button>
        <button class="secondary reply-btn">💬 Reply</button>
        <button class="secondary report-comment-btn">🚨 Report</button>
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

  // Set up video controls
  setupVideoPlayer(video);

  // Bind engagement events
  bindVideoEngagement(video);
}

function setupVideoPlayer(video) {
  const videoElement = $("#video-element");
  const playOverlay = $("#play-overlay");

  // Play/pause functionality
  const togglePlay = () => {
    if (videoElement.paused) {
      videoElement.play();
      playOverlay.classList.add("hidden");
    } else {
      videoElement.pause();
      playOverlay.classList.remove("hidden");
    }
  };

  playOverlay.addEventListener("click", togglePlay);
  videoElement.addEventListener("click", togglePlay);

  // Update play button visibility
  videoElement.addEventListener("play", () => {
    playOverlay.classList.add("hidden");
  });

  videoElement.addEventListener("pause", () => {
    playOverlay.classList.remove("hidden");
  });

  // Handle video end
  videoElement.addEventListener("ended", () => {
    playOverlay.classList.remove("hidden");
  });
}

function bindVideoEngagement(video) {
  // Like button
  $("#like-btn")?.addEventListener("click", () => {
    const btn = $("#like-btn");
    const isLiked = btn.classList.contains("liked");
    if (isLiked) {
      video.likes--;
      btn.classList.remove("liked");
    } else {
      video.likes++;
      btn.classList.add("liked");
    }
    btn.textContent = `👍 ${video.likes}`;
    $("#watch-likes").textContent = video.likes.toLocaleString();
  });

  // Comment form
  const commentInput = $("#video-comment-input");
  const submitBtn = $("#submit-video-comment");

  commentInput?.addEventListener("input", () => {
    submitBtn.disabled = !commentInput.value.trim();
  });

  submitBtn?.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if (!text) return;

    video.comments.push(text);
    $("#comment-count").textContent = video.comments.length;

    commentInput.value = "";
    submitBtn.disabled = true;

    // Re-render comments
    $("#comments-list").innerHTML = video.comments.map((comment) => `
      <article class="comment-item">
        <strong>Teacher User</strong>
        <p>${comment}</p>
        <div>
          <button class="secondary like-comment-btn">👍 Like</button>
          <button class="secondary reply-btn">💬 Reply</button>
          <button class="secondary report-comment-btn">🚨 Report</button>
        </div>
      </article>
    `).join("");
  });

  // Share button
  $("#share-btn")?.addEventListener("click", () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: `Check out this video: ${video.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${video.title} - ${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  });

  // Other engagement buttons
  $("#save-btn")?.addEventListener("click", () => {
    alert("Video saved to your library!");
  });

  $("#playlist-btn")?.addEventListener("click", () => {
    alert("Added to playlist!");
  });

  $("#report-video-btn")?.addEventListener("click", () => {
    alert("Report submitted. Thank you for helping keep our community safe.");
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

// Creator Studio Functions
function renderCreatorStudio() {
  // Set active tab
  $$(".tab-btn").forEach(btn => btn.classList.remove("active"));
  $(`.tab-btn[data-tab="${state.creatorStudio.activeTab}"]`)?.classList.add("active");

  // Hide all panels
  $$(".studio-content > div").forEach(panel => panel.style.display = "none");

  // Show active panel
  const activePanel = $(`#${state.creatorStudio.activeTab}-panel`);
  if (activePanel) {
    activePanel.style.display = "block";
  }

  // Render based on active tab
  switch (state.creatorStudio.activeTab) {
    case "composer":
      renderComposer();
      break;
    case "drafts":
      renderDrafts();
      break;
    case "published":
      renderPublished();
      break;
    case "analytics":
      renderAnalytics();
      break;
  }

  // Update wallet balance
  $("#wallet-balance").textContent = `KES ${state.creatorStudio.analytics.earnings.toLocaleString()}`;
}

function renderComposer() {
  // Set active content type
  $$(".content-type-btn").forEach(btn => btn.classList.remove("active"));
  $(`.content-type-btn[data-type="${state.creatorStudio.contentType}"]`)?.classList.add("active");

  // Show/hide content type specific controls
  $("#podcast-controls").style.display = state.creatorStudio.contentType === "podcast" ? "block" : "none";
  $("#vlog-controls").style.display = state.creatorStudio.contentType === "vlog" ? "block" : "none";

  // Bind composer events
  bindComposerEvents();
}

function bindComposerEvents() {
  // Tab switching
  $$(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.creatorStudio.activeTab = btn.dataset.tab;
      renderCreatorStudio();
    });
  });

  // Content type switching
  $$(".content-type-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.creatorStudio.contentType = btn.dataset.type;
      renderComposer();
    });
  });

  // Editor toolbar
  $$(".editor-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const command = btn.dataset.command;
      if (command) {
        document.execCommand(command, false, null);
      }
    });
  });

  // Form validation
  const titleInput = $("#content-title");
  const publishBtn = $("#publish-btn");

  const validateForm = () => {
    const hasTitle = titleInput?.value.trim();
    const hasContent = $("#editor-content")?.textContent.trim();
    publishBtn.disabled = !(hasTitle && hasContent);
  };

  titleInput?.addEventListener("input", validateForm);
  $("#editor-content")?.addEventListener("input", validateForm);

  // Save draft
  $("#save-draft-btn")?.addEventListener("click", () => {
    saveDraft();
  });

  // Publish
  $("#publish-btn")?.addEventListener("click", () => {
    publishContent();
  });

  // Preview
  $("#preview-btn")?.addEventListener("click", () => {
    previewContent();
  });

  // Media upload
  $("#add-media-btn")?.addEventListener("click", () => {
    // Simulate file picker
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*,video/*,audio/*";
    input.addEventListener("change", handleMediaUpload);
    input.click();
  });

  // Recording buttons
  $("#record-btn")?.addEventListener("click", () => {
    toggleRecording("audio");
  });

  $("#record-video-btn")?.addEventListener("click", () => {
    toggleRecording("video");
  });

  $("#upload-audio-btn")?.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.addEventListener("change", (e) => handleAudioUpload(e.target.files[0]));
    input.click();
  });

  $("#upload-video-btn")?.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.addEventListener("change", (e) => handleVideoUpload(e.target.files[0]));
    input.click();
  });
}

function saveDraft() {
  const draft = {
    id: `draft${Date.now()}`,
    title: $("#content-title").value.trim(),
    type: state.creatorStudio.contentType,
    topic: $("#content-topic").value,
    description: $("#content-description").value.trim(),
    tags: $("#content-tags").value.split(",").map(tag => tag.trim()).filter(tag => tag),
    content: $("#editor-content").innerHTML,
    lastModified: new Date().toISOString().split("T")[0]
  };

  state.creatorStudio.drafts.push(draft);
  alert("Draft saved successfully!");
}

function publishContent() {
  const content = {
    id: `pub${Date.now()}`,
    title: $("#content-title").value.trim(),
    type: state.creatorStudio.contentType,
    topic: $("#content-topic").value,
    author: state.currentUser?.name || "Anonymous Creator",
    date: new Date().toISOString().split("T")[0],
    content: $("#editor-content").innerHTML,
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0
  };

  state.creatorStudio.published.push(content);

  // Add to blogs array if it's a blog
  if (content.type === "blog") {
    blogs.push({
      id: content.id,
      title: content.title,
      topic: content.topic,
      format: "Blog",
      author: content.author,
      date: content.date,
      stats: "0 reads",
      likes: content.likes,
      comments: content.comments,
      shares: content.shares,
      content: content.content,
      comments: []
    });
  }

  // Reset form
  $("#content-form").reset();
  $("#editor-content").innerHTML = "";

  alert("Content published successfully!");
  renderCreatorStudio();
}

function previewContent() {
  const title = $("#content-title").value.trim();
  const content = $("#editor-content").innerHTML;

  const previewWindow = window.open("", "_blank");
  previewWindow.document.write(`
    <html>
    <head>
      <title>Preview: ${title}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #196f4d; }
        img { max-width: 100%; height: auto; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div>${content}</div>
    </body>
    </html>
  `);
}

function handleMediaUpload(event) {
  const files = Array.from(event.target.files);
  const mediaUploads = $("#media-uploads");

  files.forEach(file => {
    const mediaItem = document.createElement("div");
    mediaItem.className = "media-item";

    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      mediaItem.appendChild(img);
    } else if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.controls = true;
      mediaItem.appendChild(video);
    }

    const info = document.createElement("div");
    info.className = "media-info";
    info.innerHTML = `
      <div><strong>${file.name}</strong></div>
      <div>${(file.size / 1024 / 1024).toFixed(2)} MB</div>
    `;

    const actions = document.createElement("div");
    actions.className = "media-actions";
    actions.innerHTML = `
      <button class="insert-btn">Insert</button>
      <button class="remove-btn">Remove</button>
    `;

    actions.querySelector(".insert-btn").addEventListener("click", () => {
      insertMedia(file);
      mediaItem.remove();
    });

    actions.querySelector(".remove-btn").addEventListener("click", () => {
      mediaItem.remove();
    });

    mediaItem.appendChild(info);
    mediaItem.appendChild(actions);
    mediaUploads.appendChild(mediaItem);
  });
}

function insertMedia(file) {
  const editor = $("#editor-content");

  if (file.type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.style.maxWidth = "100%";
    editor.appendChild(img);
  } else if (file.type.startsWith("video/")) {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.controls = true;
    video.style.maxWidth = "100%";
    editor.appendChild(video);
  }
}

function toggleRecording(type) {
  const status = $(`#${type}-recording-status`);
  const isRecording = status.classList.contains("recording");

  if (isRecording) {
    status.textContent = "Recording stopped";
    status.classList.remove("recording");
    status.classList.add("stopped");
  } else {
    status.textContent = "Recording...";
    status.classList.add("recording");
    status.classList.remove("stopped");
  }
}

function handleAudioUpload(file) {
  // Simulate upload
  setTimeout(() => {
    alert(`Audio file "${file.name}" uploaded successfully!`);
  }, 1000);
}

function handleVideoUpload(file) {
  // Simulate upload
  setTimeout(() => {
    alert(`Video file "${file.name}" uploaded successfully!`);
  }, 1000);
}

function renderDrafts() {
  $("#drafts-list").innerHTML = state.creatorStudio.drafts.map(draft => `
    <div class="draft-item">
      <h4>${draft.title}</h4>
      <div class="draft-meta">
        <span>${draft.type}</span>
        <span>${draft.topic}</span>
        <span>Last modified: ${draft.lastModified}</span>
      </div>
      <div class="draft-actions">
        <button class="edit-draft-btn" data-draft-id="${draft.id}">Edit</button>
        <button class="delete-draft-btn" data-draft-id="${draft.id}">Delete</button>
      </div>
    </div>
  `).join("");

  // Bind draft actions
  $$(".edit-draft-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const draftId = btn.dataset.draftId;
      editDraft(draftId);
    });
  });

  $$(".delete-draft-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const draftId = btn.dataset.draftId;
      deleteDraft(draftId);
    });
  });
}

function renderPublished() {
  $("#published-list").innerHTML = state.creatorStudio.published.map(item => `
    <div class="published-item">
      <h4>${item.title}</h4>
      <div class="published-meta">
        <span>${item.type}</span>
        <span>${item.topic}</span>
        <span>Published: ${item.publishedDate}</span>
        <span>${item.views} views • ${item.likes} likes • ${item.comments} comments</span>
      </div>
      <div class="published-actions">
        <button class="view-published-btn" data-item-id="${item.id}">View</button>
        <button class="edit-published-btn" data-item-id="${item.id}">Edit</button>
        <button class="analytics-btn" data-item-id="${item.id}">Analytics</button>
      </div>
    </div>
  `).join("");
}

function renderAnalytics() {
  const analytics = state.creatorStudio.analytics;
  $("#analytics-grid").innerHTML = `
    <div class="analytics-card">
      <h4>Total Views</h4>
      <strong>${analytics.totalViews.toLocaleString()}</strong>
    </div>
    <div class="analytics-card">
      <h4>Total Likes</h4>
      <strong>${analytics.totalLikes.toLocaleString()}</strong>
    </div>
    <div class="analytics-card">
      <h4>Total Comments</h4>
      <strong>${analytics.totalComments.toLocaleString()}</strong>
    </div>
    <div class="analytics-card">
      <h4>Total Shares</h4>
      <strong>${analytics.totalShares.toLocaleString()}</strong>
    </div>
    <div class="analytics-card">
      <h4>Total Earnings</h4>
      <strong>KES ${analytics.earnings.toLocaleString()}</strong>
    </div>
  `;
}

function editDraft(draftId) {
  const draft = state.creatorStudio.drafts.find(d => d.id === draftId);
  if (!draft) return;

  // Load draft into composer
  $("#content-title").value = draft.title;
  $("#content-topic").value = draft.topic;
  $("#content-description").value = draft.description;
  $("#content-tags").value = draft.tags.join(", ");
  $("#editor-content").innerHTML = draft.content;

  state.creatorStudio.contentType = draft.type;
  state.creatorStudio.activeTab = "composer";
  renderCreatorStudio();
}

function deleteDraft(draftId) {
  if (confirm("Are you sure you want to delete this draft?")) {
    state.creatorStudio.drafts = state.creatorStudio.drafts.filter(d => d.id !== draftId);
    renderDrafts();
  }
}

boot();
