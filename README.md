# Moppehjälpen

En komplett och modern webbplats för Moppehjälpen med moderna tjänster, bokningsförfrågningar, gallerier och administratörspanel.

## Snabbstart

1. Installera beroenden:
   ```bash
   npm install
   ```
2. Skapa en `.env.local` från `.env.example`.
3. Kör databasen:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Starta utvecklingsservern:
   ```bash
   npm run dev
   ```

## Admin

Standardinloggning:
- Användarnamn: `admin`
- Lösenord: `admin123` (eller ändra i `.env.local` via `ADMIN_PASSWORD`)

## Funktioner

- Startsida med mobilanpassad design
- Tjänstekort och kontaktinformation
- Foto-/projektgalleri med stöd för flera bilder
- Bokningsförfrågan med villkor och förseningsavgift
- Databasförvaring via SQLite och Prisma
- Adminpanel för att hantera bokningar, tjänster, galleri och inställningar

## Anpassning

Ändra text, länkar och kontaktinformation i adminpanelen efter att du loggat in.

## Viktigt

Detta projekt använder SQLite lokalt i utvecklingen. Du kan bygga vidare med en annan databas om du vill deploya i produktion.

## Försäljning

Det här projektet är byggt för att ligga till grund för en fungerande webbplats och kan vidareutvecklas med prissättning, betalning, e-postmeddelanden och automatiska påminnelser.

## Licens

MIT




