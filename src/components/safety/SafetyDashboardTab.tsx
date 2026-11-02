import React, { useMemo } from 'react';
import { SafetyObservation, NearMissReport, AccidentReport } from '../../types';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Flame, 
  HardHat, 
  Stethoscope, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Eye,
  Plus
} from 'lucide-react';

interface SafetyDashboardTabProps {
  observations: SafetyObservation[];
  nearMisses: NearMissReport[];
  accidents: AccidentReport[];
  onNavigateSubmodule: (tab: 'observations' | 'nearmiss' | 'accidents' | 'timeline' | 'dashboard') => void;
}

export default function SafetyDashboardTab({
  observations,
  nearMisses,
  accidents,
  onNavigateSubmodule
}: SafetyDashboardTabProps) {
  // Heinrich Triangle numbers
  const totalAccidents = accidents.length;
  const lostTimeAccidents = accidents.filter(a => (a.mandaysLost || 0) > 0).length;
  const firstAidAccidents = accidents.filter(a => (a.mandaysLost || 0) === 0).length;
  const totalNearMisses = nearMisses.length;
  const totalObservations = observations.length;

  // Category counts
  const catACount = observations.filter(o => o.category === 'A').length;
  const catBCount = observations.filter(o => o.category === 'B').length;
  const catCCount = observations.filter(o => o.category === 'C').length;
  const catPendingCount = observations.filter(o => !o.category).length;

  // Unsafe acts vs Unsafe conditions
  const unsafeActCount = observations.filter(o => o.legend === 'Unsafe act').length;
  const unsafeConditionCount = observations.filter(o => o.legend === 'Unsafe condition').length;

  // Days without LTI (simulated plant calculation)
  const daysWithoutLTI = 294;

  return (
    <div className="space-y-6">
      {/* Zero Harm Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-md border border-emerald-900/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400 font-mono tracking-widest uppercase">
                Zero Harm Stewardship · Vision Zero
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              EHS Safety Intelligence &amp; Proactive Elimination
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Proactively logging shopfloor observations and near-misses systematically dismantles the Heinrich causal chain before accidents manifest.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/15 flex items-center space-x-4 shrink-0">
            <div className="text-center">
              <div className="text-4xl font-black font-mono text-emerald-400 tracking-tight">
                {daysWithoutLTI}
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">
                Safe Days Without LTI
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Submodules Interactive Launchpad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Submodule 1 Card */}
        <div 
          onClick={() => onNavigateSubmodule('observations')}
          className="bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md rounded-2xl p-5 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full font-mono">
                Submodule 01
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">{totalObservations} Logged</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-amber-700 transition-colors">
              👁️ Safety Observations
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Shopfloor hazard logging up to <em>Before condition</em> → Safety Coordinator fills Category A/B/C, 5-Why RCA, ICA/PCA, and Horizontal Deployment.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
            <span>Open Register Table</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Submodule 2 Card */}
        <div 
          onClick={() => onNavigateSubmodule('nearmiss')}
          className="bg-white border border-slate-200 hover:border-orange-400 hover:shadow-md rounded-2xl p-5 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-orange-800 bg-orange-50 px-2.5 py-0.5 rounded-full font-mono">
                Submodule 02
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">{totalNearMisses} Logged</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-orange-700 transition-colors">
              ⚠️ Near Miss Register
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Anyone can report incident details → Safety Coordinator completes Cause Investigation*, Recommended Actions, and Horizontal Deployment.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-orange-700">
            <span>Open Incident Register</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Submodule 3 Card */}
        <div 
          onClick={() => onNavigateSubmodule('accidents')}
          className="bg-white border border-slate-200 hover:border-rose-400 hover:shadow-md rounded-2xl p-5 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full font-mono">
                Submodule 03
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">{totalAccidents} Records</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-rose-700 transition-colors">
              🚑 Accident Reports
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Raised by Doctor / Medical Officer with injury and OHC clinical notes → Coordinator conducts 5-Why RCA in "Describe Causes" with 2-Page Print Form.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-700">
            <span>Open Accident Reports</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Heinrich Pyramid & Category Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heinrich Pyramid */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Heinrich Safety Triangle
              </h3>
              <p className="text-[11px] text-slate-500">Proactive pyramid: 300 Observations : 29 Near Misses : 1 Major Incident</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">Live Data</span>
          </div>

          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            {/* Top Tier: Major Accidents */}
            <div className="w-44 bg-rose-700 text-white text-center py-2 rounded-t-xl shadow-xs">
              <div className="text-xs uppercase font-bold tracking-wider">Accidents</div>
              <div className="text-lg font-black font-mono">{totalAccidents} <span className="text-[10px] font-normal">({lostTimeAccidents} LTI / {firstAidAccidents} First-Aid)</span></div>
            </div>

            {/* Middle Tier: Near Misses */}
            <div className="w-72 bg-amber-500 text-white text-center py-2.5 shadow-xs">
              <div className="text-xs uppercase font-bold tracking-wider">Near Miss Reports</div>
              <div className="text-lg font-black font-mono">{totalNearMisses} <span className="text-[10px] font-normal">Investigated</span></div>
            </div>

            {/* Base Tier: Proactive Observations */}
            <div className="w-96 bg-emerald-700 text-white text-center py-3 rounded-b-xl shadow-xs">
              <div className="text-xs uppercase font-bold tracking-wider">Proactive Safety Observations</div>
              <div className="text-xl font-black font-mono">{totalObservations} <span className="text-[10px] font-normal">Logged on Shopfloor</span></div>
            </div>
          </div>
        </div>

        {/* Category Breakdown & Unsafe Act vs Condition */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Observation Risk Classifications
            </h3>
            <p className="text-[11px] text-slate-500">Breakdown of hazards assigned by Safety Coordinator</p>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-rose-700">Category A (High Risk / Stop Work)</span>
                <span className="font-mono">{catACount} items</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-rose-600 h-full rounded-full" 
                  style={{ width: `${totalObservations > 0 ? (catACount / totalObservations) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-700">Category B (Medium Risk / Unsafe Condition)</span>
                <span className="font-mono">{catBCount} items</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full" 
                  style={{ width: `${totalObservations > 0 ? (catBCount / totalObservations) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-700">Category C (Low Risk / Awareness)</span>
                <span className="font-mono">{catCCount} items</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full" 
                  style={{ width: `${totalObservations > 0 ? (catCCount / totalObservations) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-500">Pending Coordinator Assignment</span>
                <span className="font-mono">{catPendingCount} items</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-slate-400 h-full rounded-full" 
                  style={{ width: `${totalObservations > 0 ? (catPendingCount / totalObservations) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Unsafe Conditions</div>
              <div className="text-xl font-bold font-mono text-amber-700 mt-0.5">{unsafeConditionCount}</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Unsafe Acts</div>
              <div className="text-xl font-bold font-mono text-rose-700 mt-0.5">{unsafeActCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Incident Progression Timeline Stepper Feature Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                End-to-End Progression
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-400 font-mono">5-Stage SOP Lifecycle</span>
            </div>
            <h3 className="text-base font-bold text-white tracking-wide mt-1">
              Visual Incident Timeline &amp; Vertical Stepper
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Track the chronological journey of safety anomalies from Stage 1 (Initial Hazard Logging &amp; Before Photo), Stage 2 (Shift 2-Hr Containment), Stage 3 (5-Why RCA), Stage 4 (Permanent CAPA), to Stage 5 (3-Shift Effectiveness &amp; Horizontal Sign-off).
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateSubmodule('timeline')}
          className="flex items-center space-x-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition shadow-sm shrink-0 cursor-pointer"
        >
          <span>Open Incident Stepper</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
