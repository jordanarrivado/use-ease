'use client';

import { useState } from 'react';
import { Check, Crown, Zap, Building2, Rocket, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import ReminderAlert from '@/components/ReminderAlert';

const SUBSCRIPTION_TIERS = [
  {
    id: 'pro',
    name: 'Pro',
    price: '29',
    description: 'Perfect for individual creators and freelancers.',
    icon: <Rocket className="text-blue-500" size={28} />,
    features: ['10 Active Schedules', 'Standard Poster Templates', 'High-Res PNG Export', 'Email Support'],
    buttonText: 'Start Pro',
    highlight: false,
  },
  {
    id: 'business',
    name: 'Business',
    price: '79',
    description: 'Advanced tools for growing teams and studios.',
    icon: <Zap className="text-indigo-500" size={28} />,
    features: ['Unlimited Schedules', 'Premium Layouts', 'Custom Branding', 'Priority Support', 'Team Collaboration'],
    buttonText: 'Go Business',
    highlight: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '199',
    description: 'Ultimate power for large-scale organizations.',
    icon: <Building2 className="text-emerald-500" size={28} />,
    features: ['Custom API Access', 'White-label Exports', 'Dedicated Manager', 'SLA Guarantee', 'Bulk Import/Export'],
    buttonText: 'Contact Sales',
    highlight: false,
  },
];

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-16 md:py-24">
      <ReminderAlert />
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
          <Crown size={14} className="text-indigo-600 dark:text-indigo-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Subscription Plans</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none">
          Scale Your <span className="text-indigo-600">Vision</span>
        </h1>
        
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Choose a plan that fits your workflow. Upgrade or downgrade at any time.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 bg-slate-200 dark:bg-slate-800 rounded-full relative p-1 transition-colors"
          >
            <div className={`w-5 h-5 bg-indigo-600 rounded-full transition-transform ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Yearly <span className="text-emerald-500 text-[10px] ml-1">SAVE 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {SUBSCRIPTION_TIERS.map((tier) => (
          <div 
            key={tier.id}
            className={`relative flex flex-col p-8 md:p-10 rounded-[3rem] transition-all duration-500 border ${
              tier.highlight 
                ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.2)] scale-105 z-10' 
                : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                {tier.icon}
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 dark:text-white">
                {tier.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium leading-relaxed">
                {tier.description}
              </p>
            </div>

            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                ${billingCycle === 'yearly' ? Math.floor(Number(tier.price) * 0.8) : tier.price}
              </span>
              <span className="text-slate-400 font-bold text-sm uppercase">/ month</span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-emerald-500" strokeWidth={4} />
                  </div>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-5 rounded-3xl font-black uppercase tracking-[0.15em] text-[11px] transition-all active:scale-95 flex items-center justify-center gap-2 ${
              tier.highlight
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700'
                : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
            }`}>
              {tier.buttonText}
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Trust Footer */}
      <div className="mt-20 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Trusted by industry leaders</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale dark:invert">
          {/* Use simple font-based logos for placeholders */}
          <span className="text-xl font-black italic tracking-tighter">VOLT</span>
          <span className="text-xl font-black italic tracking-tighter">STUDIO</span>
          <span className="text-xl font-black italic tracking-tighter">PHASE</span>
          <span className="text-xl font-black italic tracking-tighter">CORE</span>
        </div>
      </div>
    </div>
  );
}