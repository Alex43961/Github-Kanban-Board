import React from "react";
import { Card } from "antd";

interface Issue {
  id: number;
  title: string;
  number: number;
  created_at: string;
  user: { login: string };
  comments: number;
}

interface ColumnProps {
  title: string;
  issues: Issue[]; // ✅ Добавляем свойство issues
}

const Column: React.FC<ColumnProps> = ({ title, issues }) => {
  return (
    <div className="sketch-box" style={{ width: 300, backgroundColor:"lightgray" }}>
      <h2>{title}</h2>
      {issues.length === 0 ? (
        <p>No issues</p>
      ) : (
        issues.map(issue => (
          <Card key={issue.id} className="sketch-card">
            <p><b>{issue.title}</b></p>
            <p>#{issue.number} opened {new Date(issue.created_at).toDateString()}</p>
            <p>{issue.user.login} | Comments: {issue.comments}</p>
          </Card>
        ))
      )}
    </div>
  );
};

export default Column;


