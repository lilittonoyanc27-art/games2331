export interface SentenceItem {
  id: string;
  sourceText: string;
  targetText: string;
  paragraphIndex: number;
}

export interface Story {
  id: string;
  titleSource: string;
  titleTarget: string;
  sourceLang: 'hy' | 'es';
  targetLang: 'es' | 'hy';
  paragraphs: SentenceItem[][];
}

export interface QuizOption {
  key: 'A' | 'B' | 'C' | 'D';
  es: string;
  hy: string;
}

export interface QuizQuestion {
  id: number;
  questionEs: string;
  questionHy: string;
  options: QuizOption[];
  correctKey: 'A' | 'B' | 'C' | 'D';
}

export interface QuizSection {
  id: string;
  titleEs: string;
  titleHy: string;
  description: string;
  questions: QuizQuestion[];
}

export interface PracticeAnswer {
  es: string;
  hy: string;
}

export interface PracticeQuestion {
  number: number;
  questionEs: string;
  questionHy: string;
  tense: 'Pretérito Perfecto' | 'Pretérito Imperfecto';
  tenseHy: string;
  sampleAnswers: PracticeAnswer[];
}

export interface VerbException {
  id: string;
  verb: string;
  infinitiveHy: string;
  tense: 'Pretérito Perfecto (Participio)' | 'Pretérito Imperfecto';
  correctForm: string;
  regularTrap: string; // the common false regular mistake
  isIrregular: boolean;
  explanation: string;
  explanationHy: string;
  exampleSentenceEs: string;
  exampleSentenceHy: string;
}

export const STORIES_DATA: Story[] = [
  {
    id: 'pedro-travels',
    titleSource: 'Պեդրոն և նրա ճանապարհորդությունները',
    titleTarget: 'Pedro y sus viajes',
    sourceLang: 'hy',
    targetLang: 'es',
    paragraphs: [
      [
        {
          id: 'p1-s1',
          paragraphIndex: 0,
          sourceText: 'Պեդրոն շատ է սիրում մեքենայով տարբեր վայրեր գնալ։',
          targetText: 'A Pedro le gusta mucho ir en coche a diferentes lugares.',
        },
        {
          id: 'p1-s2',
          paragraphIndex: 0,
          sourceText: 'Այս տարի նա արդեն շատ հետաքրքիր վայրեր է այցելել։',
          targetText: 'Este año ya ha visitado muchos lugares interesantes.',
        },
      ],
      [
        {
          id: 'p2-s1',
          paragraphIndex: 1,
          sourceText: 'Նա մի քանի անգամ մեքենայով գնացել է լեռներ և այնտեղ շատ գեղեցիկ բնություն է տեսել։',
          targetText: 'Ha ido varias veces en coche a las montañas y allí ha visto una naturaleza muy bonita.',
        },
        {
          id: 'p2-s2',
          paragraphIndex: 1,
          sourceText: 'Նա նաև այցելել է տարբեր փոքր քաղաքներ և գյուղեր։',
          targetText: 'También ha visitado diferentes ciudades pequeñas y pueblos.',
        },
      ],
      [
        {
          id: 'p3-s1',
          paragraphIndex: 2,
          sourceText: 'Այս ամիս Պեդրոն իր ընկերների հետ մեքենայով գնացել է մի գեղեցիկ լիճ։',
          targetText: 'Este mes Pedro ha ido en coche con sus amigos a un lago muy bonito.',
        },
        {
          id: 'p3-s2',
          paragraphIndex: 2,
          sourceText: 'Նրանք ամբողջ օրը այնտեղ են անցկացրել, զբոսնել են և շատ են զրուցել։',
          targetText: 'Han pasado allí todo el día, han paseado y han hablado mucho.',
        },
        {
          id: 'p3-s3',
          paragraphIndex: 2,
          sourceText: 'Պեդրոն նաև շատ լուսանկարներ է արել։',
          targetText: 'Pedro también ha hecho muchas fotos.',
        },
      ],
      [
        {
          id: 'p4-s1',
          paragraphIndex: 3,
          sourceText: 'Վերջերս նա մեքենայով գնացել է մեկ այլ քաղաք։',
          targetText: 'Hace poco ha ido en coche a otra ciudad.',
        },
        {
          id: 'p4-s2',
          paragraphIndex: 3,
          sourceText: 'Նա այցելել է քաղաքի կենտրոնը, տեսել է հին շենքեր և ճաշել է փոքր ռեստորանում։',
          targetText: 'Ha visitado el centro de la ciudad, ha visto edificios antiguos y ha comido en un pequeño restaurante.',
        },
      ],
      [
        {
          id: 'p5-s1',
          paragraphIndex: 4,
          sourceText: 'Պեդրոն դեռ շատ վայրեր չի այցելել, բայց արդեն որոշել է, որ այս տարի ավելի շատ է ճանապարհորդելու։',
          targetText: 'Pedro todavía no ha visitado muchos lugares, pero ya ha decidido que este año viajará más.',
        },
        {
          id: 'p5-s2',
          paragraphIndex: 4,
          sourceText: 'Նա միշտ սիրել է մեքենայով նոր վայրեր բացահայտել։',
          targetText: 'Siempre le ha gustado descubrir nuevos lugares en coche.',
        },
      ],
    ],
  },
  {
    id: 'carlos-lucia',
    titleSource: 'Carlos y Lucía cuando eran jóvenes',
    titleTarget: 'Կառլոսն ու Լուսիան, երբ երիտասարդ էին',
    sourceLang: 'es',
    targetLang: 'hy',
    paragraphs: [
      [
        {
          id: 'c1-s1',
          paragraphIndex: 0,
          sourceText: 'Cuando Carlos y Lucía eran jóvenes, vivían en una ciudad pequeña cerca del mar.',
          targetText: 'Երբ Կառլոսն ու Լուսիան երիտասարդ էին, նրանք ապրում էին ծովի մոտ գտնվող մի փոքր քաղաքում։',
        },
        {
          id: 'c1-s2',
          paragraphIndex: 0,
          sourceText: 'Carlos trabajaba en una tienda de deportes y Lucía estudiaba en la universidad.',
          targetText: 'Կառլոսն աշխատում էր սպորտային խանութում, իսկ Լուսիան սովորում էր համալսարանում։',
        },
        {
          id: 'c1-s3',
          paragraphIndex: 0,
          sourceText: 'Los dos tenían una vida tranquila y sencilla.',
          targetText: 'Երկուսն էլ հանգիստ և պարզ կյանք ունեին։',
        },
      ],
      [
        {
          id: 'c2-s1',
          paragraphIndex: 1,
          sourceText: 'Cada mañana, Carlos se levantaba temprano, desayunaba café con pan y caminaba hasta su trabajo.',
          targetText: 'Ամեն առավոտ Կառլոսը շուտ էր արթնանում, սուրճ ու հաց էր նախաճաշում և ոտքով գնում էր աշխատանքի։',
        },
        {
          id: 'c2-s2',
          paragraphIndex: 1,
          sourceText: 'La tienda abría a las nueve y normalmente había muchos clientes.',
          targetText: 'Խանութը բացվում էր ժամը իննին, և սովորաբար շատ հաճախորդներ էին լինում։',
        },
        {
          id: 'c2-s3',
          paragraphIndex: 1,
          sourceText: 'Carlos hablaba con ellos, organizaba los productos y ayudaba a sus compañeros.',
          targetText: 'Կառլոսը խոսում էր նրանց հետ, դասավորում էր ապրանքները և օգնում էր իր գործընկերներին։',
        },
      ],
      [
        {
          id: 'c3-s1',
          paragraphIndex: 2,
          sourceText: 'Lucía, por su parte, iba a la universidad de lunes a viernes.',
          targetText: 'Լուսիան, իր հերթին, երկուշաբթիից ուրբաթ գնում էր համալսարան։',
        },
        {
          id: 'c3-s2',
          paragraphIndex: 2,
          sourceText: 'Estudiaba idiomas y le gustaba mucho aprender cosas nuevas.',
          targetText: 'Նա լեզուներ էր սովորում և շատ էր սիրում նոր բաներ սովորել։',
        },
        {
          id: 'c3-s3',
          paragraphIndex: 2,
          sourceText: 'Después de las clases, a veces iba a una cafetería con sus amigas y hablaban durante horas.',
          targetText: 'Դասերից հետո երբեմն իր ընկերուհիների հետ գնում էր սրճարան, և նրանք ժամերով զրուցում էին։',
        },
      ],
      [
        {
          id: 'c4-s1',
          paragraphIndex: 3,
          sourceText: 'Carlos y Lucía se veían casi todos los días.',
          targetText: 'Կառլոսն ու Լուսիան գրեթե ամեն օր տեսնվում էին։',
        },
        {
          id: 'c4-s2',
          paragraphIndex: 3,
          sourceText: 'Por las tardes paseaban por el centro, tomaban algo en una cafetería o iban al parque.',
          targetText: 'Երեկոյան նրանք զբոսնում էին քաղաքի կենտրոնում, ինչ-որ բան էին խմում սրճարանում կամ գնում էին այգի։',
        },
        {
          id: 'c4-s3',
          paragraphIndex: 3,
          sourceText: 'Los fines de semana visitaban a sus familias o viajaban a pueblos cercanos.',
          targetText: 'Հանգստյան օրերին այցելում էին իրենց ընտանիքներին կամ ճամփորդում էին մոտակա փոքր քաղաքներ։',
        },
      ],
      [
        {
          id: 'c5-s1',
          paragraphIndex: 4,
          sourceText: 'En aquella época no tenían mucho dinero, pero eran felices.',
          targetText: 'Այդ ժամանակ նրանք շատ փող չունեին, բայց երջանիկ էին։',
        },
        {
          id: 'c5-s2',
          paragraphIndex: 4,
          sourceText: 'Disfrutaban de las cosas sencillas y siempre encontraban tiempo para estar juntos.',
          targetText: 'Նրանք վայելում էին պարզ բաները և միշտ ժամանակ էին գտնում միասին լինելու համար։',
        },
      ],
    ],
  },
];

export const QUIZZES_DATA: QuizSection[] = [
  {
    id: 'quiz-pedro',
    titleEs: '1. Pedro y sus viajes',
    titleHy: 'Պեդրոն և նրա ճանապարհորդությունները',
    description: 'Pretérito Perfecto ըմբռնման հարցաշար (Սեղմեք հարցի վրա՝ հայերեն թարգմանությունը տեսնելու համար)',
    questions: [
      {
        id: 1,
        questionEs: '¿Cómo le gusta viajar a Pedro?',
        questionHy: 'Պեդրոն ինչպե՞ս է սիրում ճանապարհորդել։',
        options: [
          { key: 'A', es: 'En coche', hy: 'մեքենայով' },
          { key: 'B', es: 'En avión', hy: 'ինքնաթիռով' },
          { key: 'C', es: 'En tren', hy: 'գնացքով' },
          { key: 'D', es: 'En barco', hy: 'նավով' },
        ],
        correctKey: 'A',
      },
      {
        id: 2,
        questionEs: '¿Adónde ha ido Pedro varias veces?',
        questionHy: 'Պեդրոն մի քանի անգամ որտե՞ղ է գնացել։',
        options: [
          { key: 'A', es: 'A las montañas', hy: 'լեռներ' },
          { key: 'B', es: 'A la playa', hy: 'լողափ' },
          { key: 'C', es: 'A Madrid', hy: 'Մադրիդ' },
          { key: 'D', es: 'A una isla', hy: 'կղզի' },
        ],
        correctKey: 'A',
      },
      {
        id: 3,
        questionEs: '¿Qué ha visto Pedro en las montañas?',
        questionHy: 'Ի՞նչ է Պեդրոն տեսել լեռներում։',
        options: [
          { key: 'A', es: 'Una naturaleza muy bonita', hy: 'շատ գեղեցիկ բնություն' },
          { key: 'B', es: 'Un estadio grande', hy: 'մեծ մարզադաշտ' },
          { key: 'C', es: 'Un museo moderno', hy: 'ժամանակակից թանգարան' },
          { key: 'D', es: 'Una universidad', hy: 'համալսարան' },
        ],
        correctKey: 'A',
      },
      {
        id: 4,
        questionEs: '¿Con quién ha ido Pedro al lago este mes?',
        questionHy: 'Այս ամիս Պեդրոն ո՞ւմ հետ է գնացել լիճ։',
        options: [
          { key: 'A', es: 'Con sus amigos', hy: 'իր ընկերների հետ' },
          { key: 'B', es: 'Con sus padres', hy: 'իր ծնողների հետ' },
          { key: 'C', es: 'Solo', hy: 'մենակ' },
          { key: 'D', es: 'Con sus compañeros', hy: 'իր գործընկերների հետ' },
        ],
        correctKey: 'A',
      },
      {
        id: 5,
        questionEs: '¿Cuánto tiempo han pasado en el lago?',
        questionHy: 'Որքա՞ն ժամանակ են անցկացրել լճի մոտ։',
        options: [
          { key: 'A', es: 'Todo el día', hy: 'ամբողջ օրը' },
          { key: 'B', es: 'Una hora', hy: 'մեկ ժամ' },
          { key: 'C', es: 'Dos días', hy: 'երկու օր' },
          { key: 'D', es: 'Una semana', hy: 'մեկ շաբաթ' },
        ],
        correctKey: 'A',
      },
      {
        id: 6,
        questionEs: '¿Qué ha hecho Pedro en el lago?',
        questionHy: 'Ի՞նչ է արել Պեդրոն լճի մոտ։',
        options: [
          { key: 'A', es: 'Ha hecho muchas fotos', hy: 'շատ լուսանկարներ է արել' },
          { key: 'B', es: 'Ha trabajado', hy: 'աշխատել է' },
          { key: 'C', es: 'Ha estudiado', hy: 'սովորել է' },
          { key: 'D', es: 'Ha comprado ropa', hy: 'հագուստ է գնել' },
        ],
        correctKey: 'A',
      },
      {
        id: 7,
        questionEs: '¿Qué ha visitado Pedro recientemente en otra ciudad?',
        questionHy: 'Վերջերս մեկ այլ քաղաքում Պեդրոն ի՞նչ է այցելել։',
        options: [
          { key: 'A', es: 'El centro de la ciudad', hy: 'քաղաքի կենտրոնը' },
          { key: 'B', es: 'Un aeropuerto', hy: 'օդանավակայան' },
          { key: 'C', es: 'Una playa', hy: 'լողափ' },
          { key: 'D', es: 'Un estadio', hy: 'մարզադաշտ' },
        ],
        correctKey: 'A',
      },
      {
        id: 8,
        questionEs: '¿Qué edificios ha visto Pedro?',
        questionHy: 'Ի՞նչ շենքեր է Պեդրոն տեսել։',
        options: [
          { key: 'A', es: 'Edificios antiguos', hy: 'հին շենքեր' },
          { key: 'B', es: 'Edificios modernos', hy: 'ժամանակակից շենքեր' },
          { key: 'C', es: 'Fábricas', hy: 'գործարաններ' },
          { key: 'D', es: 'Hoteles', hy: 'հյուրանոցներ' },
        ],
        correctKey: 'A',
      },
      {
        id: 9,
        questionEs: '¿Dónde ha comido Pedro?',
        questionHy: 'Որտե՞ղ է Պեդրոն ճաշել։',
        options: [
          { key: 'A', es: 'En un pequeño restaurante', hy: 'փոքր ռեստորանում' },
          { key: 'B', es: 'En casa', hy: 'տանը' },
          { key: 'C', es: 'En una universidad', hy: 'համալսարանում' },
          { key: 'D', es: 'En una estación', hy: 'կայարանում' },
        ],
        correctKey: 'A',
      },
      {
        id: 10,
        questionEs: '¿Qué ha decidido Pedro para este año?',
        questionHy: 'Ի՞նչ է որոշել Պեդրոն այս տարվա համար։',
        options: [
          { key: 'A', es: 'Viajar más', hy: 'ավելի շատ ճանապարհորդել' },
          { key: 'B', es: 'No viajar más', hy: 'այլևս չճանապարհորդել' },
          { key: 'C', es: 'Vender su coche', hy: 'վաճառել իր մեքենան' },
          { key: 'D', es: 'Mudarse a otro país', hy: 'տեղափոխվել այլ երկիր' },
        ],
        correctKey: 'A',
      },
    ],
  },
  {
    id: 'quiz-carlos-lucia',
    titleEs: '2. Carlos y Lucía cuando eran jóvenes',
    titleHy: 'Կառլոսն ու Լուսիան, երբ երիտասարդ էին',
    description: 'Pretérito Imperfecto ըմբռնման հարցաշար (Սեղմեք հարցի վրա՝ հայերեն թարգմանությունը տեսնելու համար)',
    questions: [
      {
        id: 1,
        questionEs: '¿Dónde vivían Carlos y Lucía cuando eran jóvenes?',
        questionHy: 'Որտե՞ղ էին ապրում Կառլոսն ու Լուսիան, երբ երիտասարդ էին։',
        options: [
          { key: 'A', es: 'En una ciudad pequeña cerca del mar', hy: 'ծովի մոտ գտնվող փոքր քաղաքում' },
          { key: 'B', es: 'En una gran capital', hy: 'մեծ մայրաքաղաքում' },
          { key: 'C', es: 'En un pueblo de montaña', hy: 'լեռնային գյուղում' },
          { key: 'D', es: 'En otro país', hy: 'այլ երկրում' },
        ],
        correctKey: 'A',
      },
      {
        id: 2,
        questionEs: '¿Dónde trabajaba Carlos?',
        questionHy: 'Որտե՞ղ էր աշխատում Կառլոսը։',
        options: [
          { key: 'A', es: 'En una tienda de deportes', hy: 'սպորտային խանութում' },
          { key: 'B', es: 'En una universidad', hy: 'համալսարանում' },
          { key: 'C', es: 'En un hospital', hy: 'հիվանդանոցում' },
          { key: 'D', es: 'En una cafetería', hy: 'սրճարանում' },
        ],
        correctKey: 'A',
      },
      {
        id: 3,
        questionEs: '¿Qué hacía Lucía?',
        questionHy: 'Ի՞նչ էր անում Լուսիան։',
        options: [
          { key: 'A', es: 'Estudiaba en la universidad', hy: 'սովորում էր համալսարանում' },
          { key: 'B', es: 'Trabajaba en una tienda', hy: 'աշխատում էր խանութում' },
          { key: 'C', es: 'Era médica', hy: 'բժիշկ էր' },
          { key: 'D', es: 'Trabajaba en un restaurante', hy: 'աշխատում էր ռեստորանում' },
        ],
        correctKey: 'A',
      },
      {
        id: 4,
        questionEs: '¿Qué desayunaba Carlos cada mañana?',
        questionHy: 'Ի՞նչ էր նախաճաշում Կառլոսն ամեն առավոտ։',
        options: [
          { key: 'A', es: 'Café con pan', hy: 'սուրճ և հաց' },
          { key: 'B', es: 'Té con fruta', hy: 'թեյ և միրգ' },
          { key: 'C', es: 'Leche con cereales', hy: 'կաթ և հացահատիկ' },
          { key: 'D', es: 'Zumo con huevos', hy: 'հյութ և ձու' },
        ],
        correctKey: 'A',
      },
      {
        id: 5,
        questionEs: '¿A qué hora abría la tienda?',
        questionHy: 'Ժամը քանիսի՞ն էր բացվում խանութը։',
        options: [
          { key: 'A', es: 'A las nueve', hy: 'ժամը իննին' },
          { key: 'B', es: 'A las siete', hy: 'ժամը յոթին' },
          { key: 'C', es: 'A las diez', hy: 'ժամը տասին' },
          { key: 'D', es: 'A las doce', hy: 'ժամը տասներկուսին' },
        ],
        correctKey: 'A',
      },
      {
        id: 6,
        questionEs: '¿Qué estudiaba Lucía en la universidad?',
        questionHy: 'Ի՞նչ էր սովորում Լուսիան համալսարանում։',
        options: [
          { key: 'A', es: 'Idiomas', hy: 'լեզուներ' },
          { key: 'B', es: 'Medicina', hy: 'բժշկություն' },
          { key: 'C', es: 'Arquitectura', hy: 'ճարտարապետություն' },
          { key: 'D', es: 'Matemáticas', hy: 'մաթեմատիկա' },
        ],
        correctKey: 'A',
      },
      {
        id: 7,
        questionEs: '¿Qué hacía Lucía a veces después de las clases?',
        questionHy: 'Ի՞նչ էր երբեմն անում Լուսիան դասերից հետո։',
        options: [
          { key: 'A', es: 'Iba a una cafetería con sus amigas', hy: 'ընկերուհիների հետ գնում էր սրճարան' },
          { key: 'B', es: 'Iba a trabajar', hy: 'գնում էր աշխատանքի' },
          { key: 'C', es: 'Jugaba al fútbol', hy: 'ֆուտբոլ էր խաղում' },
          { key: 'D', es: 'Se quedaba siempre en casa', hy: 'միշտ մնում էր տանը' },
        ],
        correctKey: 'A',
      },
      {
        id: 8,
        questionEs: '¿Con qué frecuencia se veían Carlos y Lucía?',
        questionHy: 'Որքա՞ն հաճախ էին տեսնվում Կառլոսն ու Լուսիան։',
        options: [
          { key: 'A', es: 'Casi todos los días', hy: 'գրեթե ամեն օր' },
          { key: 'B', es: 'Una vez al mes', hy: 'ամիսը մեկ անգամ' },
          { key: 'C', es: 'Solo los domingos', hy: 'միայն կիրակի օրերին' },
          { key: 'D', es: 'Una vez al año', hy: 'տարին մեկ անգամ' },
        ],
        correctKey: 'A',
      },
      {
        id: 9,
        questionEs: '¿Qué hacían los fines de semana?',
        questionHy: 'Ի՞նչ էին անում հանգստյան օրերին։',
        options: [
          { key: 'A', es: 'Visitaban a sus familias o viajaban a pueblos cercanos', hy: 'այցելում էին իրենց ընտանիքներին կամ գնում մոտակա փոքր քաղաքներ' },
          { key: 'B', es: 'Trabajaban todo el día', hy: 'ամբողջ օրը աշխատում էին' },
          { key: 'C', es: 'Estudiaban siempre', hy: 'միշտ սովորում էին' },
          { key: 'D', es: 'Se quedaban siempre en casa', hy: 'միշտ մնում էին տանը' },
        ],
        correctKey: 'A',
      },
      {
        id: 10,
        questionEs: '¿Cómo eran Carlos y Lucía aunque no tenían mucho dinero?',
        questionHy: 'Ինչպիսի՞ն էին Կառլոսն ու Լուսիան, չնայած շատ փող չունեին։',
        options: [
          { key: 'A', es: 'Eran felices', hy: 'երջանիկ էին' },
          { key: 'B', es: 'Estaban siempre tristes', hy: 'միշտ տխուր էին' },
          { key: 'C', es: 'Eran muy ricos', hy: 'շատ հարուստ էին' },
          { key: 'D', es: 'Estaban siempre enfadados', hy: 'միշտ զայրացած էին' },
        ],
        correctKey: 'A',
      },
    ],
  },
];

export const PRACTICE_QUESTIONS_DATA: PracticeQuestion[] = [
  {
    number: 1,
    questionEs: '¿Qué has hecho hoy por la mañana?',
    questionHy: 'Ի՞նչ ես արել այսօր առավոտյան։',
    tense: 'Pretérito Perfecto',
    tenseHy: 'Վաղակատար ներկա (Ավարտված գործողություն այսօր/ժամանակային կապով)',
    sampleAnswers: [
      {
        es: 'He desayunado y he tomado café.',
        hy: 'Նախաճաշել եմ և սուրճ եմ խմել։',
      },
      {
        es: 'He trabajado un poco en casa.',
        hy: 'Մի քիչ աշխատել եմ տանը։',
      },
      {
        es: 'He ido al supermercado.',
        hy: 'Գնացել եմ սուպերմարկետ։',
      },
      {
        es: 'He hablado con mi familia.',
        hy: 'Խոսել եմ ընտանիքիս հետ։',
      },
      {
        es: 'He descansado y he escuchado música.',
        hy: 'Հանգստացել եմ և երաժշտություն եմ լսել։',
      },
    ],
  },
  {
    number: 2,
    questionEs: '¿Has hablado con tus amigos esta semana? ¿De qué habéis hablado?',
    questionHy: 'Այս շաբաթ խոսե՞լ ես ընկերներիդ հետ։ Ինչի՞ մասին եք խոսել։',
    tense: 'Pretérito Perfecto',
    tenseHy: 'Վաղակատար ներկա (Այս շաբաթվա գործողություններ)',
    sampleAnswers: [
      {
        es: 'Sí, he hablado con mis amigos. Hemos hablado del trabajo.',
        hy: 'Այո, խոսել եմ ընկերներիս հետ։ Խոսել ենք աշխատանքի մասին։',
      },
      {
        es: 'Sí, hemos hablado de nuestros planes para el fin de semana.',
        hy: 'Այո, խոսել ենք հանգստյան օրերի մեր ծրագրերի մասին։',
      },
      {
        es: 'Hemos hablado de viajes y vacaciones.',
        hy: 'Խոսել ենք ճանապարհորդությունների և արձակուրդների մասին։',
      },
      {
        es: 'Hemos hablado de una película que hemos visto.',
        hy: 'Խոսել ենք մի ֆիլմի մասին, որը դիտել ենք։',
      },
      {
        es: 'No, esta semana no he hablado mucho con mis amigos.',
        hy: 'Ոչ, այս շաբաթ շատ չեմ խոսել ընկերներիս հետ։',
      },
    ],
  },
  {
    number: 3,
    questionEs: '¿Has viajado alguna vez a otro país? ¿Adónde has ido?',
    questionHy: 'Երբևէ ճանապարհորդե՞լ ես այլ երկիր։ Որտե՞ղ ես գնացել։',
    tense: 'Pretérito Perfecto',
    tenseHy: 'Վաղակատար ներկա (Կյանքի փորձ / alguna vez)',
    sampleAnswers: [
      {
        es: 'Sí, he viajado a España.',
        hy: 'Այո, ճանապարհորդել եմ Իսպանիա։',
      },
      {
        es: 'Sí, he estado en Italia y Francia.',
        hy: 'Այո, եղել եմ Իտալիայում և Ֆրանսիայում։',
      },
      {
        es: 'He viajado varias veces a Georgia.',
        hy: 'Մի քանի անգամ ճանապարհորդել եմ Վրաստան։',
      },
      {
        es: 'Sí, he ido a Alemania.',
        hy: 'Այո, գնացել եմ Գերմանիա։',
      },
      {
        es: 'No, todavía no he viajado a otro país.',
        hy: 'Ոչ, դեռ չեմ ճանապարհորդել այլ երկիր։',
      },
    ],
  },
  {
    number: 6,
    questionEs: '¿Dónde vivías cuando eras niño/a?',
    questionHy: 'Որտե՞ղ էիր ապրում, երբ երեխա էիր։',
    tense: 'Pretérito Imperfecto',
    tenseHy: 'Անկատար անցյալ (Անցյալի երկարատև վիճակ/սովորություն)',
    sampleAnswers: [
      {
        es: 'Vivía en una ciudad pequeña.',
        hy: 'Ապրում էի փոքր քաղաքում։',
      },
      {
        es: 'Vivía con mis padres en un apartamento.',
        hy: 'Ապրում էի ծնողներիս հետ բնակարանում։',
      },
      {
        es: 'Vivía cerca de mi escuela.',
        hy: 'Ապրում էի դպրոցիս մոտ։',
      },
      {
        es: 'Vivía en el centro de la ciudad.',
        hy: 'Ապրում էի քաղաքի կենտրոնում։',
      },
      {
        es: 'Vivía en un pueblo con mi familia.',
        hy: 'Ապրում էի գյուղում ընտանիքիս հետ։',
      },
    ],
  },
  {
    number: 7,
    questionEs: '¿Qué comida te gustaba mucho cuando eras pequeño/a?',
    questionHy: 'Ի՞նչ ուտելիք էիր շատ սիրում, երբ փոքր էիր։',
    tense: 'Pretérito Imperfecto',
    tenseHy: 'Անկատար անցյալ (Անցյալի նախասիրություններ)',
    sampleAnswers: [
      {
        es: 'Me gustaban mucho los dulces.',
        hy: 'Շատ էի սիրում քաղցրավենիք։',
      },
      {
        es: 'Me gustaba la pasta.',
        hy: 'Սիրում էի մակարոնեղեն։',
      },
      {
        es: 'Me gustaba mucho el chocolate.',
        hy: 'Շատ էի սիրում շոկոլադ։',
      },
      {
        es: 'Me gustaban las frutas.',
        hy: 'Սիրում էի մրգերը։',
      },
    ],
  },
  {
    number: 8,
    questionEs: '¿Qué hacías durante las vacaciones de verano cuando eras niño/a?',
    questionHy: 'Ի՞նչ էիր անում ամառային արձակուրդների ժամանակ, երբ երեխա էիր։',
    tense: 'Pretérito Imperfecto',
    tenseHy: 'Անկատար անցյալ (Անցյալում կրկնվող սովորական գործողություններ)',
    sampleAnswers: [
      {
        es: 'Iba a la playa con mi familia.',
        hy: 'Ընտանիքիս հետ գնում էի լողափ։',
      },
      {
        es: 'Jugaba con mis amigos todos los días.',
        hy: 'Ամեն օր խաղում էի ընկերներիս հետ։',
      },
      {
        es: 'Visitaba a mis abuelos.',
        hy: 'Այցելում էի տատիկիս ու պապիկիս։',
      },
      {
        es: 'Viajaba con mi familia.',
        hy: 'Ճանապարհորդում էի ընտանիքիս հետ։',
      },
      {
        es: 'Pasaba mucho tiempo al aire libre.',
        hy: 'Շատ ժամանակ էի անցկացնում դրսում։',
      },
    ],
  },
  {
    number: 9,
    questionEs: '¿Qué programas de televisión veías cuando eras pequeño/a?',
    questionHy: 'Ի՞նչ հեռուստահաղորդումներ էիր դիտում, երբ փոքր էիր։',
    tense: 'Pretérito Imperfecto',
    tenseHy: 'Անկատար անցյալ (Անցյալում դիտած հաղորդումներ)',
    sampleAnswers: [
      {
        es: 'Veía dibujos animados.',
        hy: 'Մուլտֆիլմեր էի դիտում։',
      },
      {
        es: 'Veía programas infantiles.',
        hy: 'Մանկական հաղորդումներ էի դիտում։',
      },
      {
        es: 'Veía películas con mi familia.',
        hy: 'Ֆիլմեր էի դիտում ընտանիքիս հետ։',
      },
      {
        es: 'Veía programas de animales.',
        hy: 'Կենդանիների մասին հաղորդումներ էի դիտում։',
      },
      {
        es: 'Veía series de televisión por la tarde.',
        hy: 'Երեկոյան հեռուստասերիալներ էի դիտում։',
      },
    ],
  },
];

export const VERB_EXCEPTIONS_DATA: VerbException[] = [
  // Pretérito Perfecto Irregular Participles
  {
    id: 'exc-hacer',
    verb: 'Hacer',
    infinitiveHy: 'Անել',
    tense: 'Pretérito Perfecto (Participio)',
    correctForm: 'hecho (he hecho)',
    regularTrap: 'hacido ❌',
    isIrregular: true,
    explanation: 'El participio de "hacer" es irregular: "hecho" (nunca "hacido").',
    explanationHy: '«Hacer» բայի հարակատար դերբայը (participio) անկանոն է՝ «hecho» (ոչ թե hacido):',
    exampleSentenceEs: 'Pedro ha hecho muchas fotos.',
    exampleSentenceHy: 'Պեդրոն շատ լուսանկարներ է արել։',
  },
  {
    id: 'exc-ver-perf',
    verb: 'Ver',
    infinitiveHy: 'Տեսնել',
    tense: 'Pretérito Perfecto (Participio)',
    correctForm: 'visto (ha visto)',
    regularTrap: 'veído / vido ❌',
    isIrregular: true,
    explanation: 'El participio de "ver" es irregular: "visto".',
    explanationHy: '«Ver» բայի participio-ն անկանոն է՝ «visto» (ոչ թե veído):',
    exampleSentenceEs: 'Allí ha visto una naturaleza muy bonita.',
    exampleSentenceHy: 'Այնտեղ շատ գեղեցիկ բնություն է տեսել։',
  },
  {
    id: 'exc-decir',
    verb: 'Decir',
    infinitiveHy: 'Ասել',
    tense: 'Pretérito Perfecto (Participio)',
    correctForm: 'dicho (ha dicho)',
    regularTrap: 'decido ❌',
    isIrregular: true,
    explanation: 'El participio de "decir" es irregular: "dicho".',
    explanationHy: '«Decir» բայի participio-ն անկանոն է՝ «dicho»:',
    exampleSentenceEs: 'Pedro me ha dicho la verdad.',
    exampleSentenceHy: 'Պեդրոն ինձ ճշմարտությունն է ասել։',
  },
  {
    id: 'exc-escribir',
    verb: 'Escribir',
    infinitiveHy: 'Գրել',
    tense: 'Pretérito Perfecto (Participio)',
    correctForm: 'escrito (he escrito)',
    regularTrap: 'escribido ❌',
    isIrregular: true,
    explanation: 'El participio de "escribir" es irregular: "escrito".',
    explanationHy: '«Escribir» բայի participio-ն անկանոն է՝ «escrito»:',
    exampleSentenceEs: 'He escrito una carta en español.',
    exampleSentenceHy: 'Ես նամակ եմ գրել իսպաներենով։',
  },
  {
    id: 'exc-abrir',
    verb: 'Abrir',
    infinitiveHy: 'Բացել',
    tense: 'Pretérito Perfecto (Participio)',
    correctForm: 'abierto (ha abierto)',
    regularTrap: 'abrido ❌',
    isIrregular: true,
    explanation: 'El participio de "abrir" es irregular: "abierto".',
    explanationHy: '«Abrir» բայի participio-ն անկանոն է՝ «abierto»:',
    exampleSentenceEs: 'Han abierto una nueva tienda.',
    exampleSentenceHy: 'Նրանք նոր խանութ են բացել։',
  },
  {
    id: 'exc-poner',
    verb: 'Poner',
    infinitiveHy: 'Դնել',
    tense: 'Pretérito Perfecto (Participio)',
    correctForm: 'puesto (he puesto)',
    regularTrap: 'ponido ❌',
    isIrregular: true,
    explanation: 'El participio de "poner" es irregular: "puesto".',
    explanationHy: '«Poner» բայի participio-ն անկանոն է՝ «puesto»:',
    exampleSentenceEs: 'He puesto la mesa para cenar.',
    exampleSentenceHy: 'Ընթրիքի համար սեղան եմ գցել։',
  },
  {
    id: 'exc-volver',
    verb: 'Volver',
    infinitiveHy: 'Վերադառնալ',
    tense: 'Pretérito Perfecto (Participio)',
    correctForm: 'vuelto (ha vuelto)',
    regularTrap: 'volvido ❌',
    isIrregular: true,
    explanation: 'El participio de "volver" es irregular: "vuelto".',
    explanationHy: '«Volver» բայի participio-ն անկանոն է՝ «vuelto»:',
    exampleSentenceEs: 'Pedro ha vuelto de su viaje.',
    exampleSentenceHy: 'Պեդրոն վերադարձել է իր ճամփորդությունից։',
  },
  {
    id: 'exc-morir',
    verb: 'Morir',
    infinitiveHy: 'Մահանալ',
    tense: 'Pretérito Perfecto (Participio)',
    correctForm: 'muerto (ha muerto)',
    regularTrap: 'morido ❌',
    isIrregular: true,
    explanation: 'El participio de "morir" es irregular: "muerto".',
    explanationHy: '«Morir» բայի participio-ն անկանոն է՝ «muerto»:',
    exampleSentenceEs: 'La planta ha muerto de sed.',
    exampleSentenceHy: 'Բույսը չորացել/մահացել է ծարավից։',
  },
  {
    id: 'exc-romper',
    verb: 'Romper',
    infinitiveHy: 'Կոտրել',
    tense: 'Pretérito Perfecto (Participio)',
    correctForm: 'roto (se ha roto)',
    regularTrap: 'rompido ❌',
    isIrregular: true,
    explanation: 'El participio de "romper" es irregular: "roto".',
    explanationHy: '«Romper» բայի participio-ն անկանոն է՝ «roto»:',
    exampleSentenceEs: 'Se ha roto el vaso.',
    exampleSentenceHy: 'Բաժակը կոտրվել է։',
  },

  // Pretérito Imperfecto Irregulars (Only 3 exist in Spanish!)
  {
    id: 'exc-ser-imp',
    verb: 'Ser',
    infinitiveHy: 'Լինել (էական)',
    tense: 'Pretérito Imperfecto',
    correctForm: 'era (yo / él)',
    regularTrap: 'sía / seía ❌',
    isIrregular: true,
    explanation: '¡SER es uno de los únicos 3 verbos irregulares en Imperfecto!: era, eras, era, éramos, erais, eran.',
    explanationHy: '«SER»-ը Imperfecto-ի ընդամենը 3 անկանոն բայերից մեկն է (era, eras, era...)։',
    exampleSentenceEs: 'Cuando Carlos y Lucía eran jóvenes...',
    exampleSentenceHy: 'Երբ Կառլոսն ու Լուսիան երիտասարդ էին...',
  },
  {
    id: 'exc-ir-imp',
    verb: 'Ir',
    infinitiveHy: 'Գնալ',
    tense: 'Pretérito Imperfecto',
    correctForm: 'iba (yo / él)',
    regularTrap: 'ía / iía ❌',
    isIrregular: true,
    explanation: '¡IR es irregular en Imperfecto y toma la terminación con "b"!: iba, ibas, iba, íbamos, ibais, iban.',
    explanationHy: '«IR» բայը Imperfecto-ում անկանոն է և ստանում է «b»-ով վերջավորություններ (iba, ibas...)։',
    exampleSentenceEs: 'Lucía iba a la universidad de lunes a viernes.',
    exampleSentenceHy: 'Լուսիան երկուշաբթիից ուրբաթ գնում էր համալսարան։',
  },
  {
    id: 'exc-ver-imp',
    verb: 'Ver',
    infinitiveHy: 'Տեսնել',
    tense: 'Pretérito Imperfecto',
    correctForm: 'veía (yo / él)',
    regularTrap: 'vía ❌',
    isIrregular: true,
    explanation: 'VER mantiene la vocal "e" en su raíz irregular: veía, veías, veía, veíamos, veíais, veían.',
    explanationHy: '«VER» բայը Imperfecto-ում պահում է «e» տառը արմատում՝ veía, veías... (ոչ թե vía)։',
    exampleSentenceEs: '¿Qué programas de televisión veías?',
    exampleSentenceHy: 'Ի՞նչ հեռուստահաղորդումներ էիր դիտում։',
  },
];
