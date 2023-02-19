/* spencermountain/spacetime 7.4.0 Apache 2.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.spacetime = factory());
})(this, (function () { 'use strict';

<<<<<<< HEAD
=======
  const MSEC_IN_HOUR = 60 * 60 * 1000;

  //convert our local date syntax a javascript UTC date
  const toUtc = (dstChange, offset, year) => {
    const [month, rest] = dstChange.split('/');
    const [day, hour] = rest.split(':');
    return Date.UTC(year, month - 1, day, hour) - offset * MSEC_IN_HOUR
  };

  // compare epoch with dst change events (in utc)
  const inSummerTime = (epoch, start, end, summerOffset, winterOffset) => {
    const year = new Date(epoch).getUTCFullYear();
    const startUtc = toUtc(start, winterOffset, year);
    const endUtc = toUtc(end, summerOffset, year);
    // simple number comparison now
    return epoch >= startUtc && epoch < endUtc
  };

  var inSummerTime$1 = inSummerTime;

  // this method avoids having to do a full dst-calculation on every operation
  // it reproduces some things in ./index.js, but speeds up spacetime considerably
  const quickOffset = s => {
    let zones = s.timezones;
    let obj = zones[s.tz];
    if (obj === undefined) {
      console.warn("Warning: couldn't find timezone " + s.tz);
      return 0
    }
    if (obj.dst === undefined) {
      return obj.offset
    }

    //get our two possible offsets
    let jul = obj.offset;
    let dec = obj.offset + 1; // assume it's the same for now
    if (obj.hem === 'n') {
      dec = jul - 1;
    }
    let split = obj.dst.split('->');
    let inSummer = inSummerTime$1(s.epoch, split[0], split[1], jul, dec);
    if (inSummer === true) {
      return jul
    }
    return dec
  };
  var quickOffset$1 = quickOffset;

  var data = {
    "9|s": "2/dili,2/jayapura",
    "9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,2/yakutsk,11/palau,japan,rok",
    "9.5|s|04/02:03->10/01:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
    "9.5|s": "4/darwin,4/north",
    "8|s|03/13:01->10/02:00": "12/casey",
    "8|s": "2/kuala_lumpur,2/makassar,2/singapore,4/perth,2/ujung_pandang,4/west,singapore",
    "8|n": "2/brunei,2/choibalsan,2/hong_kong,2/irkutsk,2/kuching,2/macau,2/manila,2/shanghai,2/taipei,2/ulaanbaatar,2/chongqing,2/chungking,2/harbin,2/macao,2/ulan_bator,hongkong,prc,roc",
    "8.75|s": "4/eucla",
    "7|s": "12/davis,2/jakarta,9/christmas",
    "7|n": "2/bangkok,2/barnaul,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/ho_chi_minh,2/tomsk,2/vientiane,2/saigon",
    "6|s": "12/vostok",
    "6|n": "2/almaty,2/bishkek,2/dhaka,2/omsk,2/qyzylorda,2/qostanay,2/thimphu,2/urumqi,9/chagos,2/dacca,2/kashgar,2/thimbu",
    "6.5|n": "2/yangon,9/cocos,2/rangoon",
    "5|s": "12/mawson,9/kerguelen",
    "5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/atyrau,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives,2/ashkhabad",
    "5.75|n": "2/kathmandu,2/katmandu",
    "5.5|n": "2/kolkata,2/colombo,2/calcutta",
    "4|s": "9/reunion",
    "4|n": "2/baku,2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,9/mahe,9/mauritius,2/volgograd",
    "4.5|n|03/22:00->09/21:24": "2/tehran,iran",
    "4.5|n": "2/kabul",
    "3|s": "12/syowa,9/antananarivo",
    "3|n|03/26:03->10/29:04": "2/famagusta,2/nicosia,8/athens,8/bucharest,8/helsinki,8/kyiv,8/mariehamn,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye,8/nicosia,8/kiev",
    "3|n|03/26:02->10/29:03": "8/chisinau,8/tiraspol",
    "3|n|03/26:00->10/28:24": "2/beirut",
    "3|n|03/25:02->10/28:02": "2/gaza,2/hebron",
    "3|n|03/24:02->10/29:02": "2/jerusalem,2/tel_aviv,israel",
    "3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/amman,2/baghdad,2/bahrain,2/damascus,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte,2/istanbul,turkey,w-su",
    "2|s|03/26:02->10/29:02": "12/troll",
    "2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
    "2|n|03/26:02->10/29:03": "0/ceuta,arctic/longyearbyen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich,3/jan_mayen,poland",
    "2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad,egypt,libya",
    "1|s": "0/brazzaville,0/kinshasa,0/luanda,0/windhoek",
    "1|n|03/26:01->10/29:02": "3/canary,3/faroe,3/madeira,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london,3/faeroe,eire,8/belfast,gb-eire,gb,portugal",
    "1|n|03/19:03->04/30:02": "0/casablanca,0/el_aaiun",
    "1|n": "0/algiers,0/bangui,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
    "14|n": "11/kiritimati",
    "13|s": "11/apia,11/tongatapu",
    "13|n": "11/enderbury,11/kanton,11/fakaofo",
    "12|s|04/02:03->09/24:02": "12/mcmurdo,11/auckland,12/south_pole,nz",
    "12|s": "11/fiji",
    "12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis,kwajalein",
    "12.75|s|04/02:03->04/02:02": "11/chatham,nz-chat",
    "11|s|04/02:03->10/01:02": "12/macquarie",
    "11|s": "11/bougainville",
    "11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
    "11.5|n|04/02:03->10/01:02": "11/norfolk",
    "10|s|04/02:03->10/01:02": "4/currie,4/hobart,4/melbourne,4/sydney,4/act,4/canberra,4/nsw,4/tasmania,4/victoria",
    "10|s": "12/dumontdurville,4/brisbane,4/lindeman,11/port_moresby,4/queensland",
    "10|n": "2/ust-nera,2/vladivostok,11/guam,11/saipan,11/chuuk,11/truk,11/yap",
    "10.5|s|04/02:01->10/01:02": "4/lord_howe,4/lhi",
    "0|n|03/26:00->10/29:01": "1/scoresbysund,3/azores",
    "0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/utc,0/timbuktu,13/greenwich,13/uct,13/universal,13/zulu,gmt-0,gmt+0,gmt0,greenwich,iceland,uct,universal,utc,zulu,13/unknown",
    "-9|n|03/12:02->11/05:02": "1/adak,1/atka,us/aleutian",
    "-9|n": "11/gambier",
    "-9.5|n": "11/marquesas",
    "-8|n|03/12:02->11/05:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat,us/alaska",
    "-8|n": "11/pitcairn",
    "-7|n|03/12:02->11/05:02": "1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/ensenada,6/pacific,10/bajanorte,us/pacific-new,us/pacific",
    "-7|n": "1/creston,1/dawson,1/dawson_creek,1/fort_nelson,1/hermosillo,1/phoenix,1/whitehorse,6/yukon,us/arizona",
    "-6|s|04/01:22->09/02:22": "11/easter,7/easterisland",
    "-6|n|03/12:02->11/05:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/north_dakota,1/ojinaga,1/yellowknife,1/shiprock,6/mountain,navajo,us/mountain",
    "-6|n": "1/belize,1/chihuahua,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/mazatlan,1/regina,1/swift_current,1/tegucigalpa,11/galapagos,6/east-saskatchewan,6/saskatchewan,10/bajasur",
    "-5|s": "1/lima,1/rio_branco,1/porto_acre,5/acre",
    "-5|n|03/12:02->11/05:02": "1/chicago,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,1/indiana/knox,1/indiana/tell_city,1/north_dakota/beulah,1/north_dakota/center,1/north_dakota/new_salem,1/knox_in,6/central,us/central,us/indiana-starke",
    "-5|n": "1/bahia_banderas,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/merida,1/mexico_city,1/monterrey,1/panama,1/atikokan,jamaica,10/general",
    "-4|s|04/01:24->09/03:00": "1/santiago,7/continental",
    "-4|s|03/25:24->10/01:00": "1/asuncion",
    "-4|s": "1/campo_grande,1/cuiaba,1/la_paz,1/manaus,5/west",
    "-4|n|03/12:02->11/05:02": "1/detroit,1/grand_turk,1/indiana,1/indianapolis,1/iqaluit,1/kentucky,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,1/indiana/marengo,1/indiana/petersburg,1/indiana/vevay,1/indiana/vincennes,1/indiana/winamac,1/kentucky/monticello,1/fort_wayne,1/indiana/indianapolis,1/kentucky/louisville,6/eastern,us/east-indiana,us/eastern,us/michigan",
    "-4|n|03/12:00->11/05:01": "1/havana,cuba",
    "-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
    "-3|s": "1/argentina,1/buenos_aires,1/catamarca,1/cordoba,1/fortaleza,1/jujuy,1/mendoza,1/montevideo,1/punta_arenas,1/sao_paulo,12/palmer,12/rothera,3/stanley,1/argentina/la_rioja,1/argentina/rio_gallegos,1/argentina/salta,1/argentina/san_juan,1/argentina/san_luis,1/argentina/tucuman,1/argentina/ushuaia,1/argentina/comodrivadavia,1/argentina/buenos_aires,1/argentina/catamarca,1/argentina/cordoba,1/argentina/jujuy,1/argentina/mendoza,1/argentina/rosario,1/rosario,5/east",
    "-3|n|03/12:02->11/05:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
    "-3|n": "1/araguaina,1/bahia,1/belem,1/cayenne,1/maceio,1/paramaribo,1/recife,1/santarem",
    "-2|n|03/25:22->10/28:23": "1/nuuk,1/godthab",
    "-2|n|03/12:02->11/05:02": "1/miquelon",
    "-2|n": "1/noronha,3/south_georgia,5/denoronha",
    "-2.5|n|03/12:02->11/05:02": "1/st_johns,6/newfoundland",
    "-1|n": "3/cape_verde",
    "-11|n": "11/midway,11/niue,11/pago_pago,11/samoa,us/samoa",
    "-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti,us/hawaii"
  };

  //prefixes for iana names..
  var prefixes = [
    'africa',
    'america',
    'asia',
    'atlantic',
    'australia',
    'brazil',
    'canada',
    'chile',
    'europe',
    'indian',
    'mexico',
    'pacific',
    'antarctica',
    'etc'
  ];

  let all = {};
  Object.keys(data).forEach((k) => {
    let split = k.split('|');
    let obj = {
      offset: Number(split[0]),
      hem: split[1]
    };
    if (split[2]) {
      obj.dst = split[2];
    }
    let names = data[k].split(',');
    names.forEach((str) => {
      str = str.replace(/(^[0-9]+)\//, (before, num) => {
        num = Number(num);
        return prefixes[num] + '/'
      });
      all[str] = obj;
    });
  });

  all.utc = {
    offset: 0,
    hem: 'n' //default to northern hemisphere - (sorry!)
  };

  //add etc/gmt+n
  for (let i = -14; i <= 14; i += 0.5) {
    let num = i;
    if (num > 0) {
      num = '+' + num;
    }
    let name = 'etc/gmt' + num;
    all[name] = {
      offset: i * -1, //they're negative!
      hem: 'n' //(sorry)
    };
    name = 'utc/gmt' + num; //this one too, why not.
    all[name] = {
      offset: i * -1,
      hem: 'n'
    };
  }

  var zones = all;

>>>>>>> master
  //find the implicit iana code for this machine.
  //safely query the Intl object
  //based on - https://bitbucket.org/pellepim/jstimezonedetect/src

  //this Intl object is not supported often, yet
  const safeIntl = () => {
    if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
      return null
    }
    let format = Intl.DateTimeFormat();
    if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
      return null
    }
    let timezone = format.resolvedOptions().timeZone;
    if (!timezone) {
      return null
    }
    return timezone
  };

  //do it once per computer
  var guessTz = safeIntl;

  var config = {

    am: 'am',
    pm: 'pm',

    //https://www.timeanddate.com/calendar/aboutseasons.html
    seasons: {
      north: [
        ['spring', 2, 1],//from March 1 to May 31
        ['summer', 5, 1], //from June 1 to August 31
        ['fall', 8, 1], //from September 1 to November 30
        ['winter', 11, 1] //from December 1 to February 28 (or feb 29)
      ],
      south: [
        ['fall', 2, 1],
        ['winter', 5, 1],
        ['spring', 8, 1],
        ['summer', 11, 1] //dec 1
      ]
    },

    // order is from javascript Date
    days: {
      shortForm: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      longForm: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    },

    //default is Monday
    weekStart: 1,

    quarters: [
      [0, 1], //Q1 - Jan 1
      [3, 1], //Q2 - Apr 1
      [6, 1], //Q3 - July 1
      [9, 1] //Q4 - Oct 1
    ],

    months: {
      shortForm: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      longForm: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    },

    useTitleCase: true, // automatically in .format()

    // local timezone
    // if Intl.DateTimeFormat is not supported - fallback to UTC
    fallbackTz: guessTz() || 'Etc/Utc',

    // <15% of the world lives in the Southern Hemisphere
    fallbackHemisphere: 'n',

    // assumed year in 'march 12th'
    fallbackYear: 2023,

    // assume the british interpretation of 02/02/2018, etc
    preferDMY: false,

    // this should be the only call to js Date
    now: () => new Date().getTime(),

    // if the given epoch is really small, it's very likely in seconds and not milliseconds
    // - all years < 2023 map to the first 20 days of Jan 1970 (1.7 billion)
    // - all years < 2049 map to January 1970 (2.5 billion)
    // anything below this number is likely (but not necessarily) a mistaken input.
    // set as null to allow setting epoch inputs for Jan 1970
    minimumEpoch: 2500000000 // 2.5 billion

  };

  //https://www.timeanddate.com/date/leapyear.html
  const isLeapYear = function (year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  };
  var isLeapYear$1 = isLeapYear;

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const YEAR = 365 * DAY;
  const LEAPYEAR = YEAR + DAY;

  var zoneFile = {};

  const MAXOFFSET = -DAY * 2;
  const memo$1 = {};

  const utcStart = function (year) {
    // try and compute this only once
    if (memo$1.hasOwnProperty(year)) {
      return memo$1[year]
    }
    let epoch = 0;
    // count up from 1970
    if (year > 1970) {
      for (let y = 1970; y < year; y += 1) {
        if (isLeapYear$1(y)) {
          epoch += LEAPYEAR;
        } else {
          epoch += YEAR;
        }
        memo$1[y + 1] = epoch;
      }
    } else {
      // count down from 1970
      let y = 1970;
      while (y > year) {
        y -= 1;
        if (isLeapYear$1(y)) {
          epoch -= LEAPYEAR;
        } else {
          epoch -= YEAR;
        }
        memo$1[y] = epoch;
      }
    }
    return epoch
  };

  const januaryOffset = function (tz) {
    // apply timezone offset to it
    if (tz && zoneFile.hasOwnProperty(tz)) {
      let zone = zoneFile[tz];
      let offset = zone.offset || 0;
      // are we in DST on Jan 1st?
      // all 16 southern hemisphere zones w/ DST
      if (zone.hem === 's' && zone.dst) {
        offset += zone.change || 1;
      }
      return offset * HOUR
    }
    return 0
  };

  // get UTC epoch for jan 1
  const getStart = function (year, tz) {
    let epoch = utcStart(year);
    epoch -= januaryOffset(tz);
    return epoch
  };

  // from a random epoch, get it's Jan 1st alignment
  const getYear = function (target, tz) {
    let epoch = 0;
    // apply timezone offset to it
    epoch -= januaryOffset(tz);
    let year = 1970;
    // count upwards from 1970
    if (target > MAXOFFSET) {
      while (epoch <= target) {
        let size = YEAR;
        if (isLeapYear$1(year)) {
          size = LEAPYEAR;
        }
        let tmp = epoch + size;
        if (tmp > target) {
          break
        }
        epoch = tmp;
        year += 1;
      }
    } else {
      // count downwards from 1970
      while (epoch > target) {
        let size = YEAR;
        if (isLeapYear$1(year)) {
          size = LEAPYEAR;
        }
        epoch -= size;
        year -= 1;
      }
    }
    return { start: epoch, year }
  };

  // these are the folk heuristics that timezones use to set their dst change dates
  // for example, the US changes:
  // the second Sunday of March -> first Sunday of November
  // http://www.webexhibits.org/daylightsaving/g.html
  let zones = {
    usa: '2nd-sun-mar-2h|1st-sun-nov-2h',// (From 1987 to 2006)
    // mexico
    mex: '1st-sun-apr-2h|last-sun-oct-2h',

    // European Union zone
    eu0: 'last-sun-mar-0h|last-sun-oct-1h',
    eu1: 'last-sun-mar-1h|last-sun-oct-2h',
    eu2: 'last-sun-mar-2h|last-sun-oct-3h',
    eu3: 'last-sun-mar-3h|last-sun-oct-4h',
    //greenland
    green: 'last-sat-mar-22h|last-sat-oct-23h',

    // australia
    aus: '1st-sun-apr-1h|1st-sun-oct-2h',
    //lord howe australia
    lhow: '1st-sun-apr-0.5h|1st-sun-oct-2h',
    // new zealand
    chat: '1st-sun-apr-2h|last-sun-sep-2h', //technically 3:45h -> 2:45h
    // new Zealand, antarctica 
    nz: '1st-sun-apr-1h|last-sun-sep-2h',
    // casey - antarctica
    ant: '2nd-sun-mar-0h|1st-sun-oct-0h',
    // troll - antarctica
    troll: 'last-sun-mar-2h|last-sun-oct-3h',

    //jordan
    jord: 'last-fri-feb-0h|last-fri-oct-1h',
    // lebanon
    leb: 'last-sun-mar-0h|last-sun-oct-0h',
    // syria
    syr: 'last-fri-mar-0h|last-fri-oct-0h',
    //israel
    // Start: Last Friday before April 2 -> The Sunday between Rosh Hashana and Yom Kippur
    isr: 'last-fri-mar-2h|last-sun-oct-2h',
    //palestine
    pal: 'last-sun-mar-0h|last-fri-oct-1h',

    // el aaiun
    //this one seems to be on arabic calendar?
    saha: 'last-sun-mar-3h|1st-sun-may-2h',

    // paraguay
    par: 'last-sat-mar-22h|1st-sun-oct-0h',
    //cuba
    cuba: '2nd-sun-mar-0h|1st-sun-nov-1h',
    //chile
    chile: '1st-sat-apr-22h|1st-sun-sep-0h',
    //easter island
    east: '1st-sat-apr-20h|1st-sat-sep-22h',
    //fiji
    fiji: '3rd-sun-jan-3h|2nd-sun-nov-2h',
    // iran
    iran: '4th-mon-march-0h|3rd-fri-sep-0h',//arabic calendar?

  };
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat',];

  const parse$2 = function (str) {
    let [num, day, month, hour] = str.split(/-/g);
    hour = hour.replace(/h$/, '');
    hour = Number(hour);

    if (num !== 'last') {
      num = num.replace(/(st|nd|rd|th)$/, '');
      num = Number(num) || num;
    }
    //convert to numbers
    month = months.indexOf(month) + 1;
    day = days.indexOf(day);
    return {
      num, day, month, hour
    }
  };

  Object.keys(zones).forEach(k => {
    let str = zones[k];
    let [start, end] = str.split(/\|/);
    zones[k] = {
      start: parse$2(start),
      end: parse$2(end),
    };
  });

  var patterns = zones;
  // console.log(zones)

  // determine current day (mon, tues)
  // using 'Key-Value Method' from - https://artofmemory.com/blog/how-to-calculate-the-day-of-the-week/

  // const DAYS = [
  //   'Sunday',
  //   'Monday',
  //   'Tuesday',
  //   'Wednesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday',
  // ];

  const month_code = function (n) {
    let month_codes = [
      null,
      0, //January
      3, //February
      3, //March
      6, //April
      1, //May
      4, //June
      6, //July
      2, //August
      5, //September
      0, //October
      3, //November
      5, //December
    ];
    return month_codes[n]
  };

  const year_code = function (year) {
    let yy = year % 100;
    return (yy + parseInt(yy / 4, 10)) % 7;
  };

  const century_code = function (year) {
    //julian
    if (year < 1752) {
      let c = parseInt(year / 100, 10);
      return 18 - c % 7;
    }
    //gregorian
    let c = parseInt(year / 100, 10);
    let codes = {
      '17': 4, // 1700s = 4
      '18': 2, // 1800s = 2
      '19': 0, // 1900s = 0
      '20': 6, // 2000s = 6
      '21': 4, // 2100s = 4
      '22': 2, // 2200s = 2
      '23': 0, // 2300s = 0
    };
    return codes[String(c)] || 0
  };

  // https://www.timeanddate.com/date/leapyear.html
  const leap_code = function (year) {
    let is_leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    if (is_leap === true) {
      return -1
    } else {
      return 0
    }
  };

  // which day of the week is it?
  const getDay = function (year, month, date) {
    let yc = year_code(year);
    let mc = month_code(month);
    let cc = century_code(year);
    let dc = date;
    let lc = leap_code(year);
    // (Year Code + Month Code + Century Code + Date Number - Leap Year Code) mod 7
    let day = (yc + mc + cc + dc + lc) % 7;
    return day
    // return DAYS[day]
  };
  var getDay$1 = getDay;


  // 1969-07-20 - sunday
  // 1897-03-14 - sunday
  //1066-10-14 -sat
  // let cal = { year: 2022, month: 10, date: 13 }
  // let cal = { year: 1066, month: 10, date: 14 }
  // let cal = { year: 1897, month: 3, date: 14 }
  // let cal = { year: 1969, month: 7, date: 20 }

  var MONTHS = [
    { long: 'January', short: 'Jan', len: 31 },
    { long: 'February', short: 'Feb', len: 28 }, // 29 in a leap year
    { long: 'March', short: 'Mar', len: 31 },
    { long: 'April', short: 'Apr', len: 30 },
    { long: 'May', short: 'May', len: 31 },
    { long: 'June', short: 'Jun', len: 30 },
    { long: 'July', short: 'Jul', len: 31 },
    { long: 'August', short: 'Aug', len: 31 },
    { long: 'September', short: 'Sep', len: 30 },
    { long: 'October', short: 'Oct', len: 31 },
    { long: 'November', short: 'Nov', len: 30 },
    { long: 'December', short: 'Dec', len: 31 },
  ];

  const monthLengths$1 = MONTHS.map(o => o.len);

  const addMonths = function (months, year) {
    let ms = 0;
    for (let i = 0; i < months - 1; i += 1) {
      let days = monthLengths$1[i];
      if (i === 1 && isLeapYear$1(year)) {
        days = 29;
      }
      ms += days * DAY;
    }
    return ms
  };

  // click forward to the proper weekday
  const toWeekDay = function (obj, year) {
    let day = getDay$1(year, obj.month, 1);
    let want = obj.day;
    let diff = 0;
    for (let i = 0; i < 7; i += 1) {
      if (day === want) {
        return diff //* DAY
      }
      day += 1;
      day = day % 7;
      diff += 1;
    }
    return 0
  };


  const toRightWeek = function (num, day, month) {
    if (num === 'first' || num <= 1) {
      return 0
    }
    if (num === 'last') {
      let max = monthLengths$1[month + 1] || 31;
      let days = 0;
      for (let i = 0; i < 5; i += 1) {
        days += 7;
        if (days + day >= max) {
          return days - 7 //went too far
        }
      }
      console.log('fixme [toRightWeek]');//eslint-disable-line
      return 3
    }
    let days = (num - 1) * 7;
    return days // * DAY
  };


  const calc = function (obj, year, offset) {
    let date = 1;
    let month = obj.month;
    let epoch = getStart(year);
    // go to the correct month
    epoch += addMonths(obj.month, year);
    // go to the correct day
    let days = toWeekDay(obj, year);
    date += days;
    epoch += days * DAY;
    // go to the correct week
    days = toRightWeek(obj.num, days, obj.month);
    epoch += days * DAY;
    date += days;
    // go to the correct hour
    epoch += (obj.hour || 0) * HOUR;
    // go to the correct offset
    epoch -= offset * 60 * 60 * 1000;
    // console.log(new Date(epoch))

    return { epoch, month, date }
  };
  // 2nd tuesday
  // console.log(calc({ month: 10, day: 2, num: 2, hour: 2 }, 2022))

  var calc$1 = calc;

  let memo = {};

  // calculate DST times, for this timezone
  const getDst = function (tz, year) {
    // try and calculate each tz+year pair only once
    if (memo.hasOwnProperty(tz) && memo[tz].hasOwnProperty(year)) {
      return memo[tz][year]
    }
    memo[tz] = memo[tz] || {};

    let { dst, offset, change, hem } = zoneFile[tz] || {};
    change = change || 1;

    let changes = [];

    let obj = patterns[dst];
    // if it has no dst..
    if (!obj) {
      memo[tz][year] = [];
      return changes
    }
    // get epoch for spring dst change
    let res = calc$1(obj.start, year, offset);
    // console.log(res)
    let delta = hem === 'n' ? change : 0;
    changes.push({
      epoch: res.epoch,
      cal: {
        year,
        month: res.month,
        date: res.date,
        hour: obj.start.hour,
        minute: 0,
        second: 0,
        millisecond: 0,
      },
      delta,
      offset: offset + delta
    });


    // get epoch for fall dst change
    res = calc$1(obj.end, year, offset);
    delta = hem === 's' ? change : 0;
    changes.push({
      epoch: res.epoch - HOUR, //todo fixme
      cal: {
        year,
        month: res.month,
        date: res.date,
        hour: obj.end.hour,
        minute: 0,
        second: 0,
        millisecond: 0,
      },
      delta,
      offset: offset + delta
    });
    // store it for next time
    memo[tz][year] = changes;
    return changes
  };

  var getDst$1 = getDst;

  // console.log(getDst('America/Toronto', 2023))
  // console.log(getDst('Australia/Adelaide', 2023))
  // console.log(getDst('Australia/Melbourne', 2010))

  const isFloat = function (n) {
    return n !== undefined && Number(n) === n && n % 1 !== 0;
  };

  // ensure we haven't been given any silly numbers
  const validate = function (cal) {
    Object.keys(cal).forEach(k => {
      // no decimals allowed
      if (isFloat(cal[k])) {
        cal[k] = parseInt(cal[k], 10);
      }
      // no negatives
      if (cal[k] < 0 && k !== 'year') {
        cal[k] = 0;
      }
    });

    // set defaults
    cal.month = cal.month || 1; //co-erce any zeros to 1s
    cal.date = cal.date || 1; // (same)
    cal.hour = cal.hour || 0;
    cal.minute = cal.minute || 0;
    cal.second = cal.second || 0;
    cal.millisecond = cal.millisecond || 0;

    // range maximums
    if (cal.month && cal.month > 12) {
      cal.month = 12;
    }
    if (cal.date && MONTHS[cal.month] && cal.date > MONTHS[cal.month].len) {
      cal.date = MONTHS[cal.month].len;
    }
    if (cal.hour && cal.hour > 24) {
      cal.month = 24;
    }
    if (cal.minute && cal.minute > 59) {
      cal.month = 59;
    }
    if (cal.second && cal.second > 59) {
      cal.second = 59;
    }
    if (cal.millisecond && cal.millisecond > 999) {
      cal.millisecond = 999;
    }
    return cal
  };
  var validate$1 = validate;

  // compare two cal objects
  const ensureEqual = function (a, b) {
    const units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];
    for (let i = 0; i < units.length; i += 1) {
      let unit = units[i];
      if (a[unit] !== b[unit]) {
        console.error('\n----\nMis-matched unit in walk:', unit); // eslint-disable-line
        console.error(a, '\n', b); // eslint-disable-line
        return false
      }
    }
    //it's the same
    return true
  };

  const diffDays = function (from, to) {
    let diff = 0;
    // increment months
    for (let n = from.month; n < to.month; n += 1) {
      // console.log(`+${months[n - 1].len} for ${months[n - 1].long}`)
      diff += MONTHS[n - 1].len;
      if (n === 2 && isLeapYear$1(from.year)) {
        diff += 1; //add another
      }
    }
    // delta days (can be negative)
    let days = to.date - from.date;
    diff += days;
    return diff
  };

  // step forward and count milliseconds 
  // until the two calendar objects meet
  const walk = function (epoch, from, to) {
    // console.log(`from: ${from.year}-${from.month}-${from.date}`)
    // console.log(`  to: ${to.year}-${to.month}-${to.date}`)

    // increment months/days  (we are guaranteed to be in the same year)
    let diff = diffDays(from, to);
    epoch += diff * DAY;
    from.month = to.month;
    from.date = to.date;

    // add-up remaining hours
    diff = to.hour - from.hour;
    epoch += diff * HOUR;
    from.hour += diff;

    // remaining minutes
    diff = to.minute - from.minute;
    epoch += diff * MINUTE;
    from.minute += diff;

    // add-up remaining seconds
    diff = to.second - from.second;
    epoch += diff * SECOND;
    from.second += diff;

    // add-up remaining milliseconds
    diff = to.millisecond - from.millisecond;
    epoch += diff;
    from.millisecond += diff;

    // make sure we are complete
    ensureEqual(from, to);

    return epoch
  };
  var walk$1 = walk;

  const NEW_YEAR = {
    month: 1,
    date: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  };

  // compare two cal objects
  const isAfter = function (a, b) {
    const units = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];
    for (let i = 0; i < units.length; i += 1) {
      let unit = units[i];
      if (a[unit] > b[unit]) {
        return true
      }
      if (a[unit] < b[unit]) {
        return false
      }
    }
    //it's the same
    return true
  };

  const getEpoch = function (cal, tz) {
    // set secure defaults
    cal = validate$1(cal);

    // set our cal to Jan 1 of this year
    let epoch = getStart(cal.year, tz);
    let have = Object.assign({}, NEW_YEAR, { year: cal.year });

    // consult any DST changes this year
    let changes = getDst$1(tz, cal.year).reverse();
    let change = changes.find(c => isAfter(cal, c.cal));
    if (change) {
      epoch = change.epoch;
      have = Object.assign({}, NEW_YEAR, change.cal, { year: cal.year });
    }

    // step-forward, by milliseconds
    epoch = walk$1(epoch, have, cal);
    return epoch
  };
  var getEpoch$1 = getEpoch;

  let mapping = MONTHS.reduce((h, o, i) => {
    h[o.long.toLowerCase()] = i + 1;
    h[o.short.toLowerCase()] = i + 1;
    return h
  }, {});
  // add this ones
  mapping.sept = 9;

  const parseMonth = function (str) {
    str = str.toLowerCase().trim();
    return MONTHS[str]
  };
  var parseMonth$1 = parseMonth;

  // parse '+05:30' offset according to ISO8601 - 
  //  could be +hh:mm, +hhmm or +hh
  const reg = /^([+-])?([0-9]{1,2}):?([0-9]{2})?$/;

  //pull-apart ISO offsets, like "+0100"
  const parseOffset = (str) => {
    // 'Zulu' is 0
    if (!str || str === 'Z' || str === 'z') {
      return 0
    }
    // tokenize it
    let m = str.match(reg);
    if (m !== null) {
      let [, plus, hour, min] = m;

      hour = parseInt(hour || '', 10) || 0;
      min = parseInt(min || '', 10) || 0;

      // turn minutes into decimal - 30 -> 0.5
      min = min / 60;

      let offset = hour + min;

      // handle negative
      if (plus === '-') {
        offset *= -1;
      }
      return offset
    }
    return 0

    //okay, try to match it to a utc timezone
    //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
    //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem
    // num *= -1
    // return num

    // if (num >= 0) {
    //   num = '+' + num
    // }
    // let tz = 'etc/gmt' + num
    // let zones = s.timezones
    // if (zones[tz]) {
    // log a warning if we're over-writing a given timezone?
    // console.log('changing timezone to: ' + tz)
    // s.tz = tz
    // }
    // return s
  };
  var parseOffset$1 = parseOffset;

  const startOfDay = {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  };

  // truncate any sub-millisecond values
  const parseMs = function (str = '') {
    str = String(str);
    //js does not support sub-millisecond values 
    // so truncate these - 2021-11-02T19:55:30.087772
    if (str.length > 3) {
      str = str.substring(0, 3);
    } else if (str.length === 1) {
      // assume ms are zero-padded on the left
      // but maybe not on the right.
      // turn '.10' into '.100'
      str = str + '00';
    } else if (str.length === 2) {
      str = str + '0';
    }
    return Number(str) || 0
  };

  const parseTime = (str = '', obj) => {
    obj = Object.assign({}, startOfDay, obj);
    // remove all whitespace
    str = str.replace(/^\s+/, '').toLowerCase();
    //formal time format - 04:30.23
    let arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:.]?([0-9]{1,4})?/);
    if (arr !== null) {
      //validate it a little
      let h = Number(arr[1]);
      if (h < 0 || h > 24) {
        return obj
      }
      let m = Number(arr[2]); //don't accept '5:3pm'
      if (arr[2].length < 2 || m < 0 || m > 59) {
        return obj
      }
      obj.hour = h;
      obj.minute = m;
      obj.second = Number(arr[3]) || 0;
      obj.millisecond = parseMs(arr[4]);
      //parse-out am/pm
      let ampm = str.match(/[\\b0-9] ?(am|pm)\b/);
      if (ampm !== null && ampm[1] === 'pm') {
        obj.hour += 12;
      }
      return obj
    }

    //try an informal form - 5pm (no minutes)
    arr = str.match(/([0-9]+) ?(am|pm)/);
    if (arr !== null && arr[1]) {
      let h = Number(arr[1]);
      //validate it a little..
      if (h > 12 || h < 1) {
        return obj
      }
      obj.hour = arr[1] || 0;
      if (arr[2] === 'pm') {
        obj.hour += 12;
      }
      return obj
    }

    return obj
  };
  var parseTime$1 = parseTime;

  const parseYear = (str = '') => {
    str = str.trim();
    // parse '86 shorthand
    if (/^'[0-9][0-9]$/.test(str) === true) {
      let num = Number(str.replace(/'/, ''));
      if (num > 50) {
        return 1900 + num
      }
      return 2000 + num
    }
    let year = parseInt(str, 10);
    // use a given year from options.today
    // if (!year && today) {
    //   year = today.year
    // }
    // fallback to this year
    // year = year || new Date().getFullYear()
    return year
  };

  var parseYear$1 = parseYear;

  const parseDate = (str = '') => {
    str = str.trim();
    // remove padding
    str = str.replace(/^0+/, '');

    //remove ordinal suffix
    str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');

    let date = parseInt(str, 10);

    return date || 1 // coerce zero to one
  };

  var parseDate$1 = parseDate;

  var ymd = [
    // =====
    //  y-m-d
    // =====
    //iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
    {
      reg: /^(-?0{0,2}[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-+:]+)?$/i,
      parse: (m) => {
        let obj = {
          year: parseYear$1(m[1]),
          month: parseInt(m[2], 10),
          date: parseDate$1(m[3])
        };
        obj.offset = parseOffset$1(m[5]);
        obj = parseTime$1(m[4], obj);
        return obj
      }
    },
    //short-iso "2015-03-25" or "2015/03/25" or "2015/03/25 12:26:14 PM"
    {
      reg: /^([0-9]{4})[-/. ]([0-9]{1,2})[-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
      parse: (m) => {
        let obj = {
          year: parseYear$1(m[1]),
          month: parseInt(m[2], 10),
          date: parseDate$1(m[3])
        };
        if (obj.month >= 12) {
          //support yyyy/dd/mm (weird, but ok)
          obj.date = parseDate$1(m[2]);
          obj.month = parseInt(m[3], 10);
        }
        obj = parseTime$1(m[4], obj);
        return obj
      }
    },

    //text-month "2015-feb-25"
    {
      reg: /^([0-9]{4})[-/. ]([a-z]+)[-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
      parse: (m) => {
        let obj = {
          year: parseYear$1(m[1]),
          month: parseMonth$1(m[2]),
          date: parseDate$1(m[3] || '')
        };
        obj = parseTime$1(m[4], obj);
        return obj
      }
    }
  ];

  var mdy = [
    // =====
    //  m-d-y
    // =====
    //mm/dd/yyyy - uk/canada "6/28/2019, 12:26:14 PM"
    {
      reg: /^([0-9]{1,2})[-/.]([0-9]{1,2})[-/.]?([0-9]{4})?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
      parse: (m) => {
        let month = parseInt(m[1], 10);
        let date = parseDate$1(m[2]);
        //support dd/mm/yyy
        // if (s.british || month >= 12) {
        //   date = parseInt(m[1], 10)
        //   month = parseInt(m[2], 10) - 1
        // }
        let obj = {
          date,
          month,
          year: parseYear$1(m[3])
        };
        // s = parseTime(s, m[4])
        return obj
      }
    },
    //alt short format - "feb-25-2015"
    {
      reg: /^([a-z]+)[\-/. ]([0-9]{1,2})[\-/. ]?([0-9]{4}|'[0-9]{2})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
      parse: (m) => {
        let obj = {
          year: parseYear$1(m[3]),
          month: parseMonth$1(m[1]),
          date: parseDate$1(m[2] || '')
        };
        obj = parseTime$1(m[4], obj);
        return obj
      }
    },

    //Long "Mar 25 2015"
    //February 22, 2017 15:30:00
    {
      reg: /^([a-z]+) ([0-9]{1,2})( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,
      parse: (m) => {
        let obj = {
          year: parseYear$1(m[3]),
          month: parseMonth$1(m[1]),
          date: parseDate$1(m[2] || '')
        };
        obj = parseTime$1(m[4], obj);
        return obj
      }
    },
    // 'Sun Mar 14 15:09:48 +0000 2021'
    {
      reg: /^([a-z]+) ([0-9]{1,2})( [0-9:]+)?( \+[0-9]{4})?( [0-9]{4})?$/i,
      parse: (m) => {
        let obj = {
          year: parseYear$1(m[5]),
          month: parseMonth$1(m[1]),
          date: parseDate$1(m[2] || '')
        };
        obj = parseTime$1(m[4], obj);
        return obj
      }
    }
  ];

  var dmy = [
    // =====
    //  d-m-y
    // =====
    //common british format - "25-feb-2015"
    {
      reg: /^([0-9]{1,2})[-/]([a-z]+)[-/]?([0-9]{4})?$/i,
      parse: (m) => {
        let obj = {
          year: parseYear$1(m[3]),
          month: parseMonth$1(m[2]),
          date: parseDate$1(m[1] || '')
        };
        obj = parseTime$1(m[4], obj);
        return obj
      }
    },
    // "25 Mar 2015"
    {
      reg: /^([0-9]{1,2})( [a-z]+)( [0-9]{4}| '[0-9]{2})? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,
      parse: (m) => {
        let obj = {
          year: parseYear$1(m[3]),
          month: parseMonth$1(m[2]),
          date: parseDate$1(m[1])
        };
        obj = parseTime$1(m[4], obj);
        return obj
      }
    },
    // 01-jan-2020
    {
      reg: /^([0-9]{1,2})[ /]([a-z]+)[ /]([0-9]{4})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,
      parse: (m) => {
        let obj = {
          date: parseDate$1(m[1]),
          month: parseMonth$1(m[2]),
          year: parseYear$1(m[3])
        };
        obj = parseTime$1(m[4], obj);
        return obj
      }
    }
  ];

  var misc = [
    // =====
    // no dates
    // =====

    // '2012-06' month-only
    {
      reg: /^([0-9]{4})[-/]([0-9]{2})$/,
      parse: (m) => {
        let obj = {
          year: parseYear$1(m[1]),
          month: parseInt(m[2], 10),
        };
        // s = parseTime(s, m[4])
        return obj
      }
    },

    //February 2017 (implied date)
    {
      reg: /^([a-z]+) ([0-9]{4})$/i,
      parse: (m) => {
        let obj = {
          year: parseYear$1(m[2]),
          month: parseMonth$1(m[1]),
        };
        // s = parseTime(s, m[4])
        return obj
      }
    },

    {
      // 'q2 2002'
      reg: /^(q[0-9])( of)?( [0-9]{4})?/i,
      parse: (m) => {
        m[1] || '';
        // TODO: 
        // s = s.quarter(quarter)
        if (m[3]) {
          let year = parseYear$1(m[3]);
          return { year }
        }
        return {}
      }
    },
    {
      // 'summer 2002'
      reg: /^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?/i,
      parse: (m) => {
        m[1] || '';
        // TODO: 
        // s = s.season(season)
        if (m[3]) {
          let year = parseYear$1(m[3]);
          return { year }
        }
        return {}
      }
    },
    {
      // '200bc'
      reg: /^[0-9,]+ ?b\.?c\.?$/i,
      parse: (m) => {
        let str = m[0] || '';
        //make year-negative
        str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1');
        let obj = {
          year: parseInt(str.trim(), 10),
        };
        return obj
      }
    },
    {
      // '200ad'
      reg: /^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,
      parse: (m) => {
        let str = m[0] || '';
        //remove commas
        str = str.replace(/,/g, '');
        let obj = {
          year: parseInt(str.trim(), 10),
        };
        // s = parseTime(s)
        return obj
      }
    },
    {
      // '1992'
      reg: /^[0-9]{4}( ?a\.?d\.?)?$/i,
      parse: (m) => {
        // TODO: 
        // let today = s._today
        // using today's date, but a new month is awkward.
        // if (today.month && !today.date) {
        //   today.date = 1
        // }
        let obj = {
          year: parseYear$1(m[0]),
          // month: today.month || d.getMonth(),
          // date: today.date || d.getDate()
        };
        // s = parseTime(s)
        return obj
      }
    }
  ];

  var formats$2 = [].concat(ymd, mdy, dmy, misc);

  const parseText = function (txt, tz) {
    let cal = {};
    for (let i = 0; i < formats$2.length; i += 1) {
      let m = txt.match(formats$2[i].reg);
      if (m !== null) {
        // console.log(`reg #${i} - ${formats[i].reg}`)
        let out = formats$2[i].parse(m);
        return out
      }
    }
    return cal
  };
  var parseText$1 = parseText;

  // order for Array input
  const units$1 = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

  const isNumber = val => {
    return typeof val === 'number' && isFinite(val)
  };

  const isObject = val => {
    return Object.prototype.toString.call(val) === '[object Object]'
  };

  const isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  };

  const isString = val => {
    return typeof val === 'string'
  };

  const parse = function (input, tz) {
    // null means now
    if (input === null || input === undefined) {
      return config.now()
    }
    // epoch input
    if (isNumber(input)) {
      // if the given epoch is really small, they've probably given seconds and not milliseconds
      if (input < config.minimumEpoch && input > 0) {
        input *= 1000;
      }
      return input
    }
    // support ordered array as input [2020, 04, 1] → {year:2020 ...}
    if (isArray(input)) {
      let cal = units$1.reduce((h, k, i) => {
        h[k] = input[i];
        return h
      }, {});
      return getEpoch$1(cal, tz)
    }
    // given {year:2020 ...}
    if (isObject(input)) {
      let cal = Object.assign({}, input);//don't mutate original
      return getEpoch$1(cal, tz)
    }
    // pull-apart ISO formats, etc
    if (isString(input)) {
      let cal = parseText$1(input);
      return getEpoch$1(cal, tz)
    }
    return null
  };
  var parse$1 = parse;

  const monthLengths = MONTHS.map(o => o.len);

  const getDate = function (diffDays, year) {
    let res = { month: 1, date: 1 };
    let total = 0;
    for (let i = 0; i < MONTHS.length - 1; i += 1) {
      let inMonth = monthLengths[i];
      if (i === 1 && isLeapYear$1(year)) {
        inMonth = 29;
      }
      if (total + inMonth > diffDays) {
        break
      }
      total += inMonth;
      res.month += 1;
    }
    // add remainder to days
    res.date += diffDays - total;
    return res
  };

  const getTime = function (ms) {
    let res = { hour: 0, minute: 0, second: 0, ms: 0 };
    // get hour
    res.hour = Math.floor(ms / HOUR);
    ms -= res.hour * HOUR;
    // get minute
    res.minute = Math.floor(ms / MINUTE);
    ms -= res.minute * MINUTE;
    // get second
    res.second = Math.floor(ms / SECOND);
    ms -= res.second * SECOND;
    // remainder milliseconds
    res.ms = ms;
    return res
  };

  // take an epoch, return {month, year, date...}
  const computeCal = function (epoch, tz) {
    // get Jan 1 of the year
    let { start, year } = getYear(epoch, tz);
    let cal = {
      year,
      month: 1,
      date: 1,
      hour: 0,
      second: 0,
      millisecond: 0,
      offset: (zoneFile[tz] || {}).offset || 0
    };
    // kick the epoch around, according to our DST offset
    let changes = getDst$1(tz, year);
    for (let i = changes.length - 1; i >= 0; i -= 1) {
      if (epoch >= changes[i].epoch) {
        cal.offset = changes[i].offset;
        epoch += changes[i].delta * HOUR;
        break
      }
    }
    // walk the days
    let diff = epoch - start;
    let daysDiff = Math.floor(diff / DAY);
    // compute month, date
    let resDate = getDate(daysDiff, year);
    Object.assign(cal, resDate);

    // compute hour, min, sec..
    let deltaMs = diff - (daysDiff * DAY);
    let resMins = getTime(deltaMs);
    Object.assign(cal, resMins);
    // consult any DST changes
    // let changes = getDst(tz, year)
    // // find the latest change
    // for (let i = changes.length - 1; i >= 0; i -= 1) {
    //   if (epoch >= changes[i].epoch) {
    //     let delta = changes[i].delta
    //     if (isInt(delta)) {
    //       cal.hour += delta
    //       if (cal.hour === 24) {
    //         cal.date += 1 //this sucks
    //         cal.hour = 0
    //       }
    //     } else {
    //       cal.minute += delta * 60  //TODO: this sucks
    //     }
    //     break
    //   }
    // }
    return cal
  };
  var getCal = computeCal;

  var get = {
    year: (epoch, tz) => getCal(epoch, tz).year,
    month: (epoch, tz) => getCal(epoch, tz).month,
    date: (epoch, tz) => getCal(epoch, tz).date,
    hour: (epoch, tz) => getCal(epoch, tz).hour,
    minute: (epoch, tz) => getCal(epoch, tz).minute,
    second: (epoch, tz) => getCal(epoch, tz).second,
    ampm: (epoch, tz) => {
      let hour = getCal(epoch, tz).hour;
      return hour < 12 ? 'am' : 'pm'
    },
  };

  var set = {
    year: (epoch, tz, year) => {
      return new Spacetime(epoch, tz)
    }
  };

  function ordinal(i) {
    let j = i % 10;
    let k = i % 100;
    if (j === 1 && k !== 11) {
      return i + 'st'
    }
    if (j === 2 && k !== 12) {
      return i + 'nd'
    }
    if (j === 3 && k !== 13) {
      return i + 'rd'
    }
    return i + 'th'
  }

  function zeroPad(str, len = 2) {
    let pad = '0';
    str = str + '';
    return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str
  }

  const formats = {

    // day: (c) => titleCase(s.dayName()),
    // 'day-short': (c) => titleCase(_short()[s.day()]),
    // 'day-number': (c) => s.day(),
    // 'day-ordinal': (c) => ordinal(s.day()),
    // 'day-pad': (c) => zeroPad(s.day()),

    date: (c) => c.date,
    'date-ordinal': (c) => ordinal(c.date),
    'date-pad': (c) => zeroPad(c.date),

    // month: (c) => titleCase(c.monthName()),
    // 'month-short': (c) => titleCase(short()[c.month]),
    'month-number': (c) => c.month,
    'month-ordinal': (c) => ordinal(c.month),
    'month-pad': (c) => zeroPad(c.month),
    'iso-month': (c) => zeroPad(c.month + 1), //1-based months
    'iso-short': (c) => `${c.year}-${zeroPad(c.month)}-${zeroPad(c.date)}`,
    'iso': (c) => `${c.year}-${zeroPad(c.month)}-${zeroPad(c.date)}T${zeroPad(c.hour)}:${zeroPad(c.minute)}:${zeroPad(c.second)}.${zeroPad(c.ms, 3)}`,

    year: (c) => c.year > 0 ? c.year : `${Math.abs(c.year)} BC`,
    'year-short': (c) => {
      let y = c.year;
      if (y > 0) {
        return `'${String(y).substr(2, 4)}`
      }
      return Math.abs(y) + ' BC'
    },
    'iso-year': (c) => {
      let str = zeroPad(Math.abs(c.year), 4); //0-padded
      if (c.year < 0) {
        str = '-' + zeroPad(str, 6);  //negative years are for some reason 6-digits ('-00008')
      }
      return str
    },

    time: (c) => c.time(),
    'time-24': (c) => `${c.hour}:${zeroPad(c.minute)}`,

    hour: (c) => c.hour % 12,
    'hour-pad': (c) => zeroPad(c.hour % 12),
    'hour-24': (c) => c.hour,
    'hour-24-pad': (c) => zeroPad(c.hour),

    minute: (c) => c.minute,
    'minute-pad': (c) => zeroPad(c.minute),
    second: (c) => c.second,
    'second-pad': (c) => zeroPad(c.second),
    ms: (c) => c.ms,
    millisecond: (c) => c.ms,
    'millisecond-pad': (c) => zeroPad(c.ms, 3),

    ampm: (c) => c.hour < 12 ? 'am' : 'pm',
    AMPM: (c) => c.hour < 12 ? 'AM' : 'PM',
    quarter: (c) => {
      if (c.month < 3) {
        return 'Q1'
      } else if (c.month < 6) {
        return 'Q2'
      } else if (c.month < 9) {
        return 'Q3'
      }
      return 'Q4'
    },
    // turn timezone 5.25 into '+05:15'
    offset: (c) => {
      let n = c.offset || 0;
      let out = n <= 0 ? '-' : '+';
      n = Math.abs(n);
      // add hour
      let h = parseInt(n, 10);
      out += String(h).padStart(2, '0');
      // add minute
      let decimal = n % 1;
      if (decimal) {
        let min = decimal * 60;
        out += ':' + String(min).padStart(2, '0');
      } else {
        out += ':00';
      }
      return out
    }
  };
  // aliases
  const aliases$1 = {
    'hour-12': 'hour',
    'hour-12-pad': 'hour-pad',
    'day-name': 'day',
    'month-name': 'month',
    'iso 8601': 'iso',
    'time-h24': 'time-24',
    'time-12': 'time',
    'time-h12': 'time',
    tz: 'timezone',
    'day-num': 'day-number',
    'month-num': 'month-number',
    'month-iso': 'iso-month',
    'year-iso': 'iso-year',
    'nice-short': 'nice',
    'nice-short-24': 'nice-24',
    mdy: 'numeric-us',
    dmy: 'numeric-uk',
    ymd: 'numeric',
    'yyyy/mm/dd': 'numeric',
    'mm/dd/yyyy': 'numeric-us',
    'dd/mm/yyyy': 'numeric-us',
    'little-endian': 'numeric-uk',
    'big-endian': 'numeric',
    'day-nice': 'nice-day',
  };
  Object.keys(aliases$1).forEach((k) => (formats[k] = formats[aliases$1[k]]));

  var formats$1 = formats;

  const replace = function (cal, str) {
    let sections = /\{(.+?)\}/g;
    str = str.replace(sections, (_, name) => {
      name = name.toLowerCase().trim();
      if (formats$1.hasOwnProperty(name)) {
        return formats$1[name](cal)
      }
      return `{${name}}`
    });
    return str
  };
  var replace$1 = replace;

  let methods$2 = {
    format: function (fmt) {
      let cal = getCal(this.epoch, this.tz);
      if (fmt && formats$1.hasOwnProperty(fmt)) {
        return formats$1[fmt](cal)
      }
      return replace$1(cal, fmt)
    }
  };

  // format methods
  let deriv = [
    ['iso', '{iso-year}-{month-pad}-{date-pad}T{hour-24-pad}:{minute-pad}:{second-pad}.{millisecond-pad}{offset}'],//
    ['time', '{hour-12}:{minute-pad}{ampm}'],
  ];
  deriv.forEach(a => {
    let [fn, fmt] = a;
    methods$2[fn] = function () {
      let cal = getCal(this.epoch, this.tz);
      return replace$1(cal, fmt)
    };
  });

  var fmts = methods$2;

  let methods = {};
  let units = ['year', 'month', 'date', 'hour', 'minute', 'second'];

  // generate all getter/setter function pairs
  units.forEach(fn => {
    methods[fn] = function (input) {
      let { epoch, tz } = this;
      if (input !== undefined) {
        return set[fn](epoch, tz, input)
      }
      return get[fn](epoch, tz)
    };
  });

  // add format methods
  Object.assign(methods, fmts);

  var methods$1 = methods;

  const SpaceTime = function (input, tz) {
    //the IANA code for the current timezone
    this.tz = tz || config.fallbackTz;
    //the holy UNIX moment
    this.epoch = parse$1(input, this.tz);
  };

  Object.assign(SpaceTime.prototype, methods$1);

  // add method aliases
  const aliases = [
    ['hours', 'hour'],
    ['minutes', 'minute'],
    ['seconds', 'second'],
  ];
  aliases.forEach(a => {
    SpaceTime.prototype[a[0]] = SpaceTime.prototype[a[1]];
  });

  var Spacetime = SpaceTime;

  const main = (input, tz) => new Spacetime(input, tz);

  //some helper functions on the main method
  main.now = (tz) => new Spacetime(config.now(), tz);

  main.today = (tz) => new Spacetime(new Date().getTime(), tz).startOf('day');

  return main;

}));
