Die Vorlage beinhaltet CSS/HTML/JS-Linter. Diese sind konfiguriert. 

Getting Started
1. Entzippen von der Vorlage.
2. Installieren Sie die Dependencies der Vorlage
   - Console/Terminal: «npm install» im Root vom Projekt
3. Testen Sie, ob alles richtig installiert wurde
   - Console: «npm run all» im Root vom Projekt
   - Erwarte Ausgabe: 1 Warnungen und «npm run all completed»
4. Prettier und ESLint in der IDE Konfigurieren
   - VS Code: 
      - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
	  - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
   - Webstorm: 
      - https://www.jetbrains.com/help/webstorm/eslint.html
      - https://www.jetbrains.com/help/webstorm/prettier.html 

Woche 1
- HTML Gerüst erstellen für die Wireframes und Beginn CSS:
   - /source/public/index.html
   - /source/public/styles/index.css
- Webstorm:
   - /source/public/index.html "ausführen".
- Visual Studio Code:
   - Live Server nutzen: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer    

Folgende Befehle sind möglich

| Befehl  |  Beschreibung |
|---|---|
| npm run stylelint  |   Testet ob die CSS Files in Ordnung sind. |
| npm run w3c  |   Testet ob die HTML Files in Ordnung sind. |
| npm run eslint  |  Testet ob die JS Files in Ordnung sind. |
| npm run all  |   Führt die Tests für CSS/HTML/JS aus. |
| npm run start  |  Started den Web-Server: http://localhost:3000 |
