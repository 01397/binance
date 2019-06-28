import BinanceApiClient from './lib/Binance.js';

document.addEventListener('DOMContentLoaded', init, false);
let cvsD, ctxD, cvsM, ctxM;
let lastPrice = 0;
const [GREEN, RED] = ['#2eb873', '#cc3380'];
const OHLC = [
  [1560988800,0.0037906,0.0038047,0.0037885,0.0038012,35566.61,135.034589924],[1560990600,0.0037997,0.0038077,0.0037892,0.0038077,45591.6,173.122198437],[1560992400,0.0038077,0.003815,0.0037977,0.0038047,52143.78,198.398350573],[1560994200,0.0038047,0.0038213,0.0038031,0.0038164,53959.13,205.832973812],[1560996000,0.0038168,0.0038214,0.0038031,0.0038145,68994.17,262.924386872],[1560997800,0.0038145,0.003815,0.0038043,0.0038079,65642.21,250.118417957],[1560999600,0.0038082,0.0038115,0.00378,0.0037807,82904.33,314.773330746],[1561001400,0.0037799,0.0037799,0.0037093,0.0037348,139698.26,522.319940984],[1561003200,0.0037348,0.003763,0.0037105,0.0037238,88257.36,329.379528105],[1561005000,0.0037235,0.0037489,0.003712,0.0037422,70282.59,262.373226474],[1561006800,0.0037429,0.0037473,0.0037305,0.0037322,49662,185.802602429],[1561008600,0.0037322,0.0037459,0.0037159,0.0037387,61440.57,229.254551916],[1561010400,0.0037376,0.0037442,0.0037121,0.003735,67759.25,252.33515549],[1561012200,0.003735,0.0037363,0.0037251,0.0037251,62333.32,232.554028089],[1561014000,0.0037273,0.003733,0.0037168,0.0037307,63796.38,237.807043876],[1561015800,0.0037307,0.0037459,0.003725,0.0037387,63403.45,236.82744726],[1561017600,0.0037376,0.0037762,0.003735,0.0037695,74470.69,279.379958914],[1561019400,0.0037694,0.003783,0.0037558,0.0037594,42669.68,160.826132983],[1561021200,0.003757,0.0037724,0.003757,0.0037693,27276.99,102.73833826],[1561023000,0.0037672,0.0037702,0.003757,0.0037578,25799.23,97.083615602],[1561024800,0.0037577,0.0037661,0.0037374,0.0037661,34130.65,128.025015482],[1561026600,0.0037666,0.0037756,0.0037487,0.0037499,28513.32,107.347928497],[1561028400,0.0037499,0.003897,0.0037338,0.0038961,334402.89,1282.619691685],[1561030200,0.0038962,0.003968,0.003875,0.0039304,283138.31,1108.979508403],[1561032000,0.0039308,0.00395,0.0039,0.0039213,134578.29,528.624001202],[1561033800,0.0039202,0.0040081,0.00392,0.003955,255717.05,1017.756884476],[1561035600,0.003955,0.0039887,0.0039438,0.0039574,149943.69,595.281426779],[1561037400,0.003957,0.0039644,0.003922,0.0039441,102809.13,405.407911368],[1561039200,0.0039441,0.0039446,0.0038882,0.0039203,69278.32,271.296807643],[1561041000,0.0039221,0.0039287,0.003901,0.0039092,59560.03,233.129646834],[1561042800,0.0039089,0.00391,0.0038522,0.0038725,117030.27,453.813411043],[1561044600,0.003873,0.0039141,0.0038651,0.0038925,86293.63,335.725722472],[1561046400,0.0038925,0.0039102,0.0038289,0.0038594,116677.55,451.46973186],[1561048200,0.0038594,0.0038594,0.0038113,0.0038578,93658.85,358.987285863],[1561050000,0.0038569,0.003883,0.0038425,0.003883,90675.77,350.520589079],[1561051800,0.0038808,0.0039111,0.00388,0.0038959,76513.95,298.45924668],[1561053600,0.0038959,0.0039498,0.0038796,0.0039151,116500.13,456.94235235],[1561055400,0.0039154,0.0039313,0.0038944,0.0038944,44139,172.982978059],[1561057200,0.0038949,0.0039035,0.0038459,0.003855,68080.46,263.402717671],[1561059000,0.003855,0.0038866,0.0038291,0.003833,53949.6,207.934486191],[1561060800,0.0038327,0.0038469,0.0038014,0.0038089,54845.74,210.007901885],[1561062600,0.0038088,0.0038163,0.00378,0.0038162,69072.43,262.065437922],[1561064400,0.0038139,0.0038464,0.0038041,0.0038292,48952.95,187.38528043],[1561066200,0.0038291,0.0038291,0.0037914,0.0037998,38655.47,147.298591539],[1561068000,0.0037999,0.0038333,0.0037862,0.0038257,39709.92,151.292662388],[1561069800,0.0038257,0.0038438,0.0038164,0.0038179,46753.84,179.016454592],[1561071600,0.0038177,0.00382,0.0038042,0.0038122,47856.82,182.345124748],[1561073400,0.0038122,0.0038326,0.0038062,0.0038238,52025.37,198.634785669],[1561075200,0.0038236,0.003875,0.0038197,0.003871,51801.77,199.575761914],[1561077000,0.0038711,0.0038735,0.0038372,0.0038384,43243.98,166.426352731],[1561078800,0.0038385,0.0038531,0.0038338,0.0038467,46126.94,177.191545315],[1561080600,0.0038489,0.0038509,0.003796,0.0038096,66022.43,251.507178405],[1561082400,0.0038096,0.0038132,0.0037468,0.0037634,102146.66,385.798331611],[1561084200,0.0037634,0.003772,0.003727,0.0037694,87726.98,329.01247856],[1561086000,0.00377,0.0038084,0.0037629,0.0037779,68509.39,259.294399714],[1561087800,0.0037779,0.0037789,0.0037576,0.0037671,54561.85,205.484917763],[1561089600,0.0037671,0.003773,0.0037347,0.0037363,52571.79,197.382403319],[1561091400,0.0037363,0.0037452,0.0037339,0.0037406,48473.02,181.234871422],[1561093200,0.0037406,0.00375,0.0037263,0.0037409,64955.52,242.683333824],[1561095000,0.0037407,0.0037676,0.0037358,0.0037659,56318.42,211.484992011],[1561096800,0.0037654,0.0037818,0.0037585,0.0037715,48202.8,181.748560367],[1561098600,0.0037738,0.0038378,0.0037709,0.0038378,85740.2,325.401594054],[1561100400,0.0038378,0.0038515,0.0038242,0.0038434,99356.26,381.6559328],[1561102200,0.0038434,0.0038626,0.0038379,0.0038599,76474.04,294.448241737],[1561104000,0.0038598,0.0038818,0.0038438,0.0038541,81478.52,314.870009879],[1561105800,0.0038553,0.0038644,0.0038399,0.0038551,62976.22,242.512053791],[1561107600,0.0038551,0.0038642,0.0038486,0.003857,53020.71,204.415885519],[1561109400,0.003857,0.0038684,0.0038504,0.0038561,62554.41,241.494249205],[1561111200,0.003856,0.0038846,0.0038432,0.0038655,69109.55,266.949723367],[1561113000,0.0038655,0.0038753,0.003853,0.003874,56377.44,217.994599143],[1561114800,0.003874,0.0038836,0.00386,0.0038656,65642.9,254.090656466],[1561116600,0.003864,0.0038699,0.00384,0.0038618,69185.86,266.608697146],[1561118400,0.003861,0.0038646,0.0038229,0.0038256,87075.47,334.504564013],[1561120200,0.0038256,0.0038459,0.0038157,0.003843,59382.08,227.416917416],[1561122000,0.0038439,0.0038447,0.003822,0.003838,59783.79,229.193093752],[1561123800,0.003838,0.0038529,0.0037861,0.0038209,92958.3,354.799081339],[1561125600,0.0038209,0.0038404,0.0038108,0.0038313,84071.16,321.714157636],[1561127400,0.0038302,0.0038368,0.0038115,0.0038122,55603.09,212.516851349],[1561129200,0.0038122,0.0038391,0.0038103,0.00382,60036.29,229.402111577],[1561131000,0.0038208,0.0038279,0.0038151,0.0038242,16309.29,62.349981773],[1561132800,0.0038233,0.0038338,0.003817,0.0038227,18313.06,70.049705219],[1561134600,0.003821,0.0039021,0.0036912,0.0038396,288220.53,1104.662614564],[1561136400,0.003839,0.0038646,0.0038241,0.0038627,49140.53,188.91709913],[1561138200,0.0038619,0.0038696,0.0038565,0.003857,25238.07,97.509612764],[1561140000,0.0038571,0.0038697,0.0038406,0.0038451,25176.08,96.960300174],[1561141800,0.0038451,0.003848,0.0038301,0.0038337,22288.61,85.571980038],[1561143600,0.0038353,0.003851,0.0038312,0.0038494,24274.5,93.257340852],[1561145400,0.0038488,0.0038551,0.003817,0.003818,35335.4,135.490750606],[1561147200,0.0038179,0.0038333,0.0038167,0.0038318,20501.5,78.401626863],[1561149000,0.0038321,0.0038527,0.0038237,0.0038527,25686.19,98.567447544],[1561150800,0.0038527,0.00387,0.0038473,0.0038514,49515.3,191.178414184],[1561152600,0.0038514,0.0038624,0.0038429,0.0038513,35613.56,137.174945634],[1561154400,0.0038525,0.0038629,0.0038501,0.0038629,48044.44,185.339678733],[1561156200,0.003863,0.0038918,0.0038629,0.0038918,76571.25,297.115749772],[1561158000,0.0038918,0.0039021,0.0038859,0.0038964,90569.2,352.940007823],[1561159800,0.0038963,0.0038996,0.0038644,0.0038693,74652.81,290.038990195],[1561161600,0.0038693,0.0038711,0.0037927,0.00381,99551.88,381.081948059],[1561163400,0.003811,0.0038534,0.0037842,0.0038103,72681.12,277.299225634],[1561165200,0.0038125,0.0038173,0.0037717,0.0037757,45818.15,173.478439492],[1561167000,0.0037764,0.003779,0.0037111,0.0037111,78491.74,293.940696628],[1561168800,0.0037137,0.0037313,0.0036792,0.0036881,111277.49,412.0883772],[1561170600,0.0036912,0.0037079,0.0035578,0.0035781,122287.66,444.3041944],[1561172400,0.0035778,0.0036129,0.00356,0.0035783,94491.64,338.792709891],[1561174200,0.003578,0.0035807,0.0034776,0.0035414,119108.32,420.386516645],[1561176000,0.0035397,0.00364,0.0035338,0.0036254,68145.33,245.153269404],[1561177800,0.0036254,0.00364,0.003557,0.0035893,50849.69,182.976349297],[1561179600,0.0035867,0.003638,0.0035794,0.0036193,42610.17,154.038624518],[1561181400,0.0036189,0.0036194,0.00359,0.0036028,19929.34,71.794260965],[1561183200,0.0036047,0.0036248,0.003601,0.0036081,18929.79,68.346652937],[1561185000,0.0036095,0.0036199,0.003601,0.0036153,24636.45,88.991704376],[1561186800,0.0036154,0.0036194,0.0036013,0.0036117,15960.23,57.614307098],[1561188600,0.003613,0.0036276,0.0036063,0.0036193,19059.6,68.918512019],[1561190400,0.0036191,0.0036805,0.003616,0.0036798,49273.84,179.765407971],[1561192200,0.0036798,0.0036956,0.0036506,0.0036746,46142.65,169.619143004],[1561194000,0.0036746,0.0036838,0.003599,0.0036243,52257.41,189.796352543],[1561195800,0.003624,0.0036465,0.0036126,0.0036175,28294.3,102.790796389],[1561197600,0.0036175,0.0036245,0.003565,0.0035771,44884.44,161.104460091],[1561199400,0.003577,0.003613,0.0035742,0.003581,24375.09,87.639114713],[1561201200,0.0035827,0.0035959,0.0035761,0.0035851,27256.68,97.722037485],[1561203000,0.0035836,0.0036022,0.0035685,0.0035948,23839.55,85.442556349],[1561204800,0.0035932,0.0036424,0.0035913,0.0036232,30565.98,110.62380456],[1561206600,0.003623,0.003623,0.0035,0.00353,90418.56,320.462708645],[1561208400,0.00353,0.0035556,0.00348,0.0035136,68839.03,241.661870287],[1561210200,0.003513,0.0035701,0.003481,0.003532,78107.15,275.88580839],[1561212000,0.003532,0.003553,0.0035,0.0035115,42139.95,148.65180513],[1561213800,0.0035115,0.0035168,0.0034934,0.0035123,51804.87,181.437729977],[1561215600,0.0035114,0.0036492,0.0035073,0.0035783,168273.87,600.348980754],[1561217400,0.0035783,0.0036083,0.0035751,0.003581,52076.95,186.98984089],[1561219200,0.0035823,0.0035831,0.0035557,0.0035613,26184.5,93.418944103],[1561221000,0.0035584,0.003559,0.0035266,0.00353,28884.54,102.328597032],[1561222800,0.0035293,0.0035466,0.0035245,0.0035387,29965.27,105.866399295],[1561224600,0.0035385,0.0035893,0.0035296,0.0035627,31142.89,110.885797141],[1561226400,0.0035627,0.003618,0.0035586,0.0035868,37113.06,133.137160466],[1561228200,0.0035863,0.0035944,0.0035501,0.0035709,24794.56,88.63992479],[1561230000,0.0035714,0.0035965,0.0035695,0.0035864,20480.93,73.390945163],[1561231800,0.0035859,0.0036159,0.0035818,0.0036074,37288.02,134.253101905],[1561233600,0.0036074,0.0036161,0.00359,0.0036,17010.6,61.209718232],[1561235400,0.0036,0.003609,0.0035825,0.003591,31047.23,111.566903337],[1561237200,0.0035927,0.003609,0.0035833,0.003598,22990.28,82.681584155],[1561239000,0.0035983,0.0036149,0.0035905,0.0036059,20781.42,74.874200171],[1561240800,0.0036058,0.003613,0.0036043,0.0036087,17198.89,62.065796917],[1561242600,0.0036087,0.0036131,0.0035899,0.0035919,31953.06,115.195269723],[1561244400,0.0035919,0.0036162,0.0035898,0.0036066,33566.59,121.062197953],[1561246200,0.0036055,0.0036122,0.0035619,0.0035646,30647.6,109.985413591],[1561248000,0.0035645,0.0035734,0.0034904,0.0035402,150903.43,530.187761993],[1561249800,0.0035389,0.003545,0.003478,0.0034806,64645.31,226.636519147],[1561251600,0.0034806,0.0034888,0.0034525,0.003482,45308.82,157.114017126],[1561253400,0.0034807,0.0034853,0.0034449,0.003471,47467.37,164.41400563],[1561255200,0.0034695,0.0035051,0.0034683,0.0034982,28644.96,99.876869204],[1561257000,0.0034987,0.0035373,0.0034926,0.00352,19075.07,67.07394015],[1561258800,0.00352,0.003536,0.0035133,0.0035227,19613.47,69.091616683],[1561260600,0.0035234,0.0035367,0.0035133,0.0035277,22431.91,79.077393157],[1561262400,0.0035277,0.0035349,0.0034982,0.0035035,22957.86,80.581596819],[1561264200,0.0035035,0.00352,0.0034934,0.0035169,23318.1,81.798099558],[1561266000,0.0035166,0.0035244,0.003503,0.003521,15033.23,52.860344856],[1561267800,0.0035211,0.0035468,0.0035137,0.003543,22330.81,78.920523798],[1561269600,0.0035429,0.003554,0.0035313,0.0035351,27080.59,96.068708317],[1561271400,0.0035351,0.0035389,0.003506,0.0035085,23316.89,82.138354839],[1561273200,0.0035085,0.0035206,0.0035051,0.0035147,50351.49,176.861452375],[1561275000,0.0035147,0.0035268,0.003505,0.0035175,45292.27,159.141086586],[1561276800,0.0035175,0.0035459,0.0035035,0.0035387,37036.54,130.525739197],[1561278600,0.0035392,0.003548,0.0035334,0.003535,42162.64,149.324268298],[1561280400,0.003535,0.0035482,0.00353,0.0035435,45624.98,161.432238737],[1561282200,0.0035453,0.003552,0.0035366,0.0035457,52319.77,185.495922611],[1561284000,0.0035457,0.0035625,0.003539,0.003551,61115.38,217.157190586],[1561285800,0.003551,0.0035648,0.003547,0.0035562,50331.08,178.949285645],[1561287600,0.0035582,0.0035745,0.0035465,0.0035712,63675.5,226.701705008],[1561289400,0.0035713,0.0035731,0.0035428,0.0035537,51367.95,182.696257346],[1561291200,0.0035518,0.0035606,0.003543,0.0035531,41639.84,147.985552643],[1561293000,0.0035531,0.0035531,0.0035215,0.0035283,55382.96,195.933212193],[1561294800,0.0035272,0.003547,0.0035251,0.0035447,34984.6,123.615871813],[1561296600,0.0035447,0.0035596,0.0035421,0.0035546,45641.01,162.153027916],[1561298400,0.0035546,0.0035686,0.0035546,0.0035617,40348.35,143.775986835],[1561300200,0.0035617,0.003564,0.0035376,0.0035454,50758.77,180.058142284],[1561302000,0.0035439,0.0036,0.0033543,0.0035477,176559.72,621.754882471],[1561303800,0.0035475,0.003635,0.0034,0.0035159,464528.79,1637.158272818],[1561305600,0.0035159,0.0035299,0.0035056,0.0035125,28610.37,100.659879409],[1561307400,0.0035109,0.00353,0.0034894,0.0035167,26775.22,93.904710074],[1561309200,0.0035185,0.0035247,0.003502,0.0035156,17472.4,61.3845248],[1561311000,0.003517,0.0035245,0.0035085,0.0035166,11469.17,40.333293765],[1561312800,0.0035164,0.0035169,0.0035,0.0035031,9181.99,32.193605847],[1561314600,0.0035048,0.003512,0.0034952,0.0034955,10498,36.794034744],[1561316400,0.0034963,0.0034975,0.0034441,0.003446,37285.98,129.23622098],[1561318200,0.0034462,0.0034494,0.0033643,0.003423,129608.48,440.879839122],[1561320000,0.003423,0.0034491,0.0034026,0.0034135,28581.47,97.964372466],[1561321800,0.0034114,0.0034131,0.0033525,0.0033816,63800.82,215.426057361],[1561323600,0.0033823,0.0033984,0.00335,0.0033646,49453.7,166.728766038],[1561325400,0.0033647,0.0033673,0.0033029,0.0033112,72102.92,239.954010795],[1561327200,0.0033118,0.00341,0.003284,0.0033946,93740.3,313.549760545],[1561329000,0.0033946,0.0034485,0.003364,0.0034235,48932.6,166.410099496],[1561330800,0.0034294,0.0034499,0.0033983,0.0034228,33800.67,115.717457532],[1561332600,0.0034253,0.003466,0.0034243,0.0034602,30690.02,105.78551803],[1561334400,0.0034576,0.0034639,0.0034121,0.003416,30899.5,106.22299323],[1561336200,0.0034164,0.0034846,0.0034121,0.0034377,67695.61,233.435579469],[1561338000,0.0034376,0.0034555,0.0034203,0.003451,43102.78,148.000823556],[1561339800,0.00345,0.003454,0.0034191,0.0034367,33382.33,114.756568085],[1561341600,0.0034367,0.0034512,0.0034117,0.0034215,43450.94,148.990771594],[1561343400,0.003421,0.003424,0.0034055,0.0034193,49155.21,167.851501515],[1561345200,0.0034151,0.0034177,0.003387,0.00339,40883.72,139.253730446],[1561347000,0.0033892,0.0034072,0.0033716,0.0034071,41971.7,142.006170801],[1561348800,0.0034071,0.0034316,0.0034002,0.00342,21514.3,73.508602868],[1561350600,0.0034181,0.0034357,0.0034114,0.0034352,22943.85,78.579857011],[1561352400,0.0034357,0.0034535,0.0034311,0.0034385,33852,116.523639193],[1561354200,0.0034383,0.0034469,0.0034231,0.0034329,32653.96,112.151742246],[1561356000,0.0034323,0.0034444,0.003423,0.0034288,30593.6,105.107183276],[1561357800,0.0034288,0.0034415,0.0034175,0.0034183,44808.95,153.555551627],[1561359600,0.0034182,0.003443,0.0034171,0.0034426,35593.09,122.010913992],[1561361400,0.0034426,0.0034479,0.0034314,0.003439,33961.36,116.790871752],[1561363200,0.0034381,0.0034479,0.0034372,0.0034418,30784.27,106.000873389],[1561365000,0.003443,0.0034446,0.0034271,0.0034298,31989.51,109.912916663],[1561366800,0.0034294,0.0034317,0.0033947,0.003396,36583.86,124.975682126],[1561368600,0.0033955,0.0034229,0.0033821,0.003403,29700.85,100.918096084],[1561370400,0.0034025,0.0034029,0.0033836,0.003393,23395.66,79.32570605],[1561372200,0.003393,0.003393,0.0033677,0.0033795,18165.2,61.3725805],[1561374000,0.0033795,0.0034037,0.0033774,0.0034037,19507.68,66.098578149],[1561375800,0.0034026,0.0034164,0.0033975,0.0034057,26678.26,90.852264835],[1561377600,0.0034057,0.0034096,0.0033918,0.0033931,14858.06,50.525187298],[1561379400,0.0033948,0.0033956,0.0033775,0.003388,45784.36,155.01918087],[1561381200,0.003388,0.0034228,0.0033835,0.0034212,74535.51,254.130792949],[1561383000,0.0034212,0.0034249,0.003417,0.0034228,46112.54,157.744584388],[1561384800,0.0034239,0.0034377,0.0034202,0.0034259,35578.59,121.894920235]
];

function init() {
  const b = new BinanceApiClient();
  b.connect('ticker BNB/BTC', 'trade BNB/BTC', 'depth BNB/BTC');
  document.getElementById('quote').textContent = 'BNB';
  document.getElementById('base').textContent = 'BTC';
  document.getElementById('exchangeName').textContent = 'Binance';
  document.addEventListener('tick', updatePrice);
  document.addEventListener('trade', updateTrade);
  document.addEventListener('depth', updateOrderbook);
  cvsD = document.getElementById('depthChart');
  ctxD = cvsD.getContext('2d');
  ctxD.textAlign = 'left';
  ctxD.textBaseline = 'middle';
  ctxD.font = 'normal 400 12px/1 "roboto"';
  cvsM = document.getElementById('mainChart');
  ctxM = cvsM.getContext('2d');
  ctxM.textAlign = 'left';
  ctxM.textBaseline = 'middle';
  ctxM.font = 'normal 400 12px/1 "roboto"';
  updateClock();


  drawMainChart(
    OHLC
  );
}

function updatePrice(e) {
  const data = e.detail;
  document.getElementById('price-last').textContent = data.last;
  document.getElementById('price-change-wrapper').style.color = data.change < 0 ? RED : GREEN;
  document.getElementById('price-change').textContent = data.change;
  document.getElementById('price-change-ratio').textContent = data.changeRatio;
  document.getElementById('price-high').textContent = data.high;
  document.getElementById('price-low').textContent = data.low;
  document.getElementById('price-volume').textContent = (data.totalQuoteVolume*1 + data.totalBaseVolume*1).toFixed(2);
}

function updateTrade(e) {
  const data = e.detail;
  let mark = '<i></i>';
  if (lastPrice > data.price) mark = '<i class="fas fa-arrow-up"></i>';
  if (lastPrice < data.price) mark = '<i class="fas fa-arrow-down"></i>';
  const newEle = document.createElement('div');
  newEle.className = 'row';
  newEle.innerHTML = `<div class="timestamp">${HHMMSS(data.tradeTimestamp)}</div><div class="price ${data.isBuyerMarketMaker ? 'sell' : 'buy'}">${data.price + mark}</div><div class="quantity">${(data.quantity * 1).toFixed(3)}</div>`;
  const th = document.getElementById('tradeHistory');
  th.firstElementChild.after(newEle);
  th.removeChild(th.lastElementChild);
  lastPrice = data.price * 1;
  document.getElementById('orderbook').children[11].innerHTML = '<div class="price">' + data.price + '</div>';
  drawMainChart(OHLC);
}

function updateOrderbook(e) {
  const data = calcDepth(e.detail);
  const ob = document.getElementById('orderbook');
  let amount100Percent = 2500;
  let lastval = 'xxxxxxxxxxxxx';
  for (let i = 0; i < 10; i++) {
    const val = data.asks[i];
    let price = val[0];
    for (let j = 0; j < val[0].length; j++) {
      if (lastval[j] == val[0][j]) continue;
      price = val[0].slice(0, j) + '<b>' + val[0].slice(j) + '</b>';
      break;
    }
    let bgRatio = val[2] / amount100Percent * 100;
    let row = ob.children[10 - i];
    row.style.backgroundImage = `linear-gradient(to left, ${RED}44 0%, ${RED}44 ${bgRatio}%, transparent ${bgRatio}%)`;
    row.innerHTML = `<div class="price asks">${price}</div><div class="amount">${(val[1] * 1).toFixed(2)}</div><div class="sum">${val[2]}</div>`;
    lastval = val[0];
  }
  lastval = 'xxxxxxxxxxxxx';
  for (let i = 0; i < 10; i++) {
    const val = data.bids[data.bids.length - i - 1];
    let price = val[0];
    for (let j = 0; j < val[0].length; j++) {
      if (lastval[j] == val[0][j]) continue;
      price = val[0].slice(0, j) + '<b>' + val[0].slice(j) + '</b>';
      break;
    }
    let bgRatio = val[2] / amount100Percent * 100;
    let row = ob.children[i + 12];
    row.style.backgroundImage = `linear-gradient(to left, ${GREEN}44 0%, ${GREEN}44 ${bgRatio}%, transparent ${bgRatio}%)`;
    row.innerHTML = `<div class="price bids">${price}</div><div class="amount">${(val[1] * 1).toFixed(2)}</div><div class="sum">${val[2]}</div>`;
    lastval = val[0];
  }
  drawDepthChart(data);
}

function calcDepth(data) {
  let sum = 0;
  for (let i = 0; i < data.asks.length; i++) {
    sum += data.asks[i][1] * 1;
    data.asks[i][2] = sum.toFixed(2);
  }
  sum = 0;
  for (let i = data.bids.length - 1; i >= 0; i--) {
    sum += data.bids[i][1] * 1;
    data.bids[i][2] = sum.toFixed(2);
  }
  return data;
}

function drawDepthChart(data) {
  const HEIGHT = cvsD.height;
  const WIDTH = cvsD.width - 4;
  const scaleX = 0.08;
  const scaleY = 10000000;
  let lastX = WIDTH;
  let newX = null;

  ctxD.clearRect(0, 0, cvsD.width, cvsD.height);

  let lineData = [[lastPrice, 0]];

  ctxD.strokeStyle = RED;
  ctxD.lineWidth = 1.2;
  ctxD.beginPath();
  ctxD.moveTo(WIDTH, HEIGHT / 2);
  for (let i = 0; i < data.asks.length; i++) {
    const delta = (lastPrice - data.asks[i][0]) * scaleY;
    if (delta < -HEIGHT / 2) break;
    newX = WIDTH - data.asks[i][2] * scaleX;
    if(lastX - newX > WIDTH/10)lineData.push([data.asks[i][0], delta]);
    ctxD.lineTo(lastX, HEIGHT / 2 + delta);
    ctxD.lineTo(newX, HEIGHT / 2 + delta);
    lastX = newX;
  }
  ctxD.lineTo(lastX, 0);
  ctxD.stroke();
  ctxD.closePath();

  lastX = WIDTH;

  ctxD.strokeStyle = GREEN;
  ctxD.beginPath();
  ctxD.moveTo(WIDTH, HEIGHT / 2);
  for (let i = data.bids.length - 1; i >= 0; i--) {
    const delta = (lastPrice - data.bids[i][0]) * scaleY;
    if (delta > HEIGHT / 2) break;
    newX = WIDTH - data.bids[i][2] * scaleX;
    if(lastX - newX > WIDTH/10)lineData.push([data.bids[i][0], delta]);
    ctxD.lineTo(lastX, HEIGHT / 2 + delta);
    ctxD.lineTo(newX, HEIGHT / 2 + delta);
    lastX = newX;
  }
  ctxD.lineTo(lastX, HEIGHT);
  ctxD.stroke();
  ctxD.closePath();


  ctxD.strokeStyle = '#ffffff88';
  ctxD.fillStyle = '#ffffff88';
  lineData.forEach(a =>{
    ctxD.beginPath();
    ctxD.moveTo(0, HEIGHT / 2 + a[1]);
    ctxD.lineTo(WIDTH, HEIGHT / 2 + a[1]);
    ctxD.stroke();
    ctxD.closePath();
    ctxD.fillText(a[0], 0, HEIGHT / 2 + a[1]);
  });
}

function drawMainChart(ohlc, { scaleX = 8, scaleY = 800000, right, top } = {}) {
  const RIGHT_MARGIN = 100;
  ctxM.clearRect(0, 0, cvsM.width, cvsM.height);
  let priceHeight = cvsM.height / scaleY;
  top = top || ohlc[ohlc.length - 1][2] + priceHeight / 2;

  // 軸
  ctxM.strokeStyle = '#ffffff44';
  ctxM.fillStyle = '#ffffff88';
  let k = Math.floor(Math.log10(priceHeight));
  let interval = Math.pow(10, k);
  if(interval * scaleY > 100) {
    interval = interval / 5;
  }else if(interval * scaleY > 40) {
    interval = interval / 2;
  }
  for (let y = top - top % interval; y > top - priceHeight; y -= interval) {
    ctxM.moveTo(0, (top - y)*scaleY);
    ctxM.lineTo(cvsM.width - RIGHT_MARGIN*0.8, (top - y)*scaleY);
    ctxM.fillText(y.toFixed(-k+1), cvsM.width - RIGHT_MARGIN*0.8, (top - y)*scaleY);
  }
  ctxM.closePath();
  ctxM.stroke();

  ctxM.strokeStyle = '#aa8800';
  ctxM.fillStyle = '#aa8800';
  ctxM.beginPath();
  ctxM.moveTo(0, (top - lastPrice)*scaleY);
  ctxM.lineTo(cvsM.width - RIGHT_MARGIN*0.8, (top - lastPrice)*scaleY);
  ctxM.closePath();
  ctxM.stroke();
  ctxM.fillRect(cvsM.width - RIGHT_MARGIN * 0.8, (top - lastPrice)*scaleY - 8, RIGHT_MARGIN*0.7, 16);
  ctxM.fillStyle = '#ffffff';
  ctxM.fillText(lastPrice, cvsM.width - RIGHT_MARGIN*0.8, (top - lastPrice)*scaleY);


  ctxM.strokeStyle = '#ffffff44';
  ctxM.fillStyle = '#ffffff88';


  for (let i = 0; i < ohlc.length; i++) {
    let k = ohlc.length - i - 1;
    let o = ohlc[k][1];
    let h = ohlc[k][2];
    let l = ohlc[k][3];
    let c = ohlc[k][4];
    let positive = o < c;
    ctxM.strokeStyle = ctxM.fillStyle = positive ? GREEN : RED;
    ctxM.lineWidth = 1;
    ctxM.beginPath();
    ctxM.moveTo(cvsM.width - RIGHT_MARGIN - (i + 0.4) * scaleX, (top - h) * scaleY);
    ctxM.lineTo(cvsM.width - RIGHT_MARGIN - (i + 0.4) * scaleX, (top - l) * scaleY);
    ctxM.closePath();
    ctxM.stroke();
    ctxM.fillRect(cvsM.width - RIGHT_MARGIN - (i + 0.8) * scaleX, (top - Math.max(o, c)) * scaleY, 0.8 * scaleX, Math.abs(o - h) * scaleY);
    if(cvsM.width - RIGHT_MARGIN - (i+1) * scaleX < 0) break;
  }

}

function HHMMSS(timestamp) {
  const date = new Date(timestamp);
  return date.getHours() + ':' + String(date.getMinutes()).padStart(2, 0) + ':' + String(date.getSeconds()).padStart(2, 0);
}

function updateClock() {
  const date = new Date();
  const ms = date.getMilliseconds();
  const str = date.getHours() + ':' + String(date.getMinutes()).padStart(2, 0) + ':' + String(date.getSeconds() + (ms > 500 ? 1 : 0)).padStart(2, 0);
  document.getElementById('clock').textContent = str;
  setTimeout(updateClock, (ms < 900 ? 1000 - ms : 2000 - ms));
}
