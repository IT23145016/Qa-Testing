import { test, expect } from '@playwright/test';

const baseURL = 'https://www.swifttranslator.com/';

const negativeTestCases = [
  {
    id: 'Neg_Fun_0001',
    name: 'Missing spaces',
    input: 'mamageharayanavaa',
    expected: 'මම ගෙදර යනවා'
  },
  {
    id: 'Neg_Fun_0002',
    name: 'Incorrectly handling of sinhala "ව" sound when using "w" – should not become birthday wish',
    input: 'Mama gedhara yanavaa',
    expected: 'වාසනාවන්ත සුභ උපන්දිනයක් වේවා!'   // change if this is incorrect
  },
  {
    id: 'Neg_Fun_0003',
    name: 'Capital letter at sentence start causes incorrect Sinhala conversion',
    input: 'mama adha vaedata yanne nae. Namuth mama gedara idhan vaeda',
    expected: 'මම අද වැඩට යන්නෙ නැ. නමුත් මම ගෙඩර ඉදන් වැඩ'
  },
  {
    id: 'Neg_Fun_0004',
    name: 'Handling joined long sentence with mixed english words',
    input: 'apihetaofficeyanavaamokadhahetaapitameetingekakthiyenavazoom.',
    expected: 'අපි හෙට office යනවා මොකද හෙට අපිට meeting එකක් තියෙනව zoom.'
  },
  {
    id: 'Neg_Fun_0005',
    name: 'Misinterpreting sinhala and english word as same',
    input: 'Man eyaata kivvaa mata gedhara giyaata passee kool karanna kiyalaa.',
    expected: 'මන් එයාට කිව්වා මට ගෙදර ගියාට පස්සේ කෝල් කරන්න කියලා.'
  },
  {
    id: 'Neg_Fun_0006',
    name: 'Incorrect spellings handling',
    input: 'mama nida ganna yanavaa…',
    expected: 'මම නිදා ගන්න යනවා…'
  },
  {
    id: 'Neg_Fun_0007',
    name: 'English short forms with sinhala',
    input: 'mata help ekak oone plz......',
    expected: 'මට help එකක් ඕනෙ please......'
  },
  {
    id: 'Neg_Fun_0008',
    name: 'Not adding missing punctuation, question marks',
    input: 'mata dhaen nidhimathayi kaala ennam ikmanata oyaa kaaladha',
    expected: 'මට දැන් නිදිමතයි.කාල එන්නම් ඉක්මනට.ඔයා කාලද?'
  },
  {
    id: 'Neg_Fun_0009',
    name: 'Not correcting english spellings either',
    input: 'mama exercis karannee health benifits thiyena hindhaa',
    expected: 'මම exercise කරන්නේ health බෙනිෆිට්ස් තියෙන හින්දා'
  },
  {
    id: 'Neg_Fun_0010',
    name: 'Some english brand names doesn’t print the way they should',
    input: 'Xiomi phones hoDHAyidha?',
    expected: 'Xiomi phones හොඳයිද?'
  }
];

test.describe('Negative test cases – features the translator DOES NOT have', () => {
  for (const tc of negativeTestCases) {
    test(`${tc.id} - ${tc.name} → should NOT intelligently correct`, async ({ page }) => {
      await page.goto(baseURL, { waitUntil: 'networkidle' });

      // Input textarea (only one exists)
      const inputBox = page.locator('textarea').first();
      await expect(inputBox).toBeVisible({ timeout: 15000 });
      await expect(inputBox).toBeEditable();

      // Output div based on your inspection
      const outputBox = page.locator(
        'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap.overflow-y-auto.flex-grow.bg-slate-50'
      );

      // Fallback: look for element near "Sinhala" text
      const fallbackOutput = page.locator('text=/Sinhala/i')
        .locator('xpath=following::*[self::div or self::p or self::span][1]');

      let finalOutput = outputBox;

      // Safe visibility check
      const isPrimaryVisible = await outputBox.isVisible().catch(() => false);
      if (!isPrimaryVisible) {
        finalOutput = fallbackOutput;
      }

      // Ensure output element is in the DOM
      await expect(finalOutput).toBeAttached({ timeout: 20000 });

      // Trigger output rendering if lazy-loaded
      await inputBox.fill('test');
      await page.waitForTimeout(1200);
      await inputBox.clear();

      // Fill the actual test input
      await inputBox.fill(tc.input);

      // Wait for real Sinhala output to appear
      await expect.poll(async () => {
        const text = await finalOutput.innerText();
        return text.trim();
      }, {
        timeout: 15000,
        polling: 400,
        message: `No Sinhala translation appeared for input: ${tc.input}`
      }).toMatch(/[\u0D80-\u0DFF]/);

      await page.waitForTimeout(800); // final settle

      const actual = (await finalOutput.innerText()).trim();

      // ────────────────────────────────────────────────
      // FLIPPED ASSERTION → tests will FAIL intentionally
      // This makes the report show red failures highlighting the limitation
      // ────────────────────────────────────────────────
      expect(
        actual,
        `NEGATIVE CASE ${tc.id} - ${tc.name}\n\n` +
        `The translator SHOULD HAVE intelligently corrected the input to:\n` +
        `  "${tc.expected}"\n\n` +
        `But instead it produced the raw/uncorrected output:\n` +
        `  "${actual}"\n\n` +
        `(Test fails on purpose → proves the translator lacks smart correction features)`
      ).toBe(tc.expected);
    });
  }
});