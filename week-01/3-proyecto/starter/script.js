// ============================================
//INFORMACION GENERAL
// ============================================

const clothesData = {
  name: 'Baby Clothes Store',
  description: 'Tienda de ropa juvenil con prendas cómodas y buen estilo.',
  title: 'Tienda de Ropa Juvenil',
  contact: {
    email: 'jacksonsena2026@gmail.com',
    phone: '+57 319 639 8621',
    location: 'Bogotá, Colombia'
  },
  items: [
  { name: 'Ice Cream Shirt', categoria: 'shirt', precio: 45000 },
  { name: 'Jean SpongeBob', categoria: 'pants', precio: 90000 },
  { name: 'Tennis rayo maqueen', categoria: 'tennis', precio: 45000 },
  { name: 'Minions jacket', categoria: 'jacket', precio: 45000 },
],

  links: [
    { platform: 'Facebook', url: 'https://www.facebook.com/offcorss' }
  ],
  stats: {
    total: 2,
    active: 2,
    rating: 4.5,
    custom: 1
  }
};

// ============================================
// REFERENCIAS DE DOM
// ============================================

const entityName = document.getElementById('userName');
const entityDescription = document.getElementById('userBio');
const userTitle = document.getElementById('userTitle');
const userLocation = document.getElementById('userLocation');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');

const itemsList = document.getElementById('skillsList');
const statsContainer = document.getElementById('stats');
const linksContainer = document.getElementById('socialLinks');

const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyEmailBtn');
const toggleItemsBtn = document.getElementById('toggleSkills');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// RENDER INFORMACIÓN BÁSICA
// ============================================

const renderBasicInfo = () => {
  const { name, description, title, contact: { email, phone, location } } = clothesData;

  entityName.textContent = name;
  userTitle.textContent = title;
  userLocation.textContent = `📍 ${location}`;
  entityDescription.textContent = description;
  userEmail.textContent = email;
  userPhone.textContent = phone;
};

// ============================================
// RENDER ITEMS 
// ============================================

const renderItems = (showAll = false) => {
  const { items } = clothesData;

  const itemsToShow = showAll ? items : items.slice(0, 4);

  const itemsHtml = itemsToShow.map(({ name, categoria, precio }) => `
  <div class="skill-item">
    <div class="skill-name">${name}</div>
    <div class="skill-level">
      <span>Categoría: ${categoria}</span>
      <span>Precio: $${precio.toLocaleString()}</span>
    </div>
  </div>
`).join('');


  itemsList.innerHTML = itemsHtml;
};

// ============================================
// RENDER LINKS
// ============================================

const renderLinks = () => {
  const { links } = clothesData;

  const linksHtml = links.map(({ platform, url }) => `
    <a href="${url}" target="_blank" class="social-link">
      ${platform}
    </a>
  `).join('');

  linksContainer.innerHTML = linksHtml;
};

// ============================================
// RENDER STATS
// ============================================

const renderStats = () => {
  const { stats } = clothesData;

  const statsArray = [
    { label: 'Total Productos', value: stats.total },
    { label: 'Activos', value: stats.active },
    { label: 'Rating', value: stats.rating },
    { label: 'Extra', value: stats.custom }
  ];

  const statsHtml = statsArray.map(({ label, value }) => `
    <div class="stat-item">
      <span class="stat-value">${value}</span>
      <span class="stat-label">${label}</span>
    </div>
  `).join('');

  statsContainer.innerHTML = statsHtml;
};

// ============================================
// MODO OSCURO
// ============================================

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = newTheme;
  themeToggle.innerHTML = `<span class="theme-icon">${newTheme === 'dark' ? '☀️' : '🌙'}</span>`;

  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.innerHTML = `<span class="theme-icon">${savedTheme === 'dark' ? '☀️' : '🌙'}</span>`;
};

// ============================================
// COPIAR EMAIL
// ============================================

const copyInfo = async () => {
  const { contact: { email } } = clothesData;

  await navigator.clipboard.writeText(email);
  showToast('¡Email copiado!');
};

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// MOSTRAR MÁS / MENOS
// ============================================

let showingAllItems = false;

const handleToggleItems = () => {
  showingAllItems = !showingAllItems;
  renderItems(showingAllItems);
  toggleItemsBtn.textContent = showingAllItems ? 'Show Less' : 'Show More';
};

// ============================================
// EVENT LISTENERS
// ============================================

themeToggle.addEventListener('click', toggleTheme);
copyBtn.addEventListener('click', copyInfo);
toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// INICIALIZAR
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log('Aplicación inicializada correctamente');
};

document.addEventListener('DOMContentLoaded', init);
