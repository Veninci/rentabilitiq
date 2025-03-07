
import React from 'react';
import { Layout } from '@/components/layout/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Collecte des données</h2>
              <p className="text-muted-foreground">
                RentabilitiQ collecte les informations que vous nous fournissez directement lorsque vous utilisez notre service, 
                notamment les données que vous saisissez dans notre calculateur de rentabilité et les informations de compte 
                si vous créez un compte utilisateur.
              </p>
              <p className="text-muted-foreground mt-2">
                Nous collectons également automatiquement certaines informations lorsque vous visitez notre site, 
                telles que votre adresse IP, le type de navigateur, les pages consultées et le temps passé sur chaque page.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">2. Utilisation des données</h2>
              <p className="text-muted-foreground">
                Nous utilisons vos données pour:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
                <li>Fournir, maintenir et améliorer notre service</li>
                <li>Personnaliser votre expérience utilisateur</li>
                <li>Communiquer avec vous concernant votre compte ou nos services</li>
                <li>Analyser l'utilisation de notre service pour améliorer nos fonctionnalités</li>
                <li>Protéger notre service contre les activités frauduleuses ou abusives</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">3. Partage des données</h2>
              <p className="text-muted-foreground">
                Nous ne vendons pas vos informations personnelles à des tiers. Nous pouvons partager vos données avec:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
                <li>Nos fournisseurs de services qui nous aident à exploiter notre service</li>
                <li>Les autorités légales si la loi l'exige</li>
                <li>Des tiers en cas de fusion, acquisition ou vente d'actifs</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">4. Sécurité des données</h2>
              <p className="text-muted-foreground">
                Nous prenons des mesures raisonnables pour protéger vos informations personnelles contre la perte, 
                le vol, l'utilisation abusive et l'accès non autorisé. Cependant, aucune méthode de transmission sur 
                Internet ou de stockage électronique n'est 100% sécurisée.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">5. Vos droits</h2>
              <p className="text-muted-foreground">
                Vous avez le droit d'accéder, de corriger ou de supprimer vos données personnelles. Vous pouvez également 
                vous opposer au traitement de vos données ou demander la limitation de ce traitement. Pour exercer ces droits, 
                veuillez nous contacter à l'adresse email indiquée ci-dessous.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">6. Conservation des données</h2>
              <p className="text-muted-foreground">
                Nous conservons vos données aussi longtemps que nécessaire pour vous fournir nos services et 
                pour respecter nos obligations légales.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">7. Modifications de la politique</h2>
              <p className="text-muted-foreground">
                Nous pouvons modifier cette politique de confidentialité de temps à autre. Nous vous informerons 
                de tout changement important en publiant la nouvelle politique sur notre site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">8. Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à: veninci.invest@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
