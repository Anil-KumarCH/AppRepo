"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    GitBranch, TestTube2, Rocket, Server, Users, X, BotMessageSquare
} from "lucide-react";
import { FaJenkins, FaDocker, FaGithub, FaGitAlt, FaCloud } from "react-icons/fa";
import { SiKubernetes, SiSonarqube, SiHelm } from "react-icons/si";

// --- Data Structure for the Pipeline ---
interface Tool {
    name: string;
    icon: React.ReactNode;
    description: string;
}

interface PipelineStage {
    name: string;
    icon: React.ReactNode;
    tools: Tool[];
}

// --- Your Skills Organized into Pipeline Stages ---
const pipelineData: PipelineStage[] = [
    {
        name: "Plan & Collaborate",
        icon: <Users size={32} />,
        tools: [
            { name: "Agile", icon: <Users />, description: "Expert in Agile methodologies, facilitating iterative development, sprint planning, and daily stand-ups to ensure adaptive and collaborative project execution." },
            { name: "DevOps Culture", icon: <BotMessageSquare />, description: "Championing a DevOps culture of shared responsibility, transparency, and continuous improvement to break down silos and accelerate delivery." }
        ]
    },
    {
        name: "Code & Version",
        icon: <GitBranch size={32} />,
        tools: [
            { name: "Git", icon: <FaGitAlt />, description: "Proficient in Git for distributed version control, including complex branching, merging, and rebasing strategies." },
            { name: "GitHub", icon: <FaGithub />, description: "Utilizing GitHub for collaborative development, including pull requests, code reviews, and managing repositories with best practices." },
        ]
    },
    {
        name: "Build & Integrate",
        icon: <FaJenkins size={32} />,
        tools: [
            { name: "Jenkins", icon: <FaJenkins />, description: "Designing and managing robust, automated CI pipelines with Jenkins, from simple builds to complex, multi-stage workflows." },
            { name: "Docker", icon: <FaDocker />, description: "Creating optimized, multi-stage Dockerfiles and managing container images for consistent and portable application environments." },
        ]
    },
    {
        name: "Test & Analyze",
        icon: <TestTube2 size={32} />,
        tools: [
            { name: "SonarQube", icon: <SiSonarqube />, description: "Integrating SonarQube into CI pipelines to enforce code quality, identify vulnerabilities, and maintain a high standard of code health." }
        ]
    },
    {
        name: "Deploy & Release",
        icon: <Rocket size={32} />,
        tools: [
            { name: "Argo CD", icon: <Rocket />, description: "Implementing GitOps workflows with Argo CD for declarative, automated, and auditable application deployments to Kubernetes." },
            { name: "Helm", icon: <SiHelm />, description: "Managing Kubernetes applications with Helm charts for reusable, versioned, and simplified deployments." },
        ]
    },
    {
        name: "Operate & Orchestrate",
        icon: <Server size={32} />,
        tools: [
            { name: "Kubernetes", icon: <SiKubernetes />, description: "Deploying, managing, and scaling containerized applications on Kubernetes, with a deep understanding of pods, services, and ingress." },
            { name: "OpenShift", icon: <Server />, description: "Working with Red Hat OpenShift for enterprise-grade Kubernetes, providing enhanced security and developer tooling." },
            { name: "Azure DevOps", icon: <FaCloud />, description: "Leveraging the full suite of Azure DevOps for end-to-end lifecycle management, from work item tracking to release pipelines." },
        ]
    },
];

// --- Main Component ---
export default function Skills() {
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

    return (
        <section className="skills-pipeline-section">
            <div className="skills-pipeline-container">
                <h2 className="skills-pipeline-title">My DevOps Workflow & Expertise</h2>
                <p className="skills-pipeline-subtitle">
                    A visual representation of the tools and methodologies I use across the software delivery lifecycle.
                    Hover over a stage to see the tools, and click a tool for details.
                </p>

                <div className="pipeline-wrapper">
                    <div className="pipeline-background-line" />
                    {pipelineData.map((stage, index) => (
                        <React.Fragment key={stage.name}>
                            <div className="pipeline-stage-group">
                                <motion.div 
                                    className="pipeline-stage-node"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className="node-icon">{stage.icon}</div>
                                    <div className="node-label">{stage.name}</div>
                                </motion.div>
                                <div className="tools-container">
                                    {stage.tools.map((tool) => (
                                        <motion.div
                                            key={tool.name}
                                            className="tool-card"
                                            onClick={() => setSelectedTool(tool)}
                                            whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="tool-icon">{tool.icon}</div>
                                            <span className="tool-name">{tool.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {index < pipelineData.length - 1 && (
                                <div className="pipeline-connector">
                                    <div className="pipeline-flow" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedTool && (
                    <motion.div
                        className="skill-details-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedTool(null)}
                    >
                        <motion.div
                            className="skill-details-modal"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 250, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close-btn"
                                onClick={() => setSelectedTool(null)}
                                aria-label="Close modal"
                                title="Close"
                            >
                                <X size={24} />
                            </button>
                            <div className="modal-header">
                                <div className="modal-icon">{selectedTool.icon}</div>
                                <h3 className="modal-title">{selectedTool.name}</h3>
                            </div>
                            <p className="modal-description">{selectedTool.description}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

