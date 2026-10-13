* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #0b0b0d;
  color: #f5f5f5;
}

img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
button, input, textarea, select { font: inherit; }

:root {
  --bg: #0d0d0f;
  --panel: #15161a;
  --panel-alt: #1d1f24;
  --line: rgba(255,255,255,0.08);
  --text: #f5f5f5;
  --muted: #a6abb5;
  --accent: #ff6a00;
  --accent-soft: #ff7f32;
  --danger: #ff4d4f;
  --success: #33c88c;
}

.page-shell, .admin-shell, .auth-shell {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
  padding: 24px 0 72px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 20px 0 26px;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), var(--accent-soft));
  color: #fff;
  font-weight: 800;
}

.brand-title {
  font-size: 1.2rem;
  font-weight: 800;
}

.brand-subtitle {
  font-size: 0.75rem;
  color: var(--muted);
}

.main-nav {
  display: flex;
  gap: 22px;
  color: var(--muted);
}

.main-nav a:hover { color: var(--text); }

.btn {
  border: none;
  border-radius: 12px;
  padding: 0.9rem 1.4rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn:hover { transform: translateY(-1px); }

.btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-soft));
  color: #fff;
}

.btn-secondary {
  background: #1d1f24;
  border: 1px solid var(--line);
  color: var(--text);
}

.btn-full { width: 100%; }

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(24px, 4vw, 60px);
  align-items: center;
  padding: 50px 0 20px;
}

.eyebrow {
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--accent-soft);
  font-size: 0.72rem;
  font-weight: 700;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 1.04;
  letter-spacing: -0.06em;
}

.lead {
  margin: 18px 0 0;
  max-width: 640px;
  color: var(--muted);
  font-size: 1.12rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.hero-panel {
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  border-radius: 26px;
  padding: 14px;
  border: 1px solid var(--line);
}

.hero-image {
  min-height: 460px;
  border-radius: 20px;
  background-image: url("https://images.unsplash.com/photo-1558980664-10e7170b5df9?auto=format&fit=crop&w=1200&q=80");
  background-size: cover;
  background-position: center;
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-top: 14px;
  color: var(--muted);
  flex-wrap: wrap;
}

.benefits, .service-grid, .gallery-grid, .admin-grid, .booking-layout {
  display: grid;
  gap: 22px;
}

.benefits {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 36px;
}

.benefit-card, .service-card, .panel, .contact-card, .booking-rules, .booking-form, .auth-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 24px;
}

.benefit-card h3, .service-card h3, .panel h2 { margin-top: 0; }

.benefit-card p, .service-card p, .panel p, .contact-list, .booking-rules p, .booking-rules li {
  color: var(--muted);
  line-height: 1.7;
}

.section-block { padding-top: 76px; }

.section-heading {
  margin-bottom: 24px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.service-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }

.service-card { transition: transform 0.2s ease, border-color 0.2s ease; }
.service-card:hover { transform: translateY(-4px); border-color: rgba(255,106,0,0.5); }

.service-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(255,106,0,0.12);
  color: var(--accent-soft);
  font-size: 1.2rem;
  margin-bottom: 18px;
}

.service-price {
  display: inline-block;
  margin-top: 18px;
  color: var(--text);
  font-weight: 700;
}

.gallery-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }

.gallery-item {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  overflow: hidden;
  border-radius: 20px;
  min-height: 240px;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  filter: saturate(1.1) contrast(1.03);
}

.gallery-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 4px;
  min-height: 120px;
  padding: 18px;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,0.7));
  color: #fff;
}

.booking-wrap { padding-bottom: 16px; }
.booking-layout { grid-template-columns: 0.9fr 1.1fr; }

.rule-headline {
  margin-top: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
}

.booking-rules ul {
  margin-top: 18px;
  padding-left: 18px;
  color: var(--muted);
}

.booking-form { width: 100%; }
.input-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}
label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 0.92rem;
}

input, textarea, select {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(255,255,255,0.02);
  color: var(--text);
  padding: 0.9rem 1rem;
}

textarea { resize: vertical; min-height: 120px; }

.checkbox-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--text);
}
.checkbox-row input {
  width: 18px;
  height: 18px;
  margin-top: 2px;
}

.form-status {
  margin-top: 18px;
  color: var(--success);
  font-weight: 600;
}
.form-status.error { color: var(--danger); }

.contact-section { padding-top: 76px; }
.contact-card { max-width: 760px; }
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 72px;
  padding: 28px 0 12px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  flex-wrap: wrap;
}

.site-footer > div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.82);
  display: grid;
  place-items: center;
  padding: 24px;
  z-index: 50;
}

.image-modal img {
  max-width: min(900px, 100%);
  max-height: 90vh;
  border-radius: 16px;
}

.auth-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
}

.auth-card {
  width: min(460px, 100%);
}

.admin-shell {
  padding-top: 34px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  gap: 22px;
  align-items: center;
  margin-bottom: 26px;
}

.admin-header h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.admin-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
  margin-bottom: 28px;
}

.stat-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 20px;
  display: grid;
  gap: 8px;
}

.stat-card span { color: var(--muted); }
.stat-card strong { font-size: 2rem; }

.admin-grid {
  grid-template-columns: 1.15fr 0.85fr;
  margin-top: 18px;
}

.stack-list {
  display: grid;
  gap: 16px;
}

.booking-admin-card, .mini-editor, .gallery-editor-item {
  background: rgba(255,255,255,0.01);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
}

.booking-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

.status-badge {
  display: inline-flex;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.75rem;
  text-transform: capitalize;
  background: rgba(255,255,255,0.08);
}
.status-pending { background: rgba(255, 153, 0, 0.15); color: #ffb15d; }
.status-approved { background: rgba(51, 200, 140, 0.15); color: #7be6b0; }
.status-rejected { background: rgba(255, 77, 79, 0.15); color: #ff9192; }
.status-completed { background: rgba(76, 113, 255, 0.15); color: #9ab0ff; }

.inline-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.add-form {
  display: grid;
  gap: 12px;
  margin-bottom: 18px;
}

.gallery-editor-item {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 16px;
  align-items: center;
}

.gallery-editor-item img {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 12px;
}

.empty-state {
  padding: 30px;
  border-radius: 18px;
  border: 1px dashed var(--line);
  color: var(--muted);
}

@media (max-width: 900px) {
  .hero, .booking-layout, .admin-grid, .benefits, .service-grid, .gallery-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-wrap: wrap;
  }

  .main-nav {
    order: 3;
    width: 100%;
    justify-content: space-between;
  }

  .input-grid {
    grid-template-columns: 1fr;
  }

  .admin-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .page-shell, .admin-shell, .auth-shell {
    width: min(100% - 24px, 1200px);
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  .main-nav {
    display: none;
  }

  .admin-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .admin-stats {
    grid-template-columns: 1fr;
  }
}
