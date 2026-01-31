import { test, expect } from '@playwright/test';

const baseURL = 'https://www.swifttranslator.com/';

const testCases = [
  {
    id: 'Pos_Fun_0001',
    name: 'Convert simple daily action',
    input: 'mama vaha bonavaa',
    expected: 'මම වහ බොනවා'
  },
  {
    id: 'Pos_Fun_0002',
    name: 'Simple compound sentence',
    input: 'mama adha gedhara innava namuth mata sanipa nae',
    expected: 'මම අද ගෙදර ඉන්නව නමුත් මට සනිප නැ'
  },
  {
    id: 'Pos_Fun_0003',
    name: 'Convert cause-effect sentence',
    input: 'mama koLoBA giye naeththee ammava dhaala yanna baeri nisaa.',
    expected: 'මම කොළොඹ ගියෙ නැත්තේ අම්මව දාල යන්න බැරි නිසා.'
  },
  {
    id: 'Pos_Fun_0004',
    name: 'Question about location',
    input: 'apita kavadhdha avurudhu thiyennee?',
    expected: 'අපිට කවද්ද අවුරුදු තියෙන්නේ?'
  },
  {
    id: 'Pos_Fun_0005',
    name: 'Question about time',
    input: 'apita kavadhdha exam eka thiyenne?',
    expected: 'අපිට කවද්ද exam එක තියෙන්නෙ?'
  },
  {
    id: 'Pos_Fun_0006',
    name: 'Ability question',
    input: 'Oyaata kaeema rasata uyanna puluvandha?',
    expected: 'ඔයාට කෑම රසට උයන්න පුලුවන්ද?'
  },
   {
    id: 'Pos_Fun_0007',
    name: 'Polite command',
    input: 'panthiya athu gaanna!',
    expected: 'පන්තිය අතු ගාන්න!'
  },
  {
    id: 'Pos_Fun_0008',
    name: 'Direct command',
    input: 'yata balanna!',
    expected: 'යට බලන්න'
  },
  {
    id: 'Pos_Fun_0009',
    name: 'Action request',
    input: 'mata eeka genaella dhiila oyaa kaeema kanna.',
    expected: 'මට ඒක ගෙනැල්ල දීල ඔයා කෑම කන්න.'
  },
  {
    id: 'Pos_Fun_0010',
    name: 'Positive present action',
    input: 'mama baNa ahanavaa.',
    expected: 'මම බණ අහනවා.'
  },
  {
    id: 'Pos_Fun_0011',
    name: 'Positive future action',
    input: 'api heta project eka patan gamu aNivaaryYAyen.',
    expected: 'අපි හෙට project එක පටන් ගමු අණිවාර්ය්‍යයෙන්.'
  },
  {
    id: 'Pos_Fun_0012',
    name: 'Positive past event',
    input: 'kochchara baaDhaka aavath api anthimeedhi eeka kohomahari  karala ivarayi.',
    expected: 'කොච්චර බාධක ආවත් අපි අන්තිමේදි ඒක කොහොමහරි  කරල ඉවරයි.'
  },
  {
    id: 'Pos_Fun_0013',
    name: 'Negative present statement',
    input: 'mama kaemathi naehae dhaenma koloBA yanna kavuru monaa kivvath.',
    expected: 'මම කැමති නැහැ දැන්ම කොලොඹ යන්න කවුරු මොනා කිව්වත්.'
  },
  {
    id: 'Pos_Fun_0014',
    name: 'Negative ability sentence',
    input: 'mata baehae uyanna thaama....',
    expected: 'මට බැහැ උයන්න තාම....'
  },
  {
    id: 'Pos_Fun_0015',
    name: 'Negative future statement',
    input: 'api anidhdhata yanna enne nae',
    expected: 'අපි අනිද්දට යන්න එන්නෙ නැ'
  },
  {
    id: 'Pos_Fun_0016',
    name: 'Morning greeting',
    input: 'dhavasa suBha veevaa!',
    expected: 'දවස සුභ වේවා!'
  },
  {
    id: 'Pos_Fun_0017',
    name: 'Polite help request',
    input: 'me lipiya poddak kiyavala mata meeke vennee monaadha kiyanna.',
    expected: 'මෙ ලිපිය පොඩ්ඩක් කියවල මට මේකෙ වෙන්නේ මොනාද කියන්න.'
  },
  {
    id: 'Pos_Fun_0018',
    name: 'Request to send details',
    input: 'mata oyaage namayi,vayasayi,upandhinayayi evanavadha?',
    expected: 'මට ඔයාගෙ නමයි,වයසයි,උපන්දිනයයි එවනවද?'
  },
  {
    id: 'Pos_Fun_0019',
    name: 'Refusal response',
    input: 'oyaala kiyana haemadheema mata karanna baehae..',
    expected: 'ඔයාල කියන හැමදේම මට කරන්න බැහැ..'
  },
  {
    id: 'Pos_Fun_0020',
    name: 'Long paragraph conversion',
    input: `adha udhe mama vaedata yanna kalin gedhara vaeda godak thibba nisaa mama poddak parakku unaa. passe mama venadhata vadaa ikmanin yadhdhi, yaaluvek hambunaa. yaaluvaa giye vaahaneeka. mata velaa gihilla thibba nisaa ithin eyaa ekka yanna hithuvaa. kohomahari yaluvaa mama dhanneenaethi  paarakin thamayi ekkan giye. anthimeedhi une venadhataath vada parakku vela vaedata giya eka thamayi. passe mama hithaa gaththa aaya nam aluth paaraval vala yanne nae kavadhaavath kiyala.`,
    expected: 'අද උදෙ මම වැඩට යන්න කලින් ගෙදර වැඩ ගොඩක් තිබ්බ නිසා මම පොඩ්ඩක් පරක්කු උනා. පස්සෙ මම වෙනදට වඩා ඉක්මනින් යද්දි, යාලුවෙක් හම්බුනා. යාලුවා ගියෙ වාහනේක. මට වෙලා ගිහිල්ල තිබ්බ නිසා ඉතින් එයා එක්ක යන්න හිතුවා. කොහොමහරි යලුවා මම දන්නේනැති  පාරකින් තමයි එක්කන් ගියෙ. අන්තිමේදි උනෙ වෙනදටාත් වඩ පරක්කු වෙල වැඩට ගිය එක තමයි. පස්සෙ මම හිතා ගත්ත ආය නම් අලුත් පාරවල් වල යන්නෙ නැ කවදාවත් කියල.'
  }
];

for (const tc of testCases) {
  test(`${tc.id} - ${tc.name}`, async ({ page }) => {
    await page.goto(baseURL);
    await page.locator('textarea').fill(tc.input);
    await expect(page.locator('body')).toContainText(tc.expected);
  });
}
