# Opiskelijan hyvinvointisovellus

### Linkki sovellukseen

https://terveyssovellus.norwayeast.cloudapp.azure.com/public/login.html

### Linkki figmaan

https://www.figma.com/file/sTPumhIctBJiHKm1zbAay2/terveyssovellus?type=design&node-id=0-1&mode=design

### Back End repo

https://github.com/Jerekk/Projekti-backendi-ryhm--4/tree/projectmain

### Tietokanta

<img width="999" alt="Screenshot 2024-05-07 at 14 27 07" src="https://github.com/sennir/terveyssovellus/assets/111979727/ca6fce60-4d7a-4b60-bdee-1f2507c78081">


### Toteutetut toiminnallisuudet
- Sisään- ja uloskirjautuminen 
- HRV-datan tarkastelu
- Valmiusinfon katsominen
- Päiväkirjamerkinnän tekeminen
- Vanhojen päiväkirjamerkintöjen katsominen
- Mieliala historian katsominen
- HRV historian katsominen
- Valmiusinfon katsominen

### Käytetyt kirjastot
- amCharts 
  
### Kuvankaappaukset käyttöliittymästä

<img width="299" alt="Screenshot 2024-05-07 at 14 51 40" src="https://github.com/sennir/terveyssovellus/assets/111979727/b92767cc-c615-4f81-96f7-78527659611c">

![image](https://github.com/sennir/terveyssovellus/assets/111979727/ab3d2ee8-5ed9-4068-a43f-e61edc5d11c4)

![image](https://github.com/sennir/terveyssovellus/assets/111979727/2cd2812b-8cfe-4bb2-949e-38f939ddf9f6)

![image](https://github.com/sennir/terveyssovellus/assets/111979727/b1d9aaa7-ecfd-4536-8a64-f0a563dfaa8e)

![image](https://github.com/sennir/terveyssovellus/assets/111979727/ac79a3e1-c62d-4f9a-93a2-f19a19ad7a6a)

![image](https://github.com/sennir/terveyssovellus/assets/111979727/2bb05672-c57a-4c02-a464-df939e253817)

![image](https://github.com/sennir/terveyssovellus/assets/111979727/1393345e-3b49-4f42-8c76-00f5f60e4ab2)

![image](https://github.com/sennir/terveyssovellus/assets/111979727/ee22a21b-32aa-47cb-854e-075e322a71fe)

![image](https://github.com/sennir/terveyssovellus/assets/111979727/e070d070-c105-415b-ad37-e7337203cbda)

![image](https://github.com/sennir/terveyssovellus/assets/111979727/618e873d-a014-4d79-862c-b6f8de97fda8)

![image](https://github.com/sennir/terveyssovellus/assets/111979727/f8b38b1c-52bf-4ca1-8695-dc35837e724f)


--- 

## API Dokumentaatio – Opiskelijan hyvinvointisovellus

#### Yleiskuvaus
API tarjoaa pääsyn palvelimen resursseihin, jotka liittyvät käyttäjien henkilökohtaisiin tietoihin, päiväkirjamerkintöihin, mielialaan ja HRV-dataan. Tämä dokumentaatio sisältää yksityiskohtaiset tiedot kutakin reittiä ja niiden toimintaa varten, kuten HTTP-metodit, endpointit ja parametrit. API:n kaikki kutsut vaativat autentikoinnin JWT-tokenin avulla, ellei toisin mainita.

#### Autentikointi
- **POST /api/auth/login**
  - **Kuvaus**: Kirjaudu sisään ja vastaanota autentikaatiotoken.
  - **URL**: `/api/auth/login`
  - **Metodi**: POST
  - **Auth vaadittu**: Ei
  - **Data constraints**:
    ```json
    {
      "username": "[valid username]",
      "password": "[password in plain text]"
    }
    ```
  - **Data esimerkki**:
    ```json
    {
      "username": "johndoe",
      "password": "s3cr3t"
    }
    ```
  - **Onnistunut vastaus**:
    - **Koodi**: 200 OK
    - **Sisältö**:
      ```json
      {
        "message": "Logged in successfully",
        "token": "TOKEN-VALUE",
        "user": {
          "user_id": 21,
          "username": "johndoe",
          "email": "johnd@example.com",
          "user_level": "regular"
        }
      }
      ```
  - **Virhevastaus**:
    - **Koodi**: 401 Unauthorized
    - **Sisältö**:
      ```json
      {
        "error": "Invalid username or password"
      }
      ```
  - **Esimerkki kutsu**:
    ```bash
    curl -X POST https://api.yoursite.com/auth/login \
         -H "Content-Type: application/json" \
         -d '{"username":"johndoe", "password":"s3cr3t"}'
    ```
  - **Huomautukset**:
    - Salasanat lähetetään tekstinä, varmista suojattu yhteys.
    - Tokenit tulee säilyttää turvallisesti eikä niitä saa paljastaa asiakaspuolen koodissa.

#### Käyttäjät
- **POST /api/users** ja **GET /api/users/{userId}**
  - **Kuvaus**: Luo uusi käyttäjä tai hae käyttäjän tiedot.
  - **Parametrit**: Käyttäjänimi, salasana, sähköposti (POST); user-ID (GET).

#### Päiväkirjamerkinnät
- **GET /api/entries/{userId}** ja **POST /api/entries**
  - **Kuvaus**: Listaa kaikki käyttäjän merkinnät tai luo uusi merkintä.
  - **Parametrit**: user-ID, päivämäärä, mieliala, huomiot, unen määrä, paino, liikunnan kesto.

#### Mieliala ja HRV
- **GET /api/kubios/user-data** ja **GET /api/kubios/user-info**
  - **Kuvaus**: Palauttaa käyttäjän HRV-dataa tai perustiedot.

#### Virheenkäsittely
- Standardoitu virheenkäsittely kaikissa endpointeissa.

### API:n Dokumentointityökalut
- Suositellaan käyttämään Postmania API:n dokumentoinnissa ja testauksessa.


