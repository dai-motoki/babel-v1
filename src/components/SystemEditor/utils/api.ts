
export const fetchDirectoryStructure = async (selectedSystem) => {
  // This is a mock implementation. In a real application, you would
  // make an API call to fetch the directory structure.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        structure: {
          nodes: [
            { id: 1, name: 'root', type: 'directory' },
            { id: 2, name: 'src', type: 'directory' },
            { id: 3, name: 'index.js', type: 'file' },
          ],
          links: [
            { source: 1, target: 2 },
            { source: 2, target: 3 },
          ],
        },
      });
    }, 1000);
  });
};
