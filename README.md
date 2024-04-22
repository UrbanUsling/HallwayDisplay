### Java Spring template project

This project is based on a GitLab [Project Template](https://docs.gitlab.com/ee/gitlab-basics/create-project.html).

Improvements can be proposed in the [original project](https://gitlab.com/gitlab-org/project-templates/spring).

### CI/CD with Auto DevOps

This template is compatible with [Auto DevOps](https://docs.gitlab.com/ee/topics/autodevops/).

If Auto DevOps is not already enabled for this project, you can [turn it on](https://docs.gitlab.com/ee/topics/autodevops/#enabling-auto-devops) in the project settings.

Detta är ett Maven Java 17 projekt som inkluderar en frontend med React typescript och byggs ihop med Vite.js

Det finns en databas kopplad till programmet som befinner sig i en raspberry pi.
Programmet finns redan på raspberryn och körs automatiskt när den startar (tar en minut).
Raspberryn har SSID. När den är på syns enhet "Philip" i wifi listan på din dator.
Koppla till den med lösenord: prevas1234

Öppna en webbläsare och ange raspberryns statiska ip på 192.168.4.1:8080. Detta kommer öppna programmet.
Ibland kan första laddningen ta lite tid. Det är http så se till att din webbläsare inte blockar bild
och videolänkar från databasen.
För att logga in på admindelen:
user: admin
pass: adminForPrevas
Här kan rader i databasen läggas till och tas bort.


OM ÄNDRINGAR SKA GÖRAS:
Ladda ner programmet till din IDE (intellij eller vs code)

För att bygga frontenden till en statisk del i backend:

cd frontend
npm run build --emptyOutDir  (tömmer gamla statiska filen i resources med detta tillägg. Kan ocksö tömma det manuellt)

Sedan i hallwaydisplay (root av projektet):

./mvnw clean package -DskipTests  (tillägget då det inte finns några tester)
java -jar target/entre-0.0.1-SNAPSHOT.jar  (detta kommando kör jar filen)

JAR filen i targetmappen innehåller nu hela programmet och kan överföras till raspberryn där kommando finns
att köra en fil som heter entre.jar automatiskt vid start av raspberryn. Byt därför namn på den erhållna
jar filen till entre och ersätt den gamla som finns på raspberryn.



## Projektstruktur

- **controller/**: Denna mapp innehåller klasser som tar emot och hanterar HTTP-förfrågningar. Varje kontroller är vanligtvis kopplad till en specifik resurs eller funktionalitet i applikationen, som att hantera förfrågningar för `Guest` eller `Labb`.

- **service/**: Innehåller klasser som implementerar affärslogiken. Services brukar hantera logiken för applikationens operationer och kallar på repositories för databasoperationer.

- **model/**: Modellklasserna här representerar datastrukturen som används i applikationen, ofta motsvarande databasens tabeller genom att använda JPA-annoteringar.

- **repository/**: Mappen innehåller interfacet som utgör JPA-repositories. Dessa interfacet erbjuder metoder för att interagera med databasen, som att hämta eller spara data.

- **exception/**: Här definierar du anpassade undantagsklasser som du kan använda för att hantera olika fel som kan uppstå under applikationens körning.

- **resources/**: Den här mappen innehåller icke-Java-filer, som konfigurationsfiler (exempelvis `application.properties` eller `application.yml`), internationella meddelanderesurser, och mallar.

- **test/**: Innehåller dina testklasser. Detta inkluderar enhetstester och integrationstester för din applikation. Testmappstrukturen speglar ofta huvudkodens struktur.
