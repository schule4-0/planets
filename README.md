## Planeten Entdecker

"Planeten Entdecker" ist eine interaktive Webseite, die in Zusammenarbeit mit Studierenden
der Pädagogische Hochschule Weingarten uns Studierenden der Hochschule für Medien entstanden ist.
Sie zielt darauf ab, Lehrkräfte bei der Unterrichtsvorbereitung zu unterstützen und SchülerInnen eine
spannende Möglichkeit zu bieten, das Planetensystem zu erkunden. 
Die Webseite stellt maßgeschneiderte Lernmaterialien bereit und integriert spielerische Elemente,
um das Verständnis und das Interesse an unserem Sonnensystem zu fördern. Mit "Planeten Entdecker"
wird das Klassenzimmer zu einem interaktiven Lernraum, in dem SchülerInnen die Planeten hautnah
erleben können.

## Installation

#### Docker

#### Console
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Infos für Lehrkräfte

Zu den Lerneinheiten wurde ein Lehrerhandbuch angefertigt, diese finden Sie im Ordner [public/infos/Lehrerhandbuch.pdf](https://github.com/schule4-0/planets/tree/main/public/infos/Lehrerhandbuch.pdf)

## Austauschen von Textinhalten


### Dialoge

Um die Texte in der JSON-Datei anzupassen, kannst du die entsprechenden `"text"` Felder innerhalb des `"dialog"` Objekts ändern. Hier ist eine kurze Anleitung:

#### 1. Öffne die gewünschte JSON-Datei
Die JSON-Dateien befinden sich im Ordner [public/json](https://github.com/schule4-0/planets/tree/main/public/json)

#### 2. Suche nach dem Abschnitt `"dialog"`
Innerhalb des `"story"` Arrays findest du den `"dialog"` Abschnitt. Dieser enthält eine Liste von Objekten, die jeweils einen `"speaker"` und einen `"text"` haben.

#### 3. Bearbeite die Texte
Um einen Text zu ändern, suche das entsprechende `"text"` Feld und passe den Wert an.

**Beispiel:**
```json
{
  "speaker": "left",
  "text": "Wer bist du denn?"
}
````

### Antworten

Um die Antworten in der JSON-Datei anzupassen, kannst du die entsprechenden `"answer"` und `"isCorrect"` Felder innerhalb des `"dialog"` Objekts ändern. Hier ist eine kurze Anleitung:


#### 1. Öffne die gewünschte JSON-Datei
Die JSON-Dateien befinden sich im Ordner [public/json](https://github.com/schule4-0/planets/tree/main/public/json)


#### 2. Suche nach dem Abschnitt `"question"`
Innerhalb des `"story"` Arrays findest du den `"question"` Abschnitt. Dieser enthält die möglichen Antworten, die jeweils einen `"answer"` und einen `"isCorrect"` haben.

Ändere dort die "answer" und "isCorrect" Felder entsprechend.
**Beispiel:**
```json
{
  "answer": "Wahr",
  "isCorrect": false
},
{
  "answer": "Falsch",
  "isCorrect": true
}
````
Du kannst die "answer" Texte anpassen und, falls notwendig, die "isCorrect"
Werte auf false für eine falsche Antwort oder true für eine richtige Antwort ändern.

### Steckbriefe der Planeten
### Minispiel Mars
### Minispiel Venus

## Licensed
Licensed under the GNU GENERAL PUBLIC license.