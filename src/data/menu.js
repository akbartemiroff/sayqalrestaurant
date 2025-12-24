import React from 'react';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';

// Helper function to handle unit translations
export const getLocalizedWeight = (weight, language) => {
  if (!weight) return ''; // Return empty string if weight is undefined or null
  
  if (language === LANGUAGES.UZ) {
    // Convert Russian units to Uzbek
    return weight
      .replace(/гр/g, 'gr')
      .replace(/кг/g, 'kg')
      .replace(/мл/g, 'ml')
      .replace(/шт/g, 'dona')
      .replace(/порц/g, 'pors')
      .replace(/палочка/g, 'dona');
  }
  return weight;
};

export const salads = [
  {
    id: 'salad-caesar',
    name_ru: 'Салат Цезарь',
    name_uz: 'Sezar salati',
    ingredients_ru: 'Куриное филе, капуста пекинская, помидоры, сухарики, сыр, майонез.',
    ingredients_uz: 'Tovuq filesi, pekin karami, pomidorlar, suxariklar, pishloq, mayonez.',
    weight: '350 гр',
    image: '/bukhara/images/salads/sezar/IMG_4052.JPG'
  },
  {
    id: 'salad-tongue',
    name_ru: 'Салат Язык',
    name_uz: 'Til salati',
    ingredients_ru: 'Говяжий язык.',
    ingredients_uz: 'Mol tili.',
    weight: '100 гр',
    image: '/bukhara/images/salads/til/IMG_4081.JPG'
  },
  {
    id: 'salad-chakka',
    name_ru: 'Салат Чакка',
    name_uz: 'Chakka salati',
    ingredients_ru: 'Чакка, редька.',
    ingredients_uz: 'Chakka, turp.',
    weight: '250 гр',
    image: '/bukhara/images/salads/chakka/IMG_4101.JPG'
  },
  {
    id: 'salad-ayron',
    name_ru: 'Айрон',
    name_uz: 'Ayron',
    ingredients_ru: 'Чакка, зелень.',
    ingredients_uz: 'Chakka, ko\'katlar.',
    weight: '200 гр',
    image: '/bukhara/images/salads/ayron/IMG_4098.JPG'
  },
  {
    id: 'salad-okroshka',
    name_ru: 'Окрошка',
    name_uz: 'Okroshka',
    ingredients_ru: 'Чакка, помидор, огурцы, зелень, специи.',
    ingredients_uz: 'Chakka, pomidor, bodring, ko\'katlar, ziravorlar.',
    weight: '250 гр',
    image: '/bukhara/images/salads/okroshka/IMG_4097.JPG'
  },
  {
    id: 'salad-mans-capriccio',
    name_ru: 'Салат Мужской каприз',
    name_uz: 'Kapriz salati',
    ingredients_ru: 'Язык говяжий, соленные огурцы, вешенки, сухарики, сыр, майонез, зеленый лук.',
    ingredients_uz: 'Mol tili, tuzlangan bodring, qo\'ziqorinlar, non suxariklar, pishloq, mayonez, ko\'k piyoz.',
    weight: '250 гр',
    image: '/bukhara/images/salads/mujskoy/IMG_4053.JPG'
  },
  {
    id: 'salad-oyster-mushrooms',
    name_ru: 'Салат Грибы Вешенки',
    name_uz: 'Veshenki qo\'ziqorin salati',
    ingredients_ru: 'Грибы, зеленый горох, лук, соя.',
    ingredients_uz: 'Qo\'ziqorinlar, ko\'k no\'xat, piyoz, soya.',
    weight: '250 гр',
    image: '/bukhara/images/salads/veshyonka/IMG_4056.JPG'
  },
  {
    id: 'salad-pickles-brine',
    name_ru: 'Салат Соленье с рассолом',
    name_uz: 'Tuzlangan sabzavotlar salati',
    ingredients_ru: 'Огурцы и помидоры маринованные.',
    ingredients_uz: 'Tuzlangan bodring va pomidorlar.',
    weight: '250 гр',
    image: '/bukhara/images/salads/tuzlangansabzavot/IMG_4057.JPG'
  },
  {
    id: 'salad-sayqal',
    name_ru: 'Салат Сайкал',
    name_uz: 'Sayqal salati',
    ingredients_ru: 'Язык говяжий, огурцы соленные и свежие, помидоры черри, грибы вешенки и специи.',
    ingredients_uz: 'Mol tili, tuzlangan va yangi bodringlar, cherry pomidorlar, veshenki qo\'ziqorinlari va ziravorlar.',
    weight: '250 гр',
    image: '/bukhara/images/salads/sayqal/IMG_4064.JPG'
  },
  {
    id: 'salad-french',
    name_ru: 'Салат Французский',
    name_uz: 'Fransuzcha salat',
    ingredients_ru: 'Капуста корейская и морковь, свекла, колбаса (ширин), майонез, зеленый горох, картошка пай.',
    ingredients_uz: 'Koreyscha karam va sabzi, lavlagi, kolbasa (shirin), mayonez, ko\'k no\'xat, qovurilgan kartoshka.',
    weight: '350 гр',
    image: '/bukhara/images/salads/fransuz/IMG_4072.JPG'
  },
  {
    id: 'salad-taiga',
    name_ru: 'Салат Тайга',
    name_uz: 'Tayga salati',
    ingredients_ru: 'Кукуруза, огурцы, колбаса (ширин), сыр, майонез.',
    ingredients_uz: 'Jo\'xori, bodring, kolbasa (shirin), pishloq, mayonez.',
    weight: '250 гр',
    image: '/bukhara/images/salads/tayga/IMG_4074.JPG'
  },
  {
    id: 'salad-cabbage',
    name_ru: 'Салат Капустный',
    name_uz: 'Karam salati',
    ingredients_ru: 'Капуста пекинская, огурцы, лимон, зелень, чеснок.',
    ingredients_uz: 'Pekin karami, bodring, limon, ko\'katlar, sarimsoq.',
    weight: '200 гр',
    image: '/bukhara/images/salads/karam/IMG_4075.JPG'
  },
  {
    id: 'salad-olivier',
    name_ru: 'Салат Оливье',
    name_uz: 'Olivye salati',
    ingredients_ru: 'Колбаса (ширин), картошка, морковь, яйцо, огурцы, соленные огурцы, зеленый горох, майонез.',
    ingredients_uz: 'Kolbasa (shirin), kartoshka, sabzi, tuxum, bodringlar, tuzlangan bodringlar, ko\'k no\'xat, mayonez.',
    weight: '250 гр',
    image: '/bukhara/images/salads/olivye/IMG_4077.JPG'
  },
  {
    id: 'salad-cucumber-mayo',
    name_ru: 'Салат Огурцы с майонезом',
    name_uz: 'Mayonezli bodring salati',
    ingredients_ru: 'Огурцы свежие, зелёный лук, мясо, кукуруза и майонез.',
    ingredients_uz: 'bodringlar, ko\'k piyoz, go\'sht, jo\'xori va mayonez.',
    weight: '250 гр',
    image: '/bukhara/images/salads/mayonezlibodring/IMG_4078.JPG'
  },
  {
    id: 'salad-opera',
    name_ru: 'Салат Опера',
    name_uz: 'Opera salati',
    ingredients_ru: 'Куриное филе, грибы вешенки, маринованные огурцы, горох, кукуруза, сыр, картошка пай, яйцо, майонез.',
    ingredients_uz: 'Tovuq filesi, veshenki qo\'ziqorinlari, marinadlangan bodringlar, no\'xat, jo\'xori, pishloq, qovurilgan kartoshka, tuxum, mayonez.',
    weight: '250 гр',
    image: '/bukhara/images/salads/opera/IMG_4080.JPG'
  },
  {
    id: 'salad-mimosa',
    name_ru: 'Салат Мимоза',
    name_uz: 'Mimoza salati',
    ingredients_ru: 'Шпроты, морковь, яйца, картошка, майонез.',
    ingredients_uz: 'Shprotlar, sabzi, tuxumlar, kartoshka, mayonez.',
    weight: '350 гр',
    image: '/bukhara/images/salads/mimoza/IMG_4062.JPG'
  },
  {
    id: 'salad-fresh',
    name_ru: 'Салат Свежий',
    name_uz: 'Achchiq-chuchuk',
    ingredients_ru: 'Помидоры, огурцы, лук, зелень, специи.',
    ingredients_uz: 'Pomidorlar, bodringlar, piyoz, ko\'katlar, ziravorlar.',
    weight: '250 гр',
    image: '/bukhara/images/salads/yangi/IMG_4099.JPG'
  },
  {
    id: 'salad-chuponcha',
    name_ru: 'Салат Чупонча',
    name_uz: 'Cho\'poncha salati',
    ingredients_ru: 'Помидоры, огурцы, зелень, лук, чакка, специи.',
    ingredients_uz: 'Pomidorlar, bodringlar, ko\'katlar, piyoz, chakka, ziravorlar.',
    weight: '350 гр',
    image: '/bukhara/images/salads/choponcha/IMG_4100.JPG'
  },
  {
    id: 'salad-vinegret',
    name_ru: 'Салат Винегрет',
    name_uz: 'Vinegret salati',
    ingredients_ru: 'Свекла, картофель, морковь, капуста, огурцы маринованные, зелёный горох, чеснок, масло, специи и зелень.',
    ingredients_uz: 'Lavlagi, kartoshka, sabzi, karam, marinadlangan bodringlar, ko\'k no\'xat, sarimsoq, yog\', ziravorlar va ko\'katlar.',
    weight: '250 гр',
    image: '/bukhara/images/salads/vinegret/IMG_4110.JPG'
  },
  {
    id: 'salad-meat',
    name_ru: 'Салат Мясной',
    name_uz: 'Go\'shtli salat',
    ingredients_ru: 'Мясо, соленные огурцы, лук, кинза, специи, масло, соя.',
    ingredients_uz: 'Go\'sht, tuzlangan bodringlar, piyoz, kinza, ziravorlar, yog\', soya.',
    weight: '350 гр',
    image: '/bukhara/images/salads/goshtli/IMG_4111.JPG'
  },
  {
    id: 'salad-greek',
    name_ru: 'Салат Греческий',
    name_uz: 'Grek salati',
    ingredients_ru: 'Огурцы, помидор, болгарский перец, зелень, салатный лист, оливки, сыр фэтакса, лимон, масло.',
    ingredients_uz: 'Bodringlar, pomidor, bulg\'or qalampiri, ko\'katlar, salat bargi, zaytun, fetaksa pishlog\'i, limon, yog\'.',
    weight: '350 гр',
    image: '/bukhara/images/salads/grek/IMG_4084.JPG'
  }
];

export const soups = [
  {
    id: 'soup-balaza',
    name_ru: 'Суп Балаза',
    name_uz: 'Balaza sho\'rvasi',
    ingredients_ru: 'Говядина, горох, специи.',
    ingredients_uz: 'Mol go\'shti, no\'xat, ziravorlar.',
    weight: '400 гр',
    image: '/bukhara/images/birinchi/balaza/IMG_4054.JPG'
  },
  {
    id: 'soup-solyanka',
    name_ru: 'Суп Солянка',
    name_uz: 'Solyanka sho\'rvasi',
    ingredients_ru: 'Говядина, соленые огурцы, лимон, сметана.',
    ingredients_uz: 'Mol go\'shti, tuzlangan bodringlar, limon, smetana.',
    weight: '400 гр',
    image: '/bukhara/images/birinchi/solyanka/IMG_4055.JPG'
  },
  {
    id: 'soup-meatballs-noodles',
    name_ru: 'Суп Фрикадельки с лапшой',
    name_uz: 'Frikadelkali ugra sho\'rva',
    ingredients_ru: 'Фрикадельки из говядины, лапша, картофель, морковь, лук, зелень.',
    ingredients_uz: 'Mol go\'shtidan frikadelkalar, ugra, kartoshka, sabzi, piyoz, ko\'katlar.',
    weight: '400 гр',
    image: '/bukhara/images/birinchi/frikadelki/IMG_4058.JPG'
  },
  {
    id: 'soup-mastava',
    name_ru: 'Суп Мастава',
    name_uz: 'Mastava sho\'rvasi',
    ingredients_ru: 'Рис, говядина, картофель, морковь, зелень, специи.',
    ingredients_uz: 'Guruch, mol go\'shti, kartoshka, sabzi, ko\'katlar, ziravorlar.',
    weight: '400 гр',
    image: '/bukhara/images/birinchi/mastava/IMG_4067.JPG'
  },
  {
    id: 'soup-qaynatma',
    name_ru: 'Кайнатма шурпа',
    name_uz: 'Qaynatma shurva',
    ingredients_ru: 'Баранина, картофель, морковь, сухарики.',
    ingredients_uz: 'Qo\'y goshti, kartoshka, sabzi, suxariki.',
    weight: '400 гр',
    image: '/bukhara/images/birinchi/qaynatma/ChatGPT Image 9 апр. 2025 г., 18_28_57.png'
  }
];

export const mainDishes = [
  {
    id: 'dish-sayqal-kefsi',
    name_ru: 'Сайкал Кефси',
    name_uz: 'Sayqal Kefsi',
    ingredients_ru: 'Филе курицы жареное, панированное в муке, специи.',
    ingredients_uz: 'Qovurilgan Tovuq filesi, unga bulangan, ziravorlar.',
    weight: '400 гр',
    image: '/bukhara/images/ikkinchi/kefsi/IMG_4050.JPG'
  },
  {
    id: 'dish-osh-sofi',
    name_ru: 'Ош Софи',
    name_uz: 'Osh Sofi',
    ingredients_ru: 'Рис, говядина, морковь, орехи, специи.',
    ingredients_uz: 'Guruch, mol go\'shti, sabzi, mag\'iz, ziravorlar.',
    weight: '500 гр',
    image: '/bukhara/images/ikkinchi/osh/IMG_4051.JPG'
  },
  {
    id: 'dish-vagurri',
    name_ru: 'Вагурри',
    name_uz: 'Vagurri',
    ingredients_ru: 'Жареная баранина (ширбоз), специи.',
    ingredients_uz: 'Qovurilgan shirbos qo\'y go\'shti, ziravorlar.',
    weight: '400 гр',
    image: '/bukhara/images/ikkinchi/vagurri/IMG_4060.JPG'
  },
  {
    id: 'dish-dumgoza',
    name_ru: 'Думг\'оза',
    name_uz: 'Dumg\'oza',
    ingredients_ru: 'Хвостовая часть говядины, специи.',
    ingredients_uz: 'Molning dum qismi, ziravorlar.',
    weight: '450 гр',
    image: '/bukhara/images/ikkinchi/dumgoza/IMG_4086.JPG'
  },
  {
    id: 'dish-jiz-uygur',
    name_ru: 'Жиз уйгурская',
    name_uz: 'Uyg\'ur jizi',
    ingredients_ru: 'Говядина филе, соя, лук с уксусом.',
    ingredients_uz: 'Mol go\'shti filesi, soya, sirka qo\'shilgan piyoz.',
    weight: '1 кг',
    image: '/bukhara/images/ikkinchi/jiz/IMG_4063.JPG'
  },
  {
    id: 'dish-chicken-foil',
    name_ru: 'Курица в фолге',
    name_uz: 'Folgadagi tovuq',
    ingredients_ru: 'Курица целая, помидор, чеснок, зелень и специи.',
    ingredients_uz: 'Butun tovuq, pomidor, sarimsoq, ko\'katlar va ziravorlar.',
    weight: '1 кг',
    image: '/bukhara/images/ikkinchi/tovuq/IMG_4065.JPG'
  },
  {
    id: 'dish-podjarka',
    name_ru: 'Поджарка',
    name_uz: 'Podjarka ovqati',
    ingredients_ru: 'Мясо говядина и баранина, картошка фри, лук с уксусом.',
    ingredients_uz: 'Mol va qo\'y go\'shti, qovurilgan kartoshka, sirka qo\'shilgan piyoz.',
    weight: 'Мясо 100 гр, картошка 200 гр',
    weight_uz: 'Go\'sht 100 gr, kartoshka 200 gr',
    image: '/bukhara/images/ikkinchi/qovurma/IMG_4069.JPG'
  },
  {
    id: 'dish-fish-fillet-large',
    name_ru: 'Рыба Филе',
    name_uz: 'Baliq filesi',
    ingredients_ru: 'Рыба Судак жареная, панированная в муке.',
    ingredients_uz: 'Sudak balig\'i qovurilgan, unga bulangan.',
    weight: '1 кг',
    image: '/bukhara/images/ikkinchi/baliq/IMG_4059.JPG'
  },
  {
    id: 'dish-chicken-jiz-uygur',
    name_ru: 'Жиз куриная уйгурская',
    name_uz: 'Tovuqli uyg\'ur jizi',
    ingredients_ru: 'Куриное филе, соя, помидоры, болгарский перец, огурцы, лук, чеснок.',
    ingredients_uz: 'Tovuq filesi, soya, pomidorlar, bulg\'or qalampiri, bodringlar, piyoz, sarimsoq.',
    weight: '1 кг',
    image: '/bukhara/images/ikkinchi/tovuqjiz/IMG_4087.JPG'
  },
  {
    id: 'dish-meat-stewed',
    name_ru: 'Тандир',
    name_uz: 'Tandir barra go\'shti',
    ingredients_ru: 'Тушеная баранина в тандыре, лук с уксусом.',
    ingredients_uz: 'Tandirda Dimlangan qo\'y go\'shti, sirka qo\'shilgan piyoz.',
    weight: '1 кг',
    image: '/bukhara/images/ikkinchi/dimlangan/IMG_4088.JPG'
  },
  {
    id: 'dish-bon-file',
    name_ru: 'Бон Филе',
    name_uz: 'Bon File',
    ingredients_ru: 'Жаренное говяжье филе, специи, лук с уксусом.',
    ingredients_uz: 'Qovurilgan mol filesi, ziravorlar, sirka qo\'shilgan piyoz.',
    weight: '1 кг',
    image: '/bukhara/images/ikkinchi/bonfile/IMG_4093.JPG'
  },
  {
    id: 'dish-tabaka',
    name_ru: 'Табака',
    name_uz: 'Tabaka',
    ingredients_ru: 'Жареная курица.',
    ingredients_uz: 'Qovurilgan tovuq.',
    weight: '1 кг',
    image: '/bukhara/images/ikkinchi/tabaka/IMG_4094.JPG'
  },
  {
    id: 'dish-sayqal-somsa',
    name_ru: 'Сайкал Сомса',
    name_uz: 'Sayqal Somsa',
    ingredients_ru: 'Тесто, мясо говядина, лук, масло.',
    ingredients_uz: 'Xamir, mol go\'shti, piyoz, yog\'.',
    weight: '240 гр',
    image: '/bukhara/images/ikkinchi/somsa/IMG_4135.JPG'
  }
];

export const kebabs = [
  {
    id: 'kebab-ground',
    name_ru: 'Шашлык молотый',
    name_uz: 'Qiyma shashlik',
    ingredients_ru: 'Фарш из мяса, лук с уксусом.',
    ingredients_uz: 'Qiymalangan go\'sht, sirka qo\'shilgan piyoz.',
    weight: '150 гр',
    portions_ru: '1 палочка',
    portions_uz: '1 dona',
    image: '/bukhara/images/kebabs/qiyma/IMG_4061.JPG'
  },
  {
    id: 'kebab-chunked',
    name_ru: 'Шашлык кусковой',
    name_uz: 'Jaz mol go\'shtli shashlik',
    ingredients_ru: 'Мясо говядина и курдюк.',
    ingredients_uz: 'Mol go\'shti va dumba.',
    weight: '150 гр',
    portions_ru: '1 палочка',
    portions_uz: '1 dona',
    image: '/bukhara/images/kebabs/kuskovoy/IMG_4066.JPG'
  },
  {
    id: 'kebab-fillet',
    name_ru: 'Шашлык Филе',
    name_uz: 'File shashlik',
    ingredients_ru: 'Мясо говядина.',
    ingredients_uz: 'Mol go\'shti.',
    weight: '150 гр',
    portions_ru: '1 палочка',
    portions_uz: '1 dona',
    image: '/bukhara/images/kebabs/file/IMG_4071.JPG'
  },
  {
    id: 'kebab-marvarid',
    name_ru: 'Шашлык Марварид',
    name_uz: 'Marvarid shashlik',
    ingredients_ru: 'Мясо говядина, фарш, курдюк.',
    ingredients_uz: 'Mol go\'shti, qiyma, dumba.',
    weight: '150 гр',
    portions_ru: '1 палочка',
    portions_uz: '1 dona',
    image: '/bukhara/images/kebabs/marvarid/IMG_4070.JPG'
  },
  {
    id: 'kebab-tenderloin',
    name_ru: 'Шашлык Вирезка',
    name_uz: 'Virezka shashlik',
    ingredients_ru: 'Мясо говядина и курдюк.',
    ingredients_uz: 'Mol go\'shti va dumba.',
    weight: '180 гр',
    portions_ru: '1 палочка',
    portions_uz: '1 dona',
    image: '/bukhara/images/kebabs/virezka/IMG_4068.JPG'
  },
  {
    id: 'kebab-ribs',
    name_ru: 'Шашлык рёбрышки',
    name_uz: 'Qovurg\'a shashlik',
    ingredients_ru: 'Рёбрышки баранины, маринованные в специях.',
    ingredients_uz: 'Qo\'y go\'shtining qovurg\'alari, ziravorlarda marinadlangan.',
    weight: '250 гр',
    portions_ru: '1 палочка',
    portions_uz: '1 dona',
    image: '/bukhara/images/kebabs/qovurga/IMG_7919.PNG'
  },
  {
    id: 'kebab-roll',
    name_ru: 'Шашлык рулет',
    name_uz: 'Rulet shashlik',
    ingredients_ru: 'Мясо говядины, завернутое с курдюком и специями.',
    ingredients_uz: 'Dumba yog\'i va ziravorlar bilan o\'ralgan mol go\'shti.',
    weight: '200 гр',
    portions_ru: '1 палочка',
    portions_uz: '1 dona',
    image: '/bukhara/images/kebabs/rulet/IMG_7918.PNG'
  },
  {
    id: 'kebab-meter',
    name_ru: 'Шашлык 1 метр',
    name_uz: '1 metrli shashlik',
    ingredients_ru: 'Фарш шашлык на метровом шампуре, приготовленный со специями, овощами.',
    ingredients_uz: 'Bir metrli sixda qiyma shashlik, Ziravorlar, sabzavotlar bilan tayyorlangan.',
    weight: '1000 гр',
    portions_ru: '5-6 персон',
    portions_uz: '5-6 kishilik',
    image: '/bukhara/images/kebabs/1metr/Дизайн без названия.png'
  },
  {
    id: 'kebab-set',
    name_ru: 'Шашлык сет',
    name_uz: 'Shashlik set',
    ingredients_ru: 'Набор из нескольких видов шашлыка с овощами и кукурузой.',
    ingredients_uz: 'Sabzavotlar va makkajoxori bilan bir necha turdagi shashlik to\'plami.',
    weight: '800 гр',
    portions_ru: '3-4 персоны',
    portions_uz: '3-4 kishilik',
    image: '/bukhara/images/kebabs/set/Дизайн без названия (1).png'
  }
];

export const lunchboxes = [
  {
    id: 'lunch-meat',
    name_ru: 'Ланч Гушт',
    name_uz: 'Lanch Go\'sht',
    ingredients_ru: 'Мясо поджарки, картошка фри, салат цезарь, зелень, соус, хлеб.',
    ingredients_uz: 'Qovurma go\'shti, qovurilgan kartoshka, sezar salati, ko\'katlar, sous, non.',
    weight: 'Мясо 130 гр, салат 100 гр, картошка 120 гр',
    weight_uz: 'Go\'sht 130 gr, salat 100 gr, kartoshka 120 gr',
    image: '/bukhara/images/lunchboxes/gosht/IMG_4103.JPG'
  },
  {
    id: 'lunch-kebab',
    name_ru: 'Ланч Шашлык',
    name_uz: 'Lanch Shashlik',
    ingredients_ru: '2 палочки шашлыка, картошка фри, салат французский, зелень, соус, хлеб.',
    ingredients_uz: '2 dona shashlik, qovurilgan kartoshka, fransuz salati, ko\'katlar, sous, non.',
    weight: 'Мясо шашлыка 300 гр, салат 100 гр, картошка 120 гр',
    weight_uz: 'Shashlik go\'shti 300 gr, salat 100 gr, kartoshka 120 gr',
    image: '/bukhara/images/lunchboxes/shashlik/IMG_4104.JPG'
  },
  {
    id: 'lunch-kfc',
    name_ru: 'Ланч КФС',
    name_uz: 'Lanch KFS',
    ingredients_ru: 'Жареная филе курица, картошка фри, салат греческий, зелень, соус, хлеб.',
    ingredients_uz: 'Qovurilgan tovuq filesi, qovurilgan kartoshka, grek salati, ko\'katlar, sous, non.',
    weight: 'Курица 150 гр, салат 100 гр, картошка 120 гр',
    weight_uz: 'Tovuq 150 gr, salat 100 gr, kartoshka 120 gr',
    image: '/bukhara/images/lunchboxes/kfs/IMG_4105.JPG'
  },
  {
    id: 'lunch-uygur',
    name_ru: 'Ланч Уйгурча',
    name_uz: 'Lanch Uyg\'urcha',
    ingredients_ru: 'Жиз куриная, картошка фри, салат витаминка, зелень, соус, хлеб.',
    ingredients_uz: 'Tovuq jiz, qovurilgan kartoshka, vitaminka salati, ko\'katlar, sous, non.',
    weight: 'Курица 200 гр, салат 100 гр, картошка 120 гр',
    weight_uz: 'Tovuq 200 gr, salat 100 gr, kartoshka 120 gr',
    image: '/bukhara/images/lunchboxes/uygurcha/IMG_4106.JPG'
  }
];

export const sets = [
  {
    id: 'set-easy',
    name_ru: 'Сет "EASY"',
    name_uz: 'Set "EASY"',
    persons_ru: '6 человек',
    persons_uz: '6 kishi kishi',
    items_ru: [
      'Вагури бон филе – 400 гр',
      'Думгоза – 400 гр',
      'Картошка фри – 1 порц.',
      'Кепси из филе – 400 гр',
      'Табака – 1 шт.',
      'Мясо тушеное – 400 гр',
      'Шашлык говяжий кусковой – 0,5 порц.',
      'Шашлык молотый – 0,5 порц.'
    ],
    items_uz: [
      'Vaguri bon file – 400 gr',
      'Dumg\'oza – 400 gr',
      'Qovurilgan kartoshka – 1 pors.',
      'File kepsisi – 400 gr',
      'Tabaka – 1 dona',
      'tandirda dimlangan go\'sht – 400 gr',
      'Jaz mol go\'shtli shashlik – 0,5 pors.',
      'Qiyma shashlik – 0,5 pors.'
    ],
    image: '/bukhara/images/sets/IMG_7880.PNG'
  },
  {
    id: 'set-medium',
    name_ru: 'Сет "MEDIUM"',
    name_uz: 'Set "MEDIUM"',
    persons_ru: '5 человек',
    persons_uz: '5 kishi kishi',
    items_ru: [
      'Вагури из баранина – 400 гр',
      'Вагури бон филе – 400 гр',
      'Жиз уйгурский говяжий – 400 гр',
      'Картошка фри – 1 порц.',
      'Мясо тушеное – 400 гр',
      'Шашлык говяжий кусковой – 0,5 порц.',
      'Шашлык марварид – 0,5 порц.',
      'Шашлык филе говяжий – 0,5 порц.'
    ],
    items_uz: [
      'Qo\'y go\'shtidan vaguri – 400 gr',
      'Vaguri bon file – 400 gr',
      'Mol go\'shtidan uyg\'ur jizi – 400 gr',
      'Qovurilgan kartoshka – 1 pors.',
      'Dimlangan go\'sht – 400 gr',
      'Jaz mol go\'shtli shashlik – 0,5 pors.',
      'Marvarid shashlik – 0,5 pors.',
      'Mol go\'shti filesi shashlik – 0,5 pors.'
    ],
    image: '/bukhara/images/sets/IMG_7880.PNG'
  },
  {
    id: 'set-premium',
    name_ru: 'Сет "PREMIUM"',
    name_uz: 'Set "PREMIUM"',
    persons_ru: '8-10 человек',
    persons_uz: '8-10 kishi kishi',
    items_ru: [
      'Вагури из баранина – 400 гр',
      'Вагури бон филе – 400 гр',
      'Думгоза – 400 гр',
      'Жиз уйгурский говяжий – 400 гр',
      'Картошка фри – 1 порц.',
      'Кепси из филе – 400 гр',
      'Рыба филе – 400 гр',
      'Табака – 1 шт.',
      'Мясо тушеное – 400 гр',
      'Шашлык говяжий кусковой – 0,5 порц.',
      'Шашлык марварид – 0,5 порц.',
      'Шашлык филе говяжий – 0,5 порц.'
    ],
    items_uz: [
      'Qo\'y go\'shtidan vaguri – 400 gr',
      'Vaguri bon file – 400 gr',
      'Dumg\'oza – 400 gr',
      'Mol go\'shtidan uyg\'ur jizi – 400 gr',
      'Qovurilgan kartoshka – 1 pors.',
      'File kepsisi – 400 gr',
      'Baliq filesi – 400 gr',
      'Tabaka – 1 dona',
      'Dimlangan go\'sht – 400 gr',
      'Jaz mol go\'shtli shashlik – 0,5 pors.',
      'Marvarid shashlik – 0,5 pors.',
      'Mol go\'shti filesi shashlik – 0,5 pors.'
    ],
    image: '/bukhara/images/sets/IMG_7880.PNG'
  }
];

export const breads = [
  {
    id: 'bread-kulcha',
    name_ru: 'Хлеб (кулча)',
    name_uz: 'Non (kulcha)',
    ingredients_ru: 'Мука, вода, соль, дрожжи.',
    ingredients_uz: 'Un, suv, tuz, xamirturush.',
    weight: '100 гр',
    image: '/bukhara/images/breads/kulcha.jpg'
  },
  {
    id: 'bread-fatir',
    name_ru: 'Хлеб (фатир)',
    name_uz: 'Non (fatir)',
    ingredients_ru: 'Мука, масло, вода, соль.',
    ingredients_uz: 'Un, yog\', suv, tuz.',
    weight: '150 гр',
    image: '/bukhara/images/breads/fatir.jpg'
  }
];

export const desserts = [
  {
    id: 'dessert-vitamin',
    name_ru: 'Витаминный',
    name_uz: 'Vitaminli',
    ingredients_ru: 'Фрукты, мёд, орехи.',
    ingredients_uz: 'Mevalar, asal, yong\'oqlar.',
    weight: '300 гр',
    image: '/bukhara/images/desserts/vitamin.jpg'
  }
];

export const sauces = [
  {
    id: 'sauce-garlic',
    name_ru: 'Соус чесночный',
    name_uz: 'Sarimsoqli sous',
    ingredients_ru: 'Чеснок, майонез, соя, специи.',
    ingredients_uz: 'Sarimsoq, mayonez, soya, ziravorlar.',
    weight: '20 гр',
    image: '/bukhara/images/sauces/IMG_4096.JPG'
  },
  {
    id: 'sauce-tomato',
    name_ru: 'Соус томатный',
    name_uz: 'Pomidor sousi',
    ingredients_ru: 'Помидоры, томат, чеснок, специи.',
    ingredients_uz: 'Pomidorlar, tomat, sarimsoq, ziravorlar.',
    weight: '140 гр',
    image: '/bukhara/images/sauces/IMG_4095.JPG'
  }
];

export const categoryTranslations = {
  salads: {
    ru: 'Салаты',
    uz: 'Salatlar',
    en: 'Salads'
  },
  soups: {
    ru: 'Первые блюда',
    uz: 'Birinchi taomlar',
    en: 'First Courses'
  },
  mainDishes: {
    ru: 'Вторые блюда',
    uz: 'Ikkinchi taomlar',
    en: 'Main Dishes'
  },
  kebabs: {
    ru: 'Шашлыки',
    uz: 'Shashliklar',
    en: 'Kebabs'
  },
  lunchboxes: {
    ru: 'Ланчбокс',
    uz: 'Lanchboks',
    en: 'Lunchbox'
  },
  sets: {
    ru: 'Сеты',
    uz: 'Setlar',
    en: 'Sets'
  },
  breads: {
    ru: 'Хлеб',
    uz: 'Nonlar',
    en: 'Bread'
  },
  desserts: {
    ru: 'Десерты',
    uz: 'Shirinliklar',
    en: 'Desserts'
  },
  sauces: {
    ru: 'Соусы',
    uz: 'Souslar',
    en: 'Sauces'
  }
};

export const menu = {
  salads,
  soups,
  mainDishes,
  kebabs,
  lunchboxes,
  sets,
  breads,
  desserts,
  sauces
}; 
