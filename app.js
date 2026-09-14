/**
 * Tithi Devathai Calculator
 * Created for REKHA THE TAROT QUEEN
 */

// Theme Management
const THEME_KEY = "tithi_theme";

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    if (theme === "dark") {
      themeBtn.innerHTML = `
        <svg class="icon icon-stroke" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        <span>Light Mode</span>
      `;
      themeBtn.setAttribute("aria-label", "Switch to Light Mode");
    } else {
      themeBtn.innerHTML = `
        <svg class="icon icon-stroke" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        <span>Dark Mode</span>
      `;
      themeBtn.setAttribute("aria-label", "Switch to Dark Mode");
    }
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

// Set initial theme immediately before DOM content loads to avoid FOUC
(function initThemeImmediately() {
  const theme = getPreferredTheme();
  document.documentElement.setAttribute("data-theme", theme);
})();

// Data Constants
const tithiNames = [
  "Pratipada / பிரதமை",
  "Dwitiya / துவிதியை",
  "Tritiya / திருதியை",
  "Chaturthi / சதுர்த்தி",
  "Panchami / பஞ்சமி",
  "Shashthi / ஷஷ்டி",
  "Saptami / சப்தமி",
  "Ashtami / அஷ்டமி",
  "Navami / நவமி",
  "Dashami / தசமி",
  "Ekadashi / ஏகாதசி",
  "Dwadashi / துவாதசி",
  "Trayodashi / திரயோதசி",
  "Chaturdashi / சதுர்த்தசி",
  "Poornima / Amavasya"
];

const krishna = [
  ["Kameshvari", "ஸ்ரீ காமேஸ்வரி நித்யா"],
  ["Bhagamalini", "ஸ்ரீ பகமாலினி நித்யா"],
  ["Nityaklinna", "ஸ்ரீ நித்யக்லின்னா நித்யா"],
  ["Bherunda", "ஸ்ரீ பேருண்டா நித்யா"],
  ["Vahnivasini", "ஸ்ரீ வஹ்னிவாசினி நித்யா"],
  ["Maha Vajreshvari", "ஸ்ரீ மஹா வஜ்ரேஸ்வரி நித்யா"],
  ["Shivaduti", "ஸ்ரீ சிவதூதி நித்யா"],
  ["Tvarita", "ஸ்ரீ த்வரிதா நித்யா"],
  ["Kulasundari", "ஸ்ரீ குலசுந்தரி நித்யா"],
  ["Nitya", "ஸ்ரீ நித்யா தேவி"],
  ["Nilapataka", "ஸ்ரீ நீலபதாகா நித்யா"],
  ["Vijaya", "ஸ்ரீ விஜயா நித்யா"],
  ["Sarvamangala", "ஸ்ரீ சர்வமங்களா நித்யா"],
  ["Jwalamalini", "ஸ்ரீ ஜ்வாலாமாலினி நித்யா"],
  ["Maha Tripura Sundari", "ஸ்ரீ மஹா திரிபுரசுந்தரி"]
];

const shukla = [
  ["Chitra", "ஸ்ரீ சித்ரா நித்யா"],
  ["Jwalamalini", "ஸ்ரீ ஜ்வாலாமாலினி நித்யா"],
  ["Sarvamangala", "ஸ்ரீ சர்வமங்களா நித்யா"],
  ["Vijaya", "ஸ்ரீ விஜயா நித்யா"],
  ["Nilapataka", "ஸ்ரீ நீலபதாகா நித்யா"],
  ["Nitya", "ஸ்ரீ நித்யா தேவி"],
  ["Kulasundari", "ஸ்ரீ குலசுந்தரி நித்யா"],
  ["Tvarita", "ஸ்ரீ த்வரிதா நித்யா"],
  ["Shivaduti", "ஸ்ரீ சிவதூதி நித்யா"],
  ["Maha Vajreshvari", "ஸ்ரீ மஹா வஜ்ரேஸ்வரி நித்யா"],
  ["Vahnivasini", "ஸ்ரீ வஹ்னிவாசினி நித்யா"],
  ["Bherunda", "ஸ்ரீ பேருண்டா நித்யா"],
  ["Nityaklinna", "ஸ்ரீ நித்யக்லின்னா நித்யா"],
  ["Bhagamalini", "ஸ்ரீ பகமாலினி நித்யா"],
  ["Maha Tripura Sundari", "ஸ்ரீ மஹா திரிபுரசுந்தரி"]
];

const meanings = {
  "Kameshvari": "Associated with divine desire, attraction, fulfilment and auspicious beginnings.",
  "Bhagamalini": "Associated with creative Shakti, abundance, nurturing and life-force.",
  "Nityaklinna": "Associated with devotion, compassion and inner surrender.",
  "Bherunda": "Associated with courage, protection and transformative strength.",
  "Vahnivasini": "Associated with purification, vitality and spiritual illumination.",
  "Maha Vajreshvari": "Associated with firmness, prosperity and protection.",
  "Shivaduti": "Associated with fearless transformation and removal of negativity.",
  "Tvarita": "Associated with swiftness, movement and overcoming delay.",
  "Kulasundari": "Associated with knowledge, refinement and higher wisdom.",
  "Nitya": "Associated with steadiness, focus and continuity.",
  "Nilapataka": "Associated with victory over obstacles and discipline.",
  "Vijaya": "Associated with success, achievement and progress.",
  "Sarvamangala": "Associated with auspiciousness, harmony and prosperity.",
  "Jwalamalini": "Associated with fiery transformation and clearing obstacles.",
  "Chitra": "Associated with beauty, creativity and clarity.",
  "Maha Tripura Sundari": "Represents fullness, completeness and the supreme Lalita principle."
};

// Custom Calendar Engine
let calendarState = {
  selectedDate: null,
  viewYear: new Date().getFullYear(),
  viewMonth: new Date().getMonth()
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function initCustomCalendar() {
  const popover = document.getElementById("calendarPopover");
  const dobInput = document.getElementById("dob");
  const dobWrapper = document.getElementById("dobWrapper");

  if (!popover || !dobInput || !dobWrapper) return;

  let yearsOptions = "";
  const currentYr = new Date().getFullYear();
  for (let y = currentYr; y >= 1900; y--) {
    yearsOptions += `<option value="${y}">${y}</option>`;
  }

  let monthsOptions = "";
  MONTH_NAMES.forEach((m, idx) => {
    monthsOptions += `<option value="${idx}">${m}</option>`;
  });

  popover.innerHTML = `
    <div class="calendar-header">
      <button id="calPrevBtn" class="calendar-nav-btn" type="button" aria-label="Previous Month">
        <svg class="icon icon-stroke" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <div class="calendar-selects">
        <select id="calMonthSelect">${monthsOptions}</select>
        <select id="calYearSelect">${yearsOptions}</select>
      </div>
      <button id="calNextBtn" class="calendar-nav-btn" type="button" aria-label="Next Month">
        <svg class="icon icon-stroke" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
    <div class="calendar-weekdays">
      ${WEEKDAY_NAMES.map(w => `<div>${w}</div>`).join('')}
    </div>
    <div id="calDaysGrid" class="calendar-days"></div>
    <div class="calendar-footer">
      <button id="calClearBtn" class="calendar-btn-link" type="button">Clear</button>
      <button id="calTodayBtn" class="calendar-btn-link" type="button">Today</button>
    </div>
  `;

  const monthSelect = document.getElementById("calMonthSelect");
  const yearSelect = document.getElementById("calYearSelect");
  const prevBtn = document.getElementById("calPrevBtn");
  const nextBtn = document.getElementById("calNextBtn");
  const clearBtn = document.getElementById("calClearBtn");
  const todayBtn = document.getElementById("calTodayBtn");

  monthSelect.addEventListener("change", (e) => {
    calendarState.viewMonth = parseInt(e.target.value, 10);
    renderCalendarDays();
  });

  yearSelect.addEventListener("change", (e) => {
    calendarState.viewYear = parseInt(e.target.value, 10);
    renderCalendarDays();
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (calendarState.viewMonth === 0) {
      calendarState.viewMonth = 11;
      calendarState.viewYear--;
    } else {
      calendarState.viewMonth--;
    }
    syncCalendarSelects();
    renderCalendarDays();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (calendarState.viewMonth === 11) {
      calendarState.viewMonth = 0;
      calendarState.viewYear++;
    } else {
      calendarState.viewMonth++;
    }
    syncCalendarSelects();
    renderCalendarDays();
  });

  clearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dobInput.value = "";
    calendarState.selectedDate = null;
    popover.classList.remove("active");
    dobWrapper.classList.remove("active");
    clearFieldError("dob", "dobError");
  });

  todayBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const today = new Date();
    selectCalendarDate(today.getFullYear(), today.getMonth(), today.getDate());
  });

  const togglePopover = (e) => {
    e.stopPropagation();
    const isActive = popover.classList.contains("active");

    // Close timezone popover if active
    const tzPopover = document.getElementById("tzCustomPopover");
    const tzWrapper = document.getElementById("tzWrapper");
    if (tzPopover) tzPopover.classList.remove("active");
    if (tzWrapper) tzWrapper.classList.remove("active");

    if (!isActive) {
      if (dobInput.value) {
        const parts = dobInput.value.split("-");
        if (parts.length === 3) {
          const y = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10) - 1;
          const d = parseInt(parts[2], 10);
          if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            calendarState.viewYear = y;
            calendarState.viewMonth = m;
            calendarState.selectedDate = new Date(y, m, d);
          }
        }
      } else {
        calendarState.viewYear = 1995;
        calendarState.viewMonth = 0;
      }
      syncCalendarSelects();
      renderCalendarDays();
      popover.classList.add("active");
      dobWrapper.classList.add("active");
    } else {
      popover.classList.remove("active");
      dobWrapper.classList.remove("active");
    }
  };

  dobWrapper.addEventListener("click", togglePopover);

  document.addEventListener("click", (e) => {
    if (!popover.contains(e.target) && !dobWrapper.contains(e.target)) {
      popover.classList.remove("active");
      dobWrapper.classList.remove("active");
    }
  });
}

function syncCalendarSelects() {
  const monthSelect = document.getElementById("calMonthSelect");
  const yearSelect = document.getElementById("calYearSelect");
  if (monthSelect) monthSelect.value = calendarState.viewMonth;
  if (yearSelect) yearSelect.value = calendarState.viewYear;
}

function renderCalendarDays() {
  const grid = document.getElementById("calDaysGrid");
  if (!grid) return;

  const year = calendarState.viewYear;
  const month = calendarState.viewMonth;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  let html = "";

  for (let x = firstDayIndex; x > 0; x--) {
    html += `<div class="calendar-day-cell other-month">${prevMonthDays - x + 1}</div>`;
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = isCurrentMonth && today.getDate() === i;
    const isSelected = calendarState.selectedDate &&
      calendarState.selectedDate.getFullYear() === year &&
      calendarState.selectedDate.getMonth() === month &&
      calendarState.selectedDate.getDate() === i;

    let classes = "calendar-day-cell";
    if (isToday) classes += " today";
    if (isSelected) classes += " selected";

    html += `<div class="${classes}" data-day="${i}">${i}</div>`;
  }

  const totalCells = firstDayIndex + daysInMonth;
  const nextDays = (totalCells > 35 ? 42 : 35) - totalCells;
  for (let j = 1; j <= nextDays; j++) {
    html += `<div class="calendar-day-cell other-month">${j}</div>`;
  }

  grid.innerHTML = html;

  const dayCells = grid.querySelectorAll(".calendar-day-cell:not(.other-month)");
  dayCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      e.stopPropagation();
      const day = parseInt(cell.getAttribute("data-day"), 10);
      selectCalendarDate(year, month, day);
    });
  });
}

function selectCalendarDate(year, month, day) {
  const dobInput = document.getElementById("dob");
  const popover = document.getElementById("calendarPopover");
  const dobWrapper = document.getElementById("dobWrapper");

  const formattedMonth = String(month + 1).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  if (dobInput) {
    dobInput.value = formattedDate;
  }
  calendarState.selectedDate = new Date(year, month, day);

  clearFieldError("dob", "dobError");

  if (popover) popover.classList.remove("active");
  if (dobWrapper) dobWrapper.classList.remove("active");
}

// Custom Timezone Component Engine
const TIMEZONE_OPTIONS = [
  { value: "Asia/Kolkata", label: "India — Asia/Kolkata" },
  { value: "Europe/London", label: "United Kingdom — Europe/London" },
  { value: "Asia/Colombo", label: "Sri Lanka — Asia/Colombo" },
  { value: "Asia/Singapore", label: "Singapore — Asia/Singapore" },
  { value: "Asia/Kuala_Lumpur", label: "Malaysia — Asia/Kuala_Lumpur" },
  { value: "Asia/Dubai", label: "UAE — Asia/Dubai" },
  { value: "America/New_York", label: "USA Eastern — America/New_York" },
  { value: "America/Chicago", label: "USA Central — America/Chicago" },
  { value: "America/Denver", label: "USA Mountain — America/Denver" },
  { value: "America/Los_Angeles", label: "USA Pacific — America/Los_Angeles" },
  { value: "Australia/Sydney", label: "Australia — Australia/Sydney" },
  { value: "custom", label: "Other / Custom Time Zone" }
];

function initCustomTimezoneDropdown() {
  const popover = document.getElementById("tzCustomPopover");
  const wrapper = document.getElementById("tzWrapper");
  const hiddenInput = document.getElementById("tz");
  const displayInput = document.getElementById("tzSelectInput");
  const customGroup = document.getElementById("customTzGroup");

  if (!popover || !wrapper || !hiddenInput || !displayInput) return;

  popover.innerHTML = `
    <div class="tz-search-box">
      <svg class="icon icon-stroke" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input id="tzSearchInput" type="text" placeholder="Search time zone or country...">
    </div>
    <div id="tzOptionsList" class="tz-options-list"></div>
  `;

  const searchInput = document.getElementById("tzSearchInput");
  const optionsList = document.getElementById("tzOptionsList");

  const defaultOpt = TIMEZONE_OPTIONS.find(o => o.value === hiddenInput.value) || TIMEZONE_OPTIONS[0];
  displayInput.value = defaultOpt.label;

  const renderOptions = (filterText = "") => {
    const query = filterText.toLowerCase().trim();
    const filtered = TIMEZONE_OPTIONS.filter(o => o.label.toLowerCase().includes(query) || o.value.toLowerCase().includes(query));

    if (filtered.length === 0) {
      optionsList.innerHTML = `<div style="padding: 12px; font-size: 13px; color: var(--ink-muted); text-align: center;">No time zones match "${filterText}"</div>`;
      return;
    }

    optionsList.innerHTML = filtered.map(opt => {
      const isSel = opt.value === hiddenInput.value;
      return `
        <div class="tz-option-item ${isSel ? 'selected' : ''}" data-value="${opt.value}" data-label="${opt.label}">
          <span>${opt.label}</span>
          ${isSel ? '<svg class="icon icon-stroke" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
        </div>
      `;
    }).join("");

    optionsList.querySelectorAll(".tz-option-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const val = item.getAttribute("data-value");
        const lbl = item.getAttribute("data-label");

        hiddenInput.value = val;
        displayInput.value = lbl;

        if (val === "custom") {
          if (customGroup) customGroup.classList.remove("hidden");
        } else {
          if (customGroup) customGroup.classList.add("hidden");
        }

        clearFieldError("tz", "tzError");
        popover.classList.remove("active");
        wrapper.classList.remove("active");
      });
    });
  };

  renderOptions();

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderOptions(e.target.value);
    });
    searchInput.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  const toggleTzPopover = (e) => {
    e.stopPropagation();
    const isActive = popover.classList.contains("active");

    // Close calendar if active
    const calPopover = document.getElementById("calendarPopover");
    const dobWrapper = document.getElementById("dobWrapper");
    if (calPopover) calPopover.classList.remove("active");
    if (dobWrapper) dobWrapper.classList.remove("active");

    if (!isActive) {
      if (searchInput) searchInput.value = "";
      renderOptions();
      popover.classList.add("active");
      wrapper.classList.add("active");
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    } else {
      popover.classList.remove("active");
      wrapper.classList.remove("active");
    }
  };

  wrapper.addEventListener("click", toggleTzPopover);

  document.addEventListener("click", (e) => {
    if (!popover.contains(e.target) && !wrapper.contains(e.target)) {
      popover.classList.remove("active");
      wrapper.classList.remove("active");
    }
  });
}

/**
 * Get active time zone string from select or custom field
 */
function getTimezone() {
  const hiddenInput = document.getElementById("tz");
  if (!hiddenInput) return "";
  const selectValue = hiddenInput.value;
  if (selectValue === "custom") {
    const customInput = document.getElementById("customTz");
    return customInput ? customInput.value.trim() : "";
  }
  return selectValue;
}

/**
 * Clear all field level and global alert errors
 */
function clearErrors() {
  const errorWrappers = document.querySelectorAll(".input-wrapper.has-error");
  errorWrappers.forEach((w) => w.classList.remove("has-error"));

  const errorMsgs = document.querySelectorAll(".error-msg");
  errorMsgs.forEach((m) => {
    m.classList.remove("visible");
    m.innerHTML = "";
  });

  const globalAlert = document.getElementById("globalAlert");
  if (globalAlert) {
    globalAlert.classList.add("hidden");
    globalAlert.innerHTML = "";
  }
}

function clearFieldError(inputId, errorMsgId) {
  const input = document.getElementById(inputId);
  const errorMsg = document.getElementById(errorMsgId);
  if (input) {
    const wrapper = input.closest(".input-wrapper");
    if (wrapper) wrapper.classList.remove("has-error");
  }
  if (errorMsg) {
    errorMsg.classList.remove("visible");
    errorMsg.innerHTML = "";
  }
}

/**
 * Show field-level error and highlight input wrapper
 */
function showFieldError(inputId, errorMsgId, message) {
  const input = document.getElementById(inputId);
  const errorMsg = document.getElementById(errorMsgId);

  if (input) {
    const wrapper = input.closest(".input-wrapper");
    if (wrapper) wrapper.classList.add("has-error");
  }

  if (errorMsg) {
    errorMsg.innerHTML = `
      <svg class="icon icon-stroke" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span>${message}</span>
    `;
    errorMsg.classList.add("visible");
  }
}

/**
 * Show system-wide banner alert
 */
function showBannerAlert(message) {
  const globalAlert = document.getElementById("globalAlert");
  if (globalAlert) {
    globalAlert.innerHTML = `
      <svg class="icon icon-stroke" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span>${message}</span>
    `;
    globalAlert.classList.remove("hidden");
    globalAlert.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/**
 * Smoothly scroll to and focus first invalid field
 */
function focusFirstErrorField(firstInvalidInput) {
  if (firstInvalidInput) {
    firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      if (firstInvalidInput.id === "dob") {
        const popover = document.getElementById("calendarPopover");
        const dobWrapper = document.getElementById("dobWrapper");
        if (popover && dobWrapper) {
          popover.classList.add("active");
          dobWrapper.classList.add("active");
        }
      } else if (firstInvalidInput.id === "tzSelectInput" || firstInvalidInput.id === "tz") {
        const popover = document.getElementById("tzCustomPopover");
        const tzWrapper = document.getElementById("tzWrapper");
        if (popover && tzWrapper) {
          popover.classList.add("active");
          tzWrapper.classList.add("active");
        }
      } else {
        firstInvalidInput.focus();
        if (typeof firstInvalidInput.showPicker === "function" && firstInvalidInput.type === "time") {
          try {
            firstInvalidInput.showPicker();
          } catch (e) {}
        }
      }
    }, 350);
  }
}

/**
 * Perform Astronomical Moon Phase & Tithi Devathai Calculation
 */
function calculateTithi() {
  clearErrors();

  const dobInput = document.getElementById("dob");
  const tobInput = document.getElementById("tob");
  const tzHiddenInput = document.getElementById("tz");
  const tzSelectInput = document.getElementById("tzSelectInput");
  const customTzInput = document.getElementById("customTz");

  let firstInvalid = null;

  // Validate Date of Birth
  if (!dobInput || !dobInput.value) {
    showFieldError("dob", "dobError", "Please select your date of birth / பிறந்த தேதியை உள்ளிடவும்");
    firstInvalid = firstInvalid || dobInput;
  }

  // Validate Birth Time
  if (!tobInput || !tobInput.value) {
    showFieldError("tob", "tobError", "Please enter your birth time / பிறந்த நேரத்தை உள்ளிடவும்");
    firstInvalid = firstInvalid || tobInput;
  }

  // Validate Timezone
  if (!tzHiddenInput || !tzHiddenInput.value) {
    showFieldError("tzSelectInput", "tzError", "Please select a time zone / நேர மண்டலத்தை தேர்ந்தெடுக்கவும்");
    firstInvalid = firstInvalid || tzSelectInput;
  } else if (tzHiddenInput.value === "custom") {
    if (!customTzInput || !customTzInput.value.trim()) {
      showFieldError("customTz", "customTzError", "Please enter your custom time zone / தேவையான நேர மண்டலத்தை உள்ளிடவும்");
      firstInvalid = firstInvalid || customTzInput;
    }
  }

  if (firstInvalid) {
    focusFirstErrorField(firstInvalid);
    return;
  }

  const dob = dobInput.value;
  const tob = tobInput.value;
  const tz = getTimezone();

  if (typeof luxon === "undefined" || !luxon.DateTime) {
    showBannerAlert("Timezone parsing library (Luxon) is still loading. Please check your internet connection.");
    return;
  }

  const { DateTime } = luxon;
  const dt = DateTime.fromISO(`${dob}T${tob}`, { zone: tz });

  if (!dt.isValid) {
    showFieldError("dob", "dobError", "Invalid birth date, time or timezone format.");
    showFieldError("tob", "tobError", "Please check your birth date and time.");
    focusFirstErrorField(dobInput);
    return;
  }

  if (typeof Astronomy === "undefined" || !Astronomy.MoonPhase) {
    showBannerAlert("Astronomy library is still loading. Please check your internet connection.");
    return;
  }

  // Calculate moon phase angle in degrees (0 to 360)
  let phase = Astronomy.MoonPhase(dt.toUTC().toJSDate());
  phase = ((phase % 360) + 360) % 360;

  const isShukla = phase < 180;
  const within = isShukla ? phase : phase - 180;
  
  let num = Math.floor(within / 12) + 1;
  num = Math.max(1, Math.min(15, num));

  const map = isShukla ? shukla : krishna;
  const devi = map[num - 1];

  // Update DOM Elements
  document.getElementById("devName").textContent = devi[0];
  document.getElementById("devTamil").textContent = devi[1];
  document.getElementById("paksha").textContent = isShukla ? "Shukla Paksha / வளர்பிறை" : "Krishna Paksha / தேய்பிறை";
  document.getElementById("tithi").textContent = `${num}. ${num === 15 ? (isShukla ? "Poornima / பௌர்ணமி" : "Amavasya / அமாவாசை") : tithiNames[num - 1]}`;
  document.getElementById("angle").textContent = `${phase.toFixed(2)}°`;
  
  document.getElementById("meaning").innerHTML = `<strong>Simple meaning:</strong> ${meanings[devi[0]] || ""}`;
  document.getElementById("sourceNote").innerHTML = num === 15 
    ? "<strong>Tradition note:</strong> This calculator follows a mapping in which Poornima/Amavasya are assigned to Maha Tripura Sundari. Other Sri Vidya lineages may present the 15th association differently."
    : "<strong>Tradition note:</strong> This result follows the Krishna/Shukla Paksha Nitya Devi mapping used in this calculator.";

  const resultContainer = document.getElementById("result");
  resultContainer.style.display = "block";
  resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Initialize Nitya Devi reference mapping table
 */
function initMappingTable() {
  const mapTable = document.getElementById("mapTable");
  if (!mapTable) return;
  
  let tableRows = "";
  for (let i = 0; i < 15; i++) {
    const tithiText = i === 14 ? "15. Poornima / Amavasya" : `${i + 1}. ${tithiNames[i]}`;
    tableRows += `<tr><td>${tithiText}</td><td>${krishna[i][0]}</td><td>${shukla[i][0]}</td></tr>`;
  }
  mapTable.innerHTML = tableRows;
}

/**
 * Bind custom picker triggers on input wrapper click
 */
function bindCustomPickerTriggers() {
  const tobInput = document.getElementById("tob");
  if (!tobInput) return;
  const wrapper = tobInput.closest(".input-wrapper");

  const triggerPicker = (e) => {
    if (typeof tobInput.showPicker === "function") {
      try {
        tobInput.showPicker();
      } catch (err) {
        tobInput.focus();
      }
    } else {
      tobInput.focus();
    }
  };

  if (wrapper) {
    wrapper.addEventListener("click", triggerPicker);
  }
  tobInput.addEventListener("click", triggerPicker);
}

/**
 * Real-time error clearing on user input
 */
function bindRealtimeErrorClearing() {
  const fields = [
    { inputId: "tob", errorMsgId: "tobError" },
    { inputId: "customTz", errorMsgId: "customTzError" }
  ];

  fields.forEach(({ inputId, errorMsgId }) => {
    const input = document.getElementById(inputId);
    const errorMsg = document.getElementById(errorMsgId);
    if (!input) return;

    const clearThisError = () => {
      const wrapper = input.closest(".input-wrapper");
      if (wrapper) wrapper.classList.remove("has-error");
      if (errorMsg) {
        errorMsg.classList.remove("visible");
        errorMsg.innerHTML = "";
      }
    };

    input.addEventListener("input", clearThisError);
    input.addEventListener("change", clearThisError);
  });
}

// Bind events on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  setTheme(getPreferredTheme());
  initMappingTable();
  initCustomCalendar();
  initCustomTimezoneDropdown();
  bindCustomPickerTriggers();
  bindRealtimeErrorClearing();
  
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }
  
  const calcBtn = document.getElementById("calcBtn");
  if (calcBtn) {
    calcBtn.addEventListener("click", calculateTithi);
  }
});
