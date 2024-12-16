import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req) {
  const BOARD = {
    Dhaka: "dhaka",
    Barisal: "barisal",
    Chittagong: "chittagong",
    Comilla: "comilla",
    Dinajpur: "dinajpur",
    Jessore: "jessore",
    Mymensingh: "mymensingh",
    Rajshahi: "rajshahi",
    Shylet: "shylet",
    Madrasah: "madrasah",
    Technical: "tec",
    "DIBS(Dhaka)": "dibs",
  };

  try {
    // Parse and validate incoming data
    const formData = await req.json();

    if (!formData || typeof formData !== "object") {
      return new Response(JSON.stringify({ error: "Invalid input format." }), {
        status: 400,
      });
    }

    // Sanitize and map input data
    formData.sscBoard = BOARD[formData.sscBoard] || null;
    formData.hscBoard = BOARD[formData.hscBoard] || null;

    if (!formData.sscBoard || !formData.hscBoard) {
      return new Response(
        JSON.stringify({ error: "Invalid board selection." }),
        {
          status: 400,
        }
      );
    }

    const { rollSSC, rollHSC, reg, sscYear, hscYear } = formData;

    if (
      !rollSSC ||
      !rollHSC ||
      !reg ||
      !sscYear ||
      !hscYear ||
      isNaN(rollSSC) ||
      isNaN(rollHSC) ||
      isNaN(sscYear) ||
      isNaN(hscYear)
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing input data." }),
        { status: 400 }
      );
    }

    async function fetchResult(examType, roll, board, year) {
      try {
        const initialResponse = await axios.get(
          "http://www.educationboardresults.gov.bd/index.php",
          { withCredentials: true }
        );

        const cookies = initialResponse.headers["set-cookie"] || [];
        const sessionCookie = cookies.find((cookie) =>
          cookie.startsWith("PHPSESSID")
        );

        if (!sessionCookie) {
          throw new Error("Session cookie not found.");
        }

        const $ = cheerio.load(initialResponse.data);

        let captchaString = $(
          "body fieldset table tr:nth-child(7) td:nth-child(2)"
        )
          .text()
          .trim();

        if (!captchaString || captchaString.length < 3) {
          captchaString = $("td:contains('+'), td:contains('-')").text().trim();
        }

        const captchaSolution = eval(captchaString); // Dangerous! Should replace eval with safer parsing methods in production

        const resultFormData = {
          sr: "3",
          et: "2",
          exam: examType,
          reg,
          roll,
          board,
          year,
          value_s: captchaSolution,
          button2: "Submit",
        };

        const submitResponse = await axios.post(
          "http://www.educationboardresults.gov.bd/result.php",
          new URLSearchParams(resultFormData).toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Cookie: sessionCookie,
              Referer: "http://www.educationboardresults.gov.bd/index.php",
              Origin: "http://www.educationboardresults.gov.bd",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            },
            withCredentials: true,
          }
        );

        const resultPage = cheerio.load(submitResponse.data);

        const infoTable = resultPage("table.black12").first();
        const gradeSheet = resultPage("table.black12").last();
        const allSubjectGrades = [];

        gradeSheet
          .find("tr")
          .slice(1)
          .each((_, row) => {
            const subjectRow = cheerio.load(row);
            allSubjectGrades.push({
              subjectName: subjectRow("td:nth-child(2)").text().trim(),
              subjectCode: subjectRow("td:nth-child(1)").text().trim(),
              subjectGPA: subjectRow("td:nth-child(3)").text().trim(),
            });
          });

        return {
          name: infoTable.find("tr:nth-child(1) td:nth-child(4)").text().trim(),
          fatherName: infoTable
            .find("tr:nth-child(2) td:nth-child(4)")
            .text()
            .trim(),
          motherName: infoTable
            .find("tr:nth-child(3) td:nth-child(4)")
            .text()
            .trim(),
          group: infoTable
            .find("tr:nth-child(3) td:nth-child(2)")
            .text()
            .trim(),
          type: infoTable.find("tr:nth-child(4) td:nth-child(2)").text().trim(),
          dob: infoTable.find("tr:nth-child(4) td:nth-child(4)").text().trim(),
          result: infoTable
            .find("tr:nth-child(5) td:nth-child(2)")
            .text()
            .trim(),
          institute: infoTable
            .find("tr:nth-child(5) td:nth-child(4)")
            .text()
            .trim(),
          gpa: infoTable.find("tr:nth-child(6) td:nth-child(2)").text().trim(),
          year,
          subjectGrades: allSubjectGrades,
        };
      } catch (err) {
        console.error("Fetch Result Error:", err.message);
        throw new Error("Failed to fetch the result.");
      }
    }

    const sscResult = await fetchResult(
      "ssc",
      rollSSC,
      formData.sscBoard,
      sscYear
    );

    const hscResult = await fetchResult(
      "hsc",
      rollHSC,
      formData.hscBoard,
      hscYear
    );
    // console.log(sscResult.group)
    return new Response(
      JSON.stringify({
        statusCode: 200,
        registration: reg,
        sscDetails: sscResult,
        hscDetails: hscResult,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
