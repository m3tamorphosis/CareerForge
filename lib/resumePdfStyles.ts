export const resumePdfStyles = `
  @page {
    size: A4;
    margin: 16mm 14mm;
  }

  html,
  body {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    overflow: visible;
    background: #ffffff;
    color: #334155;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    font-family: Inter, Arial, Helvetica, sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-shadow: none !important;
    box-shadow: none !important;
    transform: none !important;
    animation: none !important;
    transition: none !important;
  }

  .resume-pdf-root {
    width: 100%;
    min-height: auto;
    height: auto;
    max-height: none;
    overflow: visible;
    background: #ffffff;
  }

  .resume-pdf-document {
    width: 100%;
    max-width: none;
    min-height: auto;
    height: auto;
    margin: 0;
    padding: 0;
    overflow: visible;
    background: #ffffff;
    color: #334155;
  }

  .resume-pdf-shell {
    width: 800px;
    background: #ffffff;
    padding: 36px 46px 40px;
    font-family: Inter, Arial, Helvetica, sans-serif;
  }

  .resume-pdf-page {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    background: #ffffff;
    color: #334155;
  }

  .resume-pdf-header {
    margin: 0 0 22px;
    padding: 0;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .resume-pdf-name {
    margin: 0;
    color: #0f172a;
    font-size: 30px;
    line-height: 1.02;
    font-weight: 750;
    letter-spacing: -0.02em;
  }

  .resume-pdf-role {
    margin: 5px 0 0;
    color: #334155;
    font-size: 15px;
    line-height: 1.4;
    font-weight: 500;
  }

  .resume-pdf-contact {
    margin: 8px 0 0;
    color: #64748b;
    font-size: 11.5px;
    line-height: 1.5;
  }

  .resume-pdf-section {
    margin-top: 20px;
    page-break-inside: auto;
    break-inside: auto;
  }

  .resume-pdf-section-heading {
    margin: 0;
    color: #475569;
    font-size: 12px;
    line-height: 1.15;
    font-weight: 650;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .resume-pdf-section-rule {
    height: 1px;
    margin: 6px 0 9px;
    background: #e5e7eb;
  }

  .resume-pdf-section-body {
    color: #334155;
    font-size: 11.5px;
    line-height: 1.52;
  }

  .resume-pdf-summary {
    margin: 0;
    line-height: 1.5;
  }

  .resume-pdf-skill-groups {
    display: grid;
    gap: 4px;
  }

  .resume-pdf-skill-line {
    display: grid;
    grid-template-columns: 88px minmax(0, 1fr);
    column-gap: 8px;
    margin: 0;
  }

  .resume-pdf-skill-label {
    color: #0f172a;
    font-weight: 650;
  }

  .resume-pdf-skill-value {
    color: #334155;
  }

  .resume-pdf-stack {
    display: grid;
    gap: 16px;
  }

  .resume-pdf-entry {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .resume-pdf-entry-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 18px;
  }

  .resume-pdf-entry-main {
    min-width: 0;
  }

  .resume-pdf-entry-title {
    margin: 0;
    color: #0f172a;
    font-size: 12.5px;
    line-height: 1.3;
    font-weight: 700;
  }

  .resume-pdf-entry-company {
    margin: 1px 0 0;
    color: #334155;
    font-size: 11.5px;
    line-height: 1.42;
  }

  .resume-pdf-entry-date {
    margin: 0;
    flex-shrink: 0;
    white-space: nowrap;
    color: #64748b;
    font-size: 11px;
    line-height: 1.3;
    text-align: right;
  }

  .resume-pdf-bullets {
    margin: 6px 0 0;
    padding-left: 16px;
  }

  .resume-pdf-bullets li {
    margin: 0 0 4px;
    line-height: 1.5;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .resume-pdf-project-description {
    margin: 3px 0 0;
    color: #334155;
    line-height: 1.48;
  }

  .resume-pdf-project-stack {
    margin: 3px 0 0;
    color: #64748b;
    font-size: 11px;
    line-height: 1.45;
  }

  .resume-pdf-certifications {
    margin-top: 0;
  }

  .resume-pdf-avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }
`;
