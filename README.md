# Object-Design   

Zadanie 1 - Paradygmaty - Pascal
---
✓ | **3.0** Procedura do generowania 50 losowych liczb od 0 do 100 | [Commit](https://github.com/ourcookiestuff/Object-Design/blob/fbd22a15c06070d8dc04efe90584e2d890e05cca/zad1/BubbleSort.pas)  
✓ | **3.5** Procedura do sortowania liczb | [Commit](https://github.com/ourcookiestuff/Object-Design/blob/4aef941c91afdbb5a8ef40e1428a363cd84392b5/zad1/BubbleSort.pas)  
✓ | **4.0** Dodanie parametrów do procedury losującej określającymi zakres losowania: od, do, ile | [Commit](https://github.com/ourcookiestuff/Object-Design/blob/375abd0d4863529a11a7bf74bb4dca48d4f86075/zad1/BubbleSort.pas)  
✓ | **4.5** 5 testów jednostkowych testujące procedury | [Commit](https://github.com/ourcookiestuff/Object-Design/blob/6a59c88def8851e6d9e0bde3d4ef9baae42753d2/zad1/BubbleSort.pas)  
✓ | **5.0** Skrypt w bashu do uruchamiania aplikacji w Pascalu via docker | [Commit](https://github.com/ourcookiestuff/Object-Design/tree/93342b34bcf1bd39cf734414784b545f5aa09494/zad1)  

Zadanie 2 - Wzorce architektury - PHP (Symfony)
---
✓ | **3.0** Jeden model z kontrolerem z produktami, zgodnie z CRUD | [Commit](https://github.com/ourcookiestuff/Object-Design/tree/f918500c325a54e6b785bf5ebf06842c50a3558e/zad2)  
✓ | **3.5** Skrypty do testów endpointów via curl | [Commit](https://github.com/ourcookiestuff/Object-Design/blob/d9e2239b01645bee9d77249835eaf29817591adc/zad2/test_endpoints.sh)     
✓ | **4.0** Dwa dodatkowe kontrolery wraz z modelami | [Commit](https://github.com/ourcookiestuff/Object-Design/tree/0748110bdc362d6249b5023f74c56580a7fc37f1/zad2/src/Controller)     
✓ | **4.5** Widoki do wszystkich kontrolerów | [Commit](https://github.com/ourcookiestuff/Object-Design/tree/6a1b32dcc9c042a9397bd23d27bc0639ea184fe3/zad2)    
✗ | **5.0** Panel adminstracyjny   

Zadanie 3 - Wzorce kreacyjne - Kotlin (Spring)
---
✓ | **3.0** Jeden kontroler wraz z danymi wyświetlanymi z listy na endpoint’cie w formacie JSON - Kotlin + Spring Boot | [Commit](https://github.com/ourcookiestuff/Object-Design/tree/f89e23d8a01cf0e4d3bab2ec0cac9c41f58152a7/zad3/src/main/kotlin/com/object_des/auth)  
✓ | **3.5** Klasa do autoryzacji (mock) jako Singleton w formie eager | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/5eeae83d77c6192c15eb4d96c8bc1b5ac3854e1f)  
✓ | **4.0** Obsługa danych autoryzacji przekazywanych przez użytkownika | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/1c1dabe9f8627765b5b6c5a1979709bbf794afaf)    
✓ | **4.5** Wstrzyknięcie singletonu do głównej klasy via @Autowired | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/0b705bee278786ed2ee16985037ad05ff54a7917)   
✓ | **5.0** Obok wersji Eager do wyboru wersja Singletona w wersji lazy | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/3422ad1399f0dca865a61fcac5723dec0384bc97)

Zadanie 4 - Wzorce strukturalne - Go (echo)
---
✓ | **3.0** Kontroler Pogody, która pozwala na pobieranie danych o pogodzie | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/7676975f54f48933d95dcd8967c124bdaac036c2)    
✓ | **3.5** Model Pogoda wykorzystujący gorm, dane załadować z listy przy uruchomieniu | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/24b2ee7b0e14a59b52c9c301308c5ec8a2033e42)  
✓ | **4.0** Klasa proxy, która pobiera dane z serwisu zewnętrznego podczas zapytania do kontrolera | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/31aaf2b81941ab255e41e0072c51c4412b8c0481)     
✓ | **4.5** Pobrane dane z zewnątrz zapisywane do bazy danych | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/917d3e4f34d84c51490d4fa3f8bf7922645f2233)      
✓ | **5.0** Rozszerzenie endpointa na więcej niż jedną lokalizację zwracając JSONa | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/8250bc62f9ebd20aad2b9e3b99855741749c6d38)     

Zadanie 5 - Wzorce behawioralne - React 
---
✓ | **3.0** Komponenty Produkty oraz Płatności; komponent Produkty pobiera listę produktów z aplikacji serwerowej, komponent Płatności wysyła dane płatności do aplikacji serwerowej | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/e8bc63ad89df75ef84ffe9f8d1c5b7dd15583c52)  
✓ | **3.5** Komponent Koszyk wraz z osobnym widokiem; aplikacja umożliwia przechodzenie pomiędzy widokami przy użyciu routingu | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/25ef879b9713e3dc6d1c42340f4d5a7288d40254)     
✓ | **4.0** Dane pomiędzy komponentami, są przekazywane z wykorzystaniem React hooks | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/04ab8b2dcc26fee70fd713bef11eb73a421a6a1e)   
✓ | **4.5** Uruchomienie aplikacji klienckiej oraz serwerowej w kontenerach Docker za pomocą docker-compose | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/036286b164620db6431c114bb506f4e705950391)        
✓ | **5.0** Axios do komunikacji z serwerem oraz CORS, aby frontend mógł komunikować się z backendem | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/8b1fedfe0a53a3e109ab3ba9b582f9c0d6795834)   

Zadanie 6 - Code smells - sprawdzanie kodów projektów Kotlin, Go i JS.
---
Sonar badge:    
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ourcookiestuff_Object-Design&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ourcookiestuff_Object-Design)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ourcookiestuff_Object-Design&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ourcookiestuff_Object-Design)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ourcookiestuff_Object-Design&metric=bugs)](https://sonarcloud.io/summary/new_code?id=ourcookiestuff_Object-Design)  

✓ | **3.0** Husky + lint-staged skonfigurowanie uruchamiania lintowania przed commitem | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/d93e5dc48749424ff8afed3cd7d62e057f87336c)     
✓ | **3.5** Wyeliminwanie wszystkiech bugów w kodzie w Sonarze (kod aplikacji klienckiej) | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/f6be1c78156f5c0c62ad364cf607934e77d65d8c)      
✓ | **4.0** Przeskanowanie oraz naprawienie projekt open source narzędziem CodeQL | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/4695aade39280944413df8ba6a1cd4e53661d648)      
✓ | **4.5** Usunięcie problemu typu Code Smell w kodzie w Sonarze (kotlin, go, js) | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/6ec710d1b65144ecbc104cbffa0bb25eac223d66)     
✓ | **5.0** Skonfigurowanie Github Actions z linterem oraz CodeQL | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/a7f44fa0620c354dcc87ae87df7a0f0b41046ad3)           

Zadanie 7 - Vapor
---
✓ | 3.0 Kontroler wraz z modelem Produktów zgodny z CRUD w ORM Fluent | [Commit](https://github.com/ourcookiestuff/Object-Design/commit/f3d52433d60f58b982a9b04a04565091b3eab1b9)      
✗ | 3.5 Szablony w Leaf    
✗ | 4.0 Drugi model oraz kontroler Kategorii wraz z relacją    
✗ | 4.5 Redis do przechowywania danych     
✗ | 5.0 Aplikacja na heroku    
