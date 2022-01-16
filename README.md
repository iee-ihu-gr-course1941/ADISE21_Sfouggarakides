# Moutzouris Game
 
 ## Μέλη Ομάδας
   * Παπαδόπουλος Αλέξανδρος
   * Θάνος Αθανάσιος Νικόλαος 
   * Μαυροδόντης Νικόλαος
   * Κουτσοκώστας Δημήτριος

## Τεχνολογίες
* PHP
* SQL
* CSS
* HTML
* JS
* BOOTSTRAP

## Περιγραφή υλοποίησης
 Μπαίνοντας στην σελίδα του παιχνιδιού πατώντας [ΕΔΩ](https://users.it.teithe.gr/~it185223/ADISE21_Sfouggarakides/www/) υπάρχουν δύο κουμπιά το Player και το AI. Αν ο χρήστης θέλει να παίξει με παίκτη πατάει στο Player. Με το που μπει, πρέπει να ορίσει ένα όνομα για αυτόν (username) και να διαλέξει ποιά θα είναι η σειρά του. Πατώντας λοιπόν στο "Είσοδος στο παχνίδι" μπαίνει μέσα και παίζει με τον αντίπαλο. Παρόλα αυτά αν υπάρχει ήδη παίκτης που έχει ορίσει την ίδια σειρά με εμάς όταν προσπαθήσουμε να πατήσουμε "Είσοδος στο παιχνίδι" θα μας πετάξει ανάλογο σφάλμα, όπου θα πρέπει να ορίσουμε την αντίθετη σειρά από ότι ορίσαμε εμείς. Παρόλα αυτά μπορούμε επίσης να πατήσουμε στο κουμπί reset και να γίνει reset των επιλογών μεταξύ εμάς και του αντιπάλου, και θα οδηγηθούμε στην main σελίδα. Για την επιλογή του AI, απλά ορίζουμε όνομα και διαλέγουμε την σειρά που θέλουμε να ξεκινήσουμε, και πατάμε "Είσοδος στο παιχνίδι"
 
## Εγκατάσταση
 * Κάνουμε clone το project σε έναν φάκελο που έχουμε δημιουργήσει στον υπολογιστή μας 
`git clone https://github.com/iee-ihu-gr-course1941/ADISE21_Sfouggarakides.git`.
 * Ο φάκελος πρέπει να είναι προσβάσιμος από τον Server του apache.
 * Θα πρέπει να δημιουργηθεί το ανάλογο schema στην βάση μας με το όνομα moutzouris, και να φορτωθούν οι πίνακες με τα δεδομένα απο το schema.sql.

## Περιγραφή Api
### cards 
* handle_board($method,$input);
  > Get method Αρχικοποιεί τις κάρτες της τραπουλας σε πινακα
  
  > Post  method κάνει reset τους πινακες στην βάση
  
### cards/draw/
* handle_draw($method, $request[0],$request[1],$input);
  > τρέχει την call procedure για να διαλέξει ο χρήστης κάρτα
### status
* handle_status($method)
  > εμφανίζει το status του παιχνιδού
### players
* handle_player($method, $request,$input)
  > προσθέτει τον χρήστη στην βάση 
   
## Η βάση δεδομένων
 ### Cards
 Ο πίνακας αφού μοιραστούν οι κάρτες και έχει γίνει drop διπλών φύλλων
 | Attribute | Description | DataType 
 | --- | --- | ---
 | `Number` | Αριθμός Κάρτας | TINYINT
 | `Symbol` | Τα σύμβολα της κάρτας | VARCHAR
 | `Player` | Σε ποιόν παίκτη ανήκει η καρτα | VARCHAR
 
  ### Cards Empty (Κενός Πίνακας)
  Κένος πίνακας με τις αρχικές κάρτες
 | Attribute | Description | DataType 
 | --- | --- | ---
 | `Number` | Αριθμός Κάρτας | TINYINT Primary Key
 | `Symbol` | Τα σύμβολα της κάρτας | VARCHAR Primary Key
 | `Player` | Σε ποιόν παίκτη ανήκει η καρτα | NULL

  ### Status
  Το status του παιχνιδιού ( ποιος παίζει)
  | Attribute | Description | DataType 
  | --- | --- | ---
  | `status` | Κατάσταση παιχνιδιού | ENUM
  | `p_turn` | Ποιός παίκτης παίζει | ENUM
  | `result` | Ποιός κέρδισε | ENUM
  | `last_change` | Πότε έγινε η τελευταία αλλαγή | TIMESTAMP

 ### Players
 Περιέχει τους παίκτες και την θέση τους
  | Attribute | Description | DataType 
  | --- | --- | ---
  | `username` | Το όνομα του κάθε χρήστη | VARCHAR
  | `player` | Σειρά Παίκτη | ENUM Primary Key
  | `token` | token του παίκτη | VARCHAR
  | `last_action` | Τελευταία κίνηση του κάθε παίκτη | TIMESTAMP

 
