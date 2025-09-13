// Application Data (simulating a database)
const userData = {
  users: [
    {
      id: 1,
      rollNumber: "21CSE001",
      name: "Arjun Sharma",
      branch: "CSE",
      email: "arjun@nbkrist.edu",
      type: "student",
      booksCurrently: 3,
      totalBorrowed: 15,
      readingStreak: 12,
      xpPoints: 340,
      badges: ["First Book", "Speed Reader", "Tech Explorer"]
    },
    {
      id: 2,
      rollNumber: "21ECE045",
      name: "Priya Patel",
      branch: "ECE",
      email: "priya@nbkrist.edu",
      type: "student",
      booksCurrently: 2,
      totalBorrowed: 8,
      readingStreak: 5,
      xpPoints: 180,
      badges: ["First Book", "Electronics Expert"]
    },
    {
      id: 3,
      username: "admin",
      name: "Dr. Rajesh Kumar",
      role: "Head Librarian",
      email: "admin@nbkrist.edu",
      type: "admin"
    }
  ],
  books: [
    {
      id: 1,
      title: "Data Structures and Algorithms",
      author: "Thomas H. Cormen",
      isbn: "9780262033848",
      category: "Computer Science",
      branch: "CSE",
      available: true,
      copiesTotal: 5,
      copiesAvailable: 2,
      rating: 4.5,
      cover: "/api/placeholder/150/200",
      description: "Comprehensive guide to algorithms and data structures"
    },
    {
      id: 2,
      title: "Digital Signal Processing",
      author: "Alan V. Oppenheim",
      isbn: "9780137549207",
      category: "Electronics",
      branch: "ECE",
      available: true,
      copiesTotal: 3,
      copiesAvailable: 1,
      rating: 4.3,
      cover: "/api/placeholder/150/200",
      description: "Fundamentals of digital signal processing"
    },
    {
      id: 3,
      title: "Machine Design",
      author: "R.S. Khurmi",
      isbn: "9788121925013",
      category: "Mechanical",
      branch: "MECH",
      available: false,
      copiesTotal: 4,
      copiesAvailable: 0,
      rating: 4.2,
      cover: "/api/placeholder/150/200",
      description: "Complete guide to machine design principles"
    },
    {
      id: 4,
      title: "Structural Analysis",
      author: "R.C. Hibbeler",
      isbn: "9780132570534",
      category: "Civil Engineering",
      branch: "CIVIL",
      available: true,
      copiesTotal: 6,
      copiesAvailable: 4,
      rating: 4.6,
      cover: "/api/placeholder/150/200",
      description: "Fundamentals of structural analysis"
    },
    {
      id: 5,
      title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell",
      isbn: "9780134610993",
      category: "Computer Science",
      branch: "CSE",
      available: true,
      copiesTotal: 3,
      copiesAvailable: 2,
      rating: 4.7,
      cover: "/api/placeholder/150/200",
      description: "Comprehensive introduction to AI concepts"
    },
    {
      id: 6,
      title: "Communication Systems",
      author: "Simon Haykin",
      isbn: "9780471697909",
      category: "Electronics",
      branch: "ECE",
      available: true,
      copiesTotal: 4,
      copiesAvailable: 3,
      rating: 4.4,
      cover: "/api/placeholder/150/200",
      description: "Modern communication systems fundamentals"
    },
    {
      id: 7,
      title: "Python Programming",
      author: "Mark Lutz",
      category: "Programming",
      branch: "CSE",
      available: true,
      copiesTotal: 3,
      copiesAvailable: 3,
      rating: 4.2,
      cover: "/api/placeholder/150/200"
    },
    {
      id: 8,
      title: "Circuit Analysis",
      author: "William Hayt",
      category: "Electronics",
      branch: "ECE",
      available: true,
      copiesTotal: 4,
      copiesAvailable: 4,
      rating: 4.1,
      cover: "/api/placeholder/150/200"
    }
  ],
  borrowedBooks: [
    {
      id: 1,
      userId: 1,
      bookId: 1,
      issueDate: "2024-01-15",
      dueDate: "2024-01-29",
      returned: false,
      progress: 65
    },
    {
      id: 2,
      userId: 1,
      bookId: 5,
      issueDate: "2024-01-20",
      dueDate: "2024-02-03",
      returned: false,
      progress: 30
    },
    {
      id: 3,
      userId: 2,
      bookId: 2,
      issueDate: "2024-01-18",
      dueDate: "2024-02-01",
      returned: false,
      progress: 45
    }
  ],
  achievements: [
    {
      id: 1,
      name: "First Book",
      description: "Borrowed your first book",
      icon: "📚",
      points: 50
    },
    {
      id: 2,
      name: "Speed Reader",
      description: "Read 5 books in a month",
      icon: "⚡",
      points: 100
    },
    {
      id: 3,
      name: "Tech Explorer",
      description: "Read 10 Computer Science books",
      icon: "💻",
      points: 150
    },
    {
      id: 4,
      name: "Consistent Reader",
      description: "10-day reading streak",
      icon: "🔥",
      points: 200
    }
  ],
  stats: {
    totalBooks: 1250,
    booksIssued: 234,
    overdueBooks: 12,
    activeMembers: 486,
    monthlyCirculation: 892
  }
};

// Application state
let currentUser = null;
let currentView = 'grid';
let currentFilters = {
  branch: '',
  availability: '',
  search: ''
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('App initializing...');
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('data-color-scheme', savedTheme);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && savedTheme === 'dark') {
      themeToggle.querySelector('i').className = 'fas fa-sun';
    }
  }
}

function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Login toggle
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  const usernameLabel = document.getElementById('usernameLabel');
  const usernameInput = document.getElementById('username');
  
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Toggle clicked:', this.dataset.type);
      toggleButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const type = this.dataset.type;
      if (type === 'admin') {
        usernameLabel.textContent = 'Username';
        usernameInput.placeholder = 'Enter admin username';
      } else {
        usernameLabel.textContent = 'Roll Number';
        usernameInput.placeholder = 'Enter your roll number';
      }
    });
  });

  // Demo credential buttons
  const demoBtns = document.querySelectorAll('.demo-btn');
  demoBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const username = this.dataset.username;
      const password = this.dataset.password;
      const type = this.dataset.type;
      
      // Set the toggle
      toggleButtons.forEach(b => b.classList.remove('active'));
      const targetToggle = document.querySelector(`[data-type="${type}"]`);
      targetToggle.classList.add('active');
      targetToggle.click(); // Trigger the toggle change
      
      // Fill the form
      document.getElementById('username').value = username;
      document.getElementById('password').value = password;
      
      showToast(`Demo credentials filled for ${type}`, 'success');
    });
  });

  // Login form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
    console.log('Login form listener added');
  }

  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });
  }

  // Navigation
  const navItems = document.querySelectorAll('.nav-item:not(.logout)');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const page = this.dataset.page;
      if (page) {
        navigateToPage(page);
      }
    });
  });

  // Global search
  const globalSearch = document.getElementById('globalSearch');
  if (globalSearch) {
    globalSearch.addEventListener('input', handleGlobalSearch);
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // Search filters
  const branchFilter = document.getElementById('branchFilter');
  const availabilityFilter = document.getElementById('availabilityFilter');
  
  if (branchFilter) {
    branchFilter.addEventListener('change', function() {
      currentFilters.branch = this.value;
      filterBooks();
    });
  }

  if (availabilityFilter) {
    availabilityFilter.addEventListener('change', function() {
      currentFilters.availability = this.value;
      filterBooks();
    });
  }

  // View toggle
  const viewButtons = document.querySelectorAll('.view-btn');
  viewButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      viewButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentView = this.dataset.view;
      renderBooks();
    });
  });

  // Modal handlers
  const modalClose = document.querySelector('.modal-close');
  const cancelBorrow = document.getElementById('cancelBorrow');
  const confirmBorrow = document.getElementById('confirmBorrow');
  const borrowModal = document.getElementById('borrowModal');

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (cancelBorrow) cancelBorrow.addEventListener('click', closeModal);
  if (confirmBorrow) confirmBorrow.addEventListener('click', handleConfirmBorrow);

  // Close modal on outside click
  if (borrowModal) {
    borrowModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (sidebar && mobileMenuBtn && !sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    const borrowModal = document.getElementById('borrowModal');
    const globalSearch = document.getElementById('globalSearch');
    
    // ESC to close modal
    if (e.key === 'Escape') {
      if (borrowModal && !borrowModal.classList.contains('hidden')) {
        closeModal();
      }
    }
    
    // Alt + S to focus search
    if (e.altKey && e.key === 's') {
      e.preventDefault();
      if (globalSearch) globalSearch.focus();
    }
  });
}

function handleLogin(e) {
  e.preventDefault();
  console.log('Login form submitted');
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const loginType = document.querySelector('.toggle-btn.active').dataset.type;
  
  console.log('Login attempt:', { username, loginType });

  // Show loading state
  const loginBtn = document.getElementById('loginBtn');
  const loginText = loginBtn.querySelector('.login-text');
  const loginLoading = loginBtn.querySelector('.login-loading');
  
  loginText.style.display = 'none';
  loginLoading.classList.remove('hidden');
  loginBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    let user = null;
    
    if (loginType === 'admin') {
      user = userData.users.find(u => 
        u.type === 'admin' && 
        u.username === username && 
        password === 'admin123'
      );
    } else {
      user = userData.users.find(u => 
        u.type === 'student' && 
        u.rollNumber === username && 
        password === 'password'
      );
    }

    console.log('User found:', user);

    if (user) {
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      showMainApp();
      showToast('Login successful! Welcome to NBKRIST Library.', 'success');
    } else {
      showToast('Invalid credentials. Please check your login details.', 'error');
      
      // Reset login button
      loginText.style.display = 'inline';
      loginLoading.classList.add('hidden');
      loginBtn.disabled = false;
    }
  }, 1000);
}

function showMainApp() {
  console.log('Showing main app for user:', currentUser);
  const loginPage = document.getElementById('loginPage');
  const mainApp = document.getElementById('mainApp');
  
  loginPage.classList.add('hidden');
  mainApp.classList.remove('hidden');
  
  setupUserInterface();
  navigateToPage('dashboard');
}

function setupUserInterface() {
  // Update user info in header
  const userNameSpan = document.querySelector('.user-name');
  
  if (userNameSpan) {
    userNameSpan.textContent = currentUser.name.split(' ')[0];
  }
  
  // Show/hide elements based on user type
  const studentElements = document.querySelectorAll('.student-only');
  const adminElements = document.querySelectorAll('.admin-only');
  
  if (currentUser.type === 'admin') {
    studentElements.forEach(el => el.classList.add('hidden'));
    adminElements.forEach(el => el.classList.remove('hidden'));
  } else {
    adminElements.forEach(el => el.classList.add('hidden'));
    studentElements.forEach(el => el.classList.remove('hidden'));
    
    // Update borrowed books badge
    const borrowedNav = document.getElementById('borrowedNav');
    if (borrowedNav) {
      const navBadge = borrowedNav.querySelector('.nav-badge');
      if (navBadge) {
        navBadge.textContent = currentUser.booksCurrently;
      }
    }
  }
}

function navigateToPage(pageName) {
  console.log('Navigating to page:', pageName);
  
  // Update navigation
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  const activeNav = document.querySelector(`[data-page="${pageName}"]`);
  if (activeNav) activeNav.classList.add('active');

  // Show page content
  const pageContents = document.querySelectorAll('.page-content');
  pageContents.forEach(page => page.classList.remove('active'));
  const activePage = document.getElementById(pageName);
  if (activePage) activePage.classList.add('active');

  // Load page-specific content
  switch(pageName) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'search':
      renderBooks();
      break;
    case 'borrowed':
      renderBorrowedBooks();
      break;
    case 'profile':
      renderProfile();
      break;
  }
}

function renderDashboard() {
  // Update welcome message
  const userName = document.getElementById('userName');
  if (userName) {
    userName.textContent = currentUser.name.split(' ')[0];
  }

  if (currentUser.type === 'student') {
    renderStudentDashboard();
  } else {
    renderAdminDashboard();
  }
}

function renderStudentDashboard() {
  // Update stats
  const booksCurrentlyEl = document.getElementById('booksCurrently');
  const readingStreakEl = document.getElementById('readingStreak');
  const xpPointsEl = document.getElementById('xpPoints');
  
  if (booksCurrentlyEl) booksCurrentlyEl.textContent = currentUser.booksCurrently;
  if (readingStreakEl) readingStreakEl.textContent = currentUser.readingStreak;
  if (xpPointsEl) xpPointsEl.textContent = currentUser.xpPoints;
  
  // Update branch tag
  const branchTag = document.getElementById('branchTag');
  if (branchTag) {
    branchTag.textContent = currentUser.branch;
  }

  // Render borrowed books
  renderDashboardBorrowedBooks();
  
  // Render recommendations
  renderRecommendations();
  
  // Render achievements
  renderAchievements();
}

function renderAdminDashboard() {
  // Update admin stats
  const totalBooksEl = document.getElementById('totalBooks');
  const booksIssuedEl = document.getElementById('booksIssued');
  const overdueBooksEl = document.getElementById('overdueBooks');
  const activeMembersEl = document.getElementById('activeMembers');
  
  if (totalBooksEl) totalBooksEl.textContent = userData.stats.totalBooks;
  if (booksIssuedEl) booksIssuedEl.textContent = userData.stats.booksIssued;
  if (overdueBooksEl) overdueBooksEl.textContent = userData.stats.overdueBooks;
  if (activeMembersEl) activeMembersEl.textContent = userData.stats.activeMembers;

  // Render recent activity
  renderAdminActivity();
}

function renderDashboardBorrowedBooks() {
  const container = document.getElementById('borrowedBooksContainer');
  const borrowedCount = document.getElementById('borrowedCount');
  
  if (!container) return;
  
  const userBorrowedBooks = userData.borrowedBooks.filter(b => 
    b.userId === currentUser.id && !b.returned
  );
  
  if (borrowedCount) {
    borrowedCount.textContent = userBorrowedBooks.length;
  }
  
  if (userBorrowedBooks.length === 0) {
    container.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--color-text-secondary);">No books currently borrowed. <a href="#" onclick="navigateToPage(\'search\')" style="color: var(--color-primary);">Browse books</a> to get started!</div>';
    return;
  }
  
  container.innerHTML = userBorrowedBooks.map(borrowedBook => {
    const book = userData.books.find(b => b.id === borrowedBook.bookId);
    if (!book) return '';
    
    const dueDate = new Date(borrowedBook.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    let dueDateClass = 'safe';
    if (daysUntilDue < 0) dueDateClass = 'overdue';
    else if (daysUntilDue <= 3) dueDateClass = 'warning';
    
    return `
      <div class="borrowed-book-card">
        <div class="book-info">
          <img src="${book.cover}" alt="${book.title}">
          <div class="book-details">
            <h4>${book.title}</h4>
            <p>${book.author}</p>
            <div class="due-date ${dueDateClass}">
              Due: ${formatDate(borrowedBook.dueDate)}
            </div>
          </div>
        </div>
        <div class="book-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${borrowedBook.progress}%"></div>
          </div>
          <span class="progress-text">${borrowedBook.progress}% read</span>
        </div>
        <button class="btn btn--sm btn--outline" onclick="renewBook(${borrowedBook.id})">Renew</button>
      </div>
    `;
  }).join('');
}

function renderRecommendations() {
  const container = document.getElementById('recommendationsContainer');
  
  if (!container) return;
  
  // Get books from user's branch
  const recommendedBooks = userData.books.filter(book => 
    book.branch === currentUser.branch && book.available
  ).slice(0, 4);
  
  if (recommendedBooks.length === 0) {
    container.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--color-text-secondary);">No recommendations available at the moment.</div>';
    return;
  }
  
  container.innerHTML = recommendedBooks.map(book => `
    <div class="book-recommendation-card">
      <img src="${book.cover}" alt="${book.title}">
      <h4>${book.title}</h4>
      <p>${book.author}</p>
      <div class="book-rating">
        <span class="rating">${generateStars(book.rating)}</span>
        <span class="rating-value">${book.rating}</span>
      </div>
      <button class="btn btn--primary btn--sm" onclick="borrowBook(${book.id})">Borrow</button>
    </div>
  `).join('');
}

function renderAchievements() {
  const container = document.getElementById('achievementsContainer');
  
  if (!container) return;
  
  // Filter achievements based on user's badges
  const userAchievements = userData.achievements.filter(achievement =>
    currentUser.badges.includes(achievement.name)
  );
  
  if (userAchievements.length === 0) {
    container.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--color-text-secondary);">Start reading to earn achievements!</div>';
    return;
  }
  
  container.innerHTML = userAchievements.map(achievement => `
    <div class="achievement-badge">
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-name">${achievement.name}</div>
      <div class="achievement-points">+${achievement.points} XP</div>
    </div>
  `).join('');
}

function renderAdminActivity() {
  const container = document.getElementById('adminActivity');
  
  if (!container) return;
  
  const activities = [
    {
      icon: '📖',
      text: '<strong>Arjun Sharma</strong> borrowed <em>Data Structures and Algorithms</em>',
      time: '2 hours ago'
    },
    {
      icon: '✅',
      text: '<strong>Priya Patel</strong> returned <em>Digital Signal Processing</em>',
      time: '3 hours ago'
    },
    {
      icon: '📚',
      text: '<strong>New book added:</strong> <em>Machine Learning Fundamentals</em>',
      time: '5 hours ago'
    },
    {
      icon: '🔄',
      text: '<strong>System backup</strong> completed successfully',
      time: '1 day ago'
    }
  ];
  
  container.innerHTML = activities.map(activity => `
    <div class="activity-item">
      <div class="activity-icon">${activity.icon}</div>
      <div class="activity-details">
        <p>${activity.text}</p>
        <span class="activity-time">${activity.time}</span>
      </div>
    </div>
  `).join('');
}

function renderBooks() {
  const container = document.getElementById('booksGrid');
  
  if (!container) return;
  
  let filteredBooks = [...userData.books];
  
  // Apply filters
  if (currentFilters.branch) {
    filteredBooks = filteredBooks.filter(book => book.branch === currentFilters.branch);
  }
  
  if (currentFilters.availability) {
    if (currentFilters.availability === 'available') {
      filteredBooks = filteredBooks.filter(book => book.available);
    } else {
      filteredBooks = filteredBooks.filter(book => !book.available);
    }
  }
  
  if (currentFilters.search) {
    const searchTerm = currentFilters.search.toLowerCase();
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm)
    );
  }
  
  // Update grid class based on view
  container.className = currentView === 'list' ? 'books-grid list-view' : 'books-grid';
  
  if (filteredBooks.length === 0) {
    container.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--color-text-secondary); grid-column: 1 / -1;">No books found matching your criteria.</div>';
    return;
  }
  
  container.innerHTML = filteredBooks.map(book => `
    <div class="book-card ${currentView === 'list' ? 'list-view' : ''}">
      <img src="${book.cover}" alt="${book.title}">
      <div class="book-content">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
        <div class="book-availability">
          <span class="availability-status ${book.available ? 'available' : 'unavailable'}">
            ${book.available ? 'Available' : 'Not Available'}
          </span>
          <span class="copies-info">${book.copiesAvailable}/${book.copiesTotal} copies</span>
        </div>
        <div class="book-rating">
          <span class="rating">${generateStars(book.rating)}</span>
          <span class="rating-value">${book.rating}</span>
        </div>
        ${book.available && currentUser && currentUser.type === 'student' ? 
          `<button class="btn btn--primary btn--sm" onclick="borrowBook(${book.id})">Borrow</button>` :
          `<button class="btn btn--outline btn--sm" disabled>${book.available ? 'View Details' : 'Unavailable'}</button>`
        }
      </div>
    </div>
  `).join('');
}

function renderBorrowedBooks() {
  const container = document.getElementById('borrowedBooksList');
  const totalBorrowedSpan = document.getElementById('totalBorrowed');
  const dueSoonSpan = document.getElementById('dueSoon');
  
  if (!container) return;
  
  const userBorrowedBooks = userData.borrowedBooks.filter(b => 
    b.userId === currentUser.id && !b.returned
  );
  
  if (totalBorrowedSpan) {
    totalBorrowedSpan.textContent = userBorrowedBooks.length;
  }
  
  // Count books due soon (within 3 days)
  const dueSoon = userBorrowedBooks.filter(b => {
    const dueDate = new Date(b.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilDue <= 3 && daysUntilDue >= 0;
  }).length;
  
  if (dueSoonSpan) {
    dueSoonSpan.textContent = dueSoon;
  }
  
  if (userBorrowedBooks.length === 0) {
    container.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--color-text-secondary);">You haven\'t borrowed any books yet. <a href="#" onclick="navigateToPage(\'search\')" style="color: var(--color-primary);">Browse our collection</a> to get started!</div>';
    return;
  }
  
  container.innerHTML = userBorrowedBooks.map(borrowedBook => {
    const book = userData.books.find(b => b.id === borrowedBook.bookId);
    if (!book) return '';
    
    const dueDate = new Date(borrowedBook.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    let dueDateClass = 'safe';
    let dueDateText = `Due in ${daysUntilDue} days`;
    
    if (daysUntilDue < 0) {
      dueDateClass = 'overdue';
      dueDateText = `Overdue by ${Math.abs(daysUntilDue)} days`;
    } else if (daysUntilDue <= 3) {
      dueDateClass = 'warning';
      if (daysUntilDue === 0) dueDateText = 'Due today';
    }
    
    return `
      <div class="borrowed-book-card">
        <div class="book-info">
          <img src="${book.cover}" alt="${book.title}">
          <div class="book-details">
            <h4>${book.title}</h4>
            <p>${book.author}</p>
            <div class="due-date ${dueDateClass}">
              ${dueDateText}
            </div>
            <p><small>Issued: ${formatDate(borrowedBook.issueDate)}</small></p>
          </div>
        </div>
        <div class="book-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${borrowedBook.progress}%"></div>
          </div>
          <span class="progress-text">${borrowedBook.progress}% read</span>
        </div>
        <div class="book-actions">
          <button class="btn btn--sm btn--outline" onclick="renewBook(${borrowedBook.id})">Renew</button>
          <button class="btn btn--sm btn--primary" onclick="returnBook(${borrowedBook.id})">Return</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderProfile() {
  const profileName = document.getElementById('profileName');
  const profileDetails = document.getElementById('profileDetails');
  
  if (profileName) {
    profileName.textContent = currentUser.name;
  }
  
  if (profileDetails) {
    if (currentUser.type === 'student') {
      profileDetails.textContent = `${currentUser.rollNumber} • ${getBranchFullName(currentUser.branch)}`;
    } else {
      profileDetails.textContent = `${currentUser.role} • ${currentUser.email}`;
    }
  }
}

// Utility functions
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = '★'.repeat(fullStars);
  if (hasHalfStar) stars += '☆';
  return stars.padEnd(5, '☆');
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getBranchFullName(branch) {
  const branches = {
    'CSE': 'Computer Science Engineering',
    'ECE': 'Electronics & Communication',
    'MECH': 'Mechanical Engineering',
    'CIVIL': 'Civil Engineering'
  };
  return branches[branch] || branch;
}

function calculateDueDate() {
  const date = new Date();
  date.setDate(date.getDate() + 14); // 14 days from now
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Event handlers
function handleGlobalSearch(e) {
  currentFilters.search = e.target.value;
  if (document.getElementById('search').classList.contains('active')) {
    filterBooks();
  }
}

function filterBooks() {
  renderBooks();
}

function borrowBook(bookId) {
  if (!currentUser || currentUser.type !== 'student') {
    showToast('Only students can borrow books', 'error');
    return;
  }
  
  const book = userData.books.find(b => b.id === bookId);
  if (!book || !book.available) {
    showToast('Book is not available', 'error');
    return;
  }
  
  // Check if student has reached borrowing limit (simulate)
  const currentBorrowedCount = userData.borrowedBooks.filter(b => 
    b.userId === currentUser.id && !b.returned
  ).length;
  
  if (currentBorrowedCount >= 5) {
    showToast('You have reached the maximum borrowing limit (5 books)', 'error');
    return;
  }
  
  // Show borrow confirmation modal
  showBorrowModal(book);
}

function showBorrowModal(book) {
  const modal = document.getElementById('borrowModal');
  const bookCover = document.getElementById('borrowBookCover');
  const bookTitle = document.getElementById('borrowBookTitle');
  const bookAuthor = document.getElementById('borrowBookAuthor');
  const dueDate = document.getElementById('borrowDueDate');
  
  if (bookCover) bookCover.src = book.cover;
  if (bookTitle) bookTitle.textContent = book.title;
  if (bookAuthor) bookAuthor.textContent = book.author;
  if (dueDate) dueDate.textContent = calculateDueDate();
  
  modal.classList.remove('hidden');
  modal.dataset.bookId = book.id;
}

function closeModal() {
  const borrowModal = document.getElementById('borrowModal');
  borrowModal.classList.add('hidden');
}

function handleConfirmBorrow() {
  const borrowModal = document.getElementById('borrowModal');
  const bookId = parseInt(borrowModal.dataset.bookId);
  const book = userData.books.find(b => b.id === bookId);
  
  // Create new borrow record
  const newBorrow = {
    id: userData.borrowedBooks.length + 1,
    userId: currentUser.id,
    bookId: bookId,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    returned: false,
    progress: 0
  };
  
  userData.borrowedBooks.push(newBorrow);
  
  // Update book availability
  book.copiesAvailable -= 1;
  if (book.copiesAvailable === 0) {
    book.available = false;
  }
  
  // Update current user stats
  currentUser.booksCurrently += 1;
  currentUser.xpPoints += 10; // Award XP for borrowing
  
  // Update UI
  const navBadge = document.querySelector('#borrowedNav .nav-badge');
  if (navBadge) {
    navBadge.textContent = currentUser.booksCurrently;
  }
  
  closeModal();
  showToast(`Successfully borrowed "${book.title}"! Due back in 14 days.`, 'success');
  
  // Refresh current view
  if (document.getElementById('search').classList.contains('active')) {
    renderBooks();
  } else if (document.getElementById('dashboard').classList.contains('active')) {
    renderDashboard();
  }
}

function renewBook(borrowId) {
  const borrowRecord = userData.borrowedBooks.find(b => b.id === borrowId);
  if (borrowRecord) {
    // Extend due date by 7 days
    const currentDue = new Date(borrowRecord.dueDate);
    currentDue.setDate(currentDue.getDate() + 7);
    borrowRecord.dueDate = currentDue.toISOString().split('T')[0];
    
    showToast('Book renewed successfully! Extended for 7 more days.', 'success');
    
    // Refresh borrowed books view if active
    if (document.getElementById('borrowed').classList.contains('active')) {
      renderBorrowedBooks();
    } else if (document.getElementById('dashboard').classList.contains('active')) {
      renderDashboardBorrowedBooks();
    }
  }
}

function returnBook(borrowId) {
  const borrowRecord = userData.borrowedBooks.find(b => b.id === borrowId);
  if (borrowRecord) {
    borrowRecord.returned = true;
    
    // Update book availability
    const book = userData.books.find(b => b.id === borrowRecord.bookId);
    book.copiesAvailable += 1;
    book.available = true;
    
    // Update current user stats
    currentUser.booksCurrently -= 1;
    currentUser.totalBorrowed += 1;
    currentUser.xpPoints += 20; // Award more XP for returning on time
    
    // Update UI
    const navBadge = document.querySelector('#borrowedNav .nav-badge');
    if (navBadge) {
      navBadge.textContent = currentUser.booksCurrently;
    }
    
    showToast(`"${book.title}" returned successfully! +20 XP earned.`, 'success');
    
    // Refresh views
    if (document.getElementById('borrowed').classList.contains('active')) {
      renderBorrowedBooks();
    } else if (document.getElementById('dashboard').classList.contains('active')) {
      renderDashboard();
    }
  }
}

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  
  if (body.getAttribute('data-color-scheme') === 'dark') {
    body.setAttribute('data-color-scheme', 'light');
    themeIcon.className = 'fas fa-moon';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-color-scheme', 'dark');
    themeIcon.className = 'fas fa-sun';
    localStorage.setItem('theme', 'dark');
  }
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  
  // Reset form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.reset();
  }
  
  // Show login page
  const mainApp = document.getElementById('mainApp');
  const loginPage = document.getElementById('loginPage');
  
  mainApp.classList.add('hidden');
  loginPage.classList.remove('hidden');
  
  showToast('Logged out successfully! Thank you for using NBKRIST Library.', 'success');
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = toast.querySelector('.toast-message');
  const toastIcon = toast.querySelector('i');
  
  if (toastMessage) toastMessage.textContent = message;
  
  // Update icon and color based on type
  if (type === 'error') {
    if (toastIcon) toastIcon.className = 'fas fa-exclamation-circle';
    toast.style.background = 'var(--color-error)';
  } else {
    if (toastIcon) toastIcon.className = 'fas fa-check-circle';
    toast.style.background = 'var(--color-success)';
  }
  
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}

// Make functions globally available
window.borrowBook = borrowBook;
window.renewBook = renewBook;
window.returnBook = returnBook;
window.navigateToPage = navigateToPage;