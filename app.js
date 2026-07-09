const storageKey = "social-content-calendar-posts-v2";
const legacyStorageKey = "social-content-calendar-posts";
const settingsKey = "social-content-calendar-settings-v2";

const platforms = ["Instagram", "TikTok", "Facebook", "LinkedIn", "YouTube", "X"];
const defaultRecommendedTimes = {
  Instagram: "11:00",
  TikTok: "19:00",
  Facebook: "13:00",
  LinkedIn: "09:00",
  YouTube: "18:00",
  X: "12:00",
};
const defaultMonthlyTargets = {
  Instagram: 12,
  TikTok: 8,
  Facebook: 4,
  LinkedIn: 4,
  YouTube: 4,
  X: 8,
};
const defaultFormats = ["Reel", "Carosello", "Story", "Short", "Post", "Live", "Video"];
const defaultGoals = ["Awareness", "Vendita", "Community", "Educazione", "Engagement"];
const pastelColors = [
  { value: "#a7f3d0", label: "Verde pastello" },
  { value: "#bae6fd", label: "Azzurro pastello" },
  { value: "#c7d2fe", label: "Blu lavanda" },
  { value: "#ddd6fe", label: "Lilla pastello" },
  { value: "#fbcfe8", label: "Rosa pastello" },
  { value: "#fecaca", label: "Corallo pastello" },
  { value: "#fed7aa", label: "Pesca pastello" },
  { value: "#fef3c7", label: "Giallo pastello" },
  { value: "#d9f99d", label: "Lime pastello" },
  { value: "#ccfbf1", label: "Menta pastello" },
  { value: "#e5e7eb", label: "Grigio chiaro" },
  { value: "#f5d0fe", label: "Magenta pastello" },
];
const defaultTemplates = {
  "Reel educativo": { platform: "Instagram", format: "Reel", goal: "Educazione", assets: "Video breve, sottotitoli, cover", checklist: { idea: true } },
  "Carosello tips": { platform: "Instagram", format: "Carosello", goal: "Educazione", assets: "Grafiche, copy slide, CTA", checklist: { idea: true, copy: true } },
  "Behind the scenes": { platform: "TikTok", format: "Video", goal: "Community", assets: "Clip backstage, audio trend", checklist: { idea: true } },
  "Recensione cliente": { platform: "Facebook", format: "Post", goal: "Awareness", assets: "Testimonianza, immagine cliente", checklist: { idea: true, copy: true } },
  "Post LinkedIn": { platform: "LinkedIn", format: "Post", goal: "Awareness", assets: "Hook, insight, CTA", checklist: { idea: true, copy: true } },
  "Short YouTube": { platform: "YouTube", format: "Short", goal: "Engagement", assets: "Video verticale, titolo, thumbnail", checklist: { idea: true } },
};

const initialSettings = loadSettings();
const state = {
  visibleDate: new Date(),
  viewMode: initialSettings.defaultView,
  posts: loadPosts(),
  settings: initialSettings,
};

const calendarGrid = document.querySelector("#calendarGrid");
const listView = document.querySelector("#listView");
const weekdays = document.querySelector("#weekdays");
const appShell = document.querySelector(".app-shell");
const authGate = document.querySelector("#authGate");
const periodLabel = document.querySelector("#periodLabel");
const periodButton = document.querySelector("#periodButton");
const postDialog = document.querySelector("#postDialog");
const postForm = document.querySelector("#postForm");
const datePickerDialog = document.querySelector("#datePickerDialog");
const datePickerForm = document.querySelector("#datePickerForm");
const jumpDate = document.querySelector("#jumpDate");
const deletePostButton = document.querySelector("#deletePost");
const duplicatePostButton = document.querySelector("#duplicatePost");
const searchInput = document.querySelector("#searchInput");
const platformFilter = document.querySelector("#platformFilter");
const statusFilter = document.querySelector("#statusFilter");
const priorityFilter = document.querySelector("#priorityFilter");
const ownerFilter = document.querySelector("#ownerFilter");
const darkModeToggle = document.querySelector("#darkModeToggle");
const historyBox = document.querySelector("#historyBox");
const historyList = document.querySelector("#historyList");
const settingsDialog = document.querySelector("#settingsDialog");
const settingsForm = document.querySelector("#settingsForm");
const authBanner = document.querySelector("#authBanner");
const authStatus = document.querySelector("#authStatus");
const hamburgerButton = document.querySelector("#hamburgerButton");
const hamburgerPanel = document.querySelector("#hamburgerPanel");
const undoToast = document.querySelector("#undoToast");
const undoMessage = document.querySelector("#undoMessage");
const trashDialog = document.querySelector("#trashDialog");
const trashList = document.querySelector("#trashList");
const loginDialog = document.querySelector("#loginDialog");
const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginButton = document.querySelector("#loginButton");
const logoutButton = document.querySelector("#logoutButton");
const loginNote = document.querySelector("#loginNote");
const targetSettings = document.querySelector("#targetSettings");
const defaultViewSetting = document.querySelector("#defaultViewSetting");
const maxPostsPerDaySetting = document.querySelector("#maxPostsPerDaySetting");
const maxGapDaysSetting = document.querySelector("#maxGapDaysSetting");
const targetWarningsSetting = document.querySelector("#targetWarningsSetting");
const formatsSetting = document.querySelector("#formatsSetting");
const goalsSetting = document.querySelector("#goalsSetting");
const templatesSetting = document.querySelector("#templatesSetting");
const currentUserUid = document.querySelector("#currentUserUid");
const accessNote = document.querySelector("#accessNote");
const adminAccessControls = document.querySelector("#adminAccessControls");
const memberUidInput = document.querySelector("#memberUidInput");
const memberRoleInput = document.querySelector("#memberRoleInput");
const memberList = document.querySelector("#memberList");
const visibleFieldSettings = {
  time: document.querySelector("#showTimeSetting"),
  platform: document.querySelector("#showPlatformSetting"),
  status: document.querySelector("#showStatusSetting"),
  approval: document.querySelector("#showApprovalSetting"),
  priority: document.querySelector("#showPrioritySetting"),
  owner: document.querySelector("#showOwnerSetting"),
  checklist: document.querySelector("#showChecklistSetting"),
};
const colorPalette = document.querySelector("#colorPalette");
const colorMenuButton = document.querySelector("#colorMenuButton");
const selectedColorSwatch = document.querySelector("#selectedColorSwatch");
const selectedColorLabel = document.querySelector("#selectedColorLabel");

const viewButtons = {
  month: document.querySelector("#monthViewButton"),
  week: document.querySelector("#weekViewButton"),
  day: document.querySelector("#dayViewButton"),
  list: document.querySelector("#listViewButton"),
};

const fields = {
  id: document.querySelector("#postId"),
  template: document.querySelector("#templateSelect"),
  title: document.querySelector("#postTitle"),
  date: document.querySelector("#postDate"),
  time: document.querySelector("#postTime"),
  platform: document.querySelector("#postPlatform"),
  format: document.querySelector("#postFormat"),
  status: document.querySelector("#postStatus"),
  approval: document.querySelector("#postApproval"),
  priority: document.querySelector("#postPriority"),
  color: document.querySelector("#postColor"),
  owner: document.querySelector("#postOwner"),
  goal: document.querySelector("#postGoal"),
  tags: document.querySelector("#postTags"),
  assetLink: document.querySelector("#postAssetLink"),
  assets: document.querySelector("#postAssets"),
  copy: document.querySelector("#postCopy"),
  notes: document.querySelector("#postNotes"),
  recurrence: document.querySelector("#postRecurrence"),
  checkIdea: document.querySelector("#checkIdea"),
  checkCopy: document.querySelector("#checkCopy"),
  checkCreative: document.querySelector("#checkCreative"),
  checkReview: document.querySelector("#checkReview"),
  checkScheduled: document.querySelector("#checkScheduled"),
};

const cloud = {
  enabled: false,
  ready: false,
  auth: null,
  db: null,
  user: null,
  member: null,
  members: [],
  workspaceId: window.firebaseWorkspaceId || "default",
  postsUnsubscribe: null,
  settingsUnsubscribe: null,
  membersUnsubscribe: null,
  migrationDone: false,
  lastBackupDate: "",
};

let undoAction = null;
let undoTimer = null;

document.querySelector("#previousPeriod").addEventListener("click", () => changePeriod(-1));
document.querySelector("#nextPeriod").addEventListener("click", () => changePeriod(1));
document.querySelector("#todayButton").addEventListener("click", goToToday);
document.querySelector("#printButton").addEventListener("click", () => window.print());
document.querySelector("#newPostButton").addEventListener("click", () => openPostDialog());
document.querySelector("#settingsButton").addEventListener("click", openSettingsDialog);
document.querySelector("#trashButton").addEventListener("click", openTrashDialog);
hamburgerButton.addEventListener("click", toggleHamburgerMenu);
periodButton.addEventListener("click", openDatePicker);
document.querySelector("#closeDatePicker").addEventListener("click", closeDatePicker);
document.querySelector("#cancelDatePicker").addEventListener("click", closeDatePicker);
document.querySelector("#closeTrash").addEventListener("click", closeTrashDialog);
document.querySelector("#closeDialog").addEventListener("click", closePostDialog);
document.querySelector("#cancelPost").addEventListener("click", closePostDialog);
deletePostButton.addEventListener("click", deleteCurrentPost);
duplicatePostButton.addEventListener("click", duplicateCurrentPost);
datePickerForm.addEventListener("submit", jumpToSelectedDate);
postForm.addEventListener("submit", savePost);
fields.template.addEventListener("change", applyTemplate);
fields.platform.addEventListener("change", applyRecommendedTime);
document.querySelector("#exportCsvButton").addEventListener("click", exportCsv);
document.querySelector("#backupButton").addEventListener("click", exportBackup);
document.querySelector("#importCsvInput").addEventListener("change", importCsv);
document.querySelector("#restoreInput").addEventListener("change", restoreBackup);
loginButton.addEventListener("click", openLoginDialog);
logoutButton.addEventListener("click", logout);
document.querySelector("#closeLogin").addEventListener("click", closeLoginDialog);
document.querySelector("#cancelLogin").addEventListener("click", closeLoginDialog);
document.querySelector("#registerButton").addEventListener("click", register);
document.querySelector("#googleLoginButton").addEventListener("click", loginWithGoogle);
document.querySelector("#gateGoogleLoginButton").addEventListener("click", loginWithGoogle);
document.querySelector("#gateLogoutButton").addEventListener("click", logout);
colorMenuButton.addEventListener("click", toggleColorMenu);
document.querySelector("#undoButton").addEventListener("click", runUndo);
loginForm.addEventListener("submit", login);
document.querySelector("#closeSettings").addEventListener("click", closeSettingsDialog);
document.querySelector("#cancelSettings").addEventListener("click", closeSettingsDialog);
document.querySelector("#resetSettings").addEventListener("click", resetSettings);
document.querySelector("#copyUidButton").addEventListener("click", copyCurrentUid);
document.querySelector("#addMemberButton").addEventListener("click", addMember);
settingsForm.addEventListener("submit", saveSettings);

Object.entries(viewButtons).forEach(([viewMode, button]) => {
  button.addEventListener("click", () => setViewMode(viewMode));
});

[searchInput, platformFilter, statusFilter, priorityFilter, ownerFilter].forEach((control) => {
  control.addEventListener("input", render);
  control.addEventListener("change", render);
});

darkModeToggle.addEventListener("change", () => {
  state.settings.dark = darkModeToggle.checked;
  persistSettings();
  applySettings();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "n") {
    event.preventDefault();
    openPostDialog();
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "f") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape" && postDialog.open) closePostDialog();
});
document.addEventListener("click", (event) => {
  if (!hamburgerPanel.hidden && !event.target.closest(".hamburger-menu")) closeHamburgerMenu();
});

applySettings();
renderColorPalette();
purgeExpiredTrash();
render();
initCloud();

function render() {
  renderMainView();
  renderStats();
  renderPlatformStats();
  renderWarnings();
}

function initCloud() {
  if (!isFirebaseConfigured()) {
    setAuthStatus("Modalita locale - configura Firebase per condividere", "local");
    return;
  }
  if (!window.firebase?.initializeApp) {
    setAuthStatus("Firebase non caricato. Controlla la connessione.", "error");
    return;
  }

  try {
    firebase.initializeApp(window.firebaseConfig);
    cloud.auth = firebase.auth();
    cloud.db = firebase.firestore();
    cloud.enabled = true;
    cloud.ready = true;
    cloud.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    setAppLocked(true);
    cloud.auth.onAuthStateChanged(handleAuthState);
  } catch (error) {
    setAuthStatus(`Errore Firebase: ${error.message}`, "error");
  }
}

function isFirebaseConfigured() {
  const config = window.firebaseConfig || {};
  return Boolean(config.apiKey && config.projectId && !String(config.apiKey).includes("INSERISCI"));
}

function handleAuthState(user) {
  cloud.user = user;
  cloud.member = null;
  cloud.members = [];
  loginButton.hidden = Boolean(user);
  logoutButton.hidden = !user;
  currentUserUid.textContent = user?.uid || "Non connesso";

  if (!user) {
    unsubscribeCloud();
    setAppLocked(true);
    setAuthStatus("Firebase configurato - effettua il login", "local");
    return;
  }

  closeLoginDialog();
  setAppLocked(false);
  setAuthStatus(`Connesso: ${user.email} - verifica accessi`, "cloud");
  ensureMembership().then((member) => {
    cloud.member = member;
    setAuthStatus(`Connesso: ${user.email} (${member.role})`, "cloud");
    subscribeCloudData();
    subscribeMembers();
  }).catch((error) => {
    unsubscribeCloud();
    setAppLocked(true);
    setAuthStatus("Accesso non autorizzato. Chiedi a un admin di aggiungerti.", "error");
    accessNote.textContent = error.message;
  });
}

function workspaceDocument() {
  return cloud.db.collection("workspaces").doc(cloud.workspaceId);
}

function membersCollection() {
  return workspaceDocument().collection("members");
}

function ensureMembership() {
  const memberRef = membersCollection().doc(cloud.user.uid);
  return memberRef.get().then((memberSnapshot) => {
    if (memberSnapshot.exists) return memberSnapshot.data();
    return workspaceDocument().get().then((workspaceSnapshot) => {
      if (workspaceSnapshot.exists) throw new Error("Il tuo UID non e presente nella lista accessi.");
      const firstAdmin = {
        uid: cloud.user.uid,
        email: cloud.user.email || "",
        name: cloud.user.displayName || "",
        role: "admin",
        createdAt: new Date().toISOString(),
      };
      const batch = cloud.db.batch();
      batch.set(workspaceDocument(), {
        createdAt: new Date().toISOString(),
        createdBy: cloud.user.uid,
      }, { merge: true });
      batch.set(memberRef, firstAdmin);
      return batch.commit().then(() => firstAdmin);
    });
  });
}

function subscribeCloudData() {
  unsubscribeCloud();
  const workspace = workspaceDocument();

  cloud.settingsUnsubscribe = workspace.collection("settings").doc("main").onSnapshot((snapshot) => {
    if (!snapshot.exists) {
      saveCloudSettings();
      return;
    }
    state.settings = normalizeSettings(snapshot.data());
    state.viewMode = state.settings.defaultView;
    persistSettings(false);
    applySettings();
    render();
  });

  cloud.postsUnsubscribe = workspace.collection("posts").onSnapshot((snapshot) => {
    if (snapshot.empty && state.posts.length && !cloud.migrationDone) {
      cloud.migrationDone = true;
      syncAllCloudPosts();
      return;
    }

    state.posts = snapshot.docs.map((doc) => normalizePost({ ...doc.data(), id: doc.id }));
    persistPosts(false);
    purgeExpiredTrash();
    createDailyBackup();
    render();
  });
}

function unsubscribeCloud() {
  if (cloud.postsUnsubscribe) cloud.postsUnsubscribe();
  if (cloud.settingsUnsubscribe) cloud.settingsUnsubscribe();
  if (cloud.membersUnsubscribe) cloud.membersUnsubscribe();
  cloud.postsUnsubscribe = null;
  cloud.settingsUnsubscribe = null;
  cloud.membersUnsubscribe = null;
}

function openLoginDialog() {
  if (!cloud.enabled) {
    loginNote.textContent = "Firebase non e ancora configurato. Inserisci le chiavi in firebase-config.js.";
  } else {
    loginNote.textContent = "Accedi con email e password per sincronizzare il calendario condiviso.";
  }
  loginDialog.showModal();
  loginEmail.focus();
}

function closeLoginDialog() {
  if (loginDialog.open) loginDialog.close();
}

function login(event) {
  event.preventDefault();
  if (!cloud.enabled) return;
  cloud.auth.signInWithEmailAndPassword(loginEmail.value.trim(), loginPassword.value)
    .catch((error) => setLoginError(error.message));
}

function loginWithGoogle() {
  if (!cloud.enabled) return;
  const provider = new firebase.auth.GoogleAuthProvider();
  cloud.auth.signInWithPopup(provider)
    .catch((error) => setLoginError(error.message));
}

function register() {
  if (!cloud.enabled) return;
  cloud.auth.createUserWithEmailAndPassword(loginEmail.value.trim(), loginPassword.value)
    .catch((error) => setLoginError(error.message));
}

function logout() {
  closeHamburgerMenu();
  if (cloud.auth) cloud.auth.signOut();
}

function setLoginError(message) {
  loginNote.textContent = message;
}

function setAuthStatus(message, mode) {
  authStatus.textContent = message;
  authBanner.classList.toggle("is-cloud", mode === "cloud");
  authBanner.classList.toggle("is-error", mode === "error");
}

function setAppLocked(locked) {
  if (!cloud.enabled) {
    authGate.hidden = true;
    appShell.hidden = false;
    return;
  }
  document.querySelector("#gateGoogleLoginButton").hidden = Boolean(cloud.user);
  document.querySelector("#gateLogoutButton").hidden = !cloud.user;
  authGate.hidden = !locked;
  appShell.hidden = locked;
}

function cloudActive() {
  return Boolean(cloud.enabled && cloud.user && cloud.db);
}

function postsCollection() {
  return workspaceDocument().collection("posts");
}

function settingsDocument() {
  return workspaceDocument().collection("settings").doc("main");
}

function saveCloudPost(post) {
  if (!cloudActive()) return;
  postsCollection().doc(post.id).set(stripUndefined(post), { merge: true });
}

function deleteCloudPost(id) {
  if (!cloudActive()) return;
  postsCollection().doc(id).delete();
}

function saveCloudSettings() {
  if (!cloudActive()) return;
  settingsDocument().set(stripUndefined(state.settings), { merge: true });
}

function backupsCollection() {
  return workspaceDocument().collection("backups");
}

function createDailyBackup() {
  if (!cloudActive()) return;
  const backupDate = toDateKey(new Date());
  if (cloud.lastBackupDate === backupDate) return;
  cloud.lastBackupDate = backupDate;
  const backupRef = backupsCollection().doc(backupDate);
  backupRef.get().then((snapshot) => {
    if (snapshot.exists) return;
    return backupRef.set(stripUndefined({
      createdAt: new Date().toISOString(),
      createdBy: cloud.user.uid,
      posts: state.posts,
      settings: state.settings,
      postCount: state.posts.length,
    }));
  });
}

function syncAllCloudPosts() {
  if (!cloudActive()) return;
  const batch = cloud.db.batch();
  state.posts.forEach((post) => {
    batch.set(postsCollection().doc(post.id), stripUndefined(post), { merge: true });
  });
  batch.commit();
  saveCloudSettings();
}

function replaceCloudPosts() {
  if (!cloudActive()) return;
  postsCollection().get().then((snapshot) => {
    const batch = cloud.db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    state.posts.forEach((post) => batch.set(postsCollection().doc(post.id), stripUndefined(post)));
    return batch.commit();
  }).then(saveCloudSettings);
}

function subscribeMembers() {
  if (!cloudActive()) return;
  cloud.membersUnsubscribe = membersCollection().onSnapshot((snapshot) => {
    cloud.members = snapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
    renderMembers();
  });
}

function renderMembers() {
  memberList.innerHTML = "";
  currentUserUid.textContent = cloud.user?.uid || "Non connesso";
  const isAdmin = cloud.member?.role === "admin";
  accessNote.textContent = cloud.user
    ? isAdmin ? "Sei admin: puoi aggiungere utenti tramite UID." : "Sei editor: puoi vedere la lista, ma non modificarla."
    : "Accedi per gestire la lista utenti.";
  adminAccessControls.hidden = !isAdmin;
  memberUidInput.disabled = !isAdmin;
  memberRoleInput.disabled = !isAdmin;
  document.querySelector("#addMemberButton").disabled = !isAdmin;

  if (!cloud.members.length) {
    const empty = document.createElement("p");
    empty.className = "empty-day";
    empty.textContent = "Nessun membro caricato.";
    memberList.append(empty);
    return;
  }

  cloud.members.forEach((member) => {
    const row = document.createElement("div");
    row.className = "member-row";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = member.email || member.name || member.uid;
    const meta = document.createElement("small");
    meta.textContent = `${member.role || "editor"} - ${member.uid}`;
    info.append(title, meta);

    row.append(info);
    if (isAdmin) {
      const actions = document.createElement("div");
      const remove = document.createElement("button");
      remove.className = "danger-action";
      remove.type = "button";
      remove.textContent = "Rimuovi";
      remove.disabled = member.uid === cloud.user.uid;
      remove.addEventListener("click", () => removeMember(member.uid));
      actions.append(remove);
      row.append(actions);
    }
    memberList.append(row);
  });
}

function openTrashDialog() {
  closeHamburgerMenu();
  renderTrash();
  trashDialog.showModal();
}

function closeTrashDialog() {
  trashDialog.close();
}

function renderTrash() {
  const deletedPosts = trashedPosts().sort((a, b) => String(b.deletedAt || "").localeCompare(String(a.deletedAt || "")));
  trashList.innerHTML = "";

  if (!deletedPosts.length) {
    const empty = document.createElement("p");
    empty.className = "empty-day";
    empty.textContent = "Il cestino e vuoto.";
    trashList.append(empty);
    return;
  }

  deletedPosts.forEach((post) => {
    const item = document.createElement("article");
    item.className = "trash-item";

    const info = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = post.title;
    const meta = document.createElement("p");
    meta.textContent = `${formatShortDate(parseDateKey(post.date))} - ${post.platform} - eliminato ${formatDateTime(post.deletedAt)}`;
    info.append(title, meta);

    const actions = document.createElement("div");
    actions.className = "trash-actions";
    const restore = document.createElement("button");
    restore.className = "secondary-action";
    restore.type = "button";
    restore.textContent = "Ripristina";
    restore.addEventListener("click", () => restorePost(post.id));

    const remove = document.createElement("button");
    remove.className = "danger-action";
    remove.type = "button";
    remove.textContent = "Elimina definitivamente";
    remove.addEventListener("click", () => permanentlyDeletePost(post.id));

    actions.append(restore, remove);
    item.append(info, actions);
    trashList.append(item);
  });
}

function restorePost(id) {
  const post = state.posts.find((item) => item.id === id);
  if (!post) return;
  post.deletedAt = "";
  post.deletedBy = "";
  post.history = [...(post.history || []), historyEntry("Ripristinato dal cestino")];
  persistPosts();
  saveCloudPost(post);
  renderTrash();
  render();
}

function permanentlyDeletePost(id) {
  state.posts = state.posts.filter((post) => post.id !== id);
  persistPosts();
  deleteCloudPost(id);
  renderTrash();
  render();
}

function showUndo(message, action) {
  undoAction = action;
  undoMessage.textContent = message;
  undoToast.hidden = false;
  clearTimeout(undoTimer);
  undoTimer = setTimeout(clearUndo, 9000);
}

function runUndo() {
  if (undoAction) undoAction();
  clearUndo();
}

function clearUndo() {
  undoAction = null;
  undoToast.hidden = true;
  clearTimeout(undoTimer);
}

function purgeExpiredTrash() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const expired = state.posts.filter((post) => post.deletedAt && new Date(post.deletedAt) < cutoff);
  if (!expired.length) return;
  state.posts = state.posts.filter((post) => !expired.some((item) => item.id === post.id));
  persistPosts(false);
  if (cloudActive()) expired.forEach((post) => deleteCloudPost(post.id));
}

function toggleHamburgerMenu() {
  const isOpen = hamburgerPanel.classList.toggle("is-open");
  hamburgerPanel.hidden = !isOpen;
  hamburgerButton.setAttribute("aria-expanded", String(isOpen));
}

function closeHamburgerMenu() {
  hamburgerPanel.classList.remove("is-open");
  hamburgerPanel.hidden = true;
  hamburgerButton.setAttribute("aria-expanded", "false");
}

function addMember() {
  if (!cloudActive() || cloud.member?.role !== "admin") return;
  const uid = memberUidInput.value.trim();
  if (!uid) return;
  membersCollection().doc(uid).set({
    uid,
    email: "",
    name: "",
    role: memberRoleInput.value,
    createdAt: new Date().toISOString(),
    createdBy: cloud.user.uid,
  }, { merge: true }).then(() => {
    memberUidInput.value = "";
  }).catch((error) => {
    accessNote.textContent = error.message;
  });
}

function removeMember(uid) {
  if (!cloudActive() || cloud.member?.role !== "admin" || uid === cloud.user.uid) return;
  membersCollection().doc(uid).delete().catch((error) => {
    accessNote.textContent = error.message;
  });
}

function copyCurrentUid() {
  if (!cloud.user?.uid) return;
  navigator.clipboard?.writeText(cloud.user.uid);
}

function renderMainView() {
  const start = getCalendarStartDate();
  const todayKey = toDateKey(new Date());
  const isListView = state.viewMode === "list";

  periodLabel.textContent = getPeriodLabel(start);
  weekdays.hidden = state.viewMode === "day" || isListView;
  calendarGrid.hidden = isListView;
  listView.hidden = !isListView;

  Object.entries(viewButtons).forEach(([viewMode, button]) => {
    button.setAttribute("aria-pressed", String(state.viewMode === viewMode));
  });

  if (isListView) {
    renderListView();
    return;
  }

  calendarGrid.innerHTML = "";
  calendarGrid.className = "calendar-grid";
  calendarGrid.classList.toggle("is-week-view", state.viewMode === "week");
  calendarGrid.classList.toggle("is-day-view", state.viewMode === "day");

  for (let index = 0; index < getDaysToRender(); index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    calendarGrid.append(createDayCell(date, todayKey));
  }
}

function createDayCell(date, todayKey) {
  const visibleMonth = state.visibleDate.getMonth();
  const dateKey = toDateKey(date);
  const dayPosts = filteredPosts()
    .filter((post) => post.date === dateKey)
    .sort(sortPosts);

  const cell = document.createElement("section");
  cell.className = "day-cell";
  cell.dataset.date = dateKey;
  if (date.getMonth() !== visibleMonth && state.viewMode === "month") cell.classList.add("is-muted");
  if (dateKey === todayKey) cell.classList.add("is-today");
  cell.addEventListener("dragover", allowDrop);
  cell.addEventListener("drop", dropPostOnDay);

  const top = document.createElement("div");
  top.className = "day-top";

  const number = document.createElement("span");
  number.className = "day-number";
  number.textContent = state.viewMode === "month" ? date.getDate() : formatWeekDayHeading(date);

  const addButton = document.createElement("button");
  addButton.className = "add-day";
  addButton.type = "button";
  addButton.textContent = "+";
  addButton.setAttribute("aria-label", `Aggiungi contenuto per ${formatDateForLabel(date)}`);
  addButton.addEventListener("click", () => openPostDialog({ date: dateKey }));

  top.append(number, addButton);

  const list = document.createElement("div");
  list.className = "post-list";
  dayPosts.forEach((post) => list.append(createPostChip(post)));

  if (state.viewMode === "day" && dayPosts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-day";
    empty.textContent = "Nessun contenuto programmato per questa giornata.";
    list.append(empty);
  }

  cell.append(top, list);
  return cell;
}

function createPostChip(post) {
  const chip = document.createElement("button");
  chip.className = "post-chip";
  chip.type = "button";
  chip.draggable = true;
  chip.dataset.id = post.id;
  chip.dataset.platform = post.platform;
  chip.dataset.priority = post.priority || "Media";
  applyPostColor(chip, post.color);
  chip.addEventListener("click", () => openPostDialog(post));
  chip.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", post.id);
  });

  const title = document.createElement("strong");
  title.textContent = post.title;

  const meta = document.createElement("span");
  meta.textContent = getPostChipMeta(post);
  chip.append(title);
  if (meta.textContent) chip.append(meta);
  if (state.settings.visibleFields.checklist) {
    const progress = document.createElement("small");
    progress.textContent = `${checklistProgress(post)}% checklist`;
    chip.append(progress);
  }
  return chip;
}

function applyPostColor(element, color) {
  if (!isValidColor(color)) return;
  element.style.borderLeftColor = color;
  element.style.backgroundColor = `${color}1a`;
}

function renderColorPalette() {
  colorPalette.innerHTML = "";
  pastelColors.forEach((color) => {
    const button = document.createElement("button");
    button.className = "color-option";
    button.type = "button";
    button.dataset.color = color.value;
    button.innerHTML = `<span class="color-swatch" style="background-color: ${color.value}"></span><span>${color.label}</span>`;
    button.addEventListener("click", () => {
      setSelectedColor(color.value);
      closeColorMenu();
    });
    colorPalette.append(button);
  });
}

function setSelectedColor(color) {
  const selectedColor = isValidColor(color) ? color : pastelColors[0].value;
  const option = pastelColors.find((item) => item.value === selectedColor) || pastelColors[0];
  fields.color.value = selectedColor;
  selectedColorSwatch.style.backgroundColor = selectedColor;
  selectedColorLabel.textContent = option.label;
  colorPalette.querySelectorAll(".color-option").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.color === selectedColor);
  });
}

function toggleColorMenu() {
  colorPalette.hidden = !colorPalette.hidden;
  colorMenuButton.setAttribute("aria-expanded", String(!colorPalette.hidden));
}

function closeColorMenu() {
  colorPalette.hidden = true;
  colorMenuButton.setAttribute("aria-expanded", "false");
}

function isValidColor(color) {
  return /^#[0-9a-f]{6}$/i.test(String(color || ""));
}

function getPostChipMeta(post) {
  const fieldsToShow = state.settings.visibleFields;
  return [
    fieldsToShow.time && post.time ? post.time : "",
    fieldsToShow.platform ? post.platform : "",
    fieldsToShow.status ? post.status : "",
    fieldsToShow.approval ? post.approval || "Bozza" : "",
    fieldsToShow.priority ? post.priority || "Media" : "",
    fieldsToShow.owner && post.owner ? post.owner : "",
  ].filter(Boolean).join(" - ");
}

function renderListView() {
  const posts = filteredPosts().sort((a, b) => `${a.date}${a.time || ""}`.localeCompare(`${b.date}${b.time || ""}`));
  listView.innerHTML = "";

  if (posts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-day";
    empty.textContent = "Nessun contenuto trovato.";
    listView.append(empty);
    return;
  }

  posts.forEach((post) => {
    const row = document.createElement("article");
    row.className = "list-item";
    row.dataset.platform = post.platform;
    applyPostColor(row, post.color);

    const main = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = post.title;
    const meta = document.createElement("p");
    meta.textContent = `${formatShortDate(parseDateKey(post.date))} ${post.time || ""} - ${post.platform} - ${post.status} - ${post.priority || "Media"}`;
    main.append(title, meta);

    const detail = document.createElement("p");
    detail.textContent = [post.format, post.goal, post.owner, post.tags].filter(Boolean).join(" - ");

    const actions = document.createElement("div");
    const edit = document.createElement("button");
    edit.className = "secondary-action";
    edit.type = "button";
    edit.textContent = "Modifica";
    edit.addEventListener("click", () => openPostDialog(post));
    const duplicate = document.createElement("button");
    duplicate.className = "secondary-action";
    duplicate.type = "button";
    duplicate.textContent = "Duplica";
    duplicate.addEventListener("click", () => duplicatePost(post.id));
    actions.append(edit, duplicate);

    row.append(main, detail, actions);
    listView.append(row);
  });
}

function renderStats() {
  const monthPosts = getMonthPosts(state.posts);
  document.querySelector("#monthCount").textContent = monthPosts.length;
  document.querySelector("#readyCount").textContent = monthPosts.filter((post) => ["Pronto", "Programmato"].includes(post.status)).length;
  document.querySelector("#publishedCount").textContent = monthPosts.filter((post) => post.status === "Pubblicato").length;
}

function renderPlatformStats() {
  const monthPosts = getMonthPosts(state.posts);
  const container = document.querySelector("#platformStats");
  container.innerHTML = "";
  platforms.forEach((platform) => {
    const count = monthPosts.filter((post) => post.platform === platform).length;
    const item = document.createElement("div");
    item.innerHTML = `<span>${platform}</span><strong>${count}/${state.settings.monthlyTargets[platform]}</strong>`;
    container.append(item);
  });
}

function renderWarnings() {
  const monthPosts = getMonthPosts(state.posts);
  const warnings = [];

  if (state.settings.warningRules.targetWarnings) {
    platforms.forEach((platform) => {
      const target = Number(state.settings.monthlyTargets[platform]) || 0;
      const count = monthPosts.filter((post) => post.platform === platform).length;
      if (count < target) warnings.push(`${platform}: mancano ${target - count} contenuti rispetto al target mensile.`);
    });
  }

  const byDate = groupBy(monthPosts, "date");
  Object.entries(byDate).forEach(([date, posts]) => {
    if (posts.length > state.settings.warningRules.maxPostsPerDay) warnings.push(`${formatShortDate(parseDateKey(date))}: ci sono ${posts.length} contenuti nello stesso giorno.`);
  });

  platforms.forEach((platform) => {
    const dates = monthPosts.filter((post) => post.platform === platform).map((post) => post.date).sort();
    if (dates.length === 0) return;
    for (let index = 1; index < dates.length; index += 1) {
      const gap = daysBetween(parseDateKey(dates[index - 1]), parseDateKey(dates[index]));
      if (gap > state.settings.warningRules.maxGapDays) warnings.push(`${platform}: buco di ${gap} giorni tra due contenuti.`);
    }
  });

  const container = document.querySelector("#warningList");
  container.innerHTML = "";
  warnings.slice(0, 8).forEach((warning) => {
    const item = document.createElement("p");
    item.textContent = warning;
    container.append(item);
  });
  if (warnings.length === 0) {
    const ok = document.createElement("p");
    ok.textContent = "Nessun avviso per questo mese.";
    container.append(ok);
  }
}

function filteredPosts() {
  const query = searchInput.value.trim().toLowerCase();
  const owner = ownerFilter.value.trim().toLowerCase();
  return activePosts().filter((post) => {
    const searchable = [
      post.title,
      post.platform,
      post.status,
      post.format,
      post.goal,
      post.owner,
      post.tags,
      post.assets,
      post.copy,
      post.notes,
    ].join(" ").toLowerCase();
    return (!query || searchable.includes(query))
      && (platformFilter.value === "all" || post.platform === platformFilter.value)
      && (statusFilter.value === "all" || post.status === statusFilter.value)
      && (priorityFilter.value === "all" || post.priority === priorityFilter.value)
      && (!owner || String(post.owner || "").toLowerCase().includes(owner));
  });
}

function openPostDialog(post = {}) {
  const normalized = normalizePost(post);
  const isExisting = Boolean(post.id);
  document.querySelector("#dialogTitle").textContent = isExisting ? "Modifica contenuto" : "Nuovo contenuto";
  deletePostButton.hidden = !isExisting;
  duplicatePostButton.hidden = !isExisting;

  fields.id.value = normalized.id || "";
  fields.template.value = "";
  fields.title.value = normalized.title || "";
  fields.date.value = normalized.date || toDateKey(new Date());
  fields.time.value = normalized.time || defaultRecommendedTimes[normalized.platform || "Instagram"];
  fields.platform.value = normalized.platform || "Instagram";
  fields.format.value = normalized.format || "";
  fields.status.value = normalized.status || "Idea";
  fields.approval.value = normalized.approval || "Bozza";
  fields.priority.value = normalized.priority || "Media";
  setSelectedColor(normalized.color || pastelColors[0].value);
  fields.owner.value = normalized.owner || "";
  ensureSelectOption(fields.goal, normalized.goal);
  fields.goal.value = state.settings.goals.includes(normalized.goal) ? normalized.goal : state.settings.goals[0];
  fields.tags.value = normalized.tags || "";
  fields.assetLink.value = normalized.assetLink || "";
  fields.assets.value = normalized.assets || "";
  fields.copy.value = normalized.copy || "";
  fields.notes.value = normalized.notes || "";
  fields.recurrence.value = normalized.recurrence || "none";
  fields.checkIdea.checked = Boolean(normalized.checklist.idea);
  fields.checkCopy.checked = Boolean(normalized.checklist.copy);
  fields.checkCreative.checked = Boolean(normalized.checklist.creative);
  fields.checkReview.checked = Boolean(normalized.checklist.review);
  fields.checkScheduled.checked = Boolean(normalized.checklist.scheduled);
  renderHistory(normalized.history);

  postDialog.showModal();
  fields.title.focus();
}

function renderHistory(history) {
  historyBox.hidden = !history.length;
  historyList.innerHTML = "";
  history.slice().reverse().forEach((entry) => {
    const item = document.createElement("p");
    const date = new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(entry.at));
    item.textContent = `${date} - ${entry.action}`;
    historyList.append(item);
  });
}

function openSettingsDialog() {
  closeHamburgerMenu();
  renderTargetSettings();
  defaultViewSetting.value = state.settings.defaultView;
  maxPostsPerDaySetting.value = state.settings.warningRules.maxPostsPerDay;
  maxGapDaysSetting.value = state.settings.warningRules.maxGapDays;
  targetWarningsSetting.checked = state.settings.warningRules.targetWarnings;
  Object.entries(visibleFieldSettings).forEach(([key, input]) => {
    input.checked = Boolean(state.settings.visibleFields[key]);
  });
  formatsSetting.value = state.settings.formats.join("\n");
  goalsSetting.value = state.settings.goals.join("\n");
  templatesSetting.value = templatesToText(state.settings.templates);
  if (!settingsDialog.open) settingsDialog.showModal();
}

function closeSettingsDialog() {
  settingsDialog.close();
}

function renderTargetSettings() {
  targetSettings.innerHTML = "";
  platforms.forEach((platform) => {
    const label = document.createElement("label");
    label.textContent = `Target ${platform}`;
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.max = "200";
    input.required = true;
    input.dataset.platform = platform;
    input.value = state.settings.monthlyTargets[platform] ?? defaultMonthlyTargets[platform];
    label.append(input);
    targetSettings.append(label);
  });
}

function saveSettings(event) {
  event.preventDefault();
  const monthlyTargets = {};
  targetSettings.querySelectorAll("input[data-platform]").forEach((input) => {
    monthlyTargets[input.dataset.platform] = Number(input.value) || 0;
  });

  state.settings = normalizeSettings({
    ...state.settings,
    defaultView: defaultViewSetting.value,
    monthlyTargets,
    warningRules: {
      maxPostsPerDay: Number(maxPostsPerDaySetting.value) || 4,
      maxGapDays: Number(maxGapDaysSetting.value) || 10,
      targetWarnings: targetWarningsSetting.checked,
    },
    visibleFields: Object.fromEntries(
      Object.entries(visibleFieldSettings).map(([key, input]) => [key, input.checked])
    ),
    formats: parseLines(formatsSetting.value),
    goals: parseLines(goalsSetting.value),
    templates: parseTemplates(templatesSetting.value),
  });
  state.viewMode = state.settings.defaultView;
  persistSettings();
  applySettings();
  closeSettingsDialog();
  render();
}

function resetSettings() {
  state.settings = getDefaultSettings();
  state.viewMode = state.settings.defaultView;
  persistSettings();
  applySettings();
  openSettingsDialog();
  render();
}

function savePost(event) {
  event.preventDefault();
  const post = collectPostFromForm();
  const existingIndex = state.posts.findIndex((item) => item.id === post.id);
  const action = existingIndex >= 0 ? "Modificato" : "Creato";

  if (existingIndex >= 0) {
    post.history = [...(state.posts[existingIndex].history || []), historyEntry(action)];
    state.posts[existingIndex] = post;
  } else {
    post.history = [historyEntry(action)];
    state.posts.push(post);
    addRecurringPosts(post);
  }

  state.visibleDate = parseDateKey(post.date);
  persistPosts();
  if (cloudActive()) {
    if (post.recurrence === "none" || existingIndex >= 0) saveCloudPost(post);
    else syncAllCloudPosts();
  }
  closePostDialog();
  render();
}

function collectPostFromForm() {
  return normalizePost({
    id: fields.id.value || createId(),
    title: fields.title.value.trim(),
    date: fields.date.value,
    time: fields.time.value,
    platform: fields.platform.value,
    format: fields.format.value.trim(),
    status: fields.status.value,
    approval: fields.approval.value,
    priority: fields.priority.value,
    color: fields.color.value,
    owner: fields.owner.value.trim(),
    goal: fields.goal.value,
    tags: fields.tags.value.trim(),
    assetLink: fields.assetLink.value.trim(),
    assets: fields.assets.value.trim(),
    copy: fields.copy.value.trim(),
    notes: fields.notes.value.trim(),
    recurrence: fields.recurrence.value,
    checklist: {
      idea: fields.checkIdea.checked,
      copy: fields.checkCopy.checked,
      creative: fields.checkCreative.checked,
      review: fields.checkReview.checked,
      scheduled: fields.checkScheduled.checked,
    },
  });
}

function deleteCurrentPost() {
  const id = fields.id.value;
  if (!id) return;
  const post = state.posts.find((item) => item.id === id);
  if (!post) return;
  post.deletedAt = new Date().toISOString();
  post.deletedBy = cloud.user?.uid || "local";
  post.history = [...(post.history || []), historyEntry("Spostato nel cestino")];
  persistPosts();
  saveCloudPost(post);
  showUndo("Contenuto spostato nel cestino.", () => restorePost(id));
  closePostDialog();
  render();
}

function duplicateCurrentPost() {
  if (!fields.id.value) return;
  duplicatePost(fields.id.value);
  closePostDialog();
}

function duplicatePost(id) {
  const source = activePosts().find((post) => post.id === id);
  if (!source) return;
  const nextDate = parseDateKey(source.date);
  nextDate.setDate(nextDate.getDate() + 1);
  const copy = normalizePost({
    ...source,
    id: createId(),
    title: `${source.title} copia`,
    date: toDateKey(nextDate),
    status: "Idea",
    approval: "Bozza",
    history: [historyEntry("Duplicato")],
  });
  state.posts.push(copy);
  state.visibleDate = nextDate;
  persistPosts();
  saveCloudPost(copy);
  showUndo("Contenuto duplicato.", () => permanentlyDeletePost(copy.id));
  render();
}

function addRecurringPosts(post) {
  if (post.recurrence === "none") return;
  for (let index = 1; index <= 5; index += 1) {
    const date = parseDateKey(post.date);
    if (post.recurrence === "weekly") date.setDate(date.getDate() + index * 7);
    if (post.recurrence === "monthly") date.setMonth(date.getMonth() + index);
    state.posts.push(normalizePost({
      ...post,
      id: createId(),
      date: toDateKey(date),
      status: "Idea",
      approval: "Bozza",
      history: [historyEntry("Creato da ricorrenza")],
    }));
  }
}

function applyTemplate() {
  const template = getTemplates()[fields.template.value];
  if (!template) return;
  fields.platform.value = template.platform;
  fields.format.value = template.format;
  ensureSelectOption(fields.goal, template.goal);
  fields.goal.value = template.goal;
  fields.assets.value = template.assets;
  fields.checkIdea.checked = Boolean(template.checklist.idea);
  fields.checkCopy.checked = Boolean(template.checklist.copy);
  applyRecommendedTime();
}

function applyRecommendedTime() {
  if (!fields.time.value) fields.time.value = defaultRecommendedTimes[fields.platform.value] || "10:00";
}

function allowDrop(event) {
  event.preventDefault();
}

function dropPostOnDay(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  const post = activePosts().find((item) => item.id === id);
  if (!post) return;
  const previousDate = post.date;
  post.date = event.currentTarget.dataset.date;
  post.history = [...(post.history || []), historyEntry(`Spostato al ${post.date}`)];
  state.visibleDate = parseDateKey(post.date);
  persistPosts();
  saveCloudPost(post);
  showUndo("Contenuto spostato.", () => {
    post.date = previousDate;
    post.history = [...(post.history || []), historyEntry(`Spostamento annullato: ${previousDate}`)];
    persistPosts();
    saveCloudPost(post);
    render();
  });
  render();
}

function openDatePicker() {
  jumpDate.value = toDateKey(state.visibleDate);
  datePickerDialog.showModal();
  jumpDate.focus();
}

function closeDatePicker() {
  datePickerDialog.close();
}

function jumpToSelectedDate(event) {
  event.preventDefault();
  state.visibleDate = parseDateKey(jumpDate.value);
  closeDatePicker();
  render();
}

function closePostDialog() {
  postDialog.close();
}

function changePeriod(offset) {
  const nextDate = new Date(state.visibleDate);
  if (state.viewMode === "week") nextDate.setDate(nextDate.getDate() + offset * 7);
  else if (state.viewMode === "day") nextDate.setDate(nextDate.getDate() + offset);
  else nextDate.setMonth(nextDate.getMonth() + offset, 1);
  state.visibleDate = nextDate;
  render();
}

function setViewMode(viewMode) {
  state.viewMode = viewMode;
  render();
}

function goToToday() {
  state.visibleDate = new Date();
  render();
}

function exportCsv() {
  const rows = [
    ["id", "title", "date", "time", "platform", "format", "status", "approval", "priority", "color", "owner", "goal", "tags", "assetLink", "assets", "copy", "notes"],
    ...activePosts().map((post) => [
      post.id,
      post.title,
      post.date,
      post.time,
      post.platform,
      post.format,
      post.status,
      post.approval,
      post.priority,
      post.color,
      post.owner,
      post.goal,
      post.tags,
      post.assetLink,
      post.assets,
      post.copy,
      post.notes,
    ]),
  ];
  downloadFile("contenuti-social.csv", rows.map((row) => row.map(csvEscape).join(",")).join("\n"), "text/csv");
}

function importCsv(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const imported = parseCsv(String(reader.result)).map(rowToPost);
    state.posts = [...state.posts, ...imported];
    persistPosts();
    if (cloudActive()) imported.forEach(saveCloudPost);
    render();
    event.target.value = "";
  };
  reader.readAsText(file);
}

function exportBackup() {
  const backup = {
    exportedAt: new Date().toISOString(),
    posts: state.posts,
    settings: state.settings,
  };
  downloadFile("backup-calendario-social.json", JSON.stringify(backup, null, 2), "application/json");
}

function restoreBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const backup = JSON.parse(String(reader.result));
      state.posts = Array.isArray(backup.posts) ? backup.posts.map(normalizePost) : [];
      state.settings = normalizeSettings({ ...state.settings, ...(backup.settings || {}) });
      state.viewMode = state.settings.defaultView;
      persistPosts();
      persistSettings();
      applySettings();
      if (cloudActive()) replaceCloudPosts();
      render();
    } catch {
      alert("Backup non valido.");
    }
    event.target.value = "";
  };
  reader.readAsText(file);
}

function applySettings() {
  darkModeToggle.checked = Boolean(state.settings.dark);
  document.body.classList.toggle("is-dark", state.settings.dark);
  populateTemplateSelect();
  populateGoalSelect();
  populateFormatOptions();
}

function loadPosts() {
  try {
    const rawPosts = localStorage.getItem(storageKey) || localStorage.getItem(legacyStorageKey);
    return rawPosts ? JSON.parse(rawPosts).map(normalizePost) : seedPosts();
  } catch {
    return seedPosts();
  }
}

function persistPosts(syncCloud = false) {
  localStorage.setItem(storageKey, JSON.stringify(state.posts));
  if (syncCloud) syncAllCloudPosts();
}

function loadSettings() {
  try {
    return normalizeSettings(JSON.parse(localStorage.getItem(settingsKey)) || {});
  } catch {
    return getDefaultSettings();
  }
}

function persistSettings(syncCloud = true) {
  localStorage.setItem(settingsKey, JSON.stringify(state.settings));
  if (syncCloud) saveCloudSettings();
}

function getDefaultSettings() {
  return {
    dark: false,
    defaultView: "month",
    monthlyTargets: { ...defaultMonthlyTargets },
    warningRules: {
      maxPostsPerDay: 4,
      maxGapDays: 10,
      targetWarnings: true,
    },
    visibleFields: {
      time: true,
      platform: true,
      status: true,
      approval: true,
      priority: false,
      owner: false,
      checklist: true,
    },
    formats: [...defaultFormats],
    goals: [...defaultGoals],
    templates: structuredCloneSafe(defaultTemplates),
  };
}

function normalizeSettings(settings) {
  const defaults = getDefaultSettings();
  return {
    ...defaults,
    ...settings,
    defaultView: ["month", "week", "day", "list"].includes(settings.defaultView) ? settings.defaultView : defaults.defaultView,
    monthlyTargets: { ...defaults.monthlyTargets, ...(settings.monthlyTargets || {}) },
    warningRules: { ...defaults.warningRules, ...(settings.warningRules || {}) },
    visibleFields: { ...defaults.visibleFields, ...(settings.visibleFields || {}) },
    formats: Array.isArray(settings.formats) && settings.formats.length ? settings.formats : defaults.formats,
    goals: Array.isArray(settings.goals) && settings.goals.length ? settings.goals : defaults.goals,
    templates: settings.templates && Object.keys(settings.templates).length ? settings.templates : defaults.templates,
  };
}

function populateTemplateSelect() {
  const currentValue = fields.template.value;
  fields.template.innerHTML = "";
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "Nessun template";
  fields.template.append(empty);
  Object.keys(getTemplates()).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    fields.template.append(option);
  });
  fields.template.value = currentValue && getTemplates()[currentValue] ? currentValue : "";
}

function populateGoalSelect() {
  const currentValue = fields.goal.value;
  fields.goal.innerHTML = "";
  state.settings.goals.forEach((goal) => {
    const option = document.createElement("option");
    option.value = goal;
    option.textContent = goal;
    fields.goal.append(option);
  });
  fields.goal.value = state.settings.goals.includes(currentValue) ? currentValue : state.settings.goals[0];
}

function populateFormatOptions() {
  const datalist = document.querySelector("#formatOptions");
  datalist.innerHTML = "";
  state.settings.formats.forEach((format) => {
    const option = document.createElement("option");
    option.value = format;
    datalist.append(option);
  });
}

function getTemplates() {
  return state.settings.templates;
}

function parseLines(value) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function parseTemplates(value) {
  const parsed = {};
  parseLines(value).forEach((line) => {
    const [name, platform, format, goal, assets] = line.split("|").map((item) => item.trim());
    if (!name) return;
    parsed[name] = {
      platform: platforms.includes(platform) ? platform : "Instagram",
      format: format || "",
      goal: goal || state.settings.goals[0] || "Awareness",
      assets: assets || "",
      checklist: { idea: true },
    };
  });
  return Object.keys(parsed).length ? parsed : structuredCloneSafe(defaultTemplates);
}

function templatesToText(templates) {
  return Object.entries(templates).map(([name, template]) => (
    [name, template.platform, template.format, template.goal, template.assets].join(" | ")
  )).join("\n");
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function ensureSelectOption(select, value) {
  if (!value || Array.from(select.options).some((option) => option.value === value)) return;
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  select.append(option);
}

function seedPosts() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return [
    normalizePost({
      id: createId(),
      title: "Idea carosello educativo",
      date: toDateKey(today),
      time: "10:00",
      platform: "Instagram",
      format: "Carosello",
      status: "Da scrivere",
      approval: "Bozza",
      priority: "Media",
      color: "#a7f3d0",
      owner: "",
      goal: "Educazione",
      tags: "tutorial",
      assets: "Grafiche, copy slide",
      notes: "Trasformare una domanda frequente in 5 slide.",
    }),
    normalizePost({
      id: createId(),
      title: "Video breve trend",
      date: toDateKey(tomorrow),
      time: "18:30",
      platform: "TikTok",
      format: "Video",
      status: "Idea",
      approval: "Bozza",
      priority: "Alta",
      color: "#fecaca",
      owner: "",
      goal: "Engagement",
      tags: "trend",
      assets: "Clip verticale, audio",
      notes: "Agganciare il trend al tema della pagina.",
    }),
  ];
}

function normalizePost(post) {
  return {
    id: post.id || createId(),
    title: post.title || "",
    date: post.date || toDateKey(new Date()),
    time: post.time || "",
    platform: post.platform || "Instagram",
    format: post.format || "",
    status: post.status || "Idea",
    approval: post.approval || "Bozza",
    priority: post.priority || "Media",
    color: isValidColor(post.color) ? post.color : pastelColors[0].value,
    owner: post.owner || "",
    goal: post.goal || "Awareness",
    tags: post.tags || "",
    assetLink: post.assetLink || "",
    assets: post.assets || "",
    copy: post.copy || "",
    notes: post.notes || "",
    recurrence: post.recurrence || "none",
    deletedAt: post.deletedAt || "",
    deletedBy: post.deletedBy || "",
    checklist: {
      idea: Boolean(post.checklist?.idea),
      copy: Boolean(post.checklist?.copy),
      creative: Boolean(post.checklist?.creative),
      review: Boolean(post.checklist?.review),
      scheduled: Boolean(post.checklist?.scheduled),
    },
    history: Array.isArray(post.history) ? post.history : [],
  };
}

function rowToPost(row) {
  return normalizePost({
    id: row.id || createId(),
    title: row.title,
    date: row.date,
    time: row.time,
    platform: row.platform,
    format: row.format,
    status: row.status,
    approval: row.approval,
    priority: row.priority,
    color: row.color,
    owner: row.owner,
    goal: row.goal,
    tags: row.tags,
    assetLink: row.assetLink,
    assets: row.assets,
    copy: row.copy,
    notes: row.notes,
    history: [historyEntry("Importato da CSV")],
  });
}

function getCalendarStartDate() {
  if (state.viewMode === "day" || state.viewMode === "list") return new Date(state.visibleDate);
  if (state.viewMode === "week") return startOfWeek(state.visibleDate);
  return startOfCalendar(state.visibleDate.getFullYear(), state.visibleDate.getMonth());
}

function getDaysToRender() {
  if (state.viewMode === "day") return 1;
  if (state.viewMode === "week") return 7;
  return 42;
}

function getPeriodLabel(start) {
  if (state.viewMode === "day") return formatFullDate(state.visibleDate);
  if (state.viewMode === "week") return formatWeekRange(start);
  if (state.viewMode === "list") return `Lista - ${formatMonthLabel(state.visibleDate)}`;
  return formatMonthLabel(state.visibleDate);
}

function startOfCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - getMondayBasedDay(firstDay));
  return start;
}

function startOfWeek(date) {
  const start = new Date(date);
  start.setDate(date.getDate() - getMondayBasedDay(date));
  return start;
}

function getMondayBasedDay(date) {
  return (date.getDay() + 6) % 7;
}

function getMonthPosts(posts) {
  const year = state.visibleDate.getFullYear();
  const month = state.visibleDate.getMonth();
  return posts.filter((post) => !post.deletedAt).filter((post) => {
    const postDate = parseDateKey(post.date);
    return postDate.getFullYear() === year && postDate.getMonth() === month;
  });
}

function activePosts() {
  return state.posts.filter((post) => !post.deletedAt);
}

function trashedPosts() {
  return state.posts.filter((post) => post.deletedAt);
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    groups[item[key]] = groups[item[key]] || [];
    groups[item[key]].push(item);
    return groups;
  }, {});
}

function sortPosts(a, b) {
  return `${a.time || "99:99"}${a.title}`.localeCompare(`${b.time || "99:99"}${b.title}`);
}

function checklistProgress(post) {
  const values = Object.values(post.checklist || {});
  return Math.round((values.filter(Boolean).length / values.length) * 100);
}

function historyEntry(action) {
  return { action, at: new Date().toISOString() };
}

function daysBetween(a, b) {
  return Math.round((b - a) / 86400000);
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = String(dateKey).split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateForLabel(date) {
  return new Intl.DateTimeFormat("it-IT", { weekday: "long", day: "numeric", month: "long" }).format(date);
}

function formatFullDate(date) {
  return new Intl.DateTimeFormat("it-IT", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(date);
}

function formatShortDate(date) {
  return new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function formatDateTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatMonthLabel(date) {
  return new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric" }).format(date);
}

function formatWeekRange(startDate) {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const start = new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "short" }).format(startDate);
  const end = new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "short", year: "numeric" }).format(endDate);
  return `${start} - ${end}`;
}

function formatWeekDayHeading(date) {
  const dayName = new Intl.DateTimeFormat("it-IT", { weekday: "short" }).format(date);
  return `${dayName} ${date.getDate()}`;
}

function csvEscape(value) {
  const text = String(value || "");
  return `"${text.replaceAll('"', '""')}"`;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  row.push(field);
  rows.push(row);
  const [headers, ...data] = rows.filter((item) => item.some(Boolean));
  return data.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function stripUndefined(value) {
  return JSON.parse(JSON.stringify(value));
}

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
