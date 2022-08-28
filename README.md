# e-library

Korišćene tehnologije
-----------------
Programski jezik: C#

IDE: Visual Studio

Framework: .net5, Angular

Platforma: docker 

Pokretanje
-----------------

Pozicionirati se unutar solution direktorijuma i izvršiti komandu:

docker-compose -f .\docker-compose.yml -f .\docker-compose.override.yml up -d --build

Pozicionirati se unutar WebApp direktorijuma i izvršiti redom komande:

npm install

ng serve 

Kratak opis aplikacije
-----------------

Aplikacija koja simulira rad onlajn biblioteke. Pretplaćeni korisnici mogu da pozajme knjige iz kataloga na određeni period, i nakon toga ih vraćaju u biblioteku. Ako se korisnik registruje kao premium član, ima mogućnost da naruči i specijalne premium knjige dostupne samo premium članovima. Postoji opcija dodavanja knjige u listu želja, na osnovu koje se  prave lične preporuke za tog korisnika na osnovu žanra i autora. Ukoliko se korisnik uloguje kao administrator, ima mogućnost upravljanja knjigama iz kataloga, korisnicima i njihovim članarinama, kao i pregled svih porudžbina po pretplaćenim članovima biblioteke.



Mikroservisi
-----------------

Catalog 
-----------------

Mikroservis za manipulisanje knjigama. Sadrži entitet knjige, sa poljima kao što su naslov, autor, žanr, opis, dostupnost, tip knjige i slično.  Knjige se čuvaju kao json reprezentacije u mongodb bazi podataka. Servis podržava osnovne operacije kreiranja, ažuriranja i brisanja knjige (namenjene administratoru), kao i dohvatanje knjiga preko različitih aitrubuta (namenjena svim korisnicima, za potrebe pretrage, preporuka i sl.). Katalog koristi grpc komunikaciju za slanje podataka o knjigama mikroservisima korpe i liste želja.

ShoppingCart (ana)
Mikroservis koji ima ulogu korisničke korpe. Svi metodi - dohvatanje, ažuriranje, dodavanje i brisanje knjige iz korpe, kao i odjava korpe za kreiranje porudžbine,  autorizovani su samo za korisnike koji imaju ulogu Member ili PremiumMember. ShoppingCart komunicira sa katalogom preko grpc-a, kao i sa Ordering mikroservisom preko redova poruka.

Identity
-----------------

IdentityServer pruža usluge autorizacije i autentikacije korisnika. Autentikacija se zasniva na
JWT tokenima (access token, refresh token), a autorizacija na rolama, kojih u ovom slučaju ima tri: Member, PremiumMember i Administrator.

U IdentityServer-u su definisani i metodi za upravljanje korisničkim nalogom (promena šifre, brisanje naloga, plaćanje mesečne članarine). U slučaju izvršavanja ovih radnji, omogućeno je slanje poruke na korisnički mejl.
Takođe, implementirane su osnovne operacije koje admin može da izvrši - kreiranje novih administratorskih naloga, kao i upravljanje nalozima svih članova biblioteke.


Ordering
-----------------

Ordering mikroservis služi za čuvanje i dohvatanje svih narudžbina koje su
potvrđene od strane korisnika.

Pored korisničkog imena i knjiga koje narudžbina uključuje skladišti se
i vreme pravljenja narudžbine.
Ima uspostavljenu asinhronu komunikaciju sa ShoppingCart mikroservisom, za potrebe
dobavljanja stavki iz korpe nakon potvrđene transakcije od strane korisnika.
Podaci kojima ovaj mikroservis manipuliše dostupni su samo korisnicima sa
administratorskim privilegijama.


Library
-----------------

Library mikroservis služi za manipulaciju lične biblioteke svakog od korisnika.

Kada korisnik potvrdi transakciju iz korpe, asinhronom komunikacijom je obezbeđeno
čuvanje artikala u ličnu biblioteku korisnika. Nakon što korisnik pročita kjigu
ima mogućnost da knjigu vrati i tako je učini dostupnom ostalim korisnicima.

Wishlist
-----------------

Wishlist mikroservis se koristi za čitanje i upravljanje listama želja. Za čuvanje podataka koristi redis memoriju. U memoriji se čuvaju entiteti WishBookList (atributi:korisničko ime i lista knjiga) i ListItem (atributi:naslov, autor, žanr knjige itd.).
Ovaj mikroservis omogućava dohvatanje liste na osnovu korisnika, dohvatanje liste preporuka po autoru i žanru na osnovu liste želja, dodavanje i skidanje elementa iz liste.
Ovaj mikroservis je GRPC klijent Catalog mikroservisa.
Funkcionalnosti ovog mikroservisa dostupni su običnim i premium članovima

Članovi tima:
-----------------

Bojović Bogdan 1019/2021,

Đorović Luka 1029/2021,

Jošić Bojana 1016/2021,

Petrović Ana 1073/2020.


