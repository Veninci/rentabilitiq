
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingFAQ = () => {
  const faqItems = [
    {
      question: "Quelles sont les différences entre les formules Basic, Pro et Expert ?",
      answer: "La formule Basic (gratuite) vous permet de faire 3 simulations par mois avec des calculs basiques. La formule Pro débloque les simulations illimitées, l'export PDF et les alertes de rentabilité. La formule Expert ajoute l'accès à l'API immobilière, le suivi des tendances du marché et des conseils fiscaux personnalisés."
    },
    {
      question: "Puis-je changer de formule à tout moment ?",
      answer: "Oui, vous pouvez passer d'une formule à l'autre à tout moment. Si vous passez à une formule supérieure, vous serez facturé au prorata pour le reste de la période. Si vous passez à une formule inférieure, le changement prendra effet à la fin de votre période de facturation actuelle."
    },
    {
      question: "Comment fonctionne la période d'essai gratuite ?",
      answer: "Nous proposons une période d'essai de 14 jours pour les formules Pro et Expert. Pendant cette période, vous aurez accès à toutes les fonctionnalités de la formule choisie. Vous pouvez annuler à tout moment pendant la période d'essai, et vous ne serez pas facturé."
    },
    {
      question: "Comment annuler mon abonnement ?",
      answer: "Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord utilisateur, dans la section 'Abonnement'. Votre abonnement restera actif jusqu'à la fin de la période de facturation en cours."
    },
    {
      question: "Les prix incluent-ils la TVA ?",
      answer: "Oui, tous les prix affichés incluent la TVA."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes de crédit (Visa, Mastercard, American Express) et PayPal pour tous nos plans payants."
    },
  ];

  return (
    <div className="max-w-3xl mx-auto" id="faq">
      <h2 className="text-3xl font-bold text-center mb-10">Questions fréquentes</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PricingFAQ;
