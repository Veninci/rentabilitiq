
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PropertyResults } from '@/types/property';
import { formatter } from './formatter';

export const exportResultsToPDF = async (
  results: PropertyResults, 
  elementToCapture: HTMLElement,
  cityName?: string
) => {
  try {
    // Fonction pour sécuriser les valeurs
    const safeGet = (value: any, defaultValue: any = 0) => {
      return value === null || value === undefined || isNaN(value) || !isFinite(value) ? defaultValue : value;
    };

    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Add title and header
    pdf.setFontSize(20);
    pdf.setTextColor(51, 51, 51);
    pdf.text('Analyse de rentabilité immobilière', pageWidth / 2, 20, { align: 'center' });
    
    // Add property location if available
    if (cityName) {
      pdf.setFontSize(14);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Bien situé à ${cityName}`, pageWidth / 2, 30, { align: 'center' });
    }
    
    // Add date
    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    pdf.setFontSize(10);
    pdf.text(`Généré le ${dateStr}`, pageWidth / 2, 40, { align: 'center' });
    
    // Add key results as text with safer values
    pdf.setFontSize(12);
    pdf.setTextColor(51, 51, 51);
    
    const startY = 50;
    const lineHeight = 8;
    
    // Utiliser les valeurs sécurisées pour l'affichage
    pdf.text(`Investissement total: ${formatter.formatCurrency(safeGet(results.totalInvestment))}`, 20, startY);
    pdf.text(`Cash-flow mensuel: ${formatter.formatCurrency(safeGet(results.monthlyCashFlow))}`, 20, startY + lineHeight);
    pdf.text(`Rendement brut: ${formatter.formatPercent(safeGet(results.grossYield))}`, 20, startY + lineHeight * 2);
    pdf.text(`Rendement net: ${formatter.formatPercent(safeGet(results.netYield))}`, 20, startY + lineHeight * 3);
    
    // Capture the element as an image
    const canvas = await html2canvas(elementToCapture, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    // Convert canvas to image
    const imgData = canvas.toDataURL('image/png');
    
    // Calculate image dimensions to fit in PDF while maintaining aspect ratio
    const imgWidth = pageWidth - 40; // 20mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add the image to the PDF, below the text content
    pdf.addImage(imgData, 'PNG', 20, startY + lineHeight * 5, imgWidth, imgHeight);
    
    // Add footer with disclaimer
    const footerText = "Document généré par RentaFlex - Les résultats sont des estimations et ne constituent pas un conseil financier.";
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(footerText, pageWidth / 2, 285, { align: 'center' });
    
    // Save the PDF
    pdf.save(`analyse-rentabilite${cityName ? `-${cityName.toLowerCase()}` : ''}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    return false;
  }
};
