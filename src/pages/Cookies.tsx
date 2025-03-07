
import React from 'react';
import { Layout } from '@/components/layout/Layout';

const Cookies = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Politique de cookies</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Qu'est-ce qu'un cookie ?</h2>
              <p className="text-muted-foreground">
                Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette ou téléphone) 
                lorsque vous naviguez sur Internet. Les cookies permettent de reconnaître votre appareil et de stocker 
                certaines informations sur vos préférences ou actions passées.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">2. Comment utilisons-nous les cookies ?</h2>
              <p className="text-muted-foreground">
                RentabilitiQ utilise des cookies pour:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
                <li>Assurer le bon fonctionnement de notre site (cookies essentiels)</li>
                <li>Mémoriser vos préférences et paramètres</li>
                <li>Améliorer la performance et la vitesse du site</li>
                <li>Analyser la façon dont vous utilisez notre site pour l'améliorer</li>
                <li>Personnaliser votre expérience en fonction de vos interactions précédentes</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">3. Types de cookies utilisés</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Cookies essentiels</h3>
                  <p className="text-muted-foreground">
                    Ces cookies sont nécessaires au fonctionnement de base de notre site. Ils permettent par exemple de vous 
                    authentifier, de sécuriser votre connexion ou de mémoriser les éléments de votre session.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Cookies analytiques</h3>
                  <p className="text-muted-foreground">
                    Nous utilisons des cookies analytiques comme ceux de Google Analytics pour comprendre comment vous interagissez 
                    avec notre site, quelles pages sont les plus visitées, et pour détecter d'éventuels problèmes techniques.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Cookies de préférences</h3>
                  <p className="text-muted-foreground">
                    Ces cookies nous permettent de mémoriser vos préférences, comme la langue ou la région, 
                    pour vous offrir une expérience personnalisée.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">4. Contrôle des cookies</h2>
              <p className="text-muted-foreground">
                Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies 
                déjà stockés sur votre appareil et paramétrer la plupart des navigateurs pour qu'ils bloquent leur installation. 
                Toutefois, si vous bloquez tous les cookies, certaines fonctionnalités de notre site pourraient ne pas fonctionner correctement.
              </p>
              <p className="text-muted-foreground mt-2">
                Pour plus d'informations sur la gestion des cookies, consultez les paramètres de votre navigateur ou visitez 
                www.allaboutcookies.org.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">5. Cookies tiers</h2>
              <p className="text-muted-foreground">
                Certains cookies tiers peuvent être placés sur votre appareil par nos partenaires. Ces cookies nous aident à analyser 
                notre trafic ou à vous proposer un contenu personnalisé. Nous n'avons pas de contrôle direct sur les informations 
                collectées par ces cookies.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">6. Modifications de la politique</h2>
              <p className="text-muted-foreground">
                Nous pouvons modifier cette politique de cookies de temps à autre. Toute modification sera publiée sur cette page.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">7. Contact</h2>
              <p className="text-muted-foreground">
                Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter à: veninci.invest@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cookies;
