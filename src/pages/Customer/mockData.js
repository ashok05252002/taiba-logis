import { Stethoscope, Baby, Sun, Heart, Pill } from 'lucide-react';

export const categories = [
    { name: 'Medicines', icon: Pill },
    { name: 'Wellness', icon: Heart },
    { name: 'Baby Care', icon: Baby },
    { name: 'Personal Care', icon: Sun },
    { name: 'Devices', icon: Stethoscope },
];

export const allProducts = [
    { 
        id: 1, 
        name: 'Panadol Extra', 
        description: '24 Tablets', 
        price: 'OMR 1.50', 
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/108BFA/FFFFFF/png?text=Panadol', 
        category: 'Medicines',
        requiresPrescription: true,
        longDescription: 'Panadol Extra with Optizorb is a paracetamol-based analgesic that provides fast, effective relief from tough pain, including headaches, migraines, and dental pain. The Optizorb formulation allows for faster absorption.',
        howToUse: 'Adults and children over 12 years: Take 1-2 tablets every 4-6 hours as required. Do not take more than 8 tablets in 24 hours.',
        ingredients: 'Each tablet contains Paracetamol 500mg and Caffeine 65mg.'
    },
    { 
        id: 2, 
        name: 'Vitamin C 1000mg', 
        description: '30 Effervescent Tablets', 
        price: 'OMR 4.55', 
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/732675/FFFFFF/png?text=Vitamin+C', 
        category: 'Wellness',
        requiresPrescription: false,
        longDescription: 'A high-strength Vitamin C supplement to support the immune system and reduce fatigue. Dissolves in water to make a refreshing orange-flavored drink.',
        howToUse: 'Dissolve one tablet in a glass of water daily.',
        ingredients: 'Ascorbic Acid (Vitamin C), Sodium Bicarbonate, Citric Acid.'
    },
    { 
        id: 3, 
        name: 'Nivea Sunscreen SPF50', 
        description: '200ml', 
        price: 'OMR 7.50', 
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/f59e0b/FFFFFF/png?text=Sunscreen', 
        category: 'Personal Care',
        requiresPrescription: false,
        longDescription: 'Provides highly effective UVA/UVB protection and supports the skin\'s protection from the inside with antioxidant Vitamin E. The caring formula is water-resistant.',
        howToUse: 'Apply generously before sun exposure and reapply frequently, especially after swimming, perspiring or toweling to maintain the original protection.',
        ingredients: 'Aqua, Homosalate, Octocrylene, Glycerin, Alcohol Denat.'
    },
    { 
        id: 4, 
        name: 'BabyJoy Diapers #4', 
        description: 'Jumbo Pack', 
        price: 'OMR 8.90', 
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/10b981/FFFFFF/png?text=Diapers', 
        category: 'Baby Care',
        requiresPrescription: false,
        longDescription: 'BabyJoy diapers provide comfort and dryness for your baby. With a compressed diamond pad for high absorbency and a soft cotton touch.',
        howToUse: 'For babies weighing 10-18 kg. Change diaper when wet.',
        ingredients: 'Pulp, Super Absorbent Polymer, Polyethylene, Non-woven fabric.'
    },
    { 
        id: 5, 
        name: 'Omron BP Monitor', 
        description: 'Automatic Arm Monitor', 
        price: 'OMR 25.00', 
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/ef4444/FFFFFF/png?text=BP+Monitor', 
        category: 'Devices',
        requiresPrescription: false,
        longDescription: 'The Omron M3 Comfort is a clinically validated blood pressure monitor that makes it easy to keep track of your hypertension at home. With Intelli Wrap Cuff technology for accurate readings.',
        howToUse: 'Wrap the cuff around your upper arm. Press the START button to take a reading.',
        ingredients: 'N/A'
    },
    { 
        id: 6, 
        name: 'Cetaphil Cleanser', 
        description: 'Gentle Skin Cleanser 250ml', 
        price: 'OMR 6.00', 
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/3b82f6/FFFFFF/png?text=Cleanser', 
        category: 'Personal Care',
        requiresPrescription: false,
        longDescription: 'A mild, non-irritating formulation that soothes skin as it cleans. In fact, it\'s gentle enough for a baby\'s delicate skin. Designed specifically to work for all skin types.',
        howToUse: 'Apply a liberal amount of cleanser to the skin and rub gently. Remove excess with a soft cloth, leaving a thin film on the skin.',
        ingredients: 'Water, Cetyl Alcohol, Propylene Glycol, Sodium Lauryl Sulfate.'
    },
];

export const recentlyViewed = allProducts.slice(0, 4);
