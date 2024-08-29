## Planeten Entdecker

"Planeten Entdecker” is an interactive website that was created in collaboration with students
from the "PH Weingarten" and students from the "Hochschule der Medien".
It aims to support teachers in preparing lessons and to offer pupils an exciting opportunity to explore the planetary system.
The website provides customized learning materials and integrates playful elements,
to promote understanding and interest in our solar system. With “Planeten Entdecker”
the classroom becomes an interactive learning space where pupils can experience the planets up close.



### Installation

For easy project setup, use Docker.

### Docker

To run the "Planeten Entdecker" website locally using Docker Compose, follow these steps:

#### Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started) (version 20.x or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (if not included with Docker)

#### Instructions

1. **Clone the Repository**

  First, clone the "Planeten Entdecker" repository to your local machine:

   ```bash
   git clone https://github.com/schule4-0/planets.git
   cd planets
   ```
   

2. **Build Docker Image**

If the Docker image needs to be built (usually only necessary if you haven't built the 			   image before or if the Docker image needs updating), run:

 ```bash 
docker-compose build
```

3. **Start Docker Compose**

Use Docker Compose to start the project. Make sure you are in the root directory of the project, and run the following command:

```bash
docker-compose up -d
```


4. **Access the Website**

Open your web browser and go to http://localhost:3000



##  Information for teachers

A teacher's guide has been produced for the learning units, which can be found in the folder [public/infos/Lehrerhandbuch.pdf](https://github.com/schule4-0/planets/tree/main/public/infos/Lehrerhandbuch.pdf)

## Exchanging content


### Dialogs

To adjust the texts in the JSON file, you can change the corresponding `“text”` fields within the `“dialog”` object. Here is a short guide:

#### 1. Open the desired JSON file
The JSON files are located in the folder  [public/json/dialog](https://github.com/schule4-0/planets/tree/main/public/json/dialog)

#### 2. Search for the section `“dialog”`.
Within the `“story”` array you will find the `“dialog”` section. This contains a list of objects, each of which has a `“speaker”` and a `“text”`.
#### 3. Edit the texts
To change a text, search for the corresponding `“text”` field and adjust the value.

**Example:**
```json
{
  "speaker": "left",
  "text": "Wer bist du denn?"
}
````

### Answers

To customize the responses in the JSON file, you can change the corresponding `“answer”` and `“isCorrect”` fields within the `“dialog”` object. Here is a short guide:

#### 1. Open the desired JSON file
The JSON files are located in the folder [public/json/dialog](https://github.com/schule4-0/planets/tree/main/public/json/dialog)


#### 2. Search for the section `“question”`.
Within the `“story”` array you will find the `“question”` section. This contains the possible answers, each of which has an `“answer”` and an `“isCorrect”`.
Change the “answer” and “isCorrect” fields accordingly. 

**Example:**
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
You can customize the “answer” texts and, if necessary, change the “isCorrect”
values to false for an incorrect answer or true for a correct answer.

### Planet profiles
To adjust and customize the Planet profiles adapt the json properties. Here is a short guide:

#### 1. Open the desired JSON file
The JSON file is located in the folder [public/json](https://github.com/schule4-0/planets/tree/main/public/json)
its `“planet-profile.json”`

#### 2. Adapt the Planets
Every Planet is its own Json object which looks like that :

**Example:**
```json
"mercury": {
  "header": "Merkur-Erkundung: Der kleine Planet",
    "info": {
    "Gas- oder Gesteinsplanet": "Gesteinsplanet",
    "Alter": "Ca. 4.6 Milliarden Jahre (gleiches Alter wie das Sonnensystem)",
    "Größe": "Durchmesser: Ca. 4.880 km",
    "Temperatur": "",
    "Tag": "bis zu 430 °C",
    "Nacht": "bis zu -180 °C",
    "Entfernung zur Sonne": "Ca. 57,9 Millionen km",
    "Entfernung zur Erde": "Zwischen 77 und 222 Millionen km",
    "Tagesdauer": "Ca. 58,6 Erdtage",
    "Jahresdauer (Umlauf um die Sonne)": "Ca. 88 Erdtage",
    "Besonderheit": "Merkur hat extreme Temperaturschwankungen zwischen Tag und Nacht und keine Atmosphäre, die diese Schwankungen ausgleichen könnte.",
    "Monde": "Keine"
    }
},
````

Here we can adapt every Information about the planet. The Planet Name is the `“header”` is for the Planet Name.

### Minigame Venus

To adjust and customize the Memory Game on Venus we can adjust 2 object `“page”` and `“cards”`. With the `“page”` object we can change `“headline”` and `“content”` of the whole page.
The `“cards”` object lets us edit every Memory card and add `“keyword”`, `“src”` for image path and `“content”`. Here is a short guide:

#### 1. Open the desired JSON file
The JSON file is located in the folder [public/json/minigame](https://github.com/schule4-0/planets/tree/main/public/json/minigame)
its `“memmory-venus.json”`
#### 2. Adapt Page
The page has a headline and a content description. To customize these parts, just customize the text in the json

**Example:**
```json
  "page" : [
  {
    "headline": "Venus Entdeckungen: Ein Gedächtnisspiel",
    "content" : "Decke abwechselnd zwei Karten auf und sammle Paare von passenden Bildern, um mehr über die Venus zu lernen."
  }
]
````

#### 3. Edit the cards
The cards have a `"keyword"` which acts as the ID for the cards and the alt text for the images.
Then `"src"` for the path to the image of the card.
And finally `"content"` as the descriptive text that is displayed when the right cardpair is found.

To customize these parts, just customize the card attributes in the json. Also add new or remove cards the same way.

**Example:**
```json
   "cards": [
  {
    "keyword": "atmosphere",
    "src": "/images/memory/atmosphere.svg",
    "content": "Die Atmosphäre der Venus besteht hauptsächlich aus Kohlendioxid und erzeugt einen starken Treibhauseffekt."
  }
]
````

### 4. Editing the Dictionary

#### 1. Open the JSON File
   The dictionary content is stored in a JSON file located in the folder public/json. The file you need to edit is named dictionary.json.

#### 2. Structure of a Dictionary Entry
   Each dictionary entry is an object with the following attributes:

- header: The title or term of the dictionary entry.
- info: The detailed description or explanation of the term.
- image: The path to an image that visually represents the term.

#### 3. Add or Edit Entries
To Add a New Entry: Copy one of the existing entries and paste it within the "items" array. Change the "header", "info", and "image" fields to reflect the new term.
To Edit an Existing Entry: Simply find the term you want to change and modify the "header", "info", or "image" fields as needed.

**Example:**
```json
    {
      "header": "Erosion",
      "info": "Erosion ist ein Prozess, bei dem Erde, Steine und andere Materialien von einem Ort zu einem anderen getragen werden. Das passiert oft durch Wasser, Wind oder Eis. Stell dir vor, wie der Wind Sand von einer Sandburg wegbläst oder wie Regen kleine Stückchen Erde von einem Hügel herunterspült.",
      "image": "/images/erosion.jpg"
    }
````

## Licensed
Licensed under the GNU General Public License v3.0
