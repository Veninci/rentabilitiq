
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

const routeNameMap: Record<string, string> = {
  '': 'Accueil',
  'calculator': 'Calculateur',
  'pricing': 'Tarifs',
  'about': 'À propos',
  'terms': 'Conditions d\'utilisation',
  'privacy': 'Politique de confidentialité',
  'cookies': 'Cookies',
  'checkout': 'Paiement'
};

const BreadcrumbNav = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  if (location.pathname === '/') return null;

  return (
    <div className="container mx-auto px-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-1" />
                Accueil
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
            
            return (
              <React.Fragment key={path}>
                {isLast ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{routeNameMap[segment] || segment}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={path}>{routeNameMap[segment] || segment}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNav;
