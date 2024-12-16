import { chromium } from 'playwright';

export async function POST(req) {
  try {
    const { hscRoll, hscYear, hscBoard, sscRoll, hscReg } = await req.json();

    if (!hscYear || !hscBoard || !hscRoll || !hscReg) {
      return new Response(JSON.stringify({ message: 'Invalid input data' }), {
        status: 400,
      });
    }

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://www.educationboardresults.gov.bd/');

    // Fill the form
    await page.selectOption('#exam', "hsc");
    await page.selectOption('#year', hscYear);
    await page.selectOption('#board', hscBoard);
    await page.fill('#roll', hscRoll);
    await page.fill('#reg', hscReg);

    // Solve the CAPTCHA
    const text = await page.locator(
      'body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > form > table > tbody > tr > td:nth-child(2) > fieldset > table > tbody > tr:nth-child(7) > td:nth-child(2)'
    ).innerText();

    const numbers = text.match(/\d+/g).map(Number);
    const valueSum = numbers.reduce((acc, num) => acc + num, 0);

    await page.fill('#value_s', valueSum.toString());

    // Submit the form
    await page.click('button[type="submit"]');

    // Try to capture the result
    try {
      const searchAgain = await page.locator(
        'body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2) > table > tbody > tr:nth-child(3) > td > a'
      ).innerText();

      if (searchAgain === 'Search Again') {
        const pdfPath = '/tmp/result.pdf';
        await page.pdf({ path: pdfPath });
        await browser.close();

        return new Response(
          JSON.stringify({
            message: 'Result captured successfully',
            pdfPath,
          }),
          { status: 200 }
        );
      }
    } catch (error) {
      console.warn('Result not found or another issue occurred:', error);
    }

    await browser.close();
    return new Response(JSON.stringify({ message: 'Result not found' }), {
      status: 404,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error occurred', error: error.message }), {
      status: 500,
    });
  }
}
