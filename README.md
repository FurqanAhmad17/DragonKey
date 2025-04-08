# DragonKey
DragonKey is a mobile-ready NFC check-in system for school events. Organizers can scan student ID cards to verify attendance instantly, with support for multiple events, a local SQLite database, and real-time approval feedback via a simple green/red screen.

🐉 DragonKey

DragonKey is a fast, NFC-based student check-in system built for school events.

Organizers can scan student ID cards embedded with NFC chips and instantly verify:
	•	✅ The student exists in the school database
	•	✅ The student has paid for the selected event

Supports multiple events (e.g. Prom, Spring Fest, Movie Night) through a simple dropdown UI and dynamic backend validation.

⸻

🔧 Features
	•	Web NFC integration (mobile-ready HTML interface)
	•	Local SQLite database for student & event data
	•	Event-specific check-in logic
	•	Green screen ✅ or red screen ❌ response on scan
	•	Manual init.sql or CSV-based event updates

⸻

💡 Tech Stack
	•	HTML + JS (frontend)
	•	Node.js + Express (backend)
	•	SQLite (local database)
	•	Web NFC API (for scanning)
