
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calculator, BarChart, BookOpen, ShieldCheck } from 'lucide-react';

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="text-center p-6">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-maroc-green/10 text-maroc-green mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-display font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen relative bg-gray-100" style={{ backgroundImage: `url('/images/loanflow.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative container mx-auto px-6 py-32 md:py-48 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 leading-tight">
              Simulez facilement vos crédits au Maroc.
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200">
              Obtenez une estimation rapide et précise de vos mensualités pour tous types de prêts. Simple, clair et adapté aux normes bancaires marocaines.
            </p>
            <NavLink
              to="/calculateur"
              className="inline-block bg-maroc-red hover:bg-maroc-red/90 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
            >
              Commencer la simulation
            </NavLink>
          </div>

      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Pourquoi choisir LoanFlow Maroc ?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Nous offrons des outils puissants et des informations claires pour vous aider à prendre les meilleures décisions financières.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<Calculator size={32} />} title="Calculs Précis">
              Notre algorithme utilise les formules standards du marché marocain pour une estimation fiable.
            </FeatureCard>
            <FeatureCard icon={<BarChart size={32} />} title="Visualisations Claires">
              Comprenez la répartition de vos paiements grâce à des graphiques interactifs et simples.
            </FeatureCard>
            <FeatureCard icon={<BookOpen size={32} />} title="Guide Complet">
              Apprenez tout ce qu'il faut savoir sur les prêts immobiliers au Maroc avec notre guide détaillé.
            </FeatureCard>
            <FeatureCard icon={<ShieldCheck size={32} />} title="Confiance et Sécurité">
              Vos informations ne sont jamais enregistrées. Simulez en toute tranquillité.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
<section className="bg-gradient-to-r from-maroc-green to-emerald-700 text-white">
  <div className="container mx-auto px-6 py-20 text-center">
    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
      Prêt à concrétiser vos projets ?
    </h2>
    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200">
      N'attendez plus. Utilisez notre calculateur pour estimer vos mensualités et planifier vos projets financiers dès aujourd'hui.
    </p>
    <NavLink
      to="/calculateur"
      className="bg-white text-maroc-green hover:bg-gray-200 font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
    >
      Lancer le calculateur
    </NavLink>
  </div>
</section>


    </>
  );
};

export default HomePage;
