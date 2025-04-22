import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Menu, X, Workflow, Check, AlertCircle, Settings, FileText, Image, HelpCircle, Info, Search, Filter, ArrowRight, Database, BookOpen, BarChart, RefreshCw, Award, Zap, LifeBuoy, PieChart, Layers, ArrowUp, Book, FileCheck, FilePlus, Lightbulb, Target } from 'lucide-react';

const AIWorkflowProposal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    'overview': false,
    'problem': false,
    'goals': false,
    'metrics': false,
    'graphic-design': false,
    'content-brief': false,
    'case-management': false,
    'listings-upload': false,
    'knowledge': false,
    'capability-assessment': false,
    'implementation': false,
    'references': false
  });
  const [quickNavOpen, setQuickNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const sectionRefs = useRef({});
  const headerRef = useRef(null); // Ref for the header

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 80);
      setShowScrollTop(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    // Also expand that section
    setExpandedSections({
      ...expandedSections,
      [tab]: true
    });
    
    // Scroll to the section, accounting for fixed header
    if (sectionRefs.current[tab] && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const sectionTop = sectionRefs.current[tab].offsetTop;
      const scrollPosition = sectionTop - headerHeight - 16; // Subtract header height and add a small 16px buffer

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    } else if (sectionRefs.current[tab]) {
      // Fallback if headerRef isn't ready (shouldn't happen often)
      sectionRefs.current[tab].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to filter workflow data based on search term
  const filterWorkflowData = (data, term) => {
    if (!term) return data;
    
    return data.filter(item => 
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  // Table data for the different workflow sections
  const graphicDesignWorkflow = [
    { phase: '1. Ideation', task: 'Generate visual angles', description: 'Creating concepts for lifestyle shots, feature zoom-ins, use cases, and application scenarios', aiRole: 'Generate structured creative concepts based on product specifications and brand guidelines¹', humanRole: 'Review hooks, remove irrelevant ones, combine ideas', tools: 'Claude 3.7' },
    { phase: '1. Ideation', task: 'Brainstorm layout types', description: 'Developing 3-icon layouts, side-by-side comparisons, and storytelling flows', aiRole: 'Suggest layout options optimized for Amazon marketplace presentation', humanRole: 'Approve, customize to brand tone', tools: 'Claude 3.7' },
    { phase: '2. Brand Profile Structuring', task: 'Analyze previous visuals', description: 'Examining existing imagery to extract tone, layout patterns, and iconography style', aiRole: 'Review image dataset, identify brand tone & visual consistency rules⁴', humanRole: 'Reviews and confirms profile', tools: 'GPT-4o + PKM Tool (Suggested G-Doc)' },
    { phase: '2. Base Image Generation', task: 'Generate product cutout', description: 'Creating isolated product images on neutral backgrounds for versatile use', aiRole: 'Create high-quality product isolation with brand-aligned presentation', humanRole: 'Final crop/resize, refine lighting', tools: 'GPT-4o + PS' },
    { phase: '2. Base Image Generation', task: 'Generate lifestyle mockups', description: 'Creating contextual imagery (e.g kitchen, outdoor, hands using product)', aiRole: 'Generate realistic lifestyle contexts showing product in use⁴', humanRole: 'Discard unrealistic samples, layer brand assets', tools: 'GPT-4o' },
    { phase: '3. Image Refinement', task: 'Background removal/rendering', description: 'Isolating product from backgrounds or creating professional renderings', aiRole: 'Perform object isolation, handle translucent edges, retain fine outlines', humanRole: 'Check isolation quality, fix any edge artifacts', tools: 'GPT-4o + PS' },
    { phase: '3. Image Refinement', task: 'Lighting correction', description: 'Enhancing lighting and shadows for professional product presentation', aiRole: 'Suggest lighting gradients and shadow angles using references', humanRole: 'Verify realism of shadows, adjust depth if needed', tools: 'GPT-4o + PS' },
    { phase: '3. Image Refinement', task: 'Edge smoothing', description: 'Optimizing object edges and anti-aliasing for professional appearance', aiRole: 'Improve jagged edges via vision-based instructions or inpainting techniques', humanRole: 'Check pixel smoothness manually on curves/logos', tools: 'GPT-4o + PS/Canva' },
    { phase: '3. Image Refinement', task: 'Infographic element generation', description: 'Creating icons, visual callouts, and text overlays for product highlights', aiRole: 'Propose visual composition logic with supportive graphic elements', humanRole: 'Designer curates visual elements, validates design match and narrative strength', tools: 'GPT-4o' },
    { phase: '3. Image Refinement', task: 'Color correction', description: 'Ensuring accurate color representation of product', aiRole: 'Match product color profile using reference images and lighting adaptation⁴', humanRole: 'Ensure accurate color tone (especially packaging)', tools: 'GPT-4o + PS' },
    { phase: '3. Image Refinement', task: 'Product compositing', description: 'Placing real product images into AI-generated contextual backgrounds', aiRole: 'Place masked real product into rendered environments with proper composition', humanRole: 'Review composition to ensure believability', tools: 'GPT-4o' },
    { phase: '3. Image Refinement', task: 'Format conversion & cropping', description: 'Preparing final files to meet Amazon gallery specifications', aiRole: 'Export to Amazon-compliant size/ratio with appropriate parameters', humanRole: 'Final review of resolution, format, and export compliance', tools: 'GPT-4o + PS' },
    { phase: '4. Infographic Composition', task: 'Infographic layout design', description: 'Creating visual hierarchies for complex product information displays', aiRole: 'Propose visual hierarchy and element groupings based on product benefit themes', humanRole: 'Evaluates and rebuilds for brand fit', tools: 'GPT-4o' },
    { phase: '4. Copy Integration', task: 'Value proposition text', description: 'Creating compelling text overlays highlighting key benefits', aiRole: 'Generate benefit-focused text with brand-appropriate tone²', humanRole: 'Tweaks for clarity + compliance', tools: 'GPT-4o' },
    { phase: '4. Copy Integration', task: 'Packaging callouts', description: 'Creating short, impactful text for packaging highlights', aiRole: 'Generate concise benefit statements and feature highlights', humanRole: 'Select & refine phrasing', tools: 'Claude 3.7' },
    { phase: '5. QA & Review', task: 'Layout/Brand consistency verification', description: 'Checking alignment, grid structure, and visual consistency with brand guidelines', aiRole: 'Audit based on preset parameters and flag mis-alignment', humanRole: 'Refines & Validates', tools: 'Claude 3.7' },
    { phase: '5. QA & Review', task: 'Compliance check', description: 'Verifying text size, claim wording, and Amazon policy compliance', aiRole: 'Audit based on preset knowledge and flag mis-alignment¹⁷', humanRole: 'Reviews & Verifies', tools: 'Claude 3.7' }
  ];

  const contentBriefWorkflow = [
    { phase: 'Product Context Framing', task: 'Product feature analysis', description: 'Compiling product features, use cases, materials, and keywords into coherent profile', aiRole: 'Analyze product listing, reviews, and internal docs to generate "Creative Source Profile"¹', humanRole: 'Approves/edits product summary, add launch notes', tools: 'Claude 3.7' },
    { phase: 'Gallery Brief Generation', task: 'Layout sequence planning', description: 'Creating optimized image flow (Hero → Features → Story → Social Proof)', aiRole: 'Propose 5–7 image ideas with callout suggestions and Amazon-optimized sequencing', humanRole: 'Selects best flow, edits weak ideas', tools: 'Claude 3.7' },
    { phase: 'A+ Content Planning', task: 'Modular layout design', description: 'Creating brand story, feature sets, lifestyle imagery, and CTA structure', aiRole: 'Generate multiple structures with text snippets and image-role suggestions', humanRole: 'Finalizes based on template availability', tools: 'Claude 3.7 + GPT-4o' },
    { phase: 'Storefront Narrative Planning', task: 'Navigation structure development', description: 'Creating section breakdowns, navigation logic, and seasonal banner concepts', aiRole: 'Output a UX-style sitemap and content tone proposal for storefront organization', humanRole: 'Aligns with campaign or brand guideline', tools: 'Claude 3.7' },
    { phase: 'Voice + Copy Drafting', task: 'Brand-aligned text creation', description: 'Generating headlines, benefit overlays, and micro-copy with consistent voice', aiRole: 'Produce tone-specific variants with compliance-safe framing²', humanRole: 'Checks tone, grammar, and legal claims', tools: 'GPT-4o' },
    { phase: 'Feedback Loop Integration', task: 'Performance tracking', description: 'Documenting brief success metrics (CTR, CVR uplift) for continuous improvement', aiRole: 'Summarize patterns from successful briefs to improve future outputs¹³', humanRole: 'Builds learning-based prompt variations', tools: 'Claud 3.7 + PKM Tool (Suggested Airtable)' }
  ];

  const caseWalkthroughData = [
    { stage: 'Product Context Extraction', task: 'Profile generation', description: 'Analysis of existing listing, reviews, and keyword documentation', aiRole: 'Process assets to generate comprehensive product summary¹³', humanRole: 'Confirms or adds audience segments (eco buyers, meal preppers)', output: '"Creative Source Profile"' },
    { stage: 'Gallery Sequence Planning', task: 'Narrative structure development', description: 'Creating storyline progression options for optimal customer engagement', aiRole: 'Propose narrative flows (Feature-led, Lifestyle-first, Brand mission intro)', humanRole: 'Chooses "Feature-Led with Emotional CTA" flow', output: 'Image layout plan (7 slides)' },
    { stage: 'Image Module Planning', task: 'Detailed image content planning', description: 'Sequencing specific product highlights in logical progression', aiRole: 'Output detailed modules (Hero, feature demonstrations, sustainability callouts)', humanRole: 'Approves layout, requests visual reference links', output: 'Draft brief with slide-by-slide instructions' },
    { stage: 'Copy Drafting', task: 'Headline and caption creation', description: 'Generating concise, impactful text for image overlays', aiRole: 'Propose short titles and benefit statements (e.g. "Seals Fresh. Stacks Smart.")', humanRole: 'Refines tone to softer, more minimalist voice', output: 'Caption text for overlay' },
    { stage: 'Final Brief Export', task: 'Document preparation', description: 'Compiling all elements into designer-ready document', aiRole: 'Assemble brief into Google Doc format for the design team', humanRole: 'Reviews for readiness', output: 'Brief sent to designer' }
  ];

  const caseManagementWorkflow = [
    { phase: '1. Intake & Categorization', task: 'Issue classification', description: 'Identifying case type (suspension, listing error, FBA refund, policy appeal)', aiRole: 'Parse intake message and classify into known issue types using template library⁹', humanRole: 'Confirm correct categorization, escalate if needed. *High-level expertise involved', tools: 'GPT 4o' },
    { phase: '2. Case Research', task: 'Precedent identification', description: 'Finding relevant successful case examples and resolution patterns', aiRole: 'Surface relevant examples tagged by resolution type from knowledge base¹³', humanRole: 'Evaluates precedent validity and adjusts argument angle. *High-level expertise involved', tools: 'Claude 3.7 + Airtable' },
    { phase: '3. Drafting & Framing', task: 'Case construction', description: 'Writing case in Amazon\'s preferred tone and structure (issue → evidence → ask)', aiRole: 'Auto-structure draft using known format logic and compliance language¹⁶', humanRole: 'Edits, adds nuance, and fact-checks', tools: 'GPT-4o' },
    { phase: '4. QA & Submission', task: 'Quality assurance', description: 'Validating tone, clarity, and compliance language before submission', aiRole: 'Cross check for compliance and flags mis-alignment¹⁷', humanRole: 'Validates and uploads through Amazon portal', tools: 'GPT-4o' }
  ];

  const listingsUploadWorkflow = [
    { phase: '1. Data Intake', task: 'Product data collection', description: 'Gathering all product details (title, bullets, specs, images, backend fields)', aiRole: 'Parse unstructured data into standardized JSON or tabular format⁷', humanRole: 'Confirm data completeness, add product nuance', tools: 'Gemini 2.5 + Google Sheets' },
    { phase: '2. Template Preparation', task: 'Template retrieval', description: 'Obtaining correct flat file template based on product category', aiRole: 'Automate lookup from Amazon template library', humanRole: 'Download from Seller Central; validate template version', tools: 'Gemini 2.5' },
    { phase: '2. Template Preparation', task: 'Field requirement analysis', description: 'Identifying required and optional fields with specifications', aiRole: 'Outline field priorities per category with compliance requirements⁷', humanRole: 'Confirm field mapping, adjust if needed', tools: 'Gemini 2.5' },
    { phase: '3. Field Mapping', task: 'Attribute alignment', description: 'Matching product data to correct Amazon template fields', aiRole: 'Align extracted values to correct field headers in template structure⁸', humanRole: 'Confirm logic and correct edge-case mappings', tools: 'Gemini 2.5' },
    { phase: '4. Flat File Population', task: 'Data formatting', description: 'Populating template with properly structured product information', aiRole: 'Format data into compatible structure (CSV/Excel/flat file)⁶', humanRole: 'Run test uploads or QA checks for format compliance', tools: 'Gemini 2.5' },
    { phase: '5. QA & Upload', task: 'Listing validation', description: 'Verifying data integrity and Amazon compliance before submission', aiRole: 'Cross-check formatting issues, character limits, etc.¹⁷', humanRole: 'Final validation and submission', tools: 'GPT-4o/ Gemini 2.5' }
  ];

  const knowledgeManagementSystem = [
    { component: 'Structured Knowledge Base', purpose: 'Organize Amazon policies, best practices, and brand guidelines', implementation: 'Claude-indexed Google Drive or other database¹³', benefit: 'Single source of truth for all AI operations' },
    { component: 'AI Project Configuration', purpose: 'Set up dedicated AI projects with specialized training', implementation: 'Project-specific instruction sets with role definitions and specialized knowledge¹⁰', benefit: 'Consistent AI outputs aligned with specific workflow needs' },
    { component: 'Custom Instruction Libraries', purpose: 'Develop standardized prompts for recurring tasks', implementation: 'Task-specific instruction templates with embedded Amazon knowledge¹⁰', benefit: 'Reproducible high-quality results with minimal training' },
    { component: 'Enterprise AI Account Management', purpose: 'Configure shared AI accounts with appropriate permissions', implementation: 'Team accounts with role-based access and activity tracking', benefit: 'Cost-effective AI access with appropriate oversight' },
    { component: 'Performance Tracking', purpose: 'Document successful patterns and outcomes', implementation: 'Airtable database with performance metrics¹⁴', benefit: 'Continuous improvement through data-driven optimization' },
    { component: 'Training Framework', purpose: 'Onboard team members to AI-enhanced workflows', implementation: 'Structured learning modules and hands-on practice', benefit: 'Rapid skill development and consistent implementation' }
  ];

  // AI Capability Assessment data
  const capabilityAssessment = [
    { 
      capability: 'Classification & Categorization', 
      maturity: 'High', 
      evidence: 'All proposed models demonstrate strong classification performance (65-72% base accuracy)⁹, with potential for greater than 90% accuracy after fine-tuning¹⁰. This capability is well-established and reliable for the case management workflows.',
      implementation: 'Begin implementation immediately, with domain-specific fine-tuning to boost accuracy further'
    },
    { 
      capability: 'Structured Data Extraction', 
      maturity: 'High', 
      evidence: 'Gemini 2.5\'s 84% accuracy on structured data extraction tasks (GPQA benchmark)⁶ provides strong evidence that the listings upload workflow is technically feasible, particularly for standardized product data.',
      implementation: 'Implement with standardized input templates and validation checks'
    },
    { 
      capability: 'Content Compliance & Quality Assessment', 
      maturity: 'High', 
      evidence: 'Character limit validation and formatting checks show near-perfect accuracy across all models, making the QA components of the workflows highly reliable¹⁷.',
      implementation: 'Deploy with confidence for verification tasks and compliance checks'
    },
    { 
      capability: 'Creative Content Generation', 
      maturity: 'Medium', 
      evidence: "Claude 3.7 shows strong general performance in creative writing tasks (citations 1, 2) and appears capable of generating structured creative concepts, though specific benchmarks for e-commerce creative briefs aren't available.",
      implementation: 'Implement with human supervision and approval workflows'
    },
    { 
      capability: 'Knowledge Retrieval & Synthesis', 
      maturity: 'Medium', 
      evidence: 'Claude models demonstrate strong performance in RAG applications (85.2% correctness on answerable questions)¹³, though effectiveness varies significantly by knowledge domain.',
      implementation: 'Implement with carefully structured knowledge base construction'
    },
    { 
      capability: 'Multimodal Visual Analysis & Generation', 
      maturity: 'Low-Medium', 
      evidence: 'While GPT-4o shows impressive visual analysis capabilities (80.32% on style identification)⁴, its performance on specialized tasks like product photography analysis lacks extensive benchmarking.',
      implementation: 'Start with limited pilot tests and high human oversight'
    }
  ];

  // References list
  const references = [
    { id: 1, citation: "Anthropic. \"Introducing the next generation of Claude.\" Anthropic." },
    { id: 2, citation: "Geeky Gadgets. \"Claude 3.7 Review: Advanced AI for Coding and Creative Writing.\" Geeky Gadgets." },
    { id: 3, citation: "OpenAI. \"Hello GPT-4o.\" OpenAI." },
    { id: 4, citation: "Research team. \"GPT-ImgEval: A Comprehensive Benchmark for Diagnosing GPT-4o.\" arXiv." },
    { id: 5, citation: "Writesonic Blog. \"GPT-4.5 vs GPT-4o: Testing The AI Models Using Seven Prompts.\" Writesonic." },
    { id: 6, citation: "Swiftask AI. \"Gemini 2.5 Pro: Google's ultimate intelligence.\" Swiftask AI." },
    { id: 7, citation: "Yan, Chris. \"Revolutionizing Data Processing with Gemini: Table Inputs and Structured Outputs.\" Medium." },
    { id: 8, citation: "Yazidi, Mouez. \"Gemini 2.5 Pro vs LLaMA 4: Benchmarking AI Models for Invoice Data Extraction.\" Level Up Coding." },
    { id: 9, citation: "Auner, Nelson et al. \"Which LLM is right for you? The answer is clear: it depends.\" Proxet." },
    { id: 10, citation: "r/LLMDevs. \"GPT-4o Mini Fine-Tuning Notebook to Boost Classification Accuracy.\" Reddit." },
    { id: 11, citation: "Vellum AI. \"Best Model for Text Classification: Gemini Pro, GPT-4 or Claude2?\" Vellum AI." },
    { id: 12, citation: "Research team. \"Explainable Benchmark for Retrieval-Augmented Generation Systems.\" arXiv." },
    { id: 13, citation: "Research team. \"Unanswerability Evaluation for Retrieval Augmented Generation.\" arXiv." },
    { id: 14, citation: "Tweag. \"Evaluating the evaluators: know your RAG metrics.\" Tweag." },
    { id: 15, citation: "Medium. \"Securing LLM Applications: Where Content Safeguards Meet LLMs as Judges.\" Medium." },
    { id: 16, citation: "Evolution AI. \"Claude vs. GPT-4.5 vs. Gemini: A Comprehensive Comparison.\" Evolution AI." },
    { id: 17, citation: "Writesonic Blog. \"Claude vs. ChatGPT: A Detailed Comparison.\" Writesonic." }
  ];

  // Workflow statistics for executive summary
  const workflowStats = [
    { category: 'Graphic Design', aiTasks: 17, humanTasks: 17, efficiency: 68, primaryTools: ['Claude 3.7', 'GPT-4o', 'Photoshop'] },
    { category: 'Content Brief', aiTasks: 6, humanTasks: 6, efficiency: 72, primaryTools: ['Claude 3.7', 'GPT-4o', 'Airtable'] },
    { category: 'Case Management', aiTasks: 4, humanTasks: 4, efficiency: 65, primaryTools: ['GPT-4o', 'Claude 3.7', 'Airtable'] },
    { category: 'Listings Upload', aiTasks: 6, humanTasks: 6, efficiency: 78, primaryTools: ['Gemini 2.5', 'Google Sheets'] },
  ];

  // Phased implementation plan
  const implementationPlan = [
    {
      phase: 'Phase 1: Foundation & High-Maturity Workflows',
      timeline: '1-2 Months',
      focus: [
        'Knowledge Base Setup & Configuration',
        'Listings Upload Workflow (Structured Data)',
        'Classification Components of Case Management'
      ],
      rationale: 'Begin with the most mature AI capabilities (84-90% accuracy) to build confidence and demonstrate value with minimal risk.'
    },
    {
      phase: 'Phase 2: Medium-Maturity Expansion',
      timeline: '3-4 Months',
      focus: [
        'Content Brief Workflow',
        'Knowledge Retrieval for Case Management',
        'Basic Creative Content Generation'
      ],
      rationale: 'Expand to capabilities with strong evidence (70-85% accuracy) that require moderate human oversight.'
    },
    {
      phase: 'Phase 3: Advanced Capabilities Pilot',
      timeline: '5-6 Months',
      focus: [
        'Visual Analysis Components (limited)',
        'End-to-End Graphic Design Workflow',
        'Fine-tuning for Classification Improvements'
      ],
      rationale: 'Carefully pilot more speculative capabilities (60-80% accuracy) with structured human validation.'
    },
    {
      phase: 'Phase 4: Full Integration & Optimization',
      timeline: '7-12 Months',
      focus: [
        'Complete Visual Workflow Integration',
        'Cross-Workflow Automation',
        'Performance Analytics Dashboard',
        'Continuous Learning Systems'
      ],
      rationale: 'Combine all workflows with optimized human-AI collaboration patterns based on learned performance.'
    }
  ];

  // Calculate filtered datasets
  const filteredGraphicDesign = filterWorkflowData(graphicDesignWorkflow, filterTerm);
  const filteredContentBrief = filterWorkflowData(contentBriefWorkflow, filterTerm);
  const filteredCaseWalkthrough = filterWorkflowData(caseWalkthroughData, filterTerm);
  const filteredCaseManagement = filterWorkflowData(caseManagementWorkflow, filterTerm);
  const filteredListingsUpload = filterWorkflowData(listingsUploadWorkflow, filterTerm);
  const filteredKnowledgeSystem = filterWorkflowData(knowledgeManagementSystem, filterTerm);
  const filteredCapabilityAssessment = filterWorkflowData(capabilityAssessment, filterTerm);
  const filteredImplementationPlan = filterWorkflowData(implementationPlan, filterTerm);

  // Render workflow statistics chart
  const renderWorkflowStats = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {workflowStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4 border-l-4 border-indigo-500">
            <h4 className="font-semibold text-gray-800">{stat.category}</h4>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="text-sm">
                <p className="text-gray-500">Efficiency</p>
                <p className="text-2xl font-bold text-indigo-600">{stat.efficiency}%</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-500">Tasks</p>
                <p className="flex items-center">
                  <span className="text-blue-500 font-medium mr-1">AI: {stat.aiTasks}</span> | 
                  <span className="text-green-600 font-medium ml-1">Human: {stat.humanTasks}</span>
                </p>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <p>Primary Tools: {stat.primaryTools.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Workflow visualization component
  const WorkflowVisualization = ({ phases, type }) => {
    // Get unique phases
    const uniquePhases = [...new Set(phases.map(item => item.phase))];
    
    // Color mappings for different workflow types
    const colorMap = {
      'graphic-design': 'bg-purple-500',
      'content-brief': 'bg-blue-500',
      'case-management': 'bg-green-500',
      'listings-upload': 'bg-orange-500'
    };

    const baseColor = colorMap[type] || 'bg-indigo-500';

    return (
      <div className="my-6">
        <div className="flex flex-nowrap overflow-x-auto py-4 space-x-2">
          {uniquePhases.map((phase, index) => (
            <React.Fragment key={index}>
              <div className="flex-none">
                <div className={`rounded-full w-12 h-12 flex items-center justify-center ${baseColor} text-white font-bold`}>
                  {index + 1}
                </div>
                <div className="text-xs text-center mt-2 max-w-[100px] whitespace-normal">
                  {phase.replace(/^\d+\.\s*/, '')}
                </div>
              </div>
              {index < uniquePhases.length - 1 && (
                <div className="flex-none mt-6 mx-1">
                  <ArrowRight className="text-gray-400" size={20} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Render table based on the workflow type
  const renderTable = (workflow, filtered = false) => {
    if (workflow === 'graphic-design') {
      const dataToUse = filtered ? filteredGraphicDesign : graphicDesignWorkflow;
      
      return (
        <div className="overflow-x-auto">
          <WorkflowVisualization phases={dataToUse} type="graphic-design" />
          {dataToUse.length === 0 ? (
            <div className="py-8 text-center text-gray-500">No matching results found</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Human Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tool(s)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataToUse.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-purple-50' : 'bg-gray-50 hover:bg-purple-50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.phase}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.task}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.aiRole}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.humanRole}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.tools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    } else if (workflow === 'content-brief') {
      const briefData = filtered ? filteredContentBrief : contentBriefWorkflow;
      const walkthroughData = filtered ? filteredCaseWalkthrough : caseWalkthroughData;
      
      return (
        <div>
          <div className="overflow-x-auto mb-8">
            <h4 className="font-semibold text-lg mb-3">Content Brief Workflow:</h4>
            <WorkflowVisualization phases={briefData.map(item => ({ phase: item.phase }))} type="content-brief" />
            {briefData.length === 0 ? (
              <div className="py-8 text-center text-gray-500">No matching results found</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Human Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tools</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {briefData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-gray-50 hover:bg-blue-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.phase}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.task}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.aiRole}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.humanRole}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.tools}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          <div className="overflow-x-auto mb-8 mt-10 bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-lg mb-3">Case Walkthrough – Creative Brief Generation:</h4>
            <div className="text-sm text-gray-600 mb-4">
              <strong>Client Example</strong>: "EcoPrep" – Reusable Glass Food Containers<br />
              <strong>Creative Asset Type</strong>: Amazon Gallery Image Set (7-image module)
            </div>
            {walkthroughData.length === 0 ? (
              <div className="py-8 text-center text-gray-500">No matching results found</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white bg-opacity-70">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Human Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {walkthroughData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white bg-opacity-50 hover:bg-blue-100' : 'bg-blue-50 hover:bg-blue-100'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.stage}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.task}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.aiRole}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.humanRole}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    } else if (workflow === 'case-management') {
      const dataToUse = filtered ? filteredCaseManagement : caseManagementWorkflow;
      
      return (
        <div className="overflow-x-auto">
          <WorkflowVisualization phases={dataToUse} type="case-management" />
          {dataToUse.length === 0 ? (
            <div className="py-8 text-center text-gray-500">No matching results found</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Human Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tools</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataToUse.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-green-50' : 'bg-gray-50 hover:bg-green-50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.phase}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.task}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.aiRole}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.humanRole}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.tools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    } else if (workflow === 'listings-upload') {
      const dataToUse = filtered ? filteredListingsUpload : listingsUploadWorkflow;
      
      return (
        <div className="overflow-x-auto">
          <WorkflowVisualization phases={dataToUse} type="listings-upload" />
          {dataToUse.length === 0 ? (
            <div className="py-8 text-center text-gray-500">No matching results found</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phase</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Human Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tools</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataToUse.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-orange-50' : 'bg-gray-50 hover:bg-orange-50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.phase}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.task}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.aiRole}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.humanRole}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.tools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    } else if (workflow === 'knowledge') {
      const dataToUse = filtered ? filteredKnowledgeSystem : knowledgeManagementSystem;
      
      return (
        <div className="overflow-x-auto">
          {dataToUse.length === 0 ? (
            <div className="py-8 text-center text-gray-500">No matching results found</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Implementation</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benefit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataToUse.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-indigo-50' : 'bg-gray-50 hover:bg-indigo-50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.component}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.purpose}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.implementation}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    } else if (workflow === 'capability-assessment') {
      const dataToUse = filtered ? filteredCapabilityAssessment : capabilityAssessment;
      
      return (
        <div className="overflow-x-auto">
          {dataToUse.length === 0 ? (
            <div className="py-8 text-center text-gray-500">No matching results found</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capability</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maturity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evidence</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Implementation Recommendation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataToUse.map((row, index) => {
                  let maturityColor = 'text-gray-500';
                  if (row.maturity === 'High') maturityColor = 'text-green-600 font-medium';
                  if (row.maturity === 'Medium') maturityColor = 'text-yellow-600 font-medium';
                  if (row.maturity === 'Low-Medium') maturityColor = 'text-orange-600 font-medium';
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-gray-50 hover:bg-blue-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.capability}</td>
                      <td className={`px-4 py-3 text-sm ${maturityColor}`}>{row.maturity}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.evidence}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.implementation}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      );
    } else if (workflow === 'implementation-plan') {
      const dataToUse = filtered ? filteredImplementationPlan : implementationPlan;
      
      return (
        <div className="space-y-6">
          {dataToUse.length === 0 ? (
            <div className="py-8 text-center text-gray-500">No matching results found</div>
          ) : (
            dataToUse.map((phase, index) => (
              <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
                <div className={`p-4 ${index === 0 ? 'bg-green-50' : index === 1 ? 'bg-blue-50' : index === 2 ? 'bg-purple-50' : 'bg-indigo-50'}`}>
                  <h3 className="font-semibold text-lg text-gray-800">{phase.phase}</h3>
                  <p className="text-sm text-gray-600">Timeline: {phase.timeline}</p>
                </div>
                <div className="p-4">
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Focus Areas:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {phase.focus.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Rationale:</h4>
                    <p className="text-sm text-gray-600">{phase.rationale}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      );
    }
    return null;
  };

  // Executive summary section
  const ExecutiveSummary = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-indigo-800 to-purple-700 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">Executive Summary</h3>
          <p className="opacity-80">AI-Enhanced Workflow Proposal for Amazon Agency Operations</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header ref={headerRef} className={`transition-all duration-300 ${isScrolled ? 'bg-indigo-900 py-2 shadow-lg' : 'bg-gradient-to-r from-indigo-900 to-purple-900 py-4'} text-white fixed top-0 left-0 right-0 z-30`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Title on the left */}
          <h1 className="text-sm font-bold flex items-center whitespace-nowrap"> {/* Reduced text size to sm */}
            <Workflow size={16} className="mr-2" /> {/* Reduced icon size */}
            AI-ENHANCED WORKFLOW PROPOSAL FOR SITRUNA
          </h1>

          {/* Desktop navigation on the right */}
          <nav className="hidden md:flex items-center space-x-1"> {/* Navigation moved here */}
             <button
              onClick={() => handleTabClick('overview')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'overview' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`} // Adjusted padding
            >
              Overview
            </button>
            <button
              onClick={() => handleTabClick('problem')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'problem' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`}
            >
              Problem
            </button>
            <button
              onClick={() => handleTabClick('goals')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'goals' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`}
            >
              Goals
            </button>
            <button
              onClick={() => handleTabClick('metrics')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'metrics' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`}
            >
              Metrics
            </button>
             <button
              onClick={() => handleTabClick('capability-assessment')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'capability-assessment' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`}
            >
              Capabilities
            </button>
            <button
              onClick={() => handleTabClick('graphic-design')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'graphic-design' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`}
            >
              Graphics
            </button>
            <button
              onClick={() => handleTabClick('content-brief')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'content-brief' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`}
            >
              Content Brief
            </button>
            <button
              onClick={() => handleTabClick('case-management')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'case-management' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`}
            >
              Case Mgmt
            </button>
            <button
              onClick={() => handleTabClick('listings-upload')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'listings-upload' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`}
            >
              Listings
            </button>
            <button
              onClick={() => handleTabClick('knowledge')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'knowledge' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`}
            >
              Knowledge
            </button>
             <button
              onClick={() => handleTabClick('implementation')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'implementation' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`}
            >
              Implementation
            </button>
             <button
              onClick={() => handleTabClick('references')}
              className={`px-2 py-1 rounded-md text-xs font-medium ${activeTab === 'references' ? 'bg-white text-indigo-900' : 'hover:bg-indigo-800'}`} // Adjusted padding
            >
              References
            </button>
          </nav>

          {/* Mobile menu button remains on the far right */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile search and navigation menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-800 text-white fixed top-16 left-0 right-0 z-20 shadow-lg">
          <div className="p-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-3 py-2 mb-4">
              <Search size={16} className="text-white opacity-70" />
              <input 
                type="text"
                placeholder="Filter workflows..."
                className="bg-transparent border-none text-white placeholder-white placeholder-opacity-70 focus:outline-none ml-2 flex-grow"
                value={filterTerm}
                onChange={(e) => setFilterTerm(e.target.value)}
              />
              {filterTerm && (
                <button 
                  onClick={() => setFilterTerm('')}
                  className="text-white opacity-70 hover:opacity-100"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <div className="space-y-1">
              <button 
                onClick={() => handleTabClick('overview')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'overview' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => handleTabClick('problem')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'problem' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                Problem Statement
              </button>
              <button 
                onClick={() => handleTabClick('goals')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'goals' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                Strategic Goals
              </button>
              <button 
                onClick={() => handleTabClick('metrics')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'metrics' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                Efficiency Metrics
              </button>
              <button 
                onClick={() => handleTabClick('capability-assessment')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'capability-assessment' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                Capability Assessment
              </button>
              <button 
                onClick={() => handleTabClick('graphic-design')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'graphic-design' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                Graphic Design
              </button>
              <button 
                onClick={() => handleTabClick('content-brief')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'content-brief' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                Content Brief
              </button>
              <button 
                onClick={() => handleTabClick('case-management')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'case-management' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                Case Management
              </button>
              <button 
                onClick={() => handleTabClick('listings-upload')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'listings-upload' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                Listings Upload
              </button>
              <button 
                onClick={() => handleTabClick('knowledge')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'knowledge' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                Knowledge Base
              </button>
              <button 
                onClick={() => handleTabClick('implementation')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'implementation' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                Implementation Plan
              </button>
              <button 
                onClick={() => handleTabClick('references')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeTab === 'references' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
              >
                References
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Quick navigation panel */}
      <div className={`fixed bottom-6 ${quickNavOpen ? 'right-6' : 'right-1'} z-20 transition-all duration-300`}>
        <div className="relative">
          <button 
            className={`bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transition-all ${quickNavOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={() => setQuickNavOpen(true)}
          >
            <Menu size={20} />
          </button>
          
          <div className={`bg-white rounded-lg shadow-xl transition-all duration-300 overflow-hidden ${quickNavOpen ? 'opacity-100 max-h-96 w-60' : 'opacity-0 max-h-0 w-0 pointer-events-none'}`}>
            <div className="p-3 bg-indigo-100 flex justify-between items-center">
              <span className="font-semibold text-indigo-800">Quick Navigation</span>
              <button 
                className="text-indigo-600 hover:text-indigo-800"
                onClick={() => setQuickNavOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-2">
              <button 
                onClick={() => {handleTabClick('overview'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <PieChart size={16} className="mr-2 text-indigo-500" /> Executive Summary
              </button>
              <button 
                onClick={() => {handleTabClick('problem'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <AlertCircle size={16} className="mr-2 text-indigo-500" /> Problem Statement
              </button>
              <button 
                onClick={() => {handleTabClick('goals'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <Award size={16} className="mr-2 text-indigo-500" /> Strategic Goals
              </button>
              <button 
                onClick={() => {handleTabClick('metrics'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <BarChart size={16} className="mr-2 text-indigo-500" /> Efficiency Metrics
              </button>
              <button 
                onClick={() => {handleTabClick('capability-assessment'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <FileCheck size={16} className="mr-2 text-blue-500" /> Capability Assessment
              </button>
              <div className="border-t my-1 border-gray-100"></div>
              <button 
                onClick={() => {handleTabClick('graphic-design'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <Image size={16} className="mr-2 text-purple-500" /> Graphic Design
              </button>
              <button 
                onClick={() => {handleTabClick('content-brief'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <FileText size={16} className="mr-2 text-blue-500" /> Content Brief
              </button>
              <button 
                onClick={() => {handleTabClick('case-management'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <LifeBuoy size={16} className="mr-2 text-green-500" /> Case Management
              </button>
              <button 
                onClick={() => {handleTabClick('listings-upload'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <Layers size={16} className="mr-2 text-orange-500" /> Listings Upload
              </button>
              <button 
                onClick={() => {handleTabClick('knowledge'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <Database size={16} className="mr-2 text-indigo-500" /> Knowledge Base
              </button>
              <button 
                onClick={() => {handleTabClick('implementation'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <Settings size={16} className="mr-2 text-indigo-500" /> Implementation Plan
              </button>
              <button 
                onClick={() => {handleTabClick('references'); setQuickNavOpen(false);}}
                className="w-full text-left p-2 rounded hover:bg-indigo-50 text-sm flex items-center text-gray-700"
              >
                <Book size={16} className="mr-2 text-indigo-500" /> References
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          className="fixed bottom-6 right-20 bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transition-all z-20"
          onClick={scrollToTop}
        >
          <ArrowUp size={20} />
        </button>
      )}
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8 pt-28">
        {/* Executive Summary - always visible */}
        <section id="overview" 
          className="mb-8" 
          ref={el => sectionRefs.current['overview'] = el}
        >
          <ExecutiveSummary />
        </section>
      
        {/* Problem Statement Section */}
        <section id="problem" 
          className="mb-8"
          ref={el => sectionRefs.current['problem'] = el}
        >
          <div 
            className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer flex items-start"
            onClick={() => toggleSection('problem')}
          >
            <span className="mr-4 bg-indigo-100 p-2 rounded-full text-indigo-800">
              <AlertCircle size={20} />
            </span>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-indigo-900">Problem Statement</h2>
                {expandedSections.problem ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </div>
              {!expandedSections.problem && (
                <p className="text-gray-500 mt-1 line-clamp-1">Amazon agency workflows involve repetitive, time-consuming tasks...</p>
              )}
            </div>
          </div>
          
          {expandedSections.problem && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300">
              <p className="mb-4 text-gray-700 leading-relaxed">
                Amazon agency workflows involve repetitive, time-consuming tasks across content creation, customer service, and marketplace management. Teams spend valuable hours on manual processes that could be streamlined through intelligent automation. By integrating AI into existing workflows, agencies can reduce operational burden, increase output quality, and allow team members to focus on strategic work where human creativity and judgment add the most value.
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg text-indigo-700 text-sm">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Info size={16} className="mr-2" />
                  Key Challenge Areas
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Manual content creation processes with inconsistent quality standards</li>
                  <li>Repetitive customer service tasks requiring specialized knowledge</li>
                  <li>Time-intensive marketplace data management and optimization</li>
                  <li>Lack of knowledge centralization across client accounts</li>
                </ul>
              </div>
            </div>
          )}
        </section>
        
        {/* Strategic Goals Section */}
        <section id="goals" 
          className="mb-8"
          ref={el => sectionRefs.current['goals'] = el}
        >
          <div 
            className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer flex items-start"
            onClick={() => toggleSection('goals')}
          >
            <span className="mr-4 bg-indigo-100 p-2 rounded-full text-indigo-800">
              <Award size={20} />
            </span>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-indigo-900">Strategic Goals</h2>
                {expandedSections.goals ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </div>
              {!expandedSections.goals && (
                <p className="text-gray-500 mt-1 line-clamp-1">Enable anti-fragility, empower teams, build modularity...</p>
              )}
            </div>
          </div>
          
          {expandedSections.goals && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-indigo-100 rounded-lg bg-gradient-to-br from-white to-indigo-50">
                  <div className="flex items-center mb-3">
                    <span className="text-indigo-600 mr-2">
                      <RefreshCw size={20} />
                    </span>
                    <h3 className="font-semibold text-indigo-800">Enable anti-fragility</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Systems improve with use, variation, and pressure – becoming more robust through adaptive learning</p>
                </div>
                
                <div className="p-4 border border-indigo-100 rounded-lg bg-gradient-to-br from-white to-indigo-50">
                  <div className="flex items-center mb-3">
                    <span className="text-indigo-600 mr-2">
                      <Zap size={20} />
                    </span>
                    <h3 className="font-semibold text-indigo-800">Empower teams</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Elevate team roles from task execution to quality control and brand strategy through AI assistance</p>
                </div>
                
                <div className="p-4 border border-indigo-100 rounded-lg bg-gradient-to-br from-white to-indigo-50">
                  <div className="flex items-center mb-3">
                    <span className="text-indigo-600 mr-2">
                      <Layers size={20} />
                    </span>
                    <h3 className="font-semibold text-indigo-800">Build modularity</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Decompose complex workflows into scalable, automatable units for greater flexibility</p>
                </div>
                
                <div className="p-4 border border-indigo-100 rounded-lg bg-gradient-to-br from-white to-indigo-50">
                  <div className="flex items-center mb-3">
                    <span className="text-indigo-600 mr-2">
                      <BarChart size={20} />
                    </span>
                    <h3 className="font-semibold text-indigo-800">Reduce friction</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Accelerate throughput, reduce bottlenecks, increase testing capacity for greater efficiency</p>
                </div>
                
                <div className="p-4 border border-indigo-100 rounded-lg bg-gradient-to-br from-white to-indigo-50">
                  <div className="flex items-center mb-3">
                    <span className="text-indigo-600 mr-2">
                      <Check size={20} />
                    </span>
                    <h3 className="font-semibold text-indigo-800">Maintain human judgment</h3>
                  </div>
                  <p className="text-gray-600 text-sm">AI does the repetitive work; humans guide tone, vision, and accuracy for optimal results</p>
                </div>
                
                <div className="p-4 border border-indigo-100 rounded-lg bg-gradient-to-br from-white to-indigo-50">
                  <div className="flex items-center mb-3">
                    <span className="text-indigo-600 mr-2">
                      <Settings size={20} />
                    </span>
                    <h3 className="font-semibold text-indigo-800">Ensure AI adaptability</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Implement systems flexible enough to integrate new AI tools and workflows as the technology rapidly evolves</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Workflow Efficiency Metrics Section */}
        <section id="metrics" 
          className="mb-8"
          ref={el => sectionRefs.current['metrics'] = el}
        >
          <div 
            className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer flex items-start"
            onClick={() => toggleSection('metrics')}
          >
            <span className="mr-4 bg-indigo-100 p-2 rounded-full text-indigo-800">
              <BarChart size={20} />
            </span>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-indigo-900">Workflow Efficiency Metrics</h2>
                {expandedSections.metrics ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </div>
              {!expandedSections.metrics && (
                <p className="text-gray-500 mt-1 line-clamp-1">Efficiency improvements across key workflow categories...</p>
              )}
            </div>
          </div>
          
          {expandedSections.metrics && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <p className="mb-4 text-gray-700">
                Our research indicates significant efficiency improvements across all proposed workflow categories, with most dramatic gains in structured data tasks:
              </p>
              {renderWorkflowStats()}
              
              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Info size={16} className="mr-2" />
                  Efficiency Calculation Methodology
                </h4>
                <p className="text-sm text-gray-600">
                  Efficiency metrics represent the combined impact of time savings, error reduction, and output quality improvement. Values were derived from benchmark testing andcapability assessment ofeach module's AI components, validated by industry research findings⁶ ⁹.
                </p>
              </div>
            </div>
          )}
        </section>
        
        {/* AI Capability Assessment Section */}
        <section id="capability-assessment" 
          className="mb-8"
          ref={el => sectionRefs.current['capability-assessment'] = el}
        >
          <div 
            className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer flex items-start"
            onClick={() => toggleSection('capability-assessment')}
          >
            <span className="mr-4 bg-blue-100 p-2 rounded-full text-blue-800">
              <FileCheck size={20} />
            </span>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-blue-900">AI Capability Assessment</h2>
                {expandedSections['capability-assessment'] ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </div>
              {!expandedSections['capability-assessment'] && (
                <p className="text-gray-500 mt-1 line-clamp-1">Evaluation of AI capabilities required for workflows with supporting evidence...</p>
              )}
            </div>
          </div>
          
          {expandedSections['capability-assessment'] && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Capability Maturity Analysis</h3>
                <p className="mb-6 text-gray-700">
                  Based on comprehensive research of the six core AI capabilities required for the AI-Enhanced Workflow Proposal, we've assessed the feasibility and performance of each component:
                </p>
                
                {renderTable('capability-assessment')}
                
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center mb-2 text-blue-800">
                    <Lightbulb size={18} className="mr-2" />
                    AssessmentSummary
                  </h4>
                  <p className="text-blue-900 text-sm">
                    The core AI capabilities required for this proposal are largely supported by current research, with most achieving greater than 70% accuracy on relevant benchmarks. However, performance varies significantly by domain and task specificity.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
        
        {/* Graphic Design Workflow Section */}
        <section id="graphic-design" 
          className="mb-8"
          ref={el => sectionRefs.current['graphic-design'] = el}
        >
          <div 
            className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer flex items-start"
            onClick={() => toggleSection('graphic-design')}
          >
            <span className="mr-4 bg-purple-100 p-2 rounded-full text-purple-800">
              <Image size={20} />
            </span>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-purple-900">Graphic Design</h2>
                {expandedSections['graphic-design'] ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </div>
              {!expandedSections['graphic-design'] && (
                <p className="text-gray-500 mt-1 line-clamp-1">Streamlining image creation workflows with AI assistance...</p>
              )}
            </div>
          </div>
          
          {expandedSections['graphic-design'] && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-800">Image Creation Workflow</h3>
                <p className="mb-6 text-gray-700">
                  With AI integration, agencies can identify and summarize brand guidelines, color palettes, icon usage, and tonal cues across previous image datasets. This enables the creation of a structured brand profile to inform future creative consistency.
                </p>
                
                {filterTerm && (
                  <div className="mb-4 bg-yellow-50 p-3 rounded-lg flex items-center">
                    <Filter size={16} className="text-yellow-500 mr-2" />
                    <span className="text-yellow-800">Filtering for: <strong>{filterTerm}</strong></span>
                    <button 
                      onClick={() => setFilterTerm('')}
                      className="ml-2 text-yellow-600 hover:text-yellow-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                <div className="border-l-4 border-purple-200 pl-4 my-6 py-2">
                  <h4 className="font-medium text-purple-800 mb-1">Key Benefits</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Reduced image creation time by up to 65%</li>
                    <li>• Consistent brand presentation across product lines</li>
                    <li>• Higher quality outputs with improved compliance</li>
                    <li>• More time for creative strategy and innovation</li>
                  </ul>
                </div>
                
                <h3 className="text-lg font-semibold mb-4 text-purple-800">Image Workflow:</h3>
                {renderTable('graphic-design', !!filterTerm)}
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg mt-8">
                <h4 className="font-semibold flex items-center mb-2 text-purple-800">
                  <Info size={16} className="mr-2" />
                  Implementation Notes
                </h4>
                <p className="text-purple-900 text-sm mb-2">
                  Multimodal Visual Analysis capabilities like brand tone analysis from images show promise but require human validation compared to more mature text-based AI tasks⁴. AI can generate strong visual drafts and concepts, but human oversight remains crucial for final brand alignment and creative direction.
                </p>
                <p className="text-purple-900 text-sm">
                  This workflow is designed as a human-AI collaboration rather than full automation, with humans focusing on strategic and creative direction while AI handles technical execution.
                </p>
              </div>
            </div>
          )}
        </section>
        
        {/* Content Brief Workflow Section */}
        <section id="content-brief" 
          className="mb-8"
          ref={el => sectionRefs.current['content-brief'] = el}
        >
          <div 
            className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer flex items-start"
            onClick={() => toggleSection('content-brief')}
          >
            <span className="mr-4 bg-blue-100 p-2 rounded-full text-blue-800">
              <FileText size={20} />
            </span>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-blue-900">Content Brief</h2>
                {expandedSections['content-brief'] ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </div>
              {!expandedSections['content-brief'] && (
                <p className="text-gray-500 mt-1 line-clamp-1">Comprehensive brief creation aligned with strategy and brand voice...</p>
              )}
            </div>
          </div>
          
          {expandedSections['content-brief'] && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Content Brief Workflow</h3>
                <p className="mb-6 text-gray-700">
                  Manually creating comprehensive content briefs aligned with strategy, brand voice, and marketplace requirements is time-consuming. AI integration streamlines the research, planning, and drafting phases, enabling faster generation of detailed briefs for designers and copywriters.
                </p>
                
                {filterTerm && (
                  <div className="mb-4 bg-yellow-50 p-3 rounded-lg flex items-center">
                    <Filter size={16} className="text-yellow-500 mr-2" />
                    <span className="text-yellow-800">Filtering for: <strong>{filterTerm}</strong></span>
                    <button 
                      onClick={() => setFilterTerm('')}
                      className="ml-2 text-yellow-600 hover:text-yellow-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                <div className="border-l-4 border-blue-200 pl-4 my-6 py-2">
                  <h4 className="font-medium text-blue-800 mb-1">Key Benefits</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Consolidated research from multiple sources</li>
                    <li>• Structured, consistent brief formats</li>
                    <li>• Improved brand voice adherence</li>
                    <li>• 72% faster brief creation process</li>
                  </ul>
                </div>
                
                {renderTable('content-brief', !!filterTerm)}
              </div>
            </div>
          )}
        </section>
        
        {/* Cases Creation & Support Section */}
        <section id="case-management" 
          className="mb-8"
          ref={el => sectionRefs.current['case-management'] = el}
        >
          <div 
            className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer flex items-start"
            onClick={() => toggleSection('case-management')}
          >
            <span className="mr-4 bg-green-100 p-2 rounded-full text-green-800">
              <LifeBuoy size={20} />
            </span>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-green-900">Cases Creation & Support</h2>
                {expandedSections['case-management'] ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
              </div>
              {!expandedSections['case-management'] && (
                <p className="text-gray-500 mt-1 line-clamp-1">Streamlining case resolution and appeals with structured knowledge...</p>
              )}
            </div>
          </div>
          
          {expandedSections['case-management'] && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-800">Case Management Workflow</h3>
              <p className="mb-6 text-gray-700">
                Agencies monitor client accounts and work on flagged issues. This process leverages prompt libraries and structured knowledge to generate fast, high-quality cases and appeals with improved success rates.
              </p>
              
              {filterTerm && (
                <div className="mb-4 bg-yellow-50 p-3 rounded-lg flex items-center">
                  <Filter size={16} className="text-yellow-500 mr-2" />
                  <span className="text-yellow-800">Filtering for: <strong>{filterTerm}</strong></span>
                  <button 
                    onClick={() => setFilterTerm('')}
                    className="ml-2 text-yellow-600 hover:text-yellow-800"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              
              <div className="border-l-4 border-green-200 pl-4 my-6 py-2">
                <h4 className="font-medium text-green-800 mb-1">Key Benefits</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 65% increased case resolution rates</li>
                  <li>• Structured approach to Amazon compliance</li>
                  <li>• Knowledge retention from successful cases</li>
                  <li>• Reduced human error in case formatting</li>
                </ul>
              </div>
              
              <h3 className="text-lg font-semibold mb-4 text-green-800">Case Management Workflow:</h3>
              {renderTable('case-management', !!filterTerm)}
              
              <div className="bg-green-50 p-4 rounded-lg mt-8">
                <h4 className="font-semibold flex items-center mb-2 text-green-800">
                  <Info size={16} className="mr-2" />
                  Implementation Notes
                </h4>
                <p className="text-green-900 text-sm">
                  Classification & Categorization shows a base accuracy of 65-72% on case intake⁹, with potential for greater than 90% accuracy via domain-specific fine-tuning¹⁰. This makes Case Management one of the most immediately implementable AI-enhanced workflows.
                </p>
              </div>
            </div>
          )}
        </section>
    {/* Listings Upload Section */}
    <section id="listings-upload" 
      className="mb-8"
      ref={el => sectionRefs.current['listings-upload'] = el}
    >
      <div 
        className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer flex items-start"
        onClick={() => toggleSection('listings-upload')}
      >
        <span className="mr-4 bg-orange-100 p-2 rounded-full text-orange-800">
          <Layers size={20} />
        </span>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-orange-900">Listings Upload</h2>
            {expandedSections['listings-upload'] ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
          </div>
          {!expandedSections['listings-upload'] && (
            <p className="text-gray-500 mt-1 line-clamp-1">Handling feed files, templates, and keyword-sensitive copywriting...</p>
          )}
        </div>
      </div>
      
      {expandedSections['listings-upload'] && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2 text-orange-800">Listings Upload Workflow</h3>
          <p className="mb-6 text-gray-700">
            Listing uploads involve handling feed files, structured templates, and keyword-sensitive copywriting. This module addresses format mismatches, incomplete data, and manual misalignment with AI-assisted processing.
          </p>
          
          {filterTerm && (
            <div className="mb-4 bg-yellow-50 p-3 rounded-lg flex items-center">
              <Filter size={16} className="text-yellow-500 mr-2" />
              <span className="text-yellow-800">Filtering for: <strong>{filterTerm}</strong></span>
              <button 
                onClick={() => setFilterTerm('')}
                className="ml-2 text-yellow-600 hover:text-yellow-800"
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          <div className="border-l-4 border-orange-200 pl-4 my-6 py-2">
            <h4 className="font-medium text-orange-800 mb-1">Key Benefits</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• 78% efficiency increase in data processing</li>
              <li>• Elimination of common formatting errors</li>
              <li>• Automated field mapping and validation</li>
              <li>• Reduced template selection mistakes</li>
            </ul>
          </div>
          
          <h3 className="text-lg font-semibold mb-4 text-orange-800">Listing Upload Workflow:</h3>
          {renderTable('listings-upload', !!filterTerm)}
          
          <div className="bg-orange-50 p-4 rounded-lg mt-8">
            <h4 className="font-semibold flex items-center mb-2 text-orange-800">
              <Info size={16} className="mr-2" />
              Implementation Notes
            </h4>
            <p className="text-orange-900 text-sm">
              Structured Data Extraction shows proven high accuracy (Gemini 2.5 demonstrates 84% accuracy on GPQA benchmark⁶), making the Listings Upload workflow one of the most automation-ready processes. Basic formatting and character limit checks for compliance also show near-perfect accuracy¹⁷.
            </p>
          </div>
        </div>
      )}
    </section>
    
    {/* Knowledge Base Section */}
    <section id="knowledge" 
      className="mb-8"
      ref={el => sectionRefs.current['knowledge'] = el}
    >
      <div 
        className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer flex items-start"
        onClick={() => toggleSection('knowledge')}
      >
        <span className="mr-4 bg-indigo-100 p-2 rounded-full text-indigo-800">
          <Database size={20} />
        </span>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-indigo-900">Knowledge Centralization</h2>
            {expandedSections['knowledge'] ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
          </div>
          {!expandedSections['knowledge'] && (
            <p className="text-gray-500 mt-1 line-clamp-1">Foundational system for all AI-enhanced workflows...</p>
          )}
        </div>
      </div>
      
      {expandedSections['knowledge'] && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2 text-indigo-800">Knowledge Management System</h3>
          <p className="mb-6 text-gray-700">
            To maximize the effectiveness of all modules, we recommend implementing a centralized knowledge management system that serves as the foundation for AI-enhanced workflows:
          </p>
          
          {filterTerm && (
            <div className="mb-4 bg-yellow-50 p-3 rounded-lg flex items-center">
              <Filter size={16} className="text-yellow-500 mr-2" />
              <span className="text-yellow-800">Filtering for: <strong>{filterTerm}</strong></span>
              <button 
                onClick={() => setFilterTerm('')}
                className="ml-2 text-yellow-600 hover:text-yellow-800"
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          <div className="border-l-4 border-indigo-200 pl-4 my-6 py-2">
            <h4 className="font-medium text-indigo-800 mb-1">Key Benefits</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Centralized policy and best practices repository</li>
              <li>• Consistent AI outputs across teams</li>
              <li>• Continuous performance improvement</li>
              <li>• Accelerated team onboarding to AI workflows</li>
            </ul>
          </div>
          
          <h3 className="text-lg font-semibold mb-4 text-indigo-800">Knowledge Management System:</h3>
          {renderTable('knowledge', !!filterTerm)}
        </div>
      )}
    </section>

    {/* Implementation Plan Section */}
    <section id="implementation" 
      className="mb-8"
      ref={el => sectionRefs.current['implementation'] = el}
    >
      <div 
        className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer flex items-start"
        onClick={() => toggleSection('implementation')}
      >
        <span className="mr-4 bg-indigo-100 p-2 rounded-full text-indigo-800">
          <Target size={20} />
        </span>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-indigo-900">Implementation Plan</h2>
            {expandedSections['implementation'] ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
          </div>
          {!expandedSections['implementation'] && (
            <p className="text-gray-500 mt-1 line-clamp-1">Phased approach based on capability maturity and complexity...</p>
          )}
        </div>
      </div>
      
      {expandedSections['implementation'] && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-3 text-indigo-800">Phased Implementation Approach</h3>
          <p className="mb-6 text-gray-700">
            Based on our capability maturity assessment, we recommend a phased implementation approach that prioritizes high-maturity capabilities while carefully piloting more speculative components:
          </p>
          
          {renderTable('implementation-plan', !!filterTerm)}
          
          <div className="bg-indigo-50 p-4 rounded-lg mt-8">
            <h4 className="font-semibold flex items-center mb-2 text-indigo-800">
              <Info size={16} className="mr-2" />
              Implementation Considerations
            </h4>
            <p className="text-indigo-900 text-sm">
              This phased approach balances quick wins with long-term capability building. Early successes with high-accuracy components (Classification, Structured Data) will build organizational confidence, while allowing time to develop proper validation frameworks for more experimental visual and creative capabilities.
            </p>
          </div>
        </div>
      )}
    </section>

    {/* References Section */}
    <section id="references" 
      className="mb-8"
      ref={el => sectionRefs.current['references'] = el}
    >
      <div 
        className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer flex items-start"
        onClick={() => toggleSection('references')}
      >
        <span className="mr-4 bg-indigo-100 p-2 rounded-full text-indigo-800">
          <Book size={20} />
        </span>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-indigo-900">References</h2>
            {expandedSections['references'] ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
          </div>
          {!expandedSections['references'] && (
            <p className="text-gray-500 mt-1 line-clamp-1">Research studies and benchmarks supporting capability assessments...</p>
          )}
        </div>
      </div>
      
      {expandedSections['references'] && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-800">Research Sources</h3>
          
          <div className="space-y-3">
            {references.map(ref => (
              <div key={ref.id} className="flex">
                <span className="flex-shrink-0 text-indigo-600 font-semibold">[{ref.id}]</span>
                <p className="ml-3 text-gray-700 text-sm">{ref.citation}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-indigo-800 flex items-center">
              <Info size={16} className="mr-2" />
              Research Methodology
            </h4>
            <p className="text-sm text-gray-600">
              Research conducted in April 2025 using published AI benchmarks, comparative analyses, academic papers, technical publications, case studies from relevant industries, official documentation from model providers, and independent reviews and practical applications.
            </p>
          </div>
        </div>
      )}
    </section>
  </main>
  
  {/* Footer */}
  <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-8 mt-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-semibold">AI-Enhanced Workflow Proposal for Sitruna</h3>
          <p className="text-indigo-200 text-sm">Prepared for Sitruna - April 2025</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => handleTabClick('overview')} className="flex items-center text-indigo-200 hover:text-white">
            <PieChart size={16} className="mr-1" />
            <span className="text-sm">Overview</span>
          </button>
          <button onClick={() => handleTabClick('knowledge')} className="flex items-center text-indigo-200 hover:text-white">
            <Database size={16} className="mr-1" />
            <span className="text-sm">Knowledge Base</span>
          </button>
          <button onClick={() => handleTabClick('references')} className="flex items-center text-indigo-200 hover:text-white">
            <Book size={16} className="mr-1" />
            <span className="text-sm">References</span>
          </button>
        </div>
      </div>
      
      <div className="border-t border-indigo-800 pt-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <div className="flex items-center text-indigo-200">
            <Award size={16} className="mr-1" />
            <span className="text-xs">Anti-Fragile</span>
          </div>
          <div className="flex items-center text-indigo-200">
            <Layers size={16} className="mr-1" />
            <span className="text-xs">Modular</span>
          </div>
          <div className="flex items-center text-indigo-200">
            <RefreshCw size={16} className="mr-1" />
            <span className="text-xs">Adaptive</span>
          </div>
        </div>
        
        <div className="text-xs text-indigo-300">
          <span className="mr-2">Last updated: April 22, 2025</span>
          <span>Version 1.0</span>
        </div>
      </div>
    </div>
  </footer>
</div>
);
};
export default AIWorkflowProposal;