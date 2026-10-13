import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function AdminPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("moppehjalpen_admin_session")?.value;

  if (!session || session !== "authenticated") {
    redirect("/admin/login");
  }

  const [bookings, services, gallery, settings, availability] = await Promise.all([
    prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.service.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.setting.findMany(),
    prisma.availabilitySlot.findMany({ orderBy: { date: "asc" } }),
  ]);

  const settingMap = Object.fromEntries(settings.map((item) => [item.key, item.value]));

  return (
    <main className="admin-shell">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Administratörspanel</p>
          <h1>Moppehjälpen</h1>
        </div>
        <form action="/api/admin/logout" method="POST">
          <button className="btn btn-primary" type="submit">Logga ut</button>
        </form>
      </div>

      <section className="admin-stats">
        <div className="stat-card">
          <span>Totala bokningar</span>
          <strong>{bookings.length}</strong>
        </div>
        <div className="stat-card">
          <span>Väntar på godkännande</span>
          <strong>{bookings.filter((b) => b.status === "pending").length}</strong>
        </div>
        <div className="stat-card">
          <span>Godkända</span>
          <strong>{bookings.filter((b) => b.status === "approved").length}</strong>
        </div>
        <div className="stat-card">
          <span>Projekt i galleri</span>
          <strong>{gallery.length}</strong>
        </div>
      </section>

      <section className="admin-grid">
        <div className="panel">
          <h2>Bokningsförfrågningar</h2>
          {bookings.length === 0 ? (
            <p>Inga bokningar ännu.</p>
          ) : (
            <div className="booking-list">
              {bookings.map((booking) => (
                <article key={booking.id} className="booking-item">
                  <div className="booking-top">
                    <div>
                      <h3>{booking.name}</h3>
                      <p>{booking.brandModel}</p>
                    </div>
                    <span className={`status-badge status-${booking.status}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p>{booking.email}</p>
                  <p>{booking.phone}</p>
                  <p>{booking.preferredDate} kl. {booking.preferredTime}</p>
                  <p>{booking.description}</p>
                  <div className="booking-actions">
                    <a href={`mailto:${booking.email}`}>Maila kund</a>
                    <form action={`/api/bookings/${booking.id}`} method="POST">
                      <input type="hidden" name="status" value="approved" />
                      <button type="submit">Godkänn</button>
                    </form>
                    <form action={`/api/bookings/${booking.id}`} method="POST">
                      <input type="hidden" name="status" value="rejected" />
                      <button type="submit">Avslå</button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="panel">
          <h2>Inställningar</h2>
          <ul className="setting-list">
            <li>E-post: {settingMap.email || "moppehjalpen@gmail.com"}</li>
            <li>Instagram: {settingMap.instagram || "@moppehjalpen"}</li>
            <li>TikTok: {settingMap.tiktok || "@moppehjalpen"}</li>
            <li>Arbetsområde: {settingMap.workArea || "Ej angivet"}</li>
            <li>Öppettider: {settingMap.openingHours || "Ej angivet"}</li>
          </ul>
        </div>
      </section>

      <section className="admin-grid">
        <div className="panel">
          <h2>Tjänster</h2>
          {services.map((service) => (
            <div key={service.id} className="mini-item">
              <strong>{service.name}</strong>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <div className="panel">
          <h2>Galleri</h2>
          {gallery.length === 0 ? (
            <p>Inga projekt uppladdade.</p>
          ) : (
            gallery.map((item) => (
              <div key={item.id} className="mini-item">
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
