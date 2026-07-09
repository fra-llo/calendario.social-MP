# Setup Firebase

1. Crea un progetto su Firebase.
2. Abilita Authentication con provider Email/Password.
3. Crea un database Cloud Firestore.
4. Registra una Web App e copia la configurazione in `firebase-config.js`.
5. Installa Firebase CLI se vuoi pubblicare da terminale:

```sh
npm install -g firebase-tools
firebase login
firebase init hosting firestore
firebase deploy
```

La struttura dati usata dall'app e':

- `workspaces/default/posts/{postId}`
- `workspaces/default/settings/main`
- `workspaces/default/backups/{YYYY-MM-DD}`

Le regole in `firestore.rules` permettono lettura e scrittura solo agli utenti autenticati.

## Lista accessi

La prima persona che accede al workspace vuoto diventa admin automaticamente.

Poi, da `Opzioni > Accessi`, l'admin puo':

- copiare il proprio UID
- vedere i membri
- aggiungere altri utenti tramite UID Firebase
- scegliere ruolo `editor` o `admin`

Un utente non presente in `workspaces/default/members/{uid}` non puo leggere o modificare il calendario.

## Cestino e backup

Quando elimini un contenuto viene marcato con `deletedAt` e resta nel cestino finche non lo cancelli definitivamente.

L'app crea automaticamente un backup giornaliero su Firestore in `workspaces/default/backups/{YYYY-MM-DD}` quando un utente autorizzato accede e sincronizza i dati.
