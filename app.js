const storageKey = "social-content-calendar-posts-v2";
const legacyStorageKey = "social-content-calendar-posts";
const settingsKey = "social-content-calendar-settings-v2";
const manualEventsKey = "social-content-calendar-manual-events-v1";

const platforms = ["Instagram", "TikTok", "Facebook", "LinkedIn", "YouTube", "X"];
const platformIcons = {
  Instagram: "◎",
  TikTok: "♪",
  Facebook: "f",
  LinkedIn: "in",
  YouTube: "▶",
  X: "X",
};
const statusIcons = {
  Idea: "○",
  "Da scrivere": "✎",
  Pronto: "✓",
  Programmato: "◷",
  Pubblicato: "●",
};
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
const defaultThemes = [
  { id: "ambiente", name: "Ambiente", icon: "🌿", color: "#16a34a" },
  { id: "sport", name: "Sport", icon: "⚽", color: "#2563eb" },
  { id: "salute", name: "Salute", icon: "💊", color: "#dc2626" },
  { id: "cultura", name: "Cultura", icon: "🎨", color: "#7c3aed" },
  { id: "lavoro", name: "Lavoro", icon: "💼", color: "#d97706" },
  { id: "innovazione", name: "Innovazione", icon: "💡", color: "#0891b2" },
  { id: "persone", name: "Persone", icon: "😊", color: "#c2185b" },
];
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
  "Reel educativo": { platform: "Instagram", format: "Reel", goal: "Educazione", theme: "innovazione", assets: "Video breve, sottotitoli, cover", checklist: { idea: true } },
  "Carosello tips": { platform: "Instagram", format: "Carosello", goal: "Educazione", theme: "cultura", assets: "Grafiche, copy slide, CTA", checklist: { idea: true, copy: true } },
  "Behind the scenes": { platform: "TikTok", format: "Video", goal: "Community", theme: "persone", assets: "Clip backstage, audio trend", checklist: { idea: true } },
  "Recensione cliente": { platform: "Facebook", format: "Post", goal: "Awareness", theme: "lavoro", assets: "Testimonianza, immagine cliente", checklist: { idea: true, copy: true } },
  "Post LinkedIn": { platform: "LinkedIn", format: "Post", goal: "Awareness", theme: "lavoro", assets: "Hook, insight, CTA", checklist: { idea: true, copy: true } },
  "Short YouTube": { platform: "YouTube", format: "Short", goal: "Engagement", theme: "persone", assets: "Video verticale, titolo, thumbnail", checklist: { idea: true } },
};
const eventCategories = {
  festivita: { label: "Festività", icon: "◆", color: "#0b7a75" },
  istituzioni: { label: "Istituzioni", icon: "▣", color: "#2563eb" },
  cultura: { label: "Cultura", icon: "◈", color: "#7c3aed" },
  ambiente: { label: "Ambiente", icon: "●", color: "#16a34a" },
  salute: { label: "Salute", icon: "✚", color: "#dc2626" },
  diritti: { label: "Diritti", icon: "◐", color: "#c2185b" },
  sport: { label: "Sport", icon: "◉", color: "#ea580c" },
  commerciale: { label: "Commerciale", icon: "◇", color: "#a15c00" },
  media: { label: "Media e digitale", icon: "▦", color: "#0891b2" },
};
const eventDefinitions = [
  { id: "capodanno", title: "Capodanno", month: 1, day: 1, category: "festivita", scope: "italia", importance: "alta", description: "Inizio dell'anno civile, utile per bilanci, obiettivi e messaggi di ripartenza.", ideas: ["Post di auguri con tono istituzionale", "Carosello sui buoni propositi editoriali", "Reel recap dell'anno precedente"], hashtags: ["#Capodanno", "#NuovoAnno"] },
  { id: "epifania", title: "Epifania", month: 1, day: 6, category: "festivita", scope: "italia", importance: "media", description: "Festività italiana molto riconoscibile, spesso collegata alla chiusura del periodo natalizio.", ideas: ["Post leggero di chiusura festività", "Story con domanda alla community"], hashtags: ["#Epifania", "#Befana"] },
  { id: "san-valentino", title: "San Valentino", month: 2, day: 14, category: "commerciale", scope: "internazionale", importance: "media", description: "Ricorrenza commerciale e relazionale adatta a campagne community e contenuti emozionali.", ideas: ["Post su relazioni e fiducia", "Carosello ironico a tema coppie", "Promo o contenuto storytelling"], hashtags: ["#SanValentino", "#ValentinesDay"] },
  { id: "donna", title: "Giornata internazionale della donna", month: 3, day: 8, category: "diritti", scope: "internazionale", importance: "alta", description: "Giornata globale dedicata a diritti, pari opportunità e ruolo delle donne nella società.", ideas: ["Carosello con dati e contesto", "Intervista o testimonianza", "Post istituzionale con attenzione al tono"], hashtags: ["#8Marzo", "#GiornataDellaDonna"] },
  { id: "papa", title: "Festa del papà", month: 3, day: 19, category: "festivita", scope: "italia", importance: "media", description: "Ricorrenza familiare molto usata per contenuti emozionali e community.", ideas: ["Story con domanda alla community", "Post fotografico con messaggio semplice"], hashtags: ["#FestaDelPapa"] },
  { id: "poesia", title: "Giornata mondiale della poesia", month: 3, day: 21, category: "cultura", scope: "internazionale", importance: "bassa", description: "Occasione culturale per linguaggio, scrittura, creatività e sensibilità editoriale.", ideas: ["Caption poetica a tema brand", "Citazione commentata", "Mini rubrica testuale"], hashtags: ["#Poesia", "#WorldPoetryDay"] },
  { id: "terra", title: "Giornata mondiale della Terra", month: 4, day: 22, category: "ambiente", scope: "internazionale", importance: "alta", description: "Ricorrenza ambientale globale, adatta a contenuti educativi e di sensibilizzazione.", ideas: ["Carosello con azioni concrete", "Reel educativo sull'impatto ambientale", "Post con dati verificabili"], hashtags: ["#EarthDay", "#GiornataDellaTerra"] },
  { id: "liberazione", title: "Festa della Liberazione", month: 4, day: 25, category: "istituzioni", scope: "italia", importance: "alta", description: "Ricorrenza civile italiana legata a memoria, democrazia e libertà.", ideas: ["Post istituzionale sobrio", "Carosello storico divulgativo", "Contenuto sulla memoria civile"], hashtags: ["#25Aprile", "#Liberazione"] },
  { id: "lavoro", title: "Festa dei lavoratori", month: 5, day: 1, category: "istituzioni", scope: "italia", importance: "alta", description: "Ricorrenza dedicata al lavoro, ai diritti e al valore professionale.", ideas: ["Post sul team", "Carosello su lavoro e competenze", "Riflessione editoriale"], hashtags: ["#PrimoMaggio", "#FestaDeiLavoratori"] },
  { id: "europa", title: "Festa dell'Europa", month: 5, day: 9, category: "istituzioni", scope: "internazionale", importance: "media", description: "Ricorrenza europea utile per contenuti su cittadinanza, cooperazione e istituzioni.", ideas: ["Post divulgativo sull'Europa", "Quiz in story", "Carosello sui valori europei"], hashtags: ["#EuropeDay", "#Europa"] },
  { id: "mamma", title: "Festa della mamma", rule: "second-sunday-may", category: "festivita", scope: "italia", importance: "media", description: "Ricorrenza familiare a data variabile, molto usata per contenuti emozionali.", ideas: ["Post community", "Story con domanda", "Contenuto fotografico semplice"], hashtags: ["#FestaDellaMamma"] },
  { id: "repubblica", title: "Festa della Repubblica", month: 6, day: 2, category: "istituzioni", scope: "italia", importance: "alta", description: "Festa nazionale italiana, centrale per contenuti istituzionali e civici.", ideas: ["Post istituzionale", "Carosello storico sintetico", "Contenuto sui valori costituzionali"], hashtags: ["#2Giugno", "#FestaDellaRepubblica"] },
  { id: "ambiente", title: "Giornata mondiale dell'ambiente", month: 6, day: 5, category: "ambiente", scope: "internazionale", importance: "alta", description: "Evento globale per educazione ambientale, sostenibilità e responsabilità sociale.", ideas: ["Carosello con consigli pratici", "Reel con dato chiave", "Post di impegno concreto"], hashtags: ["#WorldEnvironmentDay", "#Ambiente"] },
  { id: "musica", title: "Festa della musica", month: 6, day: 21, category: "cultura", scope: "internazionale", importance: "media", description: "Ricorrenza culturale adatta a contenuti creativi, eventi e community.", ideas: ["Playlist del brand", "Reel con trend audio", "Post su musica e cultura"], hashtags: ["#FestaDellaMusica", "#MusicDay"] },
  { id: "palio-siena-luglio", title: "Palio di Siena - Provenzano", month: 7, day: 2, category: "cultura", scope: "italia", importance: "alta", description: "Storica corsa delle contrade di Siena, evento identitario italiano ad alto valore culturale e visivo.", ideas: ["Carosello sulla tradizione delle contrade", "Reel sulle storie positive legate al territorio", "Post culturale su Siena e patrimonio immateriale"], hashtags: ["#PalioDiSiena", "#Siena", "#CulturaItaliana"] },
  { id: "wimbledon-finale", title: "Finale di Wimbledon", rule: "second-sunday-july", category: "sport", scope: "internazionale", importance: "alta", description: "Finale del torneo di Wimbledon, appuntamento sportivo internazionale utile per contenuti su sport, fair play e performance.", ideas: ["Post su disciplina e resilienza", "Story con sondaggio sul vincitore", "Carosello su sport e valori positivi"], hashtags: ["#Wimbledon", "#Tennis"] },
  { id: "amicizia", title: "Giornata internazionale dell'amicizia", month: 7, day: 30, category: "diritti", scope: "internazionale", importance: "bassa", description: "Occasione leggera per community, relazioni e contenuti partecipativi.", ideas: ["Story con mention", "Post community", "Domanda aperta ai follower"], hashtags: ["#FriendshipDay", "#Amicizia"] },
  { id: "ferragosto", title: "Ferragosto", month: 8, day: 15, category: "festivita", scope: "italia", importance: "alta", description: "Ricorrenza estiva italiana molto riconoscibile, utile per contenuti leggeri o stagionali.", ideas: ["Post di auguri estivi", "Story con sondaggio", "Contenuto dietro le quinte"], hashtags: ["#Ferragosto", "#Estate"] },
  { id: "palio-siena-agosto", title: "Palio di Siena - Assunta", month: 8, day: 16, category: "cultura", scope: "italia", importance: "alta", description: "Seconda corsa annuale del Palio di Siena, ricorrenza culturale italiana fortemente legata a tradizione, identità e territorio.", ideas: ["Post fotografico su tradizione e comunità", "Carosello sulle contrade", "Reel sul valore della memoria locale"], hashtags: ["#PalioDiSiena", "#Siena", "#Tradizione"] },
  { id: "alfabetizzazione", title: "Giornata internazionale dell'alfabetizzazione", month: 9, day: 8, category: "cultura", scope: "internazionale", importance: "media", description: "Ricorrenza UNESCO su educazione, accesso alla conoscenza e inclusione.", ideas: ["Carosello educativo", "Post su formazione e conoscenza", "Dato spiegato in modo semplice"], hashtags: ["#LiteracyDay", "#Educazione"] },
  { id: "pace", title: "Giornata internazionale della pace", month: 9, day: 21, category: "diritti", scope: "internazionale", importance: "media", description: "Giornata globale dedicata a pace, dialogo e cooperazione.", ideas: ["Post riflessivo", "Carosello con parole chiave", "Contenuto valoriale"], hashtags: ["#PeaceDay", "#Pace"] },
  { id: "nonni", title: "Festa dei nonni", month: 10, day: 2, category: "festivita", scope: "italia", importance: "media", description: "Ricorrenza familiare italiana utile per contenuti emozionali e intergenerazionali.", ideas: ["Post storytelling", "Story con ricordi della community", "Foto o frase dedicata"], hashtags: ["#FestaDeiNonni"] },
  { id: "salute-mentale", title: "Giornata mondiale della salute mentale", month: 10, day: 10, category: "salute", scope: "internazionale", importance: "alta", description: "Ricorrenza sensibile, adatta a contenuti informativi con tono responsabile.", ideas: ["Carosello con risorse utili", "Post di sensibilizzazione", "Reel con messaggio chiaro e non sensazionalistico"], hashtags: ["#MentalHealthDay", "#SaluteMentale"] },
  { id: "halloween", title: "Halloween", month: 10, day: 31, category: "commerciale", scope: "internazionale", importance: "media", description: "Ricorrenza pop e commerciale adatta a creatività, ironia e contenuti stagionali.", ideas: ["Reel creativo", "Post ironico", "Visual a tema stagionale"], hashtags: ["#Halloween"] },
  { id: "tutti-santi", title: "Ognissanti", month: 11, day: 1, category: "festivita", scope: "italia", importance: "media", description: "Festività italiana e religiosa, utile per comunicazioni sobrie e calendario operativo.", ideas: ["Post sobrio", "Story informativa su chiusure o servizi"], hashtags: ["#Ognissanti"] },
  { id: "gentilezza", title: "Giornata mondiale della gentilezza", month: 11, day: 13, category: "diritti", scope: "internazionale", importance: "bassa", description: "Ricorrenza positiva per community, tone of voice e contenuti valoriali.", ideas: ["Post community", "Challenge gentilezza", "Story con domanda"], hashtags: ["#WorldKindnessDay", "#Gentilezza"] },
  { id: "black-friday", title: "Black Friday", rule: "black-friday", category: "commerciale", scope: "internazionale", importance: "alta", description: "Evento commerciale a data variabile, utile per campagne promozionali e contenuti vendita.", ideas: ["Campagna promo", "Carosello offerta", "Reminder in story"], hashtags: ["#BlackFriday"] },
  { id: "violenza-donne", title: "Giornata contro la violenza sulle donne", month: 11, day: 25, category: "diritti", scope: "internazionale", importance: "alta", description: "Ricorrenza sociale importante, richiede tono accurato e contenuti responsabili.", ideas: ["Post informativo con risorse", "Carosello su dati e consapevolezza", "Messaggio istituzionale sobrio"], hashtags: ["#25Novembre", "#NoViolenzaSulleDonne"] },
  { id: "disabilita", title: "Giornata internazionale delle persone con disabilità", month: 12, day: 3, category: "diritti", scope: "internazionale", importance: "media", description: "Giornata per inclusione, accessibilità e diritti.", ideas: ["Carosello su accessibilità", "Post su linguaggio inclusivo", "Audit dei contenuti accessibili"], hashtags: ["#DisabilityDay", "#Accessibilità"] },
  { id: "immacolata", title: "Immacolata Concezione", month: 12, day: 8, category: "festivita", scope: "italia", importance: "media", description: "Festività italiana collegata all'avvio del periodo natalizio.", ideas: ["Post stagionale", "Story su calendario natalizio", "Contenuto leggero di apertura festività"], hashtags: ["#Immacolata"] },
  { id: "natale", title: "Natale", month: 12, day: 25, category: "festivita", scope: "italia", importance: "alta", description: "Ricorrenza centrale per auguri, comunicazioni istituzionali e contenuti emozionali.", ideas: ["Post di auguri", "Video del team", "Carosello recap valori dell'anno"], hashtags: ["#Natale", "#Christmas"] },
  { id: "santo-stefano", title: "Santo Stefano", month: 12, day: 26, category: "festivita", scope: "italia", importance: "media", description: "Festività italiana utile per pianificare pause, contenuti leggeri o reminder.", ideas: ["Story leggera", "Post di continuità natalizia"], hashtags: ["#SantoStefano"] },
  { id: "capodanno-eve", title: "San Silvestro", month: 12, day: 31, category: "festivita", scope: "italia", importance: "alta", description: "Chiusura dell'anno, ideale per recap, ringraziamenti e anticipazioni.", ideas: ["Recap anno", "Post ringraziamento", "Teaser obiettivi nuovo anno"], hashtags: ["#SanSilvestro", "#FineAnno"] },
  { id: "mondiali-finale-2026", title: "Finale dei Mondiali di calcio", year: 2026, month: 7, day: 19, category: "sport", scope: "internazionale", importance: "alta", description: "Finale della Coppa del Mondo FIFA 2026, evento sportivo globale ad altissima attenzione mediatica.", ideas: ["Post su sport e unione tra culture", "Story live reaction", "Carosello sui momenti positivi del torneo"], hashtags: ["#Mondiali", "#WorldCup", "#Calcio"] },
];

const initialSettings = loadSettings();
const initialManualEvents = loadManualEvents();
const state = {
  visibleDate: new Date(),
  viewMode: initialSettings.defaultView,
  appMode: "editorial",
  posts: loadPosts(),
  manualEvents: initialManualEvents.length ? initialManualEvents : initialSettings.manualEvents,
  settings: initialSettings,
};

const calendarGrid = document.querySelector("#calendarGrid");
const listView = document.querySelector("#listView");
const listToolbar = document.querySelector("#listToolbar");
const listSortSelect = document.querySelector("#listSortSelect");
const listGroupSelect = document.querySelector("#listGroupSelect");
const selectAllList = document.querySelector("#selectAllList");
const selectedListCount = document.querySelector("#selectedListCount");
const listBulkActionBar = document.querySelector("#listBulkActionBar");
const listBulkActionSummary = document.querySelector("#listBulkActionSummary");
const listBulkActionsButton = document.querySelector("#listBulkActionsButton");
const listBulkContextMenu = document.querySelector("#listBulkContextMenu");
const clearListSelectionButton = document.querySelector("#clearListSelectionButton");
const bulkStatusSelect = document.querySelector("#bulkStatusSelect");
const bulkOwnerInput = document.querySelector("#bulkOwnerInput");
const bulkThemeSelect = document.querySelector("#bulkThemeSelect");
const weekdays = document.querySelector("#weekdays");
const appShell = document.querySelector(".app-shell");
const authGate = document.querySelector("#authGate");
const sidebarResizer = document.querySelector("#sidebarResizer");
const sidebarReopen = document.querySelector("#sidebarReopen");
const sidebarEyebrow = document.querySelector("#sidebarEyebrow");
const sidebarTitle = document.querySelector("#sidebarTitle");
const periodLabel = document.querySelector("#periodLabel");
const periodButton = document.querySelector("#periodButton");
const filterBadge = document.querySelector("#filterBadge");
const filterToolbarButton = document.querySelector("#filterToolbarButton");
const resetFiltersButton = document.querySelector("#resetFiltersButton");
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
const themeFilter = document.querySelector("#themeFilter");
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
const statsDialog = document.querySelector("#statsDialog");
const statsPeriodTitle = document.querySelector("#statsPeriodTitle");
const statsPeriodInput = document.querySelector("#statsPeriodInput");
const statsSummaryGrid = document.querySelector("#statsSummaryGrid");
const statsPlatformBars = document.querySelector("#statsPlatformBars");
const statsStatusBars = document.querySelector("#statsStatusBars");
const themeBars = document.querySelector("#themeBars");
const statsInsights = document.querySelector("#statsInsights");
const copyCounter = document.querySelector("#copyCounter");
const dayDialog = document.querySelector("#dayDialog");
const dayDialogTitle = document.querySelector("#dayDialogTitle");
const dayDialogSummary = document.querySelector("#dayDialogSummary");
const dayDialogList = document.querySelector("#dayDialogList");
const addDayDialogPost = document.querySelector("#addDayDialogPost");
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
const themesSetting = document.querySelector("#themesSetting");
const themeEditor = document.querySelector("#themeEditor");
const templatesSetting = document.querySelector("#templatesSetting");
const currentUserUid = document.querySelector("#currentUserUid");
const accessNote = document.querySelector("#accessNote");
const adminAccessControls = document.querySelector("#adminAccessControls");
const memberUidInput = document.querySelector("#memberUidInput");
const memberNameInput = document.querySelector("#memberNameInput");
const memberRoleInput = document.querySelector("#memberRoleInput");
const memberList = document.querySelector("#memberList");
const visibleFieldSettings = {
  time: document.querySelector("#showTimeSetting"),
  platform: document.querySelector("#showPlatformSetting"),
  priority: document.querySelector("#showPrioritySetting"),
  owner: document.querySelector("#showOwnerSetting"),
  checklist: document.querySelector("#showChecklistSetting"),
};
const colorPalette = document.querySelector("#colorPalette");
const colorMenuButton = document.querySelector("#colorMenuButton");
const selectedColorSwatch = document.querySelector("#selectedColorSwatch");
const selectedColorLabel = document.querySelector("#selectedColorLabel");
const editorialModeButton = document.querySelector("#editorialModeButton");
const eventsModeButton = document.querySelector("#eventsModeButton");
const eventSearchInput = document.querySelector("#eventSearchInput");
const eventCategoryFilter = document.querySelector("#eventCategoryFilter");
const eventScopeFilter = document.querySelector("#eventScopeFilter");
const eventImportanceFilter = document.querySelector("#eventImportanceFilter");
const eventModeLabel = document.querySelector("#eventModeLabel");
const toolbarNewEventButton = document.querySelector("#toolbarNewEventButton");
const eventDialog = document.querySelector("#eventDialog");
const eventDialogCategory = document.querySelector("#eventDialogCategory");
const eventDialogTitle = document.querySelector("#eventDialogTitle");
const eventDialogMeta = document.querySelector("#eventDialogMeta");
const eventDialogDescription = document.querySelector("#eventDialogDescription");
const eventIdeasList = document.querySelector("#eventIdeasList");
const eventHashtags = document.querySelector("#eventHashtags");
const createPostFromEventButton = document.querySelector("#createPostFromEvent");
const deleteManualEventButton = document.querySelector("#deleteManualEvent");
const editManualEventButton = document.querySelector("#editManualEvent");
const manualEventDialog = document.querySelector("#manualEventDialog");
const manualEventForm = document.querySelector("#manualEventForm");
const manualEventFields = {
  id: document.querySelector("#manualEventId"),
  title: document.querySelector("#manualEventTitle"),
  date: document.querySelector("#manualEventDate"),
  category: document.querySelector("#manualEventCategory"),
  scope: document.querySelector("#manualEventScope"),
  importance: document.querySelector("#manualEventImportance"),
  description: document.querySelector("#manualEventDescription"),
  ideas: document.querySelector("#manualEventIdeas"),
  hashtags: document.querySelector("#manualEventHashtags"),
};
const contentDetailDialog = document.querySelector("#contentDetailDialog");
const contentDetailTitle = document.querySelector("#contentDetailTitle");
const contentDetailGrid = document.querySelector("#contentDetailGrid");
const contentDetailCopy = document.querySelector("#contentDetailCopy");
const contentDetailNotes = document.querySelector("#contentDetailNotes");
const contentDetailComments = document.querySelector("#contentDetailComments");
const unlockContentEditButton = document.querySelector("#unlockContentEdit");

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
  goalOther: document.querySelector("#postGoalOther"),
  theme: document.querySelector("#postTheme"),
  themeOther: document.querySelector("#postThemeOther"),
  tags: document.querySelector("#postTags"),
  assetLink: document.querySelector("#postAssetLink"),
  assets: document.querySelector("#postAssets"),
  copy: document.querySelector("#postCopy"),
  copyEditor: document.querySelector("#postCopyEditor"),
  notes: document.querySelector("#postNotes"),
  notesEditor: document.querySelector("#postNotesEditor"),
  commentDraft: document.querySelector("#postCommentDraft"),
  recurrence: document.querySelector("#postRecurrence"),
  checkIdea: document.querySelector("#checkIdea"),
  checkCopy: document.querySelector("#checkCopy"),
  checkCreative: document.querySelector("#checkCreative"),
  checkReview: document.querySelector("#checkReview"),
  checkScheduled: document.querySelector("#checkScheduled"),
};

const assetLinksList = document.querySelector("#assetLinksList");
const addAssetLinkButton = document.querySelector("#addAssetLinkButton");
const postCommentsList = document.querySelector("#postCommentsList");
const mentionSuggestions = document.querySelector("#mentionSuggestions");
const sendCommentButton = document.querySelector("#sendCommentButton");

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
let resizingSidebar = false;
let statsVisibleDate = new Date(state.visibleDate);
const selectedListPosts = new Set();
const dismissedStatsInsights = new Set();
let selectedEvent = null;
let selectedContentDetail = null;
let listSelectionDrag = null;
let suppressListClick = false;
let lastSelectedListPostId = null;
let editingComments = [];
let activeMentionIndex = 0;

document.querySelector("#previousPeriod").addEventListener("click", () => changePeriod(-1));
document.querySelector("#nextPeriod").addEventListener("click", () => changePeriod(1));
document.querySelector("#todayButton").addEventListener("click", goToToday);
document.querySelector("#printButton").addEventListener("click", () => {
  closeHamburgerMenu();
  window.print();
});
document.querySelector("#newPostButton").addEventListener("click", () => openPostDialog());
document.querySelector("#toolbarNewPostButton").addEventListener("click", () => openPostDialog());
toolbarNewEventButton.addEventListener("click", () => openManualEventDialog());
editorialModeButton.addEventListener("click", () => setAppMode("editorial"));
eventsModeButton.addEventListener("click", () => setAppMode("events"));
filterToolbarButton.addEventListener("click", openFiltersPanel);
resetFiltersButton.addEventListener("click", resetFilters);
document.querySelector("#settingsButton").addEventListener("click", openSettingsDialog);
document.querySelector("#statsButton").addEventListener("click", openStatsDialog);
document.querySelector("#trashButton").addEventListener("click", openTrashDialog);
sidebarResizer.addEventListener("pointerdown", startSidebarResize);
sidebarReopen.addEventListener("click", reopenSidebar);
hamburgerButton.addEventListener("click", toggleHamburgerMenu);
periodButton.addEventListener("click", openDatePicker);
document.querySelector("#closeDatePicker").addEventListener("click", closeDatePicker);
document.querySelector("#cancelDatePicker").addEventListener("click", closeDatePicker);
document.querySelector("#closeTrash").addEventListener("click", closeTrashDialog);
document.querySelector("#closeStats").addEventListener("click", closeStatsDialog);
document.querySelector("#previousStatsPeriod").addEventListener("click", () => changeStatsPeriod(-1));
document.querySelector("#nextStatsPeriod").addEventListener("click", () => changeStatsPeriod(1));
statsPeriodInput.addEventListener("change", setStatsPeriodFromInput);
document.querySelector("#closeDayDialog").addEventListener("click", closeDayDialog);
document.querySelector("#closeEventDialog").addEventListener("click", closeEventDialog);
createPostFromEventButton.addEventListener("click", createPostFromSelectedEvent);
deleteManualEventButton.addEventListener("click", deleteSelectedManualEvent);
editManualEventButton.addEventListener("click", editSelectedManualEvent);
document.querySelector("#closeManualEventDialog").addEventListener("click", closeManualEventDialog);
document.querySelector("#cancelManualEventDialog").addEventListener("click", closeManualEventDialog);
manualEventForm.addEventListener("submit", saveManualEvent);
document.querySelector("#closeContentDetailDialog").addEventListener("click", closeContentDetailDialog);
unlockContentEditButton.addEventListener("click", unlockSelectedContentEdit);
addDayDialogPost.addEventListener("click", () => {
  const date = addDayDialogPost.dataset.date;
  closeDayDialog();
  openPostDialog({ date });
});
document.querySelector("#closeDialog").addEventListener("click", closePostDialog);
document.querySelector("#cancelPost").addEventListener("click", closePostDialog);
deletePostButton.addEventListener("click", deleteCurrentPost);
duplicatePostButton.addEventListener("click", duplicateCurrentPost);
datePickerForm.addEventListener("submit", jumpToSelectedDate);
postForm.addEventListener("submit", savePost);
fields.template.addEventListener("change", applyTemplate);
fields.platform.addEventListener("change", applyRecommendedTime);
fields.copyEditor.addEventListener("input", updateCopyCounter);
fields.notesEditor.addEventListener("input", syncRichEditorsToFields);
fields.goal.addEventListener("change", updateOtherFieldVisibility);
fields.theme.addEventListener("change", updateOtherFieldVisibility);
fields.commentDraft.addEventListener("input", updateMentionSuggestions);
fields.commentDraft.addEventListener("keydown", handleCommentDraftKeydown);
sendCommentButton.addEventListener("click", sendCommentFromComposer);
[fields.checkIdea, fields.checkCopy, fields.checkCreative, fields.checkReview, fields.checkScheduled].forEach((input) => {
  input.addEventListener("change", validateChecklistSelection);
});
document.addEventListener("selectionchange", rememberRichEditorSelection);
document.querySelectorAll("[data-rich-toolbar]").forEach((toolbar) => {
  toolbar.addEventListener("pointerdown", rememberRichToolbarSelection, true);
  toolbar.addEventListener("mousedown", preserveRichEditorSelection);
  toolbar.addEventListener("click", handleRichToolbarAction);
  toolbar.addEventListener("input", handleRichToolbarAction);
  toolbar.addEventListener("change", handleRichToolbarAction);
});
addAssetLinkButton.addEventListener("click", () => addAssetLinkRow());
document.querySelector("#exportCsvButton").addEventListener("click", exportCsv);
document.querySelector("#exportFilteredCsvButton").addEventListener("click", exportFilteredCsv);
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
document.querySelector("#addThemeSetting").addEventListener("click", addThemeSettingRow);
settingsForm.addEventListener("submit", saveSettings);
listSortSelect.addEventListener("change", render);
listGroupSelect.addEventListener("change", render);
selectAllList.addEventListener("change", toggleSelectAllList);
document.querySelector("#applyBulkAction").addEventListener("click", applyBulkAction);
document.querySelector("#deleteSelectedList").addEventListener("click", deleteSelectedListPosts);
listView.addEventListener("pointerdown", startListSelectionDrag);
listView.addEventListener("contextmenu", openListContextMenuFromRow);
listBulkActionsButton.addEventListener("click", () => openListBulkMenuFromElement(listBulkActionsButton));
clearListSelectionButton.addEventListener("click", clearListSelection);
listBulkContextMenu.addEventListener("click", handleListBulkMenuAction);
document.addEventListener("click", (event) => {
  if (!listBulkContextMenu.hidden && !event.target.closest("#listBulkContextMenu, #listBulkActionsButton")) {
    closeListBulkMenu();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeListBulkMenu();
});

document.querySelectorAll("[data-settings-tab-button]").forEach((button) => {
  button.addEventListener("click", () => setSettingsTab(button.dataset.settingsTabButton));
});

Object.entries(viewButtons).forEach(([viewMode, button]) => {
  button.addEventListener("click", () => setViewMode(viewMode));
});

[searchInput, platformFilter, statusFilter, priorityFilter, themeFilter, ownerFilter].forEach((control) => {
  control.addEventListener("input", render);
  control.addEventListener("change", render);
});

[eventSearchInput, eventCategoryFilter, eventScopeFilter, eventImportanceFilter].forEach((control) => {
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
    if (state.appMode === "events") openManualEventDialog();
    else openPostDialog();
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
applySidebarWidth();
renderColorPalette();
populateEventCategoryFilter();
purgeExpiredTrash();
closeHamburgerMenu();
render();
initCloud();

function render() {
  applyAppMode();
  renderMainView();
  if (state.appMode === "editorial") {
    renderStats();
    renderPlatformStats();
    renderWarnings();
    updateFilterToolbar();
  }
  if (statsDialog.open) renderStatsDialog();
}

function setAppMode(mode) {
  state.appMode = mode;
  selectedListPosts.clear();
  closeHamburgerMenu();
  render();
}

function applyAppMode() {
  const isEventsMode = state.appMode === "events";
  document.body.classList.toggle("is-events-mode", isEventsMode);
  editorialModeButton.setAttribute("aria-pressed", String(!isEventsMode));
  eventsModeButton.setAttribute("aria-pressed", String(isEventsMode));
  sidebarEyebrow.textContent = isEventsMode ? "Ricorrenze e opportunità" : "Planner editoriale";
  sidebarTitle.textContent = isEventsMode ? "Calendario eventi" : "Calendario contenuti MP";
  document.querySelectorAll("[data-editorial-panel], [data-editorial-action]").forEach((element) => {
    element.hidden = isEventsMode;
  });
  document.querySelectorAll("[data-events-panel]").forEach((element) => {
    element.hidden = !isEventsMode;
  });
  eventModeLabel.hidden = !isEventsMode;
  toolbarNewEventButton.hidden = !isEventsMode;
  filterBadge.hidden = isEventsMode || !getActiveFilterCount();
  if (isEventsMode) resetFiltersButton.hidden = true;
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
    state.manualEvents = state.settings.manualEvents;
    state.viewMode = state.settings.defaultView;
    persistSettings(false);
    persistManualEvents(false);
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

function applySidebarWidth() {
  const storedWidth = Number(localStorage.getItem("social-content-calendar-sidebar-width"));
  if (storedWidth === 0) {
    collapseSidebar();
    return;
  }
  const width = clampSidebarWidth(storedWidth || 270);
  document.body.classList.remove("is-sidebar-collapsed");
  document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
}

function startSidebarResize(event) {
  resizingSidebar = true;
  sidebarResizer.setPointerCapture(event.pointerId);
  document.body.classList.add("is-resizing-sidebar");
  window.addEventListener("pointermove", resizeSidebar);
  window.addEventListener("pointerup", stopSidebarResize, { once: true });
}

function resizeSidebar(event) {
  if (!resizingSidebar) return;
  if (event.clientX < 120) {
    collapseSidebar();
    localStorage.setItem("social-content-calendar-sidebar-width", "0");
    stopSidebarResize();
    return;
  }
  const width = clampSidebarWidth(event.clientX);
  document.body.classList.remove("is-sidebar-collapsed");
  document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
  localStorage.setItem("social-content-calendar-sidebar-width", String(width));
}

function stopSidebarResize() {
  resizingSidebar = false;
  document.body.classList.remove("is-resizing-sidebar");
  window.removeEventListener("pointermove", resizeSidebar);
}

function clampSidebarWidth(width) {
  return Math.min(330, Math.max(230, Number(width) || 270));
}

function collapseSidebar() {
  document.body.classList.add("is-sidebar-collapsed");
  document.documentElement.style.setProperty("--sidebar-width", "0px");
}

function reopenSidebar() {
  const width = 270;
  document.body.classList.remove("is-sidebar-collapsed");
  document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
  localStorage.setItem("social-content-calendar-sidebar-width", String(width));
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
  memberNameInput.disabled = !isAdmin;
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
    title.textContent = member.name || member.email || member.uid;
    const meta = document.createElement("small");
    meta.textContent = [member.role || "editor", member.email, member.uid].filter(Boolean).join(" - ");
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

function openStatsDialog() {
  closeHamburgerMenu();
  statsVisibleDate = new Date(state.visibleDate);
  renderStatsDialog();
  if (!statsDialog.open) statsDialog.showModal();
}

function closeStatsDialog() {
  statsDialog.close();
}

function changeStatsPeriod(delta) {
  statsVisibleDate.setMonth(statsVisibleDate.getMonth() + delta);
  renderStatsDialog();
}

function setStatsPeriodFromInput() {
  if (!statsPeriodInput.value) return;
  const [year, month] = statsPeriodInput.value.split("-").map(Number);
  if (!year || !month) return;
  statsVisibleDate = new Date(year, month - 1, 1);
  renderStatsDialog();
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
  const name = memberNameInput.value.trim();
  if (!uid) return;
  membersCollection().doc(uid).set({
    uid,
    name,
    role: memberRoleInput.value,
    updatedAt: new Date().toISOString(),
    createdBy: cloud.user.uid,
  }, { merge: true }).then(() => {
    memberUidInput.value = "";
    memberNameInput.value = "";
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
  listToolbar.hidden = true;
  if (!isListView || state.appMode !== "editorial") {
    listBulkActionBar.hidden = true;
    closeListBulkMenu();
  }

  Object.entries(viewButtons).forEach(([viewMode, button]) => {
    button.setAttribute("aria-pressed", String(state.viewMode === viewMode));
  });

  if (state.appMode === "events") {
    renderEventsView(start, todayKey, isListView);
    return;
  }

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

function renderEventsView(start, todayKey, isListView) {
  if (isListView) {
    calendarGrid.hidden = true;
    listView.hidden = false;
    renderEventListView();
    return;
  }

  calendarGrid.innerHTML = "";
  calendarGrid.className = "calendar-grid events-calendar-grid";
  calendarGrid.classList.toggle("is-week-view", state.viewMode === "week");
  calendarGrid.classList.toggle("is-day-view", state.viewMode === "day");

  for (let index = 0; index < getDaysToRender(); index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    calendarGrid.append(createEventDayCell(date, todayKey));
  }
}

function createDayCell(date, todayKey) {
  const visibleMonth = state.visibleDate.getMonth();
  const dateKey = toDateKey(date);
  const dayPosts = filteredPosts()
    .filter((post) => post.date === dateKey)
    .sort(sortPosts);
  const isMonthView = state.viewMode === "month";

  const cell = document.createElement("section");
  cell.className = "day-cell";
  cell.dataset.date = dateKey;
  if (date.getMonth() !== visibleMonth && state.viewMode === "month") cell.classList.add("is-muted");
  if (dateKey === todayKey) cell.classList.add("is-today");
  if (dayPosts.length === 0) cell.classList.add("is-empty");
  if (dayPosts.length >= state.settings.warningRules.maxPostsPerDay) cell.classList.add("is-heavy");
  cell.addEventListener("dragover", allowDrop);
  cell.addEventListener("drop", dropPostOnDay);

  const top = document.createElement("div");
  top.className = "day-top";

  const dayButton = document.createElement("button");
  dayButton.className = "day-number";
  dayButton.type = "button";
  dayButton.textContent = isMonthView ? date.getDate() : formatWeekDayHeading(date);
  dayButton.setAttribute("aria-label", `Apri dettaglio ${formatDateForLabel(date)}`);
  dayButton.addEventListener("click", () => openDayDialog(dateKey));

  const addButton = document.createElement("button");
  addButton.className = "add-day";
  addButton.type = "button";
  addButton.textContent = "+";
  addButton.setAttribute("aria-label", `Aggiungi contenuto per ${formatDateForLabel(date)}`);
  addButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openPostDialog({ date: dateKey });
  });

  const count = document.createElement("span");
  count.className = "day-count";
  count.textContent = `${dayPosts.length}`;
  count.title = `${dayPosts.length} contenuti`;

  top.append(dayButton, count, addButton);

  const list = isMonthView ? createCompactPostList(dayPosts) : createTimedPostList(dayPosts);
  const visibleCount = Number(list.dataset.visibleCount || 0);

  if (isMonthView && dayPosts.length > visibleCount) {
    const more = document.createElement("button");
    more.className = "more-posts";
    more.type = "button";
    more.textContent = `+ ${dayPosts.length - visibleCount} altri`;
    more.addEventListener("click", () => openDayDialog(dateKey));
    list.append(more);
  }

  if (state.viewMode === "day" && dayPosts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-day";
    empty.textContent = "Nessun contenuto programmato per questa giornata.";
    list.append(empty);
  }

  cell.append(top, list);
  return cell;
}

function createCompactPostList(dayPosts) {
  const list = document.createElement("div");
  list.className = "post-list";
  const visiblePosts = dayPosts.slice(0, 3);
  list.dataset.visibleCount = String(visiblePosts.length);
  visiblePosts.forEach((post) => list.append(createPostChip(post)));
  return list;
}

function createTimedPostList(dayPosts) {
  const list = document.createElement("div");
  list.className = "post-list timed-post-list";
  const withTime = dayPosts.filter((post) => isValidPostTime(post.time));
  const withoutTime = dayPosts.filter((post) => !isValidPostTime(post.time));

  if (withTime.length) {
    groupTimedPosts(withTime).forEach(([time, posts]) => {
      const minutes = Math.max(TIMELINE_START_MINUTES, Math.min(TIMELINE_END_MINUTES, timeToMinutes(time)));
      const minutesFromStart = Math.max(0, minutes - TIMELINE_START_MINUTES);
      const slot = document.createElement("section");
      slot.className = "time-slot";
      slot.style.setProperty("--time-offset", `${minutesFromStart * getTimelineMinuteScale()}px`);
      const label = document.createElement("span");
      label.className = "time-slot-label";
      label.textContent = time;
      const items = document.createElement("div");
      items.className = "time-slot-items";
      posts.forEach((post) => items.append(createPostChip(post)));
      slot.append(label, items);
      list.append(slot);
    });
  }

  if (withoutTime.length) {
    if (withTime.length) {
      const spacer = document.createElement("div");
      spacer.className = "time-slot-spacer";
      list.append(spacer);
    }

    const slot = document.createElement("section");
    slot.className = "time-slot is-unscheduled";
    const label = document.createElement("span");
    label.className = "time-slot-label";
    label.textContent = "Senza orario";
    const items = document.createElement("div");
    items.className = "time-slot-items";
    withoutTime.forEach((post) => items.append(createPostChip(post)));
    slot.append(label, items);
    list.append(slot);
  }

  return list;
}

function groupTimedPosts(posts) {
  const groups = posts.reduce((accumulator, post) => {
    const time = post.time;
    accumulator[time] = accumulator[time] || [];
    accumulator[time].push(post);
    return accumulator;
  }, {});
  return Object.entries(groups).sort(([first], [second]) => first.localeCompare(second));
}

const TIMELINE_START_MINUTES = 6 * 60;
const TIMELINE_END_MINUTES = 24 * 60;

function timeToMinutes(time) {
  const [hours, minutes] = String(time || "0:0").split(":").map(Number);
  return hours * 60 + minutes;
}

function getTimelineMinuteScale() {
  return state.viewMode === "day" ? 0.55 : 0.42;
}

function createEventDayCell(date, todayKey) {
  const visibleMonth = state.visibleDate.getMonth();
  const dateKey = toDateKey(date);
  const dayEvents = filteredEvents().filter((event) => event.date === dateKey);
  const isMonthView = state.viewMode === "month";

  const cell = document.createElement("section");
  cell.className = "day-cell event-day-cell";
  cell.dataset.date = dateKey;
  if (date.getMonth() !== visibleMonth && state.viewMode === "month") cell.classList.add("is-muted");
  if (dateKey === todayKey) cell.classList.add("is-today");
  if (dayEvents.length === 0) cell.classList.add("is-empty");

  const top = document.createElement("div");
  top.className = "day-top";

  const dayButton = document.createElement("button");
  dayButton.className = "day-number";
  dayButton.type = "button";
  dayButton.textContent = isMonthView ? date.getDate() : formatWeekDayHeading(date);
  dayButton.setAttribute("aria-label", `Giorno ${formatDateForLabel(date)}`);
  dayButton.addEventListener("click", () => openFirstEventForDay(dateKey));

  const count = document.createElement("span");
  count.className = "day-count event-count";
  count.textContent = `${dayEvents.length}`;
  count.title = `${dayEvents.length} eventi`;

  const addButton = document.createElement("button");
  addButton.className = "add-day";
  addButton.type = "button";
  addButton.textContent = "+";
  addButton.setAttribute("aria-label", `Aggiungi evento per ${formatDateForLabel(date)}`);
  addButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openManualEventDialog({ date: dateKey });
  });

  top.append(dayButton, count, addButton);

  const list = document.createElement("div");
  list.className = "post-list event-list";
  const visibleEvents = isMonthView ? dayEvents.slice(0, 4) : dayEvents;
  visibleEvents.forEach((event) => list.append(createEventChip(event)));

  if (isMonthView && dayEvents.length > visibleEvents.length) {
    const more = document.createElement("button");
    more.className = "more-posts";
    more.type = "button";
    more.textContent = `+ ${dayEvents.length - visibleEvents.length} eventi`;
    more.addEventListener("click", () => openFirstEventForDay(dateKey));
    list.append(more);
  }

  if (state.viewMode === "day" && dayEvents.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-day";
    empty.textContent = "Nessuna ricorrenza rilevante in questa giornata.";
    list.append(empty);
  }

  cell.append(top, list);
  return cell;
}

function createEventChip(event) {
  const category = eventCategories[event.category];
  const chip = document.createElement("button");
  chip.className = "event-chip";
  chip.type = "button";
  chip.style.borderLeftColor = category?.color || "var(--accent)";
  chip.addEventListener("click", () => openEventDialog(event));

  const title = document.createElement("strong");
  title.textContent = `${category?.icon || "•"} ${event.title}`;
  const meta = document.createElement("span");
  meta.textContent = `${category?.label || "Evento"} - ${event.scope === "italia" ? "Italia" : "Internazionale"} - ${event.importance}`;
  chip.append(title, meta);
  return chip;
}

function renderEventListView() {
  const events = filteredEvents().sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
  listView.innerHTML = "";
  if (!events.length) {
    const empty = document.createElement("p");
    empty.className = "empty-day";
    empty.textContent = "Nessun evento trovato con i filtri attuali.";
    listView.append(empty);
    return;
  }

  events.forEach((event) => {
    const category = eventCategories[event.category];
    const row = document.createElement("article");
    row.className = "list-item event-list-item";
    row.style.borderLeftColor = category?.color || "var(--accent)";
    row.tabIndex = 0;
    row.addEventListener("click", () => {
      if (suppressListClick) return;
      openEventDialog(event);
    });
    row.addEventListener("keydown", (keyboardEvent) => {
      if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
        keyboardEvent.preventDefault();
        openEventDialog(event);
      }
    });

    const main = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = event.title;
    const meta = document.createElement("p");
    meta.textContent = `${formatShortDate(parseDateKey(event.date))} - ${category?.label || "Evento"} - ${event.scope === "italia" ? "Italia" : "Internazionale"} - ${event.importance}`;
    main.append(title, meta);

    const detail = document.createElement("p");
    detail.textContent = event.description;

    row.append(main, detail);
    listView.append(row);
  });
}

function openFirstEventForDay(dateKey) {
  const event = filteredEvents().find((item) => item.date === dateKey);
  if (event) openEventDialog(event);
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
  chip.title = "Apri dettaglio contenuto";
  chip.addEventListener("click", () => openContentDetailDialog(post));
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
    const checklist = document.createElement("small");
    checklist.textContent = checklistStageLabel(post);
    chip.append(checklist);
  }
  return chip;
}

function openDayDialog(dateKey) {
  const date = parseDateKey(dateKey);
  const dayPosts = filteredPosts()
    .filter((post) => post.date === dateKey)
    .sort(sortPosts);
  dayDialogTitle.textContent = formatFullDate(date);
  addDayDialogPost.dataset.date = dateKey;
  renderDayDialogSummary(dayPosts);
  renderDayDialogList(dayPosts);
  if (!dayDialog.open) dayDialog.showModal();
}

function closeDayDialog() {
  dayDialog.close();
}

function openEventDialog(event) {
  selectedEvent = event;
  const category = eventCategories[event.category];
  eventDialogCategory.textContent = `${category?.icon || "•"} ${category?.label || "Evento"}`;
  eventDialogTitle.textContent = event.title;
  eventDialogMeta.innerHTML = "";
  [
    formatFullDate(parseDateKey(event.date)),
    event.scope === "italia" ? "Italia" : "Internazionale",
    `Importanza ${event.importance}`,
  ].forEach((value) => {
    const item = document.createElement("span");
    item.textContent = value;
    eventDialogMeta.append(item);
  });
  eventDialogDescription.textContent = event.description;
  eventIdeasList.innerHTML = "";
  (event.ideas || []).forEach((idea) => {
    const item = document.createElement("li");
    item.textContent = idea;
    eventIdeasList.append(item);
  });
  eventHashtags.textContent = (event.hashtags || []).join(" ");
  deleteManualEventButton.hidden = !event.manual;
  editManualEventButton.hidden = false;
  editManualEventButton.textContent = event.manual ? "Sblocca modifica" : "Copia e modifica";
  if (!eventDialog.open) eventDialog.showModal();
}

function closeEventDialog() {
  eventDialog.close();
}

function createPostFromSelectedEvent() {
  if (!selectedEvent) return;
  const category = eventCategories[selectedEvent.category];
  closeEventDialog();
  setAppMode("editorial");
  openPostDialog({
    title: selectedEvent.title,
    date: selectedEvent.date,
    platform: "Instagram",
    format: "Post",
    status: "Idea",
    goal: selectedEvent.category === "commerciale" ? "Vendita" : "Educazione",
    theme: themeForEventCategory(selectedEvent.category),
    tags: (selectedEvent.hashtags || []).join(" "),
    copy: [
      `Spunto da ${selectedEvent.title}.`,
      selectedEvent.description,
      "",
      "Idea contenuto:",
      selectedEvent.ideas?.[0] || "Sviluppare un contenuto collegato alla ricorrenza.",
    ].join("\n"),
    notes: `Creato dal calendario eventi. Categoria: ${category?.label || selectedEvent.category}. Importanza: ${selectedEvent.importance}.`,
  });
}

function openManualEventDialog(event = {}) {
  const draft = {
    id: "",
    title: "",
    date: toDateKey(state.visibleDate),
    category: "cultura",
    scope: "italia",
    importance: "media",
    description: "",
    ideas: [],
    hashtags: [],
    ...event,
  };
  manualEventFields.id.value = draft.id || "";
  manualEventFields.title.value = draft.title || "";
  manualEventFields.date.value = draft.date || toDateKey(state.visibleDate);
  manualEventFields.category.value = eventCategories[draft.category] ? draft.category : "cultura";
  manualEventFields.scope.value = draft.scope || "italia";
  manualEventFields.importance.value = draft.importance || "media";
  manualEventFields.description.value = draft.description === "Evento inserito manualmente." ? "" : draft.description || "";
  manualEventFields.ideas.value = (draft.ideas || []).join("\n");
  manualEventFields.hashtags.value = (draft.hashtags || []).join(" ");
  if (!manualEventDialog.open) manualEventDialog.showModal();
  manualEventFields.title.focus();
}

function closeManualEventDialog() {
  manualEventDialog.close();
}

function saveManualEvent(event) {
  event.preventDefault();
  const manualEvent = normalizeManualEvent({
    id: manualEventFields.id.value || createId(),
    title: manualEventFields.title.value.trim(),
    date: manualEventFields.date.value,
    category: manualEventFields.category.value,
    scope: manualEventFields.scope.value,
    importance: manualEventFields.importance.value,
    description: manualEventFields.description.value.trim() || "Evento inserito manualmente.",
    ideas: manualEventFields.ideas.value.split("\n").map((idea) => idea.trim()).filter(Boolean),
    hashtags: manualEventFields.hashtags.value.split(/\s+/).map((tag) => tag.trim()).filter(Boolean),
  });
  if (!manualEvent) return;
  const existingIndex = state.manualEvents.findIndex((item) => item.id === manualEvent.id);
  if (existingIndex >= 0) state.manualEvents[existingIndex] = manualEvent;
  else state.manualEvents.push(manualEvent);
  persistManualEvents();
  state.visibleDate = parseDateKey(manualEvent.date);
  closeManualEventDialog();
  render();
}

function deleteSelectedManualEvent() {
  if (!selectedEvent?.manual) return;
  state.manualEvents = state.manualEvents.filter((event) => event.id !== selectedEvent.id);
  persistManualEvents();
  closeEventDialog();
  selectedEvent = null;
  render();
}

function editSelectedManualEvent() {
  if (!selectedEvent) return;
  const eventToEdit = selectedEvent;
  closeEventDialog();
  openManualEventDialog(eventToEdit.manual ? eventToEdit : { ...eventToEdit, id: "", manual: true });
}

function themeForEventCategory(category) {
  const map = {
    ambiente: "ambiente",
    salute: "salute",
    cultura: "cultura",
    sport: "sport",
    diritti: "persone",
    istituzioni: "cultura",
    commerciale: "lavoro",
    media: "innovazione",
  };
  return resolveThemeId(map[category]);
}

function renderDayDialogSummary(dayPosts) {
  const platformsCount = new Set(dayPosts.map((post) => post.platform)).size;
  const readyCount = dayPosts.filter((post) => ["Revisionato", "Programmato"].includes(getPostWorkStatus(post))).length;
  const themesCount = new Set(dayPosts.map((post) => resolveThemeId(post.theme))).size;
  dayDialogSummary.innerHTML = "";
  [
    ["Contenuti", dayPosts.length],
    ["Piattaforme", platformsCount],
    ["Temi", themesCount],
    ["Pronti", readyCount],
  ].forEach(([label, value]) => {
    const item = document.createElement("div");
    item.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
    dayDialogSummary.append(item);
  });
}

function renderDayDialogList(dayPosts) {
  dayDialogList.innerHTML = "";
  if (!dayPosts.length) {
    const empty = document.createElement("p");
    empty.className = "empty-day";
    empty.textContent = "Nessun contenuto programmato per questa giornata.";
    dayDialogList.append(empty);
    return;
  }
  dayPosts.forEach((post) => {
    const item = document.createElement("article");
    item.className = "day-detail-item";
    item.tabIndex = 0;
    applyPostColor(item, post.color);
    item.addEventListener("click", () => openContentDetailDialog(post));
    item.addEventListener("keydown", (keyboardEvent) => {
      if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
        keyboardEvent.preventDefault();
        openContentDetailDialog(post);
      }
    });

    const theme = getTheme(post.theme);
    const main = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = post.title;
    const meta = document.createElement("p");
    meta.textContent = [
      post.time || "Ora non impostata",
      post.platform,
      getPostWorkStatus(post),
      post.priority || "Media",
      formatThemeLabel(theme),
    ].filter(Boolean).join(" - ");
    main.append(title, meta);

    item.append(main);
    dayDialogList.append(item);
  });
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

function renderAssetLinkRows(links = []) {
  assetLinksList.innerHTML = "";
  const rows = links.length ? links : [{ title: "", url: "" }];
  rows.forEach((link) => addAssetLinkRow(link));
}

function addAssetLinkRow(link = { title: "", url: "" }) {
  const row = document.createElement("div");
  row.className = "asset-link-row";
  row.innerHTML = `
    <input type="text" data-asset-title maxlength="80" placeholder="Titolo link" value="${escapeAttribute(link.title || "")}">
    <input type="url" data-asset-url placeholder="https://..." value="${escapeAttribute(link.url || "")}">
    <button class="ghost-action" type="button" aria-label="Rimuovi link">x</button>
  `;
  row.querySelector("button").addEventListener("click", () => {
    row.remove();
    if (!assetLinksList.children.length) addAssetLinkRow();
  });
  assetLinksList.append(row);
}

function collectAssetLinksFromForm() {
  return Array.from(assetLinksList.querySelectorAll(".asset-link-row")).map((row) => ({
    title: row.querySelector("[data-asset-title]").value.trim(),
    url: row.querySelector("[data-asset-url]").value.trim(),
  })).filter((link) => link.title || link.url);
}

function assetLinksFromLegacy(post) {
  if (Array.isArray(post.assetLinks) && post.assetLinks.length) return post.assetLinks;
  if (post.assetLink || post.assets) return [{ title: post.assets || "Asset", url: post.assetLink || "" }];
  return [];
}

function escapeAttribute(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll("<", "&lt;");
}

function setRichEditorValue(editor, field, value) {
  editor.innerHTML = sanitizeRichHtml(value || "");
  field.value = editor.innerHTML;
}

function syncRichEditorsToFields() {
  fields.copy.value = sanitizeRichHtml(fields.copyEditor.innerHTML).trim();
  fields.notes.value = sanitizeRichHtml(fields.notesEditor.innerHTML).trim();
}

let savedRichSelection = null;

function handleRichToolbarAction(event) {
  const control = event.target.closest("[data-rich-command], [data-rich-action]");
  if (!control) return;
  if (event.type === "click" && control.tagName !== "BUTTON") return;
  if (event.type === "change" && control.tagName === "BUTTON") return;
  event.preventDefault();
  const toolbar = control.closest("[data-rich-toolbar]");
  const editor = document.querySelector(`#${toolbar.dataset.richToolbar}`);
  if (!editor) return;
  restoreRichEditorSelection(editor);
  editor.focus();
  if (control.dataset.richAction === "toggleCase") {
    toggleSelectionCase(editor);
    syncRichEditorsToFields();
    updateCopyCounter();
    return;
  }
  const command = control.dataset.richCommand === "backColor" ? "hiliteColor" : control.dataset.richCommand;
  const value = control.dataset.richValue || (control.type === "color" || control.tagName === "SELECT" ? control.value : null);
  if (control.type === "color") control.closest(".rich-color-tool")?.style.setProperty("--rich-picked-color", control.value);
  document.execCommand(command, false, value);
  syncRichEditorsToFields();
  updateCopyCounter();
}

function rememberRichToolbarSelection(event) {
  if (!event.target.closest("[data-rich-command], [data-rich-action], .rich-color-tool")) return;
  rememberRichEditorSelection();
}

function rememberRichEditorSelection() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;
  const node = selection.anchorNode;
  const editor = node?.nodeType === Node.ELEMENT_NODE ? node.closest?.(".rich-editor") : node?.parentElement?.closest(".rich-editor");
  if (!editor) return;
  savedRichSelection = {
    editorId: editor.id,
    range: selection.getRangeAt(0).cloneRange(),
  };
}

function restoreRichEditorSelection(editor) {
  if (!savedRichSelection || savedRichSelection.editorId !== editor.id) return;
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(savedRichSelection.range);
}

function preserveRichEditorSelection(event) {
  const control = event.target.closest("button[data-rich-command], button[data-rich-action]");
  if (!control) return;
  event.preventDefault();
}

function toggleSelectionCase(editor) {
  const selection = window.getSelection();
  if (!selection.rangeCount || !editor.contains(selection.anchorNode)) return;
  const selectedText = selection.toString();
  if (!selectedText) return;
  const nextText = selectedText === selectedText.toUpperCase() ? selectedText.toLowerCase() : selectedText.toUpperCase();
  document.execCommand("insertText", false, nextText);
}

function sanitizeRichHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = String(html || "");
  template.content.querySelectorAll("script, style, iframe, object, embed").forEach((node) => node.remove());
  template.content.querySelectorAll("*").forEach((node) => {
    Array.from(node.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.toLowerCase();
      if (name.startsWith("on") || value.includes("javascript:")) node.removeAttribute(attribute.name);
    });
  });
  return template.innerHTML;
}

function getPostChipMeta(post) {
  const fieldsToShow = state.settings.visibleFields;
  const theme = getTheme(post.theme);
  return [
    fieldsToShow.time && post.time ? post.time : "",
    fieldsToShow.platform ? formatPlatformLabel(post.platform) : "",
    formatThemeLabel(theme),
    fieldsToShow.priority ? post.priority || "Media" : "",
    fieldsToShow.owner && post.owner ? post.owner : "",
  ].filter(Boolean).join(" - ");
}

function formatPlatformLabel(platform) {
  return `${platformIcons[platform] || "•"} ${platform || "Piattaforma"}`;
}

function formatStatusLabel(status) {
  return status || "Stato";
}

function renderListView() {
  const posts = getSortedListPosts();
  const visibleIds = new Set(posts.map((post) => post.id));
  Array.from(selectedListPosts).forEach((id) => {
    if (!visibleIds.has(id)) selectedListPosts.delete(id);
  });
  listView.innerHTML = "";
  populateBulkThemeSelect();
  updateListSelectionState(posts);

  if (posts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-day";
    empty.textContent = "Nessun contenuto trovato.";
    listView.append(empty);
    return;
  }

  listView.append(createListHeader());
  const grouped = groupListPosts(posts);
  Object.entries(grouped).forEach(([group, groupPosts]) => {
    if (listGroupSelect.value !== "none") {
      const heading = document.createElement("h3");
      heading.className = "list-group-heading";
      heading.textContent = group;
      listView.append(heading);
    }
    groupPosts.forEach((post) => listView.append(createListRow(post)));
  });
}

function createListHeader() {
  const header = document.createElement("div");
  header.className = "list-table-header";
  ["", "Data", "Titolo", "Tema", "Formato", "Stato", "Orario"].forEach((label) => {
    const cell = document.createElement("span");
    cell.textContent = label;
    header.append(cell);
  });
  return header;
}

function createListRow(post) {
  const row = document.createElement("article");
  row.className = "list-item is-table-row";
  row.dataset.platform = post.platform;
  row.dataset.id = post.id;
  row.tabIndex = 0;
  row.classList.toggle("is-incomplete", isIncompletePost(post));
  row.classList.toggle("is-overdue", isOverduePost(post));
  row.classList.toggle("is-selected", selectedListPosts.has(post.id));
  applyPostColor(row, post.color);
  row.addEventListener("click", () => {
    if (suppressListClick) return;
    openContentDetailDialog(post);
  });
  row.addEventListener("keydown", (keyboardEvent) => {
    if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
      keyboardEvent.preventDefault();
      openContentDetailDialog(post);
    }
  });

  const select = document.createElement("label");
  select.className = "list-select";
  select.addEventListener("click", (event) => event.stopPropagation());
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = selectedListPosts.has(post.id);
  checkbox.addEventListener("click", (event) => handleListCheckboxClick(event, post.id, checkbox.checked));
  select.append(checkbox);

  const dateCell = document.createElement("div");
  dateCell.className = "list-date-cell";
  const rowDate = parseDateKey(post.date);
  const dateValue = document.createElement("strong");
  dateValue.className = "list-date-main";
  dateValue.textContent = formatShortDate(rowDate);
  const dateMeta = document.createElement("span");
  dateMeta.className = "list-date-meta";
  dateMeta.textContent = new Intl.DateTimeFormat("it-IT", { weekday: "short" }).format(rowDate);
  dateCell.append(dateValue, dateMeta);

  const main = document.createElement("div");
  main.className = "list-title-cell";
  const title = document.createElement("h3");
  title.textContent = post.title;
  title.title = post.title;
  const meta = document.createElement("p");
  meta.textContent = [post.owner || "Senza responsabile", formatPlatformLabel(post.platform), post.priority || "Media"].filter(Boolean).join(" - ");
  main.append(title, meta);

  const theme = getTheme(post.theme);
  const themeCell = document.createElement("div");
  themeCell.className = "list-pill-cell";
  const themePill = document.createElement("span");
  themePill.className = "list-theme-pill";
  themePill.style.backgroundColor = theme?.color ? `${theme.color}16` : "var(--surface-soft)";
  themePill.style.color = theme?.color || "var(--ink)";
  themePill.textContent = theme ? formatThemeLabel(theme) : "Tema";
  themeCell.append(themePill);

  const formatCell = document.createElement("div");
  formatCell.className = "list-muted-cell";
  formatCell.textContent = post.format || "-";

  const statusCell = document.createElement("div");
  statusCell.className = "list-pill-cell";
  const statusPill = document.createElement("span");
  const workStatus = getPostWorkStatus(post);
  statusPill.className = "list-status-pill";
  statusPill.dataset.status = workStatus;
  statusPill.textContent = formatStatusLabel(workStatus);
  statusCell.append(statusPill);

  const timeCell = document.createElement("div");
  timeCell.className = "list-muted-cell";
  timeCell.textContent = post.time || "-";

  row.append(select, dateCell, main, themeCell, formatCell, statusCell, timeCell);
  return row;
}

function openContentDetailDialog(post) {
  selectedContentDetail = post;
  const theme = getTheme(post.theme);
  contentDetailTitle.textContent = post.title || "Contenuto senza titolo";
  contentDetailGrid.innerHTML = "";
  [
    ["Data pubblicazione", formatShortDate(parseDateKey(post.date))],
    ["Orario", post.time || "-"],
    ["Piattaforma", formatPlatformLabel(post.platform)],
    ["Categoria", post.format || "-"],
    ["Stato", formatStatusLabel(getPostWorkStatus(post))],
    ["Responsabile", post.owner || "Senza responsabile"],
    ["Priorità", post.priority || "Media"],
    ["Tema", [formatThemeLabel(theme), post.themeOther || ""].filter(Boolean).join(" - ") || "-"],
    ["Obiettivo", post.goal || "-"],
  ].forEach(([label, value]) => {
    const item = document.createElement("div");
    item.className = "content-detail-field";
    const labelNode = document.createElement("span");
    labelNode.textContent = label;
    const valueNode = document.createElement("strong");
    valueNode.textContent = value;
    item.append(labelNode, valueNode);
    contentDetailGrid.append(item);
  });
  contentDetailCopy.innerHTML = sanitizeRichHtml(post.copy) || "Nessuno script inserito.";
  contentDetailNotes.innerHTML = sanitizeRichHtml(post.notes) || "Nessuna nota interna.";
  renderCommentsList(contentDetailComments, post.comments || [], { emptyText: "Nessun commento interno." });
  if (!contentDetailDialog.open) contentDetailDialog.showModal();
}

function closeContentDetailDialog() {
  contentDetailDialog.close();
}

function unlockSelectedContentEdit() {
  if (!selectedContentDetail) return;
  closeContentDetailDialog();
  openPostDialog(selectedContentDetail);
}

function getSortedListPosts() {
  const sortKey = listSortSelect.value;
  return getMonthPosts(filteredPosts(), state.visibleDate).sort((a, b) => {
    if (sortKey === "date") return `${a.date}${a.time || ""}`.localeCompare(`${b.date}${b.time || ""}`);
    if (sortKey === "platform") return `${a.platform}${a.date}`.localeCompare(`${b.platform}${b.date}`);
    if (sortKey === "status") return `${getPostWorkStatus(a)}${a.date}`.localeCompare(`${getPostWorkStatus(b)}${b.date}`);
    if (sortKey === "priority") return `${priorityRank(a.priority)}${a.date}`.localeCompare(`${priorityRank(b.priority)}${b.date}`);
    if (sortKey === "owner") return `${a.owner || "zzzz"}${a.date}`.localeCompare(`${b.owner || "zzzz"}${b.date}`);
    return 0;
  });
}

function groupListPosts(posts) {
  const group = listGroupSelect.value;
  if (group === "none") return { "": posts };
  return posts.reduce((groups, post) => {
    const key = getListGroupLabel(post, group);
    groups[key] = groups[key] || [];
    groups[key].push(post);
    return groups;
  }, {});
}

function getListGroupLabel(post, group) {
  if (group === "week") return formatWeekRange(startOfWeek(parseDateKey(post.date)));
  if (group === "platform") return post.platform;
  if (group === "status") return getPostWorkStatus(post);
  if (group === "theme") return getTheme(post.theme)?.name || "Senza tema";
  return "";
}

function priorityRank(priority) {
  return { Alta: 0, Media: 1, Bassa: 2 }[priority] ?? 3;
}

function isIncompletePost(post) {
  return !post.assets || !post.copy || !post.owner;
}

function isOverduePost(post) {
  return parseDateKey(post.date) < startOfDay(new Date()) && getPostWorkStatus(post) !== "Programmato";
}

function toggleSelectAllList() {
  const posts = getSortedListPosts();
  if (selectAllList.checked) posts.forEach((post) => selectedListPosts.add(post.id));
  else posts.forEach((post) => selectedListPosts.delete(post.id));
  renderListView();
}

function updateListSelectionState(posts) {
  const selectedVisible = posts.filter((post) => selectedListPosts.has(post.id)).length;
  const totalSelected = selectedListPosts.size;
  selectedListCount.textContent = `${selectedVisible} selezionati`;
  listBulkActionSummary.textContent = `${totalSelected} contenut${totalSelected === 1 ? "o" : "i"} selezionat${totalSelected === 1 ? "o" : "i"}`;
  listBulkActionBar.hidden = totalSelected === 0 || state.appMode !== "editorial" || state.viewMode !== "list";
  selectAllList.checked = posts.length > 0 && selectedVisible === posts.length;
  selectAllList.indeterminate = selectedVisible > 0 && selectedVisible < posts.length;
  if (totalSelected === 0) closeListBulkMenu();
}

function populateBulkThemeSelect() {
  const currentValue = bulkThemeSelect.value;
  bulkThemeSelect.innerHTML = "";
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "Tema";
  bulkThemeSelect.append(empty);
  state.settings.themes.forEach((theme) => {
    const option = document.createElement("option");
    option.value = theme.id;
    option.textContent = formatThemeLabel(theme);
    bulkThemeSelect.append(option);
  });
  bulkThemeSelect.value = state.settings.themes.some((theme) => theme.id === currentValue) ? currentValue : "";
}

function applyBulkAction() {
  const ids = Array.from(selectedListPosts);
  if (!ids.length) return;
  const status = bulkStatusSelect.value;
  const owner = bulkOwnerInput.value.trim();
  const theme = bulkThemeSelect.value;
  state.posts = state.posts.map((post) => {
    if (!ids.includes(post.id)) return post;
    return normalizePost({
      ...post,
      status: status || post.status,
      checklist: status ? checklistForWorkStatus(status, post.checklist) : post.checklist,
      owner: owner || post.owner,
      theme: theme || post.theme,
      history: [...(post.history || []), historyEntry("Modifica massiva da vista lista")],
    });
  });
  persistPosts(cloudActive());
  bulkStatusSelect.value = "";
  bulkOwnerInput.value = "";
  bulkThemeSelect.value = "";
  selectedListPosts.clear();
  render();
}

function updateSelectedListPosts(updater, historyText) {
  const ids = Array.from(selectedListPosts);
  if (!ids.length) return [];
  const changedPosts = [];
  state.posts = state.posts.map((post) => {
    if (!ids.includes(post.id)) return post;
    const updated = normalizePost({
      ...post,
      ...updater(post),
      history: [...(post.history || []), historyEntry(historyText)],
    });
    changedPosts.push(updated);
    return updated;
  });
  persistPosts();
  changedPosts.forEach(saveCloudPost);
  selectedListPosts.clear();
  closeListBulkMenu();
  render();
  return changedPosts;
}

function deleteSelectedListPosts() {
  const ids = Array.from(selectedListPosts);
  if (!ids.length) return;
  const now = new Date().toISOString();
  state.posts = state.posts.map((post) => {
    if (!ids.includes(post.id)) return post;
    return normalizePost({
      ...post,
      deletedAt: now,
      deletedBy: cloud.user?.uid || "local",
      history: [...(post.history || []), historyEntry("Eliminazione massiva da vista lista")],
    });
  });
  persistPosts();
  ids.forEach((id) => {
    const post = state.posts.find((item) => item.id === id);
    if (post) saveCloudPost(post);
  });
  showUndo(`${ids.length} contenuti spostati nel cestino.`, () => {
    state.posts = state.posts.map((post) => {
      if (!ids.includes(post.id)) return post;
      return normalizePost({
        ...post,
        deletedAt: "",
        deletedBy: "",
        history: [...(post.history || []), historyEntry("Eliminazione massiva annullata")],
      });
    });
    persistPosts();
    ids.forEach((id) => {
      const post = state.posts.find((item) => item.id === id);
      if (post) saveCloudPost(post);
    });
    render();
  });
  selectedListPosts.clear();
  closeListBulkMenu();
  render();
}

function setSelectedListStatus(status) {
  updateSelectedListPosts(
    (post) => ({ status, checklist: checklistForWorkStatus(status, post.checklist) }),
    `Stato impostato a ${status} da selezione multipla`,
  );
}

function setSelectedListPriority(priority) {
  updateSelectedListPosts(
    () => ({ priority }),
    `Priorita impostata a ${priority} da selezione multipla`,
  );
}

function promptSelectedListOwner() {
  const owner = window.prompt("Responsabile da assegnare ai contenuti selezionati:");
  if (owner === null) return;
  updateSelectedListPosts(
    () => ({ owner: owner.trim() }),
    "Responsabile modificato da selezione multipla",
  );
}

function promptSelectedListDate() {
  const date = window.prompt("Nuova data di pubblicazione (AAAA-MM-GG):");
  if (date === null) return;
  const parsedDate = parseDateKey(date);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsedDate.getTime()) || toDateKey(parsedDate) !== date) {
    window.alert("Inserisci una data valida nel formato AAAA-MM-GG.");
    return;
  }
  updateSelectedListPosts(
    () => ({ date }),
    `Spostato al ${date} da selezione multipla`,
  );
}

function duplicateSelectedListPosts() {
  const ids = Array.from(selectedListPosts);
  if (!ids.length) return;
  const copies = activePosts()
    .filter((post) => ids.includes(post.id))
    .map((post) => normalizePost({
      ...post,
      id: createId(),
      title: `${post.title} copia`,
      status: "Idea",
      checklist: checklistForWorkStatus("Idea", post.checklist),
      comments: [],
      history: [historyEntry("Duplicato da selezione multipla")],
    }));
  state.posts.push(...copies);
  persistPosts();
  copies.forEach(saveCloudPost);
  selectedListPosts.clear();
  closeListBulkMenu();
  showUndo(`${copies.length} contenuti duplicati.`, () => {
    copies.forEach((post) => permanentlyDeletePost(post.id));
    render();
  });
  render();
}

function exportSelectedListPosts() {
  const ids = Array.from(selectedListPosts);
  if (!ids.length) return;
  const posts = getSortedListPosts().filter((post) => ids.includes(post.id));
  downloadPostsCsv(posts, "contenuti-social-selezionati.csv");
  closeListBulkMenu();
}

function selectVisibleListPosts() {
  getSortedListPosts().forEach((post) => selectedListPosts.add(post.id));
  closeListBulkMenu();
  renderListView();
}

function clearListSelection() {
  selectedListPosts.clear();
  lastSelectedListPostId = null;
  closeListBulkMenu();
  renderListView();
}

function handleListCheckboxClick(event, postId, checked) {
  event.stopPropagation();
  if (event.shiftKey && lastSelectedListPostId) {
    selectListRange(lastSelectedListPostId, postId, checked);
  } else if (checked) {
    selectedListPosts.add(postId);
  } else {
    selectedListPosts.delete(postId);
  }
  lastSelectedListPostId = postId;
  renderListCheckboxes();
  updateListSelectionState(getSortedListPosts());
}

function selectListRange(fromId, toId, shouldSelect) {
  const ids = getVisibleListPostIds();
  const fromIndex = ids.indexOf(fromId);
  const toIndex = ids.indexOf(toId);
  if (fromIndex === -1 || toIndex === -1) {
    if (shouldSelect) selectedListPosts.add(toId);
    else selectedListPosts.delete(toId);
    return;
  }
  const start = Math.min(fromIndex, toIndex);
  const end = Math.max(fromIndex, toIndex);
  ids.slice(start, end + 1).forEach((id) => {
    if (shouldSelect) selectedListPosts.add(id);
    else selectedListPosts.delete(id);
  });
}

function getVisibleListPostIds() {
  return Array.from(listView.querySelectorAll(".list-item.is-table-row[data-id]")).map((row) => row.dataset.id);
}

function openListContextMenuFromRow(event) {
  if (state.appMode !== "editorial" || state.viewMode !== "list") return;
  const row = event.target.closest(".list-item.is-table-row[data-id]");
  if (!row) return;
  event.preventDefault();
  if (!selectedListPosts.has(row.dataset.id)) {
    selectedListPosts.clear();
    selectedListPosts.add(row.dataset.id);
    renderListCheckboxes();
    updateListSelectionState(getSortedListPosts());
  }
  openListBulkMenuAt(event.clientX, event.clientY);
}

function openListBulkMenuFromElement(element) {
  const rect = element.getBoundingClientRect();
  openListBulkMenuAt(rect.left, rect.bottom + 8);
}

function openListBulkMenuAt(x, y) {
  if (!selectedListPosts.size) return;
  listBulkContextMenu.hidden = false;
  listBulkContextMenu.style.maxHeight = `${Math.max(280, window.innerHeight - 48)}px`;
  const menuRect = listBulkContextMenu.getBoundingClientRect();
  const viewportGap = 24;
  const left = Math.min(x, window.innerWidth - menuRect.width - viewportGap);
  const top = Math.min(y, window.innerHeight - menuRect.height - viewportGap);
  Object.assign(listBulkContextMenu.style, {
    left: `${Math.max(viewportGap, left)}px`,
    top: `${Math.max(viewportGap, top)}px`,
  });
}

function closeListBulkMenu() {
  listBulkContextMenu.hidden = true;
}

function handleListBulkMenuAction(event) {
  const action = event.target.closest("[data-bulk-menu-action]")?.dataset.bulkMenuAction;
  if (!action) return;
  if (action.startsWith("status:")) setSelectedListStatus(action.slice("status:".length));
  if (action.startsWith("priority:")) setSelectedListPriority(action.slice("priority:".length));
  if (action === "owner") promptSelectedListOwner();
  if (action === "date") promptSelectedListDate();
  if (action === "duplicate") duplicateSelectedListPosts();
  if (action === "export") exportSelectedListPosts();
  if (action === "select-visible") selectVisibleListPosts();
  if (action === "clear") clearListSelection();
  if (action === "delete") deleteSelectedListPosts();
}

function startListSelectionDrag(event) {
  if (state.appMode !== "editorial" || state.viewMode !== "list" || event.button !== 0) return;
  if (event.target.closest("button, input, select, textarea, label, .list-table-header")) return;
  closeListBulkMenu();
  const mode = event.altKey ? "remove" : event.metaKey || event.ctrlKey || event.shiftKey ? "add" : "replace";
  const startX = event.clientX;
  const startY = event.clientY;
  listSelectionDrag = {
    startX,
    startY,
    box: document.createElement("div"),
    active: false,
    mode,
    initialSelection: new Set(selectedListPosts),
  };
  listSelectionDrag.box.className = "selection-box";
  listSelectionDrag.box.dataset.mode = mode;
  document.body.append(listSelectionDrag.box);
  document.body.classList.add("is-list-selecting");
  window.addEventListener("pointermove", updateListSelectionDrag);
  window.addEventListener("pointerup", finishListSelectionDrag, { once: true });
}

function updateListSelectionDrag(event) {
  if (!listSelectionDrag) return;
  event.preventDefault();
  const left = Math.min(listSelectionDrag.startX, event.clientX);
  const top = Math.min(listSelectionDrag.startY, event.clientY);
  const width = Math.abs(event.clientX - listSelectionDrag.startX);
  const height = Math.abs(event.clientY - listSelectionDrag.startY);
  if (width > 4 || height > 4) listSelectionDrag.active = true;
  Object.assign(listSelectionDrag.box.style, {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
  });
  if (!listSelectionDrag.active) return;
  const selectionRect = listSelectionDrag.box.getBoundingClientRect();
  const intersectingIds = new Set();
  listView.querySelectorAll(".list-item.is-table-row[data-id]").forEach((row) => {
    const id = row.dataset.id;
    if (!id) return;
    if (rectsIntersect(selectionRect, row.getBoundingClientRect())) intersectingIds.add(id);
  });
  applyDragSelection(intersectingIds);
  renderListCheckboxes();
  updateListSelectionState(getSortedListPosts());
}

function applyDragSelection(intersectingIds) {
  if (!listSelectionDrag) return;
  selectedListPosts.clear();
  listSelectionDrag.initialSelection.forEach((id) => selectedListPosts.add(id));

  if (listSelectionDrag.mode === "replace") {
    selectedListPosts.clear();
    intersectingIds.forEach((id) => selectedListPosts.add(id));
    return;
  }

  if (listSelectionDrag.mode === "remove") {
    intersectingIds.forEach((id) => selectedListPosts.delete(id));
    return;
  }

  intersectingIds.forEach((id) => selectedListPosts.add(id));
}

function finishListSelectionDrag() {
  if (!listSelectionDrag) return;
  suppressListClick = listSelectionDrag.active;
  listSelectionDrag.box.remove();
  listSelectionDrag = null;
  document.body.classList.remove("is-list-selecting");
  window.removeEventListener("pointermove", updateListSelectionDrag);
  if (suppressListClick) setTimeout(() => { suppressListClick = false; }, 0);
}

function rectsIntersect(a, b) {
  return a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top;
}

function renderListCheckboxes() {
  listView.querySelectorAll(".list-item.is-table-row[data-id]").forEach((row) => {
    const checkbox = row.querySelector("input[type='checkbox']");
    if (checkbox) checkbox.checked = selectedListPosts.has(row.dataset.id);
    row.classList.toggle("is-selected", selectedListPosts.has(row.dataset.id));
  });
}

function renderStats() {
  const monthPosts = getMonthPosts(state.posts);
  document.querySelector("#monthCount").textContent = monthPosts.length;
  document.querySelector("#readyCount").textContent = monthPosts.filter((post) => ["Revisionato", "Programmato"].includes(getPostWorkStatus(post))).length;
  document.querySelector("#publishedCount").textContent = monthPosts.filter((post) => getPostWorkStatus(post) === "Programmato").length;
}

function renderPlatformStats() {
  const monthPosts = getMonthPosts(state.posts);
  const container = document.querySelector("#platformStats");
  container.innerHTML = "";
  platforms.forEach((platform) => {
    const count = monthPosts.filter((post) => post.platform === platform).length;
    const item = document.createElement("div");
    item.innerHTML = `<span>${formatPlatformLabel(platform)}</span><strong>${count}/${state.settings.monthlyTargets[platform]}</strong>`;
    container.append(item);
  });
}

function renderStatsDialog() {
  const monthPosts = getMonthPosts(state.posts, statsVisibleDate);
  statsPeriodTitle.textContent = formatMonthLabel(statsVisibleDate);
  statsPeriodInput.value = toMonthInput(statsVisibleDate);
  renderStatsSummary(monthPosts);
  renderStatsDistributionBars(statsPlatformBars, getPlatformStats(monthPosts), "target");
  renderStatsDistributionBars(statsStatusBars, getStatusStats(monthPosts), "count");
  renderThemeDistribution(monthPosts);
  renderStatsInsights(monthPosts);
}

function renderStatsSummary(posts) {
  const ready = posts.filter((post) => ["Revisionato", "Programmato"].includes(getPostWorkStatus(post))).length;
  const published = posts.filter((post) => getPostWorkStatus(post) === "Programmato").length;
  const missingAssets = posts.filter((post) => !post.assets && !post.assetLink).length;
  const completion = posts.length ? Math.round((posts.reduce((sum, post) => sum + checklistProgress(post), 0) / posts.length)) : 0;
  statsSummaryGrid.innerHTML = "";
  [
    ["Contenuti", posts.length],
    ["Pronti/programmati", ready],
    ["Pubblicati", published],
    ["Checklist media", `${completion}%`],
    ["Senza asset", missingAssets],
    ["Giorni attivi", new Set(posts.map((post) => post.date)).size],
  ].forEach(([label, value]) => {
    const item = document.createElement("div");
    item.className = "stats-summary-item";
    item.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
    statsSummaryGrid.append(item);
  });
}

function getPlatformStats(posts) {
  return platforms.map((platform) => {
    const count = posts.filter((post) => post.platform === platform).length;
    const target = Number(state.settings.monthlyTargets[platform]) || 0;
    return {
      label: platform,
      count,
      target,
      percentage: target ? Math.min(100, Math.round((count / target) * 100)) : 0,
    };
  });
}

function getStatusStats(posts) {
  const statuses = ["Idea", "Script", "Grafica", "Revisionato", "Programmato"];
  const total = posts.length || 0;
  return statuses.map((status) => {
    const count = posts.filter((post) => checklistStageLabel(post) === status).length;
    return {
      label: status,
      count,
      target: total,
      percentage: total ? Math.round((count / total) * 100) : 0,
    };
  });
}

function renderStatsDistributionBars(container, items, mode) {
  container.innerHTML = "";
  if (!items.some((item) => item.count > 0 || item.target > 0)) {
    const empty = document.createElement("p");
    empty.className = "empty-day";
    empty.textContent = "Nessun dato disponibile.";
    container.append(empty);
    return;
  }
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "stats-bar-row";
    const value = mode === "target" ? `${item.count}/${item.target}` : `${item.count}`;
    row.innerHTML = `
      <span>${item.label}</span>
      <span class="stats-meter"><span style="width: ${item.percentage}%"></span></span>
      <strong>${value}</strong>
    `;
    container.append(row);
  });
}

function renderThemeDistribution(monthPosts = getMonthPosts(state.posts, statsDialog.open ? statsVisibleDate : state.visibleDate)) {
  const total = monthPosts.length || 0;
  const themes = getThemesForDistribution(monthPosts);
  const distribution = themes.map((theme) => {
    const count = monthPosts.filter((post) => getPostThemeKey(post) === theme.id).length;
    return {
      ...theme,
      count,
      percentage: total ? Math.round((count / total) * 100) : 0,
    };
  });

  themeBars.innerHTML = "";

  if (!total) {
    const empty = document.createElement("p");
    empty.className = "empty-day";
    empty.textContent = "Nessun contenuto nel mese selezionato.";
    themeBars.append(empty);
    return;
  }

  distribution.forEach((theme) => {
    const row = document.createElement("div");
    row.className = "theme-bar-row";
    row.innerHTML = `
      <span class="theme-label">${formatThemeLabel(theme)}</span>
      <span class="theme-meter"><span style="width: ${theme.percentage}%; background-color: ${theme.color}"></span></span>
      <strong>${theme.percentage}%</strong>
    `;
    row.querySelector(".theme-label").title = theme.name;
    themeBars.append(row);
  });
}

function getThemesForDistribution(posts) {
  const themes = [...state.settings.themes];
  posts.forEach((post) => {
    if (!post.themeOther) return;
    const id = `custom-${slugify(post.themeOther) || "tema"}`;
    if (themes.some((theme) => theme.id === id || theme.name.toLowerCase() === post.themeOther.toLowerCase())) return;
    themes.push({
      id,
      icon: "",
      name: post.themeOther,
      color: isValidColor(post.color) ? post.color : defaultThemes[themes.length % defaultThemes.length].color,
      custom: true,
    });
  });
  return themes;
}

function getPostThemeKey(post) {
  if (post.themeOther) {
    const existing = state.settings.themes.find((theme) => theme.name.toLowerCase() === post.themeOther.toLowerCase());
    return existing ? existing.id : `custom-${slugify(post.themeOther) || "tema"}`;
  }
  return resolveThemeId(post.theme);
}

function renderStatsInsights(posts) {
  const insights = [];
  const missingAssets = posts.filter((post) => !post.assets && !post.assetLink);
  const missingOwner = posts.filter((post) => !post.owner);
  const reviewNeeded = posts.filter((post) => post.approval === "Da revisionare");
  const overloadedDays = Object.entries(groupBy(posts, "date"))
    .filter(([, dayPosts]) => dayPosts.length > state.settings.warningRules.maxPostsPerDay);

  if (missingAssets.length) insights.push(`${missingAssets.length} contenuti senza asset o link asset.`);
  if (missingOwner.length) insights.push(`${missingOwner.length} contenuti senza responsabile.`);
  if (reviewNeeded.length) insights.push(`${reviewNeeded.length} contenuti da revisionare.`);
  overloadedDays.forEach(([date, dayPosts]) => {
    insights.push(`${formatShortDate(parseDateKey(date))}: ${dayPosts.length} contenuti nello stesso giorno.`);
  });
  getPlatformStats(posts).forEach((item) => {
    if (item.target && item.count < item.target) insights.push(`${item.label}: mancano ${item.target - item.count} contenuti per il target mensile.`);
  });

  const visibleInsights = insights.filter((insight) => !dismissedStatsInsights.has(insight));

  statsInsights.innerHTML = "";
  if (!visibleInsights.length) {
    const ok = document.createElement("p");
    ok.textContent = "Nessuna criticità rilevante per il mese selezionato.";
    statsInsights.append(ok);
    return;
  }
  visibleInsights.slice(0, 10).forEach((insight) => {
    const item = document.createElement("p");
    const text = document.createElement("span");
    text.textContent = insight;
    const dismiss = document.createElement("button");
    dismiss.className = "insight-dismiss";
    dismiss.type = "button";
    dismiss.setAttribute("aria-label", "Elimina avviso");
    dismiss.textContent = "x";
    dismiss.addEventListener("click", () => {
      dismissedStatsInsights.add(insight);
      renderStatsInsights(posts);
    });
    item.append(text, dismiss);
    statsInsights.append(item);
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

function openFiltersPanel() {
  const filtersPanel = document.querySelector(".sidebar .collapsible-panel");
  if (document.body.classList.contains("is-sidebar-collapsed")) reopenSidebar();
  if (filtersPanel) {
    filtersPanel.open = true;
    filtersPanel.scrollIntoView({ block: "start", behavior: "smooth" });
  }
}

function updateFilterToolbar() {
  const count = getActiveFilterCount();
  filterBadge.textContent = String(count);
  filterBadge.hidden = count === 0;
  resetFiltersButton.hidden = count === 0;
  filterToolbarButton.classList.toggle("has-active-filters", count > 0);
}

function getActiveFilterCount() {
  return [
    searchInput.value.trim(),
    platformFilter.value !== "all",
    statusFilter.value !== "all",
    priorityFilter.value !== "all",
    themeFilter.value !== "all",
    ownerFilter.value.trim(),
  ].filter(Boolean).length;
}

function resetFilters() {
  searchInput.value = "";
  platformFilter.value = "all";
  statusFilter.value = "all";
  priorityFilter.value = "all";
  themeFilter.value = "all";
  ownerFilter.value = "";
  render();
}

function filteredEvents() {
  const query = eventSearchInput.value.trim().toLowerCase();
  const category = eventCategoryFilter.value;
  const scope = eventScopeFilter.value;
  const importance = eventImportanceFilter.value;
  const range = getEventVisibleRange();
  return getVisibleEvents()
    .filter((event) => {
      const eventDate = parseDateKey(event.date);
      const categoryLabel = eventCategories[event.category]?.label || "";
      const searchable = [
        event.title,
        event.description,
        categoryLabel,
        event.scope,
        event.importance,
        ...(event.ideas || []),
        ...(event.hashtags || []),
      ].join(" ").toLowerCase();
      return eventDate >= range.start && eventDate <= range.end
        && (!query || searchable.includes(query))
        && (category === "all" || event.category === category)
        && (scope === "all" || event.scope === scope)
        && (importance === "all" || event.importance === importance);
    });
}

function getVisibleEvents() {
  return [...getEventsForVisibleYears(), ...state.manualEvents]
    .sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
}

function getEventVisibleRange() {
  if (state.viewMode === "week") {
    const start = startOfWeek(state.visibleDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  }
  if (state.viewMode === "day") {
    const start = new Date(state.visibleDate.getFullYear(), state.visibleDate.getMonth(), state.visibleDate.getDate());
    return { start, end: new Date(start) };
  }
  const start = new Date(state.visibleDate.getFullYear(), state.visibleDate.getMonth(), 1);
  const end = new Date(state.visibleDate.getFullYear(), state.visibleDate.getMonth() + 1, 0);
  if (state.viewMode === "month") {
    return {
      start: startOfCalendar(start.getFullYear(), start.getMonth()),
      end: endOfCalendarMonth(start.getFullYear(), start.getMonth()),
    };
  }
  return { start, end };
}

function endOfCalendarMonth(year, month) {
  const lastDay = new Date(year, month + 1, 0);
  const end = new Date(lastDay);
  end.setDate(lastDay.getDate() + (6 - getMondayBasedDay(lastDay)));
  return end;
}

function getEventsForVisibleYears() {
  const years = new Set();
  const start = getCalendarStartDate();
  const days = Math.max(getDaysToRender(), 31);
  for (let index = 0; index < days; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    years.add(date.getFullYear());
  }
  years.add(state.visibleDate.getFullYear());
  return Array.from(years).flatMap(buildEventsForYear).sort((a, b) => a.date.localeCompare(b.date));
}

function buildEventsForYear(year) {
  return eventDefinitions.filter((definition) => !definition.year || definition.year === year).map((definition) => {
    const date = getEventDate(definition, year);
    return {
      ...definition,
      date: toDateKey(date),
      year,
    };
  });
}

function getEventDate(definition, year) {
  if (definition.rule === "second-sunday-may") return nthWeekdayOfMonth(year, 4, 0, 2);
  if (definition.rule === "second-sunday-july") return nthWeekdayOfMonth(year, 6, 0, 2);
  if (definition.rule === "black-friday") return nthWeekdayOfMonth(year, 10, 5, 4);
  return new Date(year, definition.month - 1, definition.day);
}

function nthWeekdayOfMonth(year, monthIndex, weekday, occurrence) {
  const date = new Date(year, monthIndex, 1);
  const offset = (weekday - date.getDay() + 7) % 7;
  date.setDate(1 + offset + ((occurrence - 1) * 7));
  return date;
}

function filteredPosts() {
  const query = searchInput.value.trim().toLowerCase();
  const owner = ownerFilter.value.trim().toLowerCase();
  return activePosts().filter((post) => {
    const theme = getTheme(post.theme);
    const searchable = [
      post.title,
      post.platform,
      getPostWorkStatus(post),
      post.format,
      post.goal,
      theme?.name || "",
      post.owner,
      post.tags,
      post.assets,
      post.copy,
      post.notes,
    ].join(" ").toLowerCase();
    return (!query || searchable.includes(query))
      && (platformFilter.value === "all" || post.platform === platformFilter.value)
      && (statusFilter.value === "all" || getPostWorkStatus(post) === statusFilter.value)
      && (priorityFilter.value === "all" || post.priority === priorityFilter.value)
      && (themeFilter.value === "all" || resolveThemeId(post.theme) === themeFilter.value)
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
  fields.status.value = getPostWorkStatus(normalized);
  fields.approval.value = normalized.approval || "Bozza";
  fields.priority.value = normalized.priority || "Media";
  setSelectedColor(normalized.color || pastelColors[0].value);
  fields.owner.value = normalized.owner || "";
  const hasKnownGoal = !normalized.goal || state.settings.goals.includes(normalized.goal);
  fields.goal.value = hasKnownGoal ? normalized.goal || "" : "__other";
  fields.goalOther.value = hasKnownGoal ? "" : normalized.goal || "";
  const hasKnownTheme = !normalized.theme || state.settings.themes.some((theme) => theme.id === normalized.theme);
  fields.theme.value = normalized.themeOther || !hasKnownTheme ? "__other" : normalized.theme || "";
  fields.themeOther.value = normalized.themeOther || "";
  fields.tags.value = normalized.tags || "";
  fields.assetLink.value = normalized.assetLink || "";
  fields.assets.value = normalized.assets || "";
  renderAssetLinkRows(normalized.assetLinks?.length ? normalized.assetLinks : assetLinksFromLegacy(normalized));
  setRichEditorValue(fields.copyEditor, fields.copy, normalized.copy || "");
  setRichEditorValue(fields.notesEditor, fields.notes, normalized.notes || "");
  editingComments = [...(normalized.comments || [])];
  fields.commentDraft.value = "";
  closeMentionSuggestions();
  renderCommentsList(postCommentsList, editingComments, { emptyText: "Nessun commento interno." });
  fields.recurrence.value = normalized.recurrence || "none";
  fields.checkIdea.checked = Boolean(normalized.checklist.idea);
  fields.checkCopy.checked = Boolean(normalized.checklist.copy);
  fields.checkCreative.checked = Boolean(normalized.checklist.creative);
  fields.checkReview.checked = Boolean(normalized.checklist.review);
  fields.checkScheduled.checked = Boolean(normalized.checklist.scheduled);
  validateChecklistSelection();
  updateOtherFieldVisibility();
  renderHistory(normalized.history);
  updateCopyCounter();

  postDialog.showModal();
  fields.title.focus();
}

function updateCopyCounter() {
  syncRichEditorsToFields();
  const count = fields.copyEditor.textContent.trim().length;
  copyCounter.textContent = `${count} ${count === 1 ? "carattere" : "caratteri"}`;
}

function renderHistory(history) {
  historyBox.hidden = !history.length;
  historyBox.open = false;
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
  themesSetting.value = themesToText(state.settings.themes);
  renderThemeEditor(state.settings.themes);
  templatesSetting.value = templatesToText(state.settings.templates, state.settings.themes);
  setSettingsTab("general");
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
  const themes = collectThemesFromEditor();
  themesSetting.value = themesToText(themes);

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
    themes,
    templates: parseTemplates(templatesSetting.value, themes),
  });
  normalizePostThemes();
  state.viewMode = state.settings.defaultView;
  persistSettings();
  persistPosts(cloudActive());
  applySettings();
  closeSettingsDialog();
  render();
}

function setSettingsTab(tab) {
  document.querySelectorAll("[data-settings-tab-button]").forEach((button) => {
    const active = button.dataset.settingsTabButton === tab;
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-settings-tab]").forEach((section) => {
    section.hidden = section.dataset.settingsTab !== tab;
  });
}

function renderThemeEditor(themes) {
  themeEditor.innerHTML = "";
  normalizeThemes(themes).forEach((theme) => {
    themeEditor.append(createThemeEditorRow(theme));
  });
}

function createThemeEditorRow(theme = {}) {
  const row = document.createElement("div");
  row.className = "theme-editor-row";
  row.dataset.themeId = theme.id || "";

  const icon = document.createElement("input");
  icon.type = "text";
  icon.maxLength = 4;
  icon.value = normalizeThemeIcon(theme.icon);
  icon.setAttribute("aria-label", "Icona tema");

  const name = document.createElement("input");
  name.type = "text";
  name.maxLength = 40;
  name.value = theme.name || "";
  name.placeholder = "Nome tema";
  name.required = true;
  name.setAttribute("aria-label", "Nome tema");

  const color = document.createElement("input");
  color.type = "color";
  color.value = isValidColor(theme.color) ? theme.color : defaultThemes[0].color;
  color.setAttribute("aria-label", "Colore tema");

  const remove = document.createElement("button");
  remove.className = "danger-action";
  remove.type = "button";
  remove.textContent = "Rimuovi";
  remove.addEventListener("click", () => {
    if (themeEditor.querySelectorAll(".theme-editor-row").length <= 1) return;
    row.remove();
  });

  row.append(icon, name, color, remove);
  return row;
}

function addThemeSettingRow() {
  themeEditor.append(createThemeEditorRow({
    id: "",
    icon: "",
    name: "Nuovo tema",
    color: defaultThemes[themeEditor.querySelectorAll(".theme-editor-row").length % defaultThemes.length].color,
  }));
}

function collectThemesFromEditor() {
  const themes = Array.from(themeEditor.querySelectorAll(".theme-editor-row")).map((row, index) => {
    const [icon, name, color] = row.querySelectorAll("input");
    const themeName = name.value.trim();
    if (!themeName) return null;
    return {
      id: row.dataset.themeId || slugify(themeName) || `tema-${index + 1}`,
      icon: normalizeThemeIcon(icon.value),
      name: themeName,
      color: isValidColor(color.value) ? color.value : defaultThemes[index % defaultThemes.length].color,
    };
  }).filter(Boolean);
  return normalizeThemes(themes);
}

function resetSettings() {
  state.settings = getDefaultSettings();
  normalizePostThemes();
  state.viewMode = state.settings.defaultView;
  persistSettings();
  persistPosts(cloudActive());
  applySettings();
  openSettingsDialog();
  render();
}

function normalizePostThemes() {
  const validThemeIds = state.settings.themes.map((theme) => theme.id);
  state.posts = state.posts.map((post) => (
    !post.theme || validThemeIds.includes(post.theme) ? post : { ...post, theme: "" }
  ));
}

function savePost(event) {
  event.preventDefault();
  if (!validateChecklistSelection()) {
    fields.checkIdea.reportValidity();
    return;
  }
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
  syncRichEditorsToFields();
  const assetLinks = collectAssetLinksFromForm();
  const themeData = resolveThemeFromForm();
  const checklist = {
    idea: fields.checkIdea.checked,
    copy: fields.checkCopy.checked,
    creative: fields.checkCreative.checked,
    review: fields.checkReview.checked,
    scheduled: fields.checkScheduled.checked,
  };
  const stage = checklistStageLabel({ checklist });
  const status = stage === "Checklist: nessuno stato" ? "Idea" : stage;
  return normalizePost({
    id: fields.id.value || createId(),
    title: fields.title.value.trim(),
    date: fields.date.value,
    time: fields.time.value,
    platform: fields.platform.value,
    format: fields.format.value.trim(),
    status,
    approval: fields.approval.value,
    priority: fields.priority.value,
    color: fields.color.value,
    owner: fields.owner.value.trim(),
    goal: fields.goal.value === "__other" ? fields.goalOther.value.trim() : fields.goal.value,
    theme: themeData.theme,
    themeOther: themeData.themeOther,
    tags: fields.tags.value.trim(),
    assetLinks,
    assetLink: assetLinks[0]?.url || "",
    assets: assetLinks.map((asset) => asset.title).filter(Boolean).join(", "),
    copy: fields.copy.value.trim(),
    notes: fields.notes.value.trim(),
    comments: editingComments,
    recurrence: fields.recurrence.value,
    checklist,
  });
}

function validateChecklistSelection() {
  const hasSelection = [fields.checkIdea, fields.checkCopy, fields.checkCreative, fields.checkReview, fields.checkScheduled]
    .some((input) => input.checked);
  fields.checkIdea.setCustomValidity(hasSelection ? "" : "Seleziona almeno uno stato della checklist.");
  return hasSelection;
}

function sendCommentFromComposer() {
  const draft = fields.commentDraft.value.trim();
  if (!draft) return;
  const comment = normalizeComment({
    id: createId(),
    text: draft,
    mentions: extractMentions(draft),
    authorUid: cloud.user?.uid || "",
    authorEmail: cloud.user?.email || "",
    authorName: getCurrentMemberName(),
    createdAt: new Date().toISOString(),
  });
  if (!comment) return;
  editingComments = [...editingComments, comment];
  fields.commentDraft.value = "";
  closeMentionSuggestions();
  renderCommentsList(postCommentsList, editingComments, { emptyText: "Nessun commento interno." });
  saveEditingCommentsIfExisting();
}

function saveEditingCommentsIfExisting() {
  const id = fields.id.value;
  if (!id) return;
  const index = state.posts.findIndex((post) => post.id === id);
  if (index < 0) return;
  state.posts[index] = normalizePost({
    ...state.posts[index],
    comments: editingComments,
    history: [...(state.posts[index].history || []), historyEntry("Commento interno aggiunto")],
  });
  persistPosts();
  saveCloudPost(state.posts[index]);
}

function handleCommentDraftKeydown(event) {
  if (!mentionSuggestions.hidden && ["ArrowDown", "ArrowUp", "Tab"].includes(event.key)) {
    event.preventDefault();
    moveMentionSelection(event.key === "ArrowUp" ? -1 : 1);
    return;
  }
  if (!mentionSuggestions.hidden && event.key === "Enter" && !event.shiftKey) {
    const selected = mentionSuggestions.querySelector(".is-active");
    if (selected) {
      event.preventDefault();
      selected.click();
      return;
    }
  }
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendCommentFromComposer();
    return;
  }
  if (event.key === "Escape") closeMentionSuggestions();
}

function updateMentionSuggestions() {
  const query = currentMentionQuery();
  if (query === null) {
    closeMentionSuggestions();
    return;
  }
  const people = getMentionPeople({ owner: fields.owner.value })
    .filter((person) => person.handle.toLowerCase().includes(query.toLowerCase()) || person.label.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8);
  if (!people.length) {
    closeMentionSuggestions();
    return;
  }
  mentionSuggestions.innerHTML = "";
  activeMentionIndex = 0;
  people.forEach((person) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `@${person.handle} - ${person.label}`;
    button.addEventListener("click", () => insertMentionAtCursor(person.handle));
    mentionSuggestions.append(button);
  });
  updateActiveMentionSuggestion();
  mentionSuggestions.hidden = false;
}

function moveMentionSelection(offset) {
  const items = Array.from(mentionSuggestions.querySelectorAll("button"));
  if (!items.length) return;
  activeMentionIndex = (activeMentionIndex + offset + items.length) % items.length;
  updateActiveMentionSuggestion();
}

function updateActiveMentionSuggestion() {
  const items = Array.from(mentionSuggestions.querySelectorAll("button"));
  items.forEach((button, index) => {
    button.classList.toggle("is-active", index === activeMentionIndex);
  });
  items[activeMentionIndex]?.scrollIntoView({ block: "nearest" });
}

function currentMentionQuery() {
  const target = fields.commentDraft;
  const cursor = target.selectionStart ?? target.value.length;
  const beforeCursor = target.value.slice(0, cursor);
  const match = beforeCursor.match(/(^|\s)@([\p{L}\p{N}._-]*)$/u);
  return match ? match[2] : null;
}

function insertMentionAtCursor(handle) {
  const target = fields.commentDraft;
  const cursor = target.selectionStart ?? target.value.length;
  const beforeCursor = target.value.slice(0, cursor);
  const afterCursor = target.value.slice(cursor);
  const replaced = beforeCursor.replace(/(^|\s)@([\p{L}\p{N}._-]*)$/u, `$1@${handle} `);
  target.value = `${replaced}${afterCursor}`;
  const nextPosition = replaced.length;
  target.focus();
  target.setSelectionRange(nextPosition, nextPosition);
  closeMentionSuggestions();
}

function closeMentionSuggestions() {
  mentionSuggestions.hidden = true;
  mentionSuggestions.innerHTML = "";
  activeMentionIndex = 0;
}

function getMentionPeople(post = {}) {
  const people = [];
  const addPerson = (label, fallback = "") => {
    const name = String(label || fallback || "").trim();
    if (!name) return;
    const handle = mentionHandle(name);
    if (!handle || people.some((person) => person.handle === handle)) return;
    people.push({ handle, label: name });
  };
  addPerson(cloud.user?.displayName, cloud.user?.email);
  addPerson(post.owner);
  cloud.members.forEach((member) => addPerson(member.name || member.email, member.uid));
  return people;
}

function getCurrentMemberName() {
  const member = cloud.members.find((item) => item.uid === cloud.user?.uid);
  return member?.name || cloud.user?.displayName || cloud.user?.email || "Utente locale";
}

function mentionHandle(value) {
  return String(value || "")
    .split("@")[0]
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^\p{L}\p{N}._-]/gu, "")
    .slice(0, 40);
}

function extractMentions(text) {
  return Array.from(new Set((String(text).match(/@[\p{L}\p{N}._-]+/gu) || []).map((mention) => mention.slice(1))));
}

function renderCommentsList(container, comments, options = {}) {
  container.innerHTML = "";
  if (!comments.length) {
    const empty = document.createElement("p");
    empty.className = "empty-comments";
    empty.textContent = options.emptyText || "Nessun commento.";
    container.append(empty);
    return;
  }
  comments
    .slice()
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
    .forEach((comment) => container.append(createCommentItem(comment)));
}

function createCommentItem(comment) {
  const item = document.createElement("article");
  item.className = "comment-item";
  const header = document.createElement("header");
  const author = document.createElement("strong");
  author.textContent = comment.authorName || comment.authorEmail || "Utente";
  const date = document.createElement("span");
  date.textContent = formatDateTime(comment.createdAt);
  header.append(author, date);
  const text = document.createElement("p");
  text.append(...commentTextNodes(comment.text || ""));
  item.append(header, text);
  return item;
}

function commentTextNodes(text) {
  const nodes = [];
  String(text).split(/(@[\p{L}\p{N}._-]+)/gu).forEach((part) => {
    if (!part) return;
    if (part.startsWith("@")) {
      const mention = document.createElement("mark");
      mention.className = "comment-mention";
      mention.textContent = part;
      nodes.push(mention);
    } else {
      nodes.push(document.createTextNode(part));
    }
  });
  return nodes;
}

function resolveThemeFromForm() {
  if (fields.theme.value !== "__other") return { theme: fields.theme.value, themeOther: "" };
  const name = fields.themeOther.value.trim();
  if (!name) return { theme: "", themeOther: "" };
  const existing = state.settings.themes.find((theme) => theme.name.toLowerCase() === name.toLowerCase());
  if (existing) return { theme: existing.id, themeOther: "" };
  const theme = createThemeFromName(name, fields.color.value);
  state.settings.themes = normalizeThemes([...state.settings.themes, theme]);
  persistSettings();
  populateThemeSelects();
  return { theme: theme.id, themeOther: "" };
}

function createThemeFromName(name, color) {
  const baseId = slugify(name) || "tema";
  const ids = new Set(state.settings.themes.map((theme) => theme.id));
  let id = baseId;
  let index = 2;
  while (ids.has(id)) {
    id = `${baseId}-${index}`;
    index += 1;
  }
  return {
    id,
    icon: "",
    name,
    color: isValidColor(color) ? color : defaultThemes[state.settings.themes.length % defaultThemes.length].color,
  };
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
    comments: [],
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
      comments: [],
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
  if (state.settings.themes.some((theme) => theme.id === template.theme)) fields.theme.value = template.theme;
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
  downloadPostsCsv(activePosts(), "contenuti-social.csv");
}

function exportFilteredCsv() {
  downloadPostsCsv(getSortedListPosts(), "contenuti-social-filtrati.csv");
}

function downloadPostsCsv(posts, filename) {
  const rows = [
    ["id", "title", "date", "time", "platform", "format", "status", "approval", "priority", "color", "owner", "goal", "theme", "themeOther", "tags", "assetLinks", "assetLink", "assets", "copy", "notes", "comments"],
    ...posts.map((post) => [
      post.id,
      post.title,
      post.date,
      post.time,
      post.platform,
      post.format,
      getPostWorkStatus(post),
      post.approval,
      post.priority,
      post.color,
      post.owner,
      post.goal,
      post.theme,
      post.themeOther,
      post.tags,
      JSON.stringify(post.assetLinks || []),
      post.assetLink,
      post.assets,
      post.copy,
      post.notes,
      JSON.stringify(post.comments || []),
    ]),
  ];
  downloadFile(filename, rows.map((row) => row.map(csvEscape).join(",")).join("\n"), "text/csv");
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
    manualEvents: state.manualEvents,
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
      state.manualEvents = Array.isArray(backup.manualEvents) ? backup.manualEvents.map(normalizeManualEvent).filter(Boolean) : [];
      state.settings = normalizeSettings({ ...state.settings, ...(backup.settings || {}) });
      state.viewMode = state.settings.defaultView;
      persistPosts();
      persistManualEvents();
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
  populateThemeSelects();
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

function loadManualEvents() {
  try {
    const rawEvents = localStorage.getItem(manualEventsKey);
    return rawEvents ? JSON.parse(rawEvents).map(normalizeManualEvent).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function persistManualEvents(syncCloud = true) {
  localStorage.setItem(manualEventsKey, JSON.stringify(state.manualEvents));
  state.settings.manualEvents = state.manualEvents;
  if (syncCloud) saveCloudSettings();
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
      priority: false,
      owner: false,
      checklist: true,
    },
    formats: [...defaultFormats],
    goals: [...defaultGoals],
    themes: structuredCloneSafe(defaultThemes),
    templates: structuredCloneSafe(defaultTemplates),
    manualEvents: [],
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
    visibleFields: sanitizeVisibleFields({ ...defaults.visibleFields, ...(settings.visibleFields || {}) }),
    formats: Array.isArray(settings.formats) && settings.formats.length ? settings.formats : defaults.formats,
    goals: Array.isArray(settings.goals) && settings.goals.length ? settings.goals : defaults.goals,
    themes: normalizeThemes(settings.themes || defaults.themes),
    templates: settings.templates && Object.keys(settings.templates).length ? settings.templates : defaults.templates,
    manualEvents: Array.isArray(settings.manualEvents) ? settings.manualEvents.map(normalizeManualEvent).filter(Boolean) : defaults.manualEvents,
  };
}

function sanitizeVisibleFields(fields = {}) {
  const { status, approval, ...allowedFields } = fields;
  return allowedFields;
}

function populateTemplateSelect() {
  if (fields.template.type === "hidden") {
    fields.template.value = "";
    return;
  }
  const currentValue = fields.template.value;
  fields.template.innerHTML = "";
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "Nessun formato";
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
  const none = document.createElement("option");
  none.value = "";
  none.textContent = "Nessuno";
  fields.goal.append(none);
  state.settings.goals.forEach((goal) => {
    const option = document.createElement("option");
    option.value = goal;
    option.textContent = goal;
    fields.goal.append(option);
  });
  const other = document.createElement("option");
  other.value = "__other";
  other.textContent = "Altro...";
  fields.goal.append(other);
  fields.goal.value = currentValue === "__other" || currentValue === "" || state.settings.goals.includes(currentValue) ? currentValue : "";
  updateOtherFieldVisibility();
}

function populateFormatOptions() {
  const datalist = document.querySelector("#formatOptions");
  if (!datalist) return;
  datalist.innerHTML = "";
  state.settings.formats.forEach((format) => {
    const option = document.createElement("option");
    option.value = format;
    datalist.append(option);
  });
}

function populateThemeSelects() {
  const currentPostTheme = fields.theme.value;
  const currentFilter = themeFilter.value || "all";
  fields.theme.innerHTML = "";
  themeFilter.innerHTML = "";

  const none = document.createElement("option");
  none.value = "";
  none.textContent = "Nessuno";
  fields.theme.append(none);

  const all = document.createElement("option");
  all.value = "all";
  all.textContent = "Tutti i temi";
  themeFilter.append(all);

  state.settings.themes.forEach((theme) => {
    const postOption = document.createElement("option");
    postOption.value = theme.id;
    postOption.textContent = formatThemeLabel(theme);
    fields.theme.append(postOption);

    const filterOption = document.createElement("option");
    filterOption.value = theme.id;
    filterOption.textContent = formatThemeLabel(theme);
    themeFilter.append(filterOption);
  });
  const otherTheme = document.createElement("option");
  otherTheme.value = "__other";
  otherTheme.textContent = "Altro...";
  fields.theme.append(otherTheme);

  fields.theme.value = currentPostTheme === "__other" || currentPostTheme === "" || state.settings.themes.some((theme) => theme.id === currentPostTheme)
    ? currentPostTheme
    : "";
  themeFilter.value = currentFilter === "all" || state.settings.themes.some((theme) => theme.id === currentFilter)
    ? currentFilter
    : "all";
  updateOtherFieldVisibility();
}

function updateOtherFieldVisibility() {
  fields.goalOther.hidden = fields.goal.value !== "__other";
  fields.goalOther.required = fields.goal.value === "__other";
  fields.themeOther.hidden = fields.theme.value !== "__other";
  fields.themeOther.required = fields.theme.value === "__other";
}

function populateEventCategoryFilter() {
  const currentValue = eventCategoryFilter.value || "all";
  eventCategoryFilter.querySelectorAll("option:not([value='all'])").forEach((option) => option.remove());
  manualEventFields.category.innerHTML = "";
  Object.entries(eventCategories).forEach(([id, category]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `${category.icon} ${category.label}`;
    eventCategoryFilter.append(option);
    manualEventFields.category.append(option.cloneNode(true));
  });
  eventCategoryFilter.value = currentValue === "all" || eventCategories[currentValue] ? currentValue : "all";
}

function getTemplates() {
  return state.settings.templates;
}

function getTheme(themeId) {
  const resolved = resolveThemeId(themeId);
  return resolved ? state.settings.themes.find((theme) => theme.id === resolved) || null : null;
}

function formatThemeLabel(theme) {
  if (!theme) return "";
  return [normalizeThemeIcon(theme.icon), theme.name].filter(Boolean).join(" ");
}

function resolveThemeId(themeId) {
  return state.settings.themes.some((theme) => theme.id === themeId)
    ? themeId
    : "";
}

function parseLines(value) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function normalizeThemes(themes) {
  const normalized = Array.isArray(themes) ? themes.map((theme, index) => {
    const name = String(theme.name || "").trim();
    if (!name) return null;
    return {
      id: theme.id || slugify(name) || `tema-${index + 1}`,
      name,
      icon: normalizeThemeIcon(theme.icon),
      color: isValidColor(theme.color) ? theme.color : defaultThemes[index % defaultThemes.length].color,
    };
  }).filter(Boolean) : [];
  return normalized.length ? normalized : structuredCloneSafe(defaultThemes);
}

function parseThemes(value) {
  const themes = parseLines(value).map((line, index) => {
    const [icon, name, color] = line.split("|").map((item) => item.trim());
    if (!name) return null;
    return {
      id: slugify(name) || `tema-${index + 1}`,
      icon: normalizeThemeIcon(icon),
      name,
      color: isValidColor(color) ? color : defaultThemes[index % defaultThemes.length].color,
    };
  }).filter(Boolean);
  return themes.length ? themes : structuredCloneSafe(defaultThemes);
}

function themesToText(themes) {
  return normalizeThemes(themes).map((theme) => (
    [theme.icon, theme.name, theme.color].join(" | ")
  )).join("\n");
}

function normalizeThemeIcon(icon) {
  const value = String(icon || "").trim();
  return value === "." || value === "•" ? "" : value.slice(0, 4);
}

function parseTemplates(value, themes = state.settings.themes) {
  const parsed = {};
  parseLines(value).forEach((line) => {
    const [name, platform, format, goal, theme, assets] = line.split("|").map((item) => item.trim());
    if (!name) return;
    parsed[name] = {
      platform: platforms.includes(platform) ? platform : "Instagram",
      format: format || "",
      goal: goal || state.settings.goals[0] || "Awareness",
      theme: themes.some((item) => item.id === theme) ? theme : themes[0]?.id || defaultThemes[0].id,
      assets: assets || "",
      checklist: { idea: true },
    };
  });
  return Object.keys(parsed).length ? parsed : structuredCloneSafe(defaultTemplates);
}

function templatesToText(templates, themes = state.settings.themes) {
  return Object.entries(templates).map(([name, template]) => (
    [name, template.platform, template.format, template.goal, template.theme || themes[0]?.id || defaultThemes[0].id, template.assets].join(" | ")
  )).join("\n");
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
      theme: "innovazione",
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
      theme: "persone",
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
    goal: post.goal || "",
    theme: post.theme || post.category || "",
    themeOther: post.themeOther || "",
    tags: post.tags || "",
    assetLinks: Array.isArray(post.assetLinks)
      ? post.assetLinks.map((asset) => ({
        title: asset.title || "",
        url: asset.url || "",
      })).filter((asset) => asset.title || asset.url)
      : [],
    assetLink: post.assetLink || "",
    assets: post.assets || "",
    copy: post.copy || "",
    notes: post.notes || "",
    comments: Array.isArray(post.comments) ? post.comments.map(normalizeComment).filter(Boolean) : [],
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

function normalizeComment(comment) {
  const text = String(comment?.text || "").trim();
  if (!text) return null;
  return {
    id: comment.id || createId(),
    text,
    mentions: Array.isArray(comment.mentions) ? comment.mentions.filter(Boolean) : extractMentions(text),
    authorUid: comment.authorUid || "",
    authorEmail: comment.authorEmail || "",
    authorName: comment.authorName || comment.authorEmail || "Utente",
    createdAt: comment.createdAt || new Date().toISOString(),
  };
}

function normalizeManualEvent(event) {
  if (!event?.title || !event?.date) return null;
  const category = eventCategories[event.category] ? event.category : "cultura";
  return {
    id: event.id || createId(),
    manual: true,
    title: event.title || "",
    date: event.date || toDateKey(new Date()),
    category,
    scope: ["italia", "internazionale"].includes(event.scope) ? event.scope : "italia",
    importance: ["alta", "media", "bassa"].includes(event.importance) ? event.importance : "media",
    description: event.description || "Evento inserito manualmente.",
    ideas: Array.isArray(event.ideas) ? event.ideas.filter(Boolean) : [],
    hashtags: Array.isArray(event.hashtags) ? event.hashtags.filter(Boolean) : [],
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
    theme: row.theme,
    themeOther: row.themeOther,
    tags: row.tags,
    assetLinks: parseAssetLinks(row.assetLinks),
    assetLink: row.assetLink,
    assets: row.assets,
    copy: row.copy,
    notes: row.notes,
    comments: parseComments(row.comments),
    history: [historyEntry("Importato da CSV")],
  });
}

function parseComments(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(normalizeComment).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function parseAssetLinks(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getCalendarStartDate() {
  if (state.viewMode === "day" || state.viewMode === "list") return new Date(state.visibleDate);
  if (state.viewMode === "week") return startOfWeek(state.visibleDate);
  return startOfCalendar(state.visibleDate.getFullYear(), state.visibleDate.getMonth());
}

function getDaysToRender() {
  if (state.viewMode === "day") return 1;
  if (state.viewMode === "week") return 7;
  if (state.viewMode === "list") return 0;
  return getMonthDaysToRender();
}

function getMonthDaysToRender() {
  const year = state.visibleDate.getFullYear();
  const month = state.visibleDate.getMonth();
  const start = startOfCalendar(year, month);
  const lastDay = new Date(year, month + 1, 0);
  const end = new Date(lastDay);
  end.setDate(lastDay.getDate() + (6 - getMondayBasedDay(lastDay)));
  return daysBetween(start, end) + 1;
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

function getMonthPosts(posts, referenceDate = state.visibleDate) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
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

function isValidPostTime(time) {
  return /^\d{2}:\d{2}$/.test(String(time || ""));
}

function checklistProgress(post) {
  const values = Object.values(post.checklist || {});
  return Math.round((values.filter(Boolean).length / values.length) * 100);
}

function getPostWorkStatus(post) {
  const stage = checklistStageLabel(post);
  if (stage !== "Checklist: nessuno stato") return stage;
  return {
    "Da scrivere": "Script",
    Pronto: "Revisionato",
    Programmato: "Programmato",
    Pubblicato: "Programmato",
  }[post.status] || "Idea";
}

function checklistForWorkStatus(status, currentChecklist = {}) {
  const order = ["Idea", "Script", "Grafica", "Revisionato", "Programmato"];
  const keys = ["idea", "copy", "creative", "review", "scheduled"];
  const selectedIndex = order.indexOf(status);
  if (selectedIndex < 0) return currentChecklist;
  return Object.fromEntries(keys.map((key, index) => [key, index <= selectedIndex]));
}

function checklistStageLabel(post) {
  const steps = [
    ["idea", "Idea"],
    ["copy", "Script"],
    ["creative", "Grafica"],
    ["review", "Revisionato"],
    ["scheduled", "Programmato"],
  ];
  const completed = steps.filter(([key]) => Boolean(post.checklist?.[key]));
  return completed.length ? completed[completed.length - 1][1] : "Checklist: nessuno stato";
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

function toMonthInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = String(dateKey).split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
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
