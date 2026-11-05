document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Navbar scroll background change
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active Nav Link Spy
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // 3D Tilt on Mouse Move
  const tiltWrap = document.querySelector('.lt3d-wrap');
  const tiltShell = document.querySelector('.lt3d-shell');
  if (tiltWrap && tiltShell && window.innerWidth > 960) {
    const defaultX = 12;
    const defaultY = -14;

    tiltWrap.addEventListener('mousemove', (e) => {
      const rect = tiltWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotX = defaultX - y * 18;
      const rotY = defaultY + x * 22;
      tiltShell.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    tiltWrap.addEventListener('mouseleave', () => {
      tiltShell.style.transform = `rotateX(${defaultX}deg) rotateY(${defaultY}deg)`;
    });
  }

  // Interactive Code Typing Carousel
  const codeFiles = [
    {
      name: "estate_property.py",
      lang: "Odoo 19 Model",
      code: [
        { type: "kw", text: "from" }, { type: "vv", text: " odoo " }, { type: "kw", text: "import" }, { type: "vv", text: " models, fields, api\n" },
        { type: "cm", text: "# Estate Management Module - Odoo 19\n" },
        { type: "kw", text: "class" }, { type: "fn", text: " EstateProperty" }, { type: "vv", text: "(models.Model):\n" },
        { type: "vv", text: "    _name = " }, { type: "str", text: "'estate.property'\n" },
        { type: "vv", text: "    _description = " }, { type: "str", text: "'Real Estate Property'\n" },
        { type: "vv", text: "    name = fields.Char(" }, { type: "str", text: "'Title'" }, { type: "vv", text: ", required=" }, { type: "kw", text: "True" }, { type: "vv", text: ")\n" },
        { type: "vv", text: "    expected_price = fields.Float(" }, { type: "str", text: "'Expected Price'" }, { type: "vv", text: ")\n" },
        { type: "vv", text: "    best_price = fields.Float(compute=" }, { type: "str", text: "'_compute_best_price'" }, { type: "vv", text: ")\n\n" },
        { type: "vv", text: "    @api.depends(" }, { type: "str", text: "'offer_ids.price'" }, { type: "vv", text: ")\n" },
        { type: "kw", text: "    def" }, { type: "fn", text: " _compute_best_price" }, { type: "vv", text: "(self):\n" },
        { type: "kw", text: "        for" }, { type: "vv", text: " record in self:\n" },
        { type: "vv", text: "            prices = record.offer_ids.mapped(" }, { type: "str", text: "'price'" }, { type: "vv", text: ")\n" },
        { type: "vv", text: "            record.best_price = max(prices) " }, { type: "kw", text: "if" }, { type: "vv", text: " prices " }, { type: "kw", text: "else" }, { type: "num", text: " 0.0" }
      ]
    },
    {
      name: "entry_test.py",
      lang: "NUTECH ERP",
      code: [
        { type: "kw", text: "class" }, { type: "fn", text: " EntryTestExam" }, { type: "vv", text: "(models.Model):\n" },
        { type: "cm", text: "# Automated Question Paper Generation\n" },
        { type: "vv", text: "    _name = " }, { type: "str", text: "'nutech.entry.test'\n" },
        { type: "kw", text: "    def" }, { type: "fn", text: " action_generate_paper" }, { type: "vv", text: "(self):\n" },
        { type: "vv", text: "        Question = self.env[" }, { type: "str", text: "'test.question.bank'" }, { type: "vv", text: "]\n" },
        { type: "vv", text: "        easy_q = Question.search([(" }, { type: "str", text: "'difficulty'" }, { type: "vv", text: ", " }, { type: "str", text: "'='" }, { type: "vv", text: ", " }, { type: "str", text: "'easy'" }, { type: "vv", text: ")], limit=20)\n" },
        { type: "vv", text: "        hard_q = Question.search([(" }, { type: "str", text: "'difficulty'" }, { type: "vv", text: ", " }, { type: "str", text: "'='" }, { type: "vv", text: ", " }, { type: "str", text: "'hard'" }, { type: "vv", text: ")], limit=10)\n" },
        { type: "vv", text: "        self.write({\n" },
        { type: "vv", text: "            " }, { type: "str", text: "'question_ids'" }, { type: "vv", text: ": [(" }, { type: "num", text: "6" }, { type: "vv", text: ", " }, { type: "num", text: "0" }, { type: "vv", text: ", (easy_q + hard_q).ids)],\n" },
        { type: "vv", text: "            " }, { type: "str", text: "'state'" }, { type: "vv", text: ": " }, { type: "str", text: "'generated'" }, { type: "vv", text: "\n        })" }
      ]
    },
    {
      name: "dashboard.js",
      lang: "OWL Component",
      code: [
        { type: "kw", text: "import" }, { type: "vv", text: " { Component, useState } " }, { type: "kw", text: "from" }, { type: "str", text: " '@odoo/owl'" }, { type: "vv", text: ";\n\n" },
        { type: "kw", text: "export class" }, { type: "fn", text: " EntryTestDashboard" }, { type: "kw", text: " extends" }, { type: "vv", text: " Component {\n" },
        { type: "vv", text: "    setup() {\n" },
        { type: "vv", text: "        this.state = useState({ halls: [], candidates: " }, { type: "num", text: "1250" }, { type: "vv", text: " });\n" },
        { type: "vv", text: "    }\n" },
        { type: "fn", text: "    formatCNIC" }, { type: "vv", text: "(value) {\n" },
        { type: "cm", text: "        // Custom Pakistani CNIC validation & format\n" },
        { type: "kw", text: "        return" }, { type: "vv", text: " value.replace(/^(\\d{5})(\\d{7})(\\d)$/, " }, { type: "str", text: "'$1-$2-$3'" }, { type: "vv", text: ");\n    }\n}" }
      ]
    }
  ];

  const codeFileName = document.querySelector('.lt3d-filename');
  const codeBadge = document.querySelector('.lt3d-badge');
  const codeContainer = document.querySelector('.lt3d-code');
  const lineNumbers = document.querySelector('.lt3d-lines');

  if (codeFileName && codeContainer && lineNumbers) {
    let fileIdx = 0;
    let tokenIdx = 0;
    let charIdx = 0;
    let currentHtml = '';

    function updateLineNumbers(html) {
      const lineCount = (html.match(/\n/g) || []).length + 1;
      let lines = '';
      for (let i = 1; i <= Math.max(lineCount, 8); i++) {
        lines += i + '\n';
      }
      lineNumbers.textContent = lines;
    }

    function typeCode() {
      const curFile = codeFiles[fileIdx];
      codeFileName.textContent = curFile.name;
      if (codeBadge) codeBadge.textContent = curFile.lang;

      if (tokenIdx < curFile.code.length) {
        const token = curFile.code[tokenIdx];
        const char = token.text[charIdx];

        if (char === '\n') {
          currentHtml += '\n';
        } else {
          const escaped = char === '<' ? '&lt;' : (char === '>' ? '&gt;' : char);
          currentHtml += `<span class="lt3d-${token.type}">${escaped}</span>`;
        }

        codeContainer.innerHTML = currentHtml + '<span class="lt3d-caret"></span>';
        updateLineNumbers(currentHtml);

        charIdx++;
        if (charIdx >= token.text.length) {
          tokenIdx++;
          charIdx = 0;
        }

        setTimeout(typeCode, 18);
      } else {
        setTimeout(() => {
          fileIdx = (fileIdx + 1) % codeFiles.length;
          tokenIdx = 0;
          charIdx = 0;
          currentHtml = '';
          codeContainer.innerHTML = '<span class="lt3d-caret"></span>';
          typeCode();
        }, 3200);
      }
    }

    typeCode();
  }

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Modals
  const projectData = {
    'smart-hire': {
      title: "Smart_Hire – AI-Enhanced Recruitment System | FYP",
      category: "AI & Full-Stack Platform",
      desc: "Developed an AI-powered recruitment platform designed to automate and streamline the hiring process. The system enables recruiters to manage job postings, applications, candidate profiles, and recruitment workflows while using AI-based techniques to assist with candidate evaluation and matching.",
      features: [
        "Web-based recruitment management system handling job postings and candidate applications.",
        "AI-assisted candidate screening and deep profile evaluation.",
        "Recruitment workflow and application tracking pipelines.",
        "Database-driven management of jobs, candidates, and multi-stage applications.",
        "Responsive, modern interface for both recruiters and applicants.",
        "Full backend logic integration with scalable PostgreSQL database."
      ],
      tech: ["Python", "Django/Flask", "Angular", "AI/ML", "PostgreSQL", "HTML5/CSS3"],
      github: "https://github.com/khojaabbas/Smart_Hire"
    },
    'estate-management': {
      title: "Estate Management Module – Odoo 19",
      category: "Odoo ERP Customization",
      desc: "Developed a comprehensive custom Estate Management module in Odoo 19 to manage real estate properties, property offers, and related business operations. Implemented custom Odoo models, fields, views, business logic, and workflows to create an efficient property management solution.",
      features: [
        "Custom Odoo models for properties, tags, property types, and offers.",
        "Property management including details, availability, pricing, and live status tracking.",
        "Offer management workflow handling offer acceptances and rejections with automated state changes.",
        "Custom XML views: Form, List, Search, and Kanban views with custom menus and actions.",
        "Computed fields, onchange methods, and constraints using Python and Odoo ORM API.",
        "Configured relational fields (Many2one, One2many) and access rights / security rules (ir.model.access.csv)."
      ],
      tech: ["Odoo 19", "Python", "Odoo ORM", "XML", "PostgreSQL", "JavaScript"],
      github: "https://github.com/usmanfazal2002"
    },
    'entry-test': {
      title: "Student Entry Test Management System – Odoo 19",
      category: "Enterprise ERP System",
      desc: "Engineered and customized an Odoo 19 Student Entry Test Management System for NUTECH, implementing custom models, automated workflows, form/list/kanban views, role-based access, and automated business processes.",
      features: [
        "Comprehensive question bank with subject/module and difficulty-level management (Easy, Medium, Hard).",
        "Teacher question submission pipeline with Admin review, approval, and rejection workflow.",
        "Automated question-paper generation with configurable difficulty distribution.",
        "Exam Scheduling: Test Time, Test Center, examination hall, and automated seat assignment functionality.",
        "Enhanced frontend UI using OWL/JavaScript, including custom CNIC formatting and phone-number validation.",
        "Interactive analytics dashboards and optimized data queries using Odoo ORM API."
      ],
      tech: ["Odoo 19", "Python", "OWL", "JavaScript", "PostgreSQL", "QWeb Reports"],
      github: "https://github.com/usmanfazal2002"
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalClose = document.querySelectorAll('.modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalTech = document.getElementById('modal-tech');
  const modalGithub = document.getElementById('modal-github');

  document.querySelectorAll('.project-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      const data = projectData[id];
      if (data && projectModal) {
        modalTitle.textContent = data.title;
        modalBadge.textContent = data.category;
        modalDesc.textContent = data.desc;

        modalFeatures.innerHTML = '';
        data.features.forEach(f => {
          const li = document.createElement('li');
          li.textContent = f;
          modalFeatures.appendChild(li);
        });

        modalTech.innerHTML = '';
        data.tech.forEach(t => {
          const span = document.createElement('span');
          span.className = 'tag-pill';
          span.textContent = t;
          modalTech.appendChild(span);
        });

        if (data.github) {
          modalGithub.href = data.github;
          modalGithub.style.display = 'inline-flex';
        } else {
          modalGithub.style.display = 'none';
        }

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Hire Me Modal
  const hireModal = document.getElementById('hire-modal');
  document.querySelectorAll('.open-hire-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (hireModal) {
        hireModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modals
  modalClose.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Toast Helper
  function showToast(message) {
    let toast = document.querySelector('.toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Contact Form Handler (Supports direct submission / Formspree)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusDiv = contactForm.querySelector('.form-status');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';

      // Fallback or formspree endpoint
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        statusDiv.className = 'form-status success';
        statusDiv.textContent = 'Thank you! Your message has been sent successfully. Usman will get back to you shortly.';
        contactForm.reset();
        showToast('Message sent successfully!');
      }, 700);
    });
  }

  // Quick Hire Form Handler
  const hireForm = document.getElementById('hire-form');
  if (hireForm) {
    hireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hireModal.classList.remove('active');
      document.body.style.overflow = '';
      showToast('Inquiry sent! Usman will contact you shortly.');
      hireForm.reset();
    });
  }
});
