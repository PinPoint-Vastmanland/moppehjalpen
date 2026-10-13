"use client";

import { useEffect, useState } from "react";

type Service = {
  id: string;
  name: string;
  description: string;
  price?: string | null;
  active: boolean;
};

type GalleryItem = {
  id: string;
  title: string;
  description?: string | null;
  beforeAfter: boolean;
  images: string[];
};

type Settings = {
  companyName?: string;
  email?: string;
  instagram?: string;
  tiktok?: string;
  phone?: string;
  address?: string;
  workArea?: string;
  openingHours?: string;
};

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [settings, setSettings] = useState<Settings>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/site-data")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
        setGallery(data.gallery || []);
        setSettings(data.settings || {});
      })
      .catch(() => {});
  }, []);

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">M</div>
          <div>
            <div className="brand-title">Moppehjälpen</div>
            <div className="brand-subtitle">Mopedservice & styling</div>
          </div>
        </div>

        <nav className="main-nav">
          <a href="#services">Tjänster</a>
          <a href="#gallery">Galleri</a>
          <a href="#booking">Boka</a>
          <a href="#contact">Kontakt</a>
        </nav>

        <a href="#booking" className="btn btn-primary">Boka en tid</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Moppehjälpen</p>
          <h1>Moppehjälpen – Vi hjälper dig med din moped.</h1>
          <p className="lead">
            Service, reparationer, felsökning och styling. Vi hjälper dig att hålla mopeden i toppskick.
          </p>
          <div className="hero-actions">
            <a href="#booking" className="btn btn-primary">Boka en tid</a>
            <a href="#contact" className="btn btn-secondary">Kontakta oss</a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-image" />
          <div className="hero-meta">
            <span>Service</span>
            <span>Reparation</span>
            <span>Felsökning</span>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="benefit-card">
          <h3>Personlig service</h3>
          <p>Du får direkt kontakt, tydlig feedback och en lösning som passar just din moped.</p>
        </div>
        <div className="benefit-card">
          <h3>Tydlig kommunikation</h3>
          <p>Vi förklarar vad som behöver göras och håller dig uppdaterad genom hela arbetet.</p>
        </div>
        <div className="benefit-card">
          <h3>Rimliga priser</h3>
          <p>Priser anpassas efter arbetets omfattning och behov, utan onödiga kostnader.</p>
        </div>
      </section>

      <section id="services" className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Tjänster</p>
          <h2>Hjälp för hela mopeden</h2>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.id}>
              <div className="service-icon">✦</div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <span className="service-price">{service.price || "Pris efter behov"}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Galleri</p>
          <h2>Före- och efterbilder</h2>
        </div>

        <div className="gallery-grid">
          {gallery.length === 0 ? (
            <div className="empty-state">Inga projekt har laddats upp ännu.</div>
          ) : (
            gallery.map((item) => (
              <button
                key={item.id}
                className="gallery-item"
                type="button"
                onClick={() => setSelectedImage(item.images[0])}
              >
                <img src={item.images[0]} alt={item.title} />
                <div className="gallery-overlay">
                  <span>{item.beforeAfter ? "Före & efter" : "Projekt"}</span>
                  <strong>{item.title}</strong>
                </div>
              </button>
            ))
          )}
        </div>
      </section>

      <section id="booking" className="section-block booking-wrap">
        <div className="section-heading">
          <p className="eyebrow">Bokning</p>
          <h2>Skicka in din bokningsförfrågan</h2>
        </div>

        <div className="booking-layout">
          <div className="booking-rules">
            <h3>Viktig information inför din bokade tid</h3>
            <p className="rule-headline">Kom i tid till din bokning!</p>
            <p>
              Vi ber dig att komma i tid till din bokade tid. Vid 10 minuters försening eller mer tillkommer en förseningsavgift på 200 kr.
            </p>
            <ul>
              <li>Alla bokningar är förfrågningar tills de har godkänts.</li>
              <li>Du kan bifoga bilder på problemet eller mopedens tillstånd.</li>
              <li>Vi återkommer så snart vi har sett din förfrågan.</li>
            </ul>
          </div>

          <BookingForm services={services} />
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-card">
          <p className="eyebrow">Kontakt</p>
          <h2>Kontakta Moppehjälpen</h2>
          <ul className="contact-list">
            <li><strong>Företag:</strong> Moppehjälpen</li>
            <li><strong>E-post:</strong> <a href="mailto:moppehjalpen@gmail.com">moppehjalpen@gmail.com</a></li>
            <li><strong>Instagram:</strong> <a href="https://instagram.com/moppehjalpen" target="_blank" rel="noreferrer">@moppehjalpen</a></li>
            <li><strong>TikTok:</strong> <a href="https://www.tiktok.com/@moppehjalpen" target="_blank" rel="noreferrer">@moppehjalpen</a></li>
            <li><strong>Telefon:</strong> {settings.phone || "Redigerbart i adminpanelen"}</li>
            <li><strong>Verksamhetens adress/arbetsområde:</strong> {settings.address || settings.workArea || "Redigerbart i adminpanelen"}</li>
            <li><strong>Öppettider:</strong> {settings.openingHours || "Redigerbart i adminpanelen"}</li>
          </ul>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>Moppehjälpen</strong>
          <p>Service, reparation, felsökning och styling för mopeder.</p>
        </div>
        <div>
          <a href="#">Integritetspolicy</a>
          <a href="#">Bokningsvillkor</a>
        </div>
        <div>
          <a href="mailto:moppehjalpen@gmail.com">moppehjalpen@gmail.com</a>
          <a href="https://instagram.com/moppehjalpen" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/@moppehjalpen" target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </footer>

      {selectedImage ? (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Större bild" />
        </div>
      ) : null}
    </main>
  );
}

function BookingForm({ services }: { services: Service[] }) {
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    brandModel: "",
    modelYear: "",
    serviceId: "",
    description: "",
    preferredDate: "",
    preferredTime: "",
    termsAccepted: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const checked = type === "checkbox" ? (event.target as HTMLInputElement).checked : undefined;
    setForm((current) => ({
      ...current,
      [name]: checked ?? value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.termsAccepted) {
      setStatus("Du måste godkänna bokningsvillkoren innan förfrågan kan skickas.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    const formData = new FormData(event.target as HTMLFormElement);
    const attachments: Array<{ name: string; type: string; dataURL: string }> = [];
    const fileList = formData.getAll("attachments") as File[];

    for (const file of fileList) {
      if (!file || file.size === 0) continue;
      const dataURL = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Kunde inte läsa fil"));
        reader.readAsDataURL(file);
      });
      attachments.push({ name: file.name, type: file.type, dataURL });
    }

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        attachments,
      }),
    });

    const result = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setStatus(result.error || "Något gick fel.");
      return;
    }

    setStatus("Din bokningsförfrågan har skickats och väntar på godkännande.");
    setForm({
      name: "",
      phone: "",
      email: "",
      brandModel: "",
      modelYear: "",
      serviceId: "",
      description: "",
      preferredDate: "",
      preferredTime: "",
      termsAccepted: false,
    });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="input-grid">
        <label>
          Namn
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Telefonnummer
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          E-postadress
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Mopedens märke och modell
          <input name="brandModel" value={form.brandModel} onChange={handleChange} required />
        </label>
        <label>
          Årsmodell
          <input name="modelYear" value={form.modelYear} onChange={handleChange} placeholder="Optional" />
        </label>
        <label>
          Tjänst
          <select name="serviceId" value={form.serviceId} onChange={handleChange} required>
            <option value="">Välj tjänst</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Beskriv problemet eller arbetet
        <textarea name="description" value={form.description} onChange={handleChange} rows={5} required />
      </label>

      <div className="input-grid">
        <label>
          Önskat datum
          <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} required />
        </label>
        <label>
          Önskad tid
          <input type="time" name="preferredTime" value={form.preferredTime} onChange={handleChange} required />
        </label>
      </div>

      <label>
        Bifoga bilder (valfritt)
        <input type="file" name="attachments" multiple accept="image/*" />
      </label>

      <label className="checkbox-row">
        <input type="checkbox" name="termsAccepted" checked={form.termsAccepted} onChange={handleChange} />
        Jag har läst och godkänner bokningsvillkoren, inklusive förseningsavgiften på 200 kr vid 10 minuters försening eller mer.
      </label>

      <button className="btn btn-primary btn-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Skickar..." : "Skicka bokningsförfrågan"}
      </button>

      {status ? <p className="form-status">{status}</p> : null}
    </form>
  );
}
