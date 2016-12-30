# Projet de fin d'études : Livrable 1

## Description des technologies choisies
Notre application sera en realité séparée en deux applications distinctes, d'un côté une API côté backend écrite en javascript (Node.JS) qui servira à la manipulation des données et à la logique "business" et côté frontend une interface web écrite en HTML5/CSS3 à l'aide du Framework React, qui interagira donc avec notre application en backend. Nous allons rentrer un peu plus dans les détails ci-dessous.

### Frontend
Nous avons choisi d'utiliser le framework React afin de faciliter l'écriture de l'interface utilisateur.
React nous permet en effet de limiter la duplication de code en créant des parties d'interface réutilisable et modulable.
Il s'agit d'une technologie developpée par Facebook et est donc une solution amenée à perdurer dans le temps.

### Backend
Notre backend se composera d'une API écrite en Node.JS se basant sur le framework LoopBack (qui se base lui-même sur un serveur Express) ainsi que sur une base de données relationnelles PostgreSQL.

Nous avons choisi le framework LoopBack en raison de sa grande flexibilité et de son grand nombre de fonctionnalités adaptés à la création d'API. Mais aussi car il est soutenu par une société reconnue dans le monde du Node.JS. La société StrongLoop est en effet mainteneuse du serveur Express ainsi qu'un des plus gros contributeurs au projet Node.JS, il nous semble donc être un framework pérenne.
De plus, afin de confirmer que nous ne partions pas sur "un outil prometteur mais pas encore abouti", nous avons consulté différents avis sur LoopBack. L'un d'entre eux peut être consulté dans la bibliographie (point 1).
En voici un extrait: 
>TL;DR We rewrote our Express API using LoopBack in half the time with 75% less code.

Nous avons choisi une base de données relationnelles PostgreSQL car n'ayant pas l'enoncé il nous semblait difficile de décider si oui ou non l'usage d'une base de données orientée Document de type MongoDb était pertinent.
Nous avons spécifiquement choisi PostgreSQL car il s'agit d'un outil respectant rigoureusement le standard SQL et permettant aisément par la suite de changer de gestionnaires de bases de données relationnelles.

## Diagramme d'architecture
|-----------Frontend-----------|-------------Backend----------------|------------DB----------------
 \[React\]            \[MiddlesWares + Serveur Express\] \[Driver PostGres\]     \[DB ProstGres\]
                      \[                      LoopBack                    \]                        
                      \[ Gestion des différents scénarios d'utilisation de l'application]

## Description des outils choisis
Nous avons choisis d'utiliser divers outil afin de maximiser notre productivité et de limiter les erreurs et régressions. Nous vous en dressons la liste ci-dessous.

### Nos outils de développement
- L'outil de versionning git et plus particulièrement le service fourni par [Github](http://github.com) afin de garder à tout instant une possibilité de revenir en arrière sur le code et de tous utiliser une base de code identique ainsi que de pouvoir garder un oeil sur l'avancement des fonctionnalités de chacun.
- L'outil d'intégration continue [TravisCI](https://travis-ci.com) pour s'assurer du bon fonctionnement et du respect des normes de qualités avant intégration dans la base de code.
- L'outil d'analyse de la qualité syntaxique du code [eslint](http://eslint.org/) qui nous permet à tout moment de juger du respect des conventions de code et qui integré à TravisCI nous assure que le code respecte ces conventions avant intégration.
- L'analyse de la couverture des tests grâce à [codecov](https://codecov.io/) afin de limiter drastiquement le nombre de régressions et d'introduction de nouveaux bugs.

### Nos outils méthodologiques
Notre organisation s'appuie sur une méthodologie de type Kanban, nous utiliserons l'outil Project fourni par et integré dans github.

Nous utiliserons aussi le bug tracker fourni par github afin de garder une intégration maximale.

Nous avons choisis de ne pas nous appuyer sur une méthodologie de type Agile ou SCRUM au vu du temps très faible accordé à la réalisation de ce projet.

### Nos environnements de développement
Nous avons chacun des environnements spécifiques tant au niveau OS qu'au niveau éditeurs utilisés par chacun. Nous allons donc brièvement introduire l'environnement de chacun.

- Anthony Maton
    - Editeur : [neovim](https://neovim.io/) est un éditeur de texte similaire à Vim en termes de fonctionnalités et de fonctionnement. Il s'agit ici d'une version extrêmement personnalisée de neovim qui offre toutes les fonctionnalités nécessaire au confort de travail. 
    - Client REST : Mon editeur intègre un client REST (restclient.el)
    
- Philippe Dragomir
    - Editeur : [IntelliJ Idea](https://www.jetbrains.com/idea/) est un IDE génial en termes de fonctionnalités, intégrant énormément de modules et de fonctionnalités permettant de faciliter pour notre développement.
    - Client REST : TBD

- Xavier Hoffmann & Gabriel Delhaye
    - Editeur : [Sublime Text 3](https://www.sublimetext.com/) est un éditeur cross-plateforme offrant des fonctionnalités intérressante pour du développement de "petits" projet. Il permet une complète customisation des touches, des menus, en passant par des macros et bien d'autres. Son système de plugin permet une customisation encore plus en profondeur.

## Bibliographie
1.[Avis sur loopback : http://blog.jeffdouglas.com/2015/07/07/roll-your-own-api-vs-loopback/](http://blog.jeffdouglas.com/2015/07/07/roll-your-own-api-vs-loopback/)
