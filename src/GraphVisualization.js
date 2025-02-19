import React, { useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";

const GraphVisualization = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    fetch("https://ascoguidelineauthors.onrender.com/graph")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Graph Data:", data); // Debugging
        setGraphData({
          nodes: data.nodes.map((node) => ({
            ...node,
            x: Math.random() * 800 - 400,
            y: Math.random() * 800 - 400,
            z: Math.random() * 800 - 400,
          })),
          links: data.edges.map((edge) => ({
            source: data.nodes[edge.source]?.id,
            target: data.nodes[edge.target]?.id,
            value: edge.weight,
          })),
        });
      })
      .catch((err) => console.error("Error fetching graph data:", err));
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ForceGraph3D
        graphData={graphData}
        nodeAutoColorBy={(node) => (node.categories.length > 1 ? "multi" : node.categories[0])}
        nodeLabel={(node) => `${node.name} (${node.size} publications)\nCategory: ${node.categories.join(", ")}`}
        linkWidth={(link) => link.value / 2}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        enableNodeDrag={true}
        enableNavigationControls={true}
      />
    </div>
  );
};

export default GraphVisualization;
