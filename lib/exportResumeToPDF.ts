"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { ResumePDF } from "@/components/resume/ResumePDF";
import { resumePdfStyles } from "@/lib/resumePdfStyles";
import type { ResumeFormValues } from "@/types";

function waitForRender() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function isResumeDataValid(values: ResumeFormValues) {
  return Boolean(values && values.personal && Array.isArray(values.experience) && Array.isArray(values.education) && Array.isArray(values.skills));
}

export async function exportResumeToPDF(values: ResumeFormValues, filename: string) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("Resume export is only available in the browser.");
  }

  if (!isResumeDataValid(values)) {
    console.error("[resume-export] Invalid resume data", values);
    throw new Error("Resume data is incomplete. Please save and try again.");
  }

  const styleTag = document.createElement("style");
  styleTag.setAttribute("data-resume-pdf-export", "true");
  styleTag.textContent = resumePdfStyles;
  document.head.appendChild(styleTag);

  const host = document.createElement("div");
  host.className = "resume-pdf-export-host";
  host.setAttribute("aria-hidden", "true");
  document.body.appendChild(host);

  const root = createRoot(host);
  root.render(createElement(ResumePDF, { values }));

  try {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    await waitForRender();

    const documentNode = host.querySelector(".resume-pdf-shell") as HTMLElement | null;
    console.debug("[resume-export] host mounted", {
      hostExists: Boolean(host),
      shellExists: Boolean(documentNode),
      experienceCount: values.experience?.length ?? 0,
      educationCount: values.education?.length ?? 0,
      skillCount: values.skills?.length ?? 0,
    });

    if (!documentNode) {
      console.error("[resume-export] Missing export node", { hostHtml: host.innerHTML });
      throw new Error("Unable to render resume for export.");
    }

    const canvas = await html2canvas(documentNode, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      windowWidth: documentNode.scrollWidth,
      windowHeight: documentNode.scrollHeight,
    });

    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imageHeight = (canvas.height * pageWidth) / canvas.width;

    let heightLeft = imageHeight;
    let position = 0;

    pdf.addImage(imageData, "PNG", 0, position, pageWidth, imageHeight, undefined, "FAST");
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imageData, "PNG", 0, position, pageWidth, imageHeight, undefined, "FAST");
      heightLeft -= pageHeight;
    }

    pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
  } catch (error) {
    console.error("[resume-export] Export failed", error);
    throw error instanceof Error ? error : new Error("Unable to export resume.");
  } finally {
    root.unmount();
    host.remove();
    styleTag.remove();
  }
}
