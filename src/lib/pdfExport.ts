
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PropertyResults } from '@/types/property';
import { formatter } from './formatter';

export const exportResultsToPdf = async (results: PropertyResults, city?: string | null) => {
  // Créer un élément div temporaire pour le rendu du PDF
  const pdfContent = document.createElement('div');
  pdfContent.className = 'pdf-export';
  
  // Styles pour le contenu du PDF
  pdfContent.style.padding = '20px';
  pdfContent.style.color = '#000';
  pdfContent.style.background = '#fff';
  pdfContent.style.width = '595px'; // Largeur A4
  pdfContent.style.fontFamily = 'Helvetica, Arial, sans-serif';
  
  // Contenu du PDF
  pdfContent.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="font-size: 24px; margin-bottom: 5px;">Rapport de rentabilité immobilière</h1>
      ${city ? `<h2 style="font-size: 18px; margin-top: 0; color: #666;">Bien situé à ${city}</h2>` : ''}
      <p style="margin-top: 0; color: #666; font-size: 14px;">Généré par RentabilitiQ le ${new Date().toLocaleDateString('fr-FR')}</p>
    </div>
    
    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Résumé de l'investissement</h3>
      <div style="display: flex; justify-content: space-between;">
        <div style="width: 48%;">
          <p><strong>Investissement total:</strong> ${formatter.formatCurrency(results.totalInvestment)}</p>
          <p><strong>Prix d'achat:</strong> ${formatter.formatCurrency(results.purchasePrice)}</p>
          <p><strong>Frais de notaire:</strong> ${formatter.formatCurrency(results.notaryFees)}</p>
          <p><strong>Travaux:</strong> ${formatter.formatCurrency(results.renovationCost)}</p>
        </div>
        <div style="width: 48%;">
          <p><strong>Prix au m²:</strong> ${formatter.formatCurrency(results.pricePerSqm)}/m²</p>
          <p><strong>Loyer au m²:</strong> ${formatter.formatCurrency(results.rentPerSqm)}/m²</p>
          ${results.monthlyMortgage > 0 ? `<p><strong>Mensualité crédit:</strong> ${formatter.formatCurrency(results.monthlyMortgage)}</p>` : ''}
        </div>
      </div>
    </div>
    
    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Indicateurs de rentabilité</h3>
      <div style="display: flex; justify-content: space-between;">
        <div style="width: 48%;">
          <p><strong>Rendement brut:</strong> ${formatter.formatPercent(results.grossYield)}</p>
          <p><strong>Rendement net:</strong> ${formatter.formatPercent(results.netYield)}</p>
          <p><strong>Durée de remboursement:</strong> ${results.paybackPeriod === Infinity ? "Jamais" : `${results.paybackPeriod.toFixed(1)} ans`}</p>
        </div>
        <div style="width: 48%;">
          <p><strong>Cash-flow mensuel:</strong> <span style="color: ${results.monthlyCashFlow >= 0 ? 'green' : 'red'};">${formatter.formatCurrency(results.monthlyCashFlow)}</span></p>
          <p><strong>Cash-flow annuel:</strong> <span style="color: ${results.annualCashFlow >= 0 ? 'green' : 'red'};">${formatter.formatCurrency(results.annualCashFlow)}</span></p>
        </div>
      </div>
    </div>
    
    <div>
      <h3 style="font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Flux financiers</h3>
      <p><strong>Revenus annuels:</strong> <span style="color: green;">${formatter.formatCurrency(results.annualIncome)}</span></p>
      <p><strong>Charges annuelles:</strong> <span style="color: red;">${formatter.formatCurrency(results.annualExpenses)}</span></p>
    </div>
    
    <div style="margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666; text-align: center;">
      <p>Ce document est généré à titre informatif et ne constitue pas un conseil en investissement.</p>
      <p>© ${new Date().getFullYear()} RentabilitiQ - Tous droits réservés</p>
    </div>
  `;
  
  // Ajouter temporairement à la page pour le rendu
  document.body.appendChild(pdfContent);
  
  try {
    // Génération du canvas à partir du HTML
    const canvas = await html2canvas(pdfContent, {
      scale: 1,
      useCORS: true,
      logging: false
    });
    
    // Création du PDF au format A4
    const pdf = new jsPDF({
      format: 'a4',
      unit: 'mm',
    });
    
    // Ajout de l'image du canvas au PDF
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // largeur A4 en mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Téléchargement du PDF
    pdf.save('rentabilitiq-rapport.pdf');
  } finally {
    // Nettoyage du DOM
    document.body.removeChild(pdfContent);
  }
};
