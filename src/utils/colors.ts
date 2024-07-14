
export const getNodeColor = (node) => {
  if (node.type === 'directory') {
    const specialDirectoryColors = {
      'exe_history': 'rgba(255, 99, 71, 0.8)',
      'frontend': 'rgba(255, 165, 0, 0.8)',
      'backend': 'rgba(230, 130, 255, 0.8)',
      'middleware': 'rgba(0, 255, 127, 0.8)',
      'docs': 'rgba(138, 43, 226, 0.8)',
      'tests': 'rgba(255, 20, 147, 0.8)',
      'resources': 'rgba(0, 191, 255, 0.8)',
      'database': 'rgba(255, 215, 0, 0.8)',
      'logs': 'rgba(169, 169, 169, 0.8)',
      'locales': 'rgba(0, 250, 154, 0.8)',
      'meta': 'rgba(255, 215, 0, 1)'
    };
    return specialDirectoryColors[node.name] || 'rgba(0, 150, 255, 0.8)';
  }
  const extension = node.name.split('.').pop().toLowerCase();
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'rgba(255, 165, 0, 0.8)';
    case 'ts':
      return 'rgba(255, 140, 0, 0.8)';
    case 'tsx':
      return 'rgba(255, 69, 0, 0.8)';
    case 'css':
    case 'scss':
      return 'rgba(0, 220, 255, 0.8)';
    case 'html':
      return 'rgba(255, 100, 0, 0.8)';
    case 'json':
      return 'rgba(150, 150, 150, 0.8)';
    case 'md':
      return 'rgba(100, 255, 100, 0.8)';
    case 'py':
      return 'rgba(230, 130, 255, 0.8)';
    case 'rb':
      return 'rgba(255, 45, 85, 0.8)';
    case 'php':
      return 'rgba(255, 69, 58, 0.8)';
    case 'java':
      return 'rgba(255, 105, 97, 0.8)';
    case 'go':
      return 'rgba(255, 55, 95, 0.8)';
    case 'rs':
      return 'rgba(255, 85, 85, 0.8)';
    case 'sql':
      return 'rgba(255, 99, 71, 0.8)';
    case 'sh':
    case 'bash':
      return 'rgba(255, 69, 0, 0.8)';
    case 'yml':
    case 'yaml':
      return 'rgba(203, 23, 30, 0.8)';
    case 'dockerfile':
      return 'rgba(0, 128, 0, 0.8)';
    default:
      return 'rgba(200, 200, 200, 0.8)';
  }
};
