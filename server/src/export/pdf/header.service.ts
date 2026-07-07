import { PDF } from "./constants.js";
import type {
  PDFDoc,
  UserInfo,
} from "./types.js";

export function drawHeader(
  doc: PDFDoc,
  user: UserInfo
) {
  // ==========================
  // Logo
  // ==========================

  //const logoPath = path.join(
   // process.cwd(),
    //assets",
   // "logo.png"
  //);

 // if (fs.existsSync(logoPath)) {
   // doc.image(logoPath, 40, 30, {
    //  width: 55,
    //});
  //}

  // ==========================
  // Company Name
  // ==========================

  doc
    .fillColor(PDF.COLORS.PRIMARY)
    .fontSize(PDF.FONT.TITLE)
    .text("AI Expense Tracker", 110, 35);

  doc
    .fillColor(PDF.COLORS.MUTED)
    .fontSize(PDF.FONT.SMALL)
    .text(
      "Professional Financial Report",
      110,
      65
    );

  // ==========================
  // Divider
  // ==========================

  doc
    .moveTo(40, 95)
    .lineTo(555, 95)
    .strokeColor(PDF.COLORS.BORDER)
    .stroke();

  // ==========================
  // User Details
  // ==========================

  doc
    .fillColor(PDF.COLORS.TEXT)
    .fontSize(PDF.FONT.TEXT);

  doc.text(
    `Name : ${user.name}`,
    40,
    115
  );

  doc.text(
    `Email : ${user.email}`,
    40,
    135
  );

  doc.text(
    `Generated : ${new Date().toLocaleString()}`,
    40,
    155
  );

  doc.moveDown(4);
}