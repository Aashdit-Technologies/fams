// import React, { useState } from 'react';
// import { 
//   MdClose, 
//   MdDragIndicator, 
//   MdAddCircleOutline 
// } from "react-icons/md";

const Hierarchy = () => {
  // const [chartItems, setChartItems] = useState([
  //   { id: 1, dataSource: 'sales', chartType: 'line' }
  // ]);

  // // Sample data sources and chart types
  // const dataSources = ['sales', 'revenue', 'users', 'traffic', 'conversion'];
  // const chartTypes = ['line', 'bar', 'pie', 'area', 'scatter'];

  // const addChartItem = () => {
  //   const newId = chartItems.length + 1;
  //   setChartItems([...chartItems, { 
  //     id: newId, 
  //     dataSource: dataSources[0], 
  //     chartType: chartTypes[0] 
  //   }]);
  // };

  // const deleteChartItem = (id) => {
  //   setChartItems(chartItems.filter(item => item.id !== id));
  // };

  // const moveItem = (fromIndex, toIndex) => {
  //   const newItems = [...chartItems];
  //   const [movedItem] = newItems.splice(fromIndex, 1);
  //   newItems.splice(toIndex, 0, movedItem);
  //   setChartItems(newItems);
  // };

  // const handleDragStart = (e, index) => {
  //   e.dataTransfer.setData('text/plain', index);
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const handleDrop = (e, toIndex) => {
  //   const fromIndex = Number(e.dataTransfer.getData('text/plain'));
  //   moveItem(fromIndex, toIndex);
  // };

  // const updateChartItem = (id, field, value) => {
  //   setChartItems(chartItems.map(item =>
  //     item.id === id ? { ...item, [field]: value } : item
  //   ));
  // };

  return (
    // <div className="w-full max-w-2xl mx-auto p-4">
    //   <div className="space-y-4">
    //     {chartItems.map((item, index) => (
    //       <div
    //         key={item.id}
    //         className="flex items-center gap-4 p-4 bg-white border rounded-lg shadow-sm"
    //         draggable
    //         onDragStart={(e) => handleDragStart(e, index)}
    //         onDragOver={handleDragOver}
    //         onDrop={(e) => handleDrop(e, index)}
    //       >
    //         <div className="cursor-move">
    //           <MdDragIndicator className="text-gray-400 text-xl" />
    //         </div>

    //         <div className="flex-1 grid grid-cols-2 gap-4">
    //           <select
    //             className="p-2 border rounded-md"
    //             value={item.dataSource}
    //             onChange={(e) => updateChartItem(item.id, 'dataSource', e.target.value)}
    //           >
    //             {dataSources.map(source => (
    //               <option key={source} value={source}>
    //                 {source.charAt(0).toUpperCase() + source.slice(1)} Data
    //               </option>
    //             ))}
    //           </select>

    //           <select
    //             className="p-2 border rounded-md"
    //             value={item.chartType}
    //             onChange={(e) => updateChartItem(item.id, 'chartType', e.target.value)}
    //           >
    //             {chartTypes.map(type => (
    //               <option key={type} value={type}>
    //                 {type.charAt(0).toUpperCase() + type.slice(1)} Chart
    //               </option>
    //             ))}
    //           </select>
    //         </div>

    //         <button
    //           onClick={() => deleteChartItem(item.id)}
    //           className="p-1 text-red-500 hover:text-red-700 rounded-full"
    //         >
    //           <MdClose className="text-xl" />
    //         </button>
    //       </div>
    //     ))}
    //   </div>

    //   <button
    //     onClick={addChartItem}
    //     className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    //   >
    //     <MdAddCircleOutline className="text-xl" />
    //     Add Chart
    //   </button>

    //   {/* Preview of current state */}
    //   <div className="mt-8 p-4 bg-gray-50 rounded-lg">
    //     <pre className="text-sm">
    //       {JSON.stringify(chartItems, null, 2)}
    //     </pre>
    //   </div>
    // </div>
    <>
      <h1>hii</h1>
    </>
  );
};

export default Hierarchy;