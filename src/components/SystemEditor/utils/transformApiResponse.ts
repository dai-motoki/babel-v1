
export const transformApiResponse = (data) => {
  // This is a mock implementation. In a real application, you would
  // transform the API response to the format expected by react-force-graph.
  return {
    nodes: data.nodes.map(node => ({
      ...node,
      id: node.id.toString(),
    })),
    links: data.links.map(link => ({
      ...link,
      source: link.source.toString(),
      target: link.target.toString(),
    })),
  };
};
