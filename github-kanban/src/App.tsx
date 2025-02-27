import React, { useState } from 'react';
import { Spin } from 'antd';
import InputComponent from './components/Input';
import Column from './components/Column';
import './index.css';

interface Issue {
  id: number;
  title: string;
  number: number;
  created_at: string;
  user: { login: string };
  comments: number;
  state: 'open' | 'closed';
}

const App: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [repoName, setRepoName] = useState(''); // Храним название загружаемого репозитория

  const fetchIssues = async (repoPath: string): Promise<void> => {
  console.log("Fetching issues for repo:", repoPath); // ✅ Проверяем перед отправкой

  setLoading(true);
  setRepoName(repoPath);

  try {
    const response = await fetch(`https://api.github.com/repos/${repoPath}/issues`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch issues. Status: ${response.status}`);
    }

    const data: Issue[] = await response.json();
    setIssues(data);
  } catch (error) {
    console.error(error);
    alert("Error fetching issues. Check repository URL!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <InputComponent onLoadIssues={fetchIssues} />

      {repoName && (
        <h2 style={{ textAlign: 'center' }}>Issues from {repoName}</h2>
      )}

      <div style={{ display: 'flex', gap: '20px', paddingLeft: '50px' }}>
        {loading ? (
          <Spin size="large" style={{ margin: 'auto' }} />
        ) : (
          <>
            <Column
              title="ToDo"
              issues={(issues ?? []).filter((issue) => issue.state === 'open')}
            />
            <Column title="In Progress" issues={[]} />
            <Column
              title="Done"
              issues={(issues ?? []).filter(
                (issue) => issue.state === 'closed'
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
