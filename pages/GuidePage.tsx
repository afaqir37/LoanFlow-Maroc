import React from 'react';
import { ChevronsRight } from 'lucide-react';

// Assuming maroc-green is a custom Tailwind class
const GuidePage: React.FC = () => {
    // Helper component to structure non-accordion content
    const ContentSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="pt-6 border-b pb-8">
            <h2 className="text-3xl font-bold mb-4 text-maroc-green">{title}</h2>
            <div className="text-gray-600 space-y-4">
                {children}
            </div>
        </div>
    );

    return (
        <div className="bg-white">
            <div className="relative h-72 mt-24 sm:mt-14">
                <img 
                    src="https://images.unsplash.com/photo-1672380135241-c024f7fbfa13?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Guide des prêts au Maroc" 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    {/* Big Title */}
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white text-center px-4 leading-tight">
                        GUIDE COMPLET DES PRÊTS AU MAROC
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content (2/3) */}
                    <div className="lg:w-2/3">
                        <div className="prose prose-lg max-w-none">
                            <p className="lead text-xl text-gray-700 mb-8">
                                Que ce soit pour un logement, une voiture, des études ou un projet personnel, le financement est une étape clé. Ce guide est conçu pour vous éclairer sur les spécificités des différents types de <strong>crédits au Maroc</strong> 🇲🇦, vous permettant de naviguer le processus avec <strong>confiance</strong> et de prendre des décisions <strong>éclairées</strong>.
                            </p>
                            
                            <ContentSection title="Le Crédit à la Consommation : Financer vos Projets">
                                <p>Ce type de prêt est destiné à financer des biens d'équipement (voiture, électroménager) ou des services (voyage, études). Contrairement au prêt immobilier, il n'est <strong>pas gagé par une hypothèque</strong> et est généralement accordé sur des durées plus <strong>courtes</strong> (jusqu'à 7 ans).</p>
                                <p>Le <strong>TAEG (Taux Annuel Effectif Global)</strong> est l'indicateur clé. Il inclut le taux d'intérêt nominal, les frais de dossier, l'assurance et autres frais obligatoires. Il vous donne le <strong>coût total réel</strong> du crédit.</p>
                                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-sm text-gray-800">
                                    💡 <strong>Conseil :</strong> Au Maroc, l'assurance décès-invalidité peut aussi être exigée pour les montants importants de crédit à la consommation. Comparez les <strong>TAEG</strong>, pas seulement les taux d'intérêt nominaux !
                                </div>
                            </ContentSection>
                            
                            <ContentSection title="Les Conditions d’Éligibilité Générales">
                                <p>Bien que les exigences varient selon les banques et le type de prêt, les critères suivants sont universellement appliqués :</p>
                                <ul className="list-disc ml-6 space-y-2">
                                    <li><strong>Résidence :</strong> Être résident marocain (ou MRE avec conditions spécifiques).</li>
                                    <li><strong>Âge :</strong> Avoir entre 21 et 65 ans (l'âge maximum en fin de prêt est souvent 70 ans pour l'immobilier).</li>
                                    <li><strong>Revenus Stables :</strong> Justifier d'un revenu régulier (salaire, pension) pour une durée minimale (souvent 6 mois à 1 an dans l'entreprise actuelle).</li>
                                    <li><strong>Ratio d'Endettement :</strong> Votre <strong>charge de remboursement mensuelle</strong> (tous crédits confondus) ne doit généralement pas dépasser <strong>40% à 50%</strong> de votre revenu net mensuel.</li>
                                </ul>
                            </ContentSection>
                            
                            <ContentSection title="Comprendre les Taux d'Intérêt (Fixe vs. Variable)">
                                <p>Le choix entre <strong>taux fixe</strong> et <strong>taux variable</strong> s'applique à la plupart des prêts de longue durée (immobilier, gros investissement). Le taux fixe offre une mensualité constante, garantissant une <strong>sécurité budgétaire</strong> totale.</p>
                                <p>Le taux variable, souvent indexé sur des références du marché comme le Taux Monétaire Moyen Pondéré (<strong>TMM</strong>), peut entraîner des variations de vos mensualités à la hausse ou à la baisse. Il est crucial de comprendre la <strong>marge appliquée par la banque</strong>.</p>
                            </ContentSection>
                            
                            <ContentSection title="L'Assurance Crédit : Une Protection Obligatoire">
                                <p>L'assurance est exigée pour garantir le remboursement en cas d'imprévu (décès, invalidité, incapacité de travail, et parfois perte d'emploi). Elle protège la <strong>banque</strong> et votre <strong>famille</strong>.</p>
                                <p>Pour un prêt immobilier, le taux standard est d'environ <strong>0.40% par an</strong> du capital initial. Ce coût est intégré au TAEG. Vous avez la possibilité de choisir une assurance externe (<strong>délégation d'assurance</strong>), sous réserve d'équivalence des garanties, ce qui peut potentiellement <strong>réduire le coût total</strong>.</p>
                            </ContentSection>

                            <ContentSection title="Options et Coûts du Remboursement Anticipé">
                                <p>Vous pouvez légalement rembourser tout ou partie de votre crédit avant son terme. Les banques marocaines appliquent des <strong>pénalités de remboursement anticipé</strong> (IRA), qui sont généralement plafonnées par les régulations de Bank Al-Maghrib.</p>
                                <p>Typiquement, ces frais sont :</p>
                                <ul className="list-disc ml-6 space-y-2">
                                    <li><strong>Prêt Immobilier :</strong> Plafonné à <strong>2%</strong> du capital remboursé.</li>
                                    <li><strong>Crédit à la Consommation :</strong> Souvent forfaitaire ou un pourcentage du capital restant dû.</li>
                                </ul>
                                <p>Vérifiez toujours cette clause dans votre offre de prêt, car un remboursement anticipé reste souvent <strong>rentable</strong> malgré les pénalités.</p>
                            </ContentSection>
                        </div>
                    </div>

                    {/* Sticky Sidebar (1/3) */}
                    <aside className="lg:w-1/3">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                                <h3 className="font-display text-xl font-bold mb-4 border-b pb-2">Lexique du Prêt au Maroc</h3>
                                <ul className="space-y-3 text-gray-700">
                                    {/* Using <strong> tags here to ensure bold rendering */}
                                    <li className="flex items-start"><ChevronsRight className="text-maroc-green h-5 w-5 mr-2 mt-1 flex-shrink-0" /><span><strong>TAEG :</strong> Le véritable coût annuel du crédit (<strong>Taux Annuel Effectif Global</strong>).</span></li>
                                    <li className="flex items-start"><ChevronsRight className="text-maroc-green h-5 w-5 mr-2 mt-1 flex-shrink-0" /><span><strong>Ratio d'Endettement :</strong> Ne doit pas dépasser <strong>40-50%</strong> de votre revenu.</span></li>
                                    <li className="flex items-start"><ChevronsRight className="text-maroc-green h-5 w-5 mr-2 mt-1 flex-shrink-0" /><span><strong>Frais de Dossier :</strong> Frais fixes ou en pourcentage appliqués par la banque.</span></li>
                                    <li className="flex items-start"><ChevronsRight className="text-maroc-green h-5 w-5 mr-2 mt-1 flex-shrink-0" /><span><strong>Pénalités de Remboursement :</strong> Frais (IRA) appliqués en cas de paiement <strong>anticipé</strong>.</span></li>
                                </ul>
                            </div>
                            
                            <div className="bg-maroc-green text-white p-6 rounded-lg text-center shadow-md">
                                <h3 className="font-display text-2xl font-bold mb-2">Prêt à Calculer ?</h3>
                                <p className="mb-4">Utilisez notre outil pour estimer vos mensualités et le <strong>coût total</strong> de votre financement.</p>
                                <a href="/calculateur" className="inline-block bg-white text-maroc-green font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors shadow-lg">
                                    Lancer le Calculateur
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default GuidePage;