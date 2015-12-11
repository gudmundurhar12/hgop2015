##Vagrant

Vagrant er til að smíða fullbúin þróunarumhverfi með áherslu á sjálfvirknivæðingu til að koma í veg fyrir "það virkaði á minn
i vél" vandamál og villur.

##VirtualBox

VirtualBox er til að keyra virtual stýrikerfi af hvaða tegund sem er á hvaða stýrikerfi sem er. Þ.a. ég get verið með windows sett up á tölvunni minn og sett up virtual mynd af Ubuntu sem að leyfir mér að nota allt sem Ubuntu bíður uppá. 

##Grunt

Grunt er tól sem að keyrir "verkefni" fyrir JavaScript verkefni. Með verkefni á ég við að hann getur t.d. keyrt unit-test, metið kóðann með JSHint, keyrt uglyfy og minify á kóðann o.s.frv. Þ.e. allt sem að ég vill gera við JavaScript projectið mitt til að gera það klárt í production.    

##npm

npm er tól sem að gerir það einfalt að halda utan um og setja upp alla pakka sem Node.js þarf á að halda til að geta keyrt. 

##Node.js

Node.js er cross-platform umhverfi til að skrifa og þróa vefþjónustur í JavaScript.

##bower

Bower er sambærilegt tól við npm en er fyrir JavaScript. Þ.e. það einfaldar og sjálvirknivæðir utanumhald og uppsetningu á JavaScript pökkum.  

## Deployment path topology

Eins og verkefnið er núna þú eru tvær virtual vélar keyrandi, ein dev vél og svo önnur test vél.
Hægt er að keyra test_deploy.sh script til að setja nýjustu útgáfu af docker mynd inn á dockerhup, ssh-að inn á test vélina og nýjasta útgáfa af docker myndinni sótt og sett up.


## Capacity

### Testruns

  √ Should play 200 games in 10 seconds. (7710ms)

  1 passing (8s)

  √ Should play 200 games in 10 seconds. (5665ms)

  1 passing (6s)

  √ Should play 200 games in 10 seconds. (5984ms)

  1 passing (6s)

  √ Should play 200 games in 10 seconds. (7463ms)

  1 passing (7s)

  √ Should play 200 games in 10 seconds. (5424ms)

  1 passing (5s)

  √ Should play 200 games in 10 seconds. (7397ms)

  1 passing (7s)

Þeir leikir sem eru búnir til og prufaðir í álagsprófinu eru allir spilaðir á sama tíma, þannig að þeir keyra í "parallel" . NoteJS notar asynchronous non-blocking IO köll, þannig að allar skipanir, sem eru í for lykkjunni, eru sendar afstað en ferlið bíður ekki eftir svari. Þegar svarið berst er QED fallið keyrt sem kallar á done() fallið þegar fjölda leikja er náð.

Hægt er t.d. að sjá þetta á server loggnum:

GET /api/gameHistory/133 200 116ms
GET /api/gameHistory/145 200 142ms
GET /api/gameHistory/138 200 116ms
GET /api/gameHistory/147 200 115ms
GET /api/gameHistory/146 200 115ms
GET /api/gameHistory/144 200 112ms

Hér sést að gameId eru ekki í hækkandi röð, sem væri ekki tilfellið ef prófin myndu keyra hvert á eftir öðru.