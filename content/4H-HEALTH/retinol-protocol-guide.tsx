import React, { useState } from 'react';
import { 
  AlertTriangle,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Droplet,
  FileWarning,
  ListChecks,
  ShieldAlert,
  Sun,
  Timer,
  X
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Protocol = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const Section = ({ title, icon: Icon, id, children }) => (
    <div className="mb-4">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-slate-700" />
          <h3 className="font-semibold text-slate-800">{title}</h3>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${expandedSections[id] ? 'rotate-180' : ''}`} />
      </button>
      {expandedSections[id] && (
        <div className="mt-2 p-4 bg-white rounded-lg border border-slate-200">
          {children}
        </div>
      )}
    </div>
  );

  const WarningBadge = ({ text }) => (
    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
      <AlertTriangle className="mr-1 h-3 w-3" />
      {text}
    </span>
  );

  const ChecklistItem = ({ text, warning }) => (
    <div className="flex items-start gap-2 mb-2">
      <div className="mt-1">
        <Check className="h-4 w-4 text-green-500" />
      </div>
      <div>
        <p className="text-sm text-slate-700">{text}</p>
        {warning && (
          <p className="text-xs text-yellow-600 mt-1">
            <AlertTriangle className="h-3 w-3 inline mr-1" />
            {warning}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Paula's Choice 1% Retinol Protocol</h1>
        <p className="text-sm text-slate-600">Comprehensive guide for safe and effective use</p>
      </div>

      <Alert className="mb-6">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>High Concentration Warning</AlertTitle>
        <AlertDescription>
          This is a 1% retinol formulation - the highest concentration available without prescription. Start with extreme caution and consider dilution for initial use.
        </AlertDescription>
      </Alert>

      <Section title="Pre-Application Checklist" icon={ListChecks} id="preCheck">
        <div className="space-y-3">
          <ChecklistItem 
            text="Ensure face is completely clean and dry" 
            warning="Wait 5-10 minutes after cleansing"
          />
          <ChecklistItem 
            text="Check for any active irritation or broken skin"
          />
          <ChecklistItem 
            text="Have moisturizer ready for buffering if needed"
          />
          <ChecklistItem 
            text="Ensure product is properly stored and not expired"
          />
        </div>
      </Section>

      <Section title="Application Protocol" icon={Droplet} id="application">
        <ol className="space-y-4">
          <li className="flex items-start gap-2">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">1</span>
            <div>
              <p className="font-medium">Quantity</p>
              <p className="text-sm text-slate-600">Use half a pea-sized amount initially (dilute with moisturizer 1:1)</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">2</span>
            <div>
              <p className="font-medium">Distribution</p>
              <p className="text-sm text-slate-600">Dot product on forehead, cheeks, and chin. Avoid eye area, nostrils, and lips</p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">3</span>
            <div>
              <p className="font-medium">Technique</p>
              <p className="text-sm text-slate-600">Gentle upward and outward motions until fully absorbed</p>
            </div>
          </li>
        </ol>
      </Section>

      <Section title="Usage Schedule" icon={Calendar} id="schedule">
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Weeks 1-2:</h4>
            <p className="text-sm">Once every 3 days</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Weeks 3-4:</h4>
            <p className="text-sm">Every other day</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Week 5+:</h4>
            <p className="text-sm">Daily use if tolerated</p>
          </div>
        </div>
      </Section>

      <Section title="Warning Signs" icon={FileWarning} id="warnings">
        <div className="grid gap-3">
          <div className="flex items-start gap-2">
            <X className="h-5 w-5 text-red-500 mt-1" />
            <div>
              <p className="font-medium text-red-600">Stop Use If:</p>
              <ul className="text-sm text-slate-600 list-disc ml-4 mt-1">
                <li>Persistent redness beyond 24 hours</li>
                <li>Burning sensation (beyond mild)</li>
                <li>Excessive peeling or irritation</li>
                <li>Development of rash or hives</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Timing Considerations" icon={Clock} id="timing">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-slate-700" />
            <p className="text-sm">Apply in evening only</p>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-slate-700" />
            <p className="text-sm">Must use sunscreen during day (SPF 30+)</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-slate-700" />
            <p className="text-sm">Wait 15-30 minutes before applying moisturizer</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Protocol;
