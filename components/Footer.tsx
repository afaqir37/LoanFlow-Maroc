
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Landmark, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white no-print">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Landmark className="h-8 w-8 text-maroc-green" />
              <span className="font-display font-bold text-2xl">LoanFlow <span className="text-maroc-red">Maroc</span></span>
            </div>
            <p className="text-gray-400 text-sm">Votre partenaire de confiance pour la simulation de crédits au Maroc.</p>
            <p className="text-xs text-gray-500 mt-4">Fait avec ❤️ pour le Maroc</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-gray-300">
              <li><NavLink to="/" className="hover:text-maroc-red transition-colors">Accueil</NavLink></li>
              <li><NavLink to="/calculateur" className="hover:text-maroc-red transition-colors">Calculateur</NavLink></li>
              <li><NavLink to="/guide" className="hover:text-maroc-red transition-colors">Guide des Prêts</NavLink></li>
            </ul>
          </div>
          {/* <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">Légal</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-maroc-red transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-maroc-red transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-maroc-red transition-colors">Conditions générales</a></li>
            </ul>
          </div> */}
          {/* <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github /></a>
            </div>
          </div> */}
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p className="mb-2">Les calculs sont des estimations. Consultez votre banque pour des informations précises.</p>
          <p className="mb-2">© {new Date().getFullYear()} Tous droits réservés.</p>
          <p>Développé par <a href="https://openlluna.ca" target="_blank" rel="noopener noreferrer" className="text-maroc-red hover:underline">OpenLluna</a>.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
