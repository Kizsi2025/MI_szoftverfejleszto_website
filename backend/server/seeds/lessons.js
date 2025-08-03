// server/seeds/lessons.js
const db = require('../models');

const lessonsSeedData = [
  {
    module_number: 1,
    title: "Szoftverfejlesztői jövőépítők – Az MI alapjai",
    description: "A mesterséges intelligencia fogalmának és történetének megértése szoftverfejlesztési kontextusban. Az MI alapvető működési elveinek (adat, algoritmus, tanulás) azonosítása szoftverfejlesztési rendszerekben.",
    game_theme: "Szoftverfejlesztői MI műhely",
    initial_points: 50,
    unlock_requirements: [],
    objectives: [
      "A mesterséges intelligencia fogalmának megértése",
      "Az MI alapvető működési elveinek azonosítása",
      "A szoftverfejlesztői projektfeladat megalapozása"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "MI alapok kvíz",
          description: "Interaktív villámkvíz szoftverfejlesztési MI példákkal",
          points: 5
        },
        {
          type: "challenge",
          title: "Szoftverfejlesztői MI motor feloldása",
          description: "15 TIP befektetésével feloldható képesség",
          points: 15
        },
        {
          type: "pitch",
          title: "Szoftverfejlesztési modernizációs terv",
          description: "2-3 diás fejlesztési terv prezentálása",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 2,
    title: "Az MI algoritmus-építők – A prediktív szoftverfejlesztés műhelye",
    description: "A felügyelt gépi tanulás (klasszifikáció és regresszió) alapkoncepcióinak megértése és alkalmazása szimulált szoftverfejlesztési projekt keretében.",
    game_theme: "MI szoftvermérnök céhe",
    initial_points: 50,
    unlock_requirements: [1],
    objectives: [
      "A gépi tanulás fogalmának megértése",
      "Klasszifikáció és regresszió megkülönböztetése",
      "Prediktív fejlesztőház tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Gépi tanulás kvíz",
          description: "Felügyelt tanulás alapelveinek tesztelése",
          points: 5
        },
        {
          type: "challenge",
          title: "MI elemző motor",
          description: "Klasszifikáció és regresszió képességek feloldása",
          points: 15
        },
        {
          type: "pitch",
          title: "Modernizációs terv pitch",
          description: "Gépi tanulási megoldások bemutatása",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 3,
    title: "A digitális felderítő céh – A láthatatlan mintázatok nyomában",
    description: "A felügyelet nélküli tanulás (klaszterezés, anomáliadetektálás) alapkoncepcióinak megértése és alkalmazása szoftverüzemeltetési és biztonsági projekt keretében.",
    game_theme: "Digitális felderítő céh",
    initial_points: 50,
    unlock_requirements: [2],
    objectives: [
      "Felügyelet nélküli tanulás megértése",
      "Klaszterezés és anomáliadetektálás alkalmazása",
      "Proaktív incidenskezelő központ tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Felügyelet nélküli tanulás kvíz",
          description: "Mintázatfelismerés és anomáliadetektálás",
          points: 5
        },
        {
          type: "challenge",
          title: "Mintázatfelismerő motor",
          description: "Klaszterezés és anomáliadetektálás képességek",
          points: 15
        },
        {
          type: "pitch",
          title: "Védelmi terv prezentáció",
          description: "Digitális védelmi stratégia bemutatása",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 4,
    title: "Digitális adatvadászok – A szoftverfejlesztés rejtett kincsei",
    description: "Az adatok MI-modellekben betöltött kritikus szerepének megértése, a szoftverfejlesztés során keletkező adattípusok azonosítása, valamint az adatgyűjtés és előkészítés fontosságának elsajátítása.",
    game_theme: "Intelligens adatfeldolgozó műhely",
    initial_points: 50,
    unlock_requirements: [3],
    objectives: [
      "Adatok MI-ben betöltött szerepének megértése",
      "Szoftverfejlesztési adattípusok azonosítása",
      "Adatstratégia kidolgozása"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Adatvadász kvíz",
          description: "Garbage In, Garbage Out elv és adattípusok",
          points: 5
        },
        {
          type: "challenge",
          title: "Adatforrások feltárása",
          description: "Szoftverfejlesztési adatkincstár feltérképezése",
          points: 15
        },
        {
          type: "pitch",
          title: "Adatstratégiai terv",
          description: "Mobiljáték felhasználói elköteleződés előrejelzése",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 5,
    title: "A digitális agykutatók műhelye – Az intelligens párbeszéd építőkövei",
    description: "A neurális hálózatok és a mélytanulás alapkoncepciónak megértése, valamint alkalmazásuknak (pl. természetes nyelvfeldolgozás) felismerése intelligens szoftverfejlesztési projekt keretében.",
    game_theme: "Digitális agykutatók műhelye",
    initial_points: 50,
    unlock_requirements: [4],
    objectives: [
      "Neurális hálózatok alapvető működési elvének megértése",
      "Mélytanulás szoftverfejlesztési alkalmazásainak azonosítása",
      "Intelligens párbeszéd platform tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Agykutatók kvíz",
          description: "Neurális hálózatok és mélytanulás alapjai",
          points: 5
        },
        {
          type: "challenge",
          title: "Neurális mag",
          description: "Mélytanulás architektúra megértése",
          points: 15
        },
        {
          type: "pitch",
          title: "Intelligens platform terv",
          description: "NLP-alapú ügyfélszolgálati rendszer",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 6,
    title: "A jövő fejlesztőinek műhelye – Az MI-korszak kompetenciái",
    description: "Az MI automatizálási és kiegészítő szerepének megértése, a jövő szoftverfejlesztője szükséges új készségek azonosítása, valamint a szakma jövő trendjeinek megvitatása.",
    game_theme: "Jövő fejlesztőinek műhelye",
    initial_points: 50,
    unlock_requirements: [5],
    objectives: [
      "MI automatizálási és kiegészítő szerepének megértése",
      "Szoftverfejlesztői feladatok elemzése",
      "Jövő fejlesztőjének kompetenciacsomagja"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Jövő kódexe kvíz",
          description: "MI vs emberi feladatok besorolása",
          points: 5
        },
        {
          type: "challenge",
          title: "MI-asszisztált fejlesztő",
          description: "Intelligens fejlesztőeszközök használata",
          points: 15
        },
        {
          type: "pitch",
          title: "Kompetenciafejlesztési terv",
          description: "Jövő fejlesztőjének készségcsomagja",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 7,
    title: "Agilis MI-innovátorok – Az intelligens fejlesztőstúdió megalkotása",
    description: "Az agilis módszertanok és az MI kapcsolatának megértése, beleértve a feladatbecslést, kódgenerálást, kódminőség-javítást és az új fejlesztői kompetenciákat.",
    game_theme: "Agilis MI-innovátorok céhe",
    initial_points: 50,
    unlock_requirements: [6],
    objectives: [
      "Agilis módszertanok és MI kapcsolatának megértése",
      "MI-alapú kódgenerálás és feladatbecslés",
      "Intelligens fejlesztőstúdió tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Agilis MI kvíz",
          description: "Scrum, Kanban és MI integration",
          points: 5
        },
        {
          type: "challenge",
          title: "MI kódgenerátor",
          description: "GitHub Copilot és generatív eszközök",
          points: 15
        },
        {
          type: "pitch",
          title: "Agilis modernizációs terv",
          description: "MI-alapú fejlesztési folyamat",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 8,
    title: "Digitális hibavadászok – Az intelligens kódminőség műhelye",
    description: "Az MI szerepének megértése az intelligens kódkiegészítésben, hibakeresésben, kód felülvizsgálat automatizálásában és a statikus kódelemzésben.",
    game_theme: "Intelligens kódminőség műhelye",
    initial_points: 50,
    unlock_requirements: [7],
    objectives: [
      "Intelligens kódkiegészítés és MI-alapú hibakeresés",
      "Tipikus szoftverhibák és kódszagok azonosítása",
      "Proaktív hibakezelő stúdió tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Hibavadász kvíz",
          description: "MI mintázatkeresés és logelemzés",
          points: 5
        },
        {
          type: "challenge",
          title: "Intelligens kódelemző motor",
          description: "Automatizált logelemzés és kód-mintázatfelismerés",
          points: 15
        },
        {
          type: "pitch",
          title: "Kódminőségi stratégia",
          description: "MI-alapú hibakeresési megoldások",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 9,
    title: "Digitális minőségbiztosítók – Az intelligens tesztelés műhelye",
    description: "Az MI szerepének megértése a tesztadat- és tesztgenerálásban, a hibadetektálásban és -predikcióban, valamint az öngyógyító tesztek koncepciójának megismerése.",
    game_theme: "Intelligens tesztelés műhelye",
    initial_points: 50,
    unlock_requirements: [8],
    objectives: [
      "Tesztelés alapjai és automatizált tesztelés szerepe",
      "MI-alapú tesztadat- és teszteset-generálás",
      "Intelligens tesztelési központ tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Minőségbiztosítók kvíz",
          description: "Tesztelési típusok és MI alkalmazások",
          points: 5
        },
        {
          type: "challenge",
          title: "MI tesztadat generátor",
          description: "Valósághű és változatos tesztadatok létrehozása",
          points: 15
        },
        {
          type: "pitch",
          title: "Minőségbiztosítási stratégia",
          description: "Prediktív hibaelemző és öngyógyító tesztek",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 10,
    title: "A folyamatmesterek műhelye – Az intelligens szoftverszállítás",
    description: "A DevOps kultúra és a CI/CD pipeline-ok megértése, valamint az MI szerepének felismerése a build, deployment és monitorozási folyamatok optimalizálásában.",
    game_theme: "Folyamatmesterek műhelye",
    initial_points: 50,
    unlock_requirements: [9],
    objectives: [
      "DevOps kultúra és CI/CD alapelveinek megértése",
      "MI szerepe a build és erőforrás-elosztási folyamatokban",
      "Automatizált szoftverszállító gyár tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "DevOps kvíz",
          description: "CI/CD pipeline és automatizálási alapok",
          points: 5
        },
        {
          type: "challenge",
          title: "Intelligens build motor",
          description: "Build idők predikciója és erőforrás-optimalizálás",
          points: 15
        },
        {
          type: "pitch",
          title: "CI/CD modernizációs stratégia",
          description: "MI-alapú deployment és anomáliadetektálás",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 11,
    title: "A Python mágusok műhelye – Az adatok életre keltése",
    description: "A Python programozási nyelv MI-hez kapcsolódó alapjainak, valamint az alapvető adatkezelő (Pandas) és vizualizációs (Matplotlib) könyvtárak használatának elsajátítása.",
    game_theme: "Adatvarázslók céhe",
    initial_points: 50,
    unlock_requirements: [10],
    objectives: [
      "Python mint MI nyelv megértése",
      "Pandas adatkezelési műveletek megismerése",
      "Intelligens adatelemző rendszer tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Python grimoár kvíz",
          description: "Python könyvtárak és DataFrame alapok",
          points: 5
        },
        {
          type: "challenge",
          title: "Adatbetöltés varázslat",
          description: "CSV fájlok beolvasása és DataFrame kezelés",
          points: 15
        },
        {
          type: "pitch",
          title: "Elemzési riport",
          description: "Python-alapú adatelemzési stratégia",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 12,
    title: "A modellmesterek műhelye – Az előrejelzés tudománya",
    description: "A Scikit-learn könyvtár alapjainak megértése, a gépi tanulási modellek tanításának és tesztelésének (fit-predict) logikája, valamint egy egyszerű klasszifikációs modell felépítése.",
    game_theme: "Modellmesterek műhelye",
    initial_points: 50,
    unlock_requirements: [11],
    objectives: [
      "Scikit-learn könyvtár szerepének megértése",
      "Tanító- és tesztadatok szétválasztásának fontossága",
      "Prediktív elemző központ tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Modellépítők kvíz",
          description: "Supervised learning és Scikit-learn alapok",
          points: 5
        },
        {
          type: "challenge",
          title: "Adatok szétválasztásának rituáléja",
          description: "Train/test split és túltanulás elkerülése",
          points: 15
        },
        {
          type: "pitch",
          title: "Modellépítési terv",
          description: "Fit-predict munkafolyamat és validáció",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 13,
    title: "Az adatkincstárnokok céhe – A prediktív elemzés alapjai",
    description: "Az adatbázisok és az SQL alapjainak megértése, valamint az adatok MI-célú kinyerésének megtervezése üzleti intelligencia projekt keretében.",
    game_theme: "Adatkincstárnokok céhe",
    initial_points: 50,
    unlock_requirements: [12],
    objectives: [
      "Adatbázisok MI-alkalmazásokban betöltött szerepe",
      "SQL alapvető lekérdező parancsainak megismerése",
      "Prediktív adatelemző központ tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Adatkincstárnokok kvíz",
          description: "Relációs adatbázisok és kulcsok szerepe",
          points: 5
        },
        {
          type: "challenge",
          title: "Alapvető lekérdezések",
          description: "SELECT, FROM, WHERE parancsok gyakorlása",
          points: 15
        },
        {
          type: "pitch",
          title: "Adatkinyerési stratégia",
          description: "SQL-alapú üzleti intelligencia megoldások",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 14,
    title: "A modellmenedzserek műhelye – Az intelligens szoftver-életciklus",
    description: "Az MLOps fogalmának, az MI-modellek életciklusának (fejlesztés, telepítés, monitorozás), a verziókezelés szerepének és telepítési stratégiáknak a megértése.",
    game_theme: "Modellmenedzserek műhelye",
    initial_points: 50,
    unlock_requirements: [13],
    objectives: [
      "MLOps fogalmának és szükségességének megértése",
      "MI-modellek életciklusának és verziókezelésének fontossága",
      "Automatizált modellüzemeltető központ tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "MLOps kvíz",
          description: "DevOps vs MLOps és modell életciklus",
          points: 5
        },
        {
          type: "challenge",
          title: "Verziókezelési protokoll",
          description: "Kód, adatok és modellek együttes verziókezelése",
          points: 15
        },
        {
          type: "pitch",
          title: "MLOps modernizációs terv",
          description: "Automatizált pipeline és monitorozási stratégia",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 15,
    title: "Nyelvzsenik és kódalkotók – Az intelligens dokumentáció műhelye",
    description: "Az NLP alapjainak, a kódgenerálásnak és a dokumentáció-automatizálásnak a megértése, valamint a modern nyelvi modellek alkalmazásának megtervezése.",
    game_theme: "Nyelvzsenik és kódalkotók műhelye",
    initial_points: 50,
    unlock_requirements: [14],
    objectives: [
      "Természetes nyelvfeldolgozás és nagy nyelvi modellek alapjai",
      "NLP szoftverfejlesztésben betöltött szerepének azonosítása",
      "Automatizált dokumentációs és fejlesztő központ tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Nyelvzsenik kvíz",
          description: "NLP alapok és szövegelemzési technikák",
          points: 5
        },
        {
          type: "challenge",
          title: "NLP értelmező motor",
          description: "Tokenizálás, kódfelismerés és mintázatkeresés",
          points: 15
        },
        {
          type: "pitch",
          title: "NLP modernizációs terv",
          description: "Kódgenerálás és dokumentáció-automatizálás",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 16,
    title: "A digitális védelmezők műhelye – Az intelligens szoftverbiztonság",
    description: "A szoftverek gyakori sebezhetőségeinek megismerése, az MI szerepe a támadásfelismerésben, valamint a biztonsági tesztelés MI-vel automatizálása.",
    game_theme: "Digitális védelmezők műhelye",
    initial_points: 50,
    unlock_requirements: [15],
    objectives: [
      "Szoftverek gyakori sebezhetőségeinek és MI támadásfelismerésben betöltött szerepe",
      "Anomáliadetektálás és mintázatfelismerés biztonsági kontextusban",
      "Proaktív védelmi központ tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Védelmezők kvíz",
          description: "Sebezhetőségek és MI támadásfelismerés",
          points: 5
        },
        {
          type: "challenge",
          title: "Intelligens fenyegetés-elemző",
          description: "Viselkedésalapú anomáliadetektálás és mintázatfelismerés",
          points: 15
        },
        {
          type: "pitch",
          title: "Biztonsági modernizációs terv",
          description: "Automatizált biztonsági tesztelés és védekezési stratégia",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 17,
    title: "A felhőépítészek műhelye – A skálázható intelligencia",
    description: "A vezető felhőszolgáltatók (AWS, Azure, Google Cloud) és MI-platformjaik megismerése, a felhőalapú MI előnyeinek és hátrányainak megértése.",
    game_theme: "Felhőépítészek műhelye",
    initial_points: 50,
    unlock_requirements: [16],
    objectives: [
      "Felhőalapú MI előnyeinek és hátrányainak megértése",
      "Három nagy felhőszolgáltató alapvető jellemzőinek azonosítása",
      "Skálázható MI-platform tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Felhő kvíz",
          description: "Pay-as-you-go modell és skálázhatóság",
          points: 5
        },
        {
          type: "challenge",
          title: "Nagy felhőszolgáltatók",
          description: "AWS, Google Cloud és Azure összehasonlítása",
          points: 15
        },
        {
          type: "pitch",
          title: "Felhőmigrációs stratégia",
          description: "Menedzselt MI-szolgáltatások kiválasztása",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 18,
    title: "A felelős MI őrzői – Az etikus szoftverfejlesztés műhelye",
    description: "Az MI etikai kihívásainak (adatvédelem, torzítás, méltányosság, átláthatóság) megértése és a felelős fejlesztő gyakorlatok azonosítása.",
    game_theme: "Felelős MI fejlesztők céhe",
    initial_points: 50,
    unlock_requirements: [17],
    objectives: [
      "Adatvédelem (GDPR) és adatbiztonság fontossága MI-fejlesztésben",
      "Torzítás (bias) forrásainak és típusainak azonosítása",
      "Etikus és átlátható MI-labor tervezése"
    ],
    content: {
      activities: [
        {
          type: "quiz",
          title: "Felelős fejlesztők kvíz",
          description: "GDPR, adatvédelem és MI torzítás",
          points: 5
        },
        {
          type: "challenge",
          title: "Adatvédelmi pajzs",
          description: "Anonimizálás, pszeudonimizálás és differenciális adatvédelem",
          points: 15
        },
        {
          type: "pitch",
          title: "Etikai modernizációs terv",
          description: "Méltányosság, átláthatóság és magyarázhatóság",
          points: 25
        }
      ]
    }
  },
  {
    module_number: 19,
    title: "Az MI megoldásmesterek – A gyakorlati tudás próbája",
    description: "A tanult MI/ML, adatkezelési, MLOps és etikai ismeretek integrált alkalmazása egy komplex projektmunka során, a problémamegoldástól a prezentációig.",
    game_theme: "MI megoldásmesterek céhe",
    initial_points: 100,
    unlock_requirements: [18],
    objectives: [
      "Tanult MI/ML ismeretek integrált alkalmazása",
      "Valós problémára épülő MI-projekt prototípus",
      "Komplex projektmunka teljes életciklusa"
    ],
    content: {
      activities: [
        {
          type: "project",
          title: "Projektválasztás és tervezés",
          description: "Projektopciók kiválasztása és alapokmány készítése",
          points: 15
        },
        {
          type: "development",
          title: "Adatfolyam kiépítése",
          description: "Adatok beszerzése, tisztítása és előkészítése",
          points: 20
        },
        {
          type: "modeling",
          title: "Modellépítés és tanítás",
          description: "Scikit-learn modell létrehozása és validálása",
          points: 20
        },
        {
          type: "presentation",
          title: "Demo és prezentáció",
          description: "5-7 perces projekt bemutató és értékelés",
          points: 30
        }
      ]
    }
  }
];

async function seedLessons() {
  try {
    console.log('🌱 Lessons seed adatok betöltése...');
    
    // Ellenőrizzük, hogy vannak-e már leckék
    const existingLessons = await db.Lesson.count();
    if (existingLessons > 0) {
      console.log('⚠️ Már vannak leckék az adatbázisban. Kihagyás...');
      return;
    }

    // Leckék betöltése
    for (const lessonData of lessonsSeedData) {
      await db.Lesson.create(lessonData);
      console.log(`✅ Lecke ${lessonData.module_number}: "${lessonData.title}" hozzáadva`);
    }

    console.log('🎉 Minden lecke sikeresen betöltve!');
  } catch (error) {
    console.error('❌ Hiba a lessons seed során:', error);
    throw error;
  }
}

module.exports = { seedLessons, lessonsSeedData };
