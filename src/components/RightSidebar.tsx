import React from "react";
import { X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the shape of node data
interface NodeData {
  label?: string;
  description?: string;
  executionMode?: "local" | "remote";
  scriptType?: "Python Script" | "Powershell Script" | "Shell Script";
  serverAddress?: string;
  userID?: string;
  password?: string;
}

// Define a simplified Node interface (we're only using the properties we need)
interface Node {
  id: string;
  type?: string;
  data?: NodeData;
}

interface RightSidebarProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: Partial<NodeData>) => void;
  onDeleteNode: (nodeId: string) => void;
  onClose: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
  onClose,
}) => {
  // Don't render if no node is selected
  if (!selectedNode) return null;

  // Handle input changes and update the node
  const handleInputChange = (field: string, value: string) => {
    onUpdateNode(selectedNode.id, { [field]: value });
  };

  // Handle node deletion
  const handleDelete = () => {
    onDeleteNode(selectedNode.id);
  };

  return (
    <div className="w-64 bg-slate-800/60 backdrop-blur-xl border-l border-slate-700/50 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-white flex items-center">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
          Node Configuration
        </h3>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 text-slate-400 hover:text-white"
        >
          <X size={14} />
        </button>
      </div>

      <div className="space-y-5">
        {/* Node Info */}
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-3 border border-slate-600/30">
          <div className="text-xs text-slate-400 mb-1">Node Type</div>
          <div className="text-sm text-white font-medium capitalize">
            {selectedNode.type}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            ID: {selectedNode.id}
          </div>
        </div>

        {/* Basic Settings */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Label
            </label>
            <input
              type="text"
              value={String(selectedNode.data?.label || "")}
              onChange={(e) => handleInputChange("label", e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Enter node label"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              value={String(selectedNode.data?.description || "")}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 resize-none"
              rows={2}
              placeholder="Enter description"
            />
          </div>
        </div>

        {/* Action Node Specific Settings */}
        {selectedNode.type === "action" && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Script Type
              </label>
              <select
                value={String(selectedNode.data?.scriptType || "Python")}
                onChange={(e) =>
                  handleInputChange("scriptType", e.target.value)
                }
                className="w-full px-2.5 py-1.5 text-xs bg-slate-700 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              >
                <option value="Python">Python Script</option>
                <option value="Powershell">Powershell Script</option>
                <option value="Shell">Shell Script</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Execution Mode
              </label>
              <select
                value={String(selectedNode.data?.executionMode || "local")}
                onChange={(e) =>
                  handleInputChange("executionMode", e.target.value)
                }
                className="w-full px-2.5 py-1.5 text-xs bg-slate-700 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              >
                <option value="local">Local</option>
                <option value="remote">Remote</option>
              </select>
            </div>

            {selectedNode.data?.executionMode === "remote" && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Server Address
                  </label>
                  <input
                    type="text"
                    value={String(selectedNode.data?.serverAddress || "")}
                    onChange={(e) =>
                      handleInputChange("serverAddress", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="Enter server address"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={String(selectedNode.data?.userID || "")}
                    onChange={(e) =>
                      handleInputChange("userID", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="Enter user ID"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={String(selectedNode.data?.password || "")}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                    placeholder="Enter password"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Delete Node Button */}
        <div className="pt-3 border-t border-slate-600/30">
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="w-full text-xs py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 hover:text-red-300 transition-all duration-200"
          >
            <Trash2 size={12} className="mr-1.5" />
            Delete Node
          </Button>
        </div>
      </div>
    </div>
  );
};
