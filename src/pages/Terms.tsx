
import React from 'react';
import { Layout } from '@/components/layout/Layout';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Conditions d'utilisation</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Acceptation des conditions</h2>
              <p className="text-muted-foreground">
                En accédant et en utilisant le service RentabilitiQ, vous acceptez d'être lié par ces conditions d'utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">2. Description du service</h2>
              <p className="text-muted-foreground">
                RentabilitiQ est un outil de calcul et d'analyse de rentabilité pour les investissements immobiliers. 
                Nous fournissons des estimations et des analyses basées sur les données que vous saisissez et sur des données 
                de marché que nous recueillons de sources considérées comme fiables.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">3. Exactitude des calculs</h2>
              <p className="text-muted-foreground">
                Bien que nous nous efforcions de fournir des calculs précis, RentabilitiQ ne garantit pas l'exactitude des résultats. 
                Les calculs sont fournis à titre informatif uniquement et ne doivent pas être considérés comme des conseils financiers 
                ou d'investissement professionnels. Nous vous recommandons de consulter un professionnel qualifié avant de prendre 
                des décisions d'investissement.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">4. Comptes utilisateurs</h2>
              <p className="text-muted-foreground">
                Certaines fonctionnalités de notre service peuvent nécessiter la création d'un compte. Vous êtes responsable 
                de maintenir la confidentialité de vos informations de compte et de toutes les activités qui se produisent sous votre compte.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">5. Propriété intellectuelle</h2>
              <p className="text-muted-foreground">
                Le contenu, les fonctionnalités et la conception de RentabilitiQ sont protégés par des droits d'auteur, des marques 
                de commerce et d'autres lois. L'utilisation non autorisée de notre contenu est strictement interdite.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">6. Limitation de responsabilité</h2>
              <p className="text-muted-foreground">
                RentabilitiQ et ses propriétaires ne peuvent être tenus responsables de toute perte ou dommage résultant de 
                l'utilisation de notre service ou de décisions prises sur la base des calculs ou informations fournies par notre service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">7. Modifications des conditions</h2>
              <p className="text-muted-foreground">
                Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications entreront 
                en vigueur dès leur publication sur notre site. Votre utilisation continue du service après ces modifications 
                constitue votre acceptation des nouvelles conditions.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">8. Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse : veninci.invest@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
