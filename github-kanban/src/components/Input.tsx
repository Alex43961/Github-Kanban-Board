import React, { useState } from "react";
import { Input, Button } from "antd";

interface InputProps {
  onLoadIssues: (repoPath: string) => void;
}

const InputComponent: React.FC<InputProps> = ({ onLoadIssues }) => {
  const [repoUrl, setRepoUrl] = useState("");

  const handleLoadIssues = () => {
    try {
      const urlParts = new URL(repoUrl);
      const pathParts = urlParts.pathname.split("/").filter(Boolean);

      if (pathParts.length < 2) {
        alert("Invalid GitHub repo URL! Example: https://github.com/facebook/react");
        return;
      }

      let owner = pathParts[0];
      let repo = pathParts[1];

      // Убираем .git, если есть
      if (repo.endsWith(".git")) {
        repo = repo.replace(".git", "");
      }

      onLoadIssues(`${owner}/${repo}`);
    } catch (error) {
      alert("Invalid URL format!");
    }
  };

  return (
    <div style={{ padding: "50px", display: "flex", gap: "20px" }}>
      <Input
        className="sketch-input"
        placeholder="Enter GitHub repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ width: 300 }}
      />
      <Button className="sketch-button" onClick={handleLoadIssues}>
        Load Issues
      </Button>
    </div>
  );
};

export default InputComponent;



