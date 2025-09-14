import { useState } from "react";
import { LearningNode } from "./LearningNode";
import { ChevronLeft, Menu, Lock } from "lucide-react";

interface LearningPathProps {
  currentChapter: string;
  onNodeClick?: (nodeId: string) => void;
  onMenuClick?: () => void;
}

const programmingCurriculum = [
  {
    section: "Programming Fundamentals",
    nodes: [
      { id: "intro", title: "Introduction to Programming", description: "What is programming? History and overview", status: "completed" as const },
      { id: "setup", title: "Development Environment", description: "Setting up your coding workspace", status: "completed" as const },
      { id: "first-program", title: "Your First Program", description: "Hello World and basic syntax", status: "completed" as const },
      { id: "variables", title: "Variables & Data Types", description: "Storing and manipulating information", status: "current" as const },
      { id: "operators", title: "Operators", description: "Mathematical and logical operations", status: "available" as const },
      { id: "input-output", title: "Input & Output", description: "Getting user input and displaying results", status: "available" as const },
    ]
  },
  {
    section: "Control Flow",
    nodes: [
      { id: "conditionals", title: "If/Else Statements", description: "Making decisions in your code", status: "locked" as const },
      { id: "logical-operators", title: "Logical Operators", description: "AND, OR, NOT operations", status: "locked" as const },
      { id: "switch", title: "Switch Statements", description: "Multiple choice decisions", status: "locked" as const },
      { id: "while-loops", title: "While Loops", description: "Repetition with conditions", status: "locked" as const },
      { id: "for-loops", title: "For Loops", description: "Counting and iteration", status: "locked" as const },
      { id: "nested-loops", title: "Nested Loops", description: "Loops within loops", status: "locked" as const },
      { id: "loop-control", title: "Break & Continue", description: "Controlling loop execution", status: "locked" as const },
    ]
  },
  {
    section: "Data Structures",
    nodes: [
      { id: "arrays", title: "Arrays", description: "Lists of data elements", status: "locked" as const },
      { id: "array-methods", title: "Array Methods", description: "Built-in array functions", status: "locked" as const },
      { id: "multidimensional", title: "2D Arrays", description: "Arrays of arrays", status: "locked" as const },
      { id: "strings", title: "String Manipulation", description: "Working with text data", status: "locked" as const },
      { id: "objects", title: "Objects", description: "Key-value data structures", status: "locked" as const },
      { id: "lists", title: "Lists & Tuples", description: "Dynamic data collections", status: "locked" as const },
      { id: "dictionaries", title: "Dictionaries", description: "Hash maps and key lookups", status: "locked" as const },
      { id: "sets", title: "Sets", description: "Unique collections", status: "locked" as const },
    ]
  },
  {
    section: "Functions & Modular Programming",
    nodes: [
      { id: "functions-intro", title: "Introduction to Functions", description: "Reusable code blocks", status: "locked" as const },
      { id: "parameters", title: "Parameters & Arguments", description: "Passing data to functions", status: "locked" as const },
      { id: "return-values", title: "Return Values", description: "Getting results from functions", status: "locked" as const },
      { id: "scope", title: "Variable Scope", description: "Local vs global variables", status: "locked" as const },
      { id: "recursion", title: "Recursion", description: "Functions calling themselves", status: "locked" as const },
      { id: "lambda", title: "Lambda Functions", description: "Anonymous functions", status: "locked" as const },
      { id: "higher-order", title: "Higher-Order Functions", description: "Functions as parameters", status: "locked" as const },
    ]
  },
  {
    section: "Object-Oriented Programming",
    nodes: [
      { id: "classes-intro", title: "Introduction to Classes", description: "Blueprints for objects", status: "locked" as const },
      { id: "attributes", title: "Attributes & Methods", description: "Class properties and behaviors", status: "locked" as const },
      { id: "constructors", title: "Constructors", description: "Initializing objects", status: "locked" as const },
      { id: "inheritance", title: "Inheritance", description: "Creating class hierarchies", status: "locked" as const },
      { id: "polymorphism", title: "Polymorphism", description: "Multiple forms of objects", status: "locked" as const },
      { id: "encapsulation", title: "Encapsulation", description: "Data hiding and protection", status: "locked" as const },
      { id: "abstract", title: "Abstract Classes", description: "Template classes", status: "locked" as const },
    ]
  },
  {
    section: "Error Handling & Debugging",
    nodes: [
      { id: "syntax-errors", title: "Syntax Errors", description: "Finding and fixing code errors", status: "locked" as const },
      { id: "runtime-errors", title: "Runtime Errors", description: "Handling execution problems", status: "locked" as const },
      { id: "try-catch", title: "Try/Catch Blocks", description: "Error handling mechanisms", status: "locked" as const },
      { id: "debugging", title: "Debugging Techniques", description: "Finding bugs in your code", status: "locked" as const },
      { id: "testing", title: "Unit Testing", description: "Automated code verification", status: "locked" as const },
    ]
  },
  {
    section: "File Operations & Data Processing",
    nodes: [
      { id: "file-reading", title: "Reading Files", description: "Loading data from files", status: "locked" as const },
      { id: "file-writing", title: "Writing Files", description: "Saving data to files", status: "locked" as const },
      { id: "csv-processing", title: "CSV Processing", description: "Working with spreadsheet data", status: "locked" as const },
      { id: "json-handling", title: "JSON Handling", description: "Working with web data format", status: "locked" as const },
      { id: "data-parsing", title: "Data Parsing", description: "Converting between formats", status: "locked" as const },
    ]
  },
  {
    section: "Advanced Concepts",
    nodes: [
      { id: "algorithms", title: "Algorithm Design", description: "Problem-solving strategies", status: "locked" as const },
      { id: "sorting", title: "Sorting Algorithms", description: "Organizing data efficiently", status: "locked" as const },
      { id: "searching", title: "Search Algorithms", description: "Finding data quickly", status: "locked" as const },
      { id: "complexity", title: "Time Complexity", description: "Analyzing algorithm efficiency", status: "locked" as const },
      { id: "regex", title: "Regular Expressions", description: "Pattern matching in text", status: "locked" as const },
      { id: "databases", title: "Database Basics", description: "Storing and retrieving data", status: "locked" as const },
    ]
  }
];

export function LearningPath({ currentChapter, onNodeClick, onMenuClick }: LearningPathProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["Programming Fundamentals"]));

  const languages = [
    { 
      id: "python", 
      name: "Python", 
      description: "Easy to learn, powerful programming language",
      available: true 
    },
    { 
      id: "css", 
      name: "CSS", 
      description: "Style and design web pages",
      available: false 
    },
    { 
      id: "javascript", 
      name: "JavaScript", 
      description: "Make websites interactive",
      available: false 
    }
  ];

  const toggleSection = (sectionName: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionName)) {
      newExpanded.delete(sectionName);
    } else {
      newExpanded.add(sectionName);
    }
    setExpandedSections(newExpanded);
  };

  // Language Selection View
  if (!selectedLanguage) {
    return (
      <div className="flex-1 relative min-h-screen bg-background overflow-auto">
        {/* Mobile Header */}
        <div className="sticky top-0 z-10 bg-primary text-primary-foreground border-b border-primary-muted">
          <div className="flex items-center gap-3 p-4">
            <button 
              onClick={onMenuClick}
              className="lg:hidden text-primary-foreground hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">Choose Your Learning Path</h2>
              <span className="text-sm opacity-80">Select a programming language to start</span>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="max-w-4xl mx-auto px-4 py-12 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Start Your Coding Journey</h1>
            <p className="text-lg text-muted-foreground">Choose a programming language to begin learning</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {languages.map((language) => (
              <div
                key={language.id}
                className={`relative group ${
                  language.available 
                    ? "cursor-pointer" 
                    : "cursor-not-allowed opacity-60"
                }`}
                onClick={() => language.available && setSelectedLanguage(language.id)}
              >
                <div className={`card-elevated p-8 text-center transition-all duration-300 ${
                  language.available 
                    ? "hover:shadow-xl hover:scale-105" 
                    : ""
                }`}>
                  {!language.available && (
                    <div className="absolute top-4 right-4">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl font-bold ${
                      language.id === "python" ? "bg-primary/20 text-primary" :
                      language.id === "css" ? "bg-blue-500/20 text-blue-500" :
                      "bg-yellow-500/20 text-yellow-500"
                    }`}>
                      {language.name.charAt(0)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">{language.name}</h3>
                  <p className="text-muted-foreground mb-6">{language.description}</p>
                  
                  {language.available ? (
                    <div className="inline-flex items-center text-sm font-medium text-primary">
                      Start Learning →
                    </div>
                  ) : (
                    <div className="inline-flex items-center text-sm font-medium text-muted-foreground">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Python Curriculum View
  return (
    <div className="flex-1 relative min-h-screen bg-background overflow-auto">
      {/* Mobile Header */}
      <div className="sticky top-0 z-10 bg-primary text-primary-foreground border-b border-primary-muted">
        <div className="flex items-center gap-3 p-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden text-primary-foreground hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setSelectedLanguage(null)}
            className="text-primary-foreground hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <span className="text-sm opacity-80 block">Python Learning Path</span>
            <h2 className="font-semibold text-lg">Getting Started with Python</h2>
          </div>
        </div>
      </div>

      {/* Learning Curriculum */}
      <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8">
        {programmingCurriculum.map((section, sectionIndex) => {
          const isExpanded = expandedSections.has(section.section);
          const completedCount = section.nodes.filter(n => n.status === "completed").length;
          const totalCount = section.nodes.length;
          
          return (
            <div key={section.section} className="node-section">
              {/* Section Header */}
              <div className="section-header">
                <button
                  onClick={() => toggleSection(section.section)}
                  className="group flex items-center justify-center gap-3 mx-auto px-6 py-3 bg-surface border border-card-border rounded-xl hover:bg-surface-elevated transition-all duration-200"
                >
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {section.section}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {completedCount}/{totalCount} lessons completed
                    </p>
                  </div>
                  <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-success to-primary transition-all duration-500"
                      style={{ width: `${(completedCount / totalCount) * 100}%` }}
                    />
                  </div>
                  <ChevronLeft 
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                      isExpanded ? "rotate-90" : "-rotate-90"
                    }`} 
                  />
                </button>
              </div>

              {/* Nodes Grid */}
              {isExpanded && (
                <div className="learning-grid animate-fade-in">
                  {section.nodes.map((node, nodeIndex) => (
                    <div key={node.id} className="relative">
                      <div className="card-elevated p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                           onClick={() => node.status !== "locked" && onNodeClick?.(node.id)}>
                        <div className="flex items-start gap-4">
                          <LearningNode
                            {...node}
                            position={{ x: 0, y: 0 }}
                            onNodeClick={onNodeClick}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {node.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {node.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                node.status === "completed" ? "bg-success/20 text-success" :
                                node.status === "current" ? "bg-secondary/20 text-secondary" :
                                node.status === "available" ? "bg-primary/20 text-primary" :
                                "bg-muted text-muted-foreground"
                              }`}>
                                {node.status === "completed" ? "Completed" :
                                 node.status === "current" ? "In Progress" :
                                 node.status === "available" ? "Available" :
                                 "Locked"}
                              </div>
                              {node.status === "completed" && (
                                <span className="text-xs text-success">+100 XP</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="sticky bottom-0 bg-surface/90 backdrop-blur-md border-t border-card-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Overall Progress: {programmingCurriculum.reduce((acc, section) => 
              acc + section.nodes.filter(n => n.status === "completed").length, 0
            )} / {programmingCurriculum.reduce((acc, section) => acc + section.nodes.length, 0)} lessons
          </div>
          <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-success via-primary to-secondary transition-all duration-700"
              style={{ 
                width: `${(programmingCurriculum.reduce((acc, section) => 
                  acc + section.nodes.filter(n => n.status === "completed").length, 0
                ) / programmingCurriculum.reduce((acc, section) => acc + section.nodes.length, 0)) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}