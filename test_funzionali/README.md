# Note generali sulla fase di testing

Il testing è stato effettuato come concordato elencando i passi da fare manualmente sul tool all’interno di fogli di testo. La Test Suite è strutturata in diversi Test Case, divisa in un foglio di testo diverso per ogni Use Case.

 Per quanto riguarda la selezione degli input ho utilizzato la boundary value analysis. Naturalmente essendo i nostri input non  numerici ma delle tipologie più disparate (selezioni, trascinamenti, click, inserimento di stringhe e valori booleani) ho cercato di utilizzare il concetto di boundary value analysis inserendo degli input che andassero a sollecitare i valori al limite rispetto ai valori accettati. Per esempio ho considerato il caso di avere input nulli all’interno di alcuni campi o di voler effettuare collegamenti multipli sulla stessa porta, sia collegandoli input → output che provando i a collegarli al contrario (output → input); cosi da cercare di portare il sistema anche in situazioni “non standard” dove si sarebbero potute riscontrare problematiche.


Per quanto riguarda la struttura di ciascun file di testo relativo ad uno Use Case, esso è stato diviso in differenti test in modo che ciascuno Scenario implementato sia simulato almeno una volta secondo partizionamenti dei dati di input ritenuti più significativi.
Molti Test Case hanno anche una parte finale intitolata “Note” nella quale per maggiore dettaglio ho voluto elencare le differenze che si possono riscontrare rispetto agli Use Case del SRS che sono state introdotte nella fase di Develop e SDD anche se esse sono gia state descritte nei commenti del codice e nel file di SDD. 

Ogni test a sua volta è costituito da: una serie di passi per effettuare l’input (ho considerato di partire sempre dal editor nel suo stato iniziale cioè appena aperto) e uno o più output attesi.

Ho segnalato i BUG riscontrati dopo la parte relativa agli output di ogni test.
